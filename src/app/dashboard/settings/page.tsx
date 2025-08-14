
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
import { Edit, PlusCircle, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type MasterDataItem = {
  id: string
  name: string
  linkedTo?: string
  category?: string
  [key: string]: any
}

// Mock Data
const states: MasterDataItem[] = [
  { id: "1", name: "महाराष्ट्र" },
]

const districts: MasterDataItem[] = [
  { id: "1", name: "लातूर", linkedTo: "महाराष्ट्र" },
  { id: "2", name: "पुणे", linkedTo: "महाराष्ट्र" },
  { id: "3", name: "सातारा", linkedTo: "महाराष्ट्र" },
]

const talukas: MasterDataItem[] = [
  { id: "1", name: "लातूर", linkedTo: "लातूर" },
  { id: "2", name: "औसा", linkedTo: "लातूर" },
  { id: "3", name: "उदगीर", linkedTo: "लातूर" },
  { id: "4", name: "निलंगा", linkedTo: "लातूर" },
  { id: "5", name: "अहमदपूर", linkedTo: "लातूर" },
]

const villages: MasterDataItem[] = [
  { id: "1", name: "चाकूर", linkedTo: "अहमदपूर" },
  { id: "2", name: "मोहगाव", linkedTo: "अहमदपूर" },
  { id: "3", name: "लामजना", linkedTo: "औसा" },
  { id: "4", name: "कासारवाडी", linkedTo: "लातूर" },
]

const caneTypes: MasterDataItem[] = [
  { id: "1", name: "को-८६०३२", category: "लवकर" },
  { id: "2", name: "कोएम-०२६५", category: "मध्यम-उशिरा" },
  { id: "3", name: "एमएस-१०००१", category: "लवकर" },
]

const soilTypes: MasterDataItem[] = [
  { id: "1", name: "काळी कापूस" },
  { id: "2", name: "लाल चिकणमाती" },
]

const masterDataMap = {
  states: { data: states, linkedEntity: null, category: null, entityName: "राज्य" },
  districts: { data: districts, linkedEntity: "राज्य", category: null, entityName: "जिल्हा" },
  talukas: { data: talukas, linkedEntity: "जिल्हा", category: null, entityName: "तालुका" },
  villages: { data: villages, linkedEntity: "तालुका", category: null, entityName: "गाव" },
  caneTypes: { data: caneTypes, linkedEntity: null, category: "पक्वता श्रेणी", entityName: "उसाचा प्रकार" },
  soilTypes: { data: soilTypes, linkedEntity: null, category: null, entityName: "मातीचा प्रकार" },
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
      header: `${entityName} नाव`,
    },
  ]

  if (linkedEntity) {
    columns.push({
      accessorKey: "linkedTo",
      header: `जोडलेले ${linkedEntity}`,
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
    header: () => <div className="text-right">क्रिया</div>,
    cell: () => (
      <TooltipProvider>
        <div className="flex items-center justify-end gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>संपादित करा</p>
                </TooltipContent>
            </Tooltip>
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
          placeholder={`${entityName.toLowerCase()} नावाने फिल्टर करा...`}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <Button variant="outline"><Upload className="mr-2" /> बल्क अपलोड</Button>
          <Button onClick={() => onAddNew(entityName)}><PlusCircle className="mr-2" /> नवीन जोडा</Button>
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
    </div>
  )
}

function MasterDataModal({
  isOpen,
  onClose,
  entityType,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  entityType: string | null
  onSave: () => void;
}) {
  if (!isOpen || !entityType) return null;

  const renderFormFields = () => {
    switch (entityType) {
      case "राज्य":
        return (
          <div className="grid gap-2">
            <Label htmlFor="state-name">राज्याचे नाव</Label>
            <Input id="state-name" placeholder="राज्याचे नाव प्रविष्ट करा" />
          </div>
        );
      case "जिल्हा":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="district-name">जिल्ह्याचे नाव</Label>
              <Input id="district-name" placeholder="जिल्ह्याचे नाव प्रविष्ट करा" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-state">जोडलेले राज्य</Label>
              <Select>
                <SelectTrigger id="parent-state"><SelectValue placeholder="राज्य निवडा" /></SelectTrigger>
                <SelectContent>
                  {states.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "तालुका":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="taluka-name">तालुक्याचे नाव</Label>
              <Input id="taluka-name" placeholder="तालुक्याचे नाव प्रविष्ट करा" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-district">जोडलेला जिल्हा</Label>
              <Select>
                <SelectTrigger id="parent-district"><SelectValue placeholder="जिल्हा निवडा" /></SelectTrigger>
                <SelectContent>
                  {districts.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
       case "गाव":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="village-name">गावाचे नाव</Label>
              <Input id="village-name" placeholder="गावाचे नाव प्रविष्ट करा" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-taluka">जोडलेला तालुका</Label>
              <Select>
                <SelectTrigger id="parent-taluka"><SelectValue placeholder="तालुका निवडा" /></SelectTrigger>
                <SelectContent>
                  {talukas.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "उसाचा प्रकार":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cane-type-name">उसाच्या प्रकाराचे नाव</Label>
              <Input id="cane-type-name" placeholder="उसाच्या प्रकाराचे नाव प्रविष्ट करा" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maturity-category">पक्वता श्रेणी</Label>
              <Select>
                <SelectTrigger id="maturity-category"><SelectValue placeholder="श्रेणी निवडा" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Early">लवकर</SelectItem>
                  <SelectItem value="Mid-late">मध्यम-उशिरा</SelectItem>
                  <SelectItem value="Late">उशिरा</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "मातीचा प्रकार":
        return (
          <div className="grid gap-2">
            <Label htmlFor="soil-type-name">मातीच्या प्रकाराचे नाव</Label>
            <Input id="soil-type-name" placeholder="मातीच्या प्रकाराचे नाव प्रविष्ट करा" />
          </div>
        );
      default:
        return <p>अवैध घटक प्रकार निवडला आहे.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>नवीन {entityType} जोडा</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {renderFormFields()}
            </div>
            <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">रद्द करा</Button>
            </DialogClose>
            <Button type="submit" onClick={onSave}>बदल जतन करा</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const masterDataTabs = [
    { value: "states", label: "राज्य", dataKey: "states" as MasterDataKey },
    { value: "districts", label: "जिल्हा", dataKey: "districts" as MasterDataKey },
    { value: "talukas", label: "तालुका", dataKey: "talukas" as MasterDataKey },
    { value: "villages", label: "गाव", dataKey: "villages" as MasterDataKey },
    { value: "caneTypes", label: "उसाचा प्रकार", dataKey: "caneTypes" as MasterDataKey },
    { value: "soilTypes", label: "मातीचा प्रकार", dataKey: "soilTypes" as MasterDataKey },
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

  const handleSave = () => {
    if (currentEntityType) {
      toast({
        title: "यशस्वी!",
        description: `${currentEntityType} यशस्वीरित्या जतन केले आहे.`,
      });
    }
    handleCloseModal();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>कॉन्फिगरेशन</CardTitle>
        <CardDescription>अनुप्रयोगासाठी मास्टर डेटा व्यवस्थापित करा.</CardDescription>
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
            onSave={handleSave}
        />
      </CardContent>
    </Card>
  )
}

    