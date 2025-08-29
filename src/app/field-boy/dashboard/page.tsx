
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
import { format, addDays } from "date-fns"

type SurveyStatus = "Pending" | "Approved" | "Rejected" | "Draft" | "Assigned";

type Survey = {
  id: string
  farmerName: string
  date: string
  taluka: string
  village: string
  status: SurveyStatus
  daysLeft?: number;
}

const mockSurveys: Survey[] = [
  { id: "SUR001", farmerName: "सचिन कुलकर्णी", date: "2024-06-30", taluka: "अहमदपूर", village: "मोहगाव", status: "Pending", daysLeft: 2 },
  { id: "SUR002", farmerName: "विशाल मोरे", date: "2024-06-29", taluka: "अहमदपूर", village: "मोहगाव", status: "Approved" },
  { id: "SUR003", farmerName: "अजय पाटील", date: "2024-06-28", taluka: "अहमदपूर", village: "मोहगाव", status: "Rejected", daysLeft: 6 },
  { id: "SUR004", farmerName: "सुनीता मोरे", date: "2024-06-27", taluka: "लातूर", village: "कासारवाडी", status: "Pending", daysLeft: 4 },
  { id: "SUR005", farmerName: "कविता देशमुख", date: "2024-06-26", taluka: "औसा", village: "लामजना", status: "Approved" },
  { id: "SUR006", farmerName: "राहुल जाधव", date: "2024-06-25", taluka: "लातूर", village: "कासारवाडी", status: "Draft" },
  { id: "SUR007", farmerName: "रमेश शिंदे", date: "2024-06-24", taluka: "अहमदपूर", village: "मोहगाव", status: "Assigned", daysLeft: 5 },
  { id: "SUR008", farmerName: "संजय देशमुख", date: "2024-06-23", taluka: "अहमदपूर", village: "मोहगाव", status: "Draft" },
  { id: "SUR009", farmerName: "अमित कुमार", date: "2024-06-22", taluka: "लातूर", village: "कासारवाडी", status: "Pending", daysLeft: 1 },
  { id: "SUR010", farmerName: "पूजा गायकवाड", date: "2024-06-21", taluka: "औसा", village: "लामजना", status: "Rejected", daysLeft: 3 },
  { id: "SUR011", farmerName: "संजय मेहरा", date: "2024-06-20", taluka: "अहमदपूर", village: "मोहगाव", status: "Assigned", daysLeft: 3 },
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

const marathiMonths: { [key: string]: string } = {
    'January': 'जानेवारी', 'February': 'फेब्रुवारी', 'March': 'मार्च', 'April': 'एप्रिल',
    'May': 'मे', 'June': 'जून', 'July': 'जुलै', 'August': 'ऑगस्ट',
    'September': 'सप्टेंबर', 'October': 'ऑक्टोबर', 'November': 'नोव्हेंबर', 'December': 'डिसेंबर'
};

const SurveyCard = ({ survey }: { survey: Survey }) => {
    let day = "";
    let month = "";
    let submissionDate = "";
    let linkHref = `/field-boy/dashboard/survey/${survey.id}`;

    const originalDate = new Date(survey.date);
    submissionDate = format(originalDate, 'dd/MM/yyyy');
    
    if (survey.status === 'Rejected') {
        const dueDate = addDays(originalDate, 7);
        day = format(dueDate, 'dd');
        month = marathiMonths[format(dueDate, 'MMMM')];
    } else {
        day = format(originalDate, 'dd');
        month = marathiMonths[format(originalDate, 'MMMM')];
    }
    
    if (survey.status === 'Draft') {
      linkHref = `/field-boy/dashboard/new?edit=${survey.id}`;
    }

    return (
        <Link href={linkHref} className="block">
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border overflow-hidden relative transition-all hover:shadow-md hover:border-primary/50">
                <div className="p-4 flex items-center gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <span className="text-2xl font-bold">{day}</span>
                        <span className="text-xs uppercase">{month}</span>
                    </div>
                    <div className="flex-grow space-y-1">
                        <h3 className="font-bold text-lg">{survey.farmerName}</h3>
                        <p className="text-sm text-muted-foreground">
                             {(survey.status === 'Rejected') && (
                                <>
                                  <span>{submissionDate}</span>
                                  <span className="mx-1">•</span>
                                </>
                            )}
                            <span>{survey.taluka} &gt; {survey.village}</span>
                        </p>
                         {(survey.status === 'Assigned' || survey.status === 'Pending' || survey.status === 'Rejected') && survey.daysLeft !== undefined && (
                            <div className={cn("flex items-center text-xs font-medium", statusTextStyles[survey.status])}>
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
            'Rejected': 2,
            'Approved': 3,
            'Assigned': 4,
            'Pending': 5,
        };

        if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
        }

        // Secondary sorting logic
        switch (a.status) {
            case 'Pending':
            case 'Assigned':
            case 'Rejected':
                return (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity);
            case 'Draft':
            case 'Approved':
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
