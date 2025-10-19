"""
Build script for ProofChain smart contracts
Compiles PyTeal to TEAL and generates artifacts
"""

import os
from pathlib import Path
from smart_contracts.proofchain_contract import ProofChainApp

def build_contracts():
    """Build all smart contracts and save artifacts"""
    print("🔨 Building ProofChain Smart Contracts...")
    
    # Create artifacts directory
    artifacts_dir = Path("artifacts")
    artifacts_dir.mkdir(exist_ok=True)
    
    # Initialize contract
    app = ProofChainApp()
    
    # Compile contracts
    approval_teal, clear_state_teal = app.compile_contracts()
    
    # Save TEAL files
    with open(artifacts_dir / "ProofChain.approval.teal", "w") as f:
        f.write(approval_teal)
    
    with open(artifacts_dir / "ProofChain.clear.teal", "w") as f:
        f.write(clear_state_teal)
    
    # Generate ARC-32 application spec (simplified)
    app_spec = {
        "name": "ProofChain",
        "description": "Decentralized hate incident reporting smart contract",
        "version": "2.0.0",
        "methods": [
            {
                "name": "submit_report",
                "args": [
                    {"name": "message", "type": "string"},
                    {"name": "police_ref", "type": "string"}, 
                    {"name": "ipfs_cid", "type": "string"},
                    {"name": "is_anonymous", "type": "bool"}
                ],
                "returns": {"type": "uint64"}
            },
            {
                "name": "get_report", 
                "args": [{"name": "report_id", "type": "uint64"}],
                "returns": {"type": "string"}
            },
            {
                "name": "get_stats",
                "args": [],
                "returns": {"type": "string"}
            }
        ],
        "state": {
            "global": {
                "num_uints": 1,
                "num_byte_slices": 2
            },
            "local": {
                "num_uints": 0, 
                "num_byte_slices": 0
            }
        }
    }
    
    import json
    with open(artifacts_dir / "ProofChain.arc32.json", "w") as f:
        json.dump(app_spec, f, indent=2)
    
    print(f"✅ Contracts built successfully!")
    print(f"📁 Artifacts saved to: {artifacts_dir.absolute()}")
    print(f"📄 Files generated:")
    print(f"   - ProofChain.approval.teal")
    print(f"   - ProofChain.clear.teal") 
    print(f"   - ProofChain.arc32.json")

if __name__ == "__main__":
    build_contracts()
