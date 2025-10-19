import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import WalletButton from './components/WalletButton'
import ReportForm from './components/ReportForm'
import './App.css'

function App() {
  const [accounts, setAccounts] = useState([])
  const [reports, setReports] = useState([])

  const handleReportSubmitted = (report) => {
    setReports(prev => [report, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Demo Mode Banner */}
      <div className="bg-green-600/20 border-b border-green-400/30 py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-200 text-sm">
            🚀 <strong>DEMO MODE</strong> - ProofChain running with simulated blockchain interactions | 
            <a href="/deploy" className="underline ml-2">Deploy to TestNet →</a>
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            🛡️ ProofChain
          </h1>
          <WalletButton accounts={accounts} setAccounts={setAccounts} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Decentralized Hate Crime Reporting
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Secure, anonymous incident reporting powered by Algorand blockchain
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="text-white font-semibold mb-2">Anonymous & Safe</h3>
                <p className="text-blue-200 text-sm">Report incidents without revealing your identity</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-2">⛓️</div>
                <h3 className="text-white font-semibold mb-2">Blockchain Verified</h3>
                <p className="text-blue-200 text-sm">Immutable records on Algorand network</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-white font-semibold mb-2">Community Impact</h3>
                <p className="text-blue-200 text-sm">Transparent statistics for advocacy</p>
              </div>
            </div>
          </div>

          {/* Report Form */}
          {accounts.length > 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Submit Incident Report</h3>
              <ReportForm accounts={accounts} onSubmitted={handleReportSubmitted} />
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-blue-200 mb-6">
                Connect your Algorand wallet to start reporting incidents securely
              </p>
              <WalletButton accounts={accounts} setAccounts={setAccounts} />
            </div>
          )}

          {/* Recent Reports */}
          {reports.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Recent Reports</h3>
              <div className="space-y-4">
                {reports.map((report, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-green-400 text-sm">✅ Submitted Successfully</span>
                      <span className="text-blue-200 text-sm">
                        {new Date(report.ts).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-white">{report.message}</p>
                    {report.txId && (
                      <p className="text-blue-300 text-sm mt-2">
                        Transaction: {report.txId.slice(0, 10)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-blue-200">
            Built on Algorand blockchain for the 2024 Hackathon
          </p>
        </div>
      </footer>

      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          }
        }}
      />
    </div>
  )
}

export default App
