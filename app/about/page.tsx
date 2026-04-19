"use client"

import { useState } from "react"
import { Lightbulb, Target, Users, Workflow, TrendingUp, User, Github } from "lucide-react"

export default function About() {
  const [showAllShipped, setShowAllShipped] = useState(false)
  const [showAllComing, setShowAllComing] = useState(false)
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
              
              {/* Shipped section */}
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-foreground text-sm">Shipped</h3>
                <div className="grid gap-2.5 md:gap-3 md:grid-cols-2">
                  {/* Always visible cards (4 items = 2 rows on desktop, 2 items on mobile) */}
                  {/* Card 1 - 24h star growth tracking - with GitHub icon */}
                  <a
                    href="https://github.com/slawekmarszalek/product-signals/pull/5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col gap-3 cursor-pointer relative"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">24h star growth tracking</h4>
                      <p className="text-xs text-muted-foreground mt-1">Real-time GitHub star velocity signals</p>
                    </div>
                    <div className="flex justify-end">
                      <Github size={14} className="text-muted-foreground group-hover:text-primary transition-colors" title="View PR" />
                    </div>
                  </a>

                  {/* Card 2 - Trending signal - with GitHub icon */}
                  <a
                    href="https://github.com/slawekmarszalek/product-signals/pull/5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col gap-3 cursor-pointer relative"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">Trending signal</h4>
                      <p className="text-xs text-muted-foreground mt-1">Highlight top 3 fastest-growing tools</p>
                    </div>
                    <div className="flex justify-end">
                      <Github size={14} className="text-muted-foreground group-hover:text-primary transition-colors" title="View PR" />
                    </div>
                  </a>

                  {/* Card 3 - Sorting controls - no GitHub icon */}
                  <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">Sorting controls</h4>
                      <p className="text-xs text-muted-foreground mt-1">Sort by stars and 24h growth with intuitive controls</p>
                    </div>
                  </div>

                  {/* Card 4 - Flexible filtering & search - no GitHub icon */}
                  <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">Flexible filtering & search</h4>
                      <p className="text-xs text-muted-foreground mt-1">Filter repositories by multiple attributes</p>
                    </div>
                  </div>

                  {/* Preview row - full 2 columns on desktop, visible only when collapsed */}
                  {!showAllShipped && (
                    <>
                      <button
                        onClick={() => setShowAllShipped(true)}
                        className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3 opacity-45 hover:opacity-60 transition-opacity cursor-pointer relative text-left"
                        style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                      >
                        <div className="flex-1" style={{ transform: 'translateY(-8px)' }}>
                          <h4 className="font-medium text-sm text-foreground">Mobile responsiveness improvements</h4>
                          <p className="text-xs text-muted-foreground mt-1">Better layout and readability on all screens</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setShowAllShipped(true)}
                        className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3 opacity-45 hover:opacity-60 transition-opacity cursor-pointer relative text-left"
                        style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                      >
                        <div className="flex-1" style={{ transform: 'translateY(-8px)' }}>
                          <h4 className="font-medium text-sm text-foreground">Description rendering improvements</h4>
                          <p className="text-xs text-muted-foreground mt-1">Emoji support and proper text wrapping</p>
                        </div>
                      </button>
                    </>
                  )}

                  {/* Expanded cards - visible when showAllShipped is true */}
                  {showAllShipped && (
                    <>
                      {/* Card 5 - Mobile responsiveness improvements */}
                      <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">Mobile responsiveness improvements</h4>
                          <p className="text-xs text-muted-foreground mt-1">Better layout and readability on all screens</p>
                        </div>
                      </div>

                      {/* Card 6 - Description rendering improvements */}
                      <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">Description rendering improvements</h4>
                          <p className="text-xs text-muted-foreground mt-1">Emoji support and proper text wrapping</p>
                        </div>
                      </div>

                      {/* Card 7 - GitHub link in footer */}
                      <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">GitHub link in footer</h4>
                          <p className="text-xs text-muted-foreground mt-1">Direct link to repository for transparency</p>
                        </div>
                      </div>

                      {/* Card 8 - Product progress & roadmap */}
                      <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">Product progress & roadmap</h4>
                          <p className="text-xs text-muted-foreground mt-1">Introduced a structured view of shipped features</p>
                        </div>
                      </div>

                      {/* View less button - only when expanded, full width */}
                      <div className="md:col-span-2 pt-2">
                        <button
                          onClick={() => setShowAllShipped(false)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
                        >
                          View less ←
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Coming next section */}
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-foreground text-sm">Coming next</h3>
                <div className="grid gap-2.5 md:gap-3 md:grid-cols-2">
                  {/* Always visible cards */}
                  {/* Card 1 - Sorting by 24h growth */}
                  <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">Sorting by 24h growth</h4>
                      <p className="text-xs text-muted-foreground mt-1">Surface emerging tools easily</p>
                    </div>
                  </div>

                  {/* Card 2 - Longer-term trends */}
                  <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">Longer-term trends</h4>
                      <p className="text-xs text-muted-foreground mt-1">7-day and 30-day comparisons</p>
                    </div>
                  </div>

                  {/* Card 3 - Advanced filtering */}
                  <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">Advanced filtering</h4>
                      <p className="text-xs text-muted-foreground mt-1">Filter by category, language, growth</p>
                    </div>
                  </div>

                  {/* Preview row - visible only when collapsed, single item on desktop */}
                  {!showAllComing && (
                    <button
                      onClick={() => setShowAllComing(true)}
                      className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3 opacity-45 hover:opacity-60 transition-opacity cursor-pointer relative text-left"
                      style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                    >
                      <div className="flex-1" style={{ transform: 'translateY(-8px)' }}>
                        <h4 className="font-medium text-sm text-foreground">Dark mode support</h4>
                        <p className="text-xs text-muted-foreground mt-1">Better experience for low-light environments</p>
                      </div>
                    </button>
                  )}

                  {/* Expanded cards - visible when showAllComing is true */}
                  {showAllComing && (
                    <>
                      <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">Dark mode support</h4>
                          <p className="text-xs text-muted-foreground mt-1">Better experience for low-light environments</p>
                        </div>
                      </div>

                      {/* View less button - only when expanded, full width */}
                      <div className="md:col-span-2 pt-2">
                        <button
                          onClick={() => setShowAllComing(false)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
                        >
                          View less ←
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
