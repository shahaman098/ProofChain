<<<<<<< HEAD
# 🛡️ TrustChain - Decentralized Hate Incide## 🔗 **Custom Smart Contract** ⭐

### ✅ **Requirement Fulfilled: Custom Smart Contract on Algorand**

**ProofChain features a completely custom smart contract built with modern AlgoKit:**

- **🏗️ Built with**: AlgoKit + PyTeal (Python)  
- **📋 App ID**: `748025246`
- **🌐 Network**: Algorand TestNet
- **📄 Source Code**: [`proofchain-algokit/smart_contracts/proofchain_contract.py`](proofchain-algokit/smart_contracts/proofchain_contract.py)
- **🏭 TEAL Artifacts**: [`proofchain-algokit/artifacts/`](proofchain-algokit/artifacts/)ng Platform

<div align="center">

![TrustChain Banner](https://via.placeholder.com/800x200/1a1a1a/ffffff?text=TrustChain+Blockchain+Platform)

**A complete full-stack application for reporting hate incidents securely and anonymously, powered by Algorand blockchain and IPFS.**

[![Algorand](https://img.shields.io/badge/Blockchain-Algorand-00D4AA)](https://algorand.com)
[![TestNet](https://img.shields.io/badge/Network-TestNet-orange)](https://testnet.algoexplorer.io)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

## 🎥 Demo Video

https://www.loom.com/share/46c24e4bc0b44f6192208b4d0c2cb3c7?sid=6bf755c9-c604-4f7e-9d76-5f018a667936
> 
> *Complete walkthrough showing the platform functionality, smart contract deployment, and technical implementation*

## 📸 UI Screenshots

<div align="center">

### Landing Page
[![Landing Page](screenshots/landing-page.png)](https://github.com/shahaman098/ProofChain/blob/main/01.jpeg)
*Clean, modern interface introducing the platform*

### Report Submission Form with Dashboard Analytics and Wallet Integration
[![Report Form](screenshots/report-form.png)  
*Secure form for submitting hate incident reports*](https://github.com/shahaman098/ProofChain/blob/main/02.jpeg)

https://github.com/shahaman098/ProofChain/blob/main/04.jpeg


</div>

---

## 🚀 **Custom Smart Contract** ⭐

### ✅ **Requirement Fulfilled: Custom Smart Contract on Algorand**

**TrustChain features a completely custom smart contract built from scratch using PyTeal:**

- **📋 App ID**: `748025246`
- **🌐 Network**: Algorand TestNet
- **🔗 Block Explorer**: [View Contract on Asset Hub](https://testnet.explorer.perawallet.app/application/748025246)
- **📄 Source Code**: [`proofchain-algokit/smart_contracts/proofchain_contract.py`](proofchain-algokit/smart_contracts/proofchain_contract.py)

#### **Why This Smart Contract is Custom & Unique:**

1. **🎯 Purpose-Built for Hate Crime Reporting**
   - Specialized data structures for incident reports
   - Support for police reference numbers
   - Evidence linking via IPFS CIDs
   - Anonymous reporting capabilities

2. **🛡️ Advanced Security Features**
   - Rate limiting (1 report per minute per user)
   - Input validation and size limits
   - Anti-spam mechanisms
   - Sender verification

3. **📊 Sophisticated State Management**
   - Global state tracking total reports
   - Local state per user with reporting history
   - Timestamp tracking for rate limiting
   - Version control for contract upgrades

4. **🔍 Transparency & Auditability**
   - All reports logged to blockchain transaction history
   - Public statistics accessible via contract calls
   - Immutable record keeping
   - Full source code availability

#### **Smart Contract Technical Details:**

```python
# Core Functions (PyTeal Implementation)
def submit_report():
    # Validates sender, enforces rate limits, stores report
    # Updates global counters and user state
    # Logs incident data to blockchain permanently

def get_stats():
    # Returns contract usage statistics
    # Public transparency for community oversight
```

**📚 [Complete Smart Contract Documentation →](proofchain-algokit/README.md)**

---

## 🎬 **Technical Explanation Video**

> **🎤 [Technical Deep Dive Video](https://www.loom.com/share/your-technical-video-id)**
> 
> **Audio explanation covering:**
> - How the TrustChain project works end-to-end
> - GitHub repository structure walkthrough  
> - Smart contract deployment and functionality demo
> - **Detailed explanation of custom smart contract development process**
> - Integration between frontend, backend, and blockchain
> - IPFS evidence storage demonstration

---

## 📁 Project Structure

```
proofchain/
├── 🎨 trustchain-witness-main/     # React TypeScript Frontend
├── 🔧 trustchain-backend/          # Node.js Express Backend  
├── 🏗️ proofchain-algokit/         # AlgoKit Smart Contract Project ⭐
│   ├── smart_contracts/           # PyTeal source code
│   │   └── proofchain_contract.py # Custom smart contract (177 lines)
│   ├── artifacts/                 # Generated TEAL files  
│   │   ├── ProofChain.approval.teal
│   │   ├── ProofChain.clear.teal
│   │   └── ProofChain.arc32.json
│   ├── scripts/                   # Deployment automation
│   │   ├── deploy_localnet.py
│   │   └── deploy_testnet.py
│   ├── .algokit.toml              # AlgoKit configuration
│   └── README.md                  # Smart contract documentation
├── 🔗 trustchain-smart-contract/   # Legacy smart contract (deprecated)
│   ├── report_contract.py          # Old PyTeal implementation
│   └── *.teal                     # Old TEAL files
├── 📜 proofchain-frontend/         # Legacy frontend (deprecated)
├── 🚀 setup.sh                     # Setup script
├── ▶️ start-dev.sh                 # Development start script
└── 📖 README.md                    # This file
```

---

## 🌟 Features

### Frontend (trustchain-witness-main)
- **Modern React with TypeScript** - Type-safe development
- **shadcn/ui Components** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **React Query** - Powerful data fetching and caching
- **Algorand Integration** - Custom smart contract interaction
- **Pera Wallet Connect** - Secure wallet connectivity
- **IPFS Integration** - Decentralized file storage via Pinata
- **Responsive Design** - Works on all devices

### Backend (trustchain-backend)
- **Express.js API** - RESTful API server
- **SQLite Database** - Lightweight, file-based database
- **Input Validation** - Secure data validation
- **Rate Limiting** - API protection
- **CORS Support** - Cross-origin resource sharing
- **Analytics Endpoints** - Data insights and reporting
- **Search Functionality** - Full-text search capabilities

### **Custom Blockchain Integration ⭐**
- **AlgoKit Smart Contract** - Modern PyTeal development with full tooling
- **Custom Logic** - Purpose-built for hate incident reporting (177 lines)
- **Box Storage** - Scalable report data management
- **TEAL Artifacts** - Generated approval and clear state programs
- **ABI Compliance** - ARC-32 specification for frontend integration
- **LocalNet Testing** - AlgoKit development sandbox support
- **TestNet Deployment** - Production-ready deployment pipeline
- **Rate Limiting** - On-chain spam prevention
- **Anonymous Reporting** - Privacy-preserving options
- **Evidence Storage** - IPFS integration for file attachments
- **Immutable Records** - Permanent incident storage

---

## 🔗 **Block Explorer Links**

### **Deployed Smart Contract:**
- **🌐 Pera Explorer**: [https://testnet.explorer.perawallet.app/application/748025246](https://testnet.explorer.perawallet.app/application/748025246)
- **🔍 AlgoExplorer**: [https://testnet.algoexplorer.io/application/748025246](https://testnet.algoexplorer.io/application/748025246)

### **Sample Transactions:**
- **📝 Report Submission**: [View Transaction](https://testnet.explorer.perawallet.app/tx/[SAMPLE_TX_ID])
- **📊 Stats Query**: [View Transaction](https://testnet.explorer.perawallet.app/tx/[SAMPLE_STATS_TX_ID])

*Links will be updated after contract deployment*

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+ (for smart contract)
- npm or yarn
- Git
- **AlgoKit CLI** (for smart contract development)

### **AlgoKit Setup & Smart Contract Deployment**

1. **Install AlgoKit**
   ```bash
   pipx install algokit
   algokit --version
   ```

2. **Deploy Custom Smart Contract**
   ```bash
   cd trustchain-smart-contract
   
   # Create virtual environment
   python3 -m venv venv
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Compile contract
   python report_contract.py
   
   # Fund deployer account at https://bank.testnet.algorand.network/
   export ALGORAND_MNEMONIC="your 25 word mnemonic phrase"
   
   # Deploy to TestNet
   python deploy.py
   ```

### **Frontend & Backend Setup**

1. **Clone and Setup**
   ```bash
   cd /Users/efi/proofchain
   ./setup.sh
   ```

2. **Configure Environment**
   
   **Frontend (.env in trustchain-witness-main/):**
   ```env
   VITE_ALGORAND_APP_ID=[YOUR_DEPLOYED_APP_ID]
   VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
   VITE_API_BASE_URL=http://localhost:3001
   VITE_PINATA_API_KEY=your_pinata_api_key
   VITE_PINATA_SECRET_KEY=your_pinata_secret_key
   ```

   **Backend (.env in trustchain-backend/):**
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start Development Servers**
   ```bash
   ./start-dev.sh
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

---

## 🔗 API Documentation

### Reports Endpoints

#### Create Report
```http
POST /api/reports
Content-Type: application/json

{
  "message": "Report description",
  "txId": "algorand_transaction_id",
  "timestamp": 1640995200000,
  "isAnonymous": false,
  "policeRef": "REF123",
  "ipfsCid": "QmXXXXXX",
  "incidentDate": "2024-01-01T00:00:00.000Z",
  "accountAddress": "ALGOACCOUNT123..."
}
```

#### Get Reports
```http
GET /api/reports?limit=50&offset=0&status=confirmed
```

### Smart Contract Integration
```javascript
// Frontend integration with custom smart contract
const submitReportToBlockchain = async (reportData) => {
  const appArgs = [
    new Uint8Array(Buffer.from("submit_report")),
    new Uint8Array(Buffer.from(reportData))
  ];
  
  const txn = algosdk.makeApplicationNoOpTxnFromObject({
    sender: accountAddress,
    suggestedParams: suggestedParams,
    appIndex: CUSTOM_APP_ID,  // Our deployed contract
    appArgs: appArgs,
  });
  
  const signedTxn = await peraWallet.signTransaction([txn]);
  const response = await algodClient.sendRawTransaction(signedTxn).do();
  
  return response.txid;
};
```

---

## 🏗️ **Technical Implementation**

### **Algorand SDKs Used:**
- **`py-algorand-sdk`** - Python SDK for smart contract development and deployment
- **`algosdk` (JavaScript)** - Frontend integration with Algorand blockchain
- **PyTeal** - Python framework for writing Algorand smart contracts in Python

### **Unique Algorand Features Leveraged:**

1. **⚡ Instant Finality**
   - Reports are confirmed in under 4 seconds
   - No waiting for multiple confirmations like other blockchains
   - Real-time user feedback on report submission

2. **💚 Carbon Negative**
   - Environmentally conscious choice for social impact platform
   - Algorand is certified carbon negative by ClimateTrade

3. **💰 Micro-Transaction Friendly**
   - $0.001 transaction fees make the platform accessible globally
   - No barrier to entry for reporting incidents

4. **🔒 Built-in Security**
   - Pure Proof-of-Stake consensus mechanism
   - Byzantine fault tolerance
   - Immediate transaction finality

5. **📊 Rich State Management**
   - Global and local state storage for complex applications
   - Built-in key-value storage without additional infrastructure

### **Why Algorand Made This Project Uniquely Possible:**

1. **Social Impact Focus**: Low fees enable global accessibility for reporting hate crimes
2. **Real-time Reporting**: Instant finality means immediate report confirmation  
3. **Environmental Responsibility**: Carbon-negative blockchain aligns with social good mission
4. **Scalability**: Can handle high volumes of reports during crises or events
5. **Developer Experience**: PyTeal and rich SDKs enabled rapid custom contract development

---

## 🔧 Development

### Frontend Development
```bash
cd trustchain-witness-main

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Development
```bash
cd trustchain-backend

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
```

### **Smart Contract Development**
```bash
cd trustchain-smart-contract

# Activate virtual environment
source venv/bin/activate

# Modify contract
nano report_contract.py

# Recompile
python report_contract.py

# Deploy updates (new app ID)
python deploy.py
```

---

## 🏗️ Tech Stack

### **Blockchain Layer**
- **Algorand TestNet** - Layer 1 blockchain
- **PyTeal** - Smart contract development framework
- **Algorand Python SDK** - Blockchain interaction
- **Pera Wallet** - User wallet interface

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Routing
- **React Query** - Data fetching
- **Algorand JS SDK** - Blockchain integration

### Backend
- **Node.js** with Express.js
- **SQLite** - Database
- **express-validator** - Input validation
- **CORS** - Cross-origin support
- **Helmet** - Security headers

### Storage & Infrastructure
- **IPFS** via Pinata - Decentralized storage
- **AlgoKit** - Development toolkit
- **LocalNet** - Local development blockchain

---

## 🔐 Security Features

- **Blockchain-Level Security**
  - Smart contract rate limiting (1 report/minute/user)
  - Input validation and size limits in contract
  - Immutable record storage
  - Sender verification

- **API-Level Security**
  - Rate limiting (100 requests per 15 minutes per IP)
  - Input validation on all endpoints
  - CORS protection
  - Security headers via Helmet.js

- **Privacy Features**
  - Anonymous reporting options
  - IPFS for decentralized evidence storage
  - No personal data stored on blockchain

---

## 🌐 Deployment

### **Smart Contract Deployment (TestNet)**
```bash
# Fund account at https://bank.testnet.algorand.network/
export ALGORAND_MNEMONIC="your mnemonic"
cd trustchain-smart-contract && python deploy.py
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd trustchain-witness-main
npm run build
# Deploy dist/ folder
```

### Backend Deployment (Railway/Heroku)
```bash
cd trustchain-backend
# Set environment variables and deploy
```

---

## 🧪 Testing & Verification

### Smart Contract Testing
- ✅ Unit tests for all contract functions
- ✅ Integration tests with frontend
- ✅ Rate limiting verification
- ✅ State management validation
- ✅ Error handling tests

### End-to-End Testing
- ✅ Report submission workflow
- ✅ Wallet connection testing
- ✅ IPFS file upload testing
- ✅ Analytics data accuracy
- ✅ Cross-browser compatibility

---

## 📊 Database Schema

### Reports Table
```sql
CREATE TABLE reports (
  id TEXT PRIMARY KEY,              -- UUID
  message TEXT NOT NULL,            -- Report content
  txId TEXT UNIQUE NOT NULL,        -- Algorand transaction ID
  timestamp INTEGER NOT NULL,       -- Unix timestamp
  isAnonymous BOOLEAN DEFAULT 0,    -- Privacy flag
  policeRef TEXT,                   -- Police reference number
  ipfsCid TEXT,                     -- IPFS content ID
  incidentDate TEXT,                -- ISO date string
  status TEXT DEFAULT 'confirmed',  -- pending/confirmed/failed
  accountAddress TEXT,              -- Reporter address (if not anonymous)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. **Test smart contract changes**: `python report_contract.py && python deploy.py`
4. Commit changes: `git commit -am 'Add new feature'`
5. Push to branch: `git push origin feature/new-feature`
6. Submit pull request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🆘 Support

- **Smart Contract Issues**: Check `trustchain-smart-contract/` logs
- **API Issues**: Check health endpoint: http://localhost:3001/health
- **Blockchain Issues**: Verify TestNet connectivity and account funding
- **IPFS Issues**: Verify Pinata API keys and configuration

---

## 🔮 Future Enhancements

- [ ] **Smart Contract V2** with governance features
- [ ] **MainNet deployment** for production use
- [ ] **Mobile app** (React Native)
- [ ] **Multi-language support**
- [ ] **Advanced analytics dashboard**
- [ ] **Integration with law enforcement APIs**
- [ ] **NFT certificates** for verified reports

---

<div align="center">

**🏆 Built for Algorand Hackathon 2025**

*Demonstrating custom smart contract development, full-stack integration, and social impact through blockchain technology.*

[![Algorand](https://img.shields.io/badge/Built%20on-Algorand-00D4AA?style=for-the-badge)](https://algorand.com)
[![TestNet](https://img.shields.io/badge/Deployed%20on-TestNet-orange?style=for-the-badge)](https://testnet.algoexplorer.io)

**Built with ❤️ for a safer, more transparent world.**

</div>
=======
ProofChain — Decentralised Hate Crime Reporting Network

Technical (Coding) Track Submission | EasyA × Algorand London Hackathon 2025

ProofChain is a Web3 civic-tech platform built on the Algorand TestNet that enables citizens to report hate crimes transparently and anonymously, using blockchain to ensure immutable, verifiable proof of incidents.

It demonstrates how Algorand smart contracts can power public accountability and trust, transforming blockchain into infrastructure for social good.

Core Features
Feature	Description
Algorand Smart Contract	Custom PyTeal contract (APP_ID: 748001402) deployed on Algorand TestNet, defining submit_report() for on-chain submissions.
Pera Wallet Integration	Secure user authentication via WalletConnect. Supports both anonymous and verified reporting.
Report Submission Form	Collects text reports, optional police reference, and optional IPFS evidence uploads (PDF/image).
Immutable Records	Every report becomes a public, timestamped transaction on-chain, viewable via AlgoExplorer.
Analytics Dashboard	Displays live metrics such as total reports, verified vs anonymous ratio, and time-based trends (built with Recharts).
TrustScore System	Community transparency metric calculated as (Verified / Total Reports) × 100.
Open Source	Fully open codebase (frontend and smart contract), licensed under MIT.
How It Works

Frontend (React + Vite + Tailwind)
Users connect their Pera Wallet, submit a report, and optionally attach files. Evidence is uploaded to IPFS.

Smart Contract Layer (PyTeal + Beaker)
The frontend triggers the submit_report() function in the Algorand contract (APP_ID 748001402), writing metadata to the blockchain and returning a transaction ID.

Real-Time Sync
Frontend updates dynamically through React context hooks, ensuring live dashboards and metrics.

Transparency Layer
Each transaction includes a direct AlgoExplorer link, providing verifiable public proof of submission.

Tech Stack

Frontend: React (Vite), TailwindCSS, Recharts
Blockchain: Algorand TestNet, PyTeal, Beaker
Wallet: Pera Wallet (@perawallet/connect)
Storage: IPFS (Pinata / Web3.Storage)
Languages: Python, JavaScript

Repository Structure
ProofChain/
├── trustchain_v2/           # Smart contract backend (PyTeal / Beaker)
│   ├── app.py               # Smart contract logic
│   ├── deploy.py            # Deployment script
│   └── call_submit.py       # Helper for transaction testing
│
├── trustchain-frontend/     # React + Vite frontend
│   ├── components/          # UI components (ReportForm, ReportCard, etc.)
│   ├── pages/               # Home, Dashboard, Learn, About
│   ├── context/             # Global state management
│   ├── utils/               # algorand.js, ipfs.js, constants.js
│   └── vite.config.js       # Polyfills for algosdk
│
└── README.md

Smart Contract Details
Property	Value
Network	Algorand TestNet
App ID	748001402
Contract File	trustchain_v2/app.py
Method	submit_report(message, police_ref, ipfs_cid, is_anonymous)
Verification	View on AlgoExplorer
Local Setup and Deployment
# clone repository
git clone https://github.com/shahaman098/ProofChain.git
cd ProofChain/trustchain-frontend

# install dependencies
npm install

# run locally
npm run dev


Open in your browser: http://localhost:5173

To deploy the smart contract (optional):

cd ../trustchain_v2
python3 deploy.py

Demo Resources

Demo Video
Shows wallet connection, report submission, transaction confirmation, and dashboard update.
Watch the Demo Video

Walkthrough (Loom with Audio)
Explains architecture, repository structure, contract logic, and integration.
Watch the Walkthrough

Hackathon Submission Checklist

Built on Algorand Smart Contracts (PyTeal)

Fully open source (MIT License)

Includes demo video and walkthrough

Clear README with screenshots and AlgoExplorer link

Canva presentation slides attached

Meets all Technical Track requirements

Future Roadmap

Verified Partner Dashboards – NGO and council validation layer

AI Classification Engine – detect trends, sentiment, and recurring patterns

Reward System – tokenized community transparency incentives

Multi-Language UI – inclusive accessibility for diverse users

Mainnet Deployment – scalable rollout beyond TestNet pilots

Built For

EasyA × Algorand London Hackathon 2025
Team: ProofChain

“ProofChain empowers communities through immutable, verifiable transparency — powered by Algorand.”
>>>>>>> 7923594b4cf3edf7e808a490a462ec7a3ba25df9
