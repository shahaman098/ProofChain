#!/usr/bin/env python3
"""
Deploy ProofChain smart contract to LocalNet
"""

import os
import json
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn

# LocalNet configuration
ALGOD_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
ALGOD_ADDRESS = "http://localhost:4001"
ALGOD_PORT = ""

def load_contract():
    """Load the compiled contract"""
    with open("artifacts/ProofChain.approval.teal", "r") as f:
        approval_program = f.read()
    
    with open("artifacts/ProofChain.clear.teal", "r") as f:
        clear_program = f.read()
    
    return approval_program, clear_program

def deploy_contract():
    """Deploy the smart contract to LocalNet"""
    
    # Initialize client
    client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS, ALGOD_PORT)
    
    # Use default LocalNet account
    deployer_mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon"
    deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
    deployer_address = account.address_from_private_key(deployer_private_key)
    
    print(f"🚀 Deploying from: {deployer_address}")
    
    # Get suggested parameters
    suggested_params = client.suggested_params()
    
    # Load contract
    approval_program, clear_program = load_contract()
    
    # Create application
    txn = ApplicationCreateTxn(
        sender=deployer_address,
        sp=suggested_params,
        on_complete=0,  # NoOp
        approval_program=approval_program,
        clear_program=clear_program,
        global_schema=algosdk.future.transaction.StateSchema(num_uints=1, num_byteslices=2),
        local_schema=algosdk.future.transaction.StateSchema(num_uints=1, num_byteslices=0),
    )
    
    # Sign and send transaction
    signed_txn = txn.sign(deployer_private_key)
    tx_id = client.send_transaction(signed_txn)
    
    # Wait for confirmation
    print(f"⏳ Waiting for confirmation...")
    result = algosdk.future.transaction.wait_for_confirmation(client, tx_id, 4)
    
    app_id = result['application-index']
    print(f"✅ Contract deployed successfully!")
    print(f"📋 App ID: {app_id}")
    print(f"🔗 Transaction ID: {tx_id}")
    
    return app_id, tx_id

if __name__ == "__main__":
    try:
        app_id, tx_id = deploy_contract()
        
        print("\n🎉 LOCALNET DEPLOYMENT SUCCESSFUL!")
        print(f"📱 App ID: {app_id}")
        print(f"🔗 Transaction: http://localhost:4001/v2/transactions/{tx_id}")
        
    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        print("💡 Make sure LocalNet is running: algokit localnet start")
        exit(1)
