#!/usr/bin/env python3
"""
Simple deployment script for ProofChain smart contract
"""

import os
import json
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, StateSchema

# TestNet configuration
ALGOD_TOKEN = ""
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_PORT = ""

def deploy_contract(deployer_mnemonic):
    """Deploy the smart contract to TestNet"""
    
    # Initialize client
    client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS, ALGOD_PORT)
    
    # Get deployer account
    deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
    deployer_address = account.address_from_private_key(deployer_private_key)
    
    print(f"🚀 Deploying from: {deployer_address}")
    
    # Get suggested parameters
    suggested_params = client.suggested_params()
    
    # Load contract
    with open("artifacts/ProofChain.approval.teal", "r") as f:
        approval_program = f.read()
    
    with open("artifacts/ProofChain.clear.teal", "r") as f:
        clear_program = f.read()
    
    # Compile TEAL programs
    approval_program_compiled = client.compile(approval_program)
    clear_program_compiled = client.compile(clear_program)
    
    # Convert from base64 to bytes
    import base64
    approval_bytes = base64.b64decode(approval_program_compiled['result'])
    clear_bytes = base64.b64decode(clear_program_compiled['result'])
    
    # Create application
    txn = ApplicationCreateTxn(
        sender=deployer_address,
        sp=suggested_params,
        on_complete=0,  # NoOp
        approval_program=approval_bytes,
        clear_program=clear_bytes,
        global_schema=StateSchema(num_uints=1, num_byte_slices=2),
        local_schema=StateSchema(num_uints=1, num_byte_slices=0),
    )
    
    # Sign and send transaction
    signed_txn = txn.sign(deployer_private_key)
    tx_id = client.send_transaction(signed_txn)
    
    # Wait for confirmation
    print(f"⏳ Waiting for confirmation...")
    import time
    time.sleep(5)  # Wait for transaction to be confirmed
    
    # Get transaction info
    try:
        result = client.pending_transaction_info(tx_id)
        app_id = result['application-index']
        print(f"✅ Contract deployed successfully!")
        print(f"📋 App ID: {app_id}")
        print(f"🔗 Transaction ID: {tx_id}")
        
        # Save deployment info
        deployment_info = {
            "app_id": app_id,
            "tx_id": tx_id,
            "deployer": deployer_address,
            "network": "testnet"
        }
        
        with open("deployment_info.json", "w") as f:
            json.dump(deployment_info, f, indent=2)
        
        print(f"📄 Deployment info saved to deployment_info.json")
        
        return app_id, tx_id
        
    except Exception as e:
        print(f"❌ Error getting transaction info: {e}")
        print(f"🔗 Transaction ID: {tx_id}")
        print("💡 Check the transaction on AlgoExplorer")
        return None, tx_id

if __name__ == "__main__":
    # Get mnemonic from environment
    deployer_mnemonic = os.getenv("DEPLOYER_MNEMONIC")
    
    if not deployer_mnemonic:
        print("❌ Error: DEPLOYER_MNEMONIC environment variable not set")
        exit(1)
    
    try:
        app_id, tx_id = deploy_contract(deployer_mnemonic)
        
        if app_id:
            print("\n🎉 DEPLOYMENT SUCCESSFUL!")
            print(f"📱 App ID: {app_id}")
            print(f"🔗 Transaction: https://testnet.algoexplorer.io/tx/{tx_id}")
            print(f"📋 Contract: https://testnet.algoexplorer.io/application/{app_id}")
        else:
            print("\n⚠️  Deployment may have succeeded, check the transaction ID above")
        
    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        exit(1)
