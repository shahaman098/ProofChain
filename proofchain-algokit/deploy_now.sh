#!/bin/bash
# ProofChain Smart Contract Deployment Script

echo "🛡️ ProofChain Smart Contract Deployment"
echo "======================================"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install pyteal py-algorand-sdk algosdk

# Compile contract
echo "🔨 Compiling smart contract..."
python smart_contracts/proofchain_contract.py

# Check if mnemonic is set
if [ -z "$DEPLOYER_MNEMONIC" ]; then
    echo ""
    echo "❌ DEPLOYER_MNEMONIC not set!"
    echo ""
    echo "📋 To deploy, you need to:"
    echo "1. Get TestNet ALGOs: https://bank.testnet.algorand.network/"
    echo "2. Get your 25-word mnemonic from Pera Wallet"
    echo "3. Set the environment variable:"
    echo "   export DEPLOYER_MNEMONIC='your 25 word mnemonic here'"
    echo "4. Run this script again"
    echo ""
    exit 1
fi

# Deploy contract
echo "🚀 Deploying to TestNet..."
python scripts/deploy_testnet.py

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🔄 Updating frontend configuration..."
    python scripts/update_frontend.py
    
    echo ""
    echo "🎉 DEPLOYMENT COMPLETE!"
    echo "📱 Your custom smart contract is now live on TestNet"
    echo "🔗 Check the deployment_info.json file for details"
    echo ""
    echo "🧪 To test the contract:"
    echo "   export TEST_MNEMONIC='your test account mnemonic'"
    echo "   python scripts/test_contract.py"
else
    echo ""
    echo "❌ Deployment failed!"
    echo "💡 Check the error messages above"
    echo "💡 Make sure you have TestNet ALGOs"
    echo "💡 Verify your mnemonic is correct"
fi
