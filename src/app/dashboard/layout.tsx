
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
      return 'डॅशबोर्ड';
    }
    if (segments.length > 1) {
        if(segments[1] === 'farmer' && segments[2]){
            return 'शेतकरी तपशील'
        }
        if(segments[1] === 'users' && segments[2] === 'new'){
            return 'नवीन वापरकर्ता तयार करा'
        }
         if(segments[1] === 'surveys' && segments[2] === 'new'){
            return 'नवीन शेत सर्वेक्षण'
        }
        
        const segmentTranslations: { [key: string]: string } = {
            'surveys': 'सर्वेक्षण',
            'users': 'वापरकर्ता व्यवस्थापन',
            'settings': 'सेटिंग्ज'
        };
        
        return segmentTranslations[segments[1]] || capitalize(segments[1]);
    }
    return 'डॅशबोर्ड';
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
              साई शुगर
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="डॅशबोर्ड" isActive={pathname === '/dashboard'}>
                <Link href="/dashboard">
                  <LayoutGrid />
                  <span>डॅशबोर्ड</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="सर्वेक्षण" isActive={pathname.startsWith('/dashboard/surveys')}>
                <Link href="/dashboard/surveys">
                  <ClipboardList />
                  <span>सर्वेक्षण</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="वापरकर्ता व्यवस्थापन" isActive={pathname.startsWith('/dashboard/users')}>
                <Link href="/dashboard/users">
                  <Users />
                  <span>वापरकर्ता व्यवस्थापन</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="अहवाल" disabled>
                <Link href="#">
                  <BarChart3 />
                  <span>अहवाल</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="सेटिंग्ज" isActive={pathname.startsWith('/dashboard/settings')}>
                    <Link href="/dashboard/settings">
                        <Settings />
                        <span>सेटिंग्ज</span>
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
