
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
import { Edit, Eye, PlusCircle, Trash2, Upload } from "lucide-react"
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
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type MasterDataItem = {
  id: string
  name: string // Marathi name
  nameEn: string // English name
  linkedTo?: string
  category?: string
  [key: string]: any
}

// Mock Data
const states: MasterDataItem[] = [
  { id: "1", name: "महाराष्ट्र", nameEn: "Maharashtra" },
  { id: "2", name: "कर्नाटक", nameEn: "Karnataka" },
  { id: "3", name: "गोवा", nameEn: "Goa" },
  { id: "4", name: "गुजरात", nameEn: "Gujarat" },
]

const districts: MasterDataItem[] = [
  { id: "1", name: "लातूर", nameEn: "Latur", linkedTo: "महाराष्ट्र" },
  { id: "2", name: "पुणे", nameEn: "Pune", linkedTo: "महाराष्ट्र" },
  { id: "3", name: "सातारा", nameEn: "Satara", linkedTo: "महाराष्ट्र" },
  { id: "4", name: "धारवाड", nameEn: "Dharwad", linkedTo: "कर्नाटक" },
]

const talukas: MasterDataItem[] = [
  { id: "1", name: "लातूर", nameEn: "Latur", linkedTo: "लातूर" },
  { id: "2", name: "औसा", nameEn: "Ausa", linkedTo: "लातूर" },
  { id: "3", name: "उदगीर", nameEn: "Udgir", linkedTo: "लातूर" },
  { id: "4", name: "निलंगा", nameEn: "Nilanga", linkedTo: "लातूर" },
  { id: "5", name: "अहमदपूर", nameEn: "Ahmedpur", linkedTo: "लातूर" },
]

const circles: MasterDataItem[] = [
  { id: "1", name: "सर्कल १", nameEn: "Circle 1", totalGuts: 15, totalGavs: 225, totalFarmers: 7875, totalFieldboys: 225, totalOversheers: 23 },
  { id: "2", name: "सर्कल २", nameEn: "Circle 2", totalGuts: 18, totalGavs: 270, totalFarmers: 9450, totalFieldboys: 270, totalOversheers: 27 },
]

const guts: MasterDataItem[] = [
  { id: "1", name: "गट १०१", nameEn: "Gut 101", linkedTo: "सर्कल १", totalGavs: 15, totalFarmers: 525, totalFieldboys: 15, totalOversheers: 2 },
  { id: "2", name: "गट १०२", nameEn: "Gut 102", linkedTo: "सर्कल २", totalGavs: 12, totalFarmers: 420, totalFieldboys: 12, totalOversheers: 1 },
]

const villages: MasterDataItem[] = [
  { id: "1", name: "चाकूर", nameEn: "Chakur", linkedTo: "अहमदपूर", gut: "गट १०१", circle: "सर्कल १", totalFarmers: 35, totalFieldboys: 1, totalOversheers: 1 },
  { id: "2", name: "मोहगाव", nameEn: "Mohgaon", linkedTo: "अहमदपूर", gut: "गट १०१", circle: "सर्कल १", totalFarmers: 40, totalFieldboys: 1, totalOversheers: 1 },
  { id: "3", name: "लामजना", nameEn: "Lamjana", linkedTo: "औसा", gut: "गट १०२", circle: "सर्कल २", totalFarmers: 38, totalFieldboys: 1, totalOversheers: 1 },
  { id: "4", name: "कासारवाडी", nameEn: "Kasarwadi", linkedTo: "लातूर", gut: "गट १०२", circle: "सर्कल २", totalFarmers: 32, totalFieldboys: 1, totalOversheers: 1 },
]

const shivars: MasterDataItem[] = [
  { id: "1", name: "शिवार अ", nameEn: "Shivar A", linkedTo: "चाकूर" },
  { id: "2", name: "शिवार ब", nameEn: "Shivar B", linkedTo: "मोहगाव" },
]

const surveyNumbers: MasterDataItem[] = [
  { id: "1", name: "SN-123", nameEn: "SN-123", linkedTo: "शिवार अ" },
  { id: "2", name: "SN-456", nameEn: "SN-456", linkedTo: "शिवार ब" },
]

const caneVarieties: MasterDataItem[] = [
  { id: "1", name: "को-८६०३२", nameEn: "Co-86032", maturityMonths: 12 },
  { id: "2", name: "कोएम-०२६५", nameEn: "CoM-0265", maturityMonths: 14 },
  { id: "3", name: "एमएस-१०००१", nameEn: "MS-10001", maturityMonths: 11 },
]

const caneTypes: MasterDataItem[] = [
  { id: "1", name: "रोप", nameEn: "Seedling", linkedTo: "को-८६०३२" },
  { id: "2", name: "लागवड", nameEn: "Planting", linkedTo: "कोएम-०२६५" },
]

const irrigationTypes: MasterDataItem[] = [
  { id: "1", name: "ठिबक", nameEn: "Drip" },
  { id: "2", name: "प्रवाही", nameEn: "Flow" },
]

const irrigationSources: MasterDataItem[] = [
  { id: "1", name: "विहीर", nameEn: "Well" },
  { id: "2", name: "कालवा", nameEn: "Canal" },
]

const irrigationMethods: MasterDataItem[] = [
  { id: "1", name: "पद्धत १", nameEn: "Method 1" },
  { id: "2", name: "पद्धत २", nameEn: "Method 2" },
]

const plantationMethods: MasterDataItem[] = [
  { id: "1", name: "पद्धत अ", nameEn: "Method A" },
  { id: "2", name: "पद्धत ब", nameEn: "Method B" },
]

export const masterDataMap = {
  states: { data: states, linkedEntity: null, category: "Location", entityName: "State", label: "State" },
  districts: { data: districts, linkedEntity: "State", category: "Location", entityName: "District", label: "District" },
  talukas: { data: talukas, linkedEntity: "District", category: "Location", entityName: "Taluka", label: "Taluka" },
  villages: { data: villages, linkedEntity: "Taluka", category: "Location", entityName: "Village", label: "Village" },
  shivars: { data: shivars, linkedEntity: "Village", category: "Location", entityName: "Shivar", label: "Shivar" },
  circles: { data: circles, linkedEntity: null, category: "Location", entityName: "Circle", label: "Circle" },
  guts: { data: guts, linkedEntity: "Circle", category: "Location", entityName: "Gut", label: "Gut" },
  surveyNumbers: { data: surveyNumbers, linkedEntity: "Shivar", category: "Location", entityName: "Survey Number", label: "Survey Number" },
  caneVarieties: { data: caneVarieties, linkedEntity: null, category: "Farming", entityName: "Cane Variety", label: "Cane Variety" },
  caneTypes: { data: caneTypes, linkedTo: "Cane Variety", category: "Farming", entityName: "Cane Type", label: "Cane Type" },
  irrigationTypes: { data: irrigationTypes, linkedEntity: null, category: "Farming", entityName: "Irrigation Type", label: "Irrigation Type" },
  irrigationSources: { data: irrigationSources, linkedEntity: null, category: "Farming", entityName: "Irrigation Source", label: "Irrigation Source" },
  irrigationMethods: { data: irrigationMethods, linkedEntity: null, category: "Farming", entityName: "Irrigation Method", label: "Irrigation Method" },
  plantationMethods: { data: plantationMethods, linkedEntity: null, category: "Farming", entityName: "Plantation Method", label: "Plantation Method" },
}

export type MasterDataKey = keyof typeof masterDataMap

const getColumns = (
  entityKey: MasterDataKey,
  onEdit: (item: MasterDataItem) => void
): ColumnDef<MasterDataItem>[] => {
  
  const { entityName, linkedEntity, category } = masterDataMap[entityKey];
  
  const columns: ColumnDef<MasterDataItem>[] = [
    {
      accessorKey: "name",
      header: `${entityName} Name (Marathi)`,
    },
    {
      accessorKey: "nameEn",
      header: `${entityName} Name (English)`,
    },
  ]

  if (linkedEntity) {
    columns.push({
      accessorKey: "linkedTo",
      header: `Linked ${linkedEntity}`,
    })
  }

  if (entityKey === 'caneVarieties') {
    columns.push({
        accessorKey: "maturityMonths",
        header: "Maturity (months)",
    });
  }

  if (entityKey === 'circles') {
      columns.push({
          accessorKey: "totalGuts",
          header: "Total Guts",
      });
      columns.push({
          accessorKey: "totalGavs",
          header: "Total Villages",
      });
      columns.push({
          accessorKey: "totalFarmers",
          header: "Total Farmers",
      });
      columns.push({
          accessorKey: "totalFieldboys",
          header: "Total Fieldboys",
      });
      columns.push({
          accessorKey: "totalOversheers",
          header: "Total Overseers",
      });
       columns.push({
          id: "ratio",
          header: "Ratio",
          cell: ({ row }) => {
              const farmers = row.original.totalFarmers;
              const fieldboys = row.original.totalFieldboys;
              if (fieldboys > 0) {
                  return `${Math.round(farmers / fieldboys)}:1`;
              }
              return "N/A";
          },
      });
  }

  if (entityKey === 'guts') {
      columns.push({
          accessorKey: "totalGavs",
          header: "Total Villages",
      });
      columns.push({
          accessorKey: "totalFarmers",
          header: "Total Farmers",
      });
      columns.push({
          accessorKey: "totalFieldboys",
          header: "Total Fieldboys",
      });
      columns.push({
          accessorKey: "totalOversheers",
          header: "Total Overseers",
      });
       columns.push({
          id: "ratio",
          header: "Ratio",
          cell: ({ row }) => {
              const farmers = row.original.totalFarmers;
              const fieldboys = row.original.totalFieldboys;
              if (fieldboys > 0) {
                  return `${Math.round(farmers / fieldboys)}:1`;
              }
              return "N/A";
          },
      });
  }

  if (entityKey === 'villages') {
    columns.push({
        accessorKey: "gut",
        header: "Gut",
    });
    columns.push({
        accessorKey: "circle",
        header: "Circle",
    });
    columns.push({
        accessorKey: "totalFarmers",
        header: "Total Farmers",
    });
    columns.push({
        accessorKey: "totalFieldboys",
        header: "Total Fieldboys",
    });
    columns.push({
        accessorKey: "totalOversheers",
        header: "Total Overseers",
    });
  }

  if (category) {
    columns.push({
      accessorKey: "category",
      header: category,
    })
  }
  
  columns.push({
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="flex items-center justify-end gap-2">
            {entityKey === 'guts' && (
               <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/dashboard/settings/gut/${row.original.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View Gut</p>
                    </TooltipContent>
                </Tooltip>
            )}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(row.original)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
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
  onEdit,
  selectedConfig,
  setSelectedConfig,
  configOptions,
}: {
  dataKey: MasterDataKey
  onEdit: (entityName: string, item: MasterDataItem) => void
  selectedConfig: MasterDataKey
  setSelectedConfig: (value: MasterDataKey) => void
  configOptions: { value: MasterDataKey; label: string }[]
}) {
  const { data, entityName } = masterDataMap[dataKey]
  const columns = React.useMemo(
    () => getColumns(dataKey, (item) => onEdit(entityName, item)),
    [dataKey, entityName, onEdit]
  )

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
        const name = row.getValue<string>('name');
        const nameEn = row.getValue<string>('nameEn');
        return name?.includes(filterValue) || nameEn?.toLowerCase().includes(filterValue.toLowerCase());
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-4">
        <Select value={selectedConfig} onValueChange={(value) => setSelectedConfig(value as MasterDataKey)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select config type" />
          </SelectTrigger>
          <SelectContent>
            {configOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
            <Input
              placeholder={`Filter by ${entityName.toLowerCase()} name...`}
              value={globalFilter}
              onChange={(event) =>
                setGlobalFilter(event.target.value)
              }
              className="max-w-sm"
            />
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
  )
}

function MasterDataModal({
  isOpen,
  onClose,
  entityType,
  onSave,
  mode,
  initialData
}: {
  isOpen: boolean
  onClose: () => void
  entityType: string | null
  onSave: (data: Omit<MasterDataItem, 'id'>) => void;
  mode: 'add' | 'edit';
  initialData: MasterDataItem | null;
}) {
    const { toast } = useToast();
    const [name, setName] = React.useState("");
    const [nameEn, setNameEn] = React.useState("");
    const [linkedTo, setLinkedTo] = React.useState("");
    const [maturityMonths, setMaturityMonths] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
             if (mode === 'edit' && initialData) {
                setName(initialData.name || "");
                setNameEn(initialData.nameEn || "");
                setLinkedTo(initialData.linkedTo || "");
                setMaturityMonths(initialData.maturityMonths || "");
            } else { // For add mode, reset fields
                setName("");
                setNameEn("");
                setLinkedTo("");
                setMaturityMonths("");
            }
        }
    }, [isOpen, mode, initialData]);
    
    if (!isOpen || !entityType) {
        return null;
    }

  const title = mode === 'add' ? `Add New ${entityType}` : `Update ${entityType}`;
  const buttonText = mode === 'add' ? 'Add New' : 'Update';

  const getLinkedEntityInfo = () => {
    let linkedEntityOptions: MasterDataItem[] = [];
    let linkedEntityLabel = '';
    let isLinkedEntityRequired = false;
    let placeholder = `Select ${entityType}`;

    switch (entityType) {
        case "District":
            linkedEntityOptions = states;
            linkedEntityLabel = 'Linked State';
            isLinkedEntityRequired = true;
            placeholder = "Select State";
            break;
        case "Taluka":
            linkedEntityOptions = districts;
            linkedEntityLabel = 'Linked District';
            isLinkedEntityRequired = true;
            placeholder = "Select District";
            break;
        case "Village":
            linkedEntityOptions = talukas; // Can also be linked to 'Gut' but we need to handle that logic. For now, taluka.
            linkedEntityLabel = 'Linked Taluka';
            isLinkedEntityRequired = true;
            placeholder = "Select Taluka";
            break;
        case "Shivar":
            linkedEntityOptions = villages;
            linkedEntityLabel = 'Linked Village';
            isLinkedEntityRequired = true;
            placeholder = "Select Village";
            break;
        case "Gut":
            linkedEntityOptions = circles;
            linkedEntityLabel = 'Linked Circle';
            isLinkedEntityRequired = true;
            placeholder = "Select Circle";
            break;
        case "Survey Number":
            linkedEntityOptions = shivars;
            linkedEntityLabel = 'Linked Shivar';
            isLinkedEntityRequired = true;
            placeholder = "Select Shivar";
            break;
        case "Cane Type":
            linkedEntityOptions = caneVarieties;
            linkedEntityLabel = 'Linked Cane Variety';
            isLinkedEntityRequired = true;
            placeholder = "Select Cane Variety";
            break;
    }
    return { linkedEntityOptions, linkedEntityLabel, isLinkedEntityRequired, placeholder };
  }

  const { linkedEntityOptions, linkedEntityLabel, isLinkedEntityRequired, placeholder } = getLinkedEntityInfo();
  
  let isFormValid = name.trim() !== "" && nameEn.trim() !== "" && (!isLinkedEntityRequired || linkedTo);
  if (entityType === "Cane Variety") {
    isFormValid = isFormValid && maturityMonths.trim() !== "" && !isNaN(Number(maturityMonths));
  }
  
  const handleSaveClick = () => {
      if (!isFormValid) {
          toast({
              variant: "destructive",
              title: "Error",
              description: "Please fill all required fields."
          });
          return;
      }
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
          onSave({ name, nameEn, linkedTo, maturityMonths: Number(maturityMonths) });
          setIsSubmitting(false);
      }, 500);
  }

  const renderFormFields = () => {
    let linkedEntityElement = null;

    if (linkedEntityLabel && linkedEntityOptions.length > 0) {
        linkedEntityElement = (
            <div className="grid gap-2">
                <Label htmlFor="parent-entity">{linkedEntityLabel} <span className="text-red-500">*</span></Label>
                <Select value={linkedTo} onValueChange={setLinkedTo}>
                    <SelectTrigger id="parent-entity"><SelectValue placeholder={placeholder} /></SelectTrigger>
                    <SelectContent>
                        {linkedEntityOptions.map(o => <SelectItem key={o.id} value={o.name}>{o.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        );
    }
    
    return (
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name-mr">{entityType} Name (Marathi) <span className="text-red-500">*</span></Label>
          <Input id="name-mr" placeholder="Enter Marathi name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name-en">{entityType} Name (English) <span className="text-red-500">*</span></Label>
          <Input id="name-en" placeholder="Enter English name" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
        </div>
        {linkedEntityElement}
        {entityType === 'Cane Variety' && (
            <div className="grid gap-2">
                <Label htmlFor="maturity-months">Maturity (months) <span className="text-red-500">*</span></Label>
                <Input
                    id="maturity-months"
                    type="number"
                    placeholder="e.g., 12"
                    value={maturityMonths}
                    onChange={(e) => setMaturityMonths(e.target.value)}
                    required
                />
            </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {renderFormFields()}
            </div>
            <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveClick} disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "Saving..." : buttonText}
            </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}

function SettingsPageComponent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const initialConfig = searchParams.get('config') as MasterDataKey | null;

  const [selectedConfig, setSelectedConfig] = React.useState<MasterDataKey>(initialConfig || "states");

  const configOptions = Object.keys(masterDataMap).map(key => ({
    value: key as MasterDataKey,
    label: masterDataMap[key as MasterDataKey].label,
  }));

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<'add' | 'edit'>('add');
  const [currentEntityType, setCurrentEntityType] = React.useState<string | null>(null);
  const [editingItem, setEditingItem] = React.useState<MasterDataItem | null>(null);
  
  const handleEdit = (entityName: string, item: MasterDataItem) => {
    setCurrentEntityType(entityName);
    setModalMode('edit');
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEntityType(null);
    setEditingItem(null);
  };

  const handleSave = (data: Omit<MasterDataItem, 'id'>) => {
    if (currentEntityType) {
      toast({
        title: "Success!",
        description: `${currentEntityType} has been successfully ${modalMode === 'add' ? 'created' : 'updated'}.`,
      });
    }
    // Here you would typically call an API to save the data
    console.log("Saving data:", data);
    handleCloseModal();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Master Data Configuration</CardTitle>
          <div className="flex items-center gap-2">
             <Button variant="outline"><Upload className="mr-2"/> Bulk Upload</Button>
             <Button asChild>
                <Link href="/dashboard/settings/new">
                    <PlusCircle className="mr-2"/> Add
                </Link>
            </Button>
          </div>
        </div>
        <CardDescription>
          Manage all the master data required for the system here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MasterDataTable 
            dataKey={selectedConfig} 
            onEdit={handleEdit}
            selectedConfig={selectedConfig}
            setSelectedConfig={setSelectedConfig}
            configOptions={configOptions}
        />
        <MasterDataModal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            entityType={currentEntityType}
            onSave={handleSave}
            mode={modalMode}
            initialData={editingItem}
        />
      </CardContent>
    </Card>
  )
}


export default function SettingsPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <SettingsPageComponent />
        </React.Suspense>
    )
}
