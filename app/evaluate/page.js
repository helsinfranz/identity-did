"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  ArrowLeft,
  Search,
  ExternalLink,
  Github,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Download,
  Share2,
} from "lucide-react"

export default function EvaluatePage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState("")
  const [loadingStates, setLoadingStates] = useState({})

  const handleEvaluate = async () => {
    if (!input.trim()) {
      setError("Please enter a wallet address or DID")
      return
    }

    setLoading(true)
    setError("")
    setResults(null)
    setLoadingStates({
      resolving: true,
      zkKyc: false,
      github: false,
      vc: false,
      onchain: false,
      computing: false,
    })

    try {
      // Step 1: Resolve DID
      const didResponse = await fetch("/api/resolve-did", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ didOrWallet: input }),
      })
      const didData = await didResponse.json()

      setLoadingStates((prev) => ({ ...prev, resolving: false, zkKyc: true }))
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Step 2: zk-KYC Status
      const zkKycResponse = await fetch("/api/zk-kyc-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ didOrWallet: input }),
      })
      const zkKycData = await zkKycResponse.json()

      setLoadingStates((prev) => ({ ...prev, zkKyc: false, github: true }))
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Step 3: GitHub Score
      const githubResponse = await fetch("/api/github-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubHandle: didData.github }),
      })
      const githubData = await githubResponse.json()

      setLoadingStates((prev) => ({ ...prev, github: false, vc: true }))
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Step 4: VC List
      const vcResponse = await fetch("/api/vc-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: input }),
      })
      const vcData = await vcResponse.json()

      setLoadingStates((prev) => ({ ...prev, vc: false, onchain: true }))
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Step 5: Onchain Score
      const onchainResponse = await fetch("/api/onchain-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: input }),
      })
      const onchainData = await onchainResponse.json()

      setLoadingStates((prev) => ({ ...prev, onchain: false, computing: true }))
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Step 6: Compute Final Score
      const scoreResponse = await fetch("/api/compute-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          didData,
          zkKycData,
          githubData,
          vcData,
          onchainData,
          wallet: input,
        }),
      })
      const scoreData = await scoreResponse.json()

      setLoadingStates((prev) => ({ ...prev, computing: false }))

      setResults({
        identity: didData,
        zkKyc: zkKycData,
        github: githubData,
        credentials: vcData,
        onchain: onchainData,
        final: scoreData,
      })
    } catch (err) {
      setError("Failed to evaluate identity. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const exportToPDF = () => {
    alert("PDF export functionality would be implemented here")
  }

  const shareReport = () => {
    const shareUrl = `${window.location.origin}/evaluate?address=${encodeURIComponent(input)}`
    navigator.clipboard.writeText(shareUrl)
    alert("Report link copied to clipboard!")
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
            <div className="flex space-x-4">
              {results && (
                <>
                  <button onClick={exportToPDF} className="btn-secondary flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export PDF</span>
                  </button>
                  <button onClick={shareReport} className="btn-secondary flex items-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Identity Evaluation</h1>
          <p className="text-gray-400 text-lg">Enter a wallet address or DID to analyze trust and credibility</p>
        </div>

        {/* Input Section */}
        <div className="card-dark max-w-2xl mx-auto mb-12">
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium text-gray-300">Wallet Address or DID</label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF or did:ethr:0x..."
                className="input-dark flex-1"
                disabled={loading}
              />
              <button
                onClick={handleEvaluate}
                disabled={loading}
                className="btn-primary flex items-center space-x-2 min-w-[140px] justify-center"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                <span>{loading ? "Evaluating..." : "Run Evaluation"}</span>
              </button>
            </div>
            {error && (
              <div className="text-red-400 text-sm flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading States */}
        {loading && (
          <div className="card-dark mb-8">
            <h3 className="text-xl font-semibold mb-6">Evaluation Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {loadingStates.resolving ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span className={loadingStates.resolving ? "text-blue-400" : "text-green-400"}>
                  Resolving DID/Address
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {loadingStates.zkKyc ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                ) : loadingStates.resolving ? (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span
                  className={
                    loadingStates.zkKyc ? "text-blue-400" : loadingStates.resolving ? "text-gray-500" : "text-green-400"
                  }
                >
                  Checking zk-KYC Status
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {loadingStates.github ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                ) : loadingStates.resolving || loadingStates.zkKyc ? (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span
                  className={
                    loadingStates.github
                      ? "text-blue-400"
                      : loadingStates.resolving || loadingStates.zkKyc
                        ? "text-gray-500"
                        : "text-green-400"
                  }
                >
                  Analyzing GitHub Activity
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {loadingStates.vc ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                ) : loadingStates.resolving || loadingStates.zkKyc || loadingStates.github ? (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span
                  className={
                    loadingStates.vc
                      ? "text-blue-400"
                      : loadingStates.resolving || loadingStates.zkKyc || loadingStates.github
                        ? "text-gray-500"
                        : "text-green-400"
                  }
                >
                  Fetching Verifiable Credentials
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {loadingStates.onchain ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                ) : loadingStates.resolving || loadingStates.zkKyc || loadingStates.github || loadingStates.vc ? (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span
                  className={
                    loadingStates.onchain
                      ? "text-blue-400"
                      : loadingStates.resolving || loadingStates.zkKyc || loadingStates.github || loadingStates.vc
                        ? "text-gray-500"
                        : "text-green-400"
                  }
                >
                  Computing Onchain Score
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {loadingStates.computing ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                ) : Object.values(loadingStates).some((state) => state) ? (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span
                  className={
                    loadingStates.computing
                      ? "text-blue-400"
                      : Object.values(loadingStates).some((state) => state)
                        ? "text-gray-500"
                        : "text-green-400"
                  }
                >
                  Computing Final Trust Score
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-8 animate-fadeInUp">
            {/* Trust Score Overview */}
            <div className="card-dark text-center">
              <h2 className="text-2xl font-bold mb-6">Identity Trust Score</h2>
              <div className="mb-6">
                <div className="text-6xl font-bold gradient-text mb-2">{results.final.trustScore}</div>
                <div className="text-gray-400">out of 100</div>
              </div>
              <div className="progress-bar mb-4">
                <div className="progress-fill" style={{ width: `${results.final.trustScore}%` }} />
              </div>
              <div className="flex justify-center items-center space-x-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    results.final.sybilRisk === "Low"
                      ? "bg-green-500/20 text-green-400"
                      : results.final.sybilRisk === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  Sybil Risk: {results.final.sybilRisk}
                </div>
                <a
                  href={`https://ipfs.io/ipfs/${results.final.proofHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>See Proof on IPFS</span>
                </a>
              </div>
            </div>

            {/* Detailed Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Identity Info */}
              <div className="card-dark">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold">Identity</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span> {results.identity.name}
                  </div>
                  <div>
                    <span className="text-gray-400">GitHub:</span> {results.identity.github}
                  </div>
                  <div>
                    <span className="text-gray-400">Twitter:</span> {results.identity.twitter}
                  </div>
                </div>
              </div>

              {/* zk-KYC Status */}
              <div className="card-dark">
                <div className="flex items-center mb-4">
                  <CheckCircle
                    className={`h-6 w-6 mr-3 ${results.zkKyc.verified ? "text-green-500" : "text-red-500"}`}
                  />
                  <h3 className="text-lg font-semibold">zk-KYC Status</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`font-medium ${results.zkKyc.verified ? "text-green-400" : "text-red-400"}`}>
                    {results.zkKyc.verified ? "Verified" : "Not Verified"}
                  </div>
                  <div>
                    <span className="text-gray-400">Score:</span> {results.zkKyc.score}/100
                  </div>
                </div>
              </div>

              {/* GitHub Activity */}
              <div className="card-dark">
                <div className="flex items-center mb-4">
                  <Github className="h-6 w-6 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold">GitHub Activity</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Contributions:</span> {results.github.contributions}
                  </div>
                  <div>
                    <span className="text-gray-400">Repositories:</span> {results.github.repos}
                  </div>
                </div>
              </div>

              {/* Onchain Score */}
              <div className="card-dark">
                <div className="flex items-center mb-4">
                  <Activity className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold">Onchain Activity</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Score:</span> {results.onchain.score}/100
                  </div>
                  <div>
                    <span className="text-gray-400">Transactions:</span> {results.onchain.transactions}
                  </div>
                  <div>
                    <span className="text-gray-400">POAPs:</span> {results.onchain.poaps}
                  </div>
                </div>
              </div>

              {/* DAO Credentials */}
              <div className="card-dark md:col-span-2">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-yellow-500 mr-3" />
                  <h3 className="text-lg font-semibold">DAO Credentials</h3>
                </div>
                <div className="space-y-3">
                  {results.credentials.map((cred, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium">{cred.type}</div>
                        <div className="text-sm text-gray-400">Issued by {cred.issuer}</div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
