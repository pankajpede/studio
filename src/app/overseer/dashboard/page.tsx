
"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, Check, X, MoreHorizontal, UserPlus, Clock } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SurveyStatus = "Pending" | "Approved" | "Rejected" | "Assigned";

type Survey = {
  surveyId: string;
  farmerName: string;
  fieldBoy: string;
  village: string;
  area: number;
  status: SurveyStatus;
  assignedDate: string;
  submissionDate?: string;
}

const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  const fieldBoys = ["सुनील पवार", "अनिल शिंदे", "राजेश पाटील", "कविता जाधव", "विक्रम राठोड", "संजय गायकवाड"];
  const farmerFirstNames = ["रमेश", "सुरेश", "गणेश", "प्रिया", "प्रकाश", "अनिता"];
  const farmerLastNames = ["कुलकर्णी", "पाटील", "जाधव", "शिंदे", "मोरे", "गायकवाड"];
  const villages = ["चाकूर", "अहमदपूर", "उदगीर", "निलंगा"];
  const statuses: SurveyStatus[] = ["Pending", "Approved", "Rejected", "Assigned"];

  for (let i = 1; i <= count; i++) {
    const status = statuses[i % statuses.length];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      farmerName: `${farmerFirstNames[i % farmerFirstNames.length]} ${farmerLastNames[i % farmerLastNames.length]}`,
      fieldBoy: fieldBoys[i % fieldBoys.length],
      village: villages[i % villages.length],
      area: Number((Math.random() * 2 + 0.5).toFixed(2)),
      status,
      assignedDate: `2024-07-${String((i % 28) + 1).padStart(2, '0')}`,
      submissionDate: status !== 'Assigned' ? `2024-07-${String((i % 28) + 2).padStart(2, '0')}` : undefined,
    });
  }
  return data;
};


const statusTranslations: Record<SurveyStatus, string> = {
    "Pending": "प्रलंबित",
    "Approved": "मंजूर",
    "Rejected": "नाकारलेले",
    "Assigned": "नियुक्त"
}
const statusTextStyles: Record<SurveyStatus, string> = {
    "Pending": "text-yellow-600",
    "Approved": "text-green-600",
    "Rejected": "text-red-600",
    "Assigned": "text-blue-600"
}
const statusIcon: Record<SurveyStatus, React.ReactNode> = {
    "Pending": <Clock className="h-4 w-4" />,
    "Approved": <Check className="h-4 w-4" />,
    "Rejected": <X className="h-4 w-4" />,
    "Assigned": <UserPlus className="h-4 w-4" />
}

const SurveyCard = ({ survey }: { survey: Survey }) => {
    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg">{survey.farmerName}</h3>
                        <p className="text-sm text-muted-foreground">{survey.village}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">मेनू उघडा</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>तपशील पहा</DropdownMenuItem>
                            <DropdownMenuItem>पुन्हा नियुक्त करा</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">हटवा</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>फील्ड बॉय: <span className="font-medium text-foreground">{survey.fieldBoy}</span></span>
                    <span>क्षेत्र: <span className="font-medium text-foreground">{survey.area} हेक्टर</span></span>
                </div>
                
                 <div className={cn("flex items-center gap-2 p-2 rounded-md", statusTextStyles[survey.status])}>
                    {statusIcon[survey.status]}
                    <span className="font-semibold text-sm">{statusTranslations[survey.status]}</span>
                    <span className="text-xs ml-auto">{survey.submissionDate || survey.assignedDate}</span>
                </div>

            </div>
            {survey.status === 'Pending' && (
                <div className="bg-muted/50 px-4 py-2 flex gap-2 border-t">
                    <Button variant="outline" size="sm" className="w-full h-8 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
                        <Check className="h-4 w-4 mr-1"/> मंजूर करा
                    </Button>
                    <Button variant="outline" size="sm" className="w-full h-8 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                        <X className="h-4 w-4 mr-1"/> नाकारा
                    </Button>
                </div>
            )}
        </div>
    );
};


export default function OverseerDashboard() {
  const [data, setData] = React.useState<Survey[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(generateSurveyData(50));
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredSurveys = data.filter(survey => {
    const matchesSearch = survey.farmerName.toLowerCase().includes(search.toLowerCase()) || survey.village.toLowerCase().includes(search.toLowerCase()) || survey.fieldBoy.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-4 h-full">
         <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="शेतकरी, फील्ड बॉय, गाव शोधा..."
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
                    <SelectItem value="all">सर्व स्थिती</SelectItem>
                    <SelectItem value="Pending">प्रलंबित</SelectItem>
                    <SelectItem value="Approved">मंजूर</SelectItem>
                    <SelectItem value="Rejected">नाकारलेले</SelectItem>
                    <SelectItem value="Assigned">नियुक्त</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="flex-grow flex flex-col gap-3 pb-24">
            {filteredSurveys.length > 0 ? (
                filteredSurveys.map((survey) => (
                    <SurveyCard key={survey.surveyId} survey={survey} />
                ))
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-muted-foreground">सर्वेक्षण आढळले नाहीत.</p>
                </div>
            )}
        </div>

        <div className="fixed bottom-6 right-6 z-50">
            <Button asChild className="h-16 w-auto px-6 rounded-full shadow-lg text-lg bg-primary hover:bg-primary/90">
                <Link href="/overseer/dashboard/new">
                    <UserPlus className="mr-2 h-6 w-6" />
                    सर्वेक्षण नियुक्त करा
                </Link>
            </Button>
        </div>
    </div>
  )
}
