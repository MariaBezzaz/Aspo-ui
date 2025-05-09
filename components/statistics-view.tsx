"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock system metrics
const systemMetrics = [
  { name: "Total Classes", value: 67 },
  { name: "Total Interfaces", value: 23 },
  { name: "Total Methods", value: 812 },
  { name: "Total Lines of Code", value: 5243 },
]

export default function StatisticsView() {
  return (
    <div className="w-full space-y-6">
      <Card className="w-full border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>System Overview</CardTitle>
          <CardDescription>High-level metrics for the entire codebase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Bug Risk Distribution</CardTitle>
          <CardDescription>Distribution of classes by bug probability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">High Risk ({">"}60%)</div>
                <div className="text-sm text-muted-foreground">12 classes (18%)</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-red-500" style={{ width: "18%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Medium Risk (30-60%)</div>
                <div className="text-sm text-muted-foreground">25 classes (37%)</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: "37%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Low Risk ({"<"}30%)</div>
                <div className="text-sm text-muted-foreground">30 classes (45%)</div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "45%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
