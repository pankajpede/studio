
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { KeyRound, User } from "lucide-react"

// Mock data for the logged-in field boy
const fieldBoyData = {
  name: "सुनील पवार",
  email: "fieldboy@gmail.com",
  mobile: "9876543210",
  taluka: "अहमदपूर",
  village: "मोहगाव",
  reportsTo: "महेश देशमुख (वारशिर)",
  avatarUrl: "https://placehold.co/100x100.png",
}

export default function FieldBoyProfilePage() {
  const { toast } = useToast()

  const handleUpdateProfile = () => {
    toast({
      title: "प्रोफाइल अद्यतनित",
      description: "तुमची प्रोफाइल माहिती जतन केली आहे.",
    })
  }

  const handleChangePassword = () => {
    // Add password change logic here
    toast({
      title: "पासवर्ड बदलला",
      description: "तुमचा पासवर्ड यशस्वीरित्या अद्यतनित केला आहे.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">तुमचे प्रोफाइल</CardTitle>
          </div>
          <CardDescription>तुमची वैयक्तिक माहिती पहा आणि संपादित करा.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">पूर्ण नाव</Label>
            <Input id="name" defaultValue={fieldBoyData.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">ईमेल पत्ता</Label>
            <Input id="email" type="email" placeholder="ईमेल पत्ता टाका" defaultValue={fieldBoyData.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile">मोबाइल नंबर</Label>
            <Input id="mobile" type="tel" defaultValue={fieldBoyData.mobile} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="taluka">नियुक्त तालुका</Label>
            <Input id="taluka" defaultValue={fieldBoyData.taluka} disabled />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="village">नियुक्त गाव</Label>
            <Input id="village" defaultValue={fieldBoyData.village} disabled />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="reportsTo">रिपोर्ट्स</Label>
            <Input id="reportsTo" defaultValue={fieldBoyData.reportsTo} disabled />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpdateProfile}>बदल जतन करा</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
           <div className="flex items-center gap-4">
            <KeyRound className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">पासवर्ड बदला</CardTitle>
          </div>
          <CardDescription>उत्तम सुरक्षेसाठी तुमचा पासवर्ड अद्यतनित करा.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="current-password">सध्याचा पासवर्ड</Label>
            <Input id="current-password" type="password" />
          </div>
          <div /> 
          <div className="grid gap-2">
            <Label htmlFor="new-password">नवीन पासवर्ड</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">नवीन पासवर्डची पुष्टी करा</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
         <CardFooter className="flex justify-end">
          <Button onClick={handleChangePassword}>पासवर्ड अद्यतनित करा</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
