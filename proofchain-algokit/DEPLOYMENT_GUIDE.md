# 🚀 ProofChain Deployment Guide

## Prerequisites

### 1. Get TestNet ALGOs
Visit the Algorand TestNet Faucet: https://bank.testnet.algorand.network/

- Enter your wallet address
- Request ALGOs (you need at least 0.5 ALGO)
- Wait for the transaction to confirm

### 2. Get Your Mnemonic
- Open Pera Wallet
- Go to Settings > Security > Show Passphrase
- Copy your 25-word mnemonic phrase

## Deployment Steps

### Step 1: Set Environment Variables
```bash
export DEPLOYER_MNEMONIC="your 25 word mnemonic phrase here"
```

### Step 2: Deploy Contract
```bash
cd proofchain-algokit/
source venv/bin/activate
python scripts/deploy_testnet.py
```

### Step 3: Update Frontend
```bash
python scripts/update_frontend.py
```

### Step 4: Test Contract
```bash
export TEST_MNEMONIC="your test account mnemonic"
python scripts/test_contract.py
```

## Expected Output

After successful deployment, you'll see:
```
✅ Contract deployed successfully!
📋 App ID: [YOUR_APP_ID]
🔗 Transaction ID: [YOUR_TX_ID]
📄 Deployment info saved to deployment_info.json
```

## Verification

Check your contract on:
- **AlgoExplorer**: https://testnet.algoexplorer.io/application/[YOUR_APP_ID]
- **Pera Explorer**: https://testnet.explorer.perawallet.app/application/[YOUR_APP_ID]

## Troubleshooting

### Common Issues:
1. **Insufficient ALGOs**: Get more from the faucet
2. **Invalid Mnemonic**: Check your 25-word phrase
3. **Network Issues**: Try again in a few minutes

### Need Help?
- Check the logs for specific error messages
- Verify your TestNet ALGOs balance
- Ensure your mnemonic is correct
