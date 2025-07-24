"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function NewFieldSurveyPage() {
    const router = useRouter();

    const [state, setState] = React.useState<string | undefined>();
    const [district, setDistrict] = React.useState<string | undefined>();
    const [division, setDivision] = React.useState<string | undefined>();
    const [taluka, setTaluka] = React.useState<string | undefined>();
    const [village, setVillage] = React.useState<string | undefined>();
    const [shiwar, setShiwar] = React.useState<string | undefined>();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Farmer Selection</CardTitle>
        <CardDescription>Select the location to identify the farmer.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
            <Label htmlFor="state">राज्य (State)</Label>
            <Select onValueChange={setState}>
                <SelectTrigger id="state"><SelectValue placeholder="Select state..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                </SelectContent>
            </Select>
        </div>
         <div className="grid gap-2">
            <Label htmlFor="district">जिल्हा (District)</Label>
            <Select onValueChange={setDistrict} disabled={!state}>
                <SelectTrigger id="district"><SelectValue placeholder="Select district..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="satara">Satara</SelectItem>
                </SelectContent>
            </Select>
        </div>
         <div className="grid gap-2">
            <Label htmlFor="division">विभाग (Division)</Label>
            <Select onValueChange={setDivision} disabled={!district}>
                <SelectTrigger id="division"><SelectValue placeholder="Select division..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="pune-division">Pune Division</SelectItem>
                </SelectContent>
            </Select>
        </div>
         <div className="grid gap-2">
            <Label htmlFor="taluka">तालुका (Taluka)</Label>
            <Select onValueChange={setTaluka} disabled={!division}>
                <SelectTrigger id="taluka"><SelectValue placeholder="Select taluka..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="baramati">Baramati</SelectItem>
                    <SelectItem value="indapur">Indapur</SelectItem>
                </SelectContent>
            </Select>
        </div>
         <div className="grid gap-2">
            <Label htmlFor="village">गाव (Village)</Label>
            <Select onValueChange={setVillage} disabled={!taluka}>
                <SelectTrigger id="village"><SelectValue placeholder="Select village..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="kothari">Kothari</SelectItem>
                     <SelectItem value="wadgaon">Wadgaon</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="shiwar">शिवार (Shiwar)</Label>
            <Select onValueChange={setShiwar} disabled={!village}>
                <SelectTrigger id="shiwar"><SelectValue placeholder="Select shiwar..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="shiwar1">Shiwar 1</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="survey-no">सर्वे नंबर (Survey Number)</Label>
            <Select disabled={!shiwar}>
                <SelectTrigger id="survey-no"><SelectValue placeholder="Select survey number..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="sn123">SN-123</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="farmer-name">शेतकऱ्याचे नाव (Farmer Name)</Label>
            <Select disabled={!shiwar}>
                <SelectTrigger id="farmer-name"><SelectValue placeholder="Select farmer..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="suresh-patil">Suresh Patil</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button>Save & Next</Button>
      </CardFooter>
    </Card>
  )
}
