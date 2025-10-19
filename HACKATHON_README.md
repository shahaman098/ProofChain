# 🛡️ ProofChain - Decentralized Hate Incident Reporting Platform

<div align="center">

![ProofChain Banner](https://via.placeholder.com/800x200/1a1a1a/ffffff?text=ProofChain+Blockchain+Platform)

**A complete full-stack application for reporting hate incidents securely and anonymously, powered by Algorand blockchain and IPFS.**

[![Algorand](https://img.shields.io/badge/Blockchain-Algorand-00D4AA)](https://algorand.com)
[![TestNet](https://img.shields.io/badge/Network-TestNet-orange)](https://testnet.algoexplorer.io)
[![AlgoKit](https://img.shields.io/badge/Built_with-AlgoKit-blue)](https://github.com/algorandfoundation/algokit-cli)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 🏆 **ALGORAND HACKATHON SUBMISSION** 

### ✅ **HACKATHON REQUIREMENTS COMPLIANCE**

| Requirement | Status | Implementation |
|-------------|---------|---------------|
| **Custom Smart Contract** | ✅ **COMPLETED** | PyTeal-based contract with unique reporting logic |
| **AlgoKit Integration** | ✅ **COMPLETED** | Full `.algokit.toml` project structure |
| **TEAL Artifacts** | ✅ **COMPLETED** | Generated approval.teal, clear.teal, arc32.json |
| **TestNet Deployment** | 🚀 **READY** | Deployment script prepared (`scripts/deploy_testnet.py`) |
| **Documentation** | ✅ **COMPLETED** | Comprehensive README and guides |
| **Demo Video** | 📹 **READY** | Technical walkthrough prepared |

---

## 🔗 **Custom Smart Contract** ⭐

### ✅ **Requirement Fulfilled: Custom Smart Contract on Algorand**

**ProofChain features a completely custom smart contract built with modern AlgoKit:**

- **🏗️ Built with**: AlgoKit + PyTeal (Python)  
- **📋 App ID**: `[TO_BE_UPDATED_AFTER_DEPLOYMENT]`
- **🌐 Network**: Algorand TestNet
- **🔗 Block Explorer**: [View Contract on AlgoExplorer](https://testnet.algoexplorer.io/application/[APP_ID])
- **📄 Source Code**: [`proofchain-algokit/smart_contracts/proofchain_contract.py`](proofchain-algokit/smart_contracts/proofchain_contract.py)
- **🏭 TEAL Artifacts**: [`proofchain-algokit/artifacts/`](proofchain-algokit/artifacts/)

### **Contract Features:**
- **ABI Methods**: `submit_report`, `get_report`, `get_stats`
- **Box Storage**: Scalable data management for unlimited reports
- **Global State**: Platform statistics and counters
- **Security**: Input validation and access controls

---

## 🎥 Demo & Technical Videos

> **📹 [Technical Deep Dive](https://www.loom.com/share/technical-explanation)** *(Recording Ready)*
> 
> *Smart contract architecture, PyTeal implementation, and AlgoKit workflow*

> **🚀 [Live TestNet Deployment](https://www.loom.com/share/deployment-demo)** *(Recording Ready)*
> 
> *Complete deployment process from compilation to block explorer verification*

---

## 🚀 Quick Start (Hackathon Judges)

### 1. **Verify Smart Contract**
```bash
cd proofchain-algokit/
source venv/bin/activate
python scripts/demo_contract.py
```

### 2. **Check TEAL Artifacts**
```bash
# View generated TEAL files
ls -la artifacts/
cat artifacts/ProofChain.approval.teal | head -10
cat artifacts/ProofChain.arc32.json | head -20
```

### 3. **Deploy to TestNet** *(For Testing)*
```bash
# Set your mnemonic (25 words)
export DEPLOYER_MNEMONIC="word1 word2 ... word25"

# Deploy (requires funded TestNet account)
python scripts/deploy_testnet.py
```

---

## 🏗️ Technical Architecture

### **Blockchain Layer** (AlgoKit + Algorand)
- **Smart Contract**: PyTeal-based custom logic
- **Network**: Algorand TestNet
- **Storage**: Box storage for scalability
- **ABI**: ARC-32 compliant interface

### **Frontend Layer** (React + Vite)
- **Framework**: React 18 with modern hooks
- **Wallet**: PeraWallet & AlgoSigner integration  
- **UI Library**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite for fast development

### **Backend Layer** (Node.js)
- **API**: Express.js RESTful endpoints
- **Database**: SQLite for application data
- **Analytics**: Report statistics and trends

### **Storage Layer** (IPFS)
- **Evidence**: Decentralized file storage
- **Metadata**: Content addressing for integrity
- **Gateway**: Public IPFS node access

---

## 📊 Smart Contract Details

### **Contract Methods (ABI)**
```javascript
// Submit new hate incident report
submit_report(message: string, police_ref: string, ipfs_cid: string) -> uint64

// Retrieve report by ID
get_report(report_id: uint64) -> string

// Get platform statistics  
get_stats() -> string
```

### **State Schema**
- **Global State**: 1 uint, 2 bytes (counters & metadata)
- **Local State**: 0 uint, 0 bytes (no opt-in required)
- **Box Storage**: Dynamic report data storage

### **Security Features**
- Input validation and sanitization
- Rate limiting and spam prevention
- Anonymous reporting support
- Immutable evidence linking

---

## 📁 Project Structure

```
proofchain/
├── proofchain-algokit/          # 🏆 HACKATHON SUBMISSION
│   ├── .algokit.toml           # AlgoKit configuration
│   ├── smart_contracts/        # Custom PyTeal contract
│   ├── artifacts/              # Generated TEAL files
│   ├── scripts/               # Deployment automation
│   └── HACKATHON_SUBMISSION.md # Detailed compliance doc
├── proofchain-frontend/        # React frontend
├── trustchain-backend/         # Node.js API
├── trustchain-witness-main/    # Enhanced UI
└── README.md                   # This file
```

---

## 🔧 Development Setup

### **Prerequisites**
- Python 3.10+ with pip
- Node.js 18+ with npm
- AlgoKit CLI
- Git

### **AlgoKit Smart Contract Setup**
```bash
# Navigate to contract directory
cd proofchain-algokit/

# Run setup script
./setup.sh

# Activate environment
source venv/bin/activate

# Verify installation
algokit --version
python scripts/demo_contract.py
```

### **Frontend Setup**
```bash
# Navigate to frontend
cd proofchain-frontend/

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🌐 Deployment Status

### **Smart Contract Deployment**

| Environment | Status | App ID | Explorer Link |
|-------------|--------|--------|---------------|
| **LocalNet** | ✅ Ready | Dynamic | Local development |
| **TestNet** | 🚀 Ready | `[DEPLOY_TO_UPDATE]` | [AlgoExplorer](https://testnet.algoexplorer.io/application/[APP_ID]) |
| **MainNet** | 📋 Planned | TBD | Future production |

### **Frontend Deployment**

| Platform | Status | URL |
|----------|--------|-----|
| **Local Development** | ✅ Active | `http://localhost:5173` |
| **Vercel** | 📋 Planned | TBD |
| **IPFS** | 📋 Future | Decentralized hosting |

---

## 🧪 Testing & Verification

### **Smart Contract Testing**
```bash
# Run contract demo
python scripts/demo_contract.py

# Expected output:
# ✅ Contract instance created successfully
# ✅ Approval program compiled (630 chars)
# ✅ Clear program compiled (7 chars)
# ✅ Global schema: 1 uints, 2 bytes
```

### **Frontend Testing**
```bash
cd proofchain-frontend/
npm test
```

### **Integration Testing**
```bash
cd trustchain-backend/
npm test
```

---

## 📸 Screenshots & Demo Materials

### **Block Explorer Evidence**
- [ ] Smart contract on TestNet AlgoExplorer
- [ ] Transaction hash verification
- [ ] ABI specification display
- [ ] Global state inspection

### **Application Screenshots**
- [ ] Wallet connection interface
- [ ] Report submission form
- [ ] Analytics dashboard
- [ ] Mobile responsive design

### **Technical Demonstration**
- [ ] Contract compilation process
- [ ] Deployment terminal output
- [ ] TEAL artifact generation
- [ ] ABI method invocation

---

## 🤝 Hackathon Submission Checklist

### **Technical Requirements**
- [x] **Custom Smart Contract**: ✅ PyTeal implementation
- [x] **AlgoKit Integration**: ✅ Full project structure
- [x] **TEAL Artifacts**: ✅ Generated and verified
- [x] **Build Automation**: ✅ Scripts and configuration
- [x] **Testing Suite**: ✅ Demo and validation scripts

### **Documentation Requirements**  
- [x] **README**: ✅ Comprehensive project documentation
- [x] **Code Comments**: ✅ Inline documentation
- [x] **API Documentation**: ✅ Method specifications
- [x] **Deployment Guides**: ✅ Step-by-step instructions

### **Submission Requirements**
- [ ] **TestNet Deployment**: 🚀 Ready for deployment
- [ ] **Demo Video**: 📹 Technical explanation prepared
- [ ] **Screenshots**: 📸 Block explorer evidence ready
- [ ] **GitHub Repository**: 🔗 Public submission repo
- [ ] **Hackathon Form**: 📝 Ready for submission

---

## 🎯 Innovation Highlights

### **Blockchain Innovation**
- **Anonymous Reporting**: Privacy-preserving incident logging
- **Immutable Evidence**: Tamper-proof data integrity
- **Decentralized Storage**: IPFS integration for evidence
- **Transparent Statistics**: Public accountability metrics

### **Technical Innovation**
- **AlgoKit Integration**: Modern Algorand development workflow
- **Box Storage Architecture**: Scalable smart contract data
- **ABI Compliance**: Standard interface implementation
- **Multi-Network Support**: LocalNet testing + TestNet deployment

### **Social Impact**
- **Community Empowerment**: Grassroots reporting platform
- **Data Transparency**: Public statistics for accountability
- **Evidence Preservation**: Permanent record keeping
- **Anonymous Protection**: Safe reporting environment

---

## 📞 Contact & Support

### **For Hackathon Judges**
- **🔗 Repository**: [GitHub - ProofChain](https://github.com/your-username/proofchain)
- **📧 Contact**: your-email@example.com
- **🐛 Issues**: GitHub Issues for technical questions
- **📖 Documentation**: [Complete Hackathon Submission](proofchain-algokit/HACKATHON_SUBMISSION.md)

### **For Developers**
- **🛠️ AlgoKit Docs**: [AlgoKit Documentation](https://github.com/algorandfoundation/algokit-cli)
- **📚 Algorand Docs**: [Algorand Developer Portal](https://developer.algorand.org/)
- **🎓 PyTeal Guide**: [PyTeal Documentation](https://pyteal.readthedocs.io/)

---

<div align="center">

**🏆 Built for the Algorand Hackathon 2024**

*Empowering communities through decentralized reporting on Algorand blockchain*

**[📋 View Hackathon Submission Details](proofchain-algokit/HACKATHON_SUBMISSION.md)**

</div>
