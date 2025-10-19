#!/bin/bash

# ProofChain AlgoKit Setup Script
# Sets up development environment and builds contracts

echo "🚀 ProofChain AlgoKit Setup"
echo "=========================="

# Check Python version
python_version=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1-2)
required_version="3.12"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Python 3.12+ required. Current: $python_version"
    exit 1
fi

echo "✅ Python version: $python_version"

# Check AlgoKit installation
if ! command -v algokit &> /dev/null; then
    echo "❌ AlgoKit not found. Installing..."
    pipx install algokit
else
    echo "✅ AlgoKit found: $(algokit --version)"
fi

# Install Python dependencies
echo "📦 Installing dependencies..."
python3 -m pip install -r requirements.txt

echo "🔨 Building smart contracts..."
python3 -m smart_contracts

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start LocalNet: algokit localnet start"
echo "   2. Deploy locally: python scripts/deploy_localnet.py"
echo "   3. Deploy TestNet: python scripts/deploy_testnet.py"
echo ""
echo "🔗 Useful commands:"
echo "   - Build contracts: python -m smart_contracts"
echo "   - Run tests: python scripts/deploy_localnet.py"
echo "   - Deploy TestNet: DEPLOYER_MNEMONIC='...' python scripts/deploy_testnet.py"
