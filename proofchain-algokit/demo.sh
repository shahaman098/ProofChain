#!/bin/bash
# ProofChain Smart Contract Demo Script

echo "🛡️ ProofChain Smart Contract Demo"
echo "=================================="

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
pip install pyteal py-algorand-sdk

# Compile contract
echo "🔨 Compiling smart contract..."
python smart_contracts/proofchain_contract.py

# Check if deployment info exists
if [ -f "deployment_info.json" ]; then
    echo "✅ Contract already deployed!"
    APP_ID=$(python -c "import json; print(json.load(open('deployment_info.json'))['app_id'])")
    echo "📱 App ID: $APP_ID"
    echo "🔗 Explorer: https://testnet.algoexplorer.io/application/$APP_ID"
else
    echo "🚀 Contract not deployed yet."
    echo "💡 To deploy:"
    echo "   1. Get TestNet ALGOs: https://bank.testnet.algorand.network/"
    echo "   2. Set mnemonic: export DEPLOYER_MNEMONIC='your mnemonic'"
    echo "   3. Deploy: python scripts/deploy_testnet.py"
fi

echo ""
echo "🎉 Demo completed!"
echo "📚 See README.md for full documentation"
