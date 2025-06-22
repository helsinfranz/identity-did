export async function POST(request) {
  try {
    const { wallet } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Mock verifiable credentials
    const allCredentials = [
      { issuer: "Gitcoin", type: "Contributor" },
      { issuer: "Aave DAO", type: "Voter" },
      { issuer: "Uniswap", type: "Liquidity Provider" },
      { issuer: "Compound", type: "Governance Participant" },
      { issuer: "MakerDAO", type: "Vault Owner" },
      { issuer: "Ethereum Foundation", type: "Developer" },
      { issuer: "Polygon", type: "Validator" },
      { issuer: "Chainlink", type: "Node Operator" },
    ]

    // Return random subset of credentials
    const numCredentials = Math.floor(Math.random() * 4) + 2
    const shuffled = allCredentials.sort(() => 0.5 - Math.random())
    const selectedCredentials = shuffled.slice(0, numCredentials)

    return Response.json(selectedCredentials)
  } catch (error) {
    return Response.json({ error: "Failed to fetch verifiable credentials" }, { status: 500 })
  }
}
