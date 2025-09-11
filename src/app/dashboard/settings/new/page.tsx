
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

type NewEntry = {
    id: number;
    name: string;
    nameEn: string;
}

function MasterDataCard({
  label,
  options,
  onSave,
}: {
  label: string
  options: { id: string; name: string }[]
  onSave: (entries: { name: string; nameEn: string }[]) => void
}) {
  const { toast } = useToast()
  const [newEntries, setNewEntries] = React.useState<NewEntry[]>([])
  const [existingSelection, setExistingSelection] = React.useState("")

  const handleAddNew = () => {
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

  const handleSelectionChange = (value: string) => {
    setExistingSelection(value);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label} व्यवस्थापन</CardTitle>
        <CardDescription>
          नवीन {label} जोडा किंवा विद्यमान पहा.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-grow grid gap-2">
            <Label htmlFor={`existing-${label}`}>विद्यमान {label} पहा</Label>
            <Select onValueChange={handleSelectionChange} value={existingSelection}>
              <SelectTrigger id={`existing-${label}`}>
                <SelectValue placeholder={`${label} निवडा`} />
              </SelectTrigger>
              <SelectContent>
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
       <CardFooter className="flex justify-between items-center border-t pt-6">
            <Button onClick={handleAddNew}>
                <PlusCircle className="mr-2"/> नवीन {label} जोडा
            </Button>
            {newEntries.length > 0 && (
                <Button onClick={handleSave}>नवीन नोंदी जतन करा</Button>
            )}
        </CardFooter>
    </Card>
  )
}

function NewMasterDataContent() {
  const [states, setStates] = React.useState(masterDataMap.states.data)

  const handleAddState = (entries: { name: string; nameEn: string }[]) => {
    const newStates = entries.map((entry, index) => ({
      id: (states.length + 1 + index).toString(),
      ...entry,
    }))
    setStates((prev) => [...prev, ...newStates])
  }

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/settings">
                <ArrowLeft />
                <span className="sr-only">सेटिंग्जवर परत जा</span>
            </Link>
            </Button>
            <h1 className="text-xl font-semibold font-headline">मास्टर डेटा जोडा</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
            <MasterDataCard
                label="राज्य"
                options={states}
                onSave={handleAddState}
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
