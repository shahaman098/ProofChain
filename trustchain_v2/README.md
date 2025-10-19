# 🛡️ TrustChain - Decentralized Hate Crime Reporting Network

A production-ready Web3 application for securely and anonymously submitting hate crime reports to the Algorand blockchain.

Built with **PyTeal** smart contracts and **React TypeScript** frontend.

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ and npm
- Pera Wallet mobile app or browser extension

### Automated Setup

Run the automated setup script:

```bash
cd /Users/efi/trustchain/trustchain_v2
python setup_trustchain.py
```

This will:
1. Deploy the smart contract to Algorand TestNet
2. Automatically configure the frontend with the correct App ID
3. Install frontend dependencies
4. Start the development server

### Manual Setup

If you prefer manual setup:

1. **Deploy Smart Contract:**
   ```bash
   python deploy.py
   ```

2. **Configure Frontend:**
   - Copy the App ID from deployment output
   - Update `trustchain-witness-main/src/lib/algorand.ts`:
     ```typescript
     export const APP_ID = YOUR_APP_ID; // Replace with actual ID
     ```

3. **Start Frontend:**
   ```bash
   cd trustchain-witness-main
   npm install
   npm run dev
   ```

The application will be available at **http://localhost:8080**

---

## 📁 Project Structure

```
trustchain_v2/
├── app.py                    # PyTeal smart contract
├── deploy.py                 # Contract deployment script
├── call_submit.py           # Test script for contract interaction
├── setup_trustchain.py      # Automated deployment & setup
└── trustchain-witness-main/ # React TypeScript frontend
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/          # Page components
    │   ├── lib/            # Algorand & IPFS integration
    │   ├── context/        # React context providers
    │   └── hooks/          # Custom React hooks
    ├── public/             # Static assets
    └── package.json        # Frontend dependencies
```

---

## ⚙️ Configuration

### Algorand TestNet
- **Network:** TestNet
- **Node:** `https://testnet-api.algonode.cloud`
- **Wallet:** Pera Wallet required for transactions

### IPFS Evidence Storage (Optional)
For evidence file uploads:
1. Sign up at [Pinata.cloud](https://pinata.cloud)
2. Get API keys from dashboard
3. Update `trustchain-witness-main/src/lib/ipfs.ts`

---

## 🎯 Features

### 🔐 **Blockchain Security**
- Immutable report storage on Algorand
- Cryptographic transaction signatures
- Decentralized verification system

### 👤 **Privacy Protection**
- Anonymous reporting option
- Personal data encryption
- Optional identity disclosure

### 📊 **Evidence Management**
- IPFS decentralized file storage
- Support for images, documents, videos
- Tamper-proof evidence linking

### 📈 **Analytics Dashboard**
- Real-time report statistics
- Trust score tracking
- Verification status monitoring
- Community impact metrics

### 🔍 **Report Management**
- Category-based classification
- Incident date/time tracking
- Police reference integration
- Status updates (Pending, Confirmed, Under Review)

---

## 🛡️ Smart Contract

### TrustChain Contract (`app.py`)
- **Language:** PyTeal (Algorand smart contract language)
- **State:** Global report counter
- **Method:** `submit_report(reporter, report_hash)`
- **Storage:** On-chain metadata with IPFS evidence links

### Box Storage
- Reports stored in Algorand boxes
- Reporter address as box key
- Report metadata as box value
- Efficient retrieval and verification

---

## 🌐 Frontend Application

### Tech Stack
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS + Radix UI
- **State:** React Context + React Query
- **Routing:** React Router
- **Wallet:** Pera Wallet Connect
- **Build:** Vite

### Key Components
- `ReportForm` - Submit new reports
- `Dashboard` - View all reports
- `Analytics` - Statistics and metrics
- `ReportDetailModal` - Detailed report view
- `AppContext` - Global state management

---

## 🔧 Development

### Smart Contract Development
```bash
# Test contract deployment
python deploy.py

# Test contract interaction
python call_submit.py
```

### Frontend Development
```bash
cd trustchain-witness-main

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create `.env` in `trustchain-witness-main/`:
```
VITE_PINATA_API_KEY=your_api_key
VITE_PINATA_SECRET_KEY=your_secret_key
```

---

## 🧪 Testing

### Smart Contract Testing
The contract includes test scripts:
- `deploy.py` - Deploys and tests basic functionality
- `call_submit.py` - Tests report submission

### Frontend Testing
```bash
cd trustchain-witness-main
npm run lint
```

---

## 🚀 Deployment

### TestNet (Development)
Already configured for Algorand TestNet. Use the automated setup script.

### MainNet (Production)
1. Update `deploy.py` with MainNet configuration:
   ```python
   ALGOD_URL = "https://mainnet-api.algonode.cloud"
   ```
2. Update frontend `src/lib/algorand.ts`:
   ```typescript
   export const ALGOD_SERVER = 'https://mainnet-api.algonode.cloud';
   ```

---

## 📚 Resources

- [Algorand Developer Portal](https://developer.algorand.org/)
- [PyTeal Documentation](https://pyteal.readthedocs.io/)
- [Pera Wallet Developer Guide](https://perawallet.app/developers/)
- [IPFS Documentation](https://docs.ipfs.tech/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⚠️ Disclaimer

This is experimental software. Always test thoroughly before using with real funds or sensitive data. The developers are not responsible for any losses or damages.

---

**Built for the EasyA × Algorand London Hackathon 2025**
