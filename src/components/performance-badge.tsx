
"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const PerformanceBadge = () => {
  // In a real application, this score would come from a state management library (like Redux/Zustand) or be fetched from an API.
  // The value would be updated based on survey submissions or status changes.
  // For demonstration, we'll use a state that cycles through scores.
  const [score, setScore] = React.useState(85)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => {
        if (prevScore > 70) return 72
        if (prevScore > 50) return 55
        return 85
      })
    }, 5000) // Change score every 5 seconds to simulate updates
    return () => clearInterval(interval)
  }, [])

  const getBadgeStyle = () => {
    if (score >= 80) {
      return "bg-[#FFD700] text-amber-900 border-amber-500" // Gold
    }
    if (score >= 60) {
      return "bg-[#C0C0C0] text-slate-800 border-slate-400" // Silver
    }
    return "bg-[#DC3545] text-white border-red-700" // Red
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full font-bold shadow-md border-2",
            getBadgeStyle()
          )}>
            <span className="text-sm font-extrabold">{score}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>माझी कामगिरी गुणसंख्या</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default PerformanceBadge
