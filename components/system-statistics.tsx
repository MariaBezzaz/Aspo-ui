"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

// Mock data for demonstration
const systemMetrics = [
  { name: "MHF", value: 0.65, description: "Method Hiding Factor" },
  { name: "AHF", value: 0.72, description: "Attribute Hiding Factor" },
  { name: "PF", value: 0.45, description: "Polymorphism Factor" },
  { name: "U", value: 0.58, description: "Reuse Factor" },
  { name: "S", value: 0.83, description: "Specialization Factor" },
]

// Mock complexity distribution data
const complexityDistribution = [
  { range: "1-5", count: 320, percentage: 40 },
  { range: "6-10", count: 240, percentage: 30 },
  { range: "11-20", count: 160, percentage: 20 },
  { range: "21+", count: 80, percentage: 10 },
]

export default function SystemStatistics({ view = "quality" }: { view?: "quality" | "complexity" | "visibility" }) {
  if (view === "quality") {
    return (
      <Card className="w-full border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Quality Metrics</CardTitle>
          <CardDescription>Object-oriented quality metrics for the entire codebase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-5">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center gap-1">
                  <div className="text-sm font-medium">{metric.name}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-muted-foreground">
                          <Info className="h-3 w-3" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="text-2xl font-bold text-primary">{metric.value.toFixed(2)}</div>
                <Progress value={metric.value * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (view === "complexity") {
    return (
      <Card className="w-full border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Complexity Distribution</CardTitle>
          <CardDescription>Distribution of methods by cyclomatic complexity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {complexityDistribution.map((item) => (
              <div key={item.range} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Complexity {item.range}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.count} methods ({item.percentage}%)
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${
                      item.range === "21+" ? "bg-red-500" : item.range === "11-20" ? "bg-amber-500" : "bg-primary"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-2 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Method Visibility</CardTitle>
        <CardDescription>Distribution of methods by visibility modifier</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Public</div>
              <div className="text-sm text-muted-foreground">450 (56%)</div>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: "56%" }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Protected</div>
              <div className="text-sm text-muted-foreground">120 (15%)</div>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: "15%" }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Private</div>
              <div className="text-sm text-muted-foreground">230 (29%)</div>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: "29%" }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
