import { Lightbulb, Target, Users, Workflow, Layers, TrendingUp, User } from "lucide-react"

export default function About() {
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
              <p className="text-sm text-muted-foreground leading-6">
                Product Signals is a lightweight intelligence dashboard for tracking selected open-source and OSS-first developer tools through public GitHub signals. It aggregates data on popularity, recent activity, and release cycles to give you a quick directional view of how these products are evolving.
              </p>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">Why I built this</h2>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-6">
                  As a product manager working on API-first SaaS platforms, I wanted a simple way to monitor emerging developer tools without manually checking each repository.
                </p>
                <p className="text-sm text-muted-foreground leading-6">
                  Public signals exist on GitHub, but they are scattered and hard to compare. I built this to centralize those signals in one place and make it easier to spot trends and evaluate tools quickly.
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
                  <li>n8n automation collects and processes</li>
                  <li>Supabase stores and serves data</li>
                  <li>Frontend surfaces with search/filtering</li>
                  <li>Vercel handles deployment</li>
                </ol>
              </div>
            </section>

            {/* Row 3 */}
            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">Current scope</h2>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground leading-6">
                  This MVP focuses on a curated set of OSS-oriented modern developer tools and tracks a small set of signals:
                </p>
                <ul className="text-sm text-muted-foreground leading-7 list-disc list-inside space-y-1">
                  <li>GitHub stars and forks</li>
                  <li>Latest release information</li>
                  <li>Programming language</li>
                  <li>Repository categories</li>
                  <li>Sync timing</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-6">
                  The goal is directional insights, not exhaustive data.
                </p>
              </div>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">Recent updates</h2>
              </div>
              <ul className="text-sm text-muted-foreground leading-7 list-disc list-inside space-y-1">
                <li>Introduced 24h trend tracking based on GitHub star growth</li>
                <li>Added trending signal (🚀) to highlight top 3 fastest-growing tools</li>
                <li>Improved mobile responsiveness and list readability</li>
                <li>Refined repository descriptions with emoji support + text wrapping</li>
                <li>Added project visibility via GitHub link in footer</li>
              </ul>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-muted-foreground shrink-0" />
                <h2 className="text-lg font-semibold">Next steps</h2>
              </div>
              <ul className="text-sm text-muted-foreground leading-7 list-disc list-inside space-y-1">
                <li>Expand tracked tools set (curated + signal-driven additions)</li>
                <li>Add sorting by trend (24h growth) to surface emerging tools</li>
                <li>Introduce longer-term trends (7d / 30d comparisons)</li>
                <li>Improve filtering (by category, language, growth)</li>
                <li>Enrich tool context (descriptions, positioning, use cases)</li>
              </ul>
            </section>
          </div>

          {/* About the builder - full width section */}
          <section className="rounded-xl border bg-muted/30 p-6 flex flex-col gap-6 border-t-2">
            <div className="flex items-center gap-2">
              <User size={18} className="text-muted-foreground shrink-0" />
              <h2 className="text-lg font-semibold">About the builder</h2>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-start">
              <div className="shrink-0">
                <img
                  src="/profile.jpg"
                  alt="Sławomir Marszałek"
                  className="h-28 w-28 rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold text-foreground text-base">Sławomir Marszałek</h3>
                  <p className="text-sm text-muted-foreground leading-6">
                    Product Manager working on API-first SaaS platforms, focused on integrations, developer workflows, and making complex systems easier to adopt.
                  </p>
                  <p className="text-sm text-muted-foreground leading-6">
                    I&apos;m interested in how product signals can help teams make better decisions faster — from evaluating tools to understanding emerging trends.
                  </p>
                  <p className="text-sm text-muted-foreground leading-6">
                    This project is an experiment in turning publicly available data into simple, useful product insights.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/slawomir-marszalek/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
