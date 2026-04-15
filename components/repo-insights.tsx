"use client"

interface GithubRepo {
  id: number
  company_name: string | null
  repo_name: string | null
  repo_url: string | null
  stars: number | null
  forks: number | null
  language: string | null
  latest_release_name: string | null
  synced_at: string | null
}

interface RepoInsightsProps {
  repos: GithubRepo[]
}

export function RepoInsights({ repos }: RepoInsightsProps) {
  if (repos.length === 0) return null

  const formatCount = (n: number | null) => {
    if (n === null || n === undefined) return "-"
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
    return n.toString()
  }

  const topRepo = repos[0]
  const mostCommonLanguage = repos.reduce(
    (acc, repo) => {
      if (!repo.language) return acc
      acc[repo.language] = (acc[repo.language] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
  const topLanguage = Object.entries(mostCommonLanguage).sort(([, a], [, b]) => b - a)[0]?.[0] || "—"

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-md border p-4">
        <p className="text-xs font-medium text-muted-foreground">Top by stars</p>
        <div className="mt-3 flex flex-col gap-1">
          <p className="font-semibold">{topRepo.company_name ?? "—"}</p>
          <p className="text-xs text-muted-foreground">{formatCount(topRepo.stars)} stars · #1 by popularity</p>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <p className="text-xs font-medium text-muted-foreground">Most common language</p>
        <div className="mt-3 flex flex-col gap-1">
          <p className="font-semibold">{topLanguage}</p>
        </div>
      </div>
    </div>
  )
}
