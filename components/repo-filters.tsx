"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"

export interface RepoFilter {
  id: string
  field: "company_name" | "repo_name" | "language" | "topics" | "stars"
  operator: "contains" | "equals" | ">" | "<" | "="
  value: string
}

interface RepoFiltersProps {
  onFiltersChange: (filters: RepoFilter[]) => void
}

const FIELD_OPTIONS = [
  { label: "Company", value: "company_name" },
  { label: "Repo", value: "repo_name" },
  { label: "Language", value: "language" },
  { label: "Categories", value: "topics" },
  { label: "Stars", value: "stars" },
]

const OPERATOR_OPTIONS = {
  company_name: [
    { label: "contains", value: "contains" },
    { label: "equals", value: "equals" },
  ],
  repo_name: [
    { label: "contains", value: "contains" },
    { label: "equals", value: "equals" },
  ],
  language: [
    { label: "contains", value: "contains" },
    { label: "equals", value: "equals" },
  ],
  topics: [{ label: "contains", value: "contains" }],
  stars: [
    { label: ">", value: ">" },
    { label: "<", value: "<" },
    { label: "=", value: "=" },
  ],
}

export function RepoFilters({ onFiltersChange }: RepoFiltersProps) {
  const [filters, setFilters] = useState<RepoFilter[]>([])

  const addFilter = () => {
    const newFilter: RepoFilter = {
      id: Math.random().toString(36).substr(2, 9),
      field: "company_name",
      operator: "contains",
      value: "",
    }
    const updatedFilters = [...filters, newFilter]
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const removeFilter = (id: string) => {
    const updatedFilters = filters.filter((f) => f.id !== id)
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const updateFilter = (
    id: string,
    field: keyof Omit<RepoFilter, "id">,
    value: string | RepoFilter["field"]
  ) => {
    const updatedFilters = filters.map((f) =>
      f.id === id ? { ...f, [field]: value } : f
    )
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const getOperatorsForField = (
    field: string
  ): Array<{ label: string; value: string }> => {
    return (
      OPERATOR_OPTIONS[field as keyof typeof OPERATOR_OPTIONS] ||
      OPERATOR_OPTIONS.company_name
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        <Button
          onClick={addFilter}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          + Add filter
        </Button>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-col gap-3 rounded-md border p-4 bg-muted/30">
          {filters.map((filter) => (
            <div key={filter.id} className="flex flex-col md:flex-row md:items-end gap-2 md:gap-2">
              <Select value={filter.field} onValueChange={(value) => {
                const newField = value as RepoFilter["field"]
                const updatedFilters = filters.map((f) =>
                  f.id === filter.id
                    ? {
                        ...f,
                        field: newField,
                        operator: getOperatorsForField(newField)[0].value,
                      }
                    : f
                )
                setFilters(updatedFilters)
                onFiltersChange(updatedFilters)
              }}>
                <SelectTrigger className="w-full md:w-32 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filter.operator}
                onValueChange={(value) =>
                  updateFilter(filter.id, "operator", value)
                }
              >
                <SelectTrigger className="w-full md:w-28 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getOperatorsForField(filter.field).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Value"
                value={filter.value}
                onChange={(e) =>
                  updateFilter(filter.id, "value", e.target.value)
                }
                className="w-full md:flex-1 h-9 text-base md:text-xs"
              />

              <Button
                onClick={() => removeFilter(filter.id)}
                size="sm"
                variant="ghost"
                className="w-full md:w-auto h-9 px-2"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
