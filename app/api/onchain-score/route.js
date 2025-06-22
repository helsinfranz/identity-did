export async function POST(request) {
  try {
    const { wallet } = await request.json()

    // Try real blockchain API (Alchemy)
    try {
      const alchemyResponse = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getTransactionCount", // <-- fixed method name
          params: [wallet, "latest"],
        }),
      })

      if (alchemyResponse.ok) {
        const alchemyData = await alchemyResponse.json()
        const txCount = Number.parseInt(alchemyData.result, 16) || 0

        // Get POAP data - you need to get the real api which is only given when you register your app with them so using dummy.
        // const poapResponse = await fetch(`https://api.poap.tech/actions/scan/${wallet}`)

        let poaps = 5
        // if (poapResponse.ok) {
        //   const poapData = await poapResponse.json()
        //   console.log("POAP data:", poapData)
        //   poaps = poapData.length || 0
        // }

        // Calculate score based on real data
        const score = Math.min(Math.floor(txCount / 10) + poaps * 5, 100)

        return Response.json({
          score: Math.max(score, 60), // Minimum score of 60
          transactions: txCount,
          poaps: poaps,
        })
      }
    } catch (error) {
      console.log("Alchemy transaction count data:", error.message)
      console.log("Blockchain API failed, using mock data:", error.message)
    }

    // Fallback to mock data
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const score = Math.floor(Math.random() * 40) + 60
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
