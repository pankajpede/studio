
"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type SurveyStatus = "Pending" | "Approved" | "Rejected";

type Survey = {
  id: string
  day: string
  month: string
  farmerName: string
  surveyCode: string
  date: string
  taluka: string
  village: string
  status: SurveyStatus
}

const mockSurveys: Survey[] = [
  { id: "SUR001", day: "30", month: "June", farmerName: "Sachin Kulkarni", surveyCode: "Co 0238", date: "12 Aug 2024", taluka: "Ahmedpur", village: "Mohgaon", status: "Pending" },
  { id: "SUR002", day: "29", month: "June", farmerName: "Vishal More", surveyCode: "Co 0238", date: "12 Aug 2024", taluka: "Ahmedpur", village: "Mohgaon", status: "Approved" },
  { id: "SUR003", day: "28", month: "June", farmerName: "Ajay Patil", surveyCode: "Co 0238", date: "12 Aug 2024", taluka: "Ahmedpur", village: "Mohgaon", status: "Rejected" },
  { id: "SUR004", day: "27", month: "June", farmerName: "Sunita More", surveyCode: "Co 0238", date: "12 Aug 2024", taluka: "Latur", village: "Kasarwadi", status: "Pending" },
  { id: "SUR005", day: "26", month: "June", farmerName: "Kavita Deshmukh", surveyCode: "Co 0238", date: "12 Aug 2024", taluka: "Ausa", village: "Lamjana", status: "Approved" },
]


const statusStyles: Record<SurveyStatus, string> = {
    "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Approved": "bg-green-100 text-green-800 border-green-200",
    "Rejected": "bg-red-100 text-red-800 border-red-200",
}

const statusTextStyles: Record<SurveyStatus, string> = {
    "Pending": "text-yellow-600",
    "Approved": "text-green-600",
    "Rejected": "text-red-600",
}

const SurveyCard = ({ survey }: { survey: Survey }) => {
    return (
        <Link href={`/field-boy/dashboard/survey/${survey.id}`} className="block">
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border overflow-hidden relative transition-all hover:shadow-md hover:border-primary/50">
                <div className="p-4 flex items-center gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <span className="text-2xl font-bold">{survey.day}</span>
                        <span className="text-xs uppercase">{survey.month}</span>
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg">{survey.farmerName}</h3>
                        <p className="text-sm text-muted-foreground">
                            <span>{survey.surveyCode}</span>
                            <span className="mx-1">•</span>
                            <span>{survey.date}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <span>{survey.taluka}</span>
                            <span className="mx-1">•</span>
                            <span>{survey.village}</span>
                        </p>
                    </div>
                </div>
                <div className={cn(
                    "absolute top-0 right-0 bottom-0 flex items-center justify-center w-8 [writing-mode:vertical-rl]",
                     statusStyles[survey.status]
                )}>
                     <span className={cn("text-xs font-semibold uppercase tracking-wider", statusTextStyles[survey.status])}>
                        {survey.status === 'Approved' ? 'Queued' : survey.status}
                    </span>
                </div>
            </div>
        </Link>
    );
};


export default function FieldBoyDashboard() {
  const [surveys, setSurveys] = React.useState<Survey[]>(mockSurveys)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.farmerName.toLowerCase().includes(search.toLowerCase()) || survey.village.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-4 h-full">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-auto h-9">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Queued</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
            </Select>
        </div>

        {/* Survey List */}
        <div className="flex-grow flex flex-col gap-3 pb-24">
            {filteredSurveys.length > 0 ? (
            filteredSurveys.map((survey) => (
                <SurveyCard key={survey.id} survey={survey} />
            ))
            ) : (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-muted-foreground">No surveys found.</p>
            </div>
            )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
            <Button asChild className="h-16 w-auto px-6 rounded-full shadow-lg text-lg bg-primary hover:bg-primary/90">
            <Link href="/field-boy/dashboard/new">
                <Plus className="mr-2 h-6 w-6" />
                Survey
            </Link>
            </Button>
        </div>

    </div>
  )
}
