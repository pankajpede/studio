
"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react"
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

type Village = {
  id: string
  name: string
  nameEn: string
}

const allVillages: Village[] = [
  { id: "1", name: "चाकूर", nameEn: "Chakur" },
  { id: "2", name: "मोहगाव", nameEn: "Mohgaon" },
  { id: "3", name: "लामजना", nameEn: "Lamjana" },
  { id: "4", name: "कासारवाडी", nameEn: "Kasarwadi" },
  { id: "5", name: "नाळेगाव", nameEn: "Nalegaon" },
  { id: "6", name: "वडवळ", nameEn: "Wadwal" },
  { id: "7", name: "हंडरगुळी", nameEn: "Handarguli" },
  { id: "8", name: "देवंग्रा", nameEn: "Devangra" },
];

const gutVillagesData: { [key: string]: Village[] } = {
  "1": [
    allVillages[0],
    allVillages[1],
  ],
  "2": [
    allVillages[2],
    allVillages[3],
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

function AddVillageModal({ onAdd }: { onAdd: (selectedVillages: string[]) => void }) {
    const [selected, setSelected] = React.useState<string[]>([]);

    const handleCheckboxChange = (villageId: string, checked: boolean) => {
        if (checked) {
            setSelected(prev => [...prev, villageId]);
        } else {
            setSelected(prev => prev.filter(id => id !== villageId));
        }
    };

    const handleSave = () => {
        onAdd(selected);
        setSelected([]);
    };

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>गावे जोडा</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-72">
                <div className="p-1">
                    {allVillages.map(village => (
                        <div key={village.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50">
                            <Checkbox 
                                id={`village-${village.id}`} 
                                onCheckedChange={(checked) => handleCheckboxChange(village.id, !!checked)}
                                checked={selected.includes(village.id)}
                            />
                            <Label htmlFor={`village-${village.id}`} className="flex-1 cursor-pointer">
                                {village.name} ({village.nameEn})
                            </Label>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <DialogFooter>
                <Button type="button" onClick={handleSave}>जतन करा</Button>
            </DialogFooter>
        </DialogContent>
    );
}


export default function GutDetailsPage() {
  const params = useParams()
  const { toast } = useToast();
  const gutId = params.id as string
  const [villages, setVillages] = React.useState(gutVillagesData[gutId] || [])
  const gutName = gutId === "1" ? "गट १०१" : "गट १०२";
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const table = useReactTable({
    data: villages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  const handleAddVillages = (selectedVillageIds: string[]) => {
      // In a real app, you'd perform an API call.
      // Here, we just simulate adding them to the local state.
      const newVillages = allVillages.filter(v => selectedVillageIds.includes(v.id));
      setVillages(current => {
          const existingIds = new Set(current.map(v => v.id));
          const trulyNewVillages = newVillages.filter(v => !existingIds.has(v.id));
          return [...current, ...trulyNewVillages];
      });

      toast({
          title: "यशस्वी!",
          description: `${newVillages.length} गावे यशस्वीरित्या जोडली आहेत.`,
      });
      setIsModalOpen(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
             <CardTitle>गट तपशील: {gutName}</CardTitle>
             <div className="flex items-center gap-2">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2"/>गाव जोडा</Button>
                    </DialogTrigger>
                    <AddVillageModal onAdd={handleAddVillages}/>
                </Dialog>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/settings?config=guts">
                        <ArrowLeft className="mr-2" /> परत जा
                    </Link>
                </Button>
             </div>
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
