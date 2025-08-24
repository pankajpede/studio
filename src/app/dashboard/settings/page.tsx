
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

const circles: MasterDataItem[] = [
  { id: "1", name: "सर्कल १", linkedTo: "लातूर" },
  { id: "2", name: "सर्कल २", linkedTo: "अहमदपूर" },
]

const guts: MasterDataItem[] = [
  { id: "1", name: "गट १०१", linkedTo: "सर्कल १" },
  { id: "2", name: "गट १०२", linkedTo: "सर्कल २" },
]

const villages: MasterDataItem[] = [
  { id: "1", name: "चाकूर", linkedTo: "अहमदपूर" },
  { id: "2", name: "मोहगाव", linkedTo: "अहमदपूर" },
  { id: "3", name: "लामजना", linkedTo: "औसा" },
  { id: "4", name: "कासारवाडी", linkedTo: "लातूर" },
]

const shivars: MasterDataItem[] = [
  { id: "1", name: "शिवार अ", linkedTo: "चाकूर" },
  { id: "2", name: "शिवार ब", linkedTo: "मोहगाव" },
]

const surveyNumbers: MasterDataItem[] = [
  { id: "1", name: "SN-123", linkedTo: "शिवार अ" },
  { id: "2", name: "SN-456", linkedTo: "शिवार ब" },
]

const caneVarieties: MasterDataItem[] = [
  { id: "1", name: "को-८६०३२", category: "लवकर" },
  { id: "2", name: "कोएम-०२६५", category: "मध्यम-उशिरा" },
  { id: "3", name: "एमएस-१०००१", category: "लवकर" },
]

const caneMaturities: MasterDataItem[] = [
  { id: "1", name: "प्रकार १ (12 महिने)", linkedTo: "को-८६०३२" },
  { id: "2", name: "प्रकार २ (14 महिने)", linkedTo: "कोएम-०२६५" },
]

const caneTypes: MasterDataItem[] = [
  { id: "1", name: "रोप", linkedTo: "को-८६०३२" },
  { id: "2", name: "लागवड", linkedTo: "कोएम-०२६५" },
]

const irrigationTypes: MasterDataItem[] = [
  { id: "1", name: "ठिबक" },
  { id: "2", name: "प्रवाही" },
]

const irrigationSources: MasterDataItem[] = [
  { id: "1", name: "विहीर" },
  { id: "2", name: "कालवा" },
]

const irrigationMethods: MasterDataItem[] = [
  { id: "1", name: "पद्धत १" },
  { id: "2", name: "पद्धत २" },
]

const plantationMethods: MasterDataItem[] = [
  { id: "1", name: "पद्धत अ" },
  { id: "2", name: "पद्धत ब" },
]

const masterDataMap = {
  states: { data: states, linkedEntity: null, category: null, entityName: "राज्य", label: "राज्य" },
  districts: { data: districts, linkedEntity: "राज्य", category: null, entityName: "जिल्हा", label: "जिल्हा" },
  talukas: { data: talukas, linkedEntity: "जिल्हा", category: null, entityName: "तालुका", label: "तालुका" },
  circles: { data: circles, linkedEntity: "तालुका", category: null, entityName: "सर्कल", label: "सर्कल" },
  guts: { data: guts, linkedEntity: "सर्कल", category: null, entityName: "गट", label: "गट" },
  villages: { data: villages, linkedEntity: "तालुका", category: null, entityName: "गाव", label: "गाव" },
  shivars: { data: shivars, linkedEntity: "गाव", category: null, entityName: "शिवार", label: "शिवार" },
  surveyNumbers: { data: surveyNumbers, linkedEntity: "शिवार", category: null, entityName: "सर्वेक्षण नंबर", label: "सर्वेक्षण नंबर" },
  caneVarieties: { data: caneVarieties, linkedEntity: null, category: "पक्वता श्रेणी", entityName: "उसाची जात", label: "उसाची जात" },
  caneMaturities: { data: caneMaturities, linkedEntity: "उसाची जात", category: null, entityName: "उसाची पक्वता", label: "उसाची पक्वता" },
  caneTypes: { data: caneTypes, linkedEntity: "उसाची जात", category: null, entityName: "उसाचा प्रकार", label: "उसाचा प्रकार" },
  irrigationTypes: { data: irrigationTypes, linkedEntity: null, category: null, entityName: "सिंचनाचा प्रकार", label: "सिंचनाचा प्रकार" },
  irrigationSources: { data: irrigationSources, linkedEntity: null, category: null, entityName: "सिंचनाचा स्रोत", label: "सिंचनाचा स्रोत" },
  irrigationMethods: { data: irrigationMethods, linkedEntity: null, category: null, entityName: "सिंचन पद्धत", label: "सिंचन पद्धत" },
  plantationMethods: { data: plantationMethods, linkedEntity: null, category: null, entityName: "लागवड पद्धत", label: "लागवड पद्धत" },
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
        case "सर्कल":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="circle-name">सर्कलचे नाव</Label>
              <Input id="circle-name" placeholder="सर्कलचे नाव प्रविष्ट करा" />
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
      case "गट":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="gut-name">गटाचे नाव</Label>
              <Input id="gut-name" placeholder="गटाचे नाव प्रविष्ट करा" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-circle">जोडलेले सर्कल</Label>
              <Select>
                <SelectTrigger id="parent-circle"><SelectValue placeholder="सर्कल निवडा" /></SelectTrigger>
                <SelectContent>
                  {circles.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
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
       case "शिवार":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="shivar-name">शिवाराचे नाव</Label>
              <Input id="shivar-name" placeholder="शिवाराचे नाव प्रविष्ट करा" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-village">जोडलेले गाव</Label>
              <Select>
                <SelectTrigger id="parent-village"><SelectValue placeholder="गाव निवडा" /></SelectTrigger>
                <SelectContent>
                  {villages.map(v => <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "सर्वेक्षण नंबर":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="survey-no-name">सर्वेक्षण नंबर</Label>
              <Input id="survey-no-name" placeholder="सर्वेक्षण नंबर प्रविष्ट करा" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-shivar">जोडलेले शिवार</Label>
              <Select>
                <SelectTrigger id="parent-shivar"><SelectValue placeholder="शिवार निवडा" /></SelectTrigger>
                <SelectContent>
                  {shivars.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "उसाची जात":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cane-variety-name">उसाच्या जातीचे नाव</Label>
              <Input id="cane-variety-name" placeholder="उसाच्या जातीचे नाव प्रविष्ट करा" />
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
      case "उसाची पक्वता":
        return (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cane-maturity-name">पक्वता प्रकार</Label>
              <Input id="cane-maturity-name" placeholder="उदा. प्रकार १ (12 महिने)" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-cane-variety">जोडलेली उसाची जात</Label>
              <Select>
                <SelectTrigger id="parent-cane-variety"><SelectValue placeholder="उसाची जात निवडा" /></SelectTrigger>
                <SelectContent>
                  {caneVarieties.map(v => <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>)}
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
              <Input id="cane-type-name" placeholder="उदा. रोप, लागवड" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent-cane-variety">जोडलेली उसाची जात</Label>
              <Select>
                <SelectTrigger id="parent-cane-variety"><SelectValue placeholder="उसाची जात निवडा" /></SelectTrigger>
                <SelectContent>
                  {caneVarieties.map(v => <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "सिंचनाचा प्रकार":
      case "सिंचनाचा स्रोत":
      case "सिंचन पद्धत":
      case "लागवड पद्धत":
        return (
          <div className="grid gap-2">
            <Label htmlFor={`${entityType}-name`}>{entityType} नाव</Label>
            <Input id={`${entityType}-name`} placeholder={`${entityType} नाव प्रविष्ट करा`} />
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
  const [selectedConfig, setSelectedConfig] = React.useState<MasterDataKey>("states");

  const configOptions = Object.keys(masterDataMap).map(key => ({
    value: key as MasterDataKey,
    label: masterDataMap[key as MasterDataKey].label,
  }));

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
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <CardTitle>कॉन्फिगरेशन</CardTitle>
        <Select value={selectedConfig} onValueChange={(value) => setSelectedConfig(value as MasterDataKey)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="कॉन्फिगरेशन प्रकार निवडा" />
          </SelectTrigger>
          <SelectContent>
            {configOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
         <CardDescription className="mb-4">
              अनुप्रयोगासाठी मास्टर डेटा व्यवस्थापित करा.
          </CardDescription>
        <MasterDataTable dataKey={selectedConfig} onAddNew={handleAddNew} />
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

    