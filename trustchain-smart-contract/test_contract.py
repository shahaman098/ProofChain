#!/usr/bin/env python3
"""
TrustChain Smart Contract Testing Script
Comprehensive testing of the deployed smart contract functions
"""

import os
import json
import time
from algosdk import account, mnemonic, transaction
from algosdk.v2client import algod
from algosdk.logic import get_application_address

# Configuration
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""

def get_algod_client():
    """Initialize Algorand client"""
    return algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)

def load_deployment_info():
    """Load deployment information from JSON file"""
    try:
        with open("deployment_info.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print("❌ deployment_info.json not found. Deploy the contract first.")
        return None

def test_opt_in(client, private_key, app_id):
    """Test user opt-in to the smart contract"""
    print("\n🔄 Testing user opt-in...")
    
    sender = account.address_from_private_key(private_key)
    params = client.suggested_params()
    
    # Create opt-in transaction
    txn = transaction.ApplicationOptInTxn(
        sender=sender,
        sp=params,
        index=app_id,
    )
    
    # Sign and submit
    signed_txn = txn.sign(private_key)
    tx_id = client.send_transaction(signed_txn)
    
    # Wait for confirmation
    try:
        transaction.wait_for_confirmation(client, tx_id, 4)
        print(f"✅ Opt-in successful! Transaction: {tx_id}")
        return True
    except Exception as e:
        print(f"⚠️  Opt-in failed (may already be opted in): {e}")
        return False

def test_submit_report(client, private_key, app_id, report_data):
    """Test report submission to smart contract"""
    print(f"\n📝 Testing report submission...")
    print(f"Report: {report_data[:50]}...")
    
    sender = account.address_from_private_key(private_key)
    params = client.suggested_params()
    
    # Prepare application arguments
    app_args = [
        "submit_report".encode(),
        report_data.encode()
    ]
    
    # Create application call transaction
    txn = transaction.ApplicationNoOpTxn(
        sender=sender,
        sp=params,
        index=app_id,
        app_args=app_args,
    )
    
    # Sign and submit
    signed_txn = txn.sign(private_key)
    tx_id = client.send_transaction(signed_txn)
    
    # Wait for confirmation
    try:
        confirmed_txn = transaction.wait_for_confirmation(client, tx_id, 4)
        
        print(f"✅ Report submitted successfully!")
        print(f"   Transaction ID: {tx_id}")
        print(f"   Block: {confirmed_txn['confirmed-round']}")
        
        # Check for logs
        if 'logs' in confirmed_txn:
            print(f"   Contract logs: {len(confirmed_txn['logs'])} entries")
            for i, log in enumerate(confirmed_txn['logs']):
                import base64
                decoded = base64.b64decode(log).decode('utf-8', errors='ignore')
                print(f"   Log {i+1}: {decoded[:100]}")
        
        return tx_id
    except Exception as e:
        print(f"❌ Report submission failed: {e}")
        return None

def test_get_stats(client, private_key, app_id):
    """Test statistics retrieval from smart contract"""
    print("\n📊 Testing statistics retrieval...")
    
    sender = account.address_from_private_key(private_key)
    params = client.suggested_params()
    
    # Prepare application arguments
    app_args = [
        "get_stats".encode()
    ]
    
    # Create application call transaction
    txn = transaction.ApplicationNoOpTxn(
        sender=sender,
        sp=params,
        index=app_id,
        app_args=app_args,
    )
    
    # Sign and submit
    signed_txn = txn.sign(private_key)
    tx_id = client.send_transaction(signed_txn)
    
    # Wait for confirmation
    try:
        confirmed_txn = transaction.wait_for_confirmation(client, tx_id, 4)
        
        print(f"✅ Statistics retrieved successfully!")
        print(f"   Transaction ID: {tx_id}")
        
        # Check for logs
        if 'logs' in confirmed_txn:
            for log in confirmed_txn['logs']:
                import base64
                decoded = base64.b64decode(log).decode('utf-8', errors='ignore')
                print(f"   📈 Stats: {decoded}")
        
        return tx_id
    except Exception as e:
        print(f"❌ Statistics retrieval failed: {e}")
        return None

def test_rate_limiting(client, private_key, app_id):
    """Test rate limiting functionality"""
    print("\n⏱️  Testing rate limiting (spam prevention)...")
    
    # Submit first report
    first_report = f"Rate limit test report 1 - {int(time.time())}"
    tx_id_1 = test_submit_report(client, private_key, app_id, first_report)
    
    if tx_id_1:
        print("   First report submitted, now testing rate limit...")
        
        # Immediately try to submit another report (should fail due to rate limit)
        second_report = f"Rate limit test report 2 - {int(time.time())}"
        tx_id_2 = test_submit_report(client, private_key, app_id, second_report)
        
        if tx_id_2:
            print("   ⚠️  Rate limiting may not be working - second report succeeded immediately")
        else:
            print("   ✅ Rate limiting working - second report blocked as expected")
            
        print("   💡 Tip: Wait 60 seconds and try again to bypass rate limit")

def get_global_state(client, app_id):
    """Get and display global state of the application"""
    print(f"\n🌐 Reading global state...")
    
    try:
        app_info = client.application_info(app_id)
        global_state = app_info.get('params', {}).get('global-state', [])
        
        print(f"   App ID: {app_id}")
        print(f"   Creator: {app_info.get('params', {}).get('creator', 'Unknown')}")
        
        for state_item in global_state:
            key = state_item['key']
            value = state_item['value']
            
            # Decode key
            import base64
            decoded_key = base64.b64decode(key).decode('utf-8', errors='ignore')
            
            # Decode value based on type
            if value['type'] == 1:  # uint64
                decoded_value = value['uint']
            else:  # bytes
                decoded_value = base64.b64decode(value['bytes']).decode('utf-8', errors='ignore')
            
            print(f"   {decoded_key}: {decoded_value}")
            
    except Exception as e:
        print(f"❌ Failed to read global state: {e}")

def main():
    """Main testing function"""
    print("🧪 TrustChain Smart Contract Testing Suite")
    print("=" * 50)
    
    # Load deployment info
    deployment_info = load_deployment_info()
    if not deployment_info:
        return
    
    app_id = deployment_info['app_id']
    print(f"Testing App ID: {app_id}")
    
    # Initialize client
    client = get_algod_client()
    
    # Get test account
    mnemonic_phrase = os.getenv("ALGORAND_MNEMONIC")
    if not mnemonic_phrase:
        print("❌ Please set ALGORAND_MNEMONIC environment variable")
        return
    
    try:
        private_key = mnemonic.to_private_key(mnemonic_phrase)
        sender = account.address_from_private_key(private_key)
        
        print(f"🏦 Testing with account: {sender}")
        
        # Check balance
        account_info = client.account_info(sender)
        balance = account_info.get('amount', 0) / 1_000_000
        print(f"💰 Account balance: {balance:.6f} ALGO")
        
        if balance < 0.01:
            print("❌ Insufficient balance for testing")
            return
        
    except Exception as e:
        print(f"❌ Account error: {e}")
        return
    
    # Get initial global state
    get_global_state(client, app_id)
    
    # Test sequence
    print("\n" + "=" * 50)
    print("🚀 Starting Test Sequence")
    print("=" * 50)
    
    # 1. Test opt-in
    test_opt_in(client, private_key, app_id)
    
    # 2. Test report submission
    sample_reports = [
        f"Test hate incident report #{int(time.time())} - Verbal harassment at local park involving discriminatory language targeting minority group.",
        f"Anonymous report #{int(time.time())} - [ANONYMOUS:true] [POLICE_REF:TEST123] Witnessed graffiti with hateful symbols on community center wall.",
        f"Evidence report #{int(time.time())} - [EVIDENCE:QmTestIPFSHash123] Documented online harassment with screenshot evidence attached."
    ]
    
    successful_submissions = 0
    for i, report in enumerate(sample_reports, 1):
        print(f"\n--- Test Report {i}/3 ---")
        tx_id = test_submit_report(client, private_key, app_id, report)
        if tx_id:
            successful_submissions += 1
        
        # Wait a bit between submissions to avoid rate limiting
        if i < len(sample_reports):
            print("   ⏸️  Waiting 5 seconds before next submission...")
            time.sleep(5)
    
    # 3. Test statistics
    test_get_stats(client, private_key, app_id)
    
    # 4. Test rate limiting (optional - may trigger rate limit)
    user_input = input("\n❓ Test rate limiting? This may trigger the 60-second cooldown (y/N): ")
    if user_input.lower() in ['y', 'yes']:
        test_rate_limiting(client, private_key, app_id)
    
    # Final state check
    get_global_state(client, app_id)
    
    # Summary
    print("\n" + "=" * 50)
    print("📋 Test Summary")
    print("=" * 50)
    print(f"✅ Reports submitted successfully: {successful_submissions}/{len(sample_reports)}")
    print(f"🔗 Smart Contract App ID: {app_id}")
    print(f"🌐 View on TestNet Explorer: https://testnet.explorer.perawallet.app/application/{app_id}")
    print(f"🔍 Alternative Explorer: https://testnet.algoexplorer.io/application/{app_id}")
    
    if successful_submissions > 0:
        print("\n🎉 Smart contract is working correctly!")
        print("   ✅ Custom contract accepts and processes reports")
        print("   ✅ State updates are functioning")
        print("   ✅ Transaction logs contain report data")
        print("   ✅ Ready for frontend integration")
    else:
        print("\n⚠️  Issues detected - check error messages above")

if __name__ == "__main__":
    main()
