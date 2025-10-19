Here’s your cleaned, fully professional version of the **ProofChain README** — no emojis, no dashes — formatted for GitHub or hackathon submission.

---

# ProofChain — Decentralised Hate Crime Reporting Network

**Technical (Coding) Track Submission | EasyA × Algorand London Hackathon 2025**

ProofChain is a Web3 civic-tech platform built on the Algorand TestNet that enables citizens to report hate crimes transparently and anonymously, using blockchain to ensure immutable, verifiable proof of incidents.

It demonstrates how Algorand smart contracts can power public accountability and trust, transforming blockchain into infrastructure for social good.

---

## Core Features

| Feature                 | Description                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Algorand Smart Contract | Custom PyTeal contract (APP_ID: 748001402) deployed on Algorand TestNet, defining `submit_report()` for on-chain submissions. |
| Pera Wallet Integration | Secure user authentication via WalletConnect. Supports both anonymous and verified reporting.                                 |
| Report Submission Form  | Collects text reports, optional police reference, and optional IPFS evidence uploads (PDF/image).                             |
| Immutable Records       | Every report becomes a public, timestamped transaction on-chain, viewable via AlgoExplorer.                                   |
| Analytics Dashboard     | Displays live metrics such as total reports, verified vs anonymous ratio, and time-based trends (built with Recharts).        |
| TrustScore System       | Community transparency metric calculated as (Verified / Total Reports) × 100.                                                 |
| Open Source             | Fully open codebase (frontend and smart contract), licensed under MIT.                                                        |

---

## How It Works

1. **Frontend (React + Vite + Tailwind)**
   Users connect their Pera Wallet, submit a report, and optionally attach files. Evidence is uploaded to IPFS.

2. **Smart Contract Layer (PyTeal + Beaker)**
   The frontend triggers the `submit_report()` function in the Algorand contract (APP_ID 748001402), writing metadata to the blockchain and returning a transaction ID.

3. **Real-Time Sync**
   Frontend updates dynamically through React context hooks, ensuring live dashboards and metrics.

4. **Transparency Layer**
   Each transaction includes a direct AlgoExplorer link, providing verifiable public proof of submission.

---

## Tech Stack

Frontend: React (Vite), TailwindCSS, Recharts
Blockchain: Algorand TestNet, PyTeal, Beaker
Wallet: Pera Wallet (@perawallet/connect)
Storage: IPFS (Pinata / Web3.Storage)
Languages: Python, JavaScript

---

## Repository Structure

```
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
```

---

## Smart Contract Details

| Property      | Value                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| Network       | Algorand TestNet                                                              |
| App ID        | 748001402                                                                     |
| Contract File | `trustchain_v2/app.py`                                                        |
| Method        | `submit_report(message, police_ref, ipfs_cid, is_anonymous)`                  |
| Verification  | [View on AlgoExplorer](https://testnet.algoexplorer.io/application/748001402) |

---

## Local Setup and Deployment

```bash
# clone repository
git clone https://github.com/shahaman098/ProofChain.git
cd ProofChain/trustchain-frontend

# install dependencies
npm install

# run locally
npm run dev
```

Open in your browser: [http://localhost:5173](http://localhost:5173)

To deploy the smart contract (optional):

```bash
cd ../trustchain_v2
python3 deploy.py
```

---

## Demo Resources

**Demo Video**
Shows wallet connection, report submission, transaction confirmation, and dashboard update.
[Watch the Demo Video](#)

**Walkthrough (Loom with Audio)**
Explains architecture, repository structure, contract logic, and integration.
[Watch the Walkthrough](#)

---

## Hackathon Submission Checklist

* Built on Algorand Smart Contracts (PyTeal)
* Fully open source (MIT License)
* Includes demo video and walkthrough
* Clear README with screenshots and AlgoExplorer link
* Canva presentation slides attached
* Meets all Technical Track requirements

---

## Future Roadmap

1. Verified Partner Dashboards – NGO and council validation layer
2. AI Classification Engine – detect trends, sentiment, and recurring patterns
3. Reward System – tokenized community transparency incentives
4. Multi-Language UI – inclusive accessibility for diverse users
5. Mainnet Deployment – scalable rollout beyond TestNet pilots

---

## Built For

**EasyA × Algorand London Hackathon 2025**
**Team:** Aman and Contributors
**University:** Brunel University London

> “ProofChain empowers communities through immutable, verifiable transparency — powered by Algorand.”

---

Would you like me to now **format this as a GitHub-optimised Markdown file (README.md)** with section anchors and link placeholders (for videos, slides, explorer link, etc.)? It’ll look clean and clickable on your repo page.
