/**
 * Format trend percentage for display
 * @param percentage - The percentage change (can be negative)
 * @returns Formatted string like "+0.42%" or "-1.5%"
 */
export const formatTrendPercentage = (percentage: number | null): string => {
  if (percentage === null || percentage === undefined) return "—"
  return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`
}

/**
 * Get trend signal for display
 * Priority: is_new > delta percentage > dash
 */
export const getTrendSignal = (
  isNew: boolean | null,
  deltaPercentage: number | null
): string => {
  if (isNew) return "NEW"
  if (deltaPercentage !== null && deltaPercentage !== undefined) {
    return formatTrendPercentage(deltaPercentage)
  }
  return "—"
}
