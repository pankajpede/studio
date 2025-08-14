
"use client"

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

type UserRole = "none" | "agri-head" | "warshir" | "field-boy" | "farmer";
type UserRoleLabel = "कृषी प्रमुख" | "वारशिर" | "फील्ड बॉय" | "शेतकरी" | "वापरकर्ता";

export default function NewUserPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = React.useState<UserRole>("none");

  const roleLabels: Record<UserRole, UserRoleLabel> = {
      "none": "वापरकर्ता",
      "agri-head": "कृषी प्रमुख",
      "warshir": "वारशिर",
      "field-boy": "फील्ड बॉय",
      "farmer": "शेतकरी",
  }

  const handleCreateUser = () => {
    toast({
      title: "यशस्वी!",
      description: `${roleLabels[role]} यशस्वीरित्या तयार केले.`,
    });
    router.push('/dashboard/users');
  };

  const renderFormFields = () => {
    switch (role) {
      case "agri-head":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">नाव</Label>
              <Input id="name" placeholder="पूर्ण नाव प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input id="email" type="email" placeholder="ईमेल पत्ता प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">मोबाइल नंबर</Label>
              <Input id="mobile" type="tel" placeholder="मोबाइल नंबर प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">राज्य</Label>
              <Input id="state" placeholder="उदा. महाराष्ट्र" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="district">जिल्हा</Label>
              <Input id="district" placeholder="उदा. लातूर" />
            </div>
          </>
        );
      case "warshir":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">नाव</Label>
              <Input id="name" placeholder="पूर्ण नाव प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input id="email" type="email" placeholder="ईमेल पत्ता प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">मोबाइल नंबर</Label>
              <Input id="mobile" type="tel" placeholder="मोबाइल नंबर प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">राज्य</Label>
              <Input id="state" placeholder="उदा. महाराष्ट्र" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="district">जिल्हा</Label>
              <Input id="district" placeholder="उदा. लातूर" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">तालुका</Label>
              <Input id="taluka" placeholder="उदा. अहमदपूर" />
            </div>
            <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="assigned-agri-head">नियुक्त कृषी प्रमुख</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="कृषी प्रमुख निवडा" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="agri-head-1">राजेश कुमार</SelectItem>
                        <SelectItem value="agri-head-2">सुनीता शर्मा</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </>
        );
      case "field-boy":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">नाव</Label>
              <Input id="name" placeholder="पूर्ण नाव प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input id="email" type="email" placeholder="ईमेल पत्ता प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">मोबाइल नंबर</Label>
              <Input id="mobile" type="tel" placeholder="मोबाइल नंबर प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">राज्य</Label>
              <Input id="state" placeholder="उदा. महाराष्ट्र" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="district">जिल्हा</Label>
              <Input id="district" placeholder="उदा. लातूर" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">तालुका</Label>
              <Input id="taluka" placeholder="उदा. अहमदपूर" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="village">गाव</Label>
              <Input id="village" placeholder="उदा. चाकूर" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="assigned-warshir">नियुक्त वारशिर</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="वारशिर निवडा" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="warshir-1">अमित गायकवाड</SelectItem>
                        <SelectItem value="warshir-2">प्रिया सिंग</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </>
        );
      case "farmer":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">नाव</Label>
              <Input id="name" placeholder="पूर्ण नाव प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">मोबाइल नंबर</Label>
              <Input id="mobile" type="tel" placeholder="मोबाइल नंबर प्रविष्ट करा" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="village">गाव</Label>
              <Input id="village" placeholder="उदा. चाकूर" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">तालुका</Label>
              <Input id="taluka" placeholder="उदा. अहमदपूर" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="district">जिल्हा</Label>
              <Input id="district" placeholder="उदा. लातूर" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">राज्य</Label>
              <Input id="state" placeholder="उदा. महाराष्ट्र" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="election-id">निवडणूक ओळखपत्र क्रमांक</Label>
              <Input id="election-id" placeholder="निवडणूक ओळखपत्र क्रमांक प्रविष्ट करा" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="pan">पॅन नंबर</Label>
              <Input id="pan" placeholder="पॅन क्रमांक प्रविष्ट करा" />
            </div>
             <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="aadhaar">आधार क्रमांक</Label>
              <Input id="aadhaar" placeholder="आधार क्रमांक प्रविष्ट करा" />
            </div>
          </>
        );
      default:
        return (
            <div className="text-center text-muted-foreground p-8 md:col-span-2">
                <p>आवश्यक फील्ड पाहण्यासाठी कृपया वापरकर्ता प्रकार निवडा.</p>
            </div>
        )
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/users">
            <ArrowLeft />
            <span className="sr-only">वापरकर्त्यांकडे परत जा</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-headline font-semibold">नवीन वापरकर्ता तयार करा</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>वापरकर्ता भूमिका आणि तपशील</CardTitle>
          <CardDescription>
            नवीन वापरकर्त्यासाठी भूमिका निवडा आणि त्यांचे तपशील भरा. तुमच्या निवडीनुसार फॉर्म बदलेल.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="user-type">वापरकर्ता प्रकार</Label>
                    <Select onValueChange={(value: UserRole) => setRole(value)}>
                        <SelectTrigger id="user-type">
                            <SelectValue placeholder="वापरकर्ता प्रकार निवडा" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="agri-head">कृषी प्रमुख</SelectItem>
                            <SelectItem value="warshir">वारशिर</SelectItem>
                            <SelectItem value="field-boy">फील्ड बॉय</SelectItem>
                            <SelectItem value="farmer">शेतकरी</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                { role !== "none" && (
                     <div className="flex items-center space-x-2 justify-self-start md:justify-self-end">
                        <Switch id="status" defaultChecked />
                        <Label htmlFor="status">वापरकर्ता स्थिती: सक्रिय</Label>
                    </div>
                )}
            </div>
            
            {role !== 'none' && <Separator className="my-6" />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFormFields()}
            </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
                <Link href="/dashboard/users">रद्द करा</Link>
            </Button>
            <Button disabled={role === "none"} onClick={handleCreateUser}>
                <UserPlus className="mr-2" />
                वापरकर्ता तयार करा
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
