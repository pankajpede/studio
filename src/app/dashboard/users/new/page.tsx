
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
type UserRoleLabel = "Agri Head" | "Warshir" | "Field Boy" | "Farmer" | "User";

export default function NewUserPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = React.useState<UserRole>("none");

  const roleLabels: Record<UserRole, UserRoleLabel> = {
      "none": "User",
      "agri-head": "Agri Head",
      "warshir": "Warshir",
      "field-boy": "Field Boy",
      "farmer": "Farmer",
  }

  const handleCreateUser = () => {
    toast({
      title: "Success!",
      description: `${roleLabels[role]} created successfully.`,
    });
    router.push('/dashboard/users');
  };

  const renderFormFields = () => {
    switch (role) {
      case "agri-head":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="tel" placeholder="Enter mobile number" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="e.g., Maharashtra" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="e.g., Pune" />
            </div>
          </>
        );
      case "warshir":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="tel" placeholder="Enter mobile number" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="e.g., Maharashtra" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="e.g., Pune" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">Taluka</Label>
              <Input id="taluka" placeholder="e.g., Baramati" />
            </div>
            <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="assigned-agri-head">Assigned Agri Head</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select Agri Head" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="agri-head-1">Raj Kumar</SelectItem>
                        <SelectItem value="agri-head-2">Sunita Sharma</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </>
        );
      case "field-boy":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="tel" placeholder="Enter mobile number" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="e.g., Maharashtra" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="e.g., Pune" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">Taluka</Label>
              <Input id="taluka" placeholder="e.g., Baramati" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="village">Village</Label>
              <Input id="village" placeholder="e.g., Kothari" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="assigned-warshir">Assigned Warshir</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select Warshir" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="warshir-1">Amit Gupta</SelectItem>
                        <SelectItem value="warshir-2">Priya Singh</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </>
        );
      case "farmer":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="tel" placeholder="Enter mobile number" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="village">Village</Label>
              <Input id="village" placeholder="e.g., Kothari" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">Taluka</Label>
              <Input id="taluka" placeholder="e.g., Baramati" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="e.g., Pune" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="e.g., Maharashtra" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="election-id">Election ID Number</Label>
              <Input id="election-id" placeholder="Enter Election ID" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input id="pan" placeholder="Enter PAN" />
            </div>
             <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input id="aadhaar" placeholder="Enter Aadhaar Number" />
            </div>
          </>
        );
      default:
        return (
            <div className="text-center text-muted-foreground p-8 md:col-span-2">
                <p>Please select a user type to see the required fields.</p>
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
            <span className="sr-only">Back to Users</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-headline font-semibold">Create New User</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Role & Details</CardTitle>
          <CardDescription>
            Select the role for the new user and fill in their details. The form will adapt based on your selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="user-type">User Type</Label>
                    <Select onValueChange={(value: UserRole) => setRole(value)}>
                        <SelectTrigger id="user-type">
                            <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="agri-head">Agri Head</SelectItem>
                            <SelectItem value="warshir">Warshir</SelectItem>
                            <SelectItem value="field-boy">Field Boy</SelectItem>
                            <SelectItem value="farmer">Farmer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                { role !== "none" && (
                     <div className="flex items-center space-x-2 justify-self-start md:justify-self-end">
                        <Switch id="status" defaultChecked />
                        <Label htmlFor="status">User Status: Active</Label>
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
                <Link href="/dashboard/users">Cancel</Link>
            </Button>
            <Button disabled={role === "none"} onClick={handleCreateUser}>
                <UserPlus className="mr-2" />
                Create User
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
