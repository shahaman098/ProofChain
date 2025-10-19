# 🚀 TrustChain Smart Contract Deployment Guide

This guide walks you through deploying the custom TrustChain smart contract to Algorand TestNet and integrating it with the frontend.

## 📋 Prerequisites

### 1. System Requirements
- Python 3.8+
- Node.js 16+
- Git

### 2. Install AlgoKit
```bash
# Install AlgoKit CLI
pipx install algokit

# Verify installation
algokit --version
algokit doctor
```

### 3. Setup Project
```bash
# Navigate to smart contract directory
cd trustchain-smart-contract

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 🔨 Compilation

### Compile Smart Contract
```bash
# Compile PyTeal to TEAL
python report_contract.py
```

**Expected Output:**
```
✅ Smart contract compiled successfully!
📄 Generated files: approval.teal, clear_state.teal
```

**Generated Files:**
- `approval.teal` - Main contract logic
- `clear_state.teal` - State clearing logic

## 💰 Account Setup

### 1. Generate Deployment Account
```bash
python -c "
from algosdk import account, mnemonic
private_key, address = account.generate_account()
mnemonic_phrase = mnemonic.from_private_key(private_key)
print(f'Address: {address}')
print(f'Mnemonic: {mnemonic_phrase}')
print('Fund this account at: https://bank.testnet.algorand.network/')
"
```

### 2. Fund Account
1. Copy the generated address
2. Go to [Algorand TestNet Dispenser](https://bank.testnet.algorand.network/)
3. Paste your address and request funds
4. Wait for confirmation (usually instant)

### 3. Set Environment Variable
```bash
export ALGORAND_MNEMONIC="your 25 word mnemonic phrase here"
```

## 🚀 Deployment

### Deploy to TestNet
```bash
# Ensure environment variable is set
echo $ALGORAND_MNEMONIC

# Deploy the contract
python deploy.py
```

**Expected Output:**
```
🚀 Deploying TrustChain Smart Contract to Algorand TestNet
============================================================
✅ Connected to Algorand TestNet
✅ Smart contract programs compiled
💰 Account balance: 10.000000 ALGO
📤 Submitted transaction: ABC123...
Transaction confirmed!
🎉 Application deployed successfully!
📱 Application ID: 123456789
🔗 Application Address: XYZ789...
🌐 TestNet Explorer: https://testnet.algoexplorer.io/application/123456789
💾 Deployment info saved to deployment_info.json
```

### Deployment Artifacts
After successful deployment:
- `deployment_info.json` - Contains App ID and deployment details
- Transaction ID for verification
- Block explorer links

## 🧪 Testing

### Run Contract Tests
```bash
# Test all contract functions
python test_contract.py
```

**Test Coverage:**
- ✅ User opt-in functionality
- ✅ Report submission
- ✅ Statistics retrieval
- ✅ Rate limiting verification
- ✅ Global state management

### Manual Testing
```bash
# Check global state
python -c "
import json
with open('deployment_info.json') as f:
    info = json.load(f)
    print(f'App ID: {info[\"app_id\"]}')
    print(f'Explorer: {info[\"explorer_url\"]}')
"
```

## 🔄 Frontend Integration

### Update Frontend Configuration
```bash
# Automatically update frontend with new App ID
python update_frontend.py
```

This script updates:
- `.env` files in frontend directories
- TypeScript/JavaScript source files
- README documentation

### Manual Frontend Update
If automatic update fails, manually edit:

**File: `trustchain-witness-main/.env`**
```env
VITE_ALGORAND_APP_ID=YOUR_DEPLOYED_APP_ID
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_API_BASE_URL=http://localhost:3001
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
```

**File: `trustchain-witness-main/src/lib/algorand.ts`**
```typescript
export const APP_ID = parseInt(import.meta.env.VITE_ALGORAND_APP_ID) || YOUR_APP_ID;
```

## 🔍 Verification

### 1. Block Explorer Verification
Visit the TestNet explorer links to verify:
- ✅ Contract exists and is deployed
- ✅ Correct global state schema
- ✅ Deployment transaction successful

### 2. Frontend Integration Test
```bash
# Start frontend
cd ../trustchain-witness-main
npm run dev

# Test in browser:
# 1. Connect Pera Wallet
# 2. Submit a test report
# 3. Verify transaction appears on blockchain
```

### 3. Contract Function Test
```bash
# Test contract functions directly
cd trustchain-smart-contract
python test_contract.py
```

## 📊 Monitoring

### Check Global State
```bash
python -c "
from algosdk.v2client import algod
import json

# Load deployment info
with open('deployment_info.json') as f:
    info = json.load(f)
    app_id = info['app_id']

# Connect to TestNet
client = algod.AlgodClient('', 'https://testnet-api.algonode.cloud')

# Get application info
app_info = client.application_info(app_id)
print(f'App ID: {app_id}')
print(f'Creator: {app_info[\"params\"][\"creator\"]}')
print(f'Global State:')
for state in app_info['params']['global-state']:
    import base64
    key = base64.b64decode(state['key']).decode()
    if state['value']['type'] == 1:
        value = state['value']['uint']
    else:
        value = base64.b64decode(state['value']['bytes']).decode()
    print(f'  {key}: {value}')
"
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Insufficient Balance
```
❌ Insufficient balance. You need at least 0.1 ALGO to deploy the contract.
```
**Solution:** Fund your account at https://bank.testnet.algorand.network/

#### 2. Invalid Mnemonic
```
❌ Invalid mnemonic or account error
```
**Solution:** Check the mnemonic phrase formatting (25 words, space-separated)

#### 3. Compilation Errors
```
❌ Failed to compile programs
```
**Solution:** 
- Check Python dependencies: `pip install -r requirements.txt`
- Verify PyTeal version compatibility

#### 4. Network Connection Issues
```
❌ Failed to connect to Algorand
```
**Solution:** Check internet connection and TestNet availability

### Debug Mode
Enable verbose logging:
```bash
export ALGORAND_DEBUG=1
python deploy.py
```

## 📚 Additional Resources

### Documentation
- [Smart Contract Documentation](SMART_CONTRACT_DOCUMENTATION.md)
- [Algorand Developer Docs](https://developer.algorand.org/)
- [PyTeal Documentation](https://pyteal.readthedocs.io/)

### Block Explorers
- [Pera Explorer](https://testnet.explorer.perawallet.app/)
- [AlgoExplorer](https://testnet.algoexplorer.io/)
- [Goal Seeker](https://goalseeker.purestake.io/algorand/testnet)

### Tools
- [AlgoKit](https://github.com/algorandfoundation/algokit-cli)
- [Algorand Sandbox](https://github.com/algorand/sandbox)
- [TestNet Dispenser](https://bank.testnet.algorand.network/)

## 📋 Deployment Checklist

- [ ] ✅ AlgoKit installed and verified
- [ ] ✅ Virtual environment created and activated
- [ ] ✅ Dependencies installed (`requirements.txt`)
- [ ] ✅ Smart contract compiled successfully
- [ ] ✅ Deployment account generated
- [ ] ✅ Account funded with TestNet ALGO
- [ ] ✅ Environment variable set (`ALGORAND_MNEMONIC`)
- [ ] ✅ Contract deployed to TestNet
- [ ] ✅ `deployment_info.json` generated
- [ ] ✅ Contract tested with `test_contract.py`
- [ ] ✅ Frontend updated with new App ID
- [ ] ✅ Block explorer verification completed
- [ ] ✅ End-to-end testing performed

## 🎯 Next Steps

After successful deployment:

1. **📸 Take Screenshots** - Document the working UI
2. **🎥 Create Demo Videos** - Show the platform in action
3. **📝 Update Documentation** - Add deployment details to README
4. **🧪 Comprehensive Testing** - Test all user workflows
5. **🚀 Prepare for Demo Day** - Create presentation materials

---

**🎉 Congratulations!** You've successfully deployed a custom Algorand smart contract and integrated it with a full-stack application. This demonstrates mastery of blockchain development and fulfills the hackathon's technical requirements.
