import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="gradient-bg rounded-full p-4">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
        <h2 className="text-xl font-semibold">Loading...</h2>
        <p className="text-sm text-muted-foreground">Analyzing your project</p>
      </div>
    </div>
  )
}
