"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockClassData = {
  uid: "class-uid1",
  className: "UserService",
  package: "com.example.service",
  metrics: {
    bugProbability: 0.75,
    NOM: 12,
    NOA: 5,
    LCC: 0.6,
    LCOM4: 3,
    DAC: 4,
    MPC: 15,
    DIT: 2,
    NOC: 0,
    EC: 8,
    ORR: 0.4,
    OLR: 0.3,
  },
}

const metricDescriptions: Record<string, string> = {
  NOM: "Number of Methods",
  NOA: "Number of Attributes",
  LCC: "Loose Class Cohesion",
  LCOM4: "Lack of Cohesion in Methods",
  DAC: "Data Abstraction Coupling",
  MPC: "Message Passing Coupling",
  DIT: "Depth of Inheritance Tree",
  NOC: "Number of Children",
  EC: "Efferent Coupling",
  ORR: "Overriding Ratio",
  OLR: "Overloading Ratio",
}

export default function ClassMetricsOverview() {
  const bugPercentage = Math.round(mockClassData.metrics.bugProbability * 100)

  const getBugSeverityColor = (percentage: number) => {
    if (percentage >= 60) return "text-red-500"
    if (percentage >= 30) return "text-amber-500"
    return "text-green-500"
  }

  const getBugSeverityBg = (percentage: number) => {
    if (percentage >= 60) return "bg-red-500"
    if (percentage >= 30) return "bg-amber-500"
    return "bg-green-500"
  }

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{mockClassData.className}</CardTitle>
              <Badge variant="outline" className="h-5 text-xs">
                Java
              </Badge>
            </div>
            <CardDescription>{mockClassData.package}</CardDescription>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className={`text-lg font-bold ${getBugSeverityColor(bugPercentage)}`}>{bugPercentage}%</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={getBugSeverityColor(bugPercentage)}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bug probability: {bugPercentage}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Bug Probability</div>
              <div className="text-sm text-muted-foreground">{bugPercentage}%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className={`h-2 rounded-full ${getBugSeverityBg(bugPercentage)}`}
                style={{ width: `${bugPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Object.entries(mockClassData.metrics)
              .filter(([key]) => key !== "bugProbability")
              .map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="text-sm font-medium">{key}</div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-muted-foreground">
                            <Info className="h-3 w-3" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{metricDescriptions[key] || key}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    {typeof value === "number" && value % 1 !== 0 ? value.toFixed(2) : value}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
