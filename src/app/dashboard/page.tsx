
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
  FilterFn,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, CheckCircle2, ListTodo, Ruler, BarChart3, Filter, X, Leaf, Scissors, CalendarClock, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import SurveyMap from "@/components/survey-map"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Slider } from "@/components/ui/slider"

const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  const fieldBoys = ["Sunil Pawar", "Anil Shinde", "Rajesh Patil", "Kavita Jadhav"];
  const warshirs = ["Mahesh Deshmukh", "Sanjay Gaikwad", "Vikram Rathod", "Pooja Chavan"];
  const farmerFirstNames = ["Ramesh", "Suresh", "Ganesh", "Priya", "Prakash", "Anita", "Sachin", "Deepa"];
  const farmerLastNames = ["Kulkarni", "Patil", "Jadhav", "Shinde", "More", "Gaikwad", "Chavan", "Deshmukh"];
  const plantationTypes = ["Adsali", "Pre-seasonal", "Suru"];


  for (let i = 1; i <= count; i++) {
    const status = i % 3 === 0 ? "Rejected" : i % 2 === 0 ? "Pending" : "Approved";
    const village = ["Chakur", "Ahmedpur", "Udgir", "Nilanga"][i % 4];
    const taluka = ["Latur", "Ausa", "Udgir", "Nilanga"][i % 4];
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
      state: "Maharashtra",
      district: "Latur",
      division: "Pune Division",
      taluka: taluka,
      village: village,
      shiwar: `Shiwar ${(i % 5) + 1}`,
      gatGroupNumber: `GAT-${String(123 + i)}`,
      surveyNumber: `SN-${String(456 + i)}`,
      areaHector: Number((Math.random() * 2 + 0.5).toFixed(2)),
      gpsCoordinates: `${(18.4088 + (Math.random() - 0.5) * 0.5).toFixed(4)}, ${(76.5702 + (Math.random() - 0.5) * 0.5).toFixed(4)}`,
      caneType: ["Adsali", "Pre-seasonal", "Suru"][i % 3],
      caneVariety: ["Co-86032", "CoM-0265", "MS-10001"][i % 3],
      cropCondition: ["Good", "Average", "Poor"][i % 3],
      photoCount: Math.floor(Math.random() * 5) + 1,
      approvedBy: status === "Approved" ? "Admin" : "-",
      approvalStatus: status,
      rejectionReason: status === "Rejected" ? "Incorrect Information" : "-",
      tokenNumber: status === "Approved" ? `TKN-${String(789 + i)}` : "-",
      tokenDate: status === "Approved" ? `2023-10-${String((i % 30) + 3).padStart(2, '0')}` : "-",
      otpVerified: i % 2 === 0 ? "Yes" : "No",
      cuttingPhotoUploaded: i % 2 === 0 ? "Yes" : "No",
      tonnageReceived: status === "Approved" ? Math.floor(Math.random() * 100 + 150) : 0,
      gatePassEntryDate: status === "Approved" ? `2023-11-${String((i % 28) + 1).padStart(2, '0')}` : "-",
      submittedFrom: i % 2 === 0 ? "Mobile" : "Web",
      offlineSync: i % 3 === 0 ? "Yes" : "No",
      createdOn: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedBy: ["Sunil Pawar", "Anil Shinde", "Admin"][i % 3],
      voiceNoteUploaded: i % 4 === 0 ? "Yes" : "No",
      aadhaarNumber: `XXXX-XXXX-${String(1000 + i)}`,
      saatBaaraNumber: `SB-${String(2000 + i)}`,
      plantationType: plantationTypes[i % 3],
      cuttingNumber: (i % 5) + 1,
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
  areaHector: number;
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
  aadhaarNumber: string;
  saatBaaraNumber: string;
  plantationType: string;
  cuttingNumber: number;
}

const statusOptions = [
    { value: "Approved", label: "Approved" },
    { value: "Pending", label: "Pending" },
    { value: "Rejected", label: "Rejected" },
];

export const columns: ColumnDef<Survey>[] = [
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "taluka",
    header: "Taluka",
  },
  {
    accessorKey: "village",
    header: "Village",
  },
  {
    accessorKey: "farmerName",
    header: "Farmer Name",
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
    accessorKey: "farmerContact",
    header: "Mobile Number",
  },
   {
    accessorKey: "aadhaarNumber",
    header: "Aadhaar Number",
  },
  {
    accessorKey: "surveyNumber",
    header: "Survey Number",
  },
  {
    accessorKey: "saatBaaraNumber",
    header: "7/12 Number",
  },
  {
    accessorKey: "areaHector",
    header: "Total Reg. Area",
  },
  {
    accessorKey: "plantationType",
    header: "Plantation Type",
  },
  {
    accessorKey: "caneVariety",
    header: "Cane Variety",
  },
  {
    accessorKey: "surveyDate",
    header: "Plantation Date",
     cell: ({ row }) => {
      const date = new Date(row.getValue("surveyDate"))
      return <div>{format(date, "dd/MM/yyyy")}</div>
    },
  },
  {
    accessorKey: "cuttingNumber",
    header: "Cutting No.",
  },
  {
    accessorKey: "surveyStatus",
    header: "Survey Status",
    cell: ({ row }) => {
        const status = row.getValue("surveyStatus") as string;
        return <Badge variant={status === "Approved" ? "default" : status === "Pending" ? "secondary" : "destructive"}>{status}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
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
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(survey.surveyId)}
            >
              Copy Survey ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/farmer/${survey.surveyId}`}>
                    View Details
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function AdvancedFilters({ table, data }: { table: ReturnType<typeof useReactTable>, data: Survey[] }) {
    const [farmerName, setFarmerName] = React.useState(table.getColumn("farmerName")?.getFilterValue() as string ?? "");
    const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>(table.getColumn("surveyStatus")?.getFilterValue() as string[] ?? []);
    const [taluka, setTaluka] = React.useState(table.getColumn("taluka")?.getFilterValue() as string ?? "");
    const [surveyDate, setSurveyDate] = React.useState<DateRange | undefined>()
    const [cuttingDate, setCuttingDate] = React.useState<DateRange | undefined>()
    const [minArea, setMinArea] = React.useState<string>("")
    const [maxArea, setMaxArea] = React.useState<string>("")
    const [radius, setRadius] = React.useState([100]);
    
    const uniqueTalukas = React.useMemo(() => Array.from(new Set(data.map(s => s.taluka))), [data]);

    const handleApply = () => {
        table.getColumn("farmerName")?.setFilterValue(farmerName);
        table.getColumn("surveyStatus")?.setFilterValue(selectedStatuses.length ? selectedStatuses : undefined);
        table.getColumn("taluka")?.setFilterValue(taluka === "all" ? "" : taluka);
        table.getColumn("surveyDate")?.setFilterValue(surveyDate ? [surveyDate.from, surveyDate.to] : undefined);
        table.getColumn("tokenDate")?.setFilterValue(cuttingDate ? [cuttingDate.from, cuttingDate.to] : undefined);
        table.getColumn("areaHector")?.setFilterValue([minArea, maxArea]);
        table.getColumn("gpsCoordinates")?.setFilterValue(radius[0] < 100 ? radius[0] : undefined);
    }

    const handleClear = () => {
        setFarmerName("");
        setSelectedStatuses([]);
        setTaluka("");
        setSurveyDate(undefined);
        setCuttingDate(undefined);
        setMinArea("");
        setMaxArea("");
        setRadius([100]);
        table.resetColumnFilters();
    }
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><Filter className="mr-2"/> More Filters</Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-1">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="farmerName">Farmer Name</Label>
                            <Input
                                id="farmerName"
                                placeholder="Filter by farmer name..."
                                value={farmerName}
                                onChange={(event) => setFarmerName(event.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Radius (km)</Label>
                            <div className="flex items-center gap-2">
                                <Slider
                                    value={radius}
                                    onValueChange={setRadius}
                                    max={100}
                                    step={1}
                                />
                                <span className="text-sm font-medium w-16 text-right">{radius[0] === 100 ? 'All' : `${radius[0]} km`}</span>
                            </div>
                        </div>
                        
                        <div className="grid gap-2">
                            <Label>Survey Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                >
                                    {surveyDate?.from ? (
                                    surveyDate.to ? (
                                        <>
                                        {format(surveyDate.from, "LLL dd, y")} -{" "}
                                        {format(surveyDate.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(surveyDate.from, "LLL dd, y")
                                    )
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={surveyDate?.from}
                                    selected={surveyDate}
                                    onSelect={setSurveyDate}
                                    numberOfMonths={1}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                         <div className="grid gap-2">
                            <Label>Cutting Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                >
                                    {cuttingDate?.from ? (
                                    cuttingDate.to ? (
                                        <>
                                        {format(cuttingDate.from, "LLL dd, y")} -{" "}
                                        {format(cuttingDate.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(cuttingDate.from, "LLL dd, y")
                                    )
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={cuttingDate?.from}
                                    selected={cuttingDate}
                                    onSelect={setCuttingDate}
                                    numberOfMonths={1}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid gap-2">
                            <Label>Survey Status</Label>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <span>
                                            Filter by status
                                            {selectedStatuses.length > 0 && (
                                                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                                                    {selectedStatuses.length} selected
                                                </Badge>
                                            )}
                                        </span>
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {statusOptions.map((option) => (
                                        <DropdownMenuCheckboxItem
                                            key={option.value}
                                            checked={selectedStatuses.includes(option.value)}
                                            onCheckedChange={(checked) => {
                                                const newStatuses = checked
                                                    ? [...selectedStatuses, option.value]
                                                    : selectedStatuses.filter((s) => s !== option.value);
                                                setSelectedStatuses(newStatuses);
                                            }}
                                        >
                                            {option.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                         <div className="grid gap-2">
                            <Label>Area (Hectare)</Label>
                            <div className="flex items-center gap-2">
                                <Input type="number" placeholder="Min" value={minArea} onChange={e => setMinArea(e.target.value)} />
                                <span className="text-muted-foreground">-</span>
                                <Input type="number" placeholder="Max" value={maxArea} onChange={e => setMaxArea(e.target.value)} />
                            </div>
                        </div>

                         <div className="grid gap-2">
                            <Label htmlFor="taluka">Taluka</Label>
                             <Select value={taluka} onValueChange={setTaluka}>
                                <SelectTrigger><SelectValue placeholder="Filter by taluka" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Talukas</SelectItem>
                                    {uniqueTalukas.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="ghost" onClick={handleClear}>Clear Filters</Button>
                    <Button onClick={handleApply}>Apply Filters</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

function SurveyDataTable({data, isLoading}: {data: Survey[], isLoading: boolean}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      gpsCoordinates: false, // Hide GPS column by default
      tokenDate: false,
    })
  const [rowSelection, setRowSelection] = React.useState({})

  const dateRangeFilter: FilterFn<Survey> = (row, columnId, filterValue) => {
    const dateValue = row.getValue(columnId) as string;
    if (!dateValue || dateValue === '-') return false;
    const date = new Date(dateValue);
    const [start, end] = filterValue as (Date | undefined)[];
    if (start && !end) return date >= start;
    if (!start && end) return date <= end;
    if (start && end) return date >= start && date <= end;
    return true;
  };

  const areaRangeFilter: FilterFn<Survey> = (row, columnId, filterValue) => {
    const area = row.getValue(columnId) as number;
    const [min, max] = filterValue as string[];
    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);
    if (!isNaN(minVal) && !isNaN(maxVal)) return area >= minVal && area <= maxVal;
    if (!isNaN(minVal)) return area >= minVal;
    if (!isNaN(maxVal)) return area <= maxVal;
    return true;
  };

  const factoryLocation = { lat: 18.4088, lng: 76.5702 }; // Latur, as an example

  const haversineDistance = (coords1: {lat: number, lng: number}, coords2: {lat: number, lng: number}) => {
      const toRad = (x: number) => x * Math.PI / 180;
      const R = 6371; // Earth radius in km

      const dLat = toRad(coords2.lat - coords1.lat);
      const dLon = toRad(coords2.lng - coords1.lng);
      const lat1 = toRad(coords1.lat);
      const lat2 = toRad(coords2.lat);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
  };

  const radiusFilter: FilterFn<Survey> = (row, columnId, filterValue: number) => {
      if (filterValue === undefined || filterValue === null) return true;
      const [lat, lng] = (row.getValue(columnId) as string).split(',').map(Number);
      if (isNaN(lat) || isNaN(lng)) return false;

      const farmLocation = { lat, lng };
      const distance = haversineDistance(factoryLocation, farmLocation);
      return distance <= filterValue;
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
        dateRange: dateRangeFilter,
        areaRange: areaRangeFilter,
        radius: radiusFilter,
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
  
  const activeFilters = columnFilters.filter(f => f.value && (Array.isArray(f.value) ? f.value.some(v => v) : true));
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline">Surveys</CardTitle>
            <CardDescription>
            A detailed list of all farm surveys in the system.
            </CardDescription>
        </div>
        <AdvancedFilters table={table} data={data} />
      </CardHeader>
      <CardContent>
        <div className="w-full">
             {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pb-4">
                    <p className="text-sm text-muted-foreground">Active Filters:</p>
                    {activeFilters.map(filter => {
                        let valueText: string | null = null;
                        if (filter.id === 'surveyStatus' && Array.isArray(filter.value)) {
                            valueText = (filter.value as string[]).map(v => statusOptions.find(o => o.value === v)?.label || v).join(', ');
                        } else if ((filter.id === 'surveyDate' || filter.id === 'tokenDate') && Array.isArray(filter.value)) {
                           const [start, end] = filter.value as (Date | undefined)[];
                           if(start && end) valueText = `${format(start, 'dd/MM/yy')} - ${format(end, 'dd/MM/yy')}`;
                           else if (start) valueText = `from ${format(start, 'dd/MM/yy')}`;
                           else if (end) valueText = `to ${format(end, 'dd/MM/yy')}`;
                        } else if (filter.id === 'areaHector' && Array.isArray(filter.value)) {
                            const [min, max] = filter.value as string[];
                            if(min && max) valueText = `${min}-${max} Ha`;
                            else if (min) valueText = `>= ${min} Ha`;
                            else if (max) valueText = `<= ${max} Ha`;
                        } else if (filter.id === 'gpsCoordinates' && typeof filter.value === 'number') {
                           valueText = `<= ${filter.value} km`;
                        }
                         else if (typeof filter.value === 'string') {
                            valueText = filter.value
                        }

                        if (!valueText) return null;
                        
                         return (<Badge key={filter.id} variant="secondary" className="gap-1">
                            {filter.id}: {valueText}
                            <button
                                className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => table.getColumn(filter.id)?.setFilterValue("")}
                            >
                                <X className="h-3 w-3"/>
                            </button>
                        </Badge>)
                    })}
                    <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()}>
                        Clear All
                    </Button>
                </div>
            )}
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
                          No results.
                          </TableCell>
                      </TableRow>
                    )}
                </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2 flex items-center">
                    <span className="text-sm text-muted-foreground">Rows per page</span>
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
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
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
    title: "Accepted Cane Registration",
    icon: <CheckCircle2 className="h-6 w-6 text-muted-foreground" />,
    details: [
      { label: "Total Cane Registrations", value: "3,396" },
      { label: "Total Cane Area (Hectare)", value: "3,341.86" },
    ],
  },
  {
    title: "Cane Cutting (Done)",
    icon: <Scissors className="h-6 w-6 text-muted-foreground" />,
    details: [
      { label: "Total Cane Cutting Slips", value: "0" },
      { label: "Total Cane Cutting Area (Hectare)", value: "0" },
    ],
  },
  {
    title: "Pending Cane Cutting",
    icon: <CalendarClock className="h-6 w-6 text-muted-foreground" />,
    details: [
      { label: "Total Pending Cane Slips", value: "3,396" },
      { label: "Total Pending Cane Area (Hectare)", value: "3,341.86" },
    ],
  },
   {
    title: "Duplicate Cane Registration",
    icon: <Copy className="h-6 w-6 text-muted-foreground" />,
    details: [
      { label: "Total Cane Slips", value: "0" },
      { label: "Total Cane Area (Hectare)", value: "0" },
    ],
  },
];

const simpleStats = [
 {
    title: "Cane Area (Hectare)",
    value: "3,342",
    icon: <Ruler className="h-6 w-6 text-muted-foreground" />,
    change: "+2.6% than last week",
  },
  {
    title: "Cane Registrations",
    value: "3,396",
    icon: <Leaf className="h-6 w-6 text-muted-foreground" />,
    change: "+0.6% than last week",
  },
   {
    title: "Cane Cutting (Hectare)",
    value: "0",
    icon: <Scissors className="h-6 w-6 text-muted-foreground" />,
    change: "-0.1% than last week",
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
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1 text-sm">
                {stat.details.map(detail => (
                    <div key={detail.label} className="flex justify-between">
                        <span className="text-muted-foreground">{detail.label}:</span>
                        <span className="font-semibold">{detail.value}</span>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid gap-4 md:grid-cols-3">
        {simpleStats.map((stat) => (
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
    </div>
  )
}
