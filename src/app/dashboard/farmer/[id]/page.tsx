
"use client"

import * as React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Edit, FileText, Image as ImageIcon, Mic, Share2, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import SurveyMap from '@/components/survey-map';
import type { Survey } from '../../page';

// Mock data generation - in a real app, this would come from your backend/DB
const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  for (let i = 1; i <= count; i++) {
    const status = i % 3 === 0 ? 'Rejected' : i % 2 === 0 ? 'Pending' : 'Approved';
    const village = ['Kothari', 'Wadgaon', 'Sangvi', 'Malegaon'][i % 4];
    const taluka = ['Baramati', 'Indapur', 'Daund', 'Haveli'][i % 4];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      surveyDate: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      surveyStatus: status,
      surveyStage: i % 2 === 0 ? 'Data Entry' : 'Completed',
      surveyedBy: ['Sunil', 'Anil', 'Rajesh', 'Kavita'][i % 4],
      reassignedTo: i % 5 === 0 ? ['Sunil', 'Anil', 'Rajesh', 'Kavita'][(i + 1) % 4] : '-',
      lastUpdated: `2023-10-${String((i % 30) + 2).padStart(2, '0')}`,
      farmerName: `Farmer ${i}`,
      farmerContact: `9876543${String(i).padStart(3, '0')}`,
      state: 'Maharashtra',
      district: 'Pune',
      division: 'Pune Division',
      taluka: taluka,
      village: village,
      shiwar: `Shiwar ${(i % 5) + 1}`,
      gatGroupNumber: `GAT-${String(123 + i)}`,
      surveyNumber: `SN-${String(456 + i)}`,
      areaAcre: Number((Math.random() * 5 + 1).toFixed(1)),
      gpsCoordinates: `${(18.15 + Math.random() * 0.1).toFixed(4)}, ${(74.58 + Math.random() * 0.1).toFixed(4)}`,
      caneType: ['Adsali', 'Preseasonal', 'Sursali'][i % 3],
      caneVariety: ['Co-86032', 'CoM-0265', 'MS-10001'][i % 3],
      cropCondition: ['Good', 'Average', 'Poor'][i % 3],
      photoCount: Math.floor(Math.random() * 5) + 1,
      approvedBy: status === 'Approved' ? 'Admin' : '-',
      approvalStatus: status,
      rejectionReason: status === 'Rejected' ? 'Incorrect data' : '-',
      tokenNumber: status === 'Approved' ? `TKN-${String(789 + i)}` : '-',
      tokenDate: status === 'Approved' ? `2023-10-${String((i % 30) + 3).padStart(2, '0')}` : '-',
      otpVerified: i % 2 === 0 ? 'Yes' : 'No',
      cuttingPhotoUploaded: i % 2 === 0 ? 'Yes' : 'No',
      tonnageReceived: status === 'Approved' ? Math.floor(Math.random() * 100 + 150) : 0,
      gatePassEntryDate: status === 'Approved' ? `2023-11-${String((i % 28) + 1).padStart(2, '0')}` : '-',
      submittedFrom: i % 2 === 0 ? 'Mobile' : 'Web',
      offlineSync: i % 3 === 0 ? 'Yes' : 'No',
      createdOn: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedBy: ['Sunil', 'Anil', 'Admin'][i % 3],
      voiceNoteUploaded: i % 4 === 0 ? 'Yes' : 'No',
    });
  }
  return data;
};

const allSurveys = generateSurveyData(100);

export default function FarmerDetailPage() {
  const params = useParams();
  const { id } = params;

  // Fetch farmer data based on ID. Using mock data for now.
  const surveyData = React.useMemo(() => {
    return allSurveys.find(s => s.surveyId === id);
  }, [id]);
  
  // In a real app, you would fetch all surveys for this farmer's real ID
  const surveyHistory = React.useMemo(() => {
    if (!surveyData) return [];
    return allSurveys.filter(s => s.farmerName === surveyData.farmerName).slice(0, 5);
  }, [surveyData])


  if (!surveyData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <FileText className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Survey Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The survey with ID "{id}" could not be found.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
       <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex gap-2">
            <Button variant="outline"><Edit className="mr-2" /> Edit</Button>
            <Button><Share2 className="mr-2" /> Reassign</Button>
            <Button><ThumbsUp className="mr-2" /> Approve</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{surveyData.farmerName}</CardTitle>
              <CardDescription>Farmer Profile & Location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium">{surveyData.farmerContact}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Village</p>
                  <p className="font-medium">{surveyData.village}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Taluka</p>
                  <p className="font-medium">{surveyData.taluka}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">District</p>
                  <p className="font-medium">{surveyData.district}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{surveyData.lastUpdated}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Surveyor</p>
                  <p className="font-medium">{surveyData.surveyedBy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Survey History</CardTitle>
              <CardDescription>Recent surveys conducted for this farmer.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Survey ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Token No.</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {surveyHistory.map(survey => (
                            <TableRow key={survey.surveyId}>
                                <TableCell className="font-medium">{survey.surveyId}</TableCell>
                                <TableCell>{survey.surveyDate}</TableCell>
                                <TableCell>
                                    <Badge variant={survey.surveyStatus === "Approved" ? "default" : survey.surveyStatus === "Pending" ? "secondary" : "destructive"}>
                                        {survey.surveyStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{survey.tokenNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
           <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Approval & Token Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Approval Status</p>
                        <div className="font-medium flex items-center">
                            <Badge variant={surveyData.approvalStatus === "Approved" ? "default" : surveyData.approvalStatus === "Pending" ? "secondary" : "destructive"}>
                                {surveyData.approvalStatus}
                            </Badge>
                        </div>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Approved By</p>
                        <p className="font-medium">{surveyData.approvedBy}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Token Number</p>
                        <p className="font-medium">{surveyData.tokenNumber}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Tonnage Received</p>
                        <p className="font-medium">{surveyData.tonnageReceived > 0 ? `${surveyData.tonnageReceived} Tons` : '-'}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Cutting Photo</p>
                        <p className="font-medium">{surveyData.cuttingPhotoUploaded}</p>
                    </div>
                      <div>
                        <p className="text-muted-foreground">Rejection Reason</p>
                        <p className="font-medium">{surveyData.rejectionReason}</p>
                    </div>
                </CardContent>
           </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Farm Details</CardTitle>
                </CardHeader>
                 <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Area</p>
                        <p className="font-medium">{surveyData.areaAcre} Acres</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Survey No.</p>
                        <p className="font-medium">{surveyData.surveyNumber}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Cane Type</p>
                        <p className="font-medium">{surveyData.caneType}</p>
                    </div>
                      <div>
                        <p className="text-muted-foreground">Cane Variety</p>
                        <p className="font-medium">{surveyData.caneVariety}</p>
                    </div>
                </CardContent>
                <CardContent>
                    <div className="w-full h-64 rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                        <SurveyMap surveys={[surveyData]} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Photos & Voice Notes</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: surveyData.photoCount }).map((_, i) => (
                             <Image key={i} src={`https://placehold.co/400x400.png`} data-ai-hint="sugarcane farm" alt={`Farm photo ${i+1}`} width={100} height={100} className="rounded-md object-cover w-full aspect-square" />
                        ))}
                         {surveyData.photoCount === 0 && <p className="text-sm text-muted-foreground col-span-3">No photos uploaded.</p>}
                    </div>
                    {surveyData.voiceNoteUploaded === "Yes" ? (
                        <div className="flex items-center gap-2 p-2 rounded-md border bg-muted/50">
                            <Mic className="text-primary" />
                            <span className="text-sm font-medium">Voice Note.mp3</span>
                            <Button size="sm" variant="ghost" className="ml-auto">Play</Button>
                        </div>
                    ) : <p className="text-sm text-muted-foreground">No voice notes uploaded.</p>}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
