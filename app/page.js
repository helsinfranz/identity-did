"use client"

import { useState, useEffect } from "react"

const AnimatedGradientText = ({ text }) => {
  const [gradientPosition, setGradientPosition] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 200)
    }, 30) // Adjust speed here

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text"
      style={{
        backgroundImage: `linear-gradient(to right, #00FFFF, #17C6FF, #597BFF, #A34BFF, #FF46D2, #FF6287, #FF9339, #FFC900)`,
        backgroundSize: "200% 100%",
        backgroundPosition: `${gradientPosition}% center`,
        animation: "none", // Disable the CSS animation
      }}
    >
      {text}
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <AnimatedGradientText text="Verifiable Credentials for Web3" />
          <p className="text-gray-400 mt-4 text-lg">Unlock the power of decentralized identity and trust</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card rounded-2xl p-8 text-center animate-slideInLeft">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">zk-KYC Privacy</h3>
            <p className="text-gray-300">Zero-knowledge verification without revealing personal information</p>
          </div>

          <div className="glass-card-static rounded-2xl p-8 text-center animate-slideInUp">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0v2m4-2v2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">DID & VC Reputation</h3>
            <p className="text-gray-300">Decentralized identity with verifiable credentials from trusted issuers</p>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center animate-slideInRight">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Onchain Score Signals</h3>
            <p className="text-gray-300">Transaction history, POAP collections, and DeFi participation analysis</p>
          </div>
        </div>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-8">Get Started</h2>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
              Explore the Docs
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
              Join the Community
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
