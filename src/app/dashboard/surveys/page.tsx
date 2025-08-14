
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import Link from "next/link"

const data: Survey[] = [
  {
    surveyId: "SURV-001",
    surveyDate: "2023-10-01",
    surveyStatus: "Approved",
    surveyStage: "पूर्ण झाले",
    surveyedBy: "सुनील पवार",
    warshir: "महेश देशमुख",
    reassignedTo: "-",
    lastUpdated: "2023-10-02",
    farmerName: "रमेश कुलकर्णी",
    farmerContact: "9876543210",
    village: "चाकूर",
    taluka: "अहमदपूर",
    district: "लातूर",
    gatGroupNumber: "GAT-123",
    surveyNumber: "SN-456",
    areaAcre: 5.2,
    gpsCoordinates: "18.40, 76.57",
    caneType: "अडसाली",
    caneVariety: "को-86032",
    cropCondition: "चांगली",
    photoCount: 5,
    approvedBy: "प्रशासक",
    approvalStatus: "Approved",
    rejectionReason: "-",
    tokenNumber: "TKN-789",
    tokenDate: "2023-10-03",
    otpVerified: "Yes",
    cuttingPhotoUploaded: "Yes",
    tonnageReceived: 250,
    gatePassEntryDate: "2023-11-15",
    submittedFrom: "Mobile",
    offlineSync: "Yes",
    createdOn: "2023-10-01",
    updatedBy: "प्रशासक",
    voiceNoteUploaded: "No",
  },
  {
    surveyId: "SURV-002",
    surveyDate: "2023-10-02",
    surveyStatus: "Pending",
    surveyStage: "माहिती भरणे",
    surveyedBy: "अनिल शिंदे",
    warshir: "संजय गायकवाड",
    reassignedTo: "सुनील पवार",
    lastUpdated: "2023-10-03",
    farmerName: "सुरेश पाटील",
    farmerContact: "9876543211",
    village: "मोहगाव",
    taluka: "औसा",
    district: "लातूर",
    gatGroupNumber: "GAT-124",
    surveyNumber: "SN-457",
    areaAcre: 3.1,
    gpsCoordinates: "18.35, 76.50",
    caneType: "पूर्व-हंगामी",
    caneVariety: "कोएम-0265",
    cropCondition: "मध्यम",
    photoCount: 3,
    approvedBy: "-",
    approvalStatus: "Pending",
    rejectionReason: "-",
    tokenNumber: "-",
    tokenDate: "-",
    otpVerified: "No",
    cuttingPhotoUploaded: "No",
    tonnageReceived: 0,
    gatePassEntryDate: "-",
    submittedFrom: "Web",
    offlineSync: "No",
    createdOn: "2023-10-02",
    updatedBy: "अनिल शिंदे",
    voiceNoteUploaded: "Yes",
  },
  // Add more mock data entries here to test pagination
];


export type Survey = {
  surveyId: string;
  surveyDate: string;
  surveyStatus: "Pending" | "Approved" | "Rejected";
  surveyStage: string;
  surveyedBy: string;
  warshir: string;
  reassignedTo: string;
  lastUpdated: string;
  farmerName: string;
  farmerContact: string;
  village: string;
  taluka: string;
  district: string;
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="सर्व निवडा"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="पंक्ती निवडा"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "surveyId",
    header: "सर्वेक्षण आयडी",
  },
  {
    accessorKey: "surveyDate",
    header: "सर्वेक्षण तारीख",
     cell: ({ row }) => {
      const date = new Date(row.getValue("surveyDate"))
      return <div>{format(date, "dd/MM/yyyy")}</div>
    },
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
    accessorKey: "surveyStage",
    header: "सर्वेक्षण टप्पा",
  },
  {
    accessorKey: "surveyedBy",
    header: "सर्वेक्षक",
  },
  {
    accessorKey: "warshir",
    header: "वारशिर",
  },
  {
    accessorKey: "reassignedTo",
    header: "पुन्हा नियुक्त",
  },
  {
    accessorKey: "lastUpdated",
    header: "शेवटचे अद्यतन",
  },
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
  },
  {
    accessorKey: "farmerContact",
    header: "शेतकरी संपर्क",
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
    accessorKey: "gatGroupNumber",
    header: "गट/ग्रुप नंबर",
  },
  {
    accessorKey: "surveyNumber",
    header: "सर्वेक्षण नंबर",
  },
  {
    accessorKey: "areaAcre",
    header: "क्षेत्र (एकर)",
  },
  {
    accessorKey: "gpsCoordinates",
    header: "GPS कोऑर्डिनेट्स",
  },
  {
    accessorKey: "caneType",
    header: "उसाचा प्रकार",
  },
  {
    accessorKey: "caneVariety",
    header: "उसाची जात",
  },
  {
    accessorKey: "cropCondition",
    header: "पिकाची स्थिती",
  },
  {
    accessorKey: "photoCount",
    header: "फोटो संख्या",
  },
  {
    accessorKey: "approvedBy",
    header: "मंजूर करणारा",
  },
  {
    accessorKey: "approvalStatus",
    header: "मंजुरीची स्थिती",
  },
  {
    accessorKey: "rejectionReason",
    header: "नाकारण्याचे कारण",
  },
  {
    accessorKey: "tokenNumber",
    header: "टोकन नंबर",
  },
  {
    accessorKey: "tokenDate",
    header: "टोकन तारीख",
  },
  {
    accessorKey: "otpVerified",
    header: "OTP सत्यापित",
  },
  {
    accessorKey: "cuttingPhotoUploaded",
    header: "तोडणी फोटो अपलोड",
  },
  {
    accessorKey: "tonnageReceived",
    header: "प्राप्त टनेज",
  },
  {
    accessorKey: "gatePassEntryDate",
    header: "गेट पास प्रवेश तारीख",
  },
  {
    accessorKey: "submittedFrom",
    header: "सादर केले",
  },
  {
    accessorKey: "offlineSync",
    header: "ऑफलाइन सिंक",
  },
  {
    accessorKey: "createdOn",
    header: "तयार केले",
  },
  {
    accessorKey: "updatedBy",
    header: "अद्यतनित केले",
  },
  {
    accessorKey: "voiceNoteUploaded",
    header: "व्हॉइस नोट अपलोड",
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
            <DropdownMenuLabel>क्रिया</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(survey.surveyId)}
            >
              सर्वेक्षण आयडी कॉपी करा
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/farmer/${survey.surveyId}`}>तपशील पहा</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>सर्वेक्षण संपादित करा</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function ColumnToggleDropdown({ table }: { table: ReturnType<typeof useReactTable> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          स्तंभ <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>स्तंभ टॉगल करा</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            // Create a more readable label
            const label = column.id.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            )
          })}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AdvancedFilters({ table }: { table: ReturnType<typeof useReactTable> }) {
    const [date, setDate] = React.useState<DateRange | undefined>()
    const [minArea, setMinArea] = React.useState<string>("")
    const [maxArea, setMaxArea] = React.useState<string>("")
    
    const handleApply = () => {
        // Date filter
        table.getColumn("surveyDate")?.setFilterValue((old: [Date | undefined, Date | undefined]) => {
             if (date?.from && date?.to) {
                return [date.from, date.to];
            }
            return old;
        });

        // Area filter
        table.getColumn("areaAcre")?.setFilterValue((old: [number, number]) => {
            const min = parseFloat(minArea);
            const max = parseFloat(maxArea);
            return [isNaN(min) ? old?.[0] : min, isNaN(max) ? old?.[1] : max];
        });
    }

    const handleClear = () => {
        setDate(undefined);
        setMinArea("");
        setMaxArea("");
        table.getColumn("surveyDate")?.setFilterValue(undefined);
        table.getColumn("areaAcre")?.setFilterValue(undefined);
        table.getColumn("surveyedBy")?.setFilterValue("");
        table.getColumn("warshir")?.setFilterValue("");
    }

    const uniqueSurveyors = React.useMemo(() => {
        const surveyors = new Set<string>();
        data.forEach(s => surveyors.add(s.surveyedBy));
        return Array.from(surveyors);
    }, []);

    const uniqueWarshirs = React.useMemo(() => {
        const warshirs = new Set<string>();
        data.forEach(s => s.warshir && warshirs.add(s.warshir));
        return Array.from(warshirs);
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><Filter className="mr-2"/> अधिक फिल्टर</Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>अधिक फिल्टर</SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-1">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label>सर्वेक्षण तारीख श्रेणी</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                >
                                    {date?.from ? (
                                    date.to ? (
                                        <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                    ) : (
                                    <span>एक तारीख निवडा</span>
                                    )}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>

                         <div className="grid gap-2">
                            <Label htmlFor="surveyor">सर्वेक्षक</Label>
                            <Select
                                value={table.getColumn("surveyedBy")?.getFilterValue() as string ?? ""}
                                onValueChange={(value) => table.getColumn("surveyedBy")?.setFilterValue(value)}
                            >
                                <SelectTrigger><SelectValue placeholder="सर्वेक्षक निवडा" /></SelectTrigger>
                                <SelectContent>
                                    {uniqueSurveyors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        
                         <div className="grid gap-2">
                            <Label htmlFor="warshir">वारशिर</Label>
                           <Select
                                value={table.getColumn("warshir")?.getFilterValue() as string ?? ""}
                                onValueChange={(value) => table.getColumn("warshir")?.setFilterValue(value)}
                           >
                                <SelectTrigger><SelectValue placeholder="वारशिर निवडा" /></SelectTrigger>
                                <SelectContent>
                                    {uniqueWarshirs.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="grid gap-2">
                            <Label>क्षेत्र (एकर)</Label>
                            <div className="flex items-center gap-2">
                                <Input type="number" placeholder="किमान" value={minArea} onChange={e => setMinArea(e.target.value)} />
                                <span className="text-muted-foreground">-</span>
                                <Input type="number" placeholder="कमाल" value={maxArea} onChange={e => setMaxArea(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="ghost" onClick={handleClear}>स्वच्छ करा</Button>
                    <Button onClick={handleApply}>फिल्टर लागू करा</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}


export default function SurveyDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const defaultColumnVisibility = {
    'reassignedTo': false, 'lastUpdated': false, 'farmerContact': false, 'gatGroupNumber': false,
    'surveyNumber': false, 'gpsCoordinates': false, 'cropCondition': false, 'approvedBy': false,
    'rejectionReason': false, 'tokenNumber': false, 'tokenDate': false, 'otpVerified': false,
    'cuttingPhotoUploaded': false, 'tonnageReceived': false, 'gatePassEntryDate': false,
    'submittedFrom': false, 'offlineSync': false, 'createdOn': false, 'updatedBy': false,
    'voiceNoteUploaded': false, 'select': false, 'surveyStage': false, 'photoCount': false,
    'district': false, 'caneType': false, 'caneVariety': false, 'approvalStatus': false
  };

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(defaultColumnVisibility)

  const [rowSelection, setRowSelection] = React.useState({})
  
  const dateRangeFilterFn = (row: any, columnId: string, filterValue: [Date | undefined, Date | undefined]) => {
      const date = new Date(row.getValue(columnId));
      const [start, end] = filterValue;
      if (start && !end) {
          return date >= start;
      } else if (!start && end) {
          return date <= end;
      } else if (start && end) {
          return date >= start && date <= end;
      }
      return true;
  };
  
  const areaRangeFilterFn = (row: any, columnId: string, filterValue: [number | undefined, number | undefined]) => {
    const area = row.getValue(columnId);
    const [min, max] = filterValue;

    if (min && !max) {
      return area >= min;
    } else if (!min && max) {
      return area <= max;
    } else if (min && max) {
      return area >= min && area <= max;
    }
    return true;
  };

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
    filterFns: {
        dateRange: dateRangeFilterFn,
        areaRange: areaRangeFilterFn,
    },
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
  
  const activeFilters = columnFilters.filter(f => f.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">सर्वेक्षण</CardTitle>
        <CardDescription>
          प्रणालीतील सर्व शेत सर्वेक्षणांची विस्तृत यादी.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <Input
                  placeholder="शेतकऱ्याच्या नावाने फिल्टर करा..."
                  value={(table.getColumn("farmerName")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                      table.getColumn("farmerName")?.setFilterValue(event.target.value)
                  }
                  className="max-w-xs"
                />
                <Select
                    value={(table.getColumn("surveyStatus")?.getFilterValue() as string) ?? ""}
                    onValueChange={(value) => table.getColumn("surveyStatus")?.setFilterValue(value === "all" ? "" : value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="स्थितीनुसार फिल्टर करा" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">सर्व स्थिती</SelectItem>
                        <SelectItem value="Approved">मंजूर</SelectItem>
                        <SelectItem value="Pending">प्रलंबित</SelectItem>
                        <SelectItem value="Rejected">नाकारलेले</SelectItem>
                    </SelectContent>
                </Select>
                 <Select
                    value={(table.getColumn("taluka")?.getFilterValue() as string) ?? ""}
                    onValueChange={(value) => table.getColumn("taluka")?.setFilterValue(value === "all" ? "" : value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="तालुकानुसार फिल्टर करा" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">सर्व तालुके</SelectItem>
                        <SelectItem value="अहमदपूर">अहमदपूर</SelectItem>
                        <SelectItem value="औसा">औसा</SelectItem>
                    </SelectContent>
                </Select>
                <div className="ml-auto flex items-center gap-2">
                  <AdvancedFilters table={table} />
                  <ColumnToggleDropdown table={table} />
                </div>
            </div>
             {activeFilters.length > 0 && (
                <div className="flex items-center gap-2 pb-4">
                    <p className="text-sm text-muted-foreground">सक्रिय फिल्टर:</p>
                    {activeFilters.map(filter => (
                         <Badge key={filter.id} variant="secondary">
                            {filter.id}: {JSON.stringify(filter.value)}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2"
                                onClick={() => table.getColumn(filter.id)?.setFilterValue("")}
                            >
                                <X className="h-3 w-3"/>
                            </Button>
                        </Badge>
                    ))}
                    <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()}>
                        सर्व साफ करा
                    </Button>
                </div>
            )}
            <div className="rounded-md border">
              <ScrollArea className="w-full whitespace-nowrap h-[500px]">
                <Table>
                <TableHeader className="sticky top-0 bg-card">
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
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
                      [...Array(table.getState().pagination.pageSize)].map((_, i) => (
                        <TableRow key={i}>
                          {columns.map((column, j) => (
                             <TableCell key={j}><Skeleton className="w-full h-8" /></TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
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
                <div className="h-4" />
              </ScrollArea>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
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

    