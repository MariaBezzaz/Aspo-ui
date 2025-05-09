"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Github, ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GithubUrlInput() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      setIsLoading(true)

      // Simulate API call
      try {
        // In a real app, you would validate the URL and send it to the server
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push("/dashboard")
      } catch (error) {
        console.error("Error analyzing repository:", error)
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="github-url">GitHub Repository URL</Label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Github className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="github-url"
              placeholder="https://github.com/username/repository"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={!url || isLoading} className="shrink-0 min-w-24">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              <>
                Analyze
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
