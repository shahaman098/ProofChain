# TrustChain Frontend Setup Guide

## 📋 Quick Setup Instructions

### 1. Update Smart Contract Configuration

After deploying your smart contract with `deploy.py`, update the APP_ID in the frontend:

1. Run your deployment script:
   ```bash
   cd /Users/efi/trustchain/trustchain_v2
   python deploy.py
   ```

2. Copy the App ID from the deployment output

3. Update `src/lib/algorand.ts`:
   ```typescript
   export const APP_ID = YOUR_DEPLOYED_APP_ID; // Replace with actual ID
   ```

### 2. Configure IPFS (Optional - for evidence uploads)

1. Sign up for a free Pinata account at https://pinata.cloud
2. Get your API keys from the Pinata dashboard
3. Update `src/lib/ipfs.ts`:
   ```typescript
   export const PINATA_API_KEY = 'your_actual_api_key';
   export const PINATA_SECRET_KEY = 'your_actual_secret_key';
   ```

### 3. Install Dependencies & Run

```bash
cd trustchain-witness-main
npm install
npm run dev
```

The app will be available at http://localhost:8080

## 🔧 Current Configuration

- **Network**: Algorand TestNet
- **Wallet**: Pera Wallet (mobile app or browser extension required)
- **IPFS**: Pinata (for evidence file storage)

## 🎯 Features Implemented

✅ **Wallet Integration**
- Connect/disconnect Pera Wallet
- Account management
- Transaction signing

✅ **Report Submission**
- Anonymous and identified reporting
- Category selection
- Evidence file upload (images, documents)
- Police reference numbers
- Incident date/time tracking

✅ **Dashboard**
- View all submitted reports
- Report details modal
- Status tracking (Confirmed, Pending, Under Review)
- Trust score system

✅ **Analytics**
- Total reports count
- Anonymous reports percentage
- Verified reports tracking
- Trust score analytics

✅ **Security Features**
- Blockchain immutability
- IPFS decentralized storage
- Anonymous reporting option
- Encryption for sensitive data

## 🛡️ Smart Contract Integration

The frontend integrates with your deployed TrustChain smart contract:
- Submits reports via `submit_report` method
- Stores report metadata on-chain
- Links to IPFS evidence storage
- Maintains report counter and verification
