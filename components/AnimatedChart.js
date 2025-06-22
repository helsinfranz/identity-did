"use client"

import { useEffect, useState } from "react"

export default function AnimatedChart({ data, title, type = "bar" }) {
  const [animatedData, setAnimatedData] = useState(data.map(({ value }) => 0))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data.map(({ value }) => value))
    }, 500)
    return () => clearTimeout(timer)
  }, [data])

  const maxValue = Math.max(...data.map(({ value }) => value))

  if (type === "radial") {
    return (
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="url(#radialGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - animatedData[0] / 100)}`}
                style={{ transition: "stroke-dashoffset 2s ease-out" }}
              />
              <defs>
                <linearGradient id="radialGradient">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text">{Math.round(animatedData[0])}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map(({ name, value }, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-gray-400">{name}</div>
            <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-2000 ease-out"
                style={{ width: `${(animatedData[index] / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-12 text-sm font-medium">{Math.round(animatedData[index])}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

