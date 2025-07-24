
"use client"

import * as React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { FileText, User, Tractor, MapPin, CheckCircle, XCircle, AlertCircle, Pin, Footprints } from 'lucide-react';
import { DetailItem } from '@/components/detail-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock data - in a real app, this would be fetched from a database
const getSurveyById = (id: string | null) => {
    if (!id) return null;
    const statuses = ["Pending", "Approved", "Rejected"];
    const status = statuses[id.length % 3] as "Pending" | "Approved" | "Rejected";
  return {
    id,
    farmerName: "Pankaj Pede",
    mobileNumber: "9876543210",
    voterId: "ABC1234567",
    panCard: "ABCDE1234F",
    bankName: "State Bank of India",
    accountNumber: "XXXX-XXXX-1234",
    area: "2.5",
    cropType: "Plant",
    soilType: "Black Cotton",
    irrigationType: "Drip",
    mapImage: "https://placehold.co/600x400.png",
    status,
    rejectionReason: status === "Rejected" ? "Incomplete documents provided." : "-",
    submittedOn: "2024-06-30",
    location: {
        state: "Maharashtra",
        district: "Latur",
        taluka: "Ahmedpur",
        village: "Mohgaon",
    }
  };
};

type SurveyData = ReturnType<typeof getSurveyById>;

const StatusInfo = ({ status, reason }: { status: string, reason?: string }) => {
    let icon;
    let textClass;
    let bgClass;
    let label;

    switch (status) {
        case "Approved":
            icon = <CheckCircle className="h-5 w-5" />;
            textClass = "text-green-800";
            bgClass = "bg-green-100";
            label = "Approved (Queued)";
            break;
        case "Rejected":
            icon = <XCircle className="h-5 w-5" />;
            textClass = "text-red-800";
            bgClass = "bg-red-100";
            label = "Rejected";
            break;
        default:
            icon = <AlertCircle className="h-5 w-5" />;
            textClass = "text-yellow-800";
            bgClass = "bg-yellow-100";
            label = "Pending";
    }

    return (
        <Card className={`${bgClass} ${textClass}`}>
            <CardHeader>
                <div className="flex items-center gap-3">
                    {icon}
                    <div className="flex flex-col">
                        <CardTitle className={`text-lg ${textClass}`}>{label}</CardTitle>
                        {status === 'Rejected' && <CardDescription className={`${textClass} opacity-80`}>{reason}</CardDescription>}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};


export default function SurveyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [survey, setSurvey] = React.useState<SurveyData>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
        setSurvey(getSurveyById(id));
        setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
        <div className="flex flex-col gap-6">
            <Skeleton className="h-24 w-full" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (!survey) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4">
        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Survey Not Found</h2>
        <p className="text-muted-foreground">The survey with ID "{id}" could not be found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      <StatusInfo status={survey.status} reason={survey.rejectionReason} />

        <Card className="w-full">
            <CardContent className="pt-6">
                <Tabs defaultValue="farmer-selection" className="w-full">
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
                            <Input id="state" value={survey.location.state} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="district">District</Label>
                            <Input id="district" value={survey.location.district} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="taluka">Taluka</Label>
                            <Input id="taluka" value={survey.location.taluka} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="village">Village</Label>
                            <Input id="village" value={survey.location.village} disabled />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="farmer-info" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="farmer-name">Farmer Name</Label>
                            <Input id="farmer-name" value={survey.farmerName} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" value={survey.mobileNumber} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="voter-id">Voter ID</Label>
                            <Input id="voter-id" value={survey.voterId} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pan">PAN Card</Label>
                            <Input id="pan" value={survey.panCard} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Input id="bank-name" value={survey.bankName} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input id="account-number" value={survey.accountNumber} disabled />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="farm-info" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="area">Area (in Acres)</Label>
                            <Input id="area" value={survey.area} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="crop-type">Crop Type</Label>
                            <Input id="crop-type" value={survey.cropType} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="soil-type">Soil Type</Label>
                             <Input id="soil-type" value={survey.soilType} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="irrigation-type">Irrigation Type</Label>
                            <Input id="irrigation-type" value={survey.irrigationType} disabled />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="map" className="pt-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                            <Image
                                src={survey.mapImage}
                                alt="Farm Map"
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint="farm map"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Button variant="outline" className="w-full" disabled><Pin className="mr-2" /> Draw Button</Button>
                            <Button variant="outline" className="w-full" disabled><Footprints className="mr-2" /> Walk Button</Button>
                        </div>
                    </div>
                </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
