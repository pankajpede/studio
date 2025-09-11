
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { masterDataMap } from "../page"
import type { MasterDataKey } from "../page"

type NewEntry = {
    id: number;
    name: string;
    nameEn: string;
}

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
  onSave: (entries: { name: string; nameEn: string }[]) => void
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
    setNewEntries(prev => [...prev, { id: Date.now(), name: '', nameEn: '' }]);
  }
  
  const handleEntryChange = (id: number, field: 'name' | 'nameEn', value: string) => {
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
          // Check if it's a parent card by seeing if its configKey is a linkedEntity for another card
          const isParentCard = Object.values(masterDataMap).some(config => config.linkedEntity === masterDataMap[configKey].entityName);
          if (isParentCard) {
            onParentSelect(selectedOption ? { id: selectedOption.id, name: selectedOption.name } : null);
          }
      }
  };
  
  React.useEffect(() => {
    // Clear selection when the card becomes disabled (e.g., parent is unselected)
    if (disabled) {
        setExistingSelection("");
    }
  }, [disabled]);


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>{label} व्यवस्थापन</CardTitle>
             <Button onClick={handleAddNew} disabled={!!existingSelection || disabled}>
                <PlusCircle className="mr-2"/> नवीन {label} जोडा
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-grow grid gap-2">
            <Label htmlFor={`existing-${label}`}>विद्यमान {label} पहा</Label>
            <Select onValueChange={handleExistingSelectionChange} value={existingSelection} disabled={disabled}>
              <SelectTrigger id={`existing-${label}`}>
                <SelectValue placeholder={`${label} निवडा`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">सर्व निवडा</SelectItem>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {newEntries.length > 0 && (
            <div className="space-y-4 pt-4 border-t">
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
                    </div>
                ))}
            </div>
        )}

      </CardContent>
       {newEntries.length > 0 && (
         <CardFooter className="flex justify-end border-t pt-6">
            <Button onClick={handleSave}>नवीन नोंदी जतन करा</Button>
         </CardFooter>
       )}
    </Card>
  )
}

function NewMasterDataContent() {
  const [states, setStates] = React.useState(masterDataMap.states.data)
  const [districts, setDistricts] = React.useState(masterDataMap.districts.data)
  const [talukas, setTalukas] = React.useState(masterDataMap.talukas.data)

  const [selectedState, setSelectedState] = React.useState<{id: string, name: string} | null>(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState<{id: string, name: string} | null>(null);

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

  const handleStateSelect = (state: {id: string, name: string} | null) => {
    if (state?.id !== selectedState?.id) {
        setSelectedState(state);
        setSelectedDistrict(null); // Reset district when state changes
    }
  }

  const handleDistrictSelect = (district: {id: string, name: string} | null) => {
      if(district?.id !== selectedDistrict?.id) {
          setSelectedDistrict(district);
      }
  }


  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
            <Link href="/dashboard/settings">
                <ArrowLeft />
                <span className="ml-2">परत जा</span>
            </Link>
            </Button>
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
                configKey="talukas"
                disabled={!selectedDistrict}
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
