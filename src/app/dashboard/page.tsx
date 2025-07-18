
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

const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  const fieldBoys = ["Sunil", "Anil", "Rajesh", "Kavita"];
  const warshirs = ["Mahesh", "Sanjay", "Vikram", "Pooja"];

  for (let i = 1; i <= count; i++) {
    const status = i % 3 === 0 ? "Rejected" : i % 2 === 0 ? "Pending" : "Approved";
    const village = ["Kothari", "Wadgaon", "Sangvi", "Malegaon"][i % 4];
    const taluka = ["Baramati", "Indapur", "Daund", "Haveli"][i % 4];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      surveyDate: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      surveyStatus: status,
      surveyStage: i % 2 === 0 ? "Data Entry" : "Completed",
      surveyedBy: fieldBoys[i % 4],
      warshir: warshirs[i % 4],
      reassignedTo: i % 5 === 0 ? fieldBoys[(i + 1) % 4] : "-",
      lastUpdated: `2023-10-${String((i % 30) + 2).padStart(2, '0')}`,
      farmerName: `Farmer ${i}`,
      farmerContact: `9876543${String(i).padStart(3, '0')}`,
      state: "Maharashtra",
      district: "Pune",
      division: "Pune Division",
      taluka: taluka,
      village: village,
      shiwar: `Shiwar ${(i % 5) + 1}`,
      gatGroupNumber: `GAT-${String(123 + i)}`,
      surveyNumber: `SN-${String(456 + i)}`,
      areaAcre: Number((Math.random() * 5 + 1).toFixed(1)),
      gpsCoordinates: `${(18.15 + Math.random() * 0.1).toFixed(4)}, ${(74.58 + Math.random() * 0.1).toFixed(4)}`,
      caneType: ["Adsali", "Preseasonal", "Sursali"][i % 3],
      caneVariety: ["Co-86032", "CoM-0265", "MS-10001"][i % 3],
      cropCondition: ["Good", "Average", "Poor"][i % 3],
      photoCount: Math.floor(Math.random() * 5) + 1,
      approvedBy: status === "Approved" ? "Admin" : "-",
      approvalStatus: status,
      rejectionReason: status === "Rejected" ? "Incorrect data" : "-",
      tokenNumber: status === "Approved" ? `TKN-${String(789 + i)}` : "-",
      tokenDate: status === "Approved" ? `2023-10-${String((i % 30) + 3).padStart(2, '0')}` : "-",
      otpVerified: i % 2 === 0 ? "Yes" : "No",
      cuttingPhotoUploaded: i % 2 === 0 ? "Yes" : "No",
      tonnageReceived: status === "Approved" ? Math.floor(Math.random() * 100 + 150) : 0,
      gatePassEntryDate: status === "Approved" ? `2023-11-${String((i % 28) + 1).padStart(2, '0')}` : "-",
      submittedFrom: i % 2 === 0 ? "Mobile" : "Web",
      offlineSync: i % 3 === 0 ? "Yes" : "No",
      createdOn: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedBy: ["Sunil", "Anil", "Admin"][i % 3],
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
        Farmer Name
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
    accessorKey: "surveyedBy",
    header: "Field Boy",
  },
   {
    accessorKey: "warshir",
    header: "Warshir",
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
    accessorKey: "areaAcre",
    header: "Area (Acre)",
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
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/farmer/${survey.surveyId}`}>
                    View details
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit survey</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function SurveyDataTable() {
  const [data, setData] = React.useState<Survey[]>([]);

  React.useEffect(() => {
    setData(generateSurveyData(100));
  }, []);

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
        <CardTitle className="font-headline">Surveys</CardTitle>
        <CardDescription>
          A comprehensive list of all farm surveys in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
            <div className="flex items-center gap-4 py-4">
                <Input
                placeholder="Filter by farmer name..."
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
                    {table.getRowModel().rows?.length ? (
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
  const [surveys, setSurveys] = React.useState<Survey[]>([]);

  React.useEffect(() => {
    setSurveys(generateSurveyData(100));
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
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <SurveyDataTable />
      </div>


      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Survey Area Heatmap</CardTitle>
          <CardDescription>Visual representation of survey density in Latur, Maharashtra.</CardDescription>
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

    