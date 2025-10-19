## 🔗 Blockchain Verification

### **TestNet Deployment Information**

**📱 Smart Contract App ID**: `[TO_BE_UPDATED_AFTER_DEPLOYMENT]`  
**🌐 Network**: Algorand TestNet  
**📅 Deployment Date**: `[DEPLOYMENT_TIMESTAMP]`  
**🏦 Deployer Address**: `[DEPLOYER_ADDRESS]`  
**📦 Transaction ID**: `[DEPLOYMENT_TX_ID]`  

#### **Block Explorer Links**

**🔍 AlgoExplorer**: [View Contract on AlgoExplorer](https://testnet.algoexplorer.io/application/[APP_ID])  
**🌟 Pera Explorer**: [View on Pera Explorer](https://testnet.explorer.perawallet.app/application/[APP_ID])  
**📋 Deployment Transaction**: [View Transaction](https://testnet.algoexplorer.io/tx/[DEPLOYMENT_TX_ID])  

#### **Contract Verification Details**

| Property | Value |
|----------|-------|
| **Approval Program Size** | `2,357 bytes` |
| **Clear Program Size** | `30 bytes` |  
| **Global Schema** | `1 uint, 2 bytes` |
| **Local Schema** | `0 uint, 0 bytes` |
| **Extra Program Pages** | `0` |
| **TEAL Version** | `8` |

#### **ABI Method Verification**

**Available Methods:**
- `submit_report(string,string,string,bool)uint64` - Submit new incident report
- `get_report(uint64)string` - Retrieve report by ID  
- `get_stats()string` - Get platform statistics

**🔄 To Update After Deployment:**
```bash
# After running: python scripts/deploy_testnet.py
# Update the placeholders above with actual values from deployment output
```

#### **Live Contract Testing**

Once deployed, verify contract functionality:

1. **Submit Test Report**: Call `submit_report` method with sample data
2. **Retrieve Report**: Use returned ID to call `get_report` 
3. **Check Statistics**: Call `get_stats` to verify counter updates
4. **Verify on Explorer**: Confirm transactions appear on block explorer

#### **TestNet Faucet & Funding**

**💰 Get TestNet ALGOs**: [TestNet Bank](https://bank.testnet.algorand.network/)  
**⚡ Minimum Required**: `0.5 ALGO` for deployment and testing  
**🔄 Transaction Fees**: `~0.001 ALGO` per contract call

#### **Contract Source Verification**

**📄 Source Code**: [`proofchain-algokit/smart_contracts/proofchain_contract.py`](proofchain-algokit/smart_contracts/proofchain_contract.py)  
**🏭 TEAL Artifacts**: [`proofchain-algokit/artifacts/`](proofchain-algokit/artifacts/)  
**🚀 Deployment Script**: [`proofchain-algokit/scripts/deploy_testnet.py`](proofchain-algokit/scripts/deploy_testnet.py)  

The complete source code, TEAL artifacts, and deployment scripts are publicly available in this repository for full transparency and reproducibility.
