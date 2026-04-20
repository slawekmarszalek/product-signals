"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import { RepoFilters, type RepoFilter } from "@/components/repo-filters"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onFiltersChange: (filters: RepoFilter[]) => void
  filtersVisible: boolean
  onFiltersToggle: (visible: boolean) => void
  availableCategories?: string[]
  searchQuery?: string
}

export function SearchFilterBar({
  onSearch,
  onFiltersChange,
  filtersVisible,
  onFiltersToggle,
  availableCategories,
  searchQuery = "",
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFiltersToggle(!filtersVisible)}
          className="shrink-0"
        >
          <ChevronDown
            size={16}
            className={`mr-1 transition-transform ${
              filtersVisible ? "rotate-180" : ""
            }`}
          />
          Filter
        </Button>
        <Input
          placeholder="Search companies, languages, or categories..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="max-w-sm text-base md:text-sm placeholder:text-muted-foreground/50 placeholder:text-normal"
        />
      </div>

      {filtersVisible && <RepoFilters onFiltersChange={onFiltersChange} availableCategories={availableCategories} />}
    </div>
  )
}
