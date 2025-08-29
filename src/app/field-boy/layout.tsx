
"use client"

import { UserNav } from "@/components/user-nav"
import { ArrowLeft, Bell, Leaf } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Toaster } from "@/components/ui/toaster"
import PerformanceBadge from "@/components/performance-badge"
import OnlineStatusBadge from "@/components/online-status-badge"

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export default function FieldBoyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const getHeading = () => {
    const segments = pathname.split('/').filter(Boolean); // e.g. ['field-boy', 'dashboard', 'survey', 'SUR001']

    if (pathname === '/field-boy/dashboard') {
        return 'साई शुगर';
    }
    if (segments.includes('new')) {
      return 'नवीन सर्वेक्षण';
    }
    if (segments.length > 2 && segments[2] === 'survey') {
      return `सर्वेक्षण तपशील`;
    }
     if (segments.length > 1 && segments[1] === 'profile') {
      return 'प्रोफाइल';
    }
    if (segments.length > 1) {
      return capitalize(segments[1]);
    }
    return 'डॅशबोर्ड';
  };
  
  const showBackButton = pathname !== '/field-boy/dashboard';
  const backLink = pathname.includes('/survey/') || pathname.includes('/profile') ? '/field-boy/dashboard' : '/field-boy/dashboard';


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
            {showBackButton && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={backLink}>
                    <ArrowLeft />
                  </Link>
                </Button>
            )}
             <h1 className="text-lg font-semibold md:text-xl font-headline">
                {getHeading()}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <OnlineStatusBadge />
            <PerformanceBadge />
            <UserNav />
          </div>
        </header>
      <main className="flex-1 p-4 md:p-6">
        {children}
        <Toaster />
      </main>
    </div>
  )
}
