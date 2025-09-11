
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
import { ArrowLeft, Edit, FileText, Image as ImageIcon, Map, Mic, Share2, User, Landmark, Fingerprint, Tractor, Droplets, BookUser, Wheat, Percent, Receipt, Truck, Play, Pause, Eye, Ticket } from 'lucide-react';
import Image from 'next/image';
import SurveyMap from '@/components/survey-map';
import type { Survey } from '../../page';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


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
      areaHector: Number((Math.random() * 2 + 0.5).toFixed(2)),
      gpsCoordinates: `${(18.40 + Math.random() * 0.1).toFixed(4)}, ${(76.57 + Math.random() * 0.1).toFixed(4)}`,
      caneType: ['अडसाली', 'पूर्व-हंगामी', 'सुरू'][i % 3],
      caneVariety: ['को-86032', 'कोएम-0265', 'एमएस-10001'][i % 3],
      cropCondition: ['चांगली', 'मध्यम', 'खराब'][i % 3],
      photoCount: Math.floor(Math.random() * 5) + 1,
      approvedBy: status === 'Approved' ? 'Administrator' : '-',
      approvalStatus: status,
      rejectionReason: status === 'Rejected' ? 'Incorrect Information' : '-',
      tokenNumber: status === 'Approved' ? `TKN-${String(789 + i)}` : '-',
      tokenDate: status === 'Approved' ? `2023-10-${String((i % 30) + 3).padStart(2, '0')}` : '-',
      otpVerified: i % 2 === 0 ? 'Yes' : 'No',
      cuttingPhotoUploaded: i % 2 === 0 ? 'Yes' : 'No',
      tonnageReceived: status === 'Approved' ? Math.floor(Math.random() * 100 + 150) : 0,
      gatePassEntryDate: status === 'Approved' ? `2023-11-${String((i % 28) + 1).padStart(2, '0')}` : '-',
      submittedFrom: i % 2 === 0 ? 'Mobile' : 'Web',
      offlineSync: i % 3 === 0 ? 'Yes' : 'No',
      createdOn: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedBy: ['सुनील पवार', 'अनिल शिंदे', 'Administrator'][i % 3],
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

const DocumentDetailItem = ({ label, value, imageUrl }: { label: string; value: string; imageUrl: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
            <p className="font-medium text-sm font-mono">{value || '-'}</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Eye className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{label} Document</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <Image src={imageUrl} alt={`${label} document`} width={500} height={300} className="rounded-md w-full" data-ai-hint="document photo"/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </div>
);


// A silent 1-second WAV file encoded in Base64
const silentAudio = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=";


export default function FarmerDetailPage() {
  const params = useParams();
  const { id } = params;
  const [surveyData, setSurveyData] = React.useState<Survey | undefined>(undefined);
  const [selectedSurveyForMedia, setSelectedSurveyForMedia] = React.useState<Survey | undefined>(undefined);
  const [allSurveys, setAllSurveys] = React.useState<Survey[]>([]);
  const [playingAudio, setPlayingAudio] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [showTokenDetails, setShowTokenDetails] = React.useState(false);


  // In a real app, you would fetch this data from Firestore based on the farmer/survey ID
  React.useEffect(() => {
    const generatedSurveys = generateSurveyData(10);
    setAllSurveys(generatedSurveys);
    const currentSurvey = generatedSurveys.find(s => s.surveyId === id);
    setSurveyData(currentSurvey);
    setSelectedSurveyForMedia(currentSurvey);
  }, [id]);

  const handleMediaSurveyChange = (surveyId: string) => {
    const newSelectedSurvey = allSurveys.find(s => s.surveyId === surveyId);
    setSelectedSurveyForMedia(newSelectedSurvey);
  };
  
   const handleGenerateToken = () => {
    setShowTokenDetails(true);
  };

  const handlePlayPause = (audioSrc: string, noteName: string) => {
    if (playingAudio === noteName) {
        audioRef.current?.pause();
        setPlayingAudio(null);
    } else {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        setPlayingAudio(noteName);
        audioRef.current.onended = () => {
            setPlayingAudio(null);
        };
    }
  };
  
  React.useEffect(() => {
    // Cleanup audio element on component unmount
    return () => {
        audioRef.current?.pause();
    }
  }, [])

  const maskDocument = (docNumber: string) => {
    if (!docNumber || docNumber.length <= 4) return docNumber;
    return 'X'.repeat(docNumber.length - 4) + docNumber.slice(-4);
  }


  if (!surveyData || !selectedSurveyForMedia) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <FileText className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Loading Survey Data...</h2>
        <p className="text-muted-foreground mb-4">
          If the survey with ID "{id}" doesn't load, it might not exist.
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
          electionId: "ABC1234567",
          pan: "ABCDE1234F",
          drivingLicense: "MH1420110012345",
          farmerRegId: "FARMER-LATUR-123",
          nameAsPerPassbook: "Ramesh Suresh Kulkarni",
          bankAccount: "XXXX-XXXX-XX-12345",
          ifsc: "SBIN0000123",
      },
      farmDetails: {
          surveyNumber: surveyData.surveyNumber,
          gatGroupNumber: surveyData.gatGroupNumber,
          area: `${surveyData.areaHector} Ha`,
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
          tonnageReceived: `${surveyData.tonnageReceived} Ton`,
          gatePassEntryDate: surveyData.gatePassEntryDate,
      },
      media: {
          voiceNotes: allSurveys
            .filter(survey => survey.voiceNoteUploaded === 'Yes')
            .map(survey => ({
                name: `Survey ${survey.surveyId}`,
                file: `voice_note_${survey.surveyId}.mp3`,
                src: silentAudio
            })),
          photos: selectedSurveyForMedia.photoCount > 0 ? [
            { category: "Farm Photos", url: `https://placehold.co/400x300.png`, hint: "sugarcane farm" },
            { category: "Cane Variety", url: `https://placehold.co/400x300.png`, hint: "sugarcane plant" },
            { category: "Cutting Token", url: `https://placehold.co/400x300.png`, hint: "document paper" },
            { category: "Cutting In Progress", url: `https://placehold.co/400x300.png`, hint: "farm harvest" },
          ] : []
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
            <Button variant="outline"><Edit /> <span className="ml-2 hidden sm:inline">Update</span></Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><Map /> <span className="ml-2 hidden sm:inline">View on Map</span></Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-4/5 flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Farm Map</DialogTitle>
                    </DialogHeader>
                    <div className="flex-grow w-full py-4">
                        <SurveyMap surveys={[surveyData]} />
                    </div>
                </DialogContent>
            </Dialog>
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
                <CardDescription>Farmer profile and contact information</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailItem label="Father/Husband's Name" value={farmerData.profile.fatherHusbandName} />
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
                <DocumentDetailItem label="Election ID" value={maskDocument(farmerData.identification.electionId)} imageUrl="https://placehold.co/600x400.png" />
                <DocumentDetailItem label="PAN Card" value={maskDocument(farmerData.identification.pan)} imageUrl="https://placehold.co/600x400.png" />
                <DocumentDetailItem label="Driving License" value={maskDocument(farmerData.identification.drivingLicense)} imageUrl="https://placehold.co/600x400.png" />
                <DetailItem label="Farmer Reg. ID" value={farmerData.identification.farmerRegId} />
                <DetailItem label="Name as per Passbook" value={farmerData.identification.nameAsPerPassbook} />
                <DetailItem label="Bank Account Number" value={farmerData.identification.bankAccount} />
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
                                <TableCell>{survey.areaHector} Ha</TableCell>
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
                <CardHeader>
                    <div className='flex flex-row items-center gap-4 w-full'>
                        <ImageIcon className="w-8 h-8 text-primary" />
                        <div className='flex-grow'>
                            <CardTitle className="font-headline">Media</CardTitle>
                        </div>
                        <Select onValueChange={handleMediaSurveyChange} value={selectedSurveyForMedia.surveyId}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Survey" />
                            </SelectTrigger>
                            <SelectContent>
                                {allSurveys.map(s => (
                                    <SelectItem key={s.surveyId} value={s.surveyId}>
                                        {s.surveyDate}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <h4 className="font-semibold text-sm">Photos</h4>
                    {farmerData.media.photos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {farmerData.media.photos.map((photo, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <Image src={photo.url} data-ai-hint={photo.hint} alt={photo.category} width={200} height={150} className="rounded-md object-cover w-full aspect-video" />
                                    <p className="text-xs text-center text-muted-foreground">{photo.category}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center">No photos for this survey.</p>
                    )}
                    <Separator />
                    <h4 className="font-semibold text-sm">Voice Notes</h4>
                     {farmerData.media.voiceNotes.length > 0 ? (
                        <TooltipProvider>
                            {farmerData.media.voiceNotes.map((note, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 rounded-md border bg-muted/50">
                                    <Mic className="text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{note.file}</span>
                                        <span className="text-xs text-muted-foreground">{note.name}</span>
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon" variant="ghost" className="ml-auto h-8 w-8" onClick={() => handlePlayPause(note.src, note.name)}>
                                                {playingAudio === note.name ? <Pause /> : <Play />}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{playingAudio === note.name ? 'Pause' : 'Play'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            ))}
                        </TooltipProvider>
                     ) : (
                        <p className="text-sm text-muted-foreground text-center">No voice notes for this farmer.</p>
                     )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Receipt className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline">Cutting Token & Gate Pass</CardTitle>
                        <CardDescription>Harvesting and delivery information.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                {showTokenDetails ? (
                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem label="Token Number" value={farmerData.cuttingToken.tokenNumber} />
                        <DetailItem label="Token Date" value={farmerData.cuttingToken.tokenDate} />
                        <DetailItem label="Approved By" value={farmerData.cuttingToken.approvedBy} />
                        <DetailItem label="Tonnage Received" value={farmerData.cuttingToken.tonnageReceived} />
                        <DetailItem label="Cutting Photo" value={farmerData.cuttingToken.cuttingPhotoUploaded} />
                        <DetailItem label="Gate Pass Date" value={farmerData.cuttingToken.gatePassEntryDate} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-4">
                        <Button onClick={handleGenerateToken}>
                            <Ticket className="mr-2" />
                            Generate Token
                        </Button>
                    </div>
                )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
