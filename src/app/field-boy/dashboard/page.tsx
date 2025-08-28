
"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, CalendarClock } from "lucide-react"
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

type SurveyStatus = "Pending" | "Approved" | "Rejected" | "Draft" | "Assigned";

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
  daysLeft?: number;
}

const mockSurveys: Survey[] = [
  { id: "SUR001", day: "३०", month: "जून", farmerName: "सचिन कुलकर्णी", surveyCode: "को ०२३८", date: "2024-08-12", taluka: "अहमदपूर", village: "मोहगाव", status: "Pending", daysLeft: 2 },
  { id: "SUR002", day: "२९", month: "जून", farmerName: "विशाल मोरे", surveyCode: "को ०२३८", date: "2024-08-12", taluka: "अहमदपूर", village: "मोहगाव", status: "Approved" },
  { id: "SUR003", day: "२८", month: "जून", farmerName: "अजय पाटील", surveyCode: "को ०२३८", date: "2024-08-12", taluka: "अहमदपूर", village: "मोहगाव", status: "Rejected" },
  { id: "SUR004", day: "२७", month: "जून", farmerName: "सुनीता मोरे", surveyCode: "को ०२३८", date: "2024-08-12", taluka: "लातूर", village: "कासारवाडी", status: "Pending", daysLeft: 4 },
  { id: "SUR005", day: "२६", month: "जून", farmerName: "कविता देशमुख", surveyCode: "को ०२३८", date: "2024-08-12", taluka: "औसा", village: "लामजना", status: "Approved" },
  { id: "SUR006", day: "२५", month: "जून", farmerName: "राहुल जाधव", surveyCode: "को ०२३८", date: "2024-08-12", taluka: "लातूर", village: "कासारवाडी", status: "Draft" },
  { id: "SUR007", day: "२४", month: "जून", farmerName: "रमेश शिंदे", surveyCode: "को ८६०३२", date: "2024-08-14", taluka: "अहमदपूर", village: "मोहगाव", status: "Assigned", daysLeft: 5 },
  { id: "SUR008", day: "२३", month: "जून", farmerName: "नवीन ड्राफ्ट", surveyCode: "को ८६०३२", date: "2024-08-15", taluka: "अहमदपूर", village: "मोहगाव", status: "Draft" },
  { id: "SUR009", day: "२२", month: "जून", farmerName: "दुसरे प्रलंबित", surveyCode: "को ८६०३२", date: "2024-08-13", taluka: "लातूर", village: "कासारवाडी", status: "Pending", daysLeft: 1 },
  { id: "SUR010", day: "२१", month: "जून", farmerName: "नवीन नाकारलेले", surveyCode: "को ८६०३२", date: "2024-08-16", taluka: "औसा", village: "लामजना", status: "Rejected" },
  { id: "SUR011", day: "२०", month: "जून", farmerName: "दुसरे नियुक्त", surveyCode: "को ८६०३२", date: "2024-08-14", taluka: "अहमदपूर", village: "मोहगाव", status: "Assigned", daysLeft: 3 },
]

const statusTranslations: Record<SurveyStatus, string> = {
    "Pending": "प्रलंबित",
    "Approved": "रांगेत",
    "Rejected": "नाकारलेले",
    "Draft": "ड्राफ्ट",
    "Assigned": "नियुक्त"
}

const statusStyles: Record<SurveyStatus, string> = {
    "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Approved": "bg-green-100 text-green-800 border-green-200",
    "Rejected": "bg-red-100 text-red-800 border-red-200",
    "Draft": "bg-gray-100 text-gray-800 border-gray-200",
    "Assigned": "bg-blue-100 text-blue-800 border-blue-200"
}

const statusTextStyles: Record<SurveyStatus, string> = {
    "Pending": "text-yellow-600",
    "Approved": "text-green-600",
    "Rejected": "text-red-600",
    "Draft": "text-gray-600",
    "Assigned": "text-blue-600"
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
                    <div className="flex-grow space-y-1">
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
                         {(survey.status === 'Assigned' || survey.status === 'Pending') && survey.daysLeft !== undefined && (
                            <div className={cn("flex items-center text-xs font-medium", survey.status === 'Assigned' ? 'text-blue-600' : 'text-yellow-600')}>
                                <CalendarClock className="h-3 w-3 mr-1"/>
                                <span>{survey.daysLeft} दिवस बाकी</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cn(
                    "absolute top-0 right-0 bottom-0 flex items-center justify-center w-8 [writing-mode:vertical-rl]",
                     statusStyles[survey.status]
                )}>
                     <span className={cn("text-xs font-semibold uppercase tracking-wider", statusTextStyles[survey.status])}>
                        {statusTranslations[survey.status]}
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

  const filteredSurveys = surveys
    .filter(survey => {
        const matchesSearch = survey.farmerName.toLowerCase().includes(search.toLowerCase()) || survey.village.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === "all" || survey.status.toLowerCase() === statusFilter
        return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
        const statusOrder: Record<SurveyStatus, number> = {
            'Draft': 1,
            'Approved': 2,
            'Pending': 3,
            'Assigned': 4,
            'Rejected': 5,
        };

        if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
        }

        // Secondary sorting logic
        switch (a.status) {
            case 'Pending':
            case 'Assigned':
                return (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity);
            case 'Draft':
            case 'Approved':
            case 'Rejected':
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            default:
                return 0;
        }
    });


  return (
    <div className="flex flex-col gap-4 h-full">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="शोधा..."
                className="w-full rounded-lg bg-background pl-8 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-auto h-9">
                <SelectValue placeholder="स्थिती" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">सर्व</SelectItem>
                <SelectItem value="assigned">नियुक्त</SelectItem>
                <SelectItem value="pending">प्रलंबित</SelectItem>
                <SelectItem value="approved">रांगेत</SelectItem>
                <SelectItem value="rejected">नाकारलेले</SelectItem>
                <SelectItem value="draft">ड्राफ्ट</SelectItem>
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
                <p className="text-muted-foreground">सर्वेक्षण आढळले नाहीत.</p>
            </div>
            )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
            <Button asChild className="h-16 w-auto px-6 rounded-full shadow-lg text-lg bg-primary hover:bg-primary/90">
            <Link href="/field-boy/dashboard/new">
                <Plus className="mr-2 h-6 w-6" />
                सर्वेक्षण
            </Link>
            </Button>
        </div>

    </div>
  )
}
