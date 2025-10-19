# 🛡️ ProofChain Smart Contract

Custom Algorand smart contract for decentralized hate crime reporting platform.

## 🏗️ Architecture

### Contract Features
- **Custom PyTeal Implementation**: Purpose-built for hate incident reporting
- **Box Storage**: Scalable report storage using Algorand's box storage
- **Rate Limiting**: Anti-spam protection (1 report per minute per user)
- **Input Validation**: Comprehensive data validation and sanitization
- **Anonymous Reporting**: Optional anonymous incident reporting
- **Global Statistics**: Platform-wide analytics and transparency

### ABI Methods
- `submit_report(message)` - Submit new hate incident report
- `get_report(report_id)` - Retrieve report by transaction ID
- `get_stats()` - Get platform statistics and counters

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- AlgoKit CLI
- Algorand TestNet account with ALGOs

### Installation
```bash
# Clone and navigate to contract directory
cd proofchain-algokit

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install pyteal py-algorand-sdk
```

### Compile Contract
```bash
# Compile PyTeal to TEAL
python smart_contracts/proofchain_contract.py
```

### Deploy to TestNet
```bash
# Set your mnemonic
export DEPLOYER_MNEMONIC="your 25 word mnemonic here"

# Deploy contract
python scripts/deploy_testnet.py
```

### Deploy to LocalNet
```bash
# Start LocalNet
algokit localnet start

# Deploy contract
python scripts/deploy_localnet.py
```

### Test Contract
```bash
# Set test account mnemonic
export TEST_MNEMONIC="your test account mnemonic"

# Run tests
python scripts/test_contract.py
```

## 📁 Project Structure

```
proofchain-algokit/
├── .algokit.toml              # AlgoKit configuration
├── pyproject.toml             # Python project setup
├── smart_contracts/
│   └── proofchain_contract.py # Custom PyTeal implementation
├── scripts/
│   ├── deploy_testnet.py      # TestNet deployment
│   ├── deploy_localnet.py   # LocalNet deployment
│   └── test_contract.py      # Contract testing
├── artifacts/
│   ├── ProofChain.approval.teal  # Compiled approval program
│   ├── ProofChain.clear.teal     # Compiled clear program
│   └── ProofChain.arc32.json     # ABI specification
└── README.md                  # This file
```

## 🔧 Technical Details

### State Schema
- **Global State**: 1 uint, 2 bytes (counters & metadata)
- **Local State**: 1 uint, 0 bytes (rate limiting)
- **Box Storage**: Dynamic report data storage

### Security Features
- Input validation and sanitization
- Rate limiting (1 report per minute)
- Sender verification
- Immutable record keeping

### Generated Artifacts
- **Approval Program**: ~140 lines of optimized TEAL v8
- **Clear Program**: Minimal clear state program
- **ABI Specification**: Complete ARC-32 JSON

## 🌐 Network Configuration

### TestNet
- **Algod**: https://testnet-api.algonode.cloud
- **Explorer**: https://testnet.algoexplorer.io
- **Faucet**: https://bank.testnet.algorand.network

### LocalNet
- **Algod**: http://localhost:4001
- **KMD**: http://localhost:4002
- **Explorer**: http://localhost:4001

## 📊 Deployment Results

After deployment, you'll get:
- **App ID**: Unique contract identifier
- **Transaction ID**: Deployment transaction hash
- **Block Explorer Links**: Direct links to view contract
- **Deployment Info**: JSON file with all details

## 🧪 Testing

The contract includes comprehensive testing:
- Report submission validation
- Rate limiting verification
- Statistics retrieval
- Error handling

## 🔗 Integration

### Frontend Integration
Update your frontend to use the deployed App ID:

```typescript
export const APP_ID = YOUR_DEPLOYED_APP_ID;
export const ALGOD_SERVER = 'https://testnet-api.algonode.cloud';
```

### ABI Methods
```typescript
// Submit report
const txn = new algosdk.ApplicationNoOpTxn({
  from: sender,
  appIndex: APP_ID,
  appArgs: [new Uint8Array(Buffer.from("submit_report")), message]
});

// Get statistics
const statsTxn = new algosdk.ApplicationNoOpTxn({
  from: sender,
  appIndex: APP_ID,
  appArgs: [new Uint8Array(Buffer.from("get_stats"))]
});
```

## 🏆 Hackathon Compliance

This smart contract meets all Algorand hackathon requirements:
- ✅ **Custom Implementation**: Original PyTeal code
- ✅ **AlgoKit Integration**: Proper project structure
- ✅ **TEAL Artifacts**: Generated approval and clear programs
- ✅ **ABI Specification**: Complete method definitions
- ✅ **TestNet Deployment**: Live contract verification
- ✅ **Documentation**: Comprehensive technical docs

## 📚 Additional Resources

- [AlgoKit Documentation](https://github.com/algorandfoundation/algokit)
- [PyTeal Documentation](https://pyteal.readthedocs.io/)
- [Algorand Developer Portal](https://developer.algorand.org/)
- [Box Storage Guide](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/boxes/)
