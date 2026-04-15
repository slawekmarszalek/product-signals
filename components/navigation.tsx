"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isAbout = pathname === "/about"

  return (
    <nav className="sticky top-0 z-50 bg-white" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      <div className="h-15 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6 flex items-center justify-between h-full">
          {/* Brand */}
          <Link 
            href="/" 
            className="font-semibold text-lg text-foreground hover:text-foreground transition-colors"
          >
            Product Signals
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-normal transition-colors border-b-2 py-3 ${
                isHome 
                  ? "text-foreground border-foreground" 
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-normal transition-colors border-b-2 py-3 ${
                isAbout 
                  ? "text-foreground border-foreground" 
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
