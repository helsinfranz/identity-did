"use client"

import { useState } from "react"

const EvaluatePage = () => {
  const [address, setAddress] = useState("")
  const [zkKycData, setZkKycData] = useState({ verified: false, score: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call and response
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 101)
      const isVerified = randomScore > 50

      setZkKycData({ verified: isVerified, score: randomScore })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Evaluate Address</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter Ethereum Address"
            value={address}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Evaluating..." : "Evaluate"}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {zkKycData.score > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Risk Score
            </h3>
            <p className="text-5xl font-bold">{zkKycData.score}</p>
          </div>

          <div className="glass-card-static rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              zk-KYC Status
            </h3>
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  zkKycData.verified
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {zkKycData.verified ? "Verified" : "Not Verified"}
              </span>
              <span className="text-2xl font-bold">{zkKycData.score}/100</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a12.742 12.742 0 00-3.214 2.068l-.667 1.667m0 4.069a3 3 0 01.667 4.069l-.667 1.667a12.742 12.742 0 003.214 2.068 9.313 9.313 0 017.5 4.75c1.24 0 2.826.722 4.094 1.447l.667 1.667m0-10.105a3 3 0 01.667-4.069l-.667-1.667a12.742 12.742 0 00-3.214-2.068 9.313 9.313 0 01-7.5-4.75"
                />
              </svg>
              Compliance
            </h3>
            <p className="text-base">Meets basic regulatory standards.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default EvaluatePage
