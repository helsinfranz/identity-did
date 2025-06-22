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
  Zap,
  Globe,
  Lock,
  TrendingUp,
  Award,
  Target,
} from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"
import ScoreCircle from "@/components/ScoreCircle"
import AnimatedChart from "@/components/AnimatedChart"
import { exportToPDF } from "@/utils/pdfExport"
import { shareReport } from "@/utils/shareReport"
import { uploadToIPFS } from "@/utils/ipfsUpload"

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

      // Upload to IPFS
      const reportData = {
        address: input,
        timestamp: Date.now(),
        identity: didData,
        zkKyc: zkKycData,
        github: githubData,
        credentials: vcData,
        onchain: onchainData,
        final: scoreData,
      }

      const ipfsResult = await uploadToIPFS(reportData)
      scoreData.proofHash = ipfsResult.hash
      scoreData.proofUrl = ipfsResult.url

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

  const handleExportPDF = async () => {
    if (!results) return
    const success = await exportToPDF(results, input)
    if (success) {
      alert("Report exported successfully!")
    } else {
      alert("Export failed. Please try again.")
    }
  }

  const handleShareReport = async () => {
    if (!results) return
    try {
      await shareReport(results, input)
      alert("Report shared successfully!")
    } catch (error) {
      alert("Share failed. Link copied to clipboard instead.")
    }
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
            <div className="flex space-x-4">
              {results && (
                <>
                  <button
                    onClick={handleExportPDF}
                    className="glass-button-secondary px-4 py-2 rounded-xl flex items-center space-x-2 font-medium"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export PDF</span>
                  </button>
                  <button
                    onClick={handleShareReport}
                    className="glass-button-secondary px-4 py-2 rounded-xl flex items-center space-x-2 font-medium"
                  >
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
        <div className="text-center mb-12 animate-slideInUp">
          <h1 className="text-5xl font-black gradient-text mb-4">Identity Evaluation</h1>
          <p className="text-gray-400 text-xl font-light">
            Enter a wallet address or DID to analyze trust and credibility
          </p>
        </div>

        {/* Input Section */}
        <div className="glass-card p-8 rounded-3xl max-w-3xl mx-auto mb-12 glow-effect">
          <div className="flex flex-col space-y-6">
            <label className="text-sm font-semibold text-gray-300 flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-400" />
              <span>Wallet Address or DID</span>
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF or did:ethr:0x..."
                className="glass-input flex-1 px-6 py-4 rounded-2xl text-white placeholder-gray-500 font-medium"
                disabled={loading}
              />
              <button
                onClick={handleEvaluate}
                disabled={loading}
                className="glass-button px-8 py-4 rounded-2xl flex items-center space-x-3 min-w-[160px] justify-center font-semibold glow-effect"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                <span>{loading ? "Evaluating..." : "Run Evaluation"}</span>
              </button>
            </div>
            {error && (
              <div className="text-red-400 text-sm flex items-center space-x-2 glass-card p-4 rounded-xl bg-red-500/10">
                <AlertTriangle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading States */}
        {loading && (
          <div className="glass-card p-8 rounded-3xl mb-8 animate-slideInUp">
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
              <Zap className="h-6 w-6 text-yellow-400" />
              <span>Evaluation Progress</span>
            </h3>
            <div className="space-y-6">
              {[
                { key: "resolving", label: "Resolving DID/Address", icon: Globe },
                { key: "zkKyc", label: "Checking zk-KYC Status", icon: Lock },
                { key: "github", label: "Analyzing GitHub Activity", icon: Github },
                { key: "vc", label: "Fetching Verifiable Credentials", icon: Award },
                { key: "onchain", label: "Computing Onchain Score", icon: Activity },
                { key: "computing", label: "Computing Final Trust Score", icon: TrendingUp },
              ].map(({ key, label, icon: Icon }, index) => (
                <div key={key} className="flex items-center space-x-4 p-4 glass-card rounded-2xl">
                  <div
                    className={`p-2 rounded-xl ${
                      loadingStates[key]
                        ? "glass-button"
                        : Object.keys(loadingStates)
                              .slice(0, index)
                              .every((k) => !loadingStates[k])
                          ? "glass-button"
                          : "bg-gray-700"
                    }`}
                  >
                    {loadingStates[key] ? (
                      <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                    ) : Object.keys(loadingStates)
                        .slice(0, index)
                        .every((k) => !loadingStates[k]) ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Icon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      loadingStates[key]
                        ? "text-blue-400"
                        : Object.keys(loadingStates)
                              .slice(0, index)
                              .every((k) => !loadingStates[k])
                          ? "text-green-400"
                          : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-8 animate-slideInUp">
            {/* Trust Score Overview */}
            <div className="glass-card p-12 rounded-3xl text-center glow-effect">
              <h2 className="text-3xl font-black mb-8 gradient-text">Identity Trust Score</h2>
              <div className="flex justify-center mb-8">
                <ScoreCircle score={results.final.trustScore} size={240} />
              </div>
              <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
                <div
                  className={`px-6 py-3 rounded-2xl text-sm font-bold glass-card ${
                    results.final.sybilRisk === "Low"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : results.final.sybilRisk === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  Sybil Risk: {results.final.sybilRisk}
                </div>
                <a
                  href={results.final.proofUrl || `https://ipfs.io/ipfs/${results.final.proofHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button-secondary px-6 py-3 rounded-2xl flex items-center space-x-2 font-medium glow-effect"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Proof on IPFS</span>
                </a>
              </div>
            </div>

            {/* Detailed Results Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Identity Info */}
              <div className="glass-card p-8 rounded-3xl glow-effect">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold">Identity Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 glass-card rounded-2xl">
                    <span className="text-gray-400 font-medium">Name</span>
                    <span className="font-bold">{results.identity.name}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 glass-card rounded-2xl">
                    <span className="text-gray-400 font-medium">GitHub</span>
                    <span className="font-bold">{results.identity.github}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 glass-card rounded-2xl">
                    <span className="text-gray-400 font-medium">Twitter</span>
                    <span className="font-bold">{results.identity.twitter}</span>
                  </div>
                </div>
              </div>

              {/* zk-KYC Status */}
              <div className="glass-card p-8 rounded-3xl glow-effect">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                    <Lock className={`h-6 w-6 ${results.zkKyc.verified ? "text-green-400" : "text-red-400"}`} />
                  </div>
                  <h3 className="text-xl font-bold">zk-KYC Status</h3>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-black mb-4 ${results.zkKyc.verified ? "text-green-400" : "text-red-400"}`}
                  >
                    {results.zkKyc.verified ? "✓ Verified" : "✗ Not Verified"}
                  </div>
                  <AnimatedChart data={[results.zkKyc.score]} title="Verification Score" type="radial" />
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* GitHub Activity Chart */}
              <div className="glass-card p-8 rounded-3xl glow-effect">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                    <Github className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">GitHub Activity</h3>
                </div>
                <AnimatedChart
                  data={[results.github.contributions, results.github.repos * 10]}
                  title="Development Activity"
                />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 glass-card rounded-2xl">
                    <div className="text-2xl font-bold text-purple-400">{results.github.contributions}</div>
                    <div className="text-sm text-gray-400">Contributions</div>
                  </div>
                  <div className="text-center p-4 glass-card rounded-2xl">
                    <div className="text-2xl font-bold text-purple-400">{results.github.repos}</div>
                    <div className="text-sm text-gray-400">Repositories</div>
                  </div>
                </div>
              </div>

              {/* Onchain Activity Chart */}
              <div className="glass-card p-8 rounded-3xl glow-effect">
                <div className="flex items-center mb-6">
                  <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                    <Activity className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Onchain Activity</h3>
                </div>
                <AnimatedChart data={[results.onchain.score]} title="Activity Score" type="radial" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 glass-card rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">{results.onchain.transactions}</div>
                    <div className="text-sm text-gray-400">Transactions</div>
                  </div>
                  <div className="text-center p-4 glass-card rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">{results.onchain.poaps}</div>
                    <div className="text-sm text-gray-400">POAPs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DAO Credentials */}
            <div className="glass-card p-8 rounded-3xl glow-effect">
              <div className="flex items-center mb-6">
                <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">Verifiable Credentials</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {results.credentials.map((cred, index) => (
                  <div key={index} className="flex items-center justify-between p-6 glass-card rounded-2xl glow-effect">
                    <div>
                      <div className="font-bold text-lg">{cred.type}</div>
                      <div className="text-sm text-gray-400">Issued by {cred.issuer}</div>
                    </div>
                    <div className="p-2 glass-button rounded-xl">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
