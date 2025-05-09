"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ZoomIn, ZoomOut, RefreshCw, Download, Filter } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for demonstration
const mockNodes = [
  { id: "class-uid1", label: "UserService", type: "class", bugProbability: 0.75 },
  { id: "class-uid2", label: "UserRepository", type: "class", bugProbability: 0.12 },
  { id: "class-uid3", label: "UserController", type: "class", bugProbability: 0.32 },
  { id: "class-uid4", label: "User", type: "class", bugProbability: 0.05 },
  { id: "interface-uid1", label: "UserManagement", type: "interface", bugProbability: 0 },
  { id: "interface-uid2", label: "Repository", type: "interface", bugProbability: 0 },
]

const mockEdges = [
  { from: "class-uid1", to: "interface-uid1", label: "implements" },
  { from: "class-uid2", to: "interface-uid2", label: "implements" },
  { from: "class-uid3", to: "class-uid1", label: "uses" },
  { from: "class-uid3", to: "class-uid4", label: "uses" },
  { from: "class-uid1", to: "class-uid2", label: "uses" },
  { from: "class-uid1", to: "class-uid4", label: "uses" },
]

// Mock method data for hover tooltips
const mockMethods = [
  {
    id: "method-1",
    name: "findUserById",
    class: "UserService",
    returnType: "User",
    visibility: "public",
    complexity: 5,
    bugProbability: 0.32,
    parameters: [{ name: "id", type: "Long" }],
    calledBy: ["UserController.getUser"],
    calls: ["UserRepository.findById"],
  },
  {
    id: "method-2",
    name: "saveUser",
    class: "UserService",
    returnType: "User",
    visibility: "public",
    complexity: 8,
    bugProbability: 0.65,
    parameters: [{ name: "user", type: "User" }],
    calledBy: ["UserController.createUser"],
    calls: ["UserRepository.save", "validateUser"],
  },
]

export default function GraphView() {
  const router = useRouter()
  const graphRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [filterType, setFilterType] = useState<string>("all")
  const [showClasses, setShowClasses] = useState(true)
  const [showInterfaces, setShowInterfaces] = useState(true)
  const [showHighRisk, setShowHighRisk] = useState(true)
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null)

  useEffect(() => {
    // In a real implementation, this would initialize a graph visualization library
    // like vis.js, cytoscape.js, or d3.js to render the graph
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
              <p class="text-muted-foreground mb-4">Class relationship graph would be rendered here using a library like vis.js or cytoscape.js</p>
              <p class="text-sm text-muted-foreground">Showing ${mockNodes.length} nodes and ${mockEdges.length} edges</p>
              <p class="text-sm text-muted-foreground mt-2">Zoom level: ${zoomLevel}%</p>
              <p class="text-sm text-muted-foreground mt-2">Filter: ${filterType}</p>
              <p class="text-sm text-muted-foreground mt-2">
                Showing: 
                ${showClasses ? "Classes, " : ""}
                ${showInterfaces ? "Interfaces, " : ""}
                ${showHighRisk ? "High Risk" : ""}
              </p>
              <div class="mt-6 p-4 border rounded-md bg-background">
                <p class="font-medium">Method Hover Tooltip Demo</p>
                <p class="text-sm text-muted-foreground mb-2">In the actual implementation, this would appear when hovering over a method circle</p>
                <div class="flex gap-4 justify-center mt-4">
                  <button 
                    class="px-3 py-2 rounded-full bg-primary text-primary-foreground text-sm"
                    onmouseover="document.getElementById('method-tooltip').style.display='block'; document.getElementById('method-tooltip').dataset.method='method-1';"
                    onmouseout="document.getElementById('method-tooltip').style.display='none';"
                  >
                    findUserById()
                  </button>
                  <button 
                    class="px-3 py-2 rounded-full bg-red-500 text-white text-sm"
                    onmouseover="document.getElementById('method-tooltip').style.display='block'; document.getElementById('method-tooltip').dataset.method='method-2';"
                    onmouseout="document.getElementById('method-tooltip').style.display='none';"
                  >
                    saveUser()
                  </button>
                </div>
                <div id="method-tooltip" style="display:none; margin-top:20px; padding:10px; border:1px solid #ccc; border-radius:8px; background-color:var(--background); max-width:300px; text-align:left;">
                  <div id="method-1-tooltip" style="display:none;">
                    <div class="font-medium">findUserById(Long id): User</div>
                    <div class="text-xs text-muted-foreground">UserService</div>
                    <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div>Visibility: <span class="font-medium">public</span></div>
                      <div>Complexity: <span class="font-medium">5</span></div>
                      <div>Bug Risk: <span class="font-medium text-amber-500">32%</span></div>
                    </div>
                    <div class="mt-2 text-xs">
                      <div class="font-medium">Called by:</div>
                      <div class="text-muted-foreground">UserController.getUser</div>
                    </div>
                    <div class="mt-2 text-xs">
                      <div class="font-medium">Calls:</div>
                      <div class="text-muted-foreground">UserRepository.findById</div>
                    </div>
                  </div>
                  <div id="method-2-tooltip" style="display:none;">
                    <div class="font-medium">saveUser(User user): User</div>
                    <div class="text-xs text-muted-foreground">UserService</div>
                    <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div>Visibility: <span class="font-medium">public</span></div>
                      <div>Complexity: <span class="font-medium">8</span></div>
                      <div>Bug Risk: <span class="font-medium text-red-500">65%</span></div>
                    </div>
                    <div class="mt-2 text-xs">
                      <div class="font-medium">Called by:</div>
                      <div class="text-muted-foreground">UserController.createUser</div>
                    </div>
                    <div class="mt-2 text-xs">
                      <div class="font-medium">Calls:</div>
                      <div class="text-muted-foreground">UserRepository.save, validateUser</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `

        // Add event listener to show the correct tooltip content
        const tooltip = document.getElementById("method-tooltip")
        if (tooltip) {
          tooltip.addEventListener("DOMSubtreeModified", () => {
            const methodId = tooltip.dataset.method
            document.getElementById("method-1-tooltip")!.style.display = methodId === "method-1" ? "block" : "none"
            document.getElementById("method-2-tooltip")!.style.display = methodId === "method-2" ? "block" : "none"
          })
        }
      }
    }

    renderGraph()

    // Simulate selecting a node after 2 seconds
    const timer = setTimeout(() => {
      setSelectedNode("class-uid1")
    }, 2000)

    return () => clearTimeout(timer)
  }, [zoomLevel, filterType, showClasses, showInterfaces, showHighRisk, hoveredMethod])

  const handleNodeClick = (nodeId: string) => {
    // Navigate to class view for the selected node
    router.push(`/dashboard/class/${nodeId}`)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50))
  }

  const handleReset = () => {
    setZoomLevel(100)
  }

  const handleDownload = () => {
    // In a real implementation, this would generate and download the graph as an image
    alert("Graph would be downloaded as an image")
  }

  const getBugIndicatorColor = (probability: number) => {
    if (probability >= 0.6) return "bg-red-500"
    if (probability >= 0.3) return "bg-amber-500"
    return "bg-green-500"
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes or interfaces..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="high-risk">High Risk ({">"}60%)</SelectItem>
              <SelectItem value="medium-risk">Medium Risk (30-60%)</SelectItem>
              <SelectItem value="low-risk">Low Risk ({"<"}30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-3.5 w-3.5 mr-1" />
              Show/Hide
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={showClasses} onCheckedChange={setShowClasses}>
              Classes
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showInterfaces} onCheckedChange={setShowInterfaces}>
              Interfaces
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showHighRisk} onCheckedChange={setShowHighRisk}>
              High Risk Nodes
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none rounded-l-md border-r"
              onClick={handleZoomOut}
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <div className="flex h-8 w-12 items-center justify-center text-xs">{zoomLevel}%</div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none rounded-r-md" onClick={handleZoomIn}>
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleReset}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <div ref={graphRef} className="h-[700px]" />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-3">Legend</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-primary" />
              <span>Class</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-blue-500" />
              <span>Interface</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>Method (Low Risk)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span>Method (Medium Risk)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>Method (High Risk)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-blue-500" />
              <span>Implements</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-purple-500" />
              <span>Extends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-gray-500" />
              <span>Uses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-green-500" />
              <span>Method Call</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-3">Graph Information</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-muted-foreground">Total Classes:</div>
            <div className="font-medium">{mockNodes.filter((n) => n.type === "class").length}</div>
            <div className="text-muted-foreground">Total Interfaces:</div>
            <div className="font-medium">{mockNodes.filter((n) => n.type === "interface").length}</div>
            <div className="text-muted-foreground">Total Methods:</div>
            <div className="font-medium">{mockMethods.length}</div>
            <div className="text-muted-foreground">High Risk Methods:</div>
            <div className="font-medium">{mockMethods.filter((m) => m.bugProbability >= 0.6).length}</div>
            <div className="text-muted-foreground">Total Dependencies:</div>
            <div className="font-medium">{mockEdges.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
