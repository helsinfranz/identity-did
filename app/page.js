"use client"

import Link from "next/link"
import { Shield, Users, Activity, ArrowRight, Lock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold gradient-text">Identity Model Agent</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/evaluate" className="text-gray-300 hover:text-white transition-colors">
                Evaluate
              </Link>
              <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Identity Model Agent</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Decentralized Trust Scoring for Web3 Contributors
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Evaluate credibility, authenticity, and trustworthiness using onchain and offchain data with zero-knowledge
            privacy protection.
          </p>

          <Link href="/evaluate">
            <button className="btn-primary text-lg px-8 py-4 animate-pulse-glow group">
              Evaluate Identity
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card-dark animate-fadeInUp hover:neon-glow transition-all duration-300">
            <div className="flex items-center mb-4">
              <Lock className="h-8 w-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold">zk-KYC Privacy</h3>
            </div>
            <p className="text-gray-400">
              Verify identity without revealing personal information using zero-knowledge proofs and privacy-preserving
              protocols.
            </p>
          </div>

          <div
            className="card-dark animate-fadeInUp hover:neon-glow transition-all duration-300"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold">DID & VC Reputation</h3>
            </div>
            <p className="text-gray-400">
              Analyze decentralized identifiers and verifiable credentials from DAOs, protocols, and Web3 organizations.
            </p>
          </div>

          <div
            className="card-dark animate-fadeInUp hover:neon-glow transition-all duration-300"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center mb-4">
              <Activity className="h-8 w-8 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold">Onchain Score Signals</h3>
            </div>
            <p className="text-gray-400">
              Comprehensive analysis of transaction history, POAP collections, and blockchain activity patterns.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mt-20 text-center">
          <div className="card-dark">
            <div className="text-3xl font-bold text-green-500 mb-2">10K+</div>
            <div className="text-gray-400">Identities Evaluated</div>
          </div>
          <div className="card-dark">
            <div className="text-3xl font-bold text-blue-500 mb-2">95%</div>
            <div className="text-gray-400">Accuracy Rate</div>
          </div>
          <div className="card-dark">
            <div className="text-3xl font-bold text-purple-500 mb-2">50+</div>
            <div className="text-gray-400">DAO Partners</div>
          </div>
          <div className="card-dark">
            <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
            <div className="text-gray-400">Real-time Updates</div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Address</h3>
              <p className="text-gray-400">Enter a wallet address or DID to begin the evaluation process</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze Data</h3>
              <p className="text-gray-400">Our AI processes onchain activity, credentials, and reputation signals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-400">Receive comprehensive trust score and detailed breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
