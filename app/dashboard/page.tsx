import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatisticsView from "@/components/statistics-view"
import SystemStatistics from "@/components/system-statistics"
import GraphView from "@/components/graph-view"

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your project's structure, metrics, and relationships.</p>
      </div>

      {/* System Metrics Section */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">System Metrics</h3>
        <StatisticsView />
      </div>

      {/* Class Graph Section */}
      <div className="w-full mt-10">
        <h3 className="text-xl font-semibold mb-4">Class Relationships</h3>
        <GraphView />
      </div>

      {/* System Statistics Section */}
      <div className="w-full mt-10">
        <h3 className="text-xl font-semibold mb-4">Quality Metrics</h3>
        <Tabs defaultValue="quality" className="w-full space-y-4">
          <TabsList>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
            <TabsTrigger value="complexity">Complexity</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
          </TabsList>
          <TabsContent value="quality" className="space-y-4 animate-fade-in">
            <SystemStatistics view="quality" />
          </TabsContent>
          <TabsContent value="complexity" className="space-y-4 animate-fade-in">
            <SystemStatistics view="complexity" />
          </TabsContent>
          <TabsContent value="visibility" className="space-y-4 animate-fade-in">
            <SystemStatistics view="visibility" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
