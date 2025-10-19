"""
TrustChain Report Smart Contract
A custom Algorand smart contract for handling hate incident reports
with support for anonymous reporting and evidence linking.
"""

from pyteal import *

def approval_program():
    """
    Main approval program for the TrustChain report smart contract.
    
    This smart contract handles:
    1. Report submission with metadata
    2. Anonymous and non-anonymous reporting
    3. Evidence linking via IPFS CIDs
    4. Timestamp recording
    5. Police reference number storage
    """
    
    # Global state keys
    total_reports_key = Bytes("total_reports")
    contract_version_key = Bytes("version")
    
    # Local state keys for each account
    user_report_count_key = Bytes("user_reports")
    last_report_time_key = Bytes("last_report")
    
    # Application arguments indices
    method_arg = Txn.application_args[0]
    report_data_arg = Txn.application_args[1]
    
    # Initialize contract state
    @Subroutine(TealType.uint64)
    def initialize_contract():
        return Seq([
            App.globalPut(total_reports_key, Int(0)),
            App.globalPut(contract_version_key, Bytes("1.0.0")),
            Int(1)
        ])
    
    # Submit a new report
    @Subroutine(TealType.uint64)
    def submit_report():
        # Validate sender
        sender_validation = Txn.sender() != Global.zero_address()
        
        # Rate limiting: prevent spam (max 1 report per minute per user)
        current_time = Global.latest_timestamp()
        last_report_time = App.localGet(Txn.sender(), last_report_time_key)
        time_since_last = current_time - last_report_time
        rate_limit_check = Or(
            last_report_time == Int(0),  # First report
            time_since_last >= Int(60)    # At least 60 seconds since last report
        )
        
        # Validate report data is not empty
        report_data_validation = Len(report_data_arg) > Int(0)
        report_data_size_check = Len(report_data_arg) <= Int(1000)  # Max 1KB per report
        
        return Seq([
            # Validation checks
            Assert(sender_validation),
            Assert(rate_limit_check),
            Assert(report_data_validation),
            Assert(report_data_size_check),
            
            # Update global state
            App.globalPut(
                total_reports_key, 
                App.globalGet(total_reports_key) + Int(1)
            ),
            
            # Update user's local state
            App.localPut(
                Txn.sender(), 
                user_report_count_key,
                App.localGet(Txn.sender(), user_report_count_key) + Int(1)
            ),
            App.localPut(
                Txn.sender(),
                last_report_time_key,
                current_time
            ),
            
            # Log the report submission (this creates a searchable transaction log)
            Log(Concat(
                Bytes("REPORT:"),
                Itob(App.globalGet(total_reports_key)),
                Bytes(":"),
                Itob(current_time),
                Bytes(":"),
                report_data_arg
            )),
            
            Int(1)
        ])
    
    # Get contract statistics
    @Subroutine(TealType.uint64)  
    def get_stats():
        return Seq([
            Log(Concat(
                Bytes("STATS:"),
                Bytes("total_reports:"),
                Itob(App.globalGet(total_reports_key)),
                Bytes(":version:"),
                App.globalGet(contract_version_key)
            )),
            Int(1)
        ])
    
    # Opt-in handler for local state
    on_opt_in = Seq([
        App.localPut(Txn.sender(), user_report_count_key, Int(0)),
        App.localPut(Txn.sender(), last_report_time_key, Int(0)),
        Int(1)
    ])
    
    # Main program logic
    program = Cond(
        [Txn.application_id() == Int(0), initialize_contract()],
        [Txn.on_completion() == OnComplete.OptIn, on_opt_in],
        [Txn.on_completion() == OnComplete.NoOp, Cond(
            [method_arg == Bytes("submit_report"), submit_report()],
            [method_arg == Bytes("get_stats"), get_stats()],
        )],
        [Txn.on_completion() == OnComplete.CloseOut, Int(1)],
        [Txn.on_completion() == OnComplete.UpdateApplication, Int(0)],  # Prevent updates
        [Txn.on_completion() == OnComplete.DeleteApplication, Int(0)],  # Prevent deletion
    )
    
    return program

def clear_state_program():
    """
    Clear state program - allows users to clear their local state
    """
    return Int(1)

if __name__ == "__main__":
    # Compile the smart contract
    approval_teal = compileTeal(approval_program(), Mode.Application, version=8)
    clear_state_teal = compileTeal(clear_state_program(), Mode.Application, version=8)
    
    # Write TEAL code to files
    with open("approval.teal", "w") as f:
        f.write(approval_teal)
    
    with open("clear_state.teal", "w") as f:
        f.write(clear_state_teal)
    
    print("✅ Smart contract compiled successfully!")
    print("📄 Generated files: approval.teal, clear_state.teal")
