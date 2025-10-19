#!/usr/bin/env bash

# TrustChain Demo Content Generation Script
# Helps generate screenshots, videos, and documentation for hackathon submission

echo "🎬 TrustChain Demo Content Generation"
echo "===================================="

# Check if frontend is running
check_frontend() {
    if curl -s http://localhost:5173 > /dev/null; then
        echo "✅ Frontend is running at http://localhost:5173"
    else
        echo "❌ Frontend is not running. Please start it first:"
        echo "   cd trustchain-witness-main && npm run dev"
        exit 1
    fi
}

# Check if backend is running
check_backend() {
    if curl -s http://localhost:3001/health > /dev/null; then
        echo "✅ Backend is running at http://localhost:3001"
    else
        echo "❌ Backend is not running. Please start it first:"
        echo "   cd trustchain-backend && npm run dev"
        exit 1
    fi
}

# Generate sample data for screenshots
generate_sample_data() {
    echo "📊 Generating sample data for better screenshots..."
    
    # Add some sample reports to the database (if backend supports it)
    curl -s -X POST http://localhost:3001/api/reports \
        -H "Content-Type: application/json" \
        -d '{
            "message": "Sample hate incident report for demo purposes",
            "txId": "demo_tx_123",
            "timestamp": '$(date +%s000)',
            "isAnonymous": false,
            "policeRef": "DEMO001",
            "incidentDate": "'$(date -I)'T10:00:00.000Z",
            "accountAddress": "DEMO_ADDRESS_123"
        }' > /dev/null 2>&1
    
    echo "   ✅ Sample reports added (if backend supports it)"
}

# Take screenshots
take_screenshots() {
    echo "📸 Screenshot Guide"
    echo "=================="
    echo "Please take screenshots of the following pages:"
    echo ""
    echo "1. 🏠 Landing Page:"
    echo "   URL: http://localhost:5173"
    echo "   Save as: screenshots/landing-page.png"
    echo ""
    echo "2. 📊 Dashboard:"
    echo "   URL: http://localhost:5173/dashboard"
    echo "   Save as: screenshots/dashboard.png"
    echo ""
    echo "3. 📝 Report Form:"
    echo "   URL: http://localhost:5173/dashboard (scroll to form)"
    echo "   Save as: screenshots/report-form.png"
    echo ""
    echo "4. 💳 Wallet Connection:"
    echo "   URL: http://localhost:5173/dashboard (click Connect Wallet)"
    echo "   Save as: screenshots/wallet-connect.png"
    echo ""
    echo "📋 Screenshot Tips:"
    echo "   • Use full-screen browser window"
    echo "   • Hide browser UI (F11 for full screen)"
    echo "   • Use 1920x1080 resolution if possible"
    echo "   • Show actual data, not empty states"
    
    read -p "Press Enter when screenshots are complete..."
}

# Create demo video checklist
demo_video_checklist() {
    echo "🎥 Demo Video Checklist"
    echo "======================"
    echo "Create a comprehensive demo video showing:"
    echo ""
    echo "✅ Platform Overview:"
    echo "   • Landing page walkthrough"
    echo "   • Explanation of the hate crime reporting problem"
    echo "   • How blockchain provides the solution"
    echo ""
    echo "✅ Technical Implementation:"
    echo "   • Custom smart contract explanation"
    echo "   • Code walkthrough (show PyTeal source)"
    echo "   • Deployment process demonstration"
    echo ""
    echo "✅ Live Demonstration:"
    echo "   • Wallet connection process"
    echo "   • Report submission workflow"
    echo "   • Blockchain transaction confirmation"
    echo "   • Data appearing in dashboard"
    echo ""
    echo "✅ GitHub Repository Tour:"
    echo "   • Project structure explanation"
    echo "   • Smart contract directory"
    echo "   • Frontend/backend integration"
    echo "   • Documentation quality"
    echo ""
    echo "🎯 Recommended Tools:"
    echo "   • Loom (https://loom.com) - Easy screen recording"
    echo "   • OBS Studio - Advanced recording"
    echo "   • QuickTime (Mac) - Built-in screen recording"
    echo ""
    echo "⏱️  Suggested Duration: 3-5 minutes"
}

# Technical explanation video checklist
technical_video_checklist() {
    echo "🔧 Technical Explanation Video Checklist"
    echo "========================================"
    echo "Create a detailed technical video covering:"
    echo ""
    echo "✅ Custom Smart Contract Deep Dive:"
    echo "   • PyTeal source code walkthrough"
    echo "   • Explain each function (submit_report, get_stats, etc.)"
    echo "   • Show TEAL compilation output"
    echo "   • Deployment process step-by-step"
    echo ""
    echo "✅ Algorand Integration:"
    echo "   • Why Algorand was chosen"
    echo "   • Unique features leveraged (instant finality, low fees)"
    echo "   • TestNet vs MainNet considerations"
    echo ""
    echo "✅ Architecture Overview:"
    echo "   • Frontend React TypeScript app"
    echo "   • Backend Express.js API"
    echo "   • Smart contract integration"
    echo "   • IPFS for evidence storage"
    echo ""
    echo "✅ Code Quality:"
    echo "   • Error handling and validation"
    echo "   • Security considerations"
    echo "   • Rate limiting implementation"
    echo "   • Testing and verification"
    echo ""
    echo "🎯 Target Audience: Technical judges and developers"
    echo "⏱️  Suggested Duration: 5-8 minutes"
}

# Verify smart contract deployment
verify_deployment() {
    echo "🔍 Smart Contract Deployment Verification"
    echo "========================================"
    
    if [ -f "trustchain-smart-contract/deployment_info.json" ]; then
        APP_ID=$(cat trustchain-smart-contract/deployment_info.json | grep -o '"app_id": *[0-9]*' | grep -o '[0-9]*')
        EXPLORER_URL=$(cat trustchain-smart-contract/deployment_info.json | grep -o '"explorer_url": *"[^"]*"' | cut -d'"' -f4)
        
        echo "✅ Smart contract deployed successfully!"
        echo "   App ID: $APP_ID"
        echo "   Explorer: $EXPLORER_URL"
        echo ""
        echo "📋 Include these links in your submission:"
        echo "   • Pera Explorer: https://testnet.explorer.perawallet.app/application/$APP_ID"
        echo "   • AlgoExplorer: https://testnet.algoexplorer.io/application/$APP_ID"
    else
        echo "❌ No deployment info found."
        echo "   Deploy the smart contract first:"
        echo "   cd trustchain-smart-contract && python deploy.py"
        exit 1
    fi
}

# Generate submission checklist
submission_checklist() {
    echo "📋 Hackathon Submission Checklist"
    echo "================================="
    echo ""
    echo "🎯 MANDATORY REQUIREMENTS:"
    echo ""
    echo "A. Platform Requirements:"
    echo "   ✅ Built on Algorand blockchain"
    echo "   ✅ Custom smart contract (not boilerplate)"
    echo "   ✅ Smart contract is fully functioning"
    echo ""
    echo "B. GitHub README Requirements:"
    echo "   [ ] Demo video link included"
    echo "   [ ] UI screenshots included"
    echo "   [ ] Detailed smart contract explanation"
    echo "   [ ] Technical explanation video (Loom)"
    echo "   [ ] Block explorer link for deployed contract"
    echo ""
    echo "C. Technical Implementation:"
    echo "   ✅ Custom PyTeal smart contract"
    echo "   ✅ AlgoKit project structure"
    echo "   ✅ TestNet deployment"
    echo "   ✅ Frontend integration"
    echo ""
    echo "🏆 JUDGING CRITERIA:"
    echo "   • Technical Implementation (robustness, security, best practices)"
    echo "   • Use of Blockchain (effective smart contract usage)"
    echo "   • Innovation and Originality (novel solution)"
    echo "   • Usability and Design (user experience)"
    echo "   • Impact Potential (real-world applicability)"
    echo "   • Feasibility (implementation clarity)"
    echo ""
    echo "📅 SUBMISSION DEADLINE: Sunday 12:00 PM (Demo Day)"
}

# Main menu
main_menu() {
    echo ""
    echo "Choose an option:"
    echo "1) Check system status"
    echo "2) Generate sample data"
    echo "3) Screenshot guide"
    echo "4) Demo video checklist"
    echo "5) Technical video checklist"
    echo "6) Verify smart contract deployment"
    echo "7) Submission checklist"
    echo "8) Exit"
    echo ""
    read -p "Enter your choice (1-8): " choice
    
    case $choice in
        1)
            check_frontend
            check_backend
            ;;
        2)
            generate_sample_data
            ;;
        3)
            take_screenshots
            ;;
        4)
            demo_video_checklist
            ;;
        5)
            technical_video_checklist
            ;;
        6)
            verify_deployment
            ;;
        7)
            submission_checklist
            ;;
        8)
            echo "👋 Good luck with your hackathon submission!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please try again."
            ;;
    esac
    
    main_menu
}

# Start the script
main_menu
