"""
Deploy ProofChain Smart Contract to Algorand TestNet
Production deployment script for hackathon submission
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

# TestNet configuration
TESTNET_ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
TESTNET_ALGOD_TOKEN = ""

def deploy_to_testnet():
    """Deploy ProofChain contract to Algorand TestNet"""
    print("🚀 Deploying ProofChain to TestNet...")
    print("=" * 50)
    
    # Get deployer mnemonic from environment
    deployer_mnemonic = os.getenv("DEPLOYER_MNEMONIC")
    if not deployer_mnemonic:
        print("❌ Error: DEPLOYER_MNEMONIC environment variable not set")
        print("   Please set your 25-word mnemonic:")
        print("   export DEPLOYER_MNEMONIC='word1 word2 ... word25'")
        print("   Fund your account at: https://bank.testnet.algorand.network/")
        return None
    
    try:
        # Connect to TestNet
        algod_client = algod.AlgodClient(TESTNET_ALGOD_TOKEN, TESTNET_ALGOD_ADDRESS)
        
        # Test connection
        status = algod_client.status()
        print(f"✅ Connected to TestNet (Round: {status['last-round']})")
        
        # Get deployer account
        private_key = mnemonic.to_private_key(deployer_mnemonic)
        deployer_address = account.address_from_private_key(private_key)
        
        print(f"🏦 Deploying from: {deployer_address}")
        
        # Check balance
        account_info = algod_client.account_info(deployer_address)
        balance = account_info.get('amount', 0) / 1_000_000
        print(f"💰 Account balance: {balance:.6f} ALGO")
        
        if balance < 0.1:
            print("❌ Insufficient balance for deployment")
            print("   Fund your account at: https://bank.testnet.algorand.network/")
            return None
        
        # Create ProofChain app instance
        app = ProofChainApp()
        
        # Compile contracts
        print("🔨 Compiling smart contract...")
        approval_teal, clear_state_teal = app.compile_contracts()
        
        # Compile to bytecode
        approval_result = algod_client.compile(approval_teal)
        clear_result = algod_client.compile(clear_state_teal)
        
        approval_binary = approval_result['result']
        clear_binary = clear_result['result']
        
        print("✅ Contract compiled successfully")
        
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
        print("📤 Submitting deployment transaction...")
        tx_id = algod_client.send_transaction(signed_txn)
        print(f"   Transaction ID: {tx_id}")
        
        # Wait for confirmation
        print("⏳ Waiting for confirmation...")
        confirmed_txn = wait_for_confirmation(algod_client, tx_id, 4)
        app_id = confirmed_txn['application-index']
        
        # Success!
        print(f"\n🎉 ProofChain deployed successfully to TestNet!")
        print("=" * 50)
        print(f"📱 App ID: {app_id}")
        print(f"🔗 AlgoExplorer: https://testnet.algoexplorer.io/application/{app_id}")
        print(f"🌐 Pera Explorer: https://testnet.explorer.perawallet.app/application/{app_id}")
        print(f"📋 Transaction: https://testnet.algoexplorer.io/tx/{tx_id}")
        print(f"🏦 Deployer: {deployer_address}")
        print(f"📅 Block: {confirmed_txn['confirmed-round']}")
        
        # Save deployment info
        deployment_info = {
            "network": "testnet",
            "app_id": app_id,
            "tx_id": tx_id,
            "deployer": deployer_address,
            "round": confirmed_txn['confirmed-round'],
            "explorer_urls": {
                "app_algoexplorer": f"https://testnet.algoexplorer.io/application/{app_id}",
                "app_pera": f"https://testnet.explorer.perawallet.app/application/{app_id}",
                "tx_algoexplorer": f"https://testnet.algoexplorer.io/tx/{tx_id}"
            }
        }
        
        import json
        with open("testnet_deployment.json", "w") as f:
            json.dump(deployment_info, f, indent=2)
        
        print(f"💾 Deployment info saved to testnet_deployment.json")
        
        # Test the contract
        print(f"\n🧪 Testing deployed contract...")
        test_contract(algod_client, private_key, app_id)
        
        return app_id
        
    except Exception as e:
        print(f"❌ Deployment failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def test_contract(client, private_key, app_id):
    """Test the deployed contract functionality"""
    try:
        sender = account.address_from_private_key(private_key)
        params = client.suggested_params()
        
        # Test 1: Submit a test report
        from algosdk.transaction import ApplicationNoOpTxn
        
        app_args = [
            "submit_report".encode(),
            "HACKATHON TEST: ProofChain smart contract verification report - Custom PyTeal implementation".encode(),
            "HACKATHON_REF_2024".encode(),
            "QmHackathonTestHash123".encode(),
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
        
        print(f"✅ Test report submitted!")
        print(f"   Transaction: https://testnet.algoexplorer.io/tx/{test_tx_id}")
        
        # Test 2: Get stats
        stats_args = ["get_stats".encode()]
        
        stats_txn = ApplicationNoOpTxn(
            sender=sender,
            sp=params,
            index=app_id,
            app_args=stats_args
        )
        
        signed_stats = stats_txn.sign(private_key)
        stats_tx_id = client.send_transaction(signed_stats)
        
        stats_confirmed = wait_for_confirmation(client, stats_tx_id, 4)
        
        print(f"✅ Statistics retrieved!")
        print(f"   Transaction: https://testnet.algoexplorer.io/tx/{stats_tx_id}")
        
        if 'logs' in stats_confirmed:
            for log in stats_confirmed['logs']:
                import base64
                decoded = base64.b64decode(log).decode('utf-8', errors='ignore')
                print(f"   📊 Stats: {decoded}")
        
        print(f"\n🏆 CONTRACT TESTING COMPLETE!")
        print(f"✅ ProofChain is fully operational on TestNet")
        
    except Exception as e:
        print(f"⚠️  Contract test failed: {e}")

if __name__ == "__main__":
    deploy_to_testnet()
