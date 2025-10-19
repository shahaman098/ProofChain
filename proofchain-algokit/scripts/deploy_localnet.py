"""
Deploy ProofChain Smart Contract to Algorand LocalNet
This script demonstrates AlgoKit LocalNet deployment capability
"""

import os
import sys
from pathlib import Path
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, StateSchema, wait_for_confirmation

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))
from smart_contracts.proofchain_contract import ProofChainApp

# LocalNet configuration
LOCALNET_ALGOD_ADDRESS = "http://localhost:4001"
LOCALNET_ALGOD_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

def deploy_to_localnet():
    """Deploy ProofChain contract to AlgoKit LocalNet"""
    print("🚀 Deploying ProofChain to LocalNet...")
    
    try:
        # Connect to LocalNet
        algod_client = algod.AlgodClient(LOCALNET_ALGOD_TOKEN, LOCALNET_ALGOD_ADDRESS)
        
        # Test connection
        status = algod_client.status()
        print(f"✅ Connected to LocalNet (Round: {status['last-round']})")
        
        # Use default LocalNet account (for demo)
        # In production, use proper key management
        deployer_mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
        private_key = mnemonic.to_private_key(deployer_mnemonic)
        deployer_address = account.address_from_private_key(private_key)
        
        print(f"🏦 Deploying from: {deployer_address}")
        
        # Check balance
        account_info = algod_client.account_info(deployer_address)
        balance = account_info.get('amount', 0) / 1_000_000
        print(f"💰 Account balance: {balance:.6f} ALGO")
        
        # Create ProofChain app instance
        app = ProofChainApp()
        
        # Get contract parameters
        approval_teal, clear_state_teal = app.compile_contracts()
        
        # Compile programs
        approval_result = algod_client.compile(approval_teal)
        clear_result = algod_client.compile(clear_state_teal)
        
        approval_binary = approval_result['result']
        clear_binary = clear_result['result']
        
        # Get transaction parameters
        params = algod_client.suggested_params()
        
        # Create application creation transaction
        create_txn = ApplicationCreateTxn(
            sender=deployer_address,
            sp=params,
            on_complete=0,  # NoOp
            approval_program=approval_binary,
            clear_program=clear_binary,
            global_schema=StateSchema(num_uints=1, num_byte_slices=2),
            local_schema=StateSchema(num_uints=0, num_byte_slices=0),
            extra_pages=1  # For box storage
        )
        
        # Sign transaction
        signed_txn = create_txn.sign(private_key)
        
        # Submit transaction
        tx_id = algod_client.send_transaction(signed_txn)
        print(f"📤 Transaction submitted: {tx_id}")
        
        # Wait for confirmation
        confirmed_txn = wait_for_confirmation(algod_client, tx_id, 4)
        app_id = confirmed_txn['application-index']
        
        print(f"🎉 ProofChain deployed successfully!")
        print(f"📱 App ID: {app_id}")
        print(f"🔗 LocalNet Explorer: http://localhost:8980/application/{app_id}")
        
        # Save deployment info
        deployment_info = {
            "network": "localnet",
            "app_id": app_id,
            "tx_id": tx_id,
            "deployer": deployer_address,
            "round": confirmed_txn['confirmed-round']
        }
        
        import json
        with open("localnet_deployment.json", "w") as f:
            json.dump(deployment_info, f, indent=2)
        
        print(f"💾 Deployment info saved to localnet_deployment.json")
        
        # Test the contract
        print("\n🧪 Testing contract functionality...")
        test_contract(algod_client, private_key, app_id)
        
        return app_id
        
    except Exception as e:
        print(f"❌ Deployment failed: {str(e)}")
        print("\n💡 Make sure LocalNet is running:")
        print("   algokit localnet start")
        return None

def test_contract(client, private_key, app_id):
    """Test basic contract functionality"""
    try:
        sender = account.address_from_private_key(private_key)
        params = client.suggested_params()
        
        # Test submit_report
        from algosdk.transaction import ApplicationNoOpTxn
        
        app_args = [
            "submit_report".encode(),
            "Test hate incident report for LocalNet deployment verification".encode(),
            "TEST_REF_123".encode(),
            "QmTestIPFSHash".encode(),
            b"0"  # Not anonymous
        ]
        
        test_txn = ApplicationNoOpTxn(
            sender=sender,
            sp=params,
            index=app_id,
            app_args=app_args
        )
        
        signed_test = test_txn.sign(private_key)
        test_tx_id = client.send_transaction(signed_test)
        
        confirmed = wait_for_confirmation(client, test_tx_id, 4)
        
        if 'logs' in confirmed:
            print(f"✅ Test report submitted successfully!")
            print(f"📋 Transaction: {test_tx_id}")
        else:
            print("⚠️  Test completed but no logs found")
            
    except Exception as e:
        print(f"⚠️  Contract test failed: {e}")

if __name__ == "__main__":
    deploy_to_localnet()
