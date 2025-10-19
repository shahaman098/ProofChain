# 🏆 ProofChain: Algorand Hackathon Submission

## 🎯 Project Overview

**ProofChain** is a decentralized hate crime reporting platform built on Algorand blockchain, empowering communities to anonymously report incidents while maintaining data integrity and transparency.

## ✅ Hackathon Requirements Compliance

### ✅ Custom Smart Contract
- **Location**: `/smart_contracts/proofchain_contract.py`
- **Language**: PyTeal (Python-based TEAL generation)
- **Features**: Custom reporting logic, box storage, ABI methods

### ✅ AlgoKit Integration
- **Config**: `.algokit.toml` - Full AlgoKit project structure
- **Build System**: `pyproject.toml` with proper dependencies
- **Scripts**: Automated build and deployment

### ✅ TEAL Artifacts Generated
- **Approval**: `artifacts/ProofChain.approval.teal` (208 lines)
- **Clear State**: `artifacts/ProofChain.clear.teal` 
- **ABI Spec**: `artifacts/ProofChain.arc32.json`

### ✅ TestNet Deployment Ready
- **Script**: `scripts/deploy_testnet.py`
- **Guide**: `DEPLOYMENT_GUIDE.md`
- **Demo**: Successfully compiled and tested

## 🚀 Smart Contract Features

### Core Methods (ABI Compliant)
1. **`submit_report`** - Submit hate incident reports
   - Inputs: incident_type, description, location, evidence_cid, police_ref
   - Storage: Box storage for scalability
   - Returns: Unique report ID

2. **`get_report`** - Retrieve report by ID
   - Input: report_id
   - Returns: Full report data from box storage

3. **`get_stats`** - Platform statistics
   - Returns: Total reports, categories breakdown

### Technical Implementation
- **Box Storage**: Efficient data management for unlimited reports
- **Global State**: Platform counters and statistics
- **Input Validation**: Comprehensive security checks
- **Random ID Generation**: Secure report identification

## 📊 Technical Specifications

| Component | Details |
|-----------|---------|
| **Smart Contract** | PyTeal 0.27.0 |
| **SDK** | py-algorand-sdk 2.11.1 |
| **Project Structure** | AlgoKit compliant |
| **Global Schema** | 1 uint, 2 bytes |
| **Local Schema** | 0 uint, 0 bytes |
| **TEAL Version** | v8 |

## 🔧 Build & Deploy Process

### Local Development
```bash
# Setup environment
./setup.sh

# Activate virtual environment  
source venv/bin/activate

# Build artifacts
python -m smart_contracts

# Run demo
python scripts/demo_contract.py
```

### TestNet Deployment
```bash
# Set deployer account
export DEPLOYER_MNEMONIC="your 25 word mnemonic here"

# Deploy to TestNet
python scripts/deploy_testnet.py
```

## 📁 Project Structure
```
proofchain-algokit/
├── .algokit.toml              # AlgoKit configuration
├── pyproject.toml             # Python project setup
├── requirements.txt           # Dependencies
├── setup.sh                   # Environment setup
├── smart_contracts/           # Contract source code
│   ├── proofchain_contract.py # Main contract
│   ├── __init__.py           
│   └── __main__.py            # Build script
├── artifacts/                 # Generated TEAL files
│   ├── ProofChain.approval.teal
│   ├── ProofChain.clear.teal
│   └── ProofChain.arc32.json
├── scripts/                   # Deployment & testing
│   ├── deploy_testnet.py      # TestNet deployment
│   ├── deploy_localnet.py     # LocalNet testing  
│   └── demo_contract.py       # Feature demonstration
└── docs/                      # Documentation
```

## 🎥 Demo & Documentation

### Live Demo
- **Contract Demo**: `scripts/demo_contract.py` ✅
- **Feature Showcase**: All ABI methods tested ✅
- **Compilation Success**: TEAL artifacts generated ✅

### Technical Videos (Ready for Recording)
- [ ] **Technical Deep Dive**: Smart contract architecture explanation
- [ ] **Live Deployment**: TestNet deployment walkthrough  
- [ ] **Frontend Integration**: Web3 wallet connection demo

### Screenshots (Ready for Capture)
- [ ] **Contract on AlgoExplorer**: Block explorer verification
- [ ] **Deployment Output**: Terminal deployment success
- [ ] **ABI Specification**: ARC-32 JSON structure
- [ ] **Frontend Integration**: Wallet connection interface

## 🌐 Block Explorer Links

### TestNet Deployment (Example Format)
```
📱 App ID: [TO_BE_DEPLOYED]
🔗 AlgoExplorer: https://testnet.algoexplorer.io/application/[APP_ID]
🌐 Pera Explorer: https://testnet.explorer.perawallet.app/application/[APP_ID]
📋 Transaction: https://testnet.algoexplorer.io/tx/[TX_ID]
```

## 💡 Innovation Highlights

### Blockchain Benefits
- **Immutable Records**: Tamper-proof incident logging
- **Anonymous Reporting**: Privacy-preserving witness protection
- **Transparent Statistics**: Public accountability metrics
- **Decentralized Storage**: Censorship-resistant data

### Technical Innovation
- **Box Storage**: Scalable data architecture
- **ABI Compliance**: Standard interface implementation  
- **AlgoKit Integration**: Modern development workflow
- **Multi-Network**: LocalNet testing + TestNet deployment

## 🏅 Submission Checklist

- [x] **Custom Smart Contract**: Unique PyTeal implementation
- [x] **AlgoKit Project**: Full .algokit.toml configuration
- [x] **TEAL Artifacts**: Generated approval & clear state programs
- [x] **ABI Specification**: ARC-32 compliant JSON
- [x] **Build System**: Automated compilation pipeline
- [x] **Deployment Scripts**: TestNet deployment automation
- [x] **Documentation**: Comprehensive README & guides
- [x] **Testing**: Contract functionality verification
- [ ] **TestNet Deployment**: Live contract deployment
- [ ] **Demo Videos**: Technical explanation & walkthrough
- [ ] **Screenshots**: Block explorer & interface captures
- [ ] **Final Submission**: GitHub repository finalization

## 🎯 Next Steps for Final Submission

1. **Deploy to TestNet** using `scripts/deploy_testnet.py`
2. **Record Demo Videos** showcasing features
3. **Capture Screenshots** of deployment & explorer
4. **Update README** with live App ID and explorer links
5. **Submit to Hackathon** with complete documentation

---

**ProofChain**: Empowering communities through decentralized reporting on Algorand blockchain.

*Built with ❤️ for the Algorand Community*
