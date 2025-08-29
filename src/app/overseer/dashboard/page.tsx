
"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, Check, X, MoreHorizontal, UserPlus, Clock, CalendarClock } from "lucide-react"
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Phone } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

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
  pendingDays?: number;
}

const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  const fieldBoys = ["सुनील पवार", "अनिल शिंदे", "राजेश पाटील", "कविता जाधव", "विक्रम राठोड", "संजय गायकवाड"];
  const farmerFirstNames = ["रमेश", "सुरेश", "गणेश", "प्रिया", "प्रकाश", "अनिता", "सचिन", "दीपा"];
  const farmerLastNames = ["कुलकर्णी", "पाटील", "जाधव", "शिंदे", "मोरे", "गायकवाड", "चव्हाण", "देशमुख"];
  const villages = ["चाकूर", "अहमदपूर", "उदगीर", "निलंगा"];
  const talukas = ["लातूर", "औसा", "उदगीर", "निलंगा"];
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
      submissionDate: status !== 'Assigned' ? `2024-07-${String((i % 28) + 2).padStart(2, '0')}` : undefined,
      daysLeft: (status === 'Assigned') ? Math.floor(Math.random() * 7) + 1 : undefined,
      pendingDays: (status === 'Pending') ? Math.floor(Math.random() * 10) + 1 : undefined,
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
const statusStyles: Record<SurveyStatus, string> = {
    "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Approved": "bg-green-100 text-green-800 border-green-200",
    "Rejected": "bg-red-100 text-red-800 border-red-200",
    "Assigned": "bg-blue-100 text-blue-800 border-blue-200"
}
const statusTextStyles: Record<SurveyStatus, string> = {
    "Pending": "text-yellow-600",
    "Approved": "text-green-600",
    "Rejected": "text-red-600",
    "Assigned": "text-blue-600"
}

const marathiMonths: { [key: string]: string } = {
    'January': 'जानेवारी', 'February': 'फेब्रुवारी', 'March': 'मार्च', 'April': 'एप्रिल',
    'May': 'मे', 'June': 'जून', 'July': 'जुलै', 'August': 'ऑगस्ट',
    'September': 'सप्टेंबर', 'October': 'ऑक्टोबर', 'November': 'नोव्हेंबर', 'December': 'डिसेंबर'
};

const SurveyCard = ({ survey }: { survey: Survey }) => {
    const displayDate = new Date(survey.submissionDate || survey.assignedDate);
    const day = format(displayDate, 'dd');
    const month = marathiMonths[format(displayDate, 'MMMM')];

    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border overflow-hidden relative transition-all hover:shadow-md hover:border-primary/50">
            <div className="p-4 flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                    <span className="text-2xl font-bold">{day}</span>
                    <span className="text-xs uppercase">{month}</span>
                </div>
                <div className="flex-grow space-y-1">
                    <h3 className="font-bold text-lg">{survey.farmerName}</h3>
                    <p className="text-sm text-muted-foreground">{survey.taluka} &gt; {survey.village}</p>
                    {survey.status === 'Assigned' && survey.daysLeft !== undefined && (
                        <div className="flex items-center text-xs font-medium text-blue-600">
                            <CalendarClock className="h-3 w-3 mr-1"/>
                            <span>{survey.daysLeft} दिवस बाकी</span>
                        </div>
                    )}
                    {survey.status === 'Pending' && survey.pendingDays && survey.pendingDays > 7 && (
                        <Badge variant="destructive" className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500/80">
                            <Clock className="mr-1 h-3 w-3" />
                            ७ दिवसांपेक्षा जास्त प्रतीक्षेत
                        </Badge>
                    )}
                     <p className="text-sm text-muted-foreground pt-1">
                        फील्ड बॉय: <span className="font-medium text-foreground">{survey.fieldBoy}</span>
                    </p>
                </div>
                <div className="text-right">
                     <p className="text-sm text-muted-foreground">क्षेत्र: <span className="font-medium text-foreground">{survey.area} हेक्टर</span></p>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 self-start -mr-2 -mt-2">
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

            <div className={cn(
                "absolute top-0 right-0 bottom-0 flex items-center justify-center w-8 [writing-mode:vertical-rl]",
                 statusStyles[survey.status]
            )}>
                 <span className={cn("text-xs font-semibold uppercase tracking-wider", statusTextStyles[survey.status])}>
                    {statusTranslations[survey.status]}
                </span>
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
  const [isOfficerModalOpen, setIsOfficerModalOpen] = React.useState(false);

  const agriOfficer = {
      name: "श्री. राजेश कुमार",
      mobile: "9123456789"
  }

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(generateSurveyData(50));
      setIsLoading(false);
      
      const modalShown = sessionStorage.getItem('officerModalShown');
      if (!modalShown) {
        setIsOfficerModalOpen(true);
        sessionStorage.setItem('officerModalShown', 'true');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredSurveys = data.filter(survey => {
    const matchesSearch = survey.farmerName.toLowerCase().includes(search.toLowerCase()) || survey.village.toLowerCase().includes(search.toLowerCase()) || survey.fieldBoy.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
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
        <Dialog open={isOfficerModalOpen} onOpenChange={setIsOfficerModalOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center font-headline text-2xl">नवीन कृषी अधिकारी नियुक्त</DialogTitle>
                    <DialogDescription className="text-center">
                        तुमच्या माहितीसाठी, तुमचे रिपोर्टिंग कृषी अधिकारी बदलले आहेत.
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
                        <Button type="button" className="w-full">ठीक आहे</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  )
}
