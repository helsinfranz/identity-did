export async function POST(request) {
  try {
    const { didData, zkKycData, githubData, vcData, onchainData, wallet } = await request.json()

    // Simulate complex computation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Calculate weighted trust score
    const zkKycWeight = 0.25
    const githubWeight = 0.2
    const vcWeight = 0.3
    const onchainWeight = 0.25

    const githubScore = Math.min(githubData.contributions / 5 + githubData.repos * 2, 100)
    const vcScore = Math.min(vcData.length * 15, 100)

    const trustScore = Math.round(
      zkKycData.score * zkKycWeight +
        githubScore * githubWeight +
        vcScore * vcWeight +
        onchainData.score * onchainWeight,
    )

    // Determine sybil risk
    let sybilRisk = "Low"
    if (trustScore < 50) sybilRisk = "High"
    else if (trustScore < 75) sybilRisk = "Medium"

    // Generate fake IPFS hash
    const proofHash = "Qm" + btoa(wallet + Date.now()).slice(0, 44)

    return Response.json({
      trustScore,
      sybilRisk,
      proofHash,
    })
  } catch (error) {
    return Response.json({ error: "Failed to compute final score" }, { status: 500 })
  }
}
