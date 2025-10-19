# 🚀 **FINAL DEPLOYMENT INSTRUCTIONS**

## **Step 1: Get TestNet ALGOs** 💰

1. **Visit**: https://bank.testnet.algorand.network/
2. **Enter your Pera Wallet address**
3. **Request ALGOs** (you need at least 0.5 ALGO)
4. **Wait for confirmation** (usually 1-2 minutes)

## **Step 2: Get Your Mnemonic** 🔑

1. **Open Pera Wallet**
2. **Go to Settings > Security > Show Passphrase**
3. **Copy your 25-word mnemonic phrase**
4. **Keep it secure** - you'll need it for deployment

## **Step 3: Deploy Your Contract** 🚀

Once you have your mnemonic, run these commands:

```bash
# Navigate to the contract directory
cd /Users/efi/proofchain/proofchain-algokit

# Set your mnemonic (replace with your actual mnemonic)
export DEPLOYER_MNEMONIC="your 25 word mnemonic phrase here"

# Deploy the contract
./deploy_now.sh
```

## **Expected Output** ✅

After successful deployment, you'll see:
```
✅ Contract deployed successfully!
📋 App ID: [YOUR_APP_ID]
🔗 Transaction ID: [YOUR_TX_ID]
📄 Deployment info saved to deployment_info.json

✅ Deployment successful!

🔄 Updating frontend configuration...
✅ Updated frontend with App ID [YOUR_APP_ID]

🎉 DEPLOYMENT COMPLETE!
📱 Your custom smart contract is now live on TestNet
```

## **Step 4: Verify Deployment** 🔍

Check your contract on:
- **AlgoExplorer**: https://testnet.algoexplorer.io/application/[YOUR_APP_ID]
- **Pera Explorer**: https://testnet.explorer.perawallet.app/application/[YOUR_APP_ID]

## **Step 5: Test Your Contract** 🧪

```bash
# Set test account mnemonic (optional)
export TEST_MNEMONIC="your test account mnemonic"

# Test the contract
python scripts/test_contract.py
```

## **Troubleshooting** 🔧

### **Common Issues:**
1. **"Insufficient ALGOs"**: Get more from the faucet
2. **"Invalid Mnemonic"**: Check your 25-word phrase
3. **"Network Error"**: Try again in a few minutes

### **Need Help?**
- Check the error messages in the terminal
- Verify your TestNet ALGOs balance
- Ensure your mnemonic is correct (25 words, no typos)

## **Success!** 🎉

Once deployed, your project will be **100% hackathon compliant** and ready for submission!

**Your custom smart contract will be live on Algorand TestNet with:**
- ✅ Custom PyTeal implementation
- ✅ Box storage for reports
- ✅ Rate limiting and validation
- ✅ ABI methods for frontend integration
- ✅ Block explorer verification
