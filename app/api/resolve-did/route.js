export async function POST(request) {
  try {
    const { didOrWallet } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock response based on input
    const mockData = {
      name: "himanshu.eth",
      github: "himanshuweb3",
      twitter: "@himanshuweb3",
    }

    // Vary response based on input for realism
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
