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

const bugDistribution = [
  { risk: "High Risk (>60%)", count: 12, percentage: 18 },
  { risk: "Medium Risk (30-60%)", count: 25, percentage: 37 },
  { risk: "Low Risk (<30%)", count: 30, percentage: 45 },
]

export default function SystemOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2 border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>System Quality Metrics</CardTitle>
          <CardDescription>High-level metrics for the entire codebase</CardDescription>
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

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Bug Risk Distribution</CardTitle>
          <CardDescription>Distribution of classes by bug probability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bugDistribution.map((item) => (
              <div key={item.risk} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{item.risk}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.count} classes ({item.percentage}%)
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${
                      item.risk.includes("High")
                        ? "bg-red-500"
                        : item.risk.includes("Medium")
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>System Structure</CardTitle>
          <CardDescription>Breakdown of project components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Classes</div>
                <div className="text-sm text-muted-foreground">67 (74%)</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "74%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Interfaces</div>
                <div className="text-sm text-muted-foreground">23 (26%)</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "26%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Abstract Classes</div>
                <div className="text-sm text-muted-foreground">12 (13%)</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "13%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
