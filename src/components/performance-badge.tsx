
"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const ScoreItem = ({ label, score, maxScore }: { label: string, score: number, maxScore: number }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{score} / {maxScore}</span>
    </div>
)

const PerformanceBadge = () => {
  const [scores, setScores] = React.useState({
    speed: 24,
    accuracy: 40,
    location: 18,
    consistency: 3,
    total: 85
  })

  React.useEffect(() => {
    const interval = setInterval(() => {
      setScores(prevScores => {
        if (prevScores.total > 70) return { speed: 20, accuracy: 32, location: 15, consistency: 5, total: 72 }
        if (prevScores.total > 50) return { speed: 15, accuracy: 25, location: 10, consistency: 5, total: 55 }
        return { speed: 24, accuracy: 40, location: 18, consistency: 3, total: 85 }
      })
    }, 5000) // Change score every 5 seconds to simulate updates
    return () => clearInterval(interval)
  }, [])

  const getBadgeStyle = () => {
    if (scores.total >= 80) {
      return "bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-900 border-yellow-600/50" // Gold
    }
    if (scores.total >= 60) {
      return "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800 border-slate-500/50" // Silver
    }
    return "bg-gradient-to-br from-red-500 to-red-600 text-white border-red-800/50" // Red
  }

  return (
    <Popover>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <div className={cn(
                        "flex items-center justify-center h-8 w-8 rounded-full font-bold shadow-md border-2 cursor-pointer",
                        getBadgeStyle()
                        )}>
                            <span className="text-sm font-extrabold drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">{scores.total}</span>
                        </div>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>माझी कामगिरी गुणसंख्या</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-64" align="end">
            <div className="space-y-4">
                <div className="space-y-1">
                     <h4 className="font-medium leading-none font-headline">कामगिरीचे विश्लेषण</h4>
                     <p className="text-xs text-muted-foreground">तुमच्या गुणांचे ब्रेकडाउन.</p>
                </div>
                <div className="space-y-2">
                    <ScoreItem label="वेग" score={scores.speed} maxScore={30} />
                    <ScoreItem label="अचूकता" score={scores.accuracy} maxScore={45} />
                    <ScoreItem label="स्थान" score={scores.location} maxScore={20} />
                    <ScoreItem label="सातत्य" score={scores.consistency} maxScore={5} />
                </div>
                <Separator />
                <div className="flex justify-between items-center font-bold text-base">
                    <span>एकूण गुण:</span>
                    <span>{scores.total} / 100</span>
                </div>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default PerformanceBadge
