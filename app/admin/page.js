"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, Lock, Plus, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [wallet, setWallet] = useState("")
  const [credentialType, setCredentialType] = useState("GitHub Contributor")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const credentialTypes = [
    "GitHub Contributor",
    "DAO Voter",
    "Protocol Contributor",
    "Community Moderator",
    "Bug Bounty Hunter",
    "Governance Participant",
    "DeFi Power User",
    "NFT Creator",
  ]

  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
      setAuthError("")
    } else {
      setAuthError("Invalid password")
    }
  }

  const handleIssueCredential = async () => {
    if (!wallet.trim()) {
      setError("Please enter a wallet address")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/issue-vc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer API_KEY_HERE",
        },
        body: JSON.stringify({
          wallet: wallet.trim(),
          credentialType,
        }),
      })

      const data = await response.json()

      if (data.status === "success") {
        setSuccess(`Credential "${credentialType}" successfully issued to ${wallet}`)
        setWallet("")
      } else {
        setError("Failed to issue credential")
      }
    } catch (err) {
      setError("Failed to issue credential. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="card-dark max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold gradient-text">Admin Access</h1>
            <p className="text-gray-400 mt-2">Enter password to access admin panel</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-dark w-full"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {authError && (
              <div className="text-red-400 text-sm flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>{authError}</span>
              </div>
            )}

            <button onClick={handleLogin} className="btn-primary w-full">
              Login
            </button>

            <div className="text-center">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
              <Shield className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold gradient-text">Identity Model Agent</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Admin Panel</span>
              <button onClick={() => setIsAuthenticated(false)} className="btn-secondary text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Admin Panel</h1>
          <p className="text-gray-400 text-lg">Issue verifiable credentials to wallet addresses</p>
        </div>

        {/* Issue Credential Form */}
        <div className="card-dark max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Plus className="h-6 w-6 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold">Issue New Credential</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Wallet Address</label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF"
                className="input-dark w-full"
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Credential Type</label>
              <select
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value)}
                className="input-dark w-full"
                disabled={loading}
              >
                {credentialTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="text-red-400 text-sm flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="text-green-400 text-sm flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>{success}</span>
              </div>
            )}

            <button
              onClick={handleIssueCredential}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              <span>{loading ? "Issuing..." : "Issue Credential"}</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-dark mt-8">
          <h3 className="text-xl font-semibold mb-6">Recent Credential Issuance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium">GitHub Contributor</div>
                <div className="text-sm text-gray-400">0x742d...4CAF</div>
              </div>
              <div className="text-sm text-gray-400">2 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium">DAO Voter</div>
                <div className="text-sm text-gray-400">0x1234...5678</div>
              </div>
              <div className="text-sm text-gray-400">5 hours ago</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium">Protocol Contributor</div>
                <div className="text-sm text-gray-400">0xabcd...efgh</div>
              </div>
              <div className="text-sm text-gray-400">1 day ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
