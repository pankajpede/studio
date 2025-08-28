
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Check, X, Clock, UserPlus } from "lucide-react"

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
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
const statusStyles: Record<SurveyStatus, string> = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Approved": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800",
    "Assigned": "bg-blue-100 text-blue-800"
}


export const columns: ColumnDef<Survey>[] = [
  {
    accessorKey: "surveyId",
    header: "सर्वेक्षण आयडी",
  },
  {
    accessorKey: "farmerName",
    header: "शेतकऱ्याचे नाव",
  },
  {
    accessorKey: "fieldBoy",
    header: "फील्ड बॉय",
  },
  {
    accessorKey: "village",
    header: "गाव",
  },
  {
    accessorKey: "area",
    header: "क्षेत्र (हेक्टर)",
  },
  {
    accessorKey: "status",
    header: "स्थिती",
    cell: ({ row }) => {
      const status = row.getValue("status") as SurveyStatus;
      return <Badge className={cn("border-transparent", statusStyles[status])}>{statusTranslations[status]}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const survey = row.original;
      const isPending = survey.status === 'Pending';
      return (
        <div className="flex items-center gap-2">
            {isPending && (
                <>
                <Button variant="outline" size="sm" className="h-8 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
                    <Check className="h-4 w-4 mr-1"/> मंजूर करा
                </Button>
                <Button variant="outline" size="sm" className="h-8 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <X className="h-4 w-4 mr-1"/> नाकारा
                </Button>
                </>
            )}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">मेनू उघडा</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>क्रिया</DropdownMenuLabel>
                    <DropdownMenuItem>तपशील पहा</DropdownMenuItem>
                    <DropdownMenuItem>पुन्हा नियुक्त करा</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">हटवा</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
];

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
);

export default function OverseerDashboard() {
  const [data, setData] = React.useState<Survey[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(generateSurveyData(50));
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  
  const stats = React.useMemo(() => {
    return {
        pending: data.filter(s => s.status === 'Pending').length,
        approved: data.filter(s => s.status === 'Approved').length,
        rejected: data.filter(s => s.status === 'Rejected').length,
        assigned: data.filter(s => s.status === 'Assigned').length
    }
  }, [data])

  return (
    <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="प्रलंबित सर्वेक्षण" value={stats.pending.toString()} icon={Clock} />
            <StatCard title="मंजूर सर्वेक्षण" value={stats.approved.toString()} icon={Check} />
            <StatCard title="नाकारलेले सर्वेक्षण" value={stats.rejected.toString()} icon={X} />
            <StatCard title="नियुक्त सर्वेक्षण" value={stats.assigned.toString()} icon={UserPlus} />
        </div>

        <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="font-headline">सर्वेक्षण प्रमाणीकरण</CardTitle>
                    <CardDescription>
                        तुमच्या फील्ड बॉयने सबमिट केलेली सर्वेक्षणे सत्यापित करा.
                    </CardDescription>
                </div>
                <Button asChild>
                    <Link href="/overseer/dashboard/new">
                        <UserPlus className="mr-2" /> नवीन सर्वेक्षण नियुक्त करा
                    </Link>
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-4 py-4">
                <Input
                    placeholder="शेतकऱ्याच्या नावाने फिल्टर करा..."
                    value={(table.getColumn("farmerName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("farmerName")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <Select
                    onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="स्थितीनुसार फिल्टर करा" />
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
            <div className="rounded-md border">
            <Table>
                <TableHeader>
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
                        );
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    [...Array(10)].map((_, i) => (
                        <TableRow key={i}>
                        <TableCell colSpan={columns.length}>
                            <Skeleton className="h-8 w-full" />
                        </TableCell>
                        </TableRow>
                    ))
                ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        परिणाम नाहीत.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
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
        </CardContent>
        </Card>
    </div>
  )
}
