
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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

const data: Survey[] = [
  {
    surveyId: "SURV-001",
    surveyDate: "2023-10-01",
    surveyStatus: "Approved",
    surveyStage: "पूर्ण झाले",
    surveyedBy: "सुनील पवार",
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
    otpVerified: "होय",
    cuttingPhotoUploaded: "होय",
    tonnageReceived: 250,
    gatePassEntryDate: "2023-11-15",
    submittedFrom: "मोबाइल",
    offlineSync: "होय",
    createdOn: "2023-10-01",
    updatedBy: "प्रशासक",
    voiceNoteUploaded: "नाही",
  },
  {
    surveyId: "SURV-002",
    surveyDate: "2023-10-02",
    surveyStatus: "Pending",
    surveyStage: "माहिती भरणे",
    surveyedBy: "अनिल शिंदे",
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
    otpVerified: "नाही",
    cuttingPhotoUploaded: "नाही",
    tonnageReceived: 0,
    gatePassEntryDate: "-",
    submittedFrom: "वेब",
    offlineSync: "नाही",
    createdOn: "2023-10-02",
    updatedBy: "अनिल शिंदे",
    voiceNoteUploaded: "होय",
  },
  // Add more mock data entries here to test pagination
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
            <DropdownMenuItem>तपशील पहा</DropdownMenuItem>
            <DropdownMenuItem>सर्वेक्षण संपादित करा</DropdownMenuItem>
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
            <Button variant="ghost" size="sm" onClick={onReset}>रीसेट</Button>
            <Button size="sm" onClick={onApply}>लागू करा</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
    data,
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
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">सर्वेक्षण</CardTitle>
        <CardDescription>
          प्रणालीतील सर्व शेत सर्वेक्षणांची विस्तृत यादी.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                placeholder="शेतकऱ्याच्या नावाने फिल्टर करा..."
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
