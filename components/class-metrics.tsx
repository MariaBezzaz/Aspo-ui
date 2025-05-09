"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data for demonstration
const classMetrics = [
  { name: "Complexity", value: 15, max: 25, description: "Cyclomatic complexity of the class" },
  { name: "Lines of Code", value: 120, max: 350, description: "Total lines of code" },
  { name: "Methods", value: 8, max: 42, description: "Number of methods" },
  { name: "Dependencies", value: 6, max: 18, description: "Number of dependencies" },
  { name: "Coupling", value: 4, max: 10, description: "Afferent coupling" },
  { name: "Instability", value: 0.4, max: 1, description: "Instability metric (0-1)" },
]

export default function ClassMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2 border-2 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Class Information</CardTitle>
          <CardDescription>Basic information about the class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Package</div>
              <div className="font-medium">com.example</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Type</div>
              <div className="font-medium">Class</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Modifiers</div>
              <div className="font-medium">public</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Extends</div>
              <div className="font-medium">java.lang.Object</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Implements</div>
              <div className="font-medium">com.example.Entity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {classMetrics.map((metric) => (
        <Card key={metric.name} className="border-2 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{metric.name}</CardTitle>
            <CardDescription>{metric.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {typeof metric.value === "number" && metric.value % 1 !== 0 ? metric.value.toFixed(2) : metric.value}
                </span>
                <span className="text-sm text-muted-foreground">Max: {metric.max}</span>
              </div>
              <Progress value={(metric.value / metric.max) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
