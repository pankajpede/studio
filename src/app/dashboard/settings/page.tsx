
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, PlusCircle, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type MasterDataItem = {
  id: string
  name: string
  linkedTo?: string
  category?: string
  [key: string]: any
}

// Mock Data
const states: MasterDataItem[] = [
  { id: "1", name: "Maharashtra" },
  { id: "2", name: "Karnataka" },
]

const districts: MasterDataItem[] = [
  { id: "1", name: "Pune", linkedTo: "Maharashtra" },
  { id: "2", name: "Satara", linkedTo: "Maharashtra" },
  { id: "3", name: "Belagavi", linkedTo: "Karnataka" },
]

const talukas: MasterDataItem[] = [
  { id: "1", name: "Baramati", linkedTo: "Pune" },
  { id: "2", name: "Indapur", linkedTo: "Pune" },
  { id: "3", name: "Karad", linkedTo: "Satara" },
]

const villages: MasterDataItem[] = [
  { id: "1", name: "Kothari", linkedTo: "Baramati" },
  { id: "2", name: "Wadgaon", linkedTo: "Baramati" },
]

const caneTypes: MasterDataItem[] = [
  { id: "1", name: "Co-86032", category: "Early" },
  { id: "2", name: "CoM-0265", category: "Mid-late" },
  { id: "3", name: "MS-10001", category: "Early" },
]

const soilTypes: MasterDataItem[] = [
  { id: "1", name: "Black Cotton" },
  { id: "2", name: "Red Loam" },
]

const masterDataMap = {
  states: { data: states, linkedEntity: null, category: null, entityName: "State" },
  districts: { data: districts, linkedEntity: "State", category: null, entityName: "District" },
  talukas: { data: talukas, linkedEntity: "District", category: null, entityName: "Taluka" },
  villages: { data: villages, linkedEntity: "Taluka", category: null, entityName: "Village" },
  caneTypes: { data: caneTypes, linkedEntity: null, category: "Maturity Category", entityName: "Cane Type" },
  soilTypes: { data: soilTypes, linkedEntity: null, category: null, entityName: "Soil Type" },
}

type MasterDataKey = keyof typeof masterDataMap

const getColumns = (
  entityName: string,
  linkedEntity: string | null,
  category: string | null
): ColumnDef<MasterDataItem>[] => {
  const columns: ColumnDef<MasterDataItem>[] = [
    {
      accessorKey: "name",
      header: `${entityName} Name`,
    },
  ]

  if (linkedEntity) {
    columns.push({
      accessorKey: "linkedTo",
      header: `Linked ${linkedEntity}`,
    })
  }

  if (category) {
    columns.push({
      accessorKey: "category",
      header: category,
    })
  }
  
  columns.push({
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  })

  return columns
}


function MasterDataTable({
  dataKey,
  onAddNew,
}: {
  dataKey: MasterDataKey
  onAddNew: (entityName: string) => void
}) {
  const { data, linkedEntity, category, entityName } = masterDataMap[dataKey]
  const columns = React.useMemo(() => getColumns(entityName, linkedEntity, category), [entityName, linkedEntity, category])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

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
  })

  return (
    <div>
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder={`Filter by ${entityName.toLowerCase()} name...`}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline"><Upload className="mr-2" /> Bulk Upload</Button>
          <Button onClick={() => onAddNew(entityName)}><PlusCircle className="mr-2" /> Add New</Button>
        </div>
      </div>
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
                  No results.
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
  )
}

function MasterDataModal({
  isOpen,
  onClose,
  entityType,
}: {
  isOpen: boolean
  onClose: () => void
  entityType: string | null
}) {
  if (!isOpen || !entityType) return null;

  const renderFormFields = () => {
    switch (entityType) {
      case "State":
        return (
          <div className="grid gap-2">
            <Label htmlFor="state-name">State Name</Label>
            <Input id="state-name" placeholder="Enter state name" />
          </div>
        );
      case "District":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="district-name">District Name</Label>
              <Input id="district-name" placeholder="Enter district name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-state">Linked State</Label>
              <Select>
                <SelectTrigger id="parent-state"><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {states.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "Taluka":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="taluka-name">Taluka Name</Label>
              <Input id="taluka-name" placeholder="Enter taluka name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-district">Linked District</Label>
              <Select>
                <SelectTrigger id="parent-district"><SelectValue placeholder="Select district" /></SelectTrigger>
                <SelectContent>
                  {districts.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
       case "Village":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="village-name">Village Name</Label>
              <Input id="village-name" placeholder="Enter village name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-taluka">Linked Taluka</Label>
              <Select>
                <SelectTrigger id="parent-taluka"><SelectValue placeholder="Select taluka" /></SelectTrigger>
                <SelectContent>
                  {talukas.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "Cane Type":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cane-type-name">Cane Type Name</Label>
              <Input id="cane-type-name" placeholder="Enter cane type name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maturity-category">Maturity Category</Label>
              <Select>
                <SelectTrigger id="maturity-category"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Early">Early</SelectItem>
                  <SelectItem value="Mid-late">Mid-late</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "Soil Type":
        return (
          <div className="grid gap-2">
            <Label htmlFor="soil-type-name">Soil Type Name</Label>
            <Input id="soil-type-name" placeholder="Enter soil type name" />
          </div>
        );
      default:
        return <p>Invalid entity type selected.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Add New {entityType}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {renderFormFields()}
            </div>
            <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}

export default function SettingsPage() {
  const masterDataTabs = [
    { value: "states", label: "State", dataKey: "states" as MasterDataKey },
    { value: "districts", label: "District", dataKey: "districts" as MasterDataKey },
    { value: "talukas", label: "Taluka", dataKey: "talukas" as MasterDataKey },
    { value: "villages", label: "Village", dataKey: "villages" as MasterDataKey },
    { value: "caneTypes", label: "Cane Type", dataKey: "caneTypes" as MasterDataKey },
    { value: "soilTypes", label: "Soil Type", dataKey: "soilTypes" as MasterDataKey },
  ]

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentEntityType, setCurrentEntityType] = React.useState<string | null>(null);

  const handleAddNew = (entityName: string) => {
    setCurrentEntityType(entityName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEntityType(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>Manage master data for the application.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="states" className="w-full">
          <TabsList className="overflow-x-auto w-full justify-start">
            {masterDataTabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {masterDataTabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <MasterDataTable dataKey={tab.dataKey} onAddNew={handleAddNew} />
            </TabsContent>
          ))}
        </Tabs>
        <MasterDataModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            entityType={currentEntityType}
        />
      </CardContent>
    </Card>
  )
}

    