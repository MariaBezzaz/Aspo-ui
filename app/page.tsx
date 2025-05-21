import Link from "next/link"
import { Github, BarChart3, GitGraph, FileCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import FileUpload from "@/components/file-upload"
import GithubUrlInput from "@/components/github-url-input"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 font-bold">
            <Link href="/" className="text-2xl gradient-text">
              Aspo
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link
              href="https://github.com/aspo-project/aspo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="gradient-text">Code Analysis</span> Made Simple
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl mx-auto">
                Analyze your Java projects with Aspo. Get insights into your code structure, metrics, and dependencies.
              </p>
            </div>

            <Card className="w-full max-w-[700px] border-2 shadow-lg">
              <CardContent className="p-6">
                <div className="grid gap-6">
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">Analyze your project</h2>
                    <div className="grid gap-6">
                      <GithubUrlInput />
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or upload a JSON file</span>
                        </div>
                      </div>
                      <FileUpload />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-secondary/50 dark:bg-secondary/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powerful Analysis Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Aspo provides comprehensive tools to analyze and visualize your Java codebase
              </p>
            </div>

            <div className="mx-auto grid max-w-[980px] gap-8 md:grid-cols-3">
              <Card className="bg-background/80 backdrop-blur border-2 transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Statistics</h3>
                  <p className="text-muted-foreground">
                    Comprehensive metrics and statistics about your codebase with distribution graphs and outlier
                    detection
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-2 transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <GitGraph className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Graph Visualization</h3>
                  <p className="text-muted-foreground">
                    Interactive visual representation of class relationships and dependencies in your project
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/80 backdrop-blur border-2 transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <FileCode className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Class Analysis</h3>
                  <p className="text-muted-foreground">
                    Detailed insights into individual classes, their metrics, and method dependencies
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="mx-auto max-w-[980px] grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Visualize Your Code Structure</h2>
              <p className="text-muted-foreground mb-6">
                Aspo provides intuitive visualizations that help you understand the structure and relationships in your
                codebase.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Interactive class relationship graphs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Method dependency visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Distribution graphs for all metrics</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-xl p-4 shadow-lg">
              <div className="aspect-video rounded-lg overflow-hidden bg-card">
                {/* Utilisation de code HTML/CSS pour créer un aperçu visuel du tableau de bord */}
                <div className="w-full h-full bg-gray-900 text-gray-200 p-6">
                  <div className="mb-6 font-bold text-lg">Dashboard Overview</div>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-violet-400 text-xl font-bold">67</div>
                      <div className="text-xs">Classes</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-violet-400 text-xl font-bold">23</div>
                      <div className="text-xs">Interfaces</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-violet-400 text-xl font-bold">812</div>
                      <div className="text-xs">Methods</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="text-violet-400 text-xl font-bold">5243</div>
                      <div className="text-xs">Lines</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium mb-1">Bug Risk Distribution</div>
                    <div className="flex items-center">
                      <div className="w-20 text-xs">High Risk</div>
                      <div className="flex-1 h-2.5 bg-gray-700 rounded overflow-hidden">
                        <div className="bg-red-500 h-full w-[18%]"></div>
                      </div>
                      <div className="ml-2 text-xs">18%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 text-xs">Medium Risk</div>
                      <div className="flex-1 h-2.5 bg-gray-700 rounded overflow-hidden">
                        <div className="bg-orange-500 h-full w-[37%]"></div>
                      </div>
                      <div className="ml-2 text-xs">37%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 text-xs">Low Risk</div>
                      <div className="flex-1 h-2.5 bg-gray-700 rounded overflow-hidden">
                        <div className="bg-green-500 h-full w-[45%]"></div>
                      </div>
                      <div className="ml-2 text-xs">45%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/40">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xs">
              <h3 className="text-xl font-bold gradient-text">Aspo</h3>
              <p className="text-sm text-muted-foreground">
                A powerful code analysis tool for Java projects that provides insights into your codebase structure and
                metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="https://github.com/aspo-project/aspo"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aspo Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
