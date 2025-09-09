
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
]

const districts: MasterDataItem[] = [
  { id: "1", name: "लातूर", nameEn: "Latur", linkedTo: "महाराष्ट्र" },
  { id: "2", name: "पुणे", nameEn: "Pune", linkedTo: " महाराष्ट्र" },
  { id: "3", name: "सातारा", nameEn: "Satara", linkedTo: "महाराष्ट्र" },
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
  { id: "1", name: "चाकूर", nameEn: "Chakur", linkedTo: "अहमदपूर" },
  { id: "2", name: "मोहगाव", nameEn: "Mohgaon", linkedTo: "अहमदपूर" },
  { id: "3", name: "लामजना", nameEn: "Lamjana", linkedTo: "औसा" },
  { id: "4", name: "कासारवाडी", nameEn: "Kasarwadi", linkedTo: "लातूर" },
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

const masterDataMap = {
  states: { data: states, linkedEntity: null, category: null, entityName: "राज्य", label: "राज्य" },
  districts: { data: districts, linkedEntity: "राज्य", category: null, entityName: "जिल्हा", label: "जिल्हा" },
  talukas: { data: talukas, linkedEntity: "जिल्हा", category: null, entityName: "तालुका", label: "तालुका" },
  circles: { data: circles, linkedEntity: null, category: null, entityName: "सर्कल", label: "सर्कल" },
  guts: { data: guts, linkedEntity: "सर्कल", category: null, entityName: "गट", label: "गट" },
  villages: { data: villages, linkedEntity: "तालुका", category: null, entityName: "गाव", label: "गाव" },
  shivars: { data: shivars, linkedEntity: "गाव", category: null, entityName: "शिवार", label: "शिवार" },
  surveyNumbers: { data: surveyNumbers, linkedEntity: "शिवार", category: null, entityName: "सर्वेक्षण नंबर", label: "सर्वेक्षण नंबर" },
  caneVarieties: { data: caneVarieties, linkedEntity: null, category: null, entityName: "उसाची जात", label: "उसाची जात" },
  caneTypes: { data: caneTypes, linkedEntity: "उसाची जात", category: null, entityName: "उसाचा प्रकार", label: "उसाचा प्रकार" },
  irrigationTypes: { data: irrigationTypes, linkedEntity: null, category: null, entityName: "सिंचनाचा प्रकार", label: "सिंचनाचा प्रकार" },
  irrigationSources: { data: irrigationSources, linkedEntity: null, category: null, entityName: "सिंचनाचा स्रोत", label: "सिंचनाचा स्रोत" },
  irrigationMethods: { data: irrigationMethods, linkedEntity: null, category: null, entityName: "सिंचन पद्धत", label: "सिंचन पद्धत" },
  plantationMethods: { data: plantationMethods, linkedEntity: null, category: null, entityName: "लागवड पद्धत", label: "लागवड पद्धत" },
}

type MasterDataKey = keyof typeof masterDataMap

const getColumns = (
  entityKey: MasterDataKey,
  onEdit: (item: MasterDataItem) => void
): ColumnDef<MasterDataItem>[] => {
  
  const { entityName, linkedEntity, category } = masterDataMap[entityKey];
  
  const columns: ColumnDef<MasterDataItem>[] = [
    {
      accessorKey: "name",
      header: `${entityName} नाव (मराठी)`,
    },
    {
      accessorKey: "nameEn",
      header: `${entityName} नाव (इंग्रजी)`,
    },
  ]

  if (linkedEntity) {
    columns.push({
      accessorKey: "linkedTo",
      header: `जोडलेले ${linkedEntity}`,
    })
  }

  if (entityKey === 'caneVarieties') {
    columns.push({
        accessorKey: "maturityMonths",
        header: "उसाची पक्वता (months)",
    });
  }

  if (entityKey === 'circles') {
      columns.push({
          accessorKey: "totalGuts",
          header: "एकूण गट",
      });
      columns.push({
          accessorKey: "totalGavs",
          header: "एकूण गाव",
      });
      columns.push({
          accessorKey: "totalFarmers",
          header: "एकूण शेतकरी",
      });
      columns.push({
          accessorKey: "totalFieldboys",
          header: "एकूण फील्डबॉय",
      });
      columns.push({
          accessorKey: "totalOversheers",
          header: "एकूण ओव्हरसीर",
      });
       columns.push({
          id: "ratio",
          header: "गुणोत्तर",
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
          header: "एकूण गाव",
      });
      columns.push({
          accessorKey: "totalFarmers",
          header: "एकूण शेतकरी",
      });
      columns.push({
          accessorKey: "totalFieldboys",
          header: "एकूण फील्डबॉय",
      });
      columns.push({
          accessorKey: "totalOversheers",
          header: "एकूण ओव्हरसीर",
      });
       columns.push({
          id: "ratio",
          header: "गुणोत्तर",
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

  if (category) {
    columns.push({
      accessorKey: "category",
      header: category,
    })
  }
  
  columns.push({
    id: "actions",
    header: () => <div className="text-right">क्रिया</div>,
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
                        <p>गट पहा</p>
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
  onEdit
}: {
  dataKey: MasterDataKey
  onAddNew: (entityName: string) => void
  onEdit: (entityName: string, item: MasterDataItem) => void
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
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder={`${entityName.toLowerCase()} नावाने फिल्टर करा...`}
          value={globalFilter}
          onChange={(event) =>
            setGlobalFilter(event.target.value)
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

const RequiredLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
    <Label htmlFor={htmlFor}>
        {children} <span className="text-red-500">*</span>
    </Label>
);

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

  const title = mode === 'add' ? `नवीन ${entityType} जोडा` : `${entityType} अपडेट करा`;
  const buttonText = mode === 'add' ? 'नवीन जोडा' : 'अपडेट करा';

  const getLinkedEntityInfo = () => {
    let linkedEntityOptions: MasterDataItem[] = [];
    let linkedEntityLabel = '';
    let isLinkedEntityRequired = false;
    let placeholder = `${entityType} निवडा`;

    switch (entityType) {
        case "जिल्हा":
            linkedEntityOptions = states;
            linkedEntityLabel = 'जोडलेले राज्य';
            isLinkedEntityRequired = true;
            placeholder = "राज्य निवडा";
            break;
        case "तालुका":
            linkedEntityOptions = districts;
            linkedEntityLabel = 'जोडलेला जिल्हा';
            isLinkedEntityRequired = true;
            placeholder = "जिल्हा निवडा";
            break;
        case "गाव":
            linkedEntityOptions = talukas; // Can also be linked to 'गट' but we need to handle that logic. For now, taluka.
            linkedEntityLabel = 'जोडलेला तालुका';
            isLinkedEntityRequired = true;
            placeholder = "तालुका निवडा";
            break;
        case "शिवार":
            linkedEntityOptions = villages;
            linkedEntityLabel = 'जोडलेले गाव';
            isLinkedEntityRequired = true;
            placeholder = "गाव निवडा";
            break;
        case "गट":
            linkedEntityOptions = circles;
            linkedEntityLabel = 'जोडलेले सर्कल';
            isLinkedEntityRequired = true;
            placeholder = "सर्कल निवडा";
            break;
        case "सर्वेक्षण नंबर":
            linkedEntityOptions = shivars;
            linkedEntityLabel = 'जोडलेले शिवार';
            isLinkedEntityRequired = true;
            placeholder = "शिवार निवडा";
            break;
        case "उसाचा प्रकार":
            linkedEntityOptions = caneVarieties;
            linkedEntityLabel = 'जोडलेली उसाची जात';
            isLinkedEntityRequired = true;
            placeholder = "उसाची जात निवडा";
            break;
    }
    return { linkedEntityOptions, linkedEntityLabel, isLinkedEntityRequired, placeholder };
  }

  const { linkedEntityOptions, linkedEntityLabel, isLinkedEntityRequired, placeholder } = getLinkedEntityInfo();
  
  let isFormValid = name.trim() !== "" && nameEn.trim() !== "" && (!isLinkedEntityRequired || linkedTo);
  if (entityType === "उसाची जात") {
    isFormValid = isFormValid && maturityMonths.trim() !== "" && !isNaN(Number(maturityMonths));
  }
  
  const handleSaveClick = () => {
      if (!isFormValid) {
          toast({
              variant: "destructive",
              title: "त्रुटी",
              description: "कृपया सर्व आवश्यक फील्ड भरा."
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
                <RequiredLabel htmlFor="parent-entity">{linkedEntityLabel}</RequiredLabel>
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
          <RequiredLabel htmlFor="name-mr">{entityType} नाव (मराठी)</RequiredLabel>
          <Input id="name-mr" placeholder="मराठी नाव प्रविष्ट करा" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <RequiredLabel htmlFor="name-en">{entityType} नाव (इंग्रजी)</RequiredLabel>
          <Input id="name-en" placeholder="इंग्रजी नाव प्रविष्ट करा" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
        </div>
        {linkedEntityElement}
        {entityType === 'उसाची जात' && (
            <div className="grid gap-2">
                <RequiredLabel htmlFor="maturity-months">उसाची पक्वता (months)</RequiredLabel>
                <Input
                    id="maturity-months"
                    type="number"
                    placeholder="उदा. 12"
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
                <Button type="button" variant="secondary">रद्द करा</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveClick} disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "जतन करत आहे..." : buttonText}
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

  const handleAddNew = (entityName: string) => {
    setCurrentEntityType(entityName);
    setModalMode('add');
    setEditingItem(null);
    setIsModalOpen(true);
  };
  
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
        title: "यशस्वी!",
        description: `${currentEntityType} यशस्वीरित्या ${modalMode === 'add' ? 'तयार' : 'अद्यतनित'} केले आहे.`,
      });
    }
    // Here you would typically call an API to save the data
    console.log("Saving data:", data);
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
        <MasterDataTable dataKey={selectedConfig} onAddNew={handleAddNew} onEdit={handleEdit}/>
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
