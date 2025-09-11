
"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PlusCircle, Trash2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { masterDataMap, MasterDataKey } from "../page"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface NewEntry {
  id: number
  name: string
  nameEn: string
  maturityMonths?: string
}

function MasterDataCard({
  configKey,
  selectedParent,
  onParentSelect,
}: {
  configKey: MasterDataKey
  selectedParent: { type: string; id: string } | null
  onParentSelect: (type: string, id: string) => void
}) {
  const { toast } = useToast()
  const entityInfo = masterDataMap[configKey]
  const { data, linkedEntity, entityName, label } = entityInfo

  const [newEntries, setNewEntries] = React.useState<NewEntry[]>([])
  const [existingSelection, setExistingSelection] = React.useState("")

  React.useEffect(() => {
    // When the global selected parent changes, clear local selections if they are no longer relevant
    if (selectedParent && linkedEntity && selectedParent.type !== linkedEntity) {
        setExistingSelection("");
    }
  }, [selectedParent, linkedEntity]);


  const handleAddEntry = () => {
    if (linkedEntity && (!selectedParent || selectedParent.type !== linkedEntity)) {
        toast({
            variant: "destructive",
            title: "त्रुटी",
            description: `कृपया नवीन ${entityName} जोडण्यापूर्वी एक ${masterDataMap[linkedEntity as MasterDataKey]?.label || linkedEntity} निवडा.`
        })
        return;
    }
    setNewEntries([
      ...newEntries,
      { id: Date.now(), name: "", nameEn: "", maturityMonths: "" },
    ])
  }

  const handleRemoveEntry = (id: number) => {
    setNewEntries(newEntries.filter((entry) => entry.id !== id))
  }

  const handleInputChange = (id: number, field: keyof NewEntry, value: string) => {
    setNewEntries(
      newEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    )
  }

  const handleSave = () => {
    if(newEntries.length === 0) {
        toast({
            variant: "destructive",
            title: "त्रुटी",
            description: `कृपया जतन करण्यासाठी किमान एक नवीन ${entityName} जोडा.`
        })
        return
    }

    const areEntriesValid = newEntries.every(entry => {
        let isValid = entry.name.trim() !== "" && entry.nameEn.trim() !== "";
        if (configKey === 'caneVarieties') {
            isValid = isValid && !!entry.maturityMonths && !isNaN(Number(entry.maturityMonths));
        }
        return isValid;
    });

    if (!areEntriesValid) {
        toast({
            variant: "destructive",
            title: "त्रुटी",
            description: `कृपया सर्व आवश्यक फील्ड भरा.`
        })
        return;
    }

    toast({
      title: "यशस्वी!",
      description: `${newEntries.length} नवीन ${entityName} यशस्वीरित्या जतन केले.`,
    })
    setNewEntries([])
  }

  const handleExistingSelectionChange = (value: string) => {
      if (value === "none") {
          setExistingSelection("");
          // If this entity can be a parent, clear the global parent selection
          if (Object.values(masterDataMap).some(e => e.linkedEntity === configKey)) {
              onParentSelect("", "");
          }
      } else {
          setExistingSelection(value);
          // If this entity can be a parent, set it as the global parent
         if (Object.values(masterDataMap).some(e => e.linkedEntity === configKey)) {
              onParentSelect(configKey, value);
          }
      }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
             <CardTitle>{label} व्यवस्थापन</CardTitle>
             {!existingSelection && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="icon" onClick={handleAddEntry}>
                                <PlusCircle className="text-primary-foreground" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>नवीन जोडा</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
             )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid gap-2">
            <Label htmlFor={`existing-${configKey}`}>विद्यमान {label}</Label>
            <Select 
                value={existingSelection} 
                onValueChange={handleExistingSelectionChange}
            >
                <SelectTrigger id={`existing-${configKey}`}>
                <SelectValue placeholder={`विद्यमान ${label} पहा`} />
                </SelectTrigger>
                <SelectContent>
                 <SelectItem value="none">None</SelectItem>
                {data.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.nameEn})
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
        </div>

        {newEntries.map((entry, index) => (
          <div key={entry.id} className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_1fr_1fr_auto] items-end gap-2 p-2 border rounded-md bg-muted/50">
             <div className="grid gap-1.5">
                {index === 0 && <Label>नाव (मराठी)</Label>}
                <Input
                    placeholder="मराठी नाव"
                    value={entry.name}
                    onChange={(e) => handleInputChange(entry.id, "name", e.target.value)}
                />
            </div>
             <div className="grid gap-1.5">
                {index === 0 && <Label>नाव (इंग्रजी)</Label>}
                <Input
                    placeholder="इंग्रजी नाव"
                    value={entry.nameEn}
                    onChange={(e) => handleInputChange(entry.id, "nameEn", e.target.value)}
                />
            </div>
            {configKey === 'caneVarieties' && (
                 <div className="grid gap-1.5">
                    {index === 0 && <Label>पक्वता (महिने)</Label>}
                    <Input
                        type="number"
                        placeholder="उदा. 12"
                        value={entry.maturityMonths}
                        onChange={(e) => handleInputChange(entry.id, "maturityMonths", e.target.value)}
                    />
                </div>
            )}
             <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveEntry(entry.id)}
                className={cn(configKey !== 'caneVarieties' && 'md:col-start-4')}
             >
              <Trash2 className="text-destructive h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
       {newEntries.length > 0 && (
            <CardFooter className="flex justify-end">
                <Button onClick={handleSave}>नवीन {label} जतन करा</Button>
            </CardFooter>
        )}
    </Card>
  )
}


function NewMasterDataContent() {
    const searchParams = useSearchParams();
    const initialConfig = searchParams.get('config') as MasterDataKey | null;

    const [selectedParent, setSelectedParent] = React.useState<{ type: string; id: string } | null>(null);

    const handleParentSelect = (type: string, id: string) => {
        if (type && id) {
            setSelectedParent({ type, id });
        } else {
            setSelectedParent(null);
        }
    };

    const configKeys = Object.keys(masterDataMap) as MasterDataKey[];
    
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/settings?config=${initialConfig || 'states'}`}>
                        <ArrowLeft />
                        <span className="sr-only">परत जा</span>
                    </Link>
                </Button>
            </div>
             {configKeys.map(key => (
                <MasterDataCard 
                    key={key} 
                    configKey={key} 
                    selectedParent={selectedParent}
                    onParentSelect={handleParentSelect}
                />
             ))}
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
