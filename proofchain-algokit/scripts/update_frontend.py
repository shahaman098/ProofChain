#!/usr/bin/env python3
"""
Update frontend configuration with deployed contract App ID
"""

import json
import os
import re

def update_frontend_config(app_id):
    """Update frontend files with new App ID"""
    
    # Paths to update
    frontend_paths = [
        "../trustchain-witness-main/src/lib/algorand.ts",
        "../trustchain-frontend/src/utils/algorand.js"
    ]
    
    for path in frontend_paths:
        if os.path.exists(path):
            print(f"📝 Updating {path}...")
            
            # Read file
            with open(path, 'r') as f:
                content = f.read()
            
            # Update App ID
            if 'APP_ID' in content:
                # Replace existing App ID
                content = re.sub(
                    r'APP_ID\s*=\s*\d+',
                    f'APP_ID = {app_id}',
                    content
                )
            else:
                # Add App ID if not found
                content = content.replace(
                    'export const APP_ID = 748001402;',
                    f'export const APP_ID = {app_id};'
                )
            
            # Write back
            with open(path, 'w') as f:
                f.write(content)
            
            print(f"✅ Updated {path} with App ID {app_id}")
        else:
            print(f"⚠️  File not found: {path}")
    
    # Update README files
    readme_paths = [
        "../README.md",
        "../BLOCKCHAIN_VERIFICATION.md"
    ]
    
    for path in readme_paths:
        if os.path.exists(path):
            print(f"📝 Updating {path}...")
            
            with open(path, 'r') as f:
                content = f.read()
            
            # Replace placeholder App IDs
            content = re.sub(
                r'\[TO_BE_UPDATED_AFTER_DEPLOYMENT\]',
                str(app_id),
                content
            )
            content = re.sub(
                r'\[APP_ID\]',
                str(app_id),
                content
            )
            
            with open(path, 'w') as f:
                f.write(content)
            
            print(f"✅ Updated {path} with App ID {app_id}")

def main():
    """Main function"""
    
    # Load deployment info
    try:
        with open("deployment_info.json", "r") as f:
            deployment_info = json.load(f)
            app_id = deployment_info["app_id"]
    except FileNotFoundError:
        print("❌ Error: deployment_info.json not found")
        print("💡 Deploy the contract first with: python scripts/deploy_testnet.py")
        return
    
    print(f"🔄 Updating frontend with App ID: {app_id}")
    
    # Update frontend files
    update_frontend_config(app_id)
    
    print("\n✅ Frontend configuration updated successfully!")
    print(f"📱 New App ID: {app_id}")
    print("🚀 You can now test the frontend with the deployed contract")

if __name__ == "__main__":
    main()
