"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  ArrowLeft,
  Lock,
  Plus,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Award,
  Users,
  Settings,
} from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"

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
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <ParticleBackground />
        <div className="glass-card p-10 rounded-3xl max-w-md w-full mx-4 glow-effect">
          <div className="text-center mb-8">
            <div className="p-4 glass-button-secondary rounded-3xl w-fit mx-auto mb-6">
              <Lock className="h-12 w-12 text-yellow-400" />
            </div>
            <h1 className="text-3xl font-black gradient-text mb-2">Admin Access</h1>
            <p className="text-gray-400 font-medium">Enter password to access admin panel</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="glass-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500 font-medium"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {authError && (
              <div className="text-red-400 text-sm flex items-center space-x-2 glass-card p-4 rounded-xl bg-red-500/10">
                <AlertTriangle className="h-4 w-4" />
                <span>{authError}</span>
              </div>
            )}

            <button onClick={handleLogin} className="glass-button w-full py-4 rounded-2xl font-semibold glow-effect">
              Login to Admin Panel
            </button>

            <div className="text-center">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="h-5 w-5 text-gray-400" />
              <div className="p-2 glass-card rounded-xl">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-xl font-bold gradient-text">Identity Model Agent</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl">
                <Settings className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">Admin Panel</span>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="glass-button-secondary px-4 py-2 rounded-xl text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-slideInUp">
          <h1 className="text-5xl font-black gradient-text mb-4">Admin Panel</h1>
          <p className="text-gray-400 text-xl font-light">Issue verifiable credentials to wallet addresses</p>
        </div>

        {/* Issue Credential Form */}
        <div className="glass-card p-10 rounded-3xl max-w-3xl mx-auto mb-12 glow-effect">
          <div className="flex items-center mb-8">
            <div className="p-3 glass-button-secondary rounded-2xl mr-4">
              <Plus className="h-6 w-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Issue New Credential</h2>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-3 flex items-center space-x-2">
                <Award className="h-4 w-4 text-blue-400" />
                <span>Wallet Address</span>
              </label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF"
                className="glass-input w-full px-6 py-4 rounded-2xl text-white placeholder-gray-500 font-medium"
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-3 flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span>Credential Type</span>
              </label>
              <select
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value)}
                className="glass-input w-full px-6 py-4 rounded-2xl text-white font-medium"
                disabled={loading}
              >
                {credentialTypes.map((type) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="text-red-400 text-sm flex items-center space-x-2 glass-card p-4 rounded-xl bg-red-500/10">
                <AlertTriangle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="text-green-400 text-sm flex items-center space-x-2 glass-card p-4 rounded-xl bg-green-500/10">
                <CheckCircle className="h-4 w-4" />
                <span>{success}</span>
              </div>
            )}

            <button
              onClick={handleIssueCredential}
              disabled={loading}
              className="glass-button w-full py-4 rounded-2xl flex items-center justify-center space-x-3 font-semibold glow-effect"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              <span>{loading ? "Issuing Credential..." : "Issue Credential"}</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-10 rounded-3xl glow-effect">
          <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
            <Award className="h-6 w-6 text-yellow-400" />
            <span>Recent Credential Issuance</span>
          </h3>
          <div className="space-y-4">
            {[
              { type: "GitHub Contributor", address: "0x742d...4CAF", time: "2 hours ago", status: "active" },
              { type: "DAO Voter", address: "0x1234...5678", time: "5 hours ago", status: "active" },
              { type: "Protocol Contributor", address: "0xabcd...efgh", time: "1 day ago", status: "pending" },
              { type: "Bug Bounty Hunter", address: "0x9876...dcba", time: "2 days ago", status: "active" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-6 glass-card rounded-2xl glow-effect">
                <div className="flex items-center space-x-4">
                  <div className="p-2 glass-button-secondary rounded-xl">
                    <Award className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{item.type}</div>
                    <div className="text-sm text-gray-400">{item.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">{item.time}</div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6 rounded-2xl text-center glow-effect">
            <div className="text-3xl font-black text-green-400 mb-2">127</div>
            <div className="text-gray-400 font-medium">Total Credentials Issued</div>
            <div className="mt-2 flex justify-center">
              <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center glow-effect">
            <div className="text-3xl font-black text-blue-400 mb-2">23</div>
            <div className="text-gray-400 font-medium">Active This Week</div>
            <div className="mt-2 flex justify-center">
              <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center glow-effect">
            <div className="text-3xl font-black text-purple-400 mb-2">8</div>
            <div className="text-gray-400 font-medium">Credential Types</div>
            <div className="mt-2 flex justify-center">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
