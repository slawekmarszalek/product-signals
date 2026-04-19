"use client"

import { useState, useEffect } from "react"
import { Lightbulb, Target, Users, Workflow, TrendingUp, Github, Linkedin } from "lucide-react"
import Image from "next/image"

interface RoadmapItem {
  id: string
  title: string
  description: string
  link?: string
}

interface RoadmapSectionProps {
  title: string
  items: RoadmapItem[]
}

function RoadmapSection({ title, items }: RoadmapSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  
  // Detect desktop vs mobile on mount and window resize
  useEffect(() => {
    const updateLayout = () => {
      setIsDesktop(window.innerWidth >= 768) // md breakpoint
    }
    
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])
  
  // Grid configuration - responsive
  const DESKTOP_COLUMNS = 2
  const MOBILE_COLUMNS = 1
  const VISIBLE_ROWS = 2
  
  // Calculate visible count based on layout
  const columns = isDesktop ? DESKTOP_COLUMNS : MOBILE_COLUMNS
  const VISIBLE_COUNT = columns * VISIBLE_ROWS // 4 on desktop, 2 on mobile
  
  // Calculate what to show
  const hasMoreItems = items.length > VISIBLE_COUNT
  const visibleItems = items.slice(0, VISIBLE_COUNT)
  const previewStartIndex = VISIBLE_COUNT
  const previewEndIndex = previewStartIndex + columns // Show 2 preview items on desktop, 1 on mobile
  const previewItems = items.slice(previewStartIndex, previewEndIndex)
  const allExpandedItems = items.slice(VISIBLE_COUNT)
  
  const renderCard = (item: RoadmapItem, isFaded = false) => {
    const cardClasses = isFaded
      ? "rounded-lg border border-border bg-card p-4 flex flex-col gap-3 opacity-45 hover:opacity-60 transition-opacity cursor-pointer relative text-left"
      : "rounded-lg border border-border bg-card p-4 flex flex-col gap-3"
    
    const cardStyle = isFaded
      ? { maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }
      : {}
    
    const content = (
      <div className="flex-1" style={isFaded ? { transform: 'translateY(-8px)' } : {}}>
        <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
      </div>
    )
    
    if (item.link && !isFaded) {
      return (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col gap-3 cursor-pointer relative"
        >
          <div className="flex-1">
            <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </div>
          <div className="flex justify-end">
            <Github size={14} className="text-muted-foreground group-hover:text-primary transition-colors" title="View PR" />
          </div>
        </a>
      )
    }
    
    if (isFaded) {
      return (
        <button
          key={item.id}
          onClick={() => setIsExpanded(true)}
          className={cardClasses}
          style={cardStyle}
        >
          {content}
        </button>
      )
    }
    
    return (
      <div key={item.id} className={cardClasses} style={cardStyle}>
        {content}
      </div>
    )
  }
  
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-foreground text-sm">{title}</h3>
      <div className="grid gap-2.5 md:gap-3 md:grid-cols-2">
        {/* Always visible items */}
        {visibleItems.map((item) => renderCard(item))}
        
        {/* Preview row - only if there are more items AND not expanded */}
        {hasMoreItems && !isExpanded && previewItems.map((item) => renderCard(item, true))}
        
        {/* All expanded items - only when expanded */}
        {isExpanded && allExpandedItems.map((item) => renderCard(item))}
        
        {/* View less button - only when expanded */}
        {isExpanded && (
          <div className="md:col-span-2 pt-2">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              View less ←
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function About() {
  const shippedItems: RoadmapItem[] = [
    {
      id: "24h-tracking",
      title: "24h star growth tracking",
      description: "Real-time GitHub star velocity signals",
      link: "https://github.com/slawekmarszalek/product-signals/pull/5",
    },
    {
      id: "trending-signal",
      title: "Trending signal",
      description: "Highlight top 3 fastest-growing tools",
      link: "https://github.com/slawekmarszalek/product-signals/pull/5",
    },
    {
      id: "sorting-controls",
      title: "Sorting controls",
      description: "Sort by stars and 24h growth with intuitive controls",
    },
    {
      id: "filtering-search",
      title: "Flexible filtering & search",
      description: "Filter repositories by multiple attributes",
    },
    {
      id: "mobile-improvements",
      title: "Mobile responsiveness improvements",
      description: "Better layout and readability on all screens",
    },
    {
      id: "description-rendering",
      title: "Description rendering improvements",
      description: "Emoji support and proper text wrapping",
    },
    {
      id: "github-link",
      title: "GitHub link in footer",
      description: "Direct link to repository for transparency",
    },
    {
      id: "product-progress",
      title: "Product progress & roadmap",
      description: "Introduced a structured view of shipped features",
    },
  ]

  const comingItems: RoadmapItem[] = [
    {
      id: "sorting-24h",
      title: "Sorting by 24h growth",
      description: "Surface emerging tools easily",
    },
    {
      id: "longer-trends",
      title: "Longer-term trends",
      description: "7-day and 30-day comparisons",
    },
    {
      id: "advanced-filtering",
      title: "Advanced filtering",
      description: "Filter by category, language, growth",
    },
    {
      id: "dark-mode",
      title: "Dark mode support",
      description: "Better experience for low-light environments",
    },
  ]

  return (
    <div className="font-sans">
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">About Product Signals</h1>
            <p className="text-sm text-muted-foreground">Built by Sławomir Marszałek</p>
            <p className="text-base text-muted-foreground">A lightweight intelligence dashboard for tracking selected open-source and OSS-first developer tools through public GitHub signals.</p>
          </div>

          {/* Grid sections */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Row 1 */}
            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">What it is</h2>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-6">
                  Product Signals tracks a curated set of OSS-first developer tools and surfaces simple, directional insights about their growth.
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  Instead of browsing repositories manually, it aggregates key signals like GitHub stars, forks, releases, and short-term trends.
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  The goal is not full analysis, but quick, useful signals that help you understand what&apos;s gaining traction.
                </p>
              </div>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">Why I built this</h2>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-6">
                  I work on API-first SaaS products and spend a lot of time evaluating tools, integrations, and ecosystems.
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  Most signals already exist on GitHub, but they&apos;re scattered and hard to compare. I built Product Signals to centralize them and make it easier to spot trends without manual digging.
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  This is also an experiment in turning public data into simple product insights.
                </p>
              </div>
            </section>

            {/* Row 2 */}
            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">Who it helps</h2>
              </div>
              <ul className="text-sm text-muted-foreground leading-7 space-y-2">
                <li><strong className="text-foreground">Product managers</strong> — track competitive tools and emerging alternatives</li>
                <li><strong className="text-foreground">Founders</strong> — monitor market trends in your category</li>
                <li><strong className="text-foreground">Developers</strong> — discover and compare open-source tools</li>
                <li><strong className="text-foreground">Analysts</strong> — gather directional data for research and reports</li>
              </ul>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Workflow size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">How it works</h2>
              </div>
              <div className="text-sm text-muted-foreground leading-6 space-y-2">
                <p className="font-medium text-foreground">The data flows through a simple pipeline:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>GitHub API provides repository data</li>
                  <li>n8n collects and processes updates</li>
                  <li>Supabase stores historical snapshots</li>
                  <li>The frontend surfaces signals with filtering and trends</li>
                  <li>Vercel handles deployment</li>
                </ol>
              </div>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-6 md:col-span-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">Product progress</h2>
              </div>
              
              <RoadmapSection title="Shipped" items={shippedItems} />
              <RoadmapSection title="Coming next" items={comingItems} />
            </section>

            {/* About the builder section */}
            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-6 md:col-span-2">
              <h2 className="text-lg font-semibold">About the builder</h2>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Profile image */}
                <div className="shrink-0">
                  <Image
                    src="/builder-profile.jpg"
                    alt="Sławomir Marszałek"
                    width={180}
                    height={180}
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Sławomir Marszałek</h3>
                    <p className="text-sm text-muted-foreground leading-6 mt-2">
                      Product Manager working on API-first SaaS platforms, focused on integrations, developer workflows, and making complex systems easier to adopt.
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-6">
                    I&apos;m interested in how product signals can help teams make better decisions faster — from evaluating tools to understanding emerging trends.
                  </p>
                  
                  <p className="text-sm text-muted-foreground leading-6">
                    This project is an experiment in turning publicly available data into simple, useful product insights.
                  </p>
                  
                  <div>
                    <a
                      href="https://linkedin.com/in/slawekmarszalek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin size={16} />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
