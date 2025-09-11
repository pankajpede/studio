
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, PlusCircle, Trash2, ChevronsUpDown, Check, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { masterDataMap } from "../page"
import type { MasterDataKey } from "../page"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"


type NewEntry = {
    id: number;
    name: string;
    nameEn: string;
    route?: string;
}

const Combobox = ({
    options,
    value,
    onValueChange,
    placeholder,
    searchPlaceholder,
    disabled = false,
}: {
    options: { value: string; label: string }[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    searchPlaceholder: string;
    disabled?: boolean;
}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    disabled={disabled}
                >
                    <span className="truncate">
                        {value ? options.find((option) => option.value === value)?.label : placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    onValueChange("");
                                    setOpen(false);
                                }}
                            >
                                Select All
                            </CommandItem>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => {
                                        onValueChange(option.value === value ? "" : option.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};


function MasterDataCard({
  label,
  options,
  onSave,
  onParentSelect,
  parentLabel,
  selectedParent,
  configKey,
  disabled = false,
  onUnsavedChange,
}: {
  label: string
  options: { id: string; name: string }[]
  onSave: (entries: { name: string; nameEn: string; route?: string }[]) => void
  onParentSelect?: (parent: {id: string, name: string} | null) => void
  parentLabel?: string | null
  selectedParent?: {id: string, name: string} | null
  configKey: MasterDataKey,
  disabled?: boolean
  onUnsavedChange: (hasUnsaved: boolean) => void;
}) {
  const { toast } = useToast()
  const [newEntries, setNewEntries] = React.useState<NewEntry[]>([])
  const [existingSelection, setExistingSelection] = React.useState("")

  const handleAddNew = () => {
    if (parentLabel && !selectedParent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Please select a ${parentLabel} before adding a new ${label}.`,
      })
      return
    }
    setNewEntries(prev => [...prev, { id: Date.now(), name: '', nameEn: '', route: '' }]);
    onUnsavedChange(true);
  }
  
  const handleEntryChange = (id: number, field: 'name' | 'nameEn' | 'route', value: string) => {
      setNewEntries(prev => prev.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
  }

  const handleRemoveEntry = (id: number) => {
      setNewEntries(prev => {
        const updatedEntries = prev.filter(entry => entry.id !== id);
        onUnsavedChange(updatedEntries.length > 0);
        return updatedEntries;
      });
  }

  const handleSave = () => {
    const validEntries = newEntries.filter(e => e.name.trim() && e.nameEn.trim());

    if (validEntries.length !== newEntries.length) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both Marathi and English names for all new entries.",
      })
      return
    }

    onSave(validEntries);
    setNewEntries([]);
    onUnsavedChange(false);
    toast({
      title: "Success!",
      description: `${validEntries.length} ${label} entries added successfully.`,
    })
  }

  const handleExistingSelectionChange = (value: string) => {
      setExistingSelection(value);
      if (onParentSelect) {
          const selectedOption = options.find(opt => opt.id === value);
          onParentSelect(selectedOption ? { id: selectedOption.id, name: selectedOption.name } : null);
      }
  };
  
  React.useEffect(() => {
    // Clear selection when the card becomes disabled (e.g., parent is unselected)
    if (disabled) {
        setExistingSelection("");
    }
  }, [disabled]);
  
  const comboboxOptions = options.map(opt => ({ value: opt.id, label: opt.name }));


  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{label} Management</CardTitle>
        <div className="flex items-center gap-2">
            <Combobox
                options={comboboxOptions}
                value={existingSelection}
                onValueChange={handleExistingSelectionChange}
                placeholder={`View existing ${label}`}
                searchPlaceholder={`Search ${label}...`}
                disabled={disabled}
            />
            <Button onClick={handleAddNew} disabled={!!existingSelection || disabled} size="icon">
                <PlusCircle/>
            </Button>
        </div>
      </CardHeader>
       {newEntries.length > 0 && (
        <>
            <CardContent className="space-y-4 pt-4 border-t">
                {newEntries.map((entry, index) => (
                    <div key={entry.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-center">
                        <Input
                            value={entry.name}
                            onChange={(e) => handleEntryChange(entry.id, 'name', e.target.value)}
                            placeholder={`${label} Marathi Name`}
                        />
                        <Input
                            value={entry.nameEn}
                            onChange={(e) => handleEntryChange(entry.id, 'nameEn', e.target.value)}
                            placeholder={`${label} English Name`}
                        />
                         <Button variant="ghost" size="icon" onClick={() => handleRemoveEntry(entry.id)}>
                            <Trash2 className="text-destructive"/>
                        </Button>
                        {configKey === 'villages' && (
                             <Input
                                value={entry.route}
                                onChange={(e) => handleEntryChange(entry.id, 'route', e.target.value)}
                                placeholder="Route"
                                className="md:col-span-2"
                            />
                        )}
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end border-t py-4">
                <Button onClick={handleSave}>Save New Entries</Button>
            </CardFooter>
        </>
       )}
    </Card>
  )
}

function NewMasterDataContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const unsavedChangesRef = React.useRef(new Set<string>());

  const handleUnsavedChange = (label: string, hasUnsaved: boolean) => {
    if (hasUnsaved) {
      unsavedChangesRef.current.add(label);
    } else {
      unsavedChangesRef.current.delete(label);
    }
    setHasUnsavedChanges(unsavedChangesRef.current.size > 0);
  };


  const [states, setStates] = React.useState(masterDataMap.states.data)
  const [districts, setDistricts] = React.useState(masterDataMap.districts.data)
  const [talukas, setTalukas] = React.useState(masterDataMap.talukas.data)
  const [villages, setVillages] = React.useState(masterDataMap.villages.data)
  const [shivars, setShivars] = React.useState(masterDataMap.shivars.data)
  const [circles, setCircles] = React.useState(masterDataMap.circles.data)
  const [guts, setGuts] = React.useState(masterDataMap.guts.data)
  const [caneVarieties, setCaneVarieties] = React.useState(masterDataMap.caneVarieties.data)
  const [caneTypes, setCaneTypes] = React.useState(masterDataMap.caneTypes.data)
  const [irrigationTypes, setIrrigationTypes] = React.useState(masterDataMap.irrigationTypes.data)
  const [irrigationSources, setIrrigationSources] = React.useState(masterDataMap.irrigationSources.data)
  const [irrigationMethods, setIrrigationMethods] = React.useState(masterDataMap.irrigationMethods.data)
  const [plantationMethods, setPlantationMethods] = React.useState(masterDataMap.plantationMethods.data)


  const [selectedState, setSelectedState] = React.useState<{id: string, name: string} | null>(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState<{id: string, name: string} | null>(null);
  const [selectedTaluka, setSelectedTaluka] = React.useState<{id: string, name: string} | null>(null);
  const [selectedVillage, setSelectedVillage] = React.useState<{id: string, name: string} | null>(null);
  const [selectedCircle, setSelectedCircle] = React.useState<{id: string, name: string} | null>(null);


  const handleAddState = (entries: { name: string; nameEn: string }[]) => {
    const newStates = entries.map((entry, index) => ({
      id: (states.length + 1 + index).toString(),
      ...entry,
    }))
    setStates((prev) => [...prev, ...newStates])
  }
  
  const handleAddDistrict = (entries: { name: string; nameEn: string }[]) => {
    const newDistricts = entries.map((entry, index) => ({
      id: (districts.length + 1 + index).toString(),
      linkedTo: selectedState?.name,
      ...entry,
    }))
    setDistricts((prev) => [...prev, ...newDistricts])
  }

  const handleAddTaluka = (entries: { name: string; nameEn: string }[]) => {
    const newTalukas = entries.map((entry, index) => ({
      id: (talukas.length + 1 + index).toString(),
      linkedTo: selectedDistrict?.name,
      ...entry,
    }))
    setTalukas((prev) => [...prev, ...newTalukas])
  }
  
  const handleAddVillage = (entries: { name: string; nameEn: string; route?: string }[]) => {
    const newVillages = entries.map((entry, index) => ({
      id: (villages.length + 1 + index).toString(),
      linkedTo: selectedTaluka?.name,
      ...entry,
    }))
    setVillages((prev) => [...prev, ...newVillages])
  }
  
  const handleAddShivar = (entries: { name: string; nameEn: string }[]) => {
    const newShivars = entries.map((entry, index) => ({
      id: (shivars.length + 1 + index).toString(),
      linkedTo: selectedVillage?.name,
      ...entry,
    }))
    setShivars((prev) => [...prev, ...newShivars])
  }

  const handleAddCircle = (entries: { name: string; nameEn: string }[]) => {
    const newCircles = entries.map((entry, index) => ({
      id: (circles.length + 1 + index).toString(),
      ...entry,
    }));
    setCircles((prev) => [...prev, ...newCircles]);
  };
  
  const handleAddGut = (entries: { name: string; nameEn: string }[]) => {
    const newGuts = entries.map((entry, index) => ({
      id: (guts.length + 1 + index).toString(),
      linkedTo: selectedCircle?.name,
      ...entry,
    }));
    setGuts((prev) => [...prev, ...newGuts]);
  };

  const handleAddCaneVariety = (entries: { name: string; nameEn: string }[]) => {
    const newItems = entries.map((entry, index) => ({
      id: (caneVarieties.length + 1 + index).toString(),
      ...entry
    }))
    setCaneVarieties(prev => [...prev, ...newItems]);
  }

  const handleAddCaneType = (entries: { name: string; nameEn: string }[]) => {
    const newItems = entries.map((entry, index) => ({
      id: (caneTypes.length + 1 + index).toString(),
      ...entry
    }))
    setCaneTypes(prev => [...prev, ...newItems]);
  }

  const handleAddIrrigationType = (entries: { name: string; nameEn: string }[]) => {
    const newItems = entries.map((entry, index) => ({
      id: (irrigationTypes.length + 1 + index).toString(),
      ...entry
    }))
    setIrrigationTypes(prev => [...prev, ...newItems]);
  }

  const handleAddIrrigationSource = (entries: { name: string; nameEn: string }[]) => {
    const newItems = entries.map((entry, index) => ({
      id: (irrigationSources.length + 1 + index).toString(),
      ...entry
    }))
    setIrrigationSources(prev => [...prev, ...newItems]);
  }

  const handleAddIrrigationMethod = (entries: { name: string; nameEn: string }[]) => {
    const newItems = entries.map((entry, index) => ({
      id: (irrigationMethods.length + 1 + index).toString(),
      ...entry
    }))
    setIrrigationMethods(prev => [...prev, ...newItems]);
  }

  const handleAddPlantationMethod = (entries: { name: string; nameEn: string }[]) => {
    const newItems = entries.map((entry, index) => ({
      id: (plantationMethods.length + 1 + index).toString(),
      ...entry
    }))
    setPlantationMethods(prev => [...prev, ...newItems]);
  }

  const handleStateSelect = (state: {id: string, name: string} | null) => {
    if (state?.id !== selectedState?.id) {
        setSelectedState(state);
        setSelectedDistrict(null);
        setSelectedTaluka(null);
        setSelectedVillage(null);
    }
  }

  const handleDistrictSelect = (district: {id: string, name: string} | null) => {
      if(district?.id !== selectedDistrict?.id) {
          setSelectedDistrict(district);
          setSelectedTaluka(null);
          setSelectedVillage(null);
      }
  }
  
   const handleTalukaSelect = (taluka: {id: string, name: string} | null) => {
      if(taluka?.id !== selectedTaluka?.id) {
          setSelectedTaluka(taluka);
          setSelectedVillage(null);
      }
  }
  
  const handleVillageSelect = (village: {id: string, name: string} | null) => {
      if(village?.id !== selectedVillage?.id) {
          setSelectedVillage(village);
      }
  }

  const handleCircleSelect = (circle: {id: string, name: string} | null) => {
    if (circle?.id !== selectedCircle?.id) {
        setSelectedCircle(circle);
    }
  }

  const handleSubmit = () => {
    // In a real app, you would collect all new data and send it to the server.
    toast({
        title: "Success!",
        description: "All master data has been submitted successfully."
    });
    unsavedChangesRef.current.clear();
    setHasUnsavedChanges(false);
    router.push('/dashboard/settings');
  }


  return (
    <div className="flex flex-col gap-6">
        <Tabs defaultValue="location" className="w-full">
            <div className="flex items-center justify-between gap-4 border-b">
                <TabsList className="bg-transparent p-0">
                    <TabsTrigger value="location" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Location</TabsTrigger>
                    <TabsTrigger value="farming" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Farming</TabsTrigger>
                </TabsList>
                
                {hasUnsavedChanges ? (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <ArrowLeft />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You have unsaved changes. If you leave, your changes will be discarded.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => router.push('/dashboard/settings')}>
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ) : (
                    <Button variant="outline" asChild size="icon">
                        <Link href="/dashboard/settings">
                            <ArrowLeft />
                        </Link>
                    </Button>
                )}
            </div>
            
            <TabsContent value="location" className="pt-6">
                 <div className="grid grid-cols-1 gap-6">
                    <MasterDataCard
                        label="State"
                        options={states}
                        onSave={handleAddState}
                        onParentSelect={handleStateSelect}
                        configKey="states"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('State', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="District"
                        options={districts.filter(d => !selectedState || d.linkedTo === selectedState.name)}
                        onSave={handleAddDistrict}
                        parentLabel="State"
                        selectedParent={selectedState}
                        onParentSelect={handleDistrictSelect}
                        configKey="districts"
                        disabled={!selectedState}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('District', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="Taluka"
                        options={talukas.filter(t => !selectedDistrict || t.linkedTo === selectedDistrict.name)}
                        onSave={handleAddTaluka}
                        parentLabel="District"
                        selectedParent={selectedDistrict}
                        onParentSelect={handleTalukaSelect}
                        configKey="talukas"
                        disabled={!selectedDistrict}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Taluka', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="Village"
                        options={villages.filter(v => !selectedTaluka || v.linkedTo === selectedTaluka.name)}
                        onSave={handleAddVillage}
                        parentLabel="Taluka"
                        selectedParent={selectedTaluka}
                        onParentSelect={handleVillageSelect}
                        configKey="villages"
                        disabled={!selectedTaluka}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Village', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="Shivar"
                        options={shivars.filter(s => !selectedVillage || s.linkedTo === selectedVillage.name)}
                        onSave={handleAddShivar}
                        parentLabel="Village"
                        selectedParent={selectedVillage}
                        configKey="shivars"
                        disabled={!selectedVillage}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Shivar', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="Circle"
                        options={circles}
                        onSave={handleAddCircle}
                        onParentSelect={handleCircleSelect}
                        configKey="circles"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Circle', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="Gut"
                        options={guts.filter(g => !selectedCircle || g.linkedTo === selectedCircle.name)}
                        onSave={handleAddGut}
                        parentLabel="Circle"
                        selectedParent={selectedCircle}
                        configKey="guts"
                        disabled={!selectedCircle}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Gut', hasUnsaved)}
                    />
                </div>
            </TabsContent>
            <TabsContent value="farming" className="pt-6">
                 <div className="grid grid-cols-1 gap-6">
                     <MasterDataCard
                        label="Cane Variety"
                        options={caneVarieties}
                        onSave={handleAddCaneVariety}
                        configKey="caneVarieties"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Cane Variety', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="Cane Type"
                        options={caneTypes}
                        onSave={handleAddCaneType}
                        configKey="caneTypes"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Cane Type', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="Irrigation Type"
                        options={irrigationTypes}
                        onSave={handleAddIrrigationType}
                        configKey="irrigationTypes"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Irrigation Type', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="Irrigation Source"
                        options={irrigationSources}
                        onSave={handleAddIrrigationSource}
                        configKey="irrigationSources"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Irrigation Source', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="Irrigation Method"
                        options={irrigationMethods}
                        onSave={handleAddIrrigationMethod}
                        configKey="irrigationMethods"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Irrigation Method', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="Plantation Method"
                        options={plantationMethods}
                        onSave={handleAddPlantationMethod}
                        configKey="plantationMethods"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('Plantation Method', hasUnsaved)}
                    />
                </div>
            </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-4 mt-8 border-t pt-6">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                </AlertDialogTrigger>
                {hasUnsavedChanges && (
                     <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You have unsaved changes. If you cancel, your changes will be discarded.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Stay</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.push('/dashboard/settings')}>
                                Confirm Cancel
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                )}
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button><Save className="mr-2"/> Submit</Button>
                </AlertDialogTrigger>
                 <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to submit all master data changes?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  )
}

export default function NewMasterDataPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <NewMasterDataContent />
    </React.Suspense>
  )
}
