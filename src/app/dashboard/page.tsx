
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, CheckCircle2, ListTodo, Ruler, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import SurveyMap from "@/components/survey-map"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  const fieldBoys = ["सुनील पवार", "अनिल शिंदे", "राजेश पाटील", "कविता जाधव"];
  const warshirs = ["महेश देशमुख", "संजय गायकवाड", "विक्रम राठोड", "पूजा चव्हाण"];
  const farmerFirstNames = ["रमेश", "सुरेश", "गणेश", "प्रिया", "प्रकाश", "अनिता", "सचिन", "दीपा"];
  const farmerLastNames = ["कुलकर्णी", "पाटील", "जाधव", "शिंदे", "मोरे", "गायकवाड", "चव्हाण", "देशमुख"];


  for (let i = 1; i <= count; i++) {
    const status = i % 3 === 0 ? "Rejected" : i % 2 === 0 ? "Pending" : "Approved";
    const village = ["चाकूर", "अहमदपूर", "उदगीर", "निलंगा"][i % 4];
    const taluka = ["लातूर", "औसा", "उदगीर", "निलंगा"][i % 4];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      surveyDate: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      surveyStatus: status,
      surveyStage: i % 2 === 0 ? "Data Entry" : "Completed",
      surveyedBy: fieldBoys[i % 4],
      warshir: warshirs[i % 4],
      reassignedTo: i % 5 === 0 ? fieldBoys[(i + 1) % 4] : "-",
      lastUpdated: `2023-10-${String((i % 30) + 2).padStart(2, '0')}`,
      farmerName: `${farmerFirstNames[i % farmerFirstNames.length]} ${farmerLastNames[i % farmerLastNames.length]}`,
      farmerContact: `9876543${String(i).padStart(3, '0')}`,
      state: "महाराष्ट्र",
      district: "लातूर",
      division: "पुणे विभाग",
      taluka: taluka,
      village: village,
      shiwar: `शिवार ${(i % 5) + 1}`,
      gatGroupNumber: `GAT-${String(123 + i)}`,
      surveyNumber: `SN-${String(456 + i)}`,
      areaAcre: Number((Math.random() * 5 + 1).toFixed(1)),
      gpsCoordinates: `${(18.40 + Math.random() * 0.1).toFixed(4)}, ${(76.57 + Math.random() * 0.1).toFixed(4)}`,
      caneType: ["अडसाली", "पूर्व-हंगामी", "सुरू"][i % 3],
      caneVariety: ["को-86032", "कोएम-0265", "एमएस-10001"][i % 3],
      cropCondition: ["चांगली", "मध्यम", "खराब"][i % 3],
      photoCount: Math.floor(Math.random() * 5) + 1,
      approvedBy: status === "Approved" ? "प्रशासक" : "-",
      approvalStatus: status,
      rejectionReason: status === "Rejected" ? "चुकीची माहिती" : "-",
      tokenNumber: status === "Approved" ? `TKN-${String(789 + i)}` : "-",
      tokenDate: status === "Approved" ? `2023-10-${String((i % 30) + 3).padStart(2, '0')}` : "-",
      otpVerified: i % 2 === 0 ? "Yes" : "No",
      cuttingPhotoUploaded: i % 2 === 0 ? "Yes" : "No",
      tonnageReceived: status === "Approved" ? Math.floor(Math.random() * 100 + 150) : 0,
      gatePassEntryDate: status === "Approved" ? `2023-11-${String((i % 28) + 1).padStart(2, '0')}` : "-",
      submittedFrom: i % 2 === 0 ? "Mobile" : "Web",
      offlineSync: i % 3 === 0 ? "Yes" : "No",
      createdOn: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedBy: ["सुनील पवार", "अनिल शिंदे", "प्रशासक"][i % 3],
      voiceNoteUploaded: i % 4 === 0 ? "Yes" : "No",
    });
  }
  return data;
};

export type Survey = {
  surveyId: string;
  surveyDate: string;
  surveyStatus: "Pending" | "Approved" | "Rejected";
  surveyStage: string;
  surveyedBy: string; // This will be used for 'Field Boy'
  warshir: string; // This will be used for 'Warshir'
  reassignedTo: string;
  lastUpdated: string;
  farmerName: string;
  farmerContact: string;
  state: string;
  district: string;
  division: string;
  taluka: string;
  village: string;
  shiwar: string;
  gatGroupNumber: string;
  surveyNumber: string;
  areaAcre: number;
  gpsCoordinates: string;
  caneType: string;
  caneVariety: string;
  cropCondition: string;
  photoCount: number;
  approvedBy: string;
  approvalStatus: "Pending" | "Approved" | "Rejected";
  rejectionReason: string;
  tokenNumber: string;
  tokenDate: string;
  otpVerified: "Yes" | "No";
  cuttingPhotoUploaded: "Yes" | "No";
  tonnageReceived: number;
  gatePassEntryDate: string;
  submittedFrom: "Web" | "Mobile";
  offlineSync: "Yes" | "No";
  createdOn: string;
  updatedBy: string;
  voiceNoteUploaded: "Yes" | "No";
}

export const columns: ColumnDef<Survey>[] = [
  {
    accessorKey: "farmerName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        शेतकऱ्याचे नाव
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
        const survey = row.original
        return (
            <Link href={`/dashboard/farmer/${survey.surveyId}`} className="hover:underline">
                {row.getValue("farmerName")}
            </Link>
        )
    }
  },
  {
    accessorKey: "surveyDate",
    header: "सर्वेक्षण तारीख",
  },
  {
    accessorKey: "surveyStatus",
    header: "सर्वेक्षण स्थिती",
    cell: ({ row }) => {
        const status = row.getValue("surveyStatus") as string;
        const statusTranslations: Record<string, string> = {
            "Approved": "मंजूर",
            "Pending": "प्रलंबित",
            "Rejected": "नाकारलेले"
        }
        return <Badge variant={status === "Approved" ? "default" : status === "Pending" ? "secondary" : "destructive"}>{statusTranslations[status] || status}</Badge>;
    }
  },
  {
    accessorKey: "surveyedBy",
    header: "फील्ड बॉय",
  },
   {
    accessorKey: "warshir",
    header: "वारशिर",
  },
  {
    accessorKey: "village",
    header: "गाव",
  },
  {
    accessorKey: "taluka",
    header: "तालुका",
  },
  {
    accessorKey: "district",
    header: "जिल्हा",
  },
  {
    accessorKey: "areaAcre",
    header: "क्षेत्र (एकर)",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const survey = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">मेनू उघडा</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(survey.surveyId)}
            >
              सर्वेक्षण आयडी कॉपी करा
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/farmer/${survey.surveyId}`}>
                    तपशील पहा
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function SurveyDataTable({data, isLoading}: {data: Survey[], isLoading: boolean}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
        pagination: {
            pageSize: 10,
        },
    }
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">सर्वेक्षण</CardTitle>
        <CardDescription>
          प्रणालीतील सर्व शेत सर्वेक्षणांची विस्तृत यादी.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
            <div className="flex items-center gap-4 py-4">
                <Input
                placeholder="शेतकऱ्याच्या नावाने फिल्टर करा..."
                value={(table.getColumn("farmerName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("farmerName")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id} className="whitespace-nowrap">
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        )
                        })}
                    </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                      [...Array(10)].map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={columns.length} className="py-0">
                            <Skeleton className="w-full h-12" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                          <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          >
                          {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="whitespace-nowrap">
                              {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                              )}
                              </TableCell>
                          ))}
                          </TableRow>
                      ))
                    ) : (
                      <TableRow>
                          <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                          >
                          परिणाम नाहीत.
                          </TableCell>
                      </TableRow>
                    )}
                </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} पैकी{" "}
                {table.getFilteredRowModel().rows.length} पंक्ती निवडल्या.
                </div>
                <div className="space-x-2 flex items-center">
                    <span className="text-sm text-muted-foreground">प्रति पृष्ठ पंक्ती</span>
                     <Select
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                        defaultValue={table.getState().pagination.pageSize.toString()}
                        >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 25, 50, 100].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    पृष्ठ {table.getState().pagination.pageIndex + 1} पैकी{" "}
                    {table.getPageCount()}
                </div>
                <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    मागील
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    पुढील
                </Button>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}


const stats = [
  {
    title: "एकूण सर्वेक्षण",
    value: "1,250",
    icon: <ListTodo className="h-6 w-6 text-muted-foreground" />,
    change: "+12.5% मागच्या महिन्यापेक्षा",
  },
  {
    title: "मंजूर सर्वेक्षण",
    value: "980",
    icon: <CheckCircle2 className="h-6 w-6 text-muted-foreground" />,
    change: "+5.2% मागच्या महिन्यापेक्षा",
  },
  {
    title: "एकूण क्षेत्र (हेक्टर)",
    value: "4,521",
    icon: <Ruler className="h-6 w-6 text-muted-foreground" />,
    change: "+8.1% मागच्या महिन्यापेक्षा",
  },
  {
    title: "अपेक्षित उत्पादन (टन)",
    value: "22,605",
    icon: <BarChart3 className="h-6 w-6 text-muted-foreground" />,
    change: "+2.3% मागच्या महिन्यापेक्षा",
  },
]


export default function DashboardPage() {
  const [surveys, setSurveys] = React.useState<Survey[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setSurveys(generateSurveyData(100));
      setIsLoading(false);
    }, 1000); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <SurveyDataTable data={surveys} isLoading={isLoading} />
      </div>


      <Card>
        <CardHeader>
          <CardTitle className="font-headline">सर्वेक्षण क्षेत्र नकाशा</CardTitle>
          <CardDescription>लातूर, महाराष्ट्र मधील सर्वेक्षण घनतेचे दृश्य प्रतिनिधित्व.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="w-full h-96 rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                 <SurveyMap surveys={surveys} />
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
