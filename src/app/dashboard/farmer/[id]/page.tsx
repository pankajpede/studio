
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
import { ArrowLeft, Edit, FileText, Image as ImageIcon, Map, Mic, Share2, User, Landmark, Fingerprint, Tractor, Droplets, BookUser, Wheat, Percent, Receipt, Truck } from 'lucide-react';
import Image from 'next/image';
import SurveyMap from '@/components/survey-map';
import type { Survey } from '../../page';
import { Separator } from '@/components/ui/separator';

// Mock data generation - in a real app, this would come from your backend/DB
const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  for (let i = 1; i <= count; i++) {
    const status = i % 3 === 0 ? 'Rejected' : i % 2 === 0 ? 'Pending' : 'Approved';
    const village = ['Chakur', 'Ahmedpur', 'Udgir', 'Nilanga'][i % 4];
    const taluka = ['Latur', 'Ausa', 'Udgir', 'Nilanga'][i % 4];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      surveyDate: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      surveyStatus: status,
      surveyStage: i % 2 === 0 ? 'Data Entry' : 'Completed',
      surveyedBy: ['Sunil Pawar', 'Anil Shinde', 'Rajesh Patil', 'Kavita Jadhav'][i % 4],
      reassignedTo: i % 5 === 0 ? ['Sunil Pawar', 'Anil Shinde', 'Rajesh Patil', 'Kavita Jadhav'][(i + 1) % 4] : '-',
      lastUpdated: `2023-10-${String((i % 30) + 2).padStart(2, '0')}`,
      farmerName: `Ramesh Kulkarni`, // Keep farmer name consistent for history
      farmerContact: `9876543${String(i).padStart(3, '0')}`,
      state: 'Maharashtra',
      district: 'Latur',
      division: 'Pune Division',
      taluka: taluka,
      village: village,
      shiwar: `Shiwar ${(i % 5) + 1}`,
      gatGroupNumber: `GAT-${String(123 + i)}`,
      surveyNumber: `SN-${String(456 + i)}`,
      areaAcre: Number((Math.random() * 5 + 1).toFixed(1)),
      gpsCoordinates: `${(18.40 + Math.random() * 0.1).toFixed(4)}, ${(76.57 + Math.random() * 0.1).toFixed(4)}`,
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
      updatedBy: ['Sunil Pawar', 'Anil Shinde', 'Admin'][i % 3],
      voiceNoteUploaded: i % 4 === 0 ? 'Yes' : 'No',
    });
  }
  return data;
};

const DetailItem = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-sm">{value || '-'}</p>
    </div>
);

export default function FarmerDetailPage() {
  const params = useParams();
  const { id } = params;
  const [surveyData, setSurveyData] = React.useState<Survey | undefined>(undefined);
  const [allSurveys, setAllSurveys] = React.useState<Survey[]>([]);

  // In a real app, you would fetch this data from Firestore based on the farmer/survey ID
  React.useEffect(() => {
    const generatedSurveys = generateSurveyData(10);
    setAllSurveys(generatedSurveys);
    const currentSurvey = generatedSurveys.find(s => s.surveyId === id);
    setSurveyData(currentSurvey);
  }, [id]);


  if (!surveyData) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <FileText className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Loading Survey Data...</h2>
        <p className="text-muted-foreground mb-4">
          If the survey with ID "{id}" does not load, it may not exist.
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
  
  // Mock detailed farmer data based on the survey
  const farmerData = {
      profile: {
          farmerName: surveyData.farmerName,
          fatherHusbandName: "Suresh Kulkarni",
          dob: "1985-05-20",
          mobile: surveyData.farmerContact,
          altMobile: "9876543211",
          email: "ramesh.kulkarni@example.com",
          address: "123, Main Road, Chakur",
          village: surveyData.village,
          taluka: surveyData.taluka,
          district: surveyData.district,
          state: surveyData.state,
          pincode: "413513",
      },
      identification: {
          aadhaar: "XXXX-XXXX-5678",
          electionId: "ABC1234567",
          pan: "ABCDE1234F",
          rationCard: "1234567890",
          farmerRegId: "FARMER-LATUR-123",
          bankAccount: "XXXX-XXXX-XX-12345",
          ifsc: "SBIN0000123",
      },
      farmDetails: {
          surveyNumber: surveyData.surveyNumber,
          gatGroupNumber: surveyData.gatGroupNumber,
          area: `${surveyData.areaAcre} Acres`,
          gpsCoordinates: surveyData.gpsCoordinates,
          caneType: surveyData.caneType,
          caneVariety: surveyData.caneVariety,
          cropCondition: surveyData.cropCondition,
          irrigationSource: "Canal",
          soilType: "Black Cotton",
      },
      cuttingToken: {
          tokenNumber: surveyData.tokenNumber,
          tokenDate: surveyData.tokenDate,
          approvedBy: surveyData.approvedBy,
          cuttingPhotoUploaded: surveyData.cuttingPhotoUploaded,
          tonnageReceived: `${surveyData.tonnageReceived} Tons`,
          gatePassEntryDate: surveyData.gatePassEntryDate,
      },
      media: {
          voiceNotes: [
              { name: "During Survey 1", file: "voice_note_survey_1.mp3" },
              { name: "During Cutting", file: "voice_note_cutting.mp3" },
          ],
          photos: [
            { category: "Farm Photos", url: `https://placehold.co/400x300.png`, hint: "sugarcane farm" },
            { category: "Cane Variety", url: `https://placehold.co/400x300.png`, hint: "sugarcane plant" },
            { category: "Cutting Token", url: `https://placehold.co/400x300.png`, hint: "document paper" },
            { category: "Cutting In-Progress", url: `https://placehold.co/400x300.png`, hint: "farm harvest" },
            { category: "Gate Pass Entry", url: `https://placehold.co/400x300.png`, hint: "truck sugarcane" },
          ]
      }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
       <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft />
            <span className="ml-2 hidden sm:inline">Back to Dashboard</span>
          </Link>
        </Button>
        <div className="flex gap-2">
            <Button variant="outline"><Edit /> <span className="ml-2 hidden sm:inline">Edit</span></Button>
            <Button variant="outline"><Share2 /> <span className="ml-2 hidden sm:inline">Reassign</span></Button>
            <Button><Map /> <span className="ml-2 hidden sm:inline">View Map</span></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-xl">{farmerData.profile.farmerName}</CardTitle>
                <CardDescription>Farmer Profile & Contact Information</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailItem label="Father/Husband Name" value={farmerData.profile.fatherHusbandName} />
              <DetailItem label="Date of Birth" value={farmerData.profile.dob} />
              <DetailItem label="Mobile Number" value={farmerData.profile.mobile} />
              <DetailItem label="Alternate Number" value={farmerData.profile.altMobile} />
              <DetailItem label="Email ID" value={farmerData.profile.email} />
              <DetailItem label="Full Address" value={`${farmerData.profile.address}, ${farmerData.profile.taluka}, ${farmerData.profile.district} - ${farmerData.profile.pincode}`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Fingerprint className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="font-headline">Identification</CardTitle>
                    <CardDescription>Farmer identification and bank details.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DetailItem label="Aadhaar Number" value={farmerData.identification.aadhaar} />
                <DetailItem label="Election ID" value={farmerData.identification.electionId} />
                <DetailItem label="PAN Card" value={farmerData.identification.pan} />
                <DetailItem label="Farmer Reg. ID" value={farmerData.identification.farmerRegId} />
                <DetailItem label="Bank Account No." value={farmerData.identification.bankAccount} />
                <DetailItem label="IFSC Code" value={farmerData.identification.ifsc} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <BookUser className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="font-headline">Survey History</CardTitle>
                    <CardDescription>Record of all surveys conducted for this farmer.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Survey ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Surveyor</TableHead>
                            <TableHead>Area</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allSurveys.map(survey => (
                            <TableRow key={survey.surveyId}>
                                <TableCell className="font-medium">{survey.surveyId}</TableCell>
                                <TableCell>{survey.surveyDate}</TableCell>
                                <TableCell>
                                    <Badge variant={survey.surveyStatus === "Approved" ? "default" : survey.surveyStatus === "Pending" ? "secondary" : "destructive"}>
                                        {survey.surveyStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{survey.surveyedBy}</TableCell>
                                <TableCell>{survey.areaAcre} Ac</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Tractor className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline">Farm Details</CardTitle>
                        <CardDescription>Plot and crop specific information.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <DetailItem label="Survey No." value={farmerData.farmDetails.surveyNumber} />
                    <DetailItem label="Gat/Group No." value={farmerData.farmDetails.gatGroupNumber} />
                    <DetailItem label="Area" value={farmerData.farmDetails.area} />
                    <DetailItem label="Cane Type" value={farmerData.farmDetails.caneType} />
                    <DetailItem label="Cane Variety" value={farmerData.farmDetails.caneVariety} />
                    <DetailItem label="Crop Condition" value={farmerData.farmDetails.cropCondition} />
                    <DetailItem label="Irrigation" value={farmerData.farmDetails.irrigationSource} />
                    <DetailItem label="Soil Type" value={farmerData.farmDetails.soilType} />
                </CardContent>
                <CardContent>
                    <div className="w-full h-48 rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                        <SurveyMap surveys={[surveyData]} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Receipt className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline">Cutting Token & Gate Pass</CardTitle>
                        <CardDescription>Harvest and delivery information.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <DetailItem label="Token Number" value={farmerData.cuttingToken.tokenNumber} />
                    <DetailItem label="Token Date" value={farmerData.cuttingToken.tokenDate} />
                    <DetailItem label="Approved By" value={farmerData.cuttingToken.approvedBy} />
                    <DetailItem label="Tonnage Received" value={farmerData.cuttingToken.tonnageReceived} />
                    <DetailItem label="Cutting Photo" value={farmerData.cuttingToken.cuttingPhotoUploaded} />
                    <DetailItem label="Gate Pass Date" value={farmerData.cuttingToken.gatePassEntryDate} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <ImageIcon className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline">Media</CardTitle>
                        <CardDescription>Uploaded photos and voice notes.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <h4 className="font-semibold text-sm">Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                        {farmerData.media.photos.map((photo, i) => (
                             <div key={i} className="relative group">
                                <Image src={photo.url} data-ai-hint={photo.hint} alt={photo.category} width={100} height={100} className="rounded-md object-cover w-full aspect-square" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center p-1 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    {photo.category}
                                </div>
                             </div>
                        ))}
                    </div>
                    <Separator />
                    <h4 className="font-semibold text-sm">Voice Notes</h4>
                     {farmerData.media.voiceNotes.map((note, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-md border bg-muted/50">
                            <Mic className="text-primary" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{note.file}</span>
                                <span className="text-xs text-muted-foreground">{note.name}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="ml-auto">Play</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
