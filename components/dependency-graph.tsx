"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const methods = [
  { id: "m1", name: "getUser()", type: "public" },
  { id: "m2", name: "saveUser()", type: "public" },
  { id: "m3", name: "validateUser()", type: "private" },
  { id: "m4", name: "formatData()", type: "private" },
  { id: "m5", name: "processRequest()", type: "public" },
]

const dependencies = [
  { from: "m2", to: "m3", type: "internal" },
  { from: "m2", to: "m4", type: "internal" },
  { from: "m5", to: "m1", type: "internal" },
  { from: "m5", to: "m2", type: "internal" },
  { from: "m1", to: "external1", type: "external", target: "com.example.Repository.findById()" },
  { from: "m2", to: "external2", type: "external", target: "com.example.Repository.save()" },
]

export default function DependencyGraph() {
  const graphRef = useRef<HTMLDivElement>(null)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  useEffect(() => {
    // In a real implementation, this would initialize a graph visualization library
    const renderGraph = () => {
      if (graphRef.current) {
        // Placeholder for graph rendering
        const container = graphRef.current
        container.innerHTML = `
          <div class="flex h-full items-center justify-center">
            <div class="text-center">
              <div class="mb-6 gradient-bg rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p class="text-muted-foreground mb-4">Method dependency graph would be rendered here</p>
              <p class="text-sm text-muted-foreground">Showing ${methods.length} methods and ${dependencies.length} dependencies</p>
            </div>
          </div>
        `
      }
    }

    renderGraph()

    // Simulate selecting a method after 1 second
    const timer = setTimeout(() => {
      setSelectedMethod("m2")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getMethodDependencies = (methodId: string) => {
    return dependencies.filter((dep) => dep.from === methodId || dep.to === methodId)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <div ref={graphRef} className="h-[500px] rounded-lg border-2 bg-card text-card-foreground shadow-sm" />
        </div>
        <div>
          <Card className="border-2 shadow-sm h-full">
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Methods</h3>
                <div className="space-y-2">
                  {methods.map((method) => (
                    <div
                      key={method.id}
                      className={`rounded-md border-2 p-2 text-sm cursor-pointer transition-colors ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/30"
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="font-medium">{method.name}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant={method.type === "public" ? "default" : "secondary"} className="text-[10px] h-4">
                          {method.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedMethod && (
                <div>
                  <h3 className="font-medium mb-2">Dependencies</h3>
                  <div className="space-y-2">
                    {getMethodDependencies(selectedMethod).map((dep, index) => (
                      <div key={index} className="rounded-md border-2 border-primary/10 bg-primary/5 p-2 text-sm">
                        {dep.type === "internal" ? (
                          <div>
                            <span className="font-medium">
                              {dep.from === selectedMethod
                                ? `Calls: ${methods.find((m) => m.id === dep.to)?.name}`
                                : `Called by: ${methods.find((m) => m.id === dep.from)?.name}`}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-medium">External: {dep.target}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
