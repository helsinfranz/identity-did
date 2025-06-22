"use client"

import Link from "next/link"
import { Shield, Users, Activity, ArrowRight, Lock, Zap, Globe, Database, Github, Twitter } from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 glass-card rounded-xl">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-xl font-bold gradient-text">Identity Model Agent</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                Home
              </Link>
              <Link
                href="/evaluate"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Evaluate
              </Link>
              <Link href="/admin" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="hero-glow"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-slideInUp">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Powered by AI & Blockchain</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="gradient-text">Identity Model</span>
              <br />
              <span className="text-white">Agent</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto font-light">
              Decentralized Trust Scoring for Web3 Contributors
            </p>

            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Evaluate credibility, authenticity, and trustworthiness using onchain and offchain data with
              zero-knowledge privacy protection and advanced AI analysis.
            </p>

            <Link href="/evaluate">
              <button className="glass-button glow-effect text-lg px-10 py-4 rounded-2xl font-semibold group inline-flex items-center space-x-3">
                <span>Evaluate Identity</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <div className="glass-card p-8 rounded-3xl animate-slideInLeft glow-effect">
              <div className="flex items-center mb-6">
                <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                  <Lock className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold">zk-KYC Privacy</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Verify identity without revealing personal information using zero-knowledge proofs and
                privacy-preserving protocols with military-grade encryption.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Privacy Protected</span>
              </div>
            </div>

            <div
              className="glass-card p-8 rounded-3xl animate-slideInUp glow-effect"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">DID & VC Reputation</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Analyze decentralized identifiers and verifiable credentials from DAOs, protocols, and Web3
                organizations with real-time validation.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Decentralized Verified</span>
              </div>
            </div>

            <div
              className="glass-card p-8 rounded-3xl animate-slideInRight glow-effect"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 glass-button-secondary rounded-2xl mr-4">
                  <Activity className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Onchain Score Signals</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Comprehensive analysis of transaction history, POAP collections, and blockchain activity patterns with
                AI-powered insights.
              </p>
              <div className="mt-6 flex items-center space-x-2 text-sm text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>AI Analyzed</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mt-24">
            <div className="glass-card p-6 rounded-2xl text-center glow-effect">
              <div className="text-4xl font-black text-green-400 mb-2">10K+</div>
              <div className="text-gray-400 font-medium">Identities Evaluated</div>
              <div className="mt-2 flex justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center glow-effect">
              <div className="text-4xl font-black text-blue-400 mb-2">95%</div>
              <div className="text-gray-400 font-medium">Accuracy Rate</div>
              <div className="mt-2 flex justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center glow-effect">
              <div className="text-4xl font-black text-purple-400 mb-2">50+</div>
              <div className="text-gray-400 font-medium">DAO Partners</div>
              <div className="mt-2 flex justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center glow-effect">
              <div className="text-4xl font-black text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Real-time Updates</div>
              <div className="mt-2 flex justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-32">
            <h2 className="text-4xl font-black text-center mb-16 gradient-text">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 glass-button rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Database className="h-10 w-10 text-green-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Input Address</h3>
                <p className="text-gray-400 leading-relaxed">
                  Enter a wallet address or DID to begin the comprehensive evaluation process with our advanced AI
                  system
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 glass-button rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-10 w-10 text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Analyze Data</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our AI processes onchain activity, credentials, and reputation signals from multiple blockchain
                  networks
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 glass-button rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-purple-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Get Results</h3>
                <p className="text-gray-400 leading-relaxed">
                  Receive comprehensive trust score with detailed breakdown and verifiable proof stored on IPFS
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-32 text-center">
            <h3 className="text-2xl font-bold mb-8 gradient-text">Trusted by Web3 Leaders</h3>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <Github className="h-8 w-8" />
              <Twitter className="h-8 w-8" />
              <Shield className="h-8 w-8" />
              <Globe className="h-8 w-8" />
              <Database className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
