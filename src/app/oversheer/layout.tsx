
"use client"

import { UserNav } from "@/components/user-nav"
import { ArrowLeft, Bell, Leaf } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Toaster } from "@/components/ui/toaster"

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function OversheerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  
  const getHeading = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 1) {
        if(segments[1] === 'dashboard' && !segments[2]) return 'साई शुगर';
        if(segments[2] === 'new') return 'नवीन सर्वेक्षण नियुक्त करा';
        if(segments[2] === 'survey' && segments[3]) return 'सर्वेक्षण पुनरावलोकन';
    }
    return 'ओव्हरशीअर डॅशबोर्ड';
  };
  
  const showBackButton = pathname !== '/oversheer/dashboard';

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
            {showBackButton && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href="/oversheer/dashboard">
                    <ArrowLeft />
                  </Link>
                </Button>
            )}
             <h1 className="text-lg font-semibold md:text-xl font-headline">
                {getHeading()}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
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
