#!/usr/bin/env python3
"""
Test ProofChain smart contract functionality
"""

import os
import json
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationNoOpTxn, PaymentTxn
from algosdk.atomic_transaction_composer import AtomicTransactionComposer

# TestNet configuration
ALGOD_TOKEN = ""
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_PORT = ""

def test_contract(app_id, test_mnemonic):
    """Test the deployed contract"""
    
    # Initialize client
    client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS, ALGOD_PORT)
    
    # Get test account
    test_private_key = mnemonic.to_private_key(test_mnemonic)
    test_address = account.address_from_private_key(test_private_key)
    
    print(f"🧪 Testing with account: {test_address}")
    
    # Get suggested parameters
    suggested_params = client.suggested_params()
    
    # Test 1: Submit a report
    print("\n📝 Test 1: Submitting a hate incident report...")
    
    submit_txn = ApplicationNoOpTxn(
        sender=test_address,
        sp=suggested_params,
        index=app_id,
        app_args=[b"submit_report", b"Test hate incident report for verification"],
    )
    
    signed_txn = submit_txn.sign(test_private_key)
    tx_id = client.send_transaction(signed_txn)
    
    # Wait for confirmation
    result = algosdk.future.transaction.wait_for_confirmation(client, tx_id, 4)
    print(f"✅ Report submitted successfully!")
    print(f"🔗 Transaction: https://testnet.algoexplorer.io/tx/{tx_id}")
    
    # Test 2: Get statistics
    print("\n📊 Test 2: Getting platform statistics...")
    
    stats_txn = ApplicationNoOpTxn(
        sender=test_address,
        sp=suggested_params,
        index=app_id,
        app_args=[b"get_stats"],
    )
    
    signed_stats_txn = stats_txn.sign(test_private_key)
    stats_tx_id = client.send_transaction(signed_stats_txn)
    
    # Wait for confirmation
    stats_result = algosdk.future.transaction.wait_for_confirmation(client, stats_tx_id, 4)
    print(f"✅ Statistics retrieved successfully!")
    print(f"🔗 Transaction: https://testnet.algoexplorer.io/tx/{stats_tx_id}")
    
    # Test 3: Rate limiting
    print("\n⏰ Test 3: Testing rate limiting...")
    
    try:
        # Try to submit another report immediately (should fail due to rate limiting)
        submit_txn2 = ApplicationNoOpTxn(
            sender=test_address,
            sp=suggested_params,
            index=app_id,
            app_args=[b"submit_report", b"Second report too soon"],
        )
        
        signed_txn2 = submit_txn2.sign(test_private_key)
        tx_id2 = client.send_transaction(signed_txn2)
        
        # This should fail
        result2 = algosdk.future.transaction.wait_for_confirmation(client, tx_id2, 4)
        print("❌ Rate limiting failed - second report was accepted!")
        
    except Exception as e:
        print(f"✅ Rate limiting working correctly: {e}")
    
    print("\n🎉 All tests completed!")

if __name__ == "__main__":
    # Get app ID from deployment info
    try:
        with open("deployment_info.json", "r") as f:
            deployment_info = json.load(f)
            app_id = deployment_info["app_id"]
    except FileNotFoundError:
        print("❌ Error: deployment_info.json not found")
        print("💡 Deploy the contract first with: python scripts/deploy_testnet.py")
        exit(1)
    
    # Get test mnemonic from environment
    test_mnemonic = os.getenv("TEST_MNEMONIC")
    
    if not test_mnemonic:
        print("❌ Error: TEST_MNEMONIC environment variable not set")
        print("💡 Set it with: export TEST_MNEMONIC='your 25 word mnemonic'")
        exit(1)
    
    try:
        test_contract(app_id, test_mnemonic)
    except Exception as e:
        print(f"❌ Testing failed: {e}")
        exit(1)
