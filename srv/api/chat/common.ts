/**
 * A single response can contain multiple end tokens
 *
 * Find the first occurrence of an end token then return the text preceding it
 */
export function trimResponse(generated: string, endTokens: string[]) {
  const trimmed = endTokens.reduce(
    (prev, curr) => {
      const index = generated.indexOf(curr)
      if (index === -1) return prev
      const text = generated.slice(0, index)
      if (prev.index === -1) return { index, response: text }
      return index < prev.index ? { index, response: text } : prev
    },
    { index: -1, response: '' }
  )

  if (trimmed.index === -1) return
  return trimmed
}

export function joinParts(parts: string[]) {
  return parts.map(sanitise).join(' ')
}

export function sanitise(generated: string) {
  return generated.replace(/\s+/g, ' ').trim()
}
