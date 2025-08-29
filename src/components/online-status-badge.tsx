
"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Wifi, WifiOff } from "lucide-react"

const OnlineStatusBadge = () => {
  const [isOnline, setIsOnline] = React.useState(true)

  React.useEffect(() => {
    // Set initial status
    if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
      setIsOnline(window.navigator.onLine)
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1.5 border-2",
        isOnline
          ? "border-green-500/50 bg-green-50 text-green-700"
          : "border-red-500/50 bg-red-50 text-red-700"
      )}
    >
      {isOnline ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
      <span className="font-semibold">{isOnline ? "ऑनलाइन" : "ऑफलाइन"}</span>
    </Badge>
  )
}

export default OnlineStatusBadge
