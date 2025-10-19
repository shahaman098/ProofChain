# 🛡️ TrustChain - Decentralized Hate Incident Reporting Platform

A complete full-stack application for reporting hate incidents securely and anonymously, powered by Algorand blockchain and IPFS.

## 📁 Project Structure

```
proofchain/
├── 🎨 trustchain-witness-main/     # React TypeScript Frontend
├── 🔧 trustchain-backend/          # Node.js Express Backend  
├── 📜 proofchain-frontend/         # Legacy frontend (can be removed)
├── 🚀 setup.sh                     # Setup script
├── ▶️ start-dev.sh                 # Development start script
└── 📖 README.md                    # This file
```

## 🌟 Features

### Frontend (trustchain-witness-main)
- **Modern React with TypeScript** - Type-safe development
- **shadcn/ui Components** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **React Query** - Powerful data fetching and caching
- **Algorand Integration** - Blockchain transaction handling
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

### Blockchain Integration
- **Algorand TestNet** - Carbon-neutral blockchain
- **Smart Contract Integration** - App ID: 748001402
- **Transaction Verification** - Immutable record keeping
- **Anonymous Reporting** - Privacy-preserving options

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup

1. **Clone and Setup**
   ```bash
   cd /Users/efi/proofchain
   ./setup.sh
   ```

2. **Configure Environment**
   
   **Frontend (.env in trustchain-witness-main/):**
   ```env
   VITE_ALGORAND_APP_ID=748001402
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

   Or manually:
   ```bash
   # Terminal 1 - Backend
   cd trustchain-backend && npm run dev

   # Terminal 2 - Frontend  
   cd trustchain-witness-main && npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

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

#### Search Reports
```http
GET /api/search?q=search_term
```

### Analytics Endpoints

#### Get Analytics
```http
GET /api/analytics
```

Response:
```json
{
  "totalReports": 150,
  "reportsThisMonth": 25,
  "anonymousReports": 75,
  "reportsWithEvidence": 50,
  "recentActivity": [...],
  "statusStats": {
    "confirmed": 140,
    "pending": 8,
    "failed": 2
  }
}
```

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

# Preview production build
npm run preview
```

### Backend Development
```bash
cd trustchain-backend

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Start production server
npm start
```

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Routing
- **React Query** - Data fetching
- **Algorand JS SDK** - Blockchain integration
- **Pera Wallet Connect** - Wallet integration

### Backend
- **Node.js** with Express.js
- **SQLite** - Database
- **express-validator** - Input validation
- **CORS** - Cross-origin support
- **Helmet** - Security headers
- **Morgan** - Logging
- **Rate limiting** - API protection

### Blockchain & Storage
- **Algorand TestNet** - Blockchain network
- **IPFS** via Pinata - Decentralized storage
- **Pera Wallet** - User wallet interface

## 🔐 Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - All API inputs validated
- **CORS Protection** - Configured for frontend domain
- **Security Headers** - Via Helmet.js
- **Anonymous Reporting** - Privacy-preserving options
- **SQL Injection Prevention** - Parameterized queries

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

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in hosting platform

### Backend Deployment (Railway/Heroku)
1. Set environment variables
2. Deploy from Git repository
3. Database will be created automatically

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Check the health endpoint: http://localhost:3001/health
- Review console logs for errors
- Ensure Algorand TestNet connectivity
- Verify IPFS/Pinata configuration

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Report categorization
- [ ] Admin panel for moderation
- [ ] Integration with law enforcement systems

---

Built with ❤️ for a safer, more transparent world.
