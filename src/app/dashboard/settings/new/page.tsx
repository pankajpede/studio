
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { masterDataMap } from "../page"

function MasterDataCard({
  label,
  options,
  onSave,
}: {
  label: string
  options: { id: string; name: string }[]
  onSave: (name: string, nameEn: string) => void
}) {
  const { toast } = useToast()
  const [showNew, setShowNew] = React.useState(false)
  const [newName, setNewName] = React.useState("")
  const [newNameEn, setNewNameEn] = React.useState("")

  const handleAddNew = () => {
    setShowNew(true)
  }

  const handleSave = () => {
    if (!newName.trim() || !newNameEn.trim()) {
      toast({
        variant: "destructive",
        title: "त्रुटी",
        description: "कृपया मराठी आणि इंग्रजी दोन्ही नावे प्रविष्ट करा.",
      })
      return
    }
    onSave(newName, newNameEn)
    setNewName("")
    setNewNameEn("")
    setShowNew(false)
    toast({
      title: "यशस्वी!",
      description: `${label} यशस्वीरित्या जोडले आहे.`,
    })
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
            <Select>
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
          <Button variant="ghost" size="icon" onClick={handleAddNew}>
            <PlusCircle />
          </Button>
        </div>

        {showNew && (
          <div className="grid grid-cols-1 gap-4 pt-4 border-t">
            <div className="grid gap-2">
              <Label htmlFor={`new-name-mr-${label}`}>
                नवीन {label} नाव (मराठी)
              </Label>
              <Input
                id={`new-name-mr-${label}`}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={`${label} मराठी नाव`}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`new-name-en-${label}`}>
                नवीन {label} नाव (इंग्रजी)
              </Label>
              <Input
                id={`new-name-en-${label}`}
                value={newNameEn}
                onChange={(e) => setNewNameEn(e.target.value)}
                placeholder={`${label} इंग्रजी नाव`}
              />
            </div>
          </div>
        )}
      </CardContent>
      {showNew && (
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>नवीन {label} जतन करा</Button>
        </CardFooter>
      )}
    </Card>
  )
}

function NewMasterDataContent() {
  const [states, setStates] = React.useState(masterDataMap.states.data)

  const handleAddState = (name: string, nameEn: string) => {
    const newState = {
      id: (states.length + 1).toString(),
      name,
      nameEn,
    }
    setStates((prev) => [...prev, newState])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MasterDataCard
        label="राज्य"
        options={states}
        onSave={handleAddState}
      />
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
