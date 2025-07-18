"use client"

import * as React from "react"
import Image from "next/image"
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

const surveyData: Survey[] = [
  {
    surveyId: "SURV-001",
    surveyDate: "2023-10-01",
    surveyStatus: "Approved",
    surveyStage: "Completed",
    surveyedBy: "Sunil",
    reassignedTo: "-",
    lastUpdated: "2023-10-02",
    farmerName: "Ramesh Kumar",
    farmerContact: "9876543210",
    village: "Kothari",
    taluka: "Baramati",
    district: "Pune",
    gatGroupNumber: "GAT-123",
    surveyNumber: "SN-456",
    areaAcre: 5.2,
    gpsCoordinates: "18.15, 74.58",
    caneType: "Adsali",
    caneVariety: "Co-86032",
    cropCondition: "Good",
    photoCount: 5,
    approvedBy: "Admin",
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
    updatedBy: "Admin",
    voiceNoteUploaded: "No",
  },
  {
    surveyId: "SURV-002",
    surveyDate: "2023-10-02",
    surveyStatus: "Pending",
    surveyStage: "Data Entry",
    surveyedBy: "Anil",
    reassignedTo: "Sunil",
    lastUpdated: "2023-10-03",
    farmerName: "Suresh Patil",
    farmerContact: "9876543211",
    village: "Wadgaon",
    taluka: "Indapur",
    district: "Pune",
    gatGroupNumber: "GAT-124",
    surveyNumber: "SN-457",
    areaAcre: 3.1,
    gpsCoordinates: "18.11, 74.99",
    caneType: "Preseasonal",
    caneVariety: "CoM-0265",
    cropCondition: "Average",
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
    updatedBy: "Anil",
    voiceNoteUploaded: "Yes",
  },
];

export type Survey = {
  surveyId: string;
  surveyDate: string;
  surveyStatus: "Pending" | "Approved" | "Rejected";
  surveyStage: string;
  surveyedBy: string;
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
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "surveyId",
    header: "Survey ID",
  },
  {
    accessorKey: "surveyDate",
    header: "Survey Date",
  },
  {
    accessorKey: "surveyStatus",
    header: "Survey Status",
    cell: ({ row }) => {
        const status = row.getValue("surveyStatus") as string;
        return <Badge variant={status === "Approved" ? "default" : status === "Pending" ? "secondary" : "destructive"}>{status}</Badge>;
    }
  },
  {
    accessorKey: "surveyStage",
    header: "Survey Stage",
  },
  {
    accessorKey: "surveyedBy",
    header: "Surveyed By",
  },
  {
    accessorKey: "reassignedTo",
    header: "Reassigned To",
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
  },
  {
    accessorKey: "farmerName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Farmer Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "farmerContact",
    header: "Farmer Contact",
  },
  {
    accessorKey: "village",
    header: "Village",
  },
  {
    accessorKey: "taluka",
    header: "Taluka",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "gatGroupNumber",
    header: "Gat/Group Number",
  },
  {
    accessorKey: "surveyNumber",
    header: "Survey Number",
  },
  {
    accessorKey: "areaAcre",
    header: "Area (Acre)",
  },
  {
    accessorKey: "gpsCoordinates",
    header: "GPS Coordinates",
  },
  {
    accessorKey: "caneType",
    header: "Cane Type",
  },
  {
    accessorKey: "caneVariety",
    header: "Cane Variety",
  },
  {
    accessorKey: "cropCondition",
    header: "Crop Condition",
  },
  {
    accessorKey: "photoCount",
    header: "Photo Count",
  },
  {
    accessorKey: "approvedBy",
    header: "Approved By",
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
  },
  {
    accessorKey: "rejectionReason",
    header: "Rejection Reason",
  },
  {
    accessorKey: "tokenNumber",
    header: "Token Number",
  },
  {
    accessorKey: "tokenDate",
    header: "Token Date",
  },
  {
    accessorKey: "otpVerified",
    header: "OTP Verified",
  },
  {
    accessorKey: "cuttingPhotoUploaded",
    header: "Cutting Photo Uploaded",
  },
  {
    accessorKey: "tonnageReceived",
    header: "Tonnage Received",
  },
  {
    accessorKey: "gatePassEntryDate",
    header: "Gate Pass Entry Date",
  },
  {
    accessorKey: "submittedFrom",
    header: "Submitted From",
  },
  {
    accessorKey: "offlineSync",
    header: "Offline Sync",
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
  },
  {
    accessorKey: "voiceNoteUploaded",
    header: "Voice Note Uploaded",
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(survey.surveyId)}
            >
              Copy survey ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit survey</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function ColumnToggleDropdown({ table, onApply, onReset }: { table: ReturnType<typeof useReactTable>, onApply: () => void, onReset: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
        </ScrollArea>
        <DropdownMenuSeparator />
        <div className="flex justify-end gap-2 p-2">
            <Button variant="ghost" size="sm" onClick={onReset}>Reset</Button>
            <Button size="sm" onClick={onApply}>Apply</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SurveyDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const defaultColumnVisibility = {
    'reassignedTo': false,
    'lastUpdated': false,
    'farmerContact': false,
    'gatGroupNumber': false,
    'surveyNumber': false,
    'gpsCoordinates': false,
    'cropCondition': false,
    'approvedBy': false,
    'rejectionReason': false,
    'tokenNumber': false,
    'tokenDate': false,
    'otpVerified': false,
    'cuttingPhotoUploaded': false,
    'tonnageReceived': false,
    'gatePassEntryDate': false,
    'submittedFrom': false,
    'offlineSync': false,
    'createdOn': false,
    'updatedBy': false,
    'voiceNoteUploaded': false,
  };


  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(defaultColumnVisibility)
  
  const [stagedColumnVisibility, setStagedColumnVisibility] =
    React.useState<VisibilityState>(defaultColumnVisibility)

  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: surveyData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setStagedColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility: stagedColumnVisibility,
      rowSelection,
    },
    initialState: {
        pagination: {
            pageSize: 10,
        },
    }
  })

  const handleApply = () => {
    setColumnVisibility(stagedColumnVisibility)
  }

  const handleReset = () => {
    setStagedColumnVisibility(defaultColumnVisibility)
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Surveys</CardTitle>
        <CardDescription>
          A comprehensive list of all farm surveys in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                placeholder="Filter by farmer name..."
                value={(table.getColumn("farmerName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("farmerName")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
                <ColumnToggleDropdown table={table} onApply={handleApply} onReset={handleReset} />
            </div>
            <div className="rounded-md border">
              <ScrollArea className="w-full whitespace-nowrap">
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
                    {table.getRowModel().rows?.length ? (
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
                        No results.
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
    title: "Total Surveys",
    value: "1,250",
    icon: <ListTodo className="h-6 w-6 text-muted-foreground" />,
    change: "+12.5%",
  },
  {
    title: "Approved Surveys",
    value: "980",
    icon: <CheckCircle2 className="h-6 w-6 text-muted-foreground" />,
    change: "+5.2%",
  },
  {
    title: "Hectares Covered",
    value: "4,521",
    icon: <Ruler className="h-6 w-6 text-muted-foreground" />,
    change: "+8.1%",
  },
  {
    title: "Yield Forecast (Tons)",
    value: "22,605",
    icon: <BarChart3 className="h-6 w-6 text-muted-foreground" />,
    change: "+2.3%",
  },
]


export default function DashboardPage() {
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
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SurveyDataTable />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Survey Area Heatmap</CardTitle>
          <CardDescription>Visual representation of survey density and coverage.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="w-full h-96 rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                 <Image
                    src="https://placehold.co/1200x600.png"
                    alt="Map of survey areas"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="map satellite"
                  />
                  <p className="z-10 text-lg font-semibold text-background bg-foreground/50 px-4 py-2 rounded-md">Map Placeholder</p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
