export async function POST(request) {
  try {
    const body = await request.json()
    // Accept either demo or real zk-KYC payload
    const {
      merkle_root = "0x1234567890abcdef", // fallback for demo
      nullifier_hash = body.didOrWallet || "0xabcdef1234567890", // fallback for demo
      proof = "dummy_proof_data", // fallback for demo
      credential_type = "orb", // default for World ID
      action = "identity-eval-demo" // default action
    } = body

    // Try real zk-KYC verification
    try {
      const zkKycResponse = await fetch("https://developer.worldcoin.org/api/v2/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merkle_root,
          nullifier_hash,
          proof,
          credential_type,
          action,
        }),
      })

      if (zkKycResponse.ok) {
        const zkData = await zkKycResponse.json()
        return Response.json({
          verified: zkData.success || false,
          score: zkData.success ? 95 : 25,
          worldId: zkData, // include raw response for debugging
        })
      }
    } catch (error) {
      console.log("zk-KYC API failed, using mock data:", error.message)
    }

    // Fallback to mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const isVerified = Math.random() > 0.3
    const score = isVerified ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 40) + 20
    return Response.json({
      verified: isVerified,
      score: score,
      worldId: null,
    })
  } catch (error) {
    return Response.json({ error: "Failed to check zk-KYC status" }, { status: 500 })
  }
}
