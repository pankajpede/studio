
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
                    <CommandEmpty>कोणतेही परिणाम आढळले नाहीत.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    onValueChange("");
                                    setOpen(false);
                                }}
                            >
                                सर्व निवडा
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
        title: "त्रुटी",
        description: `कृपया नवीन ${label} जोडण्यापूर्वी एक ${parentLabel} निवडा.`,
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
        title: "त्रुटी",
        description: "कृपया सर्व नवीन नोंदींसाठी मराठी आणि इंग्रजी दोन्ही नावे प्रविष्ट करा.",
      })
      return
    }

    onSave(validEntries);
    setNewEntries([]);
    onUnsavedChange(false);
    toast({
      title: "यशस्वी!",
      description: `${validEntries.length} ${label} नोंदी यशस्वीरित्या जोडल्या आहेत.`,
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
        <CardTitle>{label} व्यवस्थापन</CardTitle>
        <div className="flex items-center gap-2">
            <Combobox
                options={comboboxOptions}
                value={existingSelection}
                onValueChange={handleExistingSelectionChange}
                placeholder={`विद्यमान ${label} पहा`}
                searchPlaceholder={`${label} शोधा...`}
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
                            placeholder={`${label} मराठी नाव`}
                        />
                        <Input
                            value={entry.nameEn}
                            onChange={(e) => handleEntryChange(entry.id, 'nameEn', e.target.value)}
                            placeholder={`${label} इंग्रजी नाव`}
                        />
                         <Button variant="ghost" size="icon" onClick={() => handleRemoveEntry(entry.id)}>
                            <Trash2 className="text-destructive"/>
                        </Button>
                        {configKey === 'villages' && (
                             <Input
                                value={entry.route}
                                onChange={(e) => handleEntryChange(entry.id, 'route', e.target.value)}
                                placeholder="मार्ग"
                                className="md:col-span-2"
                            />
                        )}
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end border-t py-4">
                <Button onClick={handleSave}>नवीन नोंदी जतन करा</Button>
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
        title: "यशस्वी!",
        description: "सर्व मास्टर डेटा यशस्वीरित्या सबमिट केला आहे."
    });
    unsavedChangesRef.current.clear();
    setHasUnsavedChanges(false);
    router.push('/dashboard/settings');
  }


  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 border-b">
            <Tabs defaultValue="location">
                <TabsList className="bg-transparent p-0">
                    <TabsTrigger value="location" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">स्थान</TabsTrigger>
                    <TabsTrigger value="farming" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">शेती</TabsTrigger>
                </TabsList>
            </Tabs>
            
            {hasUnsavedChanges ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="outline">
                            <ArrowLeft className="mr-2" />
                            परत जा
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>तुम्ही निश्चित आहात का?</AlertDialogTitle>
                            <AlertDialogDescription>
                                तुमच्याकडे न जतन केलेले बदल आहेत. तुम्ही सोडल्यास, तुमचे बदल हटवले जातील.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>रद्द करा</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.push('/dashboard/settings')}>
                                पुष्टी करा
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                <Button variant="outline" asChild>
                    <Link href="/dashboard/settings">
                        <ArrowLeft className="mr-2" />
                        परत जा
                    </Link>
                </Button>
            )}
        </div>
        <Tabs defaultValue="location">
            <TabsContent value="location" className="pt-6">
                 <div className="grid grid-cols-1 gap-6">
                    <MasterDataCard
                        label="राज्य"
                        options={states}
                        onSave={handleAddState}
                        onParentSelect={handleStateSelect}
                        configKey="states"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('राज्य', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="जिल्हा"
                        options={districts.filter(d => !selectedState || d.linkedTo === selectedState.name)}
                        onSave={handleAddDistrict}
                        parentLabel="राज्य"
                        selectedParent={selectedState}
                        onParentSelect={handleDistrictSelect}
                        configKey="districts"
                        disabled={!selectedState}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('जिल्हा', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="तालुका"
                        options={talukas.filter(t => !selectedDistrict || t.linkedTo === selectedDistrict.name)}
                        onSave={handleAddTaluka}
                        parentLabel="जिल्हा"
                        selectedParent={selectedDistrict}
                        onParentSelect={handleTalukaSelect}
                        configKey="talukas"
                        disabled={!selectedDistrict}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('तालुका', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="गाव"
                        options={villages.filter(v => !selectedTaluka || v.linkedTo === selectedTaluka.name)}
                        onSave={handleAddVillage}
                        parentLabel="तालुका"
                        selectedParent={selectedTaluka}
                        onParentSelect={handleVillageSelect}
                        configKey="villages"
                        disabled={!selectedTaluka}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('गाव', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="शिवार"
                        options={shivars.filter(s => !selectedVillage || s.linkedTo === selectedVillage.name)}
                        onSave={handleAddShivar}
                        parentLabel="गाव"
                        selectedParent={selectedVillage}
                        configKey="shivars"
                        disabled={!selectedVillage}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('शिवार', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="सर्कल"
                        options={circles}
                        onSave={handleAddCircle}
                        onParentSelect={handleCircleSelect}
                        configKey="circles"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('सर्कल', hasUnsaved)}
                    />
                    <MasterDataCard
                        label="गट"
                        options={guts.filter(g => !selectedCircle || g.linkedTo === selectedCircle.name)}
                        onSave={handleAddGut}
                        parentLabel="सर्कल"
                        selectedParent={selectedCircle}
                        configKey="guts"
                        disabled={!selectedCircle}
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('गट', hasUnsaved)}
                    />
                </div>
            </TabsContent>
            <TabsContent value="farming" className="pt-6">
                 <div className="grid grid-cols-1 gap-6">
                     <MasterDataCard
                        label="उसाची जात"
                        options={caneVarieties}
                        onSave={handleAddCaneVariety}
                        configKey="caneVarieties"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('उसाची जात', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="उसाचा प्रकार"
                        options={caneTypes}
                        onSave={handleAddCaneType}
                        configKey="caneTypes"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('उसाचा प्रकार', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="सिंचनाचा प्रकार"
                        options={irrigationTypes}
                        onSave={handleAddIrrigationType}
                        configKey="irrigationTypes"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('सिंचनाचा प्रकार', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="सिंचनाचा स्रोत"
                        options={irrigationSources}
                        onSave={handleAddIrrigationSource}
                        configKey="irrigationSources"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('सिंचनाचा स्रोत', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="सिंचन पद्धत"
                        options={irrigationMethods}
                        onSave={handleAddIrrigationMethod}
                        configKey="irrigationMethods"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('सिंचन पद्धत', hasUnsaved)}
                    />
                     <MasterDataCard
                        label="लागवड पद्धत"
                        options={plantationMethods}
                        onSave={handleAddPlantationMethod}
                        configKey="plantationMethods"
                        onUnsavedChange={(hasUnsaved) => handleUnsavedChange('लागवड पद्धत', hasUnsaved)}
                    />
                </div>
            </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-4 mt-8 border-t pt-6">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">रद्द करा</Button>
                </AlertDialogTrigger>
                {hasUnsavedChanges && (
                     <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>तुम्ही निश्चित आहात का?</AlertDialogTitle>
                            <AlertDialogDescription>
                                तुमच्याकडे न जतन केलेले बदल आहेत. तुम्ही रद्द केल्यास, तुमचे बदल हटवले जातील.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>थांबा</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.push('/dashboard/settings')}>
                                रद्द करण्याची पुष्टी करा
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                )}
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button><Save className="mr-2"/> सबमिट करा</Button>
                </AlertDialogTrigger>
                 <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>सबमिशनची पुष्टी करा</AlertDialogTitle>
                        <AlertDialogDescription>
                            तुम्ही सर्व मास्टर डेटा बदल सबमिट करू इच्छिता याची तुम्हाला खात्री आहे का?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>रद्द करा</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit}>सबमिट करा</AlertDialogAction>
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

    