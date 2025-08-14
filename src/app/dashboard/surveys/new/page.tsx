
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
        <h1 className="text-2xl font-headline font-semibold">नवीन शेत सर्वेक्षण</h1>
        <Button>जतन करा आणि सबमिट करा</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">स्थानाचा तपशील</CardTitle>
                <CardDescription>शेताचे स्थान निवडा.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="state">राज्य</Label>
                        <Select>
                        <SelectTrigger id="state"><SelectValue placeholder="राज्य निवडा" /></SelectTrigger>
                        <SelectContent><SelectItem value="maharashtra">महाराष्ट्र</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="district">जिल्हा</Label>
                        <Select>
                        <SelectTrigger id="district"><SelectValue placeholder="जिल्हा निवडा" /></SelectTrigger>
                        <SelectContent><SelectItem value="latur">लातूर</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="taluka">तालुका</Label>
                        <Select>
                        <SelectTrigger id="taluka"><SelectValue placeholder="तालुका निवडा" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latur">लातूर</SelectItem>
                          <SelectItem value="ausa">औसा</SelectItem>
                          <SelectItem value="ahmedpur">अहमदपूर</SelectItem>
                          <SelectItem value="udgir">उदगीर</SelectItem>
                          <SelectItem value="nilanga">निलंगा</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="village">गाव</Label>
                        <Select>
                        <SelectTrigger id="village"><SelectValue placeholder="गाव निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="chakur">चाकूर</SelectItem>
                            <SelectItem value="mohgaon">मोहगाव</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="gat-no">गट/ग्रुप नंबर</Label>
                        <Input id="gat-no" placeholder="गट/ग्रुप नंबर टाका" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="survey_no">सर्वेक्षण नंबर</Label>
                        <Input id="survey_no" placeholder="सर्वेक्षण नंबर टाका" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="font-headline">शेत आणि पीक तपशील</CardTitle>
                <CardDescription>शेत आणि पिकाबद्दल तपशील द्या.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="farmer-name">शेतकऱ्याचे नाव</Label>
                        <Input id="farmer-name" placeholder="शेतकऱ्याचे नाव टाका" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="farmer-contact">शेतकरी संपर्क</Label>
                        <Input id="farmer-contact" type="tel" placeholder="संपर्क क्रमांक टाका" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="area">क्षेत्र (एकरमध्ये)</Label>
                        <Input id="area" type="number" placeholder="उदा. ५.२" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cane-type">उसाचा प्रकार</Label>
                        <Select>
                        <SelectTrigger id="cane-type"><SelectValue placeholder="उसाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="adsali">अडसाली</SelectItem>
                            <SelectItem value="preseasonal">पूर्व-हंगामी</SelectItem>
                            <SelectItem value="sursali">सुरू</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="cane-variety">उसाची जात</Label>
                        <Select>
                        <SelectTrigger id="cane-variety"><SelectValue placeholder="उसाची जात निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="co-86032">को-८६०३२</SelectItem>
                            <SelectItem value="com-0265">कोएम-०२६५</SelectItem>
                             <SelectItem value="ms-10001">एमएस-१०००१</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="notes">शेताची स्थिती आणि नोट्स</Label>
                        <div className="relative">
                            <Textarea id="notes" placeholder="शेताची स्थिती, सिंचन इत्यादींचे वर्णन करा." className="pr-10" />
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
                    <CardTitle className="font-headline">शेताचे फोटो</CardTitle>
                    <CardDescription>शेताचे फोटो अपलोड करा.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                        <UploadCloud className="w-10 h-10 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            <span className="font-semibold">अपलोड करण्यासाठी क्लिक करा</span> किंवा ड्रॅग आणि ड्रॉप करा
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF 10MB पर्यंत</p>
                        <Input id="picture" type="file" className="hidden" multiple />
                    </div>
                     <Button variant="outline" className="w-full mt-4"><Camera className="mr-2 h-4 w-4"/>कॅमेरा उघडा</Button>
                </CardContent>
            </Card>

            <Card className="flex-grow">
                <CardHeader>
                    <CardTitle className="font-headline">शेताची सीमा</CardTitle>
                    <CardDescription>नकाशावर शेताची सीमा चिन्हांकित करा.</CardDescription>
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
                        <Button className="z-10"><Map className="mr-2 h-4 w-4" />सीमा काढा</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
