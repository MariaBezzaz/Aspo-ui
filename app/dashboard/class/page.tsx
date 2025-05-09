import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassMetrics from "@/components/class-metrics"
import DependencyGraph from "@/components/dependency-graph"

export default function ClassPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Class View</h2>
        <p className="text-muted-foreground">Detailed information about a specific class.</p>
      </div>

      <Card className="border-2 shadow-sm">
        <CardHeader>
          <CardTitle>com.example.MyClass</CardTitle>
          <CardDescription>Class details and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metrics" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="metrics">Class Metrics</TabsTrigger>
              <TabsTrigger value="dependencies">Dependency Graph</TabsTrigger>
            </TabsList>
            <TabsContent value="metrics" className="space-y-4 pt-4 animate-fade-in">
              <ClassMetrics />
            </TabsContent>
            <TabsContent value="dependencies" className="space-y-4 pt-4 animate-fade-in">
              <DependencyGraph />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
