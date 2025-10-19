#!/bin/bash

# TrustChain Development Start Script

echo "🚀 Starting TrustChain Development Environment"
echo "=============================================="

# Function to kill background processes on script exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM

# Start backend server
echo "🔧 Starting backend server..."
cd trustchain-backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd trustchain-witness-main
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers are starting..."
echo ""
echo "🔗 URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3001"
echo "  Health:   http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop the script
wait
