
"use client"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"
import { Bell, BarChart3, ChevronLeft, ClipboardList, LayoutGrid, Leaf, Settings, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import * as React from "react"

// Helper function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  
  // Determine the heading based on the current path
  const getHeading = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1 && segments[0] === 'dashboard') {
      return 'Dashboard';
    }
    if (segments.length > 1) {
        if(segments[1] === 'farmer' && segments[2]){
            return 'Farmer Details'
        }
        if(segments[1] === 'users' && segments[2] === 'new'){
            return 'Create New User'
        }
         if(segments[1] === 'surveys' && segments[2] === 'new'){
            return 'New Farm Survey'
        }
      return capitalize(segments[1]);
    }
    return 'Dashboard';
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 lg:hidden" asChild>
              <SidebarTrigger>
                <ChevronLeft />
              </SidebarTrigger>
            </Button>
            <h1 className="font-headline text-xl font-semibold text-sidebar-foreground">
              <Leaf className="inline-block mr-2 h-6 w-6" />
              CaneVision
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/dashboard'}>
                <Link href="/dashboard">
                  <LayoutGrid />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Surveys" isActive={pathname.startsWith('/dashboard/surveys')}>
                <Link href="/dashboard/surveys">
                  <ClipboardList />
                  <span>Surveys</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="User Management" isActive={pathname.startsWith('/dashboard/users')}>
                <Link href="/dashboard/users">
                  <Users />
                  <span>User Management</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Reports" disabled>
                <Link href="#">
                  <BarChart3 />
                  <span>Reports</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" isActive={pathname.startsWith('/dashboard/settings')}>
                    <Link href="/dashboard/settings">
                        <Settings />
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
          <SidebarTrigger className="h-8 w-8" />
          <h1 className="text-lg font-semibold md:text-xl font-headline">
            {getHeading()}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
