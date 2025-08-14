
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Textarea } from "@/components/ui/textarea"
import { Camera, Map, Mic, UploadCloud } from "lucide-react"
import Image from "next/image"

export default function NewSurveyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-headline font-semibold">New Farm Survey</h1>
        <Button>Save & Submit</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Location Details</CardTitle>
                <CardDescription>Select the location of the farm.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Select>
                        <SelectTrigger id="state"><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent><SelectItem value="maharashtra">Maharashtra</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="district">District</Label>
                        <Select>
                        <SelectTrigger id="district"><SelectValue placeholder="Select district" /></SelectTrigger>
                        <SelectContent><SelectItem value="latur">Latur</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="taluka">Taluka</Label>
                        <Select>
                        <SelectTrigger id="taluka"><SelectValue placeholder="Select taluka" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latur">Latur</SelectItem>
                          <SelectItem value="ausa">Ausa</SelectItem>
                          <SelectItem value="ahmedpur">Ahmedpur</SelectItem>
                          <SelectItem value="udgir">Udgir</SelectItem>
                          <SelectItem value="nilanga">Nilanga</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="village">Village</Label>
                        <Select>
                        <SelectTrigger id="village"><SelectValue placeholder="Select village" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="chakur">Chakur</SelectItem>
                            <SelectItem value="mohgaon">Mohgaon</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="gat-no">Gat/Group Number</Label>
                        <Input id="gat-no" placeholder="Enter Gat/Group number" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="survey_no">Survey No</Label>
                        <Input id="survey_no" placeholder="Enter survey number" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Farm & Crop Details</CardTitle>
                <CardDescription>Provide details about the farm and crop.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="farmer-name">Farmer Name</Label>
                        <Input id="farmer-name" placeholder="Enter farmer's name" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="farmer-contact">Farmer Contact</Label>
                        <Input id="farmer-contact" type="tel" placeholder="Enter contact number" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="area">Area (in Acres)</Label>
                        <Input id="area" type="number" placeholder="e.g., 5.2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cane-type">Cane Type</Label>
                        <Select>
                        <SelectTrigger id="cane-type"><SelectValue placeholder="Select cane type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="adsali">Adsali</SelectItem>
                            <SelectItem value="preseasonal">Preseasonal</SelectItem>
                            <SelectItem value="sursali">Sursali</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="cane-variety">Cane Variety</Label>
                        <Select>
                        <SelectTrigger id="cane-variety"><SelectValue placeholder="Select cane variety" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="co-86032">Co-86032</SelectItem>
                            <SelectItem value="com-0265">CoM-0265</SelectItem>
                             <SelectItem value="ms-10001">MS-10001</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="notes">Farm Condition & Notes</Label>
                        <div className="relative">
                            <Textarea id="notes" placeholder="Describe the farm condition, irrigation, etc." className="pr-10" />
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                                <Mic className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Farm Photos</CardTitle>
                    <CardDescription>Upload photos of the farm.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                        <UploadCloud className="w-10 h-10 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                        <Input id="picture" type="file" className="hidden" multiple />
                    </div>
                     <Button variant="outline" className="w-full mt-4"><Camera className="mr-2 h-4 w-4"/>Open Camera</Button>
                </CardContent>
            </Card>

            <Card className="flex-grow">
                <CardHeader>
                    <CardTitle className="font-headline">Farm Boundary</CardTitle>
                    <CardDescription>Mark the farm boundary on the map.</CardDescription>
                </CardHeader>
                <CardContent className="h-full min-h-[200px]">
                    <div className="w-full h-full rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="Map for boundary marking"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="map plot"
                        />
                        <Button className="z-10"><Map className="mr-2 h-4 w-4" />Draw Boundary</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
