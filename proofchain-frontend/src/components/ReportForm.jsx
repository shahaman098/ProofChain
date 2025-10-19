import { useState } from 'react'
import { buildSubmitReportTxn, waitForTx } from '../lib/algorand.js'
import { signAndSend } from '../lib/wallet.js'
import toast from 'react-hot-toast'

export default function ReportForm({ accounts, onSubmitted }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const canSubmit = accounts?.length && message.trim().length

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    try {
      const txn = await buildSubmitReportTxn({ sender: accounts[0], message })
      const txId = await signAndSend(txn)
      await waitForTx(txId)
      toast.success('Report submitted successfully!')
      onSubmitted?.({ message, txId, ts: Date.now() })
      setMessage('')
    } catch (err) {
      console.error(err)
      toast.error('Error submitting report.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label className="form-label">Incident Description</label>
        <textarea
          className="form-textarea"
          rows={4}
          placeholder="Describe what happened... (e.g., location, time, nature of incident)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Additional Information (Optional)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="form-input"
            type="text"
            placeholder="Location (optional)"
          />
          <input
            className="form-input"
            type="text"
            placeholder="Police Reference # (optional)"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Evidence Links (Optional)</label>
        <input
          className="form-input"
          type="url"
          placeholder="IPFS CID or evidence link (optional)"
        />
      </div>
      
      <button 
        type="submit" 
        className={`btn ${canSubmit && !loading ? 'primary' : ''} w-full`}
        disabled={!canSubmit || loading}
      >
        {loading ? '⏳ Submitting to Blockchain...' : '🔐 Submit Anonymous Report'}
      </button>

      {canSubmit && (
        <p className="text-sm text-blue-200 text-center">
          Your report will be securely stored on Algorand blockchain with full anonymity
        </p>
      )}
    </form>
  )
}
