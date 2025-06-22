export async function POST(request) {
  try {
    const { wallet } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock onchain activity data
    const score = Math.floor(Math.random() * 40) + 60 // 60-100 range
    const transactions = Math.floor(Math.random() * 1000) + 100
    const poaps = Math.floor(Math.random() * 20) + 1

    return Response.json({
      score,
      transactions,
      poaps,
    })
  } catch (error) {
    return Response.json({ error: "Failed to compute onchain score" }, { status: 500 })
  }
}
