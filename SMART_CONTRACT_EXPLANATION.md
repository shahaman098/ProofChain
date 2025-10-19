## 🧠 Smart Contract Architecture

### **Contract Logic Explained**

ProofChain's smart contract implements a sophisticated hate incident reporting system with the following core architecture:

#### **State Management**
- **Global State**: Maintains platform-wide statistics including total reports, active categories, and version information
- **Box Storage**: Each report is stored in a dedicated box using a cryptographically secure report ID, enabling unlimited scalability
- **No Local State Required**: Users don't need to opt-in, reducing friction for anonymous reporting

#### **Core Methods**

**1. `submit_report(message, police_ref, ipfs_cid, is_anonymous)`**
- Validates input parameters (max length, required fields)
- Generates cryptographically secure report ID using blockchain randomness
- Implements rate limiting (max 1 report per minute per address) to prevent spam
- Stores report data in box storage with timestamp and metadata
- Updates global statistics and increments report counter
- Returns unique report ID for future reference

**2. `get_report(report_id)`**
- Retrieves complete report data from box storage by ID
- Validates report existence and access permissions
- Returns structured JSON with incident details, timestamps, and evidence links
- Maintains privacy by not exposing reporter addresses for anonymous reports

**3. `get_stats()`**
- Provides platform analytics including total reports and category breakdowns
- Returns public statistics for transparency without compromising individual privacy
- Enables community organizations to track hate incident patterns

#### **Security Features**
- **Input Validation**: All parameters validated for type, length, and content
- **Spam Prevention**: Rate limiting and transaction fee requirements deter abuse  
- **Anonymous Protection**: Optional anonymous reporting with no address linkage
- **Immutable Records**: Blockchain storage ensures tamper-proof incident documentation
- **Access Controls**: Only authorized operations permitted through ABI validation

#### **Data Flow**
1. User submits report through React frontend with wallet signature
2. Frontend validates input and calls smart contract ABI method
3. Contract validates parameters, generates secure ID, and stores in box
4. Global statistics updated and transaction logged on blockchain  
5. Report ID returned to user for future reference and verification

This architecture provides a robust, scalable foundation for decentralized civic reporting while maintaining the security and immutability benefits of blockchain technology.
