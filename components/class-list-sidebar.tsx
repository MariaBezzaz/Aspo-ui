"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search, AlertTriangle, CheckCircle, FileCode, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

// Mock data for demonstration
const mockClasses = [
  {
    uid: "class-uid1",
    className: "UserService",
    package: "com.example.service",
    metrics: {
      bugProbability: 0.75,
      complexity: 18,
    },
  },
  {
    uid: "class-uid2",
    className: "UserRepository",
    package: "com.example.repository",
    metrics: {
      bugProbability: 0.12,
      complexity: 5,
    },
  },
  {
    uid: "class-uid3",
    className: "UserController",
    package: "com.example.controller",
    metrics: {
      bugProbability: 0.32,
      complexity: 10,
    },
  },
  {
    uid: "class-uid4",
    className: "User",
    package: "com.example.model",
    metrics: {
      bugProbability: 0.05,
      complexity: 3,
    },
  },
  {
    uid: "class-uid5",
    className: "AuthenticationService",
    package: "com.example.service",
    metrics: {
      bugProbability: 0.68,
      complexity: 15,
    },
  },
  {
    uid: "class-uid6",
    className: "SecurityConfig",
    package: "com.example.config",
    metrics: {
      bugProbability: 0.45,
      complexity: 12,
    },
  },
  {
    uid: "class-uid7",
    className: "JwtTokenProvider",
    package: "com.example.security",
    metrics: {
      bugProbability: 0.58,
      complexity: 14,
    },
  },
]

export default function ClassListSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "bugProbability">("bugProbability")

  const filteredClasses = mockClasses
    .filter(
      (cls) =>
        cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.package.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.className.localeCompare(b.className)
      } else {
        return b.metrics.bugProbability - a.metrics.bugProbability
      }
    })

  const handleClassClick = (classUid: string) => {
    router.push(`/dashboard/class/${classUid}`)
  }

  const getBugIndicator = (probability: number) => {
    if (probability >= 0.6) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-red-500">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>High bug probability: {Math.round(probability * 100)}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    } else if (probability >= 0.3) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-amber-500">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Medium bug probability: {Math.round(probability * 100)}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    } else {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-green-500">
                <CheckCircle className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Low bug probability: {Math.round(probability * 100)}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <h2 className="font-medium mb-3">Classes</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-8 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-xs text-muted-foreground">{filteredClasses.length} classes</div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 px-2 text-xs ${sortBy === "bugProbability" ? "bg-secondary" : ""}`}
            onClick={() => setSortBy("bugProbability")}
          >
            Risk
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 px-2 text-xs ${sortBy === "name" ? "bg-secondary" : ""}`}
            onClick={() => setSortBy("name")}
          >
            Name
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-0.5 p-2">
          {filteredClasses.map((cls) => (
            <button
              key={cls.uid}
              className={`w-full flex items-center justify-between rounded-md p-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                pathname === `/dashboard/class/${cls.uid}` ? "bg-accent text-accent-foreground" : ""
              }`}
              onClick={() => handleClassClick(cls.uid)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileCode className="h-4 w-4 shrink-0 text-primary" />
                <div className="truncate">
                  <div className="font-medium truncate">{cls.className}</div>
                  <div className="text-xs text-muted-foreground truncate">{cls.package}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">{getBugIndicator(cls.metrics.bugProbability)}</div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
