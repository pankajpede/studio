
"use client"

import * as React from "react"
import Link from "next/link"
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
import { ArrowLeft, PlusCircle, Trash2, ChevronsUpDown, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { masterDataMap } from "../page"
import type { MasterDataKey } from "../page"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

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
}: {
  label: string
  options: { id: string; name: string }[]
  onSave: (entries: { name: string; nameEn: string; route?: string }[]) => void
  onParentSelect?: (parent: {id: string, name: string} | null) => void
  parentLabel?: string | null
  selectedParent?: {id: string, name: string} | null
  configKey: MasterDataKey,
  disabled?: boolean
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
  }
  
  const handleEntryChange = (id: number, field: 'name' | 'nameEn' | 'route', value: string) => {
      setNewEntries(prev => prev.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
  }

  const handleRemoveEntry = (id: number) => {
      setNewEntries(prev => prev.filter(entry => entry.id !== id));
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
            <Button onClick={handleAddNew} disabled={!!existingSelection || disabled}>
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
        {newEntries.length === 0 && !existingSelection && disabled && (
             <CardContent>
                <div className="text-center text-sm text-muted-foreground py-4">
                </div>
            </CardContent>
        )}
    </Card>
  )
}

function NewMasterDataContent() {
  const [states, setStates] = React.useState(masterDataMap.states.data)
  const [districts, setDistricts] = React.useState(masterDataMap.districts.data)
  const [talukas, setTalukas] = React.useState(masterDataMap.talukas.data)
  const [villages, setVillages] = React.useState(masterDataMap.villages.data)
  const [shivars, setShivars] = React.useState(masterDataMap.shivars.data)
  const [circles, setCircles] = React.useState(masterDataMap.circles.data)
  const [guts, setGuts] = React.useState(masterDataMap.guts.data)

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


  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/settings">
                    <ArrowLeft />
                    <span className="sr-only">परत जा</span>
                </Link>
            </Button>
            <h1 className="text-xl font-semibold">नवीन मास्टर डेटा जोडा</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
            <MasterDataCard
                label="राज्य"
                options={states}
                onSave={handleAddState}
                onParentSelect={handleStateSelect}
                configKey="states"
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
            />
            <MasterDataCard
                label="शिवार"
                options={shivars.filter(s => !selectedVillage || s.linkedTo === selectedVillage.name)}
                onSave={handleAddShivar}
                parentLabel="गाव"
                selectedParent={selectedVillage}
                configKey="shivars"
                disabled={!selectedVillage}
            />
             <MasterDataCard
                label="सर्कल"
                options={circles}
                onSave={handleAddCircle}
                onParentSelect={handleCircleSelect}
                configKey="circles"
            />
            <MasterDataCard
                label="गट"
                options={guts.filter(g => !selectedCircle || g.linkedTo === selectedCircle.name)}
                onSave={handleAddGut}
                parentLabel="सर्कल"
                selectedParent={selectedCircle}
                configKey="guts"
                disabled={!selectedCircle}
            />
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
