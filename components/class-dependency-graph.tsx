"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOutIcon, RefreshCwIcon, DownloadIcon, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for demonstration based on the JSON structure
const mockClassData = {
  uid: "class-uid1",
  className: "UserService",
  package: "com.example.service",
  metrics: {
    bugProbability: 0.75,
    NOM: 12,
    NOA: 5,
  },
  inheritance: {
    parent: "class-uid3",
    interfaces: ["interface-uid2", "interface-uid1"],
  },
  attributes: [
    {
      uid: "attr-uid1",
      name: "userRepository",
      type: "UserRepository",
      accessor: "private",
    },
    {
      uid: "attr-uid2",
      name: "authService",
      type: "AuthenticationService",
      accessor: "private",
    },
  ],
  methods: [
    {
      uid: "method-uid1",
      name: "findUserById",
      return: "User",
      accessor: "public",
    },
    {
      uid: "method-uid2",
      name: "saveUser",
      return: "User",
      accessor: "public",
    },
    {
      uid: "method-uid3",
      name: "validateUser",
      return: "boolean",
      accessor: "private",
    },
    {
      uid: "method-uid4",
      name: "formatUserData",
      return: "void",
      accessor: "private",
    },
  ],
  dependencies: [
    {
      from: "method-uid1",
      to: "external-method-uid1",
    },
    {
      from: "method-uid2",
      to: "method-uid3",
    },
    {
      from: "method-uid2",
      to: "method-uid4",
    },
    {
      from: "method-uid2",
      to: "external-method-uid2",
    },
  ],
}

// Mock related classes
const mockRelatedClasses = [
  {
    uid: "class-uid3",
    className: "BaseService",
    package: "com.example.service",
    relationship: "parent",
  },
  {
    uid: "interface-uid1",
    className: "UserManagement",
    package: "com.example.service.interfaces",
    relationship: "implements",
  },
  {
    uid: "interface-uid2",
    className: "Auditable",
    package: "com.example.common",
    relationship: "implements",
  },
  {
    uid: "class-uid4",
    className: "User",
    package: "com.example.model",
    relationship: "uses",
  },
  {
    uid: "class-uid5",
    className: "UserRepository",
    package: "com.example.repository",
    relationship: "uses",
  },
]

export default function ClassDependencyGraph() {
  const graphRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("dependencies")
  const [zoomLevel, setZoomLevel] = useState(100)
  const [showPublicMethods, setShowPublicMethods] = useState(true)
  const [showPrivateMethods, setShowPrivateMethods] = useState(true)
  const [showExternalDeps, setShowExternalDeps] = useState(true)
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null)

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
              <p class="text-muted-foreground mb-4">
                ${
                  activeTab === "dependencies"
                    ? "Class dependency graph showing methods (circles) and related classes (squares)"
                    : "Inheritance graph showing parent classes and implemented interfaces"
                }
              </p>
              <p class="text-sm text-muted-foreground">Zoom level: ${zoomLevel}%</p>
              <p class="text-sm text-muted-foreground mt-2">Filters: 
                ${showPublicMethods ? "Public Methods, " : ""}
                ${showPrivateMethods ? "Private Methods, " : ""}
                ${showExternalDeps ? "External Dependencies" : ""}
              </p>
              
              <div class="mt-6 p-4 border rounded-md bg-background">
                <p class="font-medium">Method Hover Tooltip Demo</p>
                <p class="text-sm text-muted-foreground mb-2">In the actual implementation, this would appear when hovering over a method circle</p>
                <div class="flex gap-4 justify-center mt-4">
                  <button 
                    class="px-3 py-2 rounded-full bg-primary text-primary-foreground text-sm"
                    onmouseover="document.getElementById('method-tooltip-demo').style.display='block';"
                    onmouseout="document.getElementById('method-tooltip-demo').style.display='none';"
                  >
                    validateUser()
                  </button>
                </div>
                <div id="method-tooltip-demo" style="display:none; margin-top:20px; padding:10px; border:1px solid #ccc; border-radius:8px; background-color:var(--background); max-width:300px; text-align:left;">
                  <div class="font-medium">validateUser(User user): boolean</div>
                  <div class="text-xs text-muted-foreground">UserService</div>
                  <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div>Visibility: <span class="font-medium">private</span></div>
                    <div>Complexity: <span class="font-medium">4</span></div>
                    <div>Bug Risk: <span class="font-medium text-amber-500">45%</span></div>
                  </div>
                  <div class="mt-2 text-xs">
                    <div class="font-medium">Called by:</div>
                    <div class="text-muted-foreground">saveUser</div>
                  </div>
                  <div class="mt-2 text-xs">
                    <div class="font-medium">Calls:</div>
                    <div class="text-muted-foreground">None</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      }
    }

    renderGraph()
  }, [activeTab, zoomLevel, showPublicMethods, showPrivateMethods, showExternalDeps, hoveredMethod])

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

  return (
    <div className="w-full space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TabsList>
            <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            <TabsTrigger value="inheritance">Inheritance</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem checked={showPublicMethods} onCheckedChange={setShowPublicMethods}>
                  Public Methods
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showPrivateMethods} onCheckedChange={setShowPrivateMethods}>
                  Private Methods
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showExternalDeps} onCheckedChange={setShowExternalDeps}>
                  External Dependencies
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center rounded-md border bg-background">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-md border-r"
                onClick={handleZoomOut}
              >
                <ZoomOutIcon className="h-3.5 w-3.5" />
              </Button>
              <div className="flex h-8 w-12 items-center justify-center text-xs">{zoomLevel}%</div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none rounded-r-md" onClick={handleZoomIn}>
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </div>

            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleReset}>
              <RefreshCwIcon className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDownload}>
              <DownloadIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <TabsContent value="dependencies" className="w-full mt-4">
          <div ref={graphRef} className="w-full h-[700px] rounded-lg border bg-card text-card-foreground shadow-sm" />
        </TabsContent>

        <TabsContent value="inheritance" className="w-full mt-4">
          <div ref={graphRef} className="w-full h-[700px] rounded-lg border bg-card text-card-foreground shadow-sm" />
        </TabsContent>
      </Tabs>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-3">Legend</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-primary" />
              <span>Current Class</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-md bg-muted-foreground" />
              <span>Related Class</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>Method (Current)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted-foreground" />
              <span>Method (External)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-primary" />
              <span>Internal Call</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-muted-foreground" />
              <span>External Call</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>High Risk ({">"}60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Low Risk ({"<"}30%)</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <h3 className="font-medium mb-3">Class Information</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-muted-foreground">Class Name:</div>
            <div className="font-medium">{mockClassData.className}</div>
            <div className="text-muted-foreground">Package:</div>
            <div className="font-medium">{mockClassData.package}</div>
            <div className="text-muted-foreground">Methods:</div>
            <div className="font-medium">{mockClassData.methods.length}</div>
            <div className="text-muted-foreground">Attributes:</div>
            <div className="font-medium">{mockClassData.attributes.length}</div>
            <div className="text-muted-foreground">Bug Probability:</div>
            <div className="font-medium text-red-500">{Math.round(mockClassData.metrics.bugProbability * 100)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
