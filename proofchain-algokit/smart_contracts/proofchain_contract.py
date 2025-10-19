"""
ProofChain Smart Contract - Custom PyTeal Implementation
Decentralized hate crime reporting platform on Algorand
"""

from pyteal import *
from typing import Literal

# Contract constants
MAX_MESSAGE_LENGTH = 1000
MAX_POLICE_REF_LENGTH = 50
MAX_IPFS_CID_LENGTH = 100
RATE_LIMIT_SECONDS = 60  # 1 minute rate limit

class ProofChainApp:
    """Custom hate incident reporting smart contract"""
    
    def __init__(self):
        # Global state keys
        self.total_reports = Bytes("total_reports")
        self.version = Bytes("version")
        self.admin = Bytes("admin")
        
        # Local state keys for rate limiting
        self.last_report_time = Bytes("last_report_time")
        
    def approval_program(self) -> Expr:
        """Main approval program logic"""
        return Cond(
            [Txn.application_id() == Int(0), self.on_creation()],
            [Txn.on_completion() == OnComplete.DeleteApplication, self.on_delete()],
            [Txn.on_completion() == OnComplete.UpdateApplication, self.on_update()],
            [Txn.on_completion() == OnComplete.CloseOut, self.on_closeout()],
            [Txn.on_completion() == OnComplete.OptIn, self.on_optin()],
            [Txn.application_args[0] == Bytes("submit_report"), self.submit_report()],
            [Txn.application_args[0] == Bytes("get_report"), self.get_report()],
            [Txn.application_args[0] == Bytes("get_stats"), self.get_stats()],
        )
    
    def clear_program(self) -> Expr:
        """Clear state program"""
        return Return(Int(1))
    
    def on_creation(self) -> Expr:
        """Contract creation logic"""
        return Seq([
            App.globalPut(self.total_reports, Int(0)),
            App.globalPut(self.version, Bytes("1.0.0")),
            App.globalPut(self.admin, Txn.sender()),
            Return(Int(1))
        ])
    
    def on_delete(self) -> Expr:
        """Only admin can delete"""
        return Return(Txn.sender() == App.globalGet(self.admin))
    
    def on_update(self) -> Expr:
        """Only admin can update"""
        return Return(Txn.sender() == App.globalGet(self.admin))
    
    def on_closeout(self) -> Expr:
        """Allow closeout"""
        return Return(Int(1))
    
    def on_optin(self) -> Expr:
        """Allow opt-in for rate limiting"""
        return Seq([
            App.localPut(Txn.sender(), self.last_report_time, Int(0)),
            Return(Int(1))
        ])
    
    def submit_report(self) -> Expr:
        """Submit new hate incident report"""
        message = Txn.application_args[1]
        
        # Input validation
        message_valid = And(
            Len(message) <= Int(MAX_MESSAGE_LENGTH),
            Len(message) > Int(0)
        )
        
        # Rate limiting check
        current_time = Global.latest_timestamp()
        last_time = App.localGet(Txn.sender(), self.last_report_time)
        rate_limit_passed = Or(
            last_time == Int(0),  # First report
            current_time >= last_time + Int(RATE_LIMIT_SECONDS)
        )
        
        # Generate unique report ID using transaction ID
        report_id = Txn.tx_id()
        
        # Create report data
        report_data = Concat(
            Bytes("REPORT:"),
            Itob(current_time),
            Bytes("|"),
            message
        )
        
        return Seq([
            Assert(message_valid),
            Assert(rate_limit_passed),
            
            # Store report in box storage
            App.box_put(report_id, report_data),
            
            # Update global counters
            App.globalPut(self.total_reports, App.globalGet(self.total_reports) + Int(1)),
            
            # Update rate limiting
            App.localPut(Txn.sender(), self.last_report_time, current_time),
            
            # Return report ID
            Log(Concat(Bytes("Report submitted with ID: "), report_id)),
            Return(Int(1))
        ])
    
    def get_report(self) -> Expr:
        """Retrieve report by ID"""
        report_id = Txn.application_args[1]
        
        return Seq([
            # Get report data
            report_data := App.box_get(report_id),
            
            # Return report data
            Log(report_data.value()),
            Return(Int(1))
        ])
    
    def get_stats(self) -> Expr:
        """Get platform statistics"""
        total = App.globalGet(self.total_reports)
        version = App.globalGet(self.version)
        
        stats = Concat(
            Bytes("Total Reports: "),
            Itob(total),
            Bytes(" | Version: "),
            version
        )
        
        return Seq([
            Log(stats),
            Return(Int(1))
        ])

# Contract instance
app = ProofChainApp()

# Export the programs
def approval_program() -> str:
    """Compile approval program to TEAL"""
    return compileTeal(app.approval_program(), mode=Mode.Application, version=8)

def clear_program() -> str:
    """Compile clear program to TEAL"""
    return compileTeal(app.clear_program(), mode=Mode.Application, version=8)

if __name__ == "__main__":
    # Generate TEAL files
    with open("artifacts/ProofChain.approval.teal", "w") as f:
        f.write(approval_program())
    
    with open("artifacts/ProofChain.clear.teal", "w") as f:
        f.write(clear_program())
    
    print("✅ Smart contract compiled successfully!")
    print("📄 Generated artifacts/ProofChain.approval.teal")
    print("📄 Generated artifacts/ProofChain.clear.teal")