import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          &copy; 2026 Product Signals • Data sourced from public GitHub repositories
        </p>
        <a
          href="https://github.com/slawekmarszalek/product-signals"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground opacity-70 hover:opacity-100 hover:underline transition-opacity"
        >
          <Github className="h-3.5 w-3.5" />
          View on GitHub
        </a>
      </div>
    </footer>
  )
}
