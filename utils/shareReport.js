export function shareReport(results, input) {
  const shareData = {
    title: "Identity Model Agent - Trust Report",
    text: `Trust Score: ${results.final.trustScore}/100 for ${input}`,
    url: `${window.location.origin}/evaluate?address=${encodeURIComponent(input)}&score=${results.final.trustScore}`,
  }

  if (navigator.share) {
    return navigator.share(shareData)
  } else {
    // Fallback to clipboard
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`
    return navigator.clipboard.writeText(shareText)
  }
}
