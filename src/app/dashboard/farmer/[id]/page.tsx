
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
    const village = ['चाकूर', 'अहमदपूर', 'उदगीर', 'निलंगा'][i % 4];
    const taluka = ['लातूर', 'औसा', 'उदगीर', 'निलंगा'][i % 4];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      surveyDate: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      surveyStatus: status,
      surveyStage: i % 2 === 0 ? 'माहिती भरणे' : 'पूर्ण झाले',
      surveyedBy: ['सुनील पवार', 'अनिल शिंदे', 'राजेश पाटील', 'कविता जाधव'][i % 4],
      reassignedTo: i % 5 === 0 ? ['सुनील पवार', 'अनिल शिंदे', 'राजेश पाटील', 'कविता जाधव'][(i + 1) % 4] : '-',
      lastUpdated: `2023-10-${String((i % 30) + 2).padStart(2, '0')}`,
      farmerName: `रमेश कुलकर्णी`, // Keep farmer name consistent for history
      farmerContact: `9876543${String(i).padStart(3, '0')}`,
      state: 'महाराष्ट्र',
      district: 'लातूर',
      division: 'पुणे विभाग',
      taluka: taluka,
      village: village,
      shiwar: `शिवार ${(i % 5) + 1}`,
      gatGroupNumber: `GAT-${String(123 + i)}`,
      surveyNumber: `SN-${String(456 + i)}`,
      areaAcre: Number((Math.random() * 5 + 1).toFixed(1)),
      gpsCoordinates: `${(18.40 + Math.random() * 0.1).toFixed(4)}, ${(76.57 + Math.random() * 0.1).toFixed(4)}`,
      caneType: ['अडसाली', 'पूर्व-हंगामी', 'सुरू'][i % 3],
      caneVariety: ['को-86032', 'कोएम-0265', 'एमएस-10001'][i % 3],
      cropCondition: ['चांगली', 'मध्यम', 'खराब'][i % 3],
      photoCount: Math.floor(Math.random() * 5) + 1,
      approvedBy: status === 'Approved' ? 'प्रशासक' : '-',
      approvalStatus: status,
      rejectionReason: status === 'Rejected' ? 'चुकीची माहिती' : '-',
      tokenNumber: status === 'Approved' ? `TKN-${String(789 + i)}` : '-',
      tokenDate: status === 'Approved' ? `2023-10-${String((i % 30) + 3).padStart(2, '0')}` : '-',
      otpVerified: i % 2 === 0 ? 'होय' : 'नाही',
      cuttingPhotoUploaded: i % 2 === 0 ? 'होय' : 'नाही',
      tonnageReceived: status === 'Approved' ? Math.floor(Math.random() * 100 + 150) : 0,
      gatePassEntryDate: status === 'Approved' ? `2023-11-${String((i % 28) + 1).padStart(2, '0')}` : '-',
      submittedFrom: i % 2 === 0 ? 'मोबाइल' : 'वेब',
      offlineSync: i % 3 === 0 ? 'होय' : 'नाही',
      createdOn: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedBy: ['सुनील पवार', 'अनिल शिंदे', 'प्रशासक'][i % 3],
      voiceNoteUploaded: i % 4 === 0 ? 'होय' : 'नाही',
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
        <h2 className="text-2xl font-bold mb-2">सर्वेक्षण डेटा लोड होत आहे...</h2>
        <p className="text-muted-foreground mb-4">
          जर "{id}" आयडी असलेले सर्वेक्षण लोड झाले नाही, तर ते अस्तित्वात नसू शकते.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2" />
            डॅशबोर्डवर परत जा
          </Link>
        </Button>
      </div>
    );
  }
  
  // Mock detailed farmer data based on the survey
  const farmerData = {
      profile: {
          farmerName: surveyData.farmerName,
          fatherHusbandName: "सुरेश कुलकर्णी",
          dob: "1985-05-20",
          mobile: surveyData.farmerContact,
          altMobile: "9876543211",
          email: "ramesh.kulkarni@example.com",
          address: "१२३, मुख्य रस्ता, चाकूर",
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
          area: `${surveyData.areaAcre} एकर`,
          gpsCoordinates: surveyData.gpsCoordinates,
          caneType: surveyData.caneType,
          caneVariety: surveyData.caneVariety,
          cropCondition: surveyData.cropCondition,
          irrigationSource: "कालवा",
          soilType: "काळी कापूस",
      },
      cuttingToken: {
          tokenNumber: surveyData.tokenNumber,
          tokenDate: surveyData.tokenDate,
          approvedBy: surveyData.approvedBy,
          cuttingPhotoUploaded: surveyData.cuttingPhotoUploaded,
          tonnageReceived: `${surveyData.tonnageReceived} टन`,
          gatePassEntryDate: surveyData.gatePassEntryDate,
      },
      media: {
          voiceNotes: [
              { name: "सर्वेक्षणादरम्यान १", file: "voice_note_survey_1.mp3" },
              { name: "तोडणीदरम्यान", file: "voice_note_cutting.mp3" },
          ],
          photos: [
            { category: "शेताचे फोटो", url: `https://placehold.co/400x300.png`, hint: "sugarcane farm" },
            { category: "उसाची जात", url: `https://placehold.co/400x300.png`, hint: "sugarcane plant" },
            { category: "तोडणी टोकन", url: `https://placehold.co/400x300.png`, hint: "document paper" },
            { category: "तोडणी चालू", url: `https://placehold.co/400x300.png`, hint: "farm harvest" },
            { category: "गेट पास नोंद", url: `https://placehold.co/400x300.png`, hint: "truck sugarcane" },
          ]
      }
  }
  const statusTranslations: Record<string, string> = {
    "Approved": "मंजूर",
    "Pending": "प्रलंबित",
    "Rejected": "नाकारलेले"
  }
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
       <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft />
            <span className="ml-2 hidden sm:inline">डॅशबोर्डवर परत जा</span>
          </Link>
        </Button>
        <div className="flex gap-2">
            <Button variant="outline"><Edit /> <span className="ml-2 hidden sm:inline">संपादित करा</span></Button>
            <Button variant="outline"><Share2 /> <span className="ml-2 hidden sm:inline">पुन्हा नियुक्त करा</span></Button>
            <Button><Map /> <span className="ml-2 hidden sm:inline">नकाशा पहा</span></Button>
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
                <CardDescription>शेतकरी प्रोफाइल आणि संपर्क माहिती</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailItem label="वडील/पतीचे नाव" value={farmerData.profile.fatherHusbandName} />
              <DetailItem label="जन्म तारीख" value={farmerData.profile.dob} />
              <DetailItem label="मोबाइल नंबर" value={farmerData.profile.mobile} />
              <DetailItem label="पर्यायी नंबर" value={farmerData.profile.altMobile} />
              <DetailItem label="ईमेल आयडी" value={farmerData.profile.email} />
              <DetailItem label="पूर्ण पत्ता" value={`${farmerData.profile.address}, ${farmerData.profile.taluka}, ${farmerData.profile.district} - ${farmerData.profile.pincode}`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Fingerprint className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="font-headline">ओळख</CardTitle>
                    <CardDescription>शेतकरी ओळख आणि बँक तपशील.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DetailItem label="आधार नंबर" value={farmerData.identification.aadhaar} />
                <DetailItem label="निवडणूक ओळखपत्र" value={farmerData.identification.electionId} />
                <DetailItem label="पॅन कार्ड" value={farmerData.identification.pan} />
                <DetailItem label="शेतकरी नोंदणी आयडी" value={farmerData.identification.farmerRegId} />
                <DetailItem label="बँक खाते क्रमांक" value={farmerData.identification.bankAccount} />
                <DetailItem label="IFSC कोड" value={farmerData.identification.ifsc} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <BookUser className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="font-headline">सर्वेक्षण इतिहास</CardTitle>
                    <CardDescription>या शेतकऱ्यासाठी केलेल्या सर्व सर्वेक्षणांची नोंद.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>सर्वेक्षण आयडी</TableHead>
                            <TableHead>तारीख</TableHead>
                            <TableHead>स्थिती</TableHead>
                            <TableHead>सर्वेक्षक</TableHead>
                            <TableHead>क्षेत्र</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allSurveys.map(survey => (
                            <TableRow key={survey.surveyId}>
                                <TableCell className="font-medium">{survey.surveyId}</TableCell>
                                <TableCell>{survey.surveyDate}</TableCell>
                                <TableCell>
                                    <Badge variant={survey.surveyStatus === "Approved" ? "default" : survey.surveyStatus === "Pending" ? "secondary" : "destructive"}>
                                        {statusTranslations[survey.surveyStatus] || survey.surveyStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{survey.surveyedBy}</TableCell>
                                <TableCell>{survey.areaAcre} एकर</TableCell>
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
                        <CardTitle className="font-headline">शेत तपशील</CardTitle>
                        <CardDescription>प्लॉट आणि पीक विशिष्ट माहिती.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <DetailItem label="सर्वेक्षण नं." value={farmerData.farmDetails.surveyNumber} />
                    <DetailItem label="गट/ग्रुप नं." value={farmerData.farmDetails.gatGroupNumber} />
                    <DetailItem label="क्षेत्र" value={farmerData.farmDetails.area} />
                    <DetailItem label="उसाचा प्रकार" value={farmerData.farmDetails.caneType} />
                    <DetailItem label="उसाची जात" value={farmerData.farmDetails.caneVariety} />
                    <DetailItem label="पिकाची स्थिती" value={farmerData.farmDetails.cropCondition} />
                    <DetailItem label="सिंचन" value={farmerData.farmDetails.irrigationSource} />
                    <DetailItem label="मातीचा प्रकार" value={farmerData.farmDetails.soilType} />
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
                        <CardTitle className="font-headline">तोडणी टोकन आणि गेट पास</CardTitle>
                        <CardDescription>कापणी आणि वितरण माहिती.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <DetailItem label="टोकन नंबर" value={farmerData.cuttingToken.tokenNumber} />
                    <DetailItem label="टोकन तारीख" value={farmerData.cuttingToken.tokenDate} />
                    <DetailItem label="मंजूर करणारा" value={farmerData.cuttingToken.approvedBy} />
                    <DetailItem label="प्राप्त टनेज" value={farmerData.cuttingToken.tonnageReceived} />
                    <DetailItem label="तोडणी फोटो" value={farmerData.cuttingToken.cuttingPhotoUploaded} />
                    <DetailItem label="गेट पास तारीख" value={farmerData.cuttingToken.gatePassEntryDate} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <ImageIcon className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline">मीडिया</CardTitle>
                        <CardDescription>सर्वेक्षण {surveyData.surveyDate} रोजी अपलोड केलेले.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <h4 className="font-semibold text-sm">फोटो</h4>
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
                    <h4 className="font-semibold text-sm">व्हॉइस नोट्स</h4>
                     {farmerData.media.voiceNotes.map((note, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-md border bg-muted/50">
                            <Mic className="text-primary" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{note.file}</span>
                                <span className="text-xs text-muted-foreground">{note.name}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="ml-auto" disabled>प्ले</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
