
"use client"

import * as React from "react"
import Link from "next/link"
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, PlusCircle, Upload } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

// Define the User type
export type User = {
  id: string
  name: string
  email: string
  role: "Agri Head" | "Warshir" | "Field Boy" | "Farmer"
  status: "Active" | "Inactive"
  avatarUrl?: string
  reportsTo: string
  location: {
    taluka: string
    village: string
  }
}

// Mock user data generation
const generateUserData = (count: number): User[] => {
  const data: User[] = []
  const roles: User["role"][] = ["Agri Head", "Warshir", "Field Boy", "Farmer"]
  const statuses: User["status"][] = ["Active", "Inactive"]
  const firstNames = ["Raj", "Sunita", "Amit", "Priya", "Vikram", "Anjali", "Suresh", "Kavita"]
  const lastNames = ["Kumar", "Patil", "Sharma", "Gupta", "Singh", "Reddy", "Joshi", "Mehta"]
  const talukas = ["Baramati", "Indapur", "Daund", "Haveli"]
  const villages = ["Kothari", "Wadgaon", "Sangvi", "Malegaon"]

  for (let i = 1; i <= count; i++) {
    const role = roles[i % roles.length]
    const firstName = firstNames[i % firstNames.length]
    const lastName = lastNames[i % lastNames.length]
    const taluka = talukas[i % talukas.length]
    const village = villages[i % villages.length]
    let reportsTo = "-"
    if (role === "Field Boy") reportsTo = "Warshir-01"
    if (role === "Warshir") reportsTo = "AgriHead-01"

    data.push({
      id: `${role.replace(/\s/g, '')}-${String(i).padStart(2, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role,
      status: statuses[i % statuses.length],
      avatarUrl: `https://placehold.co/100x100.png`,
      reportsTo,
      location: { taluka, village },
    })
  }
  return data
}

// Columns definition for the react-table
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="avatar" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      const variant: "default" | "secondary" | "destructive" | "outline" = 
        role === "Agri Head" ? "destructive" :
        role === "Warshir" ? "default" :
        role === "Field Boy" ? "secondary" : "outline";
      return <Badge variant={variant}>{role}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original.location
      return `${location.village}, ${location.taluka}`
    },
  },
  {
    accessorKey: "reportsTo",
    header: "Reports To",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original
      const [isActive, setIsActive] = React.useState(user.status === "Active")
      return <Switch checked={isActive} onCheckedChange={setIsActive} aria-label="user status" />
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
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
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem>View Hierarchy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Deactivate User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Main component for the User Management page
export default function UserManagementPage() {
  const [data, setData] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(generateUserData(50));
      setIsLoading(false);
    }, 1000); // Simulate network delay
    return () => clearTimeout(timer);
  }, [])

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
     initialState: {
        pagination: {
            pageSize: 10,
        },
    }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">User Management</CardTitle>
                <CardDescription>
                Add, manage, and assign roles to users in the system.
                </CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><Upload className="mr-2"/> Bulk Upload</Button>
                <Button asChild>
                  <Link href="/dashboard/users/new">
                    <PlusCircle className="mr-2"/> Add User
                  </Link>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center gap-4 py-4">
            <Input
              placeholder="Filter by name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Select
                onValueChange={(value) => {
                    const currentFilter = table.getColumn("role")?.getFilterValue() as string[] || [];
                    if (value === "all") {
                        table.getColumn("role")?.setFilterValue(undefined)
                    } else {
                        table.getColumn("role")?.setFilterValue([value])
                    }
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Agri Head">Agri Head</SelectItem>
                    <SelectItem value="Warshir">Warshir</SelectItem>
                    <SelectItem value="Field Boy">Field Boy</SelectItem>
                    <SelectItem value="Farmer">Farmer</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="whitespace-nowrap">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                     [...Array(table.getState().pagination.pageSize)].map((_, i) => (
                        <TableRow key={i}>
                          {columns.map((column, j) => (
                             <TableCell key={j}><Skeleton className="w-full h-12" /></TableCell>
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
              {table.getFilteredRowModel().rows.length} user(s) found.
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
