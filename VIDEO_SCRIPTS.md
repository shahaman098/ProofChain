# 📹 Demo & Walkthrough Content

## 🎥 Video Recording Scripts

### **1. Technical Walkthrough Video Script (10-12 minutes)**

#### **Introduction (1 minute)**
```
"Hi, I'm demonstrating ProofChain, a decentralized hate incident reporting platform built on Algorand blockchain for the Algorand Hackathon.

ProofChain solves the critical problem of hate crime underreporting by providing a secure, anonymous platform where community members can document incidents with blockchain-verified integrity."
```

#### **Problem & Solution (2 minutes)**  
```
"Hate crimes are significantly underreported due to fear, distrust of authorities, and lack of secure reporting mechanisms. ProofChain addresses this by:

1. Enabling anonymous reporting with no identity exposure
2. Using blockchain immutability for tamper-proof records  
3. Supporting IPFS evidence storage for multimedia proof
4. Providing transparent community statistics for advocacy

The Algorand blockchain is perfect for this because of its low fees, fast finality, and advanced features like box storage."
```

#### **Technical Architecture Demo (4 minutes)**
```
"Let me show you the technical implementation:

[Screen: Open VS Code with contract code]

Our custom PyTeal smart contract has three main methods:

1. submit_report() - Takes incident details and stores them securely
2. get_report() - Retrieves reports by ID for verification  
3. get_stats() - Provides community analytics

[Screen: Show artifacts directory]

The AlgoKit build system generates TEAL artifacts: approval program, clear state, and ABI specification.

[Screen: Terminal deployment]

Our deployment script connects to TestNet and creates the contract with proper validation."
```

#### **Frontend Integration (2 minutes)**
```
"The React frontend integrates with Algorand through Pera Wallet:

[Screen: Show frontend interface]

Users can connect their wallet, submit reports with evidence links, and view community statistics. The interface is designed for ease of use while maintaining security.

[Screen: Wallet connection demo]

All interactions are signed transactions, ensuring authenticity and non-repudiation."
```

#### **Live Demonstration (2 minutes)**
```
"Let me demonstrate a live report submission:

[Screen: TestNet deployment running]

First, I'll deploy the contract to TestNet... 
[Show deployment output]

Now I'll submit a test report...
[Show contract call]

And verify it on the block explorer...
[Show AlgoExplorer]

The report is now permanently stored on Algorand with cryptographic integrity."
```

#### **Closing (1 minute)**
```
"ProofChain demonstrates Algorand's potential for social impact applications. The combination of low fees, advanced smart contract features, and developer-friendly tools like AlgoKit make it ideal for civic technology.

The complete source code, documentation, and deployment instructions are available in the GitHub repository. Thank you for watching!"
```

### **2. Demo Video Script (5-7 minutes)**

#### **Quick Demo Flow**
```
1. "Welcome to ProofChain" - Show landing page
2. "Connect Wallet" - Pera Wallet integration demo
3. "Submit Report" - Fill out incident form with sample data  
4. "Blockchain Confirmation" - Show transaction processing
5. "View on Explorer" - Navigate to TestNet block explorer
6. "Community Stats" - Display aggregated analytics
7. "Privacy Protection" - Explain anonymous reporting features
```

#### **Key Talking Points**
- Emphasize ease of use despite blockchain complexity
- Highlight security and privacy features
- Show real TestNet transactions and confirmations
- Demonstrate block explorer verification
- Explain social impact and community benefits

---

## 📸 Required Screenshots Checklist

### **Frontend Interface Screenshots**
- [ ] Landing page with wallet connection
- [ ] Report submission form (filled with sample data)
- [ ] Wallet signature confirmation dialog  
- [ ] Success confirmation with transaction ID
- [ ] Community statistics dashboard
- [ ] Mobile responsive design views

### **Blockchain Verification Screenshots**  
- [ ] TestNet AlgoExplorer showing deployed contract
- [ ] Contract details page with ABI methods
- [ ] Transaction history showing report submissions
- [ ] Global state inspection showing statistics
- [ ] Box storage entries with report data

### **Development Screenshots**
- [ ] VS Code with smart contract source code
- [ ] Terminal showing successful contract compilation
- [ ] AlgoKit deployment process output
- [ ] TEAL artifacts in file explorer
- [ ] Test script execution with passing results

### **Technical Documentation Screenshots**
- [ ] GitHub repository main page
- [ ] README.md displaying properly formatted content
- [ ] Project structure showing AlgoKit compliance
- [ ] CI/CD pipeline or deployment automation

---

## 🎬 Recording Technical Tips

### **Screen Recording Setup**
- **Resolution**: 1920x1080 minimum for clarity
- **Frame Rate**: 30fps for smooth playback
- **Audio**: Clear microphone with minimal background noise
- **Browser**: Use Chrome or Firefox for consistent rendering

### **Demo Environment Preparation**
```bash
# Prepare clean environment
cd proofchain-algokit/
source venv/bin/activate
algokit localnet reset  # Clean LocalNet state
npm run dev  # Start frontend server
```

### **Recording Sequence**
1. **Setup**: Record environment preparation
2. **Contract**: Show source code and compilation
3. **Deployment**: Live TestNet deployment
4. **Frontend**: User interface walkthrough  
5. **Integration**: End-to-end flow demonstration
6. **Verification**: Block explorer confirmation

### **Post-Recording Checklist**
- [ ] Audio quality check (clear speech, no distortion)
- [ ] Visual clarity (readable text, proper zoom levels)
- [ ] Content accuracy (no errors or typos shown)
- [ ] Flow continuity (smooth transitions between sections)
- [ ] Upload to Loom with public sharing enabled
- [ ] Add video links to README and submission form
