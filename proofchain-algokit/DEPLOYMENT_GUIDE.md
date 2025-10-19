# ProofChain TestNet Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prerequisites
```bash
# Ensure AlgoKit and dependencies are installed
source venv/bin/activate
algokit --version  # Should show v1.11.0 or higher
```

### 2. Fund Your Account
1. Generate a new account or use existing:
   ```bash
   algokit generate account
   ```
2. Fund at TestNet Bank: https://bank.testnet.algorand.network/
3. Minimum required: 0.5 ALGO for deployment

### 3. Set Environment Variable
```bash
# Replace with your 25-word mnemonic
export DEPLOYER_MNEMONIC="word1 word2 word3 ... word25"
```

### 4. Deploy to TestNet
```bash
source venv/bin/activate
python scripts/deploy_testnet.py
```

## 🎯 Expected Output
```
🚀 Deploying ProofChain to TestNet...
==================================================
✅ Connected to TestNet (Round: 34567890)
🏦 Deploying from: ABCD...XYZ
💰 Balance: 1.234 ALGO
📦 Compiling contract...
✅ Contract compiled successfully
📤 Submitting deployment transaction...
🔄 Waiting for confirmation...

🎉 ProofChain deployed successfully to TestNet!
==================================================
📱 App ID: 12345678
🔗 AlgoExplorer: https://testnet.algoexplorer.io/application/12345678
🌐 Pera Explorer: https://testnet.explorer.perawallet.app/application/12345678
📋 Transaction: https://testnet.algoexplorer.io/tx/ABC123...
🏦 Deployer: ABCD...XYZ
📅 Block: 34567891
💾 Deployment info saved to testnet_deployment.json

🧪 Testing deployed contract...
✅ submit_report test: SUCCESS
✅ get_report test: SUCCESS
✅ get_stats test: SUCCESS
```

## 🔍 Verification Steps

### 1. Check Block Explorer
- Visit the AlgoExplorer URL provided
- Verify contract details and ABI
- Confirm global state initialization

### 2. Review Deployment JSON
```bash
cat testnet_deployment.json
```

### 3. Test Contract Methods
The deployment script automatically tests:
- `submit_report` - Submit a hate incident report
- `get_report` - Retrieve report by ID
- `get_stats` - Get platform statistics

## 🏆 Hackathon Compliance

✅ **Custom Smart Contract**: PyTeal-based with unique logic
✅ **AlgoKit Integration**: Full .algokit.toml configuration  
✅ **TEAL Artifacts**: approval.teal, clear.teal, arc32.json
✅ **TestNet Deployment**: Public deployment with App ID
✅ **ABI Methods**: submit_report, get_report, get_stats
✅ **Box Storage**: Efficient report storage system
✅ **Global State**: Statistics and counters
✅ **Documentation**: Comprehensive README and guides

## 📞 Support

If deployment fails:
1. Check account balance (minimum 0.5 ALGO)
2. Verify mnemonic is correctly set
3. Ensure internet connection to TestNet
4. Check AlgoKit version compatibility

For hackathon judges:
- All source code in `/smart_contracts/`
- Artifacts in `/artifacts/`
- Deployment scripts in `/scripts/`
- Full documentation in `README.md`
