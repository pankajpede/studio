
"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, Check, X, MoreHorizontal, UserPlus, Clock, ChevronDown, Phone } from "lucide-react"
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type SurveyStatus = "Pending" | "Approved" | "Rejected" | "Assigned";

type Survey = {
  surveyId: string;
  farmerName: string;
  fieldBoy: string;
  village: string;
  taluka: string;
  area: number;
  status: SurveyStatus;
  assignedDate: string;
  submissionDate?: string;
  daysLeft?: number;
}

const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  const fieldBoys = ["Sunil Pawar", "Anil Shinde", "Rajesh Patil", "Kavita Jadhav", "Vikram Rathod", "Sanjay Gaikwad"];
  const farmerFirstNames = ["Ramesh", "Suresh", "Ganesh", "Priya", "Prakash", "Anita"];
  const farmerLastNames = ["Kulkarni", "Patil", "Jadhav", "Shinde", "More", "Gaikwad"];
  const villages = ["Chakur", "Ahmedpur", "Udgir", "Nilanga"];
  const talukas = ["Latur", "Ausa", "Udgir", "Nilanga"];
  const statuses: SurveyStatus[] = ["Pending", "Approved", "Rejected", "Assigned"];

  for (let i = 1; i <= count; i++) {
    const status = statuses[i % statuses.length];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      farmerName: `${farmerFirstNames[i % farmerFirstNames.length]} ${farmerLastNames[i % farmerLastNames.length]}`,
      fieldBoy: fieldBoys[i % fieldBoys.length],
      village: villages[i % villages.length],
      taluka: talukas[i % talukas.length],
      area: Number((Math.random() * 2 + 0.5).toFixed(2)),
      status,
      assignedDate: `2024-07-${String((i % 28) + 1).padStart(2, '0')}`,
      submissionDate: status === 'Pending' || status === 'Approved' || status === 'Rejected' ? `2024-07-${String((i % 28) + 2).padStart(2, '0')}` : undefined,
      daysLeft: (status === 'Pending' || status === 'Assigned') ? Math.floor(Math.random() * 7) + 1 : undefined
    });
  }
  return data;
};


const statusTranslations: Record<SurveyStatus, string> = {
    "Pending": "Pending",
    "Approved": "Approved",
    "Rejected": "Rejected",
    "Assigned": "Assigned"
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

const statusOptions: { value: SurveyStatus, label: string }[] = [
    { value: "Pending", label: "Pending" },
    { value: "Assigned", label: "Assigned" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
];


const SurveyCard = ({ survey }: { survey: Survey }) => {
    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border overflow-hidden">
            <Link href={`/oversheer/dashboard/survey/${survey.surveyId}`} className="block p-4 space-y-3 hover:bg-muted/50">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg">{survey.farmerName}</h3>
                        <p className="text-sm text-muted-foreground">{survey.submissionDate || survey.assignedDate} • {survey.taluka} > {survey.village}</p>
                    </div>
                    <div className={cn("flex items-center gap-2 p-2 rounded-md", statusTextStyles[survey.status])}>
                        {statusIcon[survey.status]}
                        <span className="font-semibold text-sm">{statusTranslations[survey.status]}</span>
                    </div>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Field Boy: <span className="font-medium text-foreground">{survey.fieldBoy}</span></span>
                    <span>Area: <span className="font-medium text-foreground">{survey.area} Ha</span></span>
                </div>
            </Link>

            {(survey.status === 'Pending' || survey.status === 'Assigned') && (
                 <div className="bg-muted/50 px-4 py-2 flex items-center justify-between border-t">
                     <div className="flex items-center text-xs text-yellow-600 font-medium">
                        <Clock className="h-3 w-3 mr-1"/>
                        <span>
                            {survey.status === 'Assigned' 
                                ? `${survey.daysLeft} days left` 
                                : `Pending for ${survey.daysLeft} days`
                            }
                        </span>
                    </div>
                    {survey.status === 'Pending' && (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
                                <Check className="h-4 w-4 mr-1"/> Approve
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                                <X className="h-4 w-4 mr-1"/> Reject
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


export default function OversheerDashboard() {
  const [data, setData] = React.useState<Survey[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string[]>([])
  const [fieldBoyFilter, setFieldBoyFilter] = React.useState<string[]>([])
  const [isOfficerModalOpen, setIsOfficerModalOpen] = React.useState(false);
  
  // Mock Agri Officer Data
  const agriOfficer = {
      name: "Mr. Rajesh Kumar",
      mobile: "9123456789"
  }

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Filter out 'Approved' and 'Rejected' statuses from the initial data load
      const initialData = generateSurveyData(50).filter(s => s.status === 'Pending' || s.status === 'Assigned');
      setData(initialData);
      setIsLoading(false);
      
      // Open the modal once after the data loads
      setIsOfficerModalOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const uniqueFieldBoys = React.useMemo(() => {
      // Get field boys only from the currently relevant surveys
      const fieldBoysWithPendingOrAssigned = generateSurveyData(50).filter(s => s.status === 'Pending' || s.status === 'Assigned');
      return Array.from(new Set(fieldBoysWithPendingOrAssigned.map(s => s.fieldBoy)));
  }, []);


  const filteredSurveys = data.filter(survey => {
    const matchesSearch = survey.farmerName.toLowerCase().includes(search.toLowerCase()) || survey.village.toLowerCase().includes(search.toLowerCase()) || survey.fieldBoy.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(survey.status)
    const matchesFieldBoy = fieldBoyFilter.length === 0 || fieldBoyFilter.includes(survey.fieldBoy)
    return matchesSearch && matchesStatus && matchesFieldBoy
  })

  return (
    <>
    <div className="flex flex-col gap-4 h-full">
         <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search farmer, field boy, village..."
                    className="w-full rounded-lg bg-background pl-8 h-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9">
                        <span>Field Boy</span>
                        {fieldBoyFilter.length > 0 && <Badge variant="secondary" className="ml-2">{fieldBoyFilter.length}</Badge>}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Field Boy</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {uniqueFieldBoys.map(boy => (
                        <DropdownMenuCheckboxItem
                            key={boy}
                            checked={fieldBoyFilter.includes(boy)}
                            onCheckedChange={(checked) => {
                                setFieldBoyFilter(
                                    checked
                                    ? [...fieldBoyFilter, boy]
                                    : fieldBoyFilter.filter(b => b !== boy)
                                )
                            }}
                        >
                            {boy}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                     <Button variant="outline" className="h-9">
                        <span>Status</span>
                        {statusFilter.length > 0 && <Badge variant="secondary" className="ml-2">{statusFilter.length}</Badge>}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {statusOptions.filter(o => o.value === 'Pending' || o.value === 'Assigned').map(option => (
                         <DropdownMenuCheckboxItem
                            key={option.value}
                            checked={statusFilter.includes(option.value)}
                            onCheckedChange={(checked) => {
                                setStatusFilter(
                                    checked
                                    ? [...statusFilter, option.value]
                                    : statusFilter.filter(s => s !== option.value)
                                )
                            }}
                        >
                            {option.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

        </div>

        <div className="flex-grow flex flex-col gap-3 pb-24">
            {filteredSurveys.length > 0 ? (
                filteredSurveys.map((survey) => (
                    <SurveyCard key={survey.surveyId} survey={survey} />
                ))
            ) : (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-muted-foreground">No surveys found.</p>
                </div>
            )}
        </div>

        <div className="fixed bottom-6 right-6 z-50">
            <Button asChild className="h-16 w-auto px-6 rounded-full shadow-lg text-lg bg-primary hover:bg-primary/90">
                <Link href="/oversheer/dashboard/new">
                    <UserPlus className="mr-2 h-6 w-6" />
                    Assign Survey
                </Link>
            </Button>
        </div>
    </div>
    <Dialog open={isOfficerModalOpen} onOpenChange={setIsOfficerModalOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-center font-headline text-2xl">New Agri Officer Assigned</DialogTitle>
                <DialogDescription className="text-center">
                    For your information, your reporting Agri Officer has changed.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
                <div className="text-center">
                    <p className="font-bold text-lg">{agriOfficer.name}</p>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{agriOfficer.mobile}</span>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" className="w-full">OK</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
