"use client"

import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onClearFilters?: () => void
  hasFilters?: boolean
}

export function EmptyState({ onClearFilters, hasFilters = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 md:py-16">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-lg font-semibold text-foreground">No matching tools</h2>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
      
      {hasFilters && onClearFilters && (
        <Button
          onClick={onClearFilters}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          Clear filters
        </Button>
      )}
    </div>
  )
}
