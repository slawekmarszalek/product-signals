"use client"

import { Fragment, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { renderEmojiShortcodes } from "@/lib/emoji-shortcodes"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { MobileReposList } from "@/components/mobile-repos-list"
import { ChevronDown } from "lucide-react"

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
  repo_full_name?: string | null
  delta_stars_pct_24h?: number | null
  is_new?: boolean | null
}

interface GithubReposTableProps {
  onDataLoaded?: (repos: GithubRepo[]) => void
  repos?: GithubRepo[]
  searchQuery?: string
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-"
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return "-"
  }
}

const formatCount = (n: number | null) => {
  if (n === null || n === undefined) return "-"
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
  return n.toString()
}

export function GithubReposTable({ onDataLoaded, repos: externalRepos, searchQuery }: GithubReposTableProps) {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  
  const displayRepos = externalRepos !== undefined ? externalRepos : repos
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Fetch repos and trend data in parallel
        const [reposResult, trendsResult] = await Promise.all([
          supabase
            .from("github_repos")
            .select("*")
            .order("stars", { ascending: false }),
          supabase
            .from("github_repo_trends_24h")
            .select("repo_full_name, delta_stars_pct_24h, is_new")
        ])

        if (reposResult.error) {
          setError(reposResult.error.message)
          return
        }

        if (trendsResult.error) {
          console.warn("[v0] Trend data unavailable:", trendsResult.error.message)
        }

        // Create trend lookup map by repo_full_name (normalized to lowercase)
        const trendMap = new Map()
        if (trendsResult.data) {
          trendsResult.data.forEach((trend: any) => {
            if (trend.repo_full_name) {
              trendMap.set(trend.repo_full_name.toLowerCase(), {
                delta_stars_pct_24h: trend.delta_stars_pct_24h,
                is_new: trend.is_new
              })
            }
          })
        }

        // Merge trend data into repos
        const repoData = (reposResult.data ?? []).map((repo: any) => {
          // Build the lookup key: prefer repo_full_name, fallback to company_name/repo_name
          const fullName = repo.repo_full_name || `${repo.company_name}/${repo.repo_name}`
          const lookupKey = fullName?.toLowerCase()
          const trend = trendMap.get(lookupKey)
          
          return {
            ...repo,
            repo_full_name: fullName,
            delta_stars_pct_24h: trend?.delta_stars_pct_24h ?? null,
            is_new: trend?.is_new ?? null
          }
        })

        // Sort by 24h growth (descending), putting repos with null values at the end
        const sortedData = repoData.sort((a, b) => {
          const aDelta = a.delta_stars_pct_24h ?? -Infinity
          const bDelta = b.delta_stars_pct_24h ?? -Infinity
          return bDelta - aDelta
        })

        setRepos(sortedData)
        onDataLoaded?.(sortedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="rounded-lg border border-muted bg-muted/30">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Stars</TableHead>
            <TableHead>Stars (24h)</TableHead>
            <TableHead>Forks</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Latest release</TableHead>
            <TableHead>Synced at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-4" /></TableCell>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-28" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Error loading repos: {error}
      </div>
    )
  }

  if (displayRepos.length === 0 && !loading) {
    return (
      <div className="rounded-lg border border-muted bg-muted/30 p-12 text-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-base font-medium text-foreground">No results found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  // Top 3 repos by delta_stars_pct_24h (excluding new repos), same logic as mobile
  const topTrendIds = displayRepos
    .filter(r => !r.is_new && r.delta_stars_pct_24h !== null && r.delta_stars_pct_24h !== undefined)
    .sort((a, b) => (b.delta_stars_pct_24h ?? 0) - (a.delta_stars_pct_24h ?? 0))
    .slice(0, 3)
    .map(r => r.id)

  return (
    <div className="rounded-lg border border-muted bg-muted/30">
      {/* Mobile list */}
      <div className="md:hidden">
        <MobileReposList
          repos={displayRepos}
          expandedId={expandedId}
          onToggleExpand={toggleExpand}
          formatCount={formatCount}
          formatDate={formatDate}
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Stars</TableHead>
            <TableHead>Stars (24h)</TableHead>
            <TableHead>Forks</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Latest release</TableHead>
            <TableHead>Synced at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayRepos.map((repo) => (
            <Fragment key={repo.id}>
              <TableRow className="hover:bg-muted/30 transition-colors">
                <TableCell className="w-8 p-2">
                  <button
                    onClick={() => toggleExpand(repo.id)}
                    className="inline-flex items-center justify-center rounded hover:bg-muted transition-colors"
                    aria-label="Toggle row details"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${expandedId === repo.id ? "rotate-180" : ""}`}
                    />
                  </button>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-1.5">
                    {topTrendIds.includes(repo.id) && (
                      <span className="text-sm">🚀</span>
                    )}
                    {repo.company_name ?? "-"}
                  </div>
                </TableCell>
              <TableCell>{formatCount(repo.stars)}</TableCell>
              <TableCell className="text-sm">
                {repo.is_new ? (
                  <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                    NEW
                  </span>
                ) : repo.delta_stars_pct_24h !== null && repo.delta_stars_pct_24h !== undefined ? (
                  <span className="text-muted-foreground">
                    {repo.delta_stars_pct_24h === 0 ? "0%" : `${repo.delta_stars_pct_24h >= 0 ? "+" : ""}${repo.delta_stars_pct_24h.toFixed(2)}%`}
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>{formatCount(repo.forks)}</TableCell>
              <TableCell>{repo.language ?? "-"}</TableCell>
              <TableCell>{repo.latest_release_name ?? "-"}</TableCell>
              <TableCell>{formatDate(repo.synced_at)}</TableCell>
            </TableRow>
            {expandedId === repo.id && (
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableCell colSpan={8} className="p-4">
                  <ExpandedRowContent repo={repo} />
                </TableCell>
              </TableRow>
            )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}

function ExpandedRowContent({ repo }: { repo: GithubRepo }) {
  return (
    <div className="flex flex-col gap-6 py-2 w-full">
      {repo.description && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Description</p>
          <p className="text-sm text-muted-foreground leading-6 whitespace-normal break-words">{renderEmojiShortcodes(repo.description)}</p>
        </div>
      )}
      {repo.repo_url && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Repository</p>
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
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">Categories</p>
          <div className="flex flex-wrap gap-2">
            {repo.topics.slice(0, 6).map((topic) => (
              <span
                key={topic}
                className="inline-block rounded-full bg-muted px-3 py-1 text-xs text-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
