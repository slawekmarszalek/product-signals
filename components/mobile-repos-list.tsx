"use client"

import { ChevronDown } from "lucide-react"
import { renderEmojiShortcodes } from "@/lib/emoji-shortcodes"
import { getTrendSignal } from "@/lib/trend-utils"

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
  description: string | null
  topics: string[] | null
  category: string | null
  repo_full_name?: string | null
  delta_stars_pct_24h?: number | null
  is_new?: boolean | null
}

interface MobileReposListProps {
  repos: GithubRepo[]
  expandedId: number | null
  onToggleExpand: (id: number) => void
  formatCount: (n: number | null) => string
  formatDate: (d: string | null) => string
  globalTopTrendingIds?: number[]
}

export function MobileReposList({
  repos,
  expandedId,
  onToggleExpand,
  formatCount,
  globalTopTrendingIds,
}: MobileReposListProps) {
  // Use the passed global top 3 IDs (from full dataset)
  // If not provided, calculate from current repos (fallback)
  const topTrendingIds = globalTopTrendingIds || repos
    .filter(r => !r.is_new && r.delta_stars_pct_24h !== null && r.delta_stars_pct_24h !== undefined && r.delta_stars_pct_24h > 0)
    .sort((a, b) => (b.delta_stars_pct_24h ?? 0) - (a.delta_stars_pct_24h ?? 0))
    .slice(0, 3)
    .map(r => r.id)

  return (
    <div className="flex flex-col divide-y divide-border/40">
      {repos.map((repo, index) => (
        <div
          key={repo.id}
          className={`flex flex-col ${index % 2 === 1 ? "bg-muted/15" : ""}`}
        >
          {/* Summary row */}
          <button
            onClick={() => onToggleExpand(repo.id)}
            className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted/50 transition-colors"
          >
            <ChevronDown
              size={16}
              className={`flex-shrink-0 transition-transform ${expandedId === repo.id ? "rotate-180" : ""}`}
            />
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {topTrendingIds.includes(repo.id) && (
                <span className="text-sm flex-shrink-0">🚀</span>
              )}
              <span className="font-medium text-sm truncate">
                {repo.company_name ?? "-"}
              </span>
              {repo.category && (
                <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground flex-shrink-0">
                  {repo.category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-normal text-muted-foreground tabular-nums">
                {formatCount(repo.stars)}
              </span>
              <span className={`text-xs font-normal w-14 text-right tabular-nums ${
                repo.is_new ? "text-foreground" :
                repo.delta_stars_pct_24h !== null && repo.delta_stars_pct_24h !== undefined && repo.delta_stars_pct_24h > 0
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}>
                {repo.is_new ? (
                  <span className="inline-block rounded-full bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                    NEW
                  </span>
                ) : repo.delta_stars_pct_24h !== null && repo.delta_stars_pct_24h !== undefined ? (
                  repo.delta_stars_pct_24h === 0 ? "0%" : `${repo.delta_stars_pct_24h >= 0 ? "+" : ""}${repo.delta_stars_pct_24h.toFixed(2)}%`
                ) : (
                  "—"
                )}
              </span>
            </div>
          </button>

          {/* Expanded details */}
          {expandedId === repo.id && (
            <div className="px-4 py-4 bg-muted/30">
              <div className="flex flex-col gap-5">
                {repo.description && (
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium text-foreground">Description</p>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal break-words">
                      {renderEmojiShortcodes(repo.description)}
                    </p>
                  </div>
                )}

                {repo.repo_url && (
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium text-foreground">Repository</p>
                    <a
                      href={repo.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {repo.repo_url}
                    </a>
                  </div>
                )}

                {repo.language && (
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium text-foreground">Language</p>
                    <p className="text-sm text-muted-foreground">{repo.language}</p>
                  </div>
                )}

                {repo.category && (
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium text-foreground">Category</p>
                    <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground w-fit">
                      {repo.category}
                    </span>
                  </div>
                )}

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium text-foreground">Topics</p>
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 6).map((topic) => (
                        <span
                          key={topic}
                          className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
