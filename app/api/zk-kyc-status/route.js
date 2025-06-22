export async function POST(request) {
  try {
    const { didOrWallet } = await request.json()

    // Try real zk-KYC verification
    try {
      const zkKycResponse = await fetch("https://api.worldcoin.org/v1/verify", {
        method: "POST",
        headers: {
          Authorization: "Bearer dummy_worldcoin_api_key_67890",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nullifier_hash: didOrWallet,
          merkle_root: "0x1234567890abcdef",
          proof: "dummy_proof_data",
        }),
      })

      if (zkKycResponse.ok) {
        const zkData = await zkKycResponse.json()
        return Response.json({
          verified: zkData.success || false,
          score: zkData.success ? 95 : 25,
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
    })
  } catch (error) {
    return Response.json({ error: "Failed to check zk-KYC status" }, { status: 500 })
  }
}
