
"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useParams } from "next/navigation"
import Link from "next/link"

type Village = {
  id: string
  name: string
  nameEn: string
}

const gutVillages: { [key: string]: Village[] } = {
  "1": [
    { id: "1", name: "चाकूर", nameEn: "Chakur" },
    { id: "2", name: "मोहगाव", nameEn: "Mohgaon" },
  ],
  "2": [
    { id: "3", name: "लामजना", nameEn: "Lamjana" },
    { id: "4", name: "कासारवाडी", nameEn: "Kasarwadi" },
  ],
}

const columns: ColumnDef<Village>[] = [
  {
    accessorKey: "name",
    header: "गाव नाव (मराठी)",
  },
  {
    accessorKey: "nameEn",
    header: "गाव नाव (इंग्रजी)",
  },
  {
    id: "actions",
    header: () => <div className="text-right">क्रिया</div>,
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="flex items-center justify-end gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>हटवा</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    ),
  },
]

export default function GutDetailsPage() {
  const params = useParams()
  const gutId = params.id as string
  const villages = gutVillages[gutId] || []
  const gutName = gutId === "1" ? "गट १०१" : "गट १०२";

  const table = useReactTable({
    data: villages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
             <CardTitle>गट तपशील: {gutName}</CardTitle>
             <Button variant="outline" asChild>
                <Link href="/dashboard/settings">
                    <ArrowLeft className="mr-2" /> परत जा
                </Link>
             </Button>
        </div>
        <CardDescription>
            या गटाशी संबंधित गावांची यादी.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
              {table.getRowModel().rows?.length ? (
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
                    या गटासाठी गावे नाहीत.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
