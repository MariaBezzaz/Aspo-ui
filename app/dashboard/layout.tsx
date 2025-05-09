import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart3, FileCode, Home } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import ClassListSidebar from "@/components/class-list-sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Main Navigation Sidebar with Class List */}
        <Sidebar collapsible="icon">
          <SidebarHeader className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="text-xl gradient-text">Aspo</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/dashboard">
                    <BarChart3 className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Classes">
                  <Link href="/dashboard/class">
                    <FileCode className="h-5 w-5" />
                    <span>Classes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarSeparator />

            {/* Class List integrated into the left sidebar */}
            <div className="flex-1 overflow-hidden">
              <ClassListSidebar />
            </div>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Aspo Dashboard</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 overflow-auto w-full">
            <div className="w-full px-4 py-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
