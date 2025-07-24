
"use client"

import { UserNav } from "@/components/user-nav"
import { ArrowLeft, Bell, Leaf } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import * as React from "react"
import { Toaster } from "@/components/ui/toaster"

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function FieldBoyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const getHeading = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.includes('new')) {
      return 'New Survey';
    }
    if (segments.length > 1) {
      return capitalize(segments[1]);
    }
    return 'Dashboard';
  };
  
  const showBackButton = pathname !== '/field-boy/dashboard';

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          {showBackButton ? (
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="/field-boy/dashboard">
                  <ArrowLeft />
                </Link>
              </Button>
          ) : (
             <Link href="#" className="flex items-center gap-2 font-semibold font-headline text-lg">
                <Leaf className="h-6 w-6 text-primary" />
                <span>CaneVision</span>
              </Link>
          )}

          <h1 className="flex-1 text-lg font-semibold md:text-xl font-headline">
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
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {children}
        <Toaster />
      </main>
    </div>
  )
}
