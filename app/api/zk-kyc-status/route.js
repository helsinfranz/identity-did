export async function POST(request) {
  try {
    const { didOrWallet } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock verification status with some randomness
    const isVerified = Math.random() > 0.3 // 70% chance of being verified
    const score = isVerified ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 40) + 20

    return Response.json({
      verified: isVerified,
      score: score,
    })
  } catch (error) {
    return Response.json({ error: "Failed to check zk-KYC status" }, { status: 500 })
  }
}
