# 🛡️ TrustChain — Decentralised Hate Crime Reporting Network

A production-ready Web3 frontend for securely and anonymously submitting hate crime reports to the Algorand blockchain.

Built for the **EasyA × Algorand London Hackathon 2025**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ or Bun
- Pera Wallet mobile app or browser extension

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:8080`

---

## ⚙️ Configuration

### Smart Contract Settings

The app is configured to connect to an Algorand TestNet smart contract:

**Location:** `src/lib/algorand.ts`

```typescript
export const APP_ID = 748001402;
export const ALGOD_SERVER = 'https://testnet-api.algonode.cloud';
```

### Changing Networks

To switch to MainNet or a different TestNet contract:

1. Open `src/lib/algorand.ts`
2. Update the following constants:

```typescript
export const APP_ID = YOUR_APP_ID;
export const ALGOD_SERVER = 'https://mainnet-api.algonode.cloud'; // or testnet
```

---

## 🏗️ Architecture

### Project Structure

```
src/
├── lib/
│   ├── algorand.ts          # Algorand client & contract interaction
│   └── ipfs.ts              # IPFS file upload via Pinata
├── components/
│   ├── NavBar.tsx           # Dashboard navigation
│   ├── LandingNav.tsx       # Landing page navigation
│   ├── ReportForm.tsx       # Report submission form
│   ├── Dashboard.tsx        # Report feed with TxID copy
│   └── Analytics.tsx        # Stats panel & chart (Recharts)
├── pages/
│   ├── Home.tsx             # Landing page with hero & mission
│   ├── DashboardPage.tsx    # Main dApp functionality
│   ├── Learn.tsx            # Educational content about blockchain
│   ├── AboutPage.tsx        # Mission, team, and hackathon context
│   └── NotFound.tsx         # 404 page
└── App.tsx                  # Routing configuration
```

### Key Dependencies

- **React** + **Vite** — Fast, modern build tooling
- **@perawallet/connect** — Pera Wallet integration
- **algosdk** — Algorand SDK for blockchain interaction
- **recharts** — Analytics charting
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Accessible component library

---

## 🔗 Core Functionality

### Pages

#### 1. Landing Page (/)
**Purpose:** Introduce TrustChain and educate visitors

**Sections:**
- **Hero Banner**: Main tagline with CTA buttons
- **How It Works**: 3-step process explanation
- **Why Blockchain**: Benefits and features
- **Impact & Mission**: Social good messaging
- **Footer**: Quick links and tech stack

#### 2. Dashboard (/dashboard)
**Purpose:** Functional dApp for reporting and viewing data

**Features:**
- Connect Pera Wallet
- Submit reports with evidence upload to IPFS
- View analytics (total reports, verified, anonymous)
- Browse report feed with transaction details

#### 3. Learn Page (/learn)
**Purpose:** Educational content about blockchain

**Sections:**
- Why blockchain for social good
- What is Algorand (features, stats)
- How TrustChain uses smart contracts
- IPFS evidence storage explained

#### 4. About Page (/about)
**Purpose:** Mission, values, and hackathon context

**Content:**
- Project mission and values
- Why we built TrustChain
- Hackathon acknowledgment
- Technology stack overview
- Future vision

### Wallet Connection

Users connect via **Pera Wallet**:
- Mobile app (scan QR)
- Browser extension

The app automatically reconnects on page reload.

### Report Submission

**Flow:**
1. User writes incident description
2. Toggles **Anonymous Mode** (optional)
3. Clicks **"Submit Report to Blockchain"**
4. App creates an `ApplicationNoOpTxn` calling `submit_report(message)`
5. Pera Wallet prompts for signature
6. Transaction is broadcast to Algorand TestNet
7. User receives TxID + AlgoExplorer link

**Code:** `src/lib/algorand.ts → submitReport()`

### Transaction Verification

All successful submissions display:
- ✅ Success message
- Transaction ID (with copy-to-clipboard)
- Link to **AlgoExplorer** for on-chain verification

### 4. Dashboard & Analytics

**Mock Data:**
- Recent reports feed
- Verification badges
- Anonymous badges
- Copy TxID button
- Stats panel (Total, Verified, Anonymous)
- Recharts trend visualization

---

## 🎨 Design System

### Color Palette

**Primary:** Trust Blue `#0066ff` (HSL: 215, 100%, 50%)
- Used for CTAs, highlights, chart bars
- Conveys civic trust and reliability

**Semantic Tokens:**
- `--primary` — Main brand color
- `--success` — Verification badges
- `--warning` — Anonymous mode
- `--muted` — Backgrounds & secondary text

**Gradients & Shadows:**
- `--gradient-primary` — Buttons & icons
- `--gradient-card` — Card backgrounds
- `--shadow-glow` — Elevated components

All tokens defined in `src/index.css` and referenced via Tailwind.

### Typography

- **Headings:** Bold, high contrast
- **Body:** Inter font, readable sizing
- **Mono:** Transaction IDs & wallet addresses

---

## 🔐 Security & Privacy

### Anonymous Mode

When enabled:
- UI hides wallet address display
- **Note:** Blockchain still records the signing wallet address (required for transaction validity)
- True anonymity requires a separate anonymous wallet

### Input Validation

All report messages are validated:
- Length limits enforced
- XSS protection via React's built-in escaping

### Smart Contract

The app calls the `submit_report` method with:
- **Argument 1:** Function name (`"submit_report"`)
- **Argument 2:** Report message (UTF-8 encoded)

No personal data is stored beyond what's in the message.

---

## 📊 Mock Data

For demonstration purposes, the following components use mock data:

- `Dashboard.tsx` — Recent reports
- `Analytics.tsx` — Stats and trends

**To connect real data:**
1. Query the Algorand blockchain for app calls to `APP_ID`
2. Parse transaction notes/arguments
3. Replace mock arrays with fetched data

---

## 🛠️ Development

### Build Configuration

The app includes necessary polyfills for `algosdk` browser compatibility:

**`vite.config.ts`:**
```typescript
define: {
  global: 'globalThis',
  'process.env': {},
}
```

**Dependencies:**
- `buffer` — Required by algosdk
- `react-is` — Required by recharts

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

Output: `dist/` folder ready for deployment.

---

## 🌐 Deployment

The app is a static SPA and can be deployed to:
- **Vercel** / **Netlify** — Zero-config deployments
- **IPFS** — Decentralized hosting
- **GitHub Pages** — Free static hosting

Ensure the following:
- Set base path if not deploying to root
- Configure redirects for client-side routing (`/*` → `/index.html`)

---

## 📝 License

MIT License — Free for hackathon, educational, and commercial use.

---

## 🏆 Credits

Built for the **EasyA × Algorand London Hackathon 2025**.

**Technology:**
- Algorand blockchain (TestNet)
- Pera Wallet
- React + Vite

**Design:**
- Civic-tech aesthetic
- Accessibility-first
- Mobile-responsive

---

## 🆘 Troubleshooting

### Wallet Won't Connect
- Ensure Pera Wallet is installed and unlocked
- Check browser console for errors
- Try disconnecting and reconnecting

### Transaction Fails
- Verify wallet has TestNet ALGO (use [Algorand Dispenser](https://bank.testnet.algorand.network/))
- Check that `APP_ID` matches deployed contract
- Ensure message isn't empty

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall if issues persist
- Check Node.js version (16+ required)

---

## 📧 Contact

For questions or contributions, open an issue on the repository.

**Happy reporting! 🛡️**
