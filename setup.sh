#!/bin/bash

# TrustChain Development Setup Script

echo "🚀 Setting up TrustChain Development Environment"
echo "=============================================="

# Check if we're in the right directory
if [ ! -d "trustchain-witness-main" ] || [ ! -d "trustchain-backend" ]; then
    echo "❌ Error: Please run this script from the proofchain directory"
    echo "Expected structure:"
    echo "  proofchain/"
    echo "    ├── trustchain-witness-main/"
    echo "    └── trustchain-backend/"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required tools
echo "🔍 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd trustchain-backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install backend dependencies"
        exit 1
    fi
else
    echo "✅ Backend dependencies already installed"
fi
cd ..

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd trustchain-witness-main
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
else
    echo "✅ Frontend dependencies already installed"
fi
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development servers:"
echo "  Backend:  cd trustchain-backend && npm run dev"
echo "  Frontend: cd trustchain-witness-main && npm run dev"
echo ""
echo "Or use the start script: ./start-dev.sh"
