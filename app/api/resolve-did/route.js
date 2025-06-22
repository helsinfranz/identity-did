export async function POST(request) {
  try {
    const { didOrWallet } = await request.json()

    // Try real ENS resolution first
    try {
      const ensResponse = await fetch(`https://api.ensideas.com/ens/resolve/${didOrWallet}`, {
        headers: {
          Authorization: "Bearer dummy_ens_api_key_12345",
          "Content-Type": "application/json",
        },
      })

      if (ensResponse.ok) {
        const ensData = await ensResponse.json()
        return Response.json({
          name: ensData.name || "unknown.eth",
          github: ensData.records?.github || null,
          twitter: ensData.records?.twitter || null,
        })
      }
    } catch (error) {
      console.log("ENS API failed, using mock data:", error.message)
    }

    // Fallback to mock data
    await new Promise((resolve) => setTimeout(resolve, 800))

    const mockData = {
      name: "himanshu.eth",
      github: "himanshuweb3",
      twitter: "@himanshuweb3",
    }

    if (didOrWallet.includes("0x1234")) {
      mockData.name = "alice.eth"
      mockData.github = "alice-dev"
      mockData.twitter = "@alice_crypto"
    } else if (didOrWallet.includes("0xabcd")) {
      mockData.name = "bob.eth"
      mockData.github = "bob-builder"
      mockData.twitter = "@bob_defi"
    }

    return Response.json(mockData)
  } catch (error) {
    return Response.json({ error: "Failed to resolve DID" }, { status: 500 })
  }
}
