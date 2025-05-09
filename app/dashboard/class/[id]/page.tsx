import ClassMetricsOverview from "@/components/class-metrics-overview"
import ClassDependencyGraph from "@/components/class-dependency-graph"

export default function ClassDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Class View</h2>
        <p className="text-muted-foreground">Detailed information about the selected class.</p>
      </div>

      <ClassMetricsOverview />
      <ClassDependencyGraph />
    </div>
  )
}
