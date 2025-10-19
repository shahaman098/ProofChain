#!/usr/bin/env python3
"""
Verify ProofChain hackathon compliance
"""

import os
import json
import sys

def check_file_exists(path, description):
    """Check if file exists and report status"""
    if os.path.exists(path):
        print(f"✅ {description}: {path}")
        return True
    else:
        print(f"❌ {description}: {path} - MISSING")
        return False

def check_algokit_compliance():
    """Check AlgoKit compliance"""
    print("\n🔧 AlgoKit Compliance Check")
    print("=" * 40)
    
    checks = [
        (".algokit.toml", "AlgoKit configuration"),
        ("pyproject.toml", "Python project configuration"),
        ("smart_contracts/", "Smart contracts directory"),
        ("scripts/", "Scripts directory"),
        ("artifacts/", "Artifacts directory")
    ]
    
    all_passed = True
    for path, desc in checks:
        if not check_file_exists(path, desc):
            all_passed = False
    
    return all_passed

def check_smart_contract():
    """Check smart contract implementation"""
    print("\n🏗️ Smart Contract Check")
    print("=" * 40)
    
    checks = [
        ("smart_contracts/proofchain_contract.py", "Custom PyTeal contract"),
        ("artifacts/ProofChain.approval.teal", "Compiled approval program"),
        ("artifacts/ProofChain.clear.teal", "Compiled clear program"),
        ("artifacts/ProofChain.arc32.json", "ABI specification")
    ]
    
    all_passed = True
    for path, desc in checks:
        if not check_file_exists(path, desc):
            all_passed = False
    
    # Check if TEAL files have content
    if os.path.exists("artifacts/ProofChain.approval.teal"):
        with open("artifacts/ProofChain.approval.teal", "r") as f:
            content = f.read()
            if len(content) > 100:
                print(f"✅ Approval program: {len(content)} characters")
            else:
                print(f"❌ Approval program: Too short ({len(content)} chars)")
                all_passed = False
    
    return all_passed

def check_deployment_scripts():
    """Check deployment scripts"""
    print("\n🚀 Deployment Scripts Check")
    print("=" * 40)
    
    checks = [
        ("scripts/deploy_testnet.py", "TestNet deployment script"),
        ("scripts/deploy_localnet.py", "LocalNet deployment script"),
        ("scripts/test_contract.py", "Contract testing script"),
        ("scripts/update_frontend.py", "Frontend update script")
    ]
    
    all_passed = True
    for path, desc in checks:
        if not check_file_exists(path, desc):
            all_passed = False
    
    return all_passed

def check_deployment_status():
    """Check if contract is deployed"""
    print("\n🌐 Deployment Status Check")
    print("=" * 40)
    
    if os.path.exists("deployment_info.json"):
        with open("deployment_info.json", "r") as f:
            deployment_info = json.load(f)
        
        print(f"✅ Contract deployed!")
        print(f"📱 App ID: {deployment_info.get('app_id', 'Unknown')}")
        print(f"🔗 Transaction: {deployment_info.get('tx_id', 'Unknown')}")
        print(f"🌐 Network: {deployment_info.get('network', 'Unknown')}")
        
        return True
    else:
        print("⚠️  Contract not deployed yet")
        print("💡 Run: python scripts/deploy_testnet.py")
        return False

def main():
    """Main compliance check"""
    print("🛡️ ProofChain Hackathon Compliance Verification")
    print("=" * 50)
    
    # Run all checks
    algokit_ok = check_algokit_compliance()
    contract_ok = check_smart_contract()
    scripts_ok = check_deployment_scripts()
    deployed_ok = check_deployment_status()
    
    # Summary
    print("\n📊 Compliance Summary")
    print("=" * 40)
    
    total_score = 0
    max_score = 4
    
    if algokit_ok:
        print("✅ AlgoKit Integration: PASSED")
        total_score += 1
    else:
        print("❌ AlgoKit Integration: FAILED")
    
    if contract_ok:
        print("✅ Custom Smart Contract: PASSED")
        total_score += 1
    else:
        print("❌ Custom Smart Contract: FAILED")
    
    if scripts_ok:
        print("✅ Deployment Scripts: PASSED")
        total_score += 1
    else:
        print("❌ Deployment Scripts: FAILED")
    
    if deployed_ok:
        print("✅ TestNet Deployment: PASSED")
        total_score += 1
    else:
        print("⚠️  TestNet Deployment: NOT DEPLOYED")
    
    # Final score
    percentage = (total_score / max_score) * 100
    
    print(f"\n🏆 Overall Score: {total_score}/{max_score} ({percentage:.0f}%)")
    
    if percentage >= 75:
        print("🎉 HACKATHON COMPLIANT!")
        print("✅ Ready for submission")
    elif percentage >= 50:
        print("⚠️  PARTIALLY COMPLIANT")
        print("💡 Deploy contract to TestNet for full compliance")
    else:
        print("❌ NOT COMPLIANT")
        print("💡 Fix missing components before submission")
    
    return percentage >= 75

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
