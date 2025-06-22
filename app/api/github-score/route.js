export async function POST(request) {
  try {
    const { githubHandle } = await request.json()

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 900))

    // Mock GitHub data
    const contributions = Math.floor(Math.random() * 500) + 50
    const repos = Math.floor(Math.random() * 30) + 5

    return Response.json({
      contributions,
      repos,
    })
  } catch (error) {
    return Response.json({ error: "Failed to fetch GitHub score" }, { status: 500 })
  }
}
