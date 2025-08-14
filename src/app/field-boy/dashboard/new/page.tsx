
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Pin, Footprints } from "lucide-react"
import Link from "next/link"

export default function NewFieldSurveyPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState("farmer-selection");
    const [surveyNo, setSurveyNo] = React.useState("");

    const tabs = ["farmer-selection", "farmer-info", "farm-info", "map"];

    const handleNext = () => {
        window.scrollTo(0, 0);
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };
    
    const handleFinalSubmit = () => {
        // Logic for final submission
        console.log("Survey submitted!");
        window.scrollTo(0, 0);
        router.push('/field-boy/dashboard');
    }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-xl">New Farm Survey</CardTitle>
        <CardDescription>Fill out the details for the new survey across the tabs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="farmer-selection">Farmer</TabsTrigger>
            <TabsTrigger value="farmer-info">Info</TabsTrigger>
            <TabsTrigger value="farm-info">Farm</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmer-selection" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Select>
                        <SelectTrigger id="state"><SelectValue placeholder="Select state..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="district">District</Label>
                    <Select>
                        <SelectTrigger id="district"><SelectValue placeholder="Select district..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latur">Latur</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="region">Region</Label>
                    <Select>
                        <SelectTrigger id="region"><SelectValue placeholder="Select region..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latur-east">Latur East</SelectItem>
                             <SelectItem value="latur-west">Latur West</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="taluka">Taluka</Label>
                    <Select>
                        <SelectTrigger id="taluka"><SelectValue placeholder="Select taluka..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ahmedpur">Ahmedpur</SelectItem>
                            <SelectItem value="ausa">Ausa</SelectItem>
                            <SelectItem value="latur">Latur</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="village">Village</Label>
                    <Select>
                        <SelectTrigger id="village"><SelectValue placeholder="Select village..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mohgaon">Mohgaon</SelectItem>
                            <SelectItem value="chakur">Chakur</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="survey-no">Survey No.</Label>
                    <Input 
                        id="survey-no" 
                        placeholder="Enter survey number" 
                        value={surveyNo}
                        onChange={(e) => setSurveyNo(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="gat-no">Gat No.</Label>
                     {surveyNo ? (
                        <Select>
                            <SelectTrigger id="gat-no"><SelectValue placeholder="Select gat number" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                            </SelectContent>
                        </Select>
                    ) : (
                        <Input id="gat-no" placeholder="Enter survey no. first" disabled />
                    )}
                </div>
                 <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="farmer-selection">Farmer Selection</Label>
                    <Select>
                        <SelectTrigger id="farmer-selection"><SelectValue placeholder="Select farmer..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="farmer-1">Ramesh Kulkarni</SelectItem>
                            <SelectItem value="farmer-2">Suresh Patil</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="farmer-name">Farmer Name</Label>
                    <Input id="farmer-name" placeholder="Enter farmer's name" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" type="tel" placeholder="Enter mobile number" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="voter-id">Voter ID</Label>
                    <Input id="voter-id" placeholder="Enter Voter ID" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="pan">PAN Card</Label>
                    <Input id="pan" placeholder="Enter PAN number" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input id="bank-name" placeholder="Enter bank name" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input id="account-number" placeholder="Enter bank account number" />
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="area">Area (in Acres)</Label>
                    <Input id="area" type="number" placeholder="e.g., 2.5" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="crop-type">Crop Type</Label>
                    <Select>
                        <SelectTrigger id="crop-type"><SelectValue placeholder="Select crop type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="plant">Plant</SelectItem>
                            <SelectItem value="ratoon">Ratoon</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="soil-type">Soil Type</Label>
                     <Select>
                        <SelectTrigger id="soil-type"><SelectValue placeholder="Select soil type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="black-cotton">Black Cotton</SelectItem>
                            <SelectItem value="red-loam">Red Loam</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="irrigation-type">Irrigation Type</Label>
                    <Select>
                        <SelectTrigger id="irrigation-type"><SelectValue placeholder="Select irrigation type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="drip">Drip</SelectItem>
                            <SelectItem value="flood">Flood</SelectItem>
                            <SelectItem value="canal">Canal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="pt-6">
            <div className="flex flex-col items-center gap-4">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map preview will be here</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button variant="outline" className="w-full"><Pin className="mr-2" /> Draw Button</Button>
                    <Button variant="outline" className="w-full"><Footprints className="mr-2" /> Walk Button</Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button variant="outline" asChild>
            <Link href="/field-boy/dashboard">Cancel</Link>
        </Button>
        {activeTab !== 'map' ? (
             <Button onClick={handleNext}>Save & Next</Button>
        ) : (
             <Button onClick={handleFinalSubmit}>Submit Survey</Button>
        )}
      </CardFooter>
    </Card>
  )
}
