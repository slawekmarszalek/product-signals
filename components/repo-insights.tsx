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
  delta_stars_pct_24h?: number | null
  is_new?: boolean | null
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

  // Find top trending repo (highest 24h growth, excluding new repos)
  const topTrendingRepo = repos
    .filter(r => !r.is_new && r.delta_stars_pct_24h !== null && r.delta_stars_pct_24h !== undefined)
    .sort((a, b) => (b.delta_stars_pct_24h ?? 0) - (a.delta_stars_pct_24h ?? 0))[0]

  // Find top repo by stars (independent of table sorting)
  const topStarRepo = repos
    .filter(r => r.stars !== null && r.stars !== undefined)
    .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))[0]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-md border p-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-muted-foreground">Top trending (24h)</p>
          <span className="text-sm">🚀</span>
        </div>
        <div className="mt-3 flex flex-col gap-1">
          <p className="font-semibold">{topTrendingRepo?.company_name ?? "—"}</p>
          <p className="text-xs text-muted-foreground">
            {topTrendingRepo?.delta_stars_pct_24h !== null && topTrendingRepo?.delta_stars_pct_24h !== undefined
              ? `+${topTrendingRepo.delta_stars_pct_24h.toFixed(2)}% · #1 by 24h growth`
              : "No trend data"}
          </p>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <p className="text-xs font-medium text-muted-foreground">Top by stars</p>
        <div className="mt-3 flex flex-col gap-1">
          <p className="font-semibold">{topStarRepo?.company_name ?? "—"}</p>
          <p className="text-xs text-muted-foreground">{formatCount(topStarRepo?.stars)} stars · #1 by popularity</p>
        </div>
      </div>
    </div>
  )
}
