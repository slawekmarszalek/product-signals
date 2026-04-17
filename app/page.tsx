"use client"

import { useState, useMemo } from "react"
import { GithubReposTable } from "@/components/github-repos-table"
import { RepoInsights } from "@/components/repo-insights"
import { SearchFilterBar } from "@/components/search-filter-bar"
import { RepoFilters, type RepoFilter } from "@/components/repo-filters"

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
}

export default function Home() {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<RepoFilter[]>([])
  const [filtersVisible, setFiltersVisible] = useState(false)

  const filteredRepos = useMemo(() => {
    let results = repos

    // Apply search filter (company_name, language, topics only)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (repo) =>
          (repo.company_name?.toLowerCase().includes(query)) ||
          (repo.language?.toLowerCase().includes(query)) ||
          (repo.topics?.some((topic) => topic.toLowerCase().includes(query)))
      )
    }

    // Apply dynamic filters (AND logic)
    if (filters.length > 0) {
      // Filter out empty filters first
      const activeFilters = filters.filter((f) => f.value.trim() !== "")

      if (activeFilters.length > 0) {
        results = results.filter((repo) => {
          return activeFilters.every((filter) => {
            const fieldValue = repo[filter.field as keyof GithubRepo]

            if (filter.field === "stars") {
              const stars = fieldValue as number | null
              const filterValue = parseInt(filter.value, 10)
              if (isNaN(filterValue)) return false

              switch (filter.operator) {
                case ">":
                  return stars !== null && stars > filterValue
                case "<":
                  return stars !== null && stars < filterValue
                case "=":
                  return stars !== null && stars === filterValue
                default:
                  return false
              }
            }

            if (filter.field === "topics") {
              const topics = fieldValue as string[] | null
              if (!topics || topics.length === 0) return false
              return topics.some((topic) =>
                topic.toLowerCase().includes(filter.value.trim().toLowerCase())
              )
            }

            // Text fields (company_name, repo_name, language)
            const textValue = fieldValue as string | null
            if (!textValue) return false
            const searchValue = filter.value.trim().toLowerCase()

            if (filter.operator === "contains") {
              return textValue.toLowerCase().includes(searchValue)
            } else if (filter.operator === "equals") {
              return textValue.toLowerCase() === searchValue
            }

            return false
          })
        })
      }
    }

    return results
  }, [repos, searchQuery, filters])

  return (
    <div className="font-sans">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Tracking OSS developer tools
            </h1>
            <p className="text-sm text-muted-foreground">
              A lightweight intelligence dashboard for tracking selected open-source and OSS-first developer tools and their growth through public GitHub signals.
            </p>
          </div>

          {repos.length > 0 && <RepoInsights repos={repos} />}

          <SearchFilterBar
            onSearch={setSearchQuery}
            onFiltersChange={setFilters}
            filtersVisible={filtersVisible}
            onFiltersToggle={setFiltersVisible}
          />

          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-3">
              <p className="text-xs text-muted-foreground">
                Open-source developer tools ({repos.length} tracked)
              </p>
              <p className="text-xs text-muted-foreground/60">
                &#x1F680; Top 3 by 24h star growth
              </p>
            </div>
            <div className="rounded-lg border border-muted bg-muted/30">
              <GithubReposTable onDataLoaded={setRepos} repos={filteredRepos} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
