
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
  name: "Sunil Sharma",
  email: "fieldboy@gmail.com",
  mobile: "9876543210",
  taluka: "Ahmedpur",
  village: "Mohgaon",
  reportsTo: "Mahesh (Warshir)",
  avatarUrl: "https://placehold.co/100x100.png",
}

export default function FieldBoyProfilePage() {
  const { toast } = useToast()

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    })
  }

  const handleChangePassword = () => {
    // Add password change logic here
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Your Profile</CardTitle>
          </div>
          <CardDescription>View and edit your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={fieldBoyData.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={fieldBoyData.email} disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" type="tel" defaultValue={fieldBoyData.mobile} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="taluka">Assigned Taluka</Label>
            <Input id="taluka" defaultValue={fieldBoyData.taluka} disabled />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="village">Assigned Village</Label>
            <Input id="village" defaultValue={fieldBoyData.village} disabled />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="reportsTo">Reports To</Label>
            <Input id="reportsTo" defaultValue={fieldBoyData.reportsTo} disabled />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpdateProfile}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
           <div className="flex items-center gap-4">
            <KeyRound className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Change Password</CardTitle>
          </div>
          <CardDescription>Update your password for better security.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div /> 
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
         <CardFooter className="flex justify-end">
          <Button onClick={handleChangePassword}>Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
