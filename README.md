# Identity Model Agent

Decentralized Trust Scoring for Web3 Contributors

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/himanshu-rawats-projects-49b8edc3/v0-dark-theme-web-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/7oibiqvpqbu)

## Overview

Identity Model Agent is a full-stack Next.js app for evaluating the trustworthiness and reputation of Web3 contributors using onchain and offchain data, zero-knowledge KYC, and decentralized credentials. The app provides a privacy-preserving, AI-powered trust score for any Ethereum wallet or DID.

## Features

- **DID & ENS Resolution:** Resolves wallet addresses or DIDs to ENS names and social handles.
- **zk-KYC Verification:** Integrates with World ID (Worldcoin) for zero-knowledge KYC proof verification.
- **GitHub Activity Analysis:** Fetches and scores GitHub activity for open-source reputation.
- **Onchain Score:** Calculates onchain activity score using Alchemy (transaction count) and POAPs.
- **Verifiable Credentials:** Fetches and displays DAO and protocol credentials (via Ceramic).
- **Final Trust Score:** Computes a comprehensive trust score and Sybil risk assessment.
- **IPFS Proof:** Uploads the full report to IPFS for verifiable, tamper-proof storage.
- **Modern UI:** Beautiful, dark-themed, mobile-friendly interface with animated charts and progress.

## API Endpoints

All endpoints are under `/api/` and accept POST requests with JSON bodies.

- **/api/resolve-did**

  - Input: `{ didOrWallet }`
  - Output: `{ name, github, twitter }`
  - Resolves ENS and social handles for a wallet or DID.

- **/api/zk-kyc-status**

  - Input: `{ didOrWallet }` (demo) or World ID proof fields (see [World ID API](https://docs.world.org/world-id/reference/api))
  - Output: `{ verified, score, worldId }`
  - Verifies zk-KYC status using World ID API or returns data.

- **/api/github-score**

  - Input: `{ githubHandle }`
  - Output: GitHub activity stats.

- **/api/vc-list**

  - Input: `{ wallet }`
  - Output: List of verifiable credentials (from Ceramic).

- **/api/onchain-score**

  - Input: `{ wallet }`
  - Output: `{ score, transactions, poaps }`
  - Calculates onchain activity score using Alchemy and POAP data.

- **/api/compute-score**

  - Input: `{ didData, zkKycData, githubData, vcData, onchainData, wallet }`
  - Output: `{ trustScore, sybilRisk, ... }`
  - Computes the final trust score and risk assessment.

- **/api/issue-vc**
  - Input: `{ wallet, credentialType }` (requires API key in Authorization header)
  - Output: Credential issuance status.

## How It Works

1. **Input:** User enters a wallet address or DID.
2. **Resolution:** App resolves ENS, GitHub, and Twitter handles.
3. **zk-KYC:** Verifies World ID proof or simulates verification.
4. **GitHub:** Fetches and scores GitHub activity.
5. **VCs:** Fetches verifiable credentials.
6. **Onchain:** Calculates onchain activity score.
7. **Scoring:** Computes a final trust score and Sybil risk.
8. **Proof:** Uploads the report to IPFS for verifiability.

## Tech Stack

- **Next.js 14** (App Router)
- **React**
- **Tailwind CSS**
- **Lucide Icons**
- **Alchemy API** (onchain data)
- **World ID API** (zk-KYC)
- **Ceramic/IDX** (VCs, optional)
- **Pinata/IPFS** (report storage)

## Local Development

1. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```
2. Run the dev server:
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Customization

- Update API keys in `/app/api/` and `/utils/ipfsUpload.js` as needed.
- See [World ID API docs](https://docs.world.org/world-id/reference/api) for zk-KYC integration details.

## License

MIT
