// Mapping of GitHub-style emoji shortcodes to actual emojis
const EMOJI_SHORTCODES: Record<string, string> = {
  ':bar_chart:': '📊',
  ':rocket:': '🚀',
  ':zap:': '⚡',
  ':fire:': '🔥',
  ':gear:': '⚙️',
  ':wrench:': '🔧',
  ':link:': '🔗',
  ':mag:': '🔍',
  ':computer:': '💻',
  ':chart_with_upwards_trend:': '📈',
}

/**
 * Replaces GitHub-style emoji shortcodes with actual emojis
 * @param text - The text potentially containing shortcodes like :rocket:
 * @returns The text with shortcodes replaced by emojis, unknown shortcodes left unchanged
 */
export function renderEmojiShortcodes(text: string | null | undefined): string {
  if (!text) return ''
  
  let result = text
  Object.entries(EMOJI_SHORTCODES).forEach(([shortcode, emoji]) => {
    result = result.replace(new RegExp(shortcode, 'g'), emoji)
  })
  
  return result
}
