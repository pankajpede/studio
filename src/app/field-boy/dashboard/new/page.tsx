
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Pin, Footprints, ChevronsUpDown, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mockFarmers = [
    { value: "farmer-1", label: "रमेश कुलकर्णी" },
    { value: "farmer-2", label: "सुरेश पाटील" },
    { value: "farmer-3", label: "गणेश जाधव" },
    { value: "farmer-4", label: "प्रकाश शिंदे" },
    { value: "farmer-5", label: "सचिन मोरे" },
    { value: "farmer-6", label: "अनिल गायकवाड" },
    { value: "farmer-7", label: "दीपक चव्हाण" },
    { value: "farmer-8", label: "संजय देशमुख" },
    { value: "farmer-9", label: "विशाल पवार" },
    { value: "farmer-10", label: "अमित भोसले" },
    { value: "farmer-11", label: "राहुल सावंत" },
    { value: "farmer-12", label: "अजय कदम" },
    { value: "farmer-13", label: "नितीन राऊत" },
    { value: "farmer-14", label: "प्रशांत कांबळे" },
    { value: "farmer-15", label: "मनोज जगताप" },
    { value: "farmer-16", label: "योगेश यादव" },
    { value: "farmer-17", label: "महेश माने" },
    { value: "farmer-18", label: "अमोल थोरात" },
    { value: "farmer-19", label: "किरण साळुंखे" },
    { value: "farmer-20", label: "संदीप सूर्यवंशी" },
];


export default function NewFieldSurveyPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState("farmer-selection");

    // State for each form field
    const [selectedState, setSelectedState] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [taluka, setTaluka] = React.useState("");
    const [village, setVillage] = React.useState("");
    const [surveyNo, setSurveyNo] = React.useState("");
    const [gatNo, setGatNo] = React.useState("");
    const [farmer, setFarmer] = React.useState("");

    const [farmerSearchOpen, setFarmerSearchOpen] = React.useState(false);


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
        <CardTitle className="font-headline text-xl">नवीन शेत सर्वेक्षण</CardTitle>
        <CardDescription>नवीन सर्वेक्षणासाठी टॅबमध्ये तपशील भरा.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="farmer-selection">शेतकरी</TabsTrigger>
            <TabsTrigger value="farmer-info">माहिती</TabsTrigger>
            <TabsTrigger value="farm-info">शेत</TabsTrigger>
            <TabsTrigger value="map">नकाशा</TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmer-selection" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="state">राज्य</Label>
                    <Select onValueChange={setSelectedState} value={selectedState}>
                        <SelectTrigger id="state"><SelectValue placeholder="राज्य निवडा..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="maharashtra">महाराष्ट्र</SelectItem>
                            <SelectItem value="karnataka">कर्नाटक</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="district">जिल्हा</Label>
                    <Select onValueChange={setDistrict} value={district} disabled={!selectedState}>
                        <SelectTrigger id="district"><SelectValue placeholder={!selectedState ? "प्रथम राज्य निवडा" : "जिल्हा निवडा..."} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latur">लातूर</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="region">रीजन</Label>
                    <Select onValueChange={setRegion} value={region} disabled={!district}>
                        <SelectTrigger id="region"><SelectValue placeholder={!district ? "प्रथम जिल्हा निवडा" : "रीजन निवडा..."} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latur-east">लातूर पूर्व</SelectItem>
                             <SelectItem value="latur-west">लातूर पश्चिम</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="taluka">तालुका</Label>
                    <Select onValueChange={setTaluka} value={taluka} disabled={!region}>
                        <SelectTrigger id="taluka"><SelectValue placeholder={!region ? "प्रथम रीजन निवडा" : "तालुका निवडा..."} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ahmedpur">अहमदपूर</SelectItem>
                            <SelectItem value="ausa">औसा</SelectItem>
                            <SelectItem value="latur">लातूर</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="village">गाव</Label>
                    <Select onValueChange={setVillage} value={village} disabled={!taluka}>
                        <SelectTrigger id="village"><SelectValue placeholder={!taluka ? "प्रथम तालुका निवडा" : "गाव निवडा..."} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mohgaon">मोहगाव</SelectItem>
                            <SelectItem value="chakur">चाकूर</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="survey-no">सर्वेक्षण क्र.</Label>
                     <Select onValueChange={setSurveyNo} value={surveyNo} disabled={!village}>
                        <SelectTrigger id="survey-no"><SelectValue placeholder={!village ? "प्रथम गाव निवडा" : "सर्वेक्षण क्रमांक निवडा"} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SN-101">SN-101</SelectItem>
                            <SelectItem value="SN-102">SN-102</SelectItem>
                            <SelectItem value="SN-103">SN-103</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="gat-no">गट क्र.</Label>
                     <Select onValueChange={setGatNo} value={gatNo} disabled={!surveyNo}>
                        <SelectTrigger id="gat-no"><SelectValue placeholder={!surveyNo ? "प्रथम सर्वेक्षण क्र. निवडा" : "गट क्रमांक निवडा"} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">१</SelectItem>
                            <SelectItem value="2">२</SelectItem>
                            <SelectItem value="3">३</SelectItem>
                            <SelectItem value="4">४</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="farmer-selection">शेतकरी निवड</Label>
                    <Popover open={farmerSearchOpen} onOpenChange={setFarmerSearchOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={farmerSearchOpen}
                                className="w-full justify-between"
                                disabled={!gatNo}
                            >
                                {farmer
                                    ? mockFarmers.find((f) => f.value === farmer)?.label
                                    : !gatNo ? "प्रथम गट क्र. निवडा" : "शेतकरी निवडा..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder="शेतकरी शोधा..." />
                                <CommandList>
                                    <CommandEmpty>शेतकरी आढळला नाही.</CommandEmpty>
                                    <CommandGroup>
                                        {mockFarmers.map((f) => (
                                        <CommandItem
                                            key={f.value}
                                            value={f.value}
                                            onSelect={(currentValue) => {
                                                setFarmer(currentValue === farmer ? "" : currentValue)
                                                setFarmerSearchOpen(false)
                                            }}
                                        >
                                            <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                farmer === f.value ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                            {f.label}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="farmer-name">शेतकऱ्याचे नाव</Label>
                    <Input id="farmer-name" placeholder="शेतकऱ्याचे नाव टाका" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="mobile">मोबाइल नंबर</Label>
                    <Input id="mobile" type="tel" placeholder="मोबाइल नंबर टाका" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="voter-id">मतदार ओळखपत्र</Label>
                    <Input id="voter-id" placeholder="मतदार ओळखपत्र टाका" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="pan">पॅन कार्ड</Label>
                    <Input id="pan" placeholder="पॅन नंबर टाका" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="bank-name">बँकेचे नाव</Label>
                    <Input id="bank-name" placeholder="बँकेचे नाव टाका" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="account-number">खाते क्रमांक</Label>
                    <Input id="account-number" placeholder="बँक खाते क्रमांक टाका" />
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="area">क्षेत्र (एकरमध्ये)</Label>
                    <Input id="area" type="number" placeholder="उदा. २.५" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="crop-type">पिकाचा प्रकार</Label>
                    <Select>
                        <SelectTrigger id="crop-type"><SelectValue placeholder="पिकाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="plant">रोप</SelectItem>
                            <SelectItem value="ratoon">खोडवा</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="soil-type">मातीचा प्रकार</Label>
                     <Select>
                        <SelectTrigger id="soil-type"><SelectValue placeholder="मातीचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="black-cotton">काळी कापूस</SelectItem>
                            <SelectItem value="red-loam">लाल चिकणमाती</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="irrigation-type">सिंचनाचा प्रकार</Label>
                    <Select>
                        <SelectTrigger id="irrigation-type"><SelectValue placeholder="सिंचनाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="drip">ठिबक</SelectItem>
                            <SelectItem value="flood">प्रवाही</SelectItem>
                            <SelectItem value="canal">कालवा</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="pt-6">
            <div className="flex flex-col items-center gap-4">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">नकाशा पूर्वावलोकन येथे असेल</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button variant="outline" className="w-full"><Pin className="mr-2" /> ड्रॉ बटण</Button>
                    <Button variant="outline" className="w-full"><Footprints className="mr-2" /> वॉक बटण</Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button variant="outline" asChild>
            <Link href="/field-boy/dashboard">रद्द करा</Link>
        </Button>
        {activeTab !== 'map' ? (
             <Button onClick={handleNext}>जतन करा आणि पुढे जा</Button>
        ) : (
             <Button onClick={handleFinalSubmit}>सर्वेक्षण सबमिट करा</Button>
        )}
      </CardFooter>
    </Card>
  )
}

    