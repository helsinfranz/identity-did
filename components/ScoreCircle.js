"use client"

import { useEffect, useState } from "react"

export default function ScoreCircle({ score, size = 200, strokeWidth = 8 }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className="score-circle flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} className="progress-ring" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="progress-ring-fill"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-4xl font-bold gradient-text">{Math.round(animatedScore)}</div>
        <div className="text-sm text-gray-400">Trust Score</div>
      </div>
    </div>
  )
}
