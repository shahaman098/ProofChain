#!/usr/bin/env python3
"""
Deploy the TrustChain Report Smart Contract to Algorand TestNet
"""

import os
import json
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, StateSchema, OnComplete
from algosdk.logic import get_application_address
from algosdk.util import algos_to_microalgos
import base64

# Algorand TestNet configuration
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""

def connect_to_network():
    """Connect to Algorand TestNet"""
    return algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)

def load_teal_program(filename):
    """Load a TEAL program from file"""
    with open(filename, 'r') as f:
        return f.read()

def compile_program(client, source_code):
    """Compile TEAL source code"""
    compile_response = client.compile(source_code)
    return base64.b64decode(compile_response['result'])

def create_app(client, private_key, approval_program, clear_program):
    """Create a new application"""
    
    # Get account from private key
    sender = account.address_from_private_key(private_key)
    
    print(f"Deployer account: {sender}")
    
    # Get suggested transaction parameters
    params = client.suggested_params()
    
    # Define state schema
    global_schema = StateSchema(num_uints=2, num_byte_slices=2)  # total_reports, version
    local_schema = StateSchema(num_uints=2, num_byte_slices=0)   # user_reports, last_report
    
    # Create transaction
    txn = ApplicationCreateTxn(
        sender=sender,
        sp=params,
        on_complete=OnComplete.NoOpOC,
        approval_program=approval_program,
        clear_program=clear_program,
        global_schema=global_schema,
        local_schema=local_schema,
    )
    
    # Sign transaction
    signed_txn = txn.sign(private_key)
    
    # Submit transaction
    tx_id = client.send_transaction(signed_txn)
    print(f"Transaction ID: {tx_id}")
    
    # Wait for confirmation
    try:
        confirmed_txn = client.pending_transaction_info(tx_id)
        print("Transaction confirmed!")
        
        # Get the application ID
        app_id = confirmed_txn['application-index']
        print(f"🎉 Application deployed successfully!")
        print(f"📱 Application ID: {app_id}")
        print(f"🔗 Application Address: {get_application_address(app_id)}")
        print(f"🌐 TestNet Explorer: https://testnet.algoexplorer.io/application/{app_id}")
        
        return app_id
        
    except Exception as e:
        print(f"Error waiting for confirmation: {e}")
        return None

def main():
    """Main deployment function"""
    
    print("🚀 Deploying TrustChain Smart Contract to Algorand TestNet")
    print("=" * 60)
    
    # Check if TEAL files exist
    if not os.path.exists("approval.teal"):
        print("❌ Error: approval.teal not found. Run report_contract.py first.")
        return
    
    if not os.path.exists("clear_state.teal"):
        print("❌ Error: clear_state.teal not found. Run report_contract.py first.")
        return
    
    # Connect to network
    try:
        client = connect_to_network()
        print("✅ Connected to Algorand TestNet")
    except Exception as e:
        print(f"❌ Failed to connect to Algorand: {e}")
        return
    
    # Load and compile programs
    try:
        approval_source = load_teal_program("approval.teal")
        clear_source = load_teal_program("clear_state.teal")
        
        approval_program = compile_program(client, approval_source)
        clear_program = compile_program(client, clear_source)
        
        print("✅ Smart contract programs compiled")
    except Exception as e:
        print(f"❌ Failed to compile programs: {e}")
        return
    
    # Get deployer account
    # For demo purposes, we'll use environment variables
    # In production, use secure key management
    
    mnemonic_phrase = os.getenv("ALGORAND_MNEMONIC")
    if not mnemonic_phrase:
        print("❌ Error: Please set ALGORAND_MNEMONIC environment variable")
        print("   This should be a 25-word mnemonic phrase for your TestNet account")
        print("   Example: export ALGORAND_MNEMONIC='word1 word2 ... word25'")
        return
    
    try:
        private_key = mnemonic.to_private_key(mnemonic_phrase)
        sender = account.address_from_private_key(private_key)
        
        # Check account balance
        account_info = client.account_info(sender)
        balance = account_info.get('amount', 0) / 1_000_000  # Convert from microAlgos
        
        print(f"💰 Account balance: {balance:.6f} ALGO")
        
        if balance < 0.1:  # Need at least 0.1 ALGO for deployment
            print("❌ Insufficient balance. You need at least 0.1 ALGO to deploy the contract.")
            print("   Get TestNet ALGO from: https://testnet.algoexplorer.io/dispenser")
            return
            
    except Exception as e:
        print(f"❌ Invalid mnemonic or account error: {e}")
        return
    
    # Deploy the application
    try:
        app_id = create_app(client, private_key, approval_program, clear_program)
        
        if app_id:
            # Save deployment info
            deployment_info = {
                "app_id": app_id,
                "deployer": sender,
                "network": "testnet",
                "explorer_url": f"https://testnet.algoexplorer.io/application/{app_id}",
                "app_address": get_application_address(app_id)
            }
            
            with open("deployment_info.json", "w") as f:
                json.dump(deployment_info, f, indent=2)
            
            print(f"💾 Deployment info saved to deployment_info.json")
            
    except Exception as e:
        print(f"❌ Deployment failed: {e}")

if __name__ == "__main__":
    main()
