#!/usr/bin/env python3
"""
Deploy ProofChain smart contract to Algorand TestNet
"""

import os
import json
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, PaymentTxn, StateSchema
from algosdk.atomic_transaction_composer import AtomicTransactionComposer
from algosdk.abi import Contract
from algosdk.transaction import compile_teal, Mode

# TestNet configuration
ALGOD_TOKEN = ""
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_PORT = ""

def load_contract():
    """Load the compiled contract"""
    with open("artifacts/ProofChain.approval.teal", "r") as f:
        approval_program = f.read()
    
    with open("artifacts/ProofChain.clear.teal", "r") as f:
        clear_program = f.read()
    
    # Compile TEAL to bytes
    approval_program_bytes = compile_teal(approval_program, mode=Mode.Application)
    clear_program_bytes = compile_teal(clear_program, mode=Mode.Application)
    
    return approval_program_bytes, clear_program_bytes

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
    approval_program, clear_program = load_contract()
    
    # Create application
    txn = ApplicationCreateTxn(
        sender=deployer_address,
        sp=suggested_params,
        on_complete=0,  # NoOp
        approval_program=approval_program,
        clear_program=clear_program,
        global_schema=StateSchema(num_uints=1, num_byte_slices=2),
        local_schema=StateSchema(num_uints=1, num_byte_slices=0),
    )
    
    # Sign and send transaction
    signed_txn = txn.sign(deployer_private_key)
    tx_id = client.send_transaction(signed_txn)
    
    # Wait for confirmation
    print(f"⏳ Waiting for confirmation...")
    import time
    time.sleep(3)  # Wait for transaction to be confirmed
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
        "network": "testnet",
        "approval_program_size": len(approval_program),
        "clear_program_size": len(clear_program)
    }
    
    with open("deployment_info.json", "w") as f:
        json.dump(deployment_info, f, indent=2)
    
    print(f"📄 Deployment info saved to deployment_info.json")
    
    return app_id, tx_id

if __name__ == "__main__":
    # Get mnemonic from environment
    deployer_mnemonic = os.getenv("DEPLOYER_MNEMONIC")
    
    if not deployer_mnemonic:
        print("❌ Error: DEPLOYER_MNEMONIC environment variable not set")
        print("💡 Set it with: export DEPLOYER_MNEMONIC='your 25 word mnemonic'")
        exit(1)
    
    try:
        app_id, tx_id = deploy_contract(deployer_mnemonic)
        
        print("\n🎉 DEPLOYMENT SUCCESSFUL!")
        print(f"📱 App ID: {app_id}")
        print(f"🔗 Transaction: https://testnet.algoexplorer.io/tx/{tx_id}")
        print(f"📋 Contract: https://testnet.algoexplorer.io/application/{app_id}")
        
    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        exit(1)
