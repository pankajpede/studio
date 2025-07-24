
"use client"

import * as React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { FileText, User, Tractor, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DetailItem } from '@/components/detail-item';

// Mock data - in a real app, this would be fetched from a database
const getSurveyById = (id: string) => {
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
    area: "2.5 Acres",
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
  const survey = React.useMemo(() => getSurveyById(id), [id]);

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

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <User className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline text-lg">Farmer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-5">
          <DetailItem label="Farmer Name" value={survey.farmerName} />
          <DetailItem label="Mobile Number" value={survey.mobileNumber} />
          <DetailItem label="Voter ID" value={survey.voterId} />
          <DetailItem label="PAN Card" value={survey.panCard} />
          <DetailItem label="Bank Name" value={survey.bankName} />
          <DetailItem label="Account Number" value={survey.accountNumber} />
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Tractor className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline text-lg">Farm Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-5">
          <DetailItem label="Area" value={survey.area} />
          <DetailItem label="Crop Type" value={survey.cropType} />
          <DetailItem label="Soil Type" value={survey.soilType} />
          <DetailItem label="Irrigation" value={survey.irrigationType} />
           <DetailItem label="State" value={survey.location.state} />
          <DetailItem label="District" value={survey.location.district} />
          <DetailItem label="Taluka" value={survey.location.taluka} />
          <DetailItem label="Village" value={survey.location.village} />
        </CardContent>
      </Card>

       <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <MapPin className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline text-lg">Farm Map</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="w-full h-64 rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                <Image
                    src={survey.mapImage}
                    alt="Farm Map"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="farm map"
                />
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
