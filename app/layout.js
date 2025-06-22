import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Identity Model Agent",
  description: "Decentralized Trust Scoring for Web3 Contributors",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>{children}</body>
    </html>
  )
}
