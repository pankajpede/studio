
"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CalendarClock, CheckCircle, XCircle, AlertCircle, ArrowLeft, ArrowRight, MessageSquare, Edit, Trash2, UserPlus, RefreshCcw, LocateFixed } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { format, addMonths } from 'date-fns';
import Image from 'next/image';
import FieldBoyMap from '@/components/field-boy-map';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type SurveyStatus = "Pending" | "Approved" | "Rejected" | "Draft" | "Assigned";

// This mock data should ideally come from a shared service/API layer
const mockSurveys = [
  { id: "SUR001", farmerName: "सचिन कुलकर्णी", status: "Pending", daysLeft: 2 },
  { id: "SUR002", farmerName: "विशाल मोरे", status: "Approved" },
  { id: "SUR003", farmerName: "अजय पाटील", status: "Rejected", daysLeft: 6 },
  { id: "SUR004", farmerName: "सुनीता मोरे", status: "Pending", daysLeft: 4 },
  { id: "SUR005", farmerName: "कविता देशमुख", status: "Approved" },
  { id: "SUR006", farmerName: "राहुल जाधव", status: "Draft" },
  { id: "SUR007", farmerName: "रमेश शिंदे", status: "Assigned", daysLeft: 5 },
  { id: "SUR008", farmerName: "प्रिया शर्मा", status: "Draft" },
  { id: "SUR009", farmerName: "अमित कुमार", status: "Pending", daysLeft: 1 },
  { id: "SUR010", farmerName: "पूजा गायकवाड", status: "Rejected", daysLeft: 3 },
  { id: "SUR011", farmerName: "संजय मेहरा", status: "Assigned", daysLeft: 3 },
]

// Mock data - in a real app, this would be fetched from a database
const getSurveyById = (id: string | null) => {
    if (!id) return null;
    const surveyFromList = mockSurveys.find(s => s.id === id);
    if (!surveyFromList) return null;

    let verificationDetails = null;
    if (surveyFromList.status === 'Rejected') {
        verificationDetails = {
            accepted: 15,
            rejected: 7,
            rejectedFields: ['sabNumber', 'linkNumber', 'plantationDate', 'farm-photo-1', 'saatBaaraPhoto', 'farmBoundary', 'fieldBoyLocation'],
        };
    }

  return {
    id: surveyFromList.id,
    status: surveyFromList.status as SurveyStatus,
    daysLeft: surveyFromList.daysLeft,
    rejectionReason: surveyFromList.status === "Rejected" ? "अपूर्ण कागदपत्रे सादर केली." : "-",
    rejectionRemark: surveyFromList.status === 'Rejected' ? 'कृपया शेतकरी आणि ७/१२ कागदपत्रांचे फोटो पुन्हा अपलोड करा. लागवडीची तारीख चुकीची आहे.' : null,
    rejectionAudioUrl: surveyFromList.status === 'Rejected' ? "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=" : null,
    verificationDetails,
    submittedOn: "2024-06-30",
    location: {
        state: "महाराष्ट्र",
        district: "लातूर",
        taluka: "अहमदपूर",
        circle: "सर्कल १",
        gut: "गट १०१",
        village: "मोहगाव",
        shivar: "शिवार अ",
        surveyNumber: "SN-123",
        gpsCoordinates: "18.4088,76.5702"
    },
    farmer: {
        name: surveyFromList.farmerName,
        growerType: "member",
        sabNumber: "SAB-A001",
        khataNumber: "KH-112233",
        mobile: "9876543210",
        linkNumber: "LNK-54321",
        napNumber: "NAP-98765",
        bankName: "स्टेट बँक ऑफ इंडिया",
        branchName: "लातूर शाखा",
        accountNumber: "XXXX-XXXX-1234",
        ifsc: "SBIN0001234",
    },
    farm: {
        area: "1.0",
        plantationDate: new Date('2023-08-12'),
        caneVariety: 'जात १',
        caneType: 'प्रकार १ (12 महिने)',
        irrigationType: 'ठिबक',
        irrigationSource: 'विहीर',
        irrigationMethod: 'पद्धत १',
        plantationMethod: 'पद्धत अ',
        caneMaturityDate: addMonths(new Date('2023-08-12'), 12),
        east: "शेजारील शेत",
        west: "रस्ता",
        north: "ओढा",
        south: "पडीक जमीन",
    },
    media: {
        farmPhotos: [
            "https://placehold.co/400x300.png",
            "https://placehold.co/400x300.png",
            "https://placehold.co/400x300.png",
            "https://placehold.co/400x300.png",
        ],
        farmPhotoLabels: ["शेताचे फोटो", "उसाची जात", "मातीचा प्रकार", "सिंचनाचा प्रकार"],
        farmerPhoto: "https://placehold.co/400x300.png",
        fieldBoyPhoto: "https://placehold.co/400x300.png",
        saatBaaraPhoto: "https://placehold.co/400x300.png",
        audioNote: "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=",
        otherMedia: [
            { name: "नोंदणी कागदपत्र", url: "https://placehold.co/200x100.png" },
        ]
    }
  };
};

type SurveyData = ReturnType<typeof getSurveyById>;

const StatusInfo = ({ survey }: { survey: SurveyData }) => {
    if (!survey) return null;

    let icon;
    let textClass;
    let bgClass;
    let label;

    switch (survey.status) {
        case "Approved":
            icon = <CheckCircle className="h-5 w-5" />;
            textClass = "text-green-800";
            bgClass = "bg-green-100";
            label = "मंजूर (रांगेत)";
            break;
        case "Rejected":
            icon = <XCircle className="h-5 w-5" />;
            textClass = "text-red-800";
            bgClass = "bg-red-100";
            label = "नाकारलेले";
            break;
        case "Draft":
            icon = <FileText className="h-5 w-5" />;
            textClass = "text-gray-800";
            bgClass = "bg-gray-100";
            label = "ड्राफ्ट";
            break;
        case "Assigned":
             icon = <UserPlus className="h-5 w-5" />;
            textClass = "text-blue-800";
            bgClass = "bg-blue-100";
            label = "नियुक्त";
            break;
        default: // Pending
            icon = <AlertCircle className="h-5 w-5" />;
            textClass = "text-yellow-800";
            bgClass = "bg-yellow-100";
            label = "प्रलंबित";
    }

    return (
        <Card className={`${bgClass} ${textClass}`}>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {icon}
                        <div className="flex flex-col">
                            <CardTitle className={`text-lg ${textClass}`}>{label}</CardTitle>
                            {survey.status === 'Rejected' && <CardDescription className={`${textClass} opacity-80`}>{survey.rejectionReason}</CardDescription>}
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        {(survey.status === 'Pending' || survey.status === 'Assigned' || survey.status === 'Rejected') && survey.daysLeft !== undefined && (
                            <div className="flex items-center text-sm font-medium">
                                <CalendarClock className="h-4 w-4 mr-1.5"/>
                                <span>{survey.daysLeft} दिवस बाकी</span>
                            </div>
                        )}
                        {survey.status === 'Rejected' && survey.verificationDetails && (
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <div className="flex items-center gap-1.5 text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>{survey.verificationDetails.accepted} मंजूर</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-red-600">
                                    <XCircle className="h-4 w-4" />
                                    <span>{survey.verificationDetails.rejected} नाकारले</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            {survey.status === 'Rejected' && (
                 <CardContent>
                    <div className="space-y-4 rounded-lg bg-red-50/50 p-4 border border-red-200/50">
                        <h4 className="font-semibold flex items-center gap-2"><MessageSquare className="h-5 w-5"/> ओव्हरसीअरचा शेरा</h4>
                        {survey.rejectionRemark && <p className="text-sm">{survey.rejectionRemark}</p>}
                        {survey.rejectionAudioUrl && <audio src={survey.rejectionAudioUrl} controls className="w-full h-10" />}
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

const ReadOnlyInput = ({ label, value, isRejected }: { label: string; value?: string | number | null; isRejected?: boolean }) => (
    <div className="grid gap-1.5">
        <Label className="text-muted-foreground text-sm">{label}</Label>
        <p className={cn(
            "font-medium text-base h-10 flex items-center px-3 rounded-md border bg-muted/50",
            isRejected && "border-red-500 ring-2 ring-red-500/50"
        )}>{value || '-'}</p>
    </div>
);

const MediaDisplayItem = ({ label, src, isRejected, id }: { label: string; src: string; isRejected?: boolean, id:string }) => (
    <div className="grid gap-2">
        <Label>{label}</Label>
        <Image src={src} alt={label} width={400} height={300} data-ai-hint={id} className={cn("rounded-lg border aspect-video object-cover", isRejected && "border-red-500 ring-2 ring-red-500/50")} />
    </div>
);


export default function SurveyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;
  const [survey, setSurvey] = React.useState<SurveyData>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("farmer-selection");
  const mapRef = React.useRef<{ refreshLocation: () => void }>(null);
  const [distance, setDistance] = React.useState<string | null>(null);


  const tabs = ["farmer-selection", "farmer-info", "farm-info", "media", "map"];

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
        setSurvey(getSurveyById(id));
        setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleBack = () => {
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex > 0) {
          setActiveTab(tabs[currentIndex - 1]);
      } else {
          router.push('/field-boy/dashboard');
      }
  };

  const handleRestartSurvey = () => {
    toast({
        title: "सर्वेक्षण पुन्हा सुरू झाले",
        description: "सर्व डेटा साफ झाला आहे. कृपया सर्वेक्षण पुन्हा करा.",
    });
    router.push(`/field-boy/dashboard/new?edit=${id}&restart=true`);
  }

  if (isLoading) {
    return (
        <div className="flex flex-col gap-6">
            <Skeleton className="h-24 w-full" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent className="pt-6">
                    <Skeleton className="h-10 w-full mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <h2 className="text-xl font-bold mb-2">सर्वेक्षण आढळले नाही</h2>
        <p className="text-muted-foreground">"{id}" आयडी असलेले सर्वेक्षण आढळले नाही.</p>
      </div>
    );
  }

  const isLastTab = activeTab === tabs[tabs.length - 1];
  
  const [lat, lng] = survey.location.gpsCoordinates.split(',').map(Number);
  const farmLocation = !isNaN(lat) && !isNaN(lng) ? { lat, lng } : undefined;
  const rejectedFields = survey.verificationDetails?.rejectedFields || [];

  return (
    <div className="flex flex-col gap-6">
      
      <StatusInfo survey={survey} />

        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-xl">{survey.farmer.name} - {survey.id}</CardTitle>
                <CardDescription>{survey.location.village}, {survey.location.taluka}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="farmer-selection">शेतकरी</TabsTrigger>
                        <TabsTrigger value="farmer-info">माहिती</TabsTrigger>
                        <TabsTrigger value="farm-info">शेत</TabsTrigger>
                        <TabsTrigger value="media">मीडिया</TabsTrigger>
                        <TabsTrigger value="map">नकाशा</TabsTrigger>
                    </TabsList>
                
                    <TabsContent value="farmer-selection" className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReadOnlyInput label="राज्य" value={survey.location.state} />
                            <ReadOnlyInput label="जिल्हा" value={survey.location.district} />
                            <ReadOnlyInput label="तालुका" value={survey.location.taluka} />
                            <ReadOnlyInput label="सर्कल" value={survey.location.circle} />
                            <ReadOnlyInput label="गट" value={survey.location.gut} />
                            <ReadOnlyInput label="गाव" value={survey.location.village} />
                            <ReadOnlyInput label="शिवार" value={survey.location.shivar} />
                            <ReadOnlyInput label="सर्वेक्षण क्र." value={survey.location.surveyNumber} />
                            <ReadOnlyInput label="शेतकरी" value={survey.farmer.name} />
                            <ReadOnlyInput label="उत्पादक प्रकार" value={survey.farmer.growerType} />
                            <ReadOnlyInput label="सब नंबर" value={survey.farmer.sabNumber} isRejected={rejectedFields.includes('sabNumber')} />
                            <ReadOnlyInput label="खाता नंबर" value={survey.farmer.khataNumber} />
                        </div>
                    </TabsContent>

                    <TabsContent value="farmer-info" className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReadOnlyInput label="मोबाइल नंबर" value={survey.farmer.mobile} />
                            <ReadOnlyInput label="लिंक नंबर" value={survey.farmer.linkNumber} isRejected={rejectedFields.includes('linkNumber')} />
                            <ReadOnlyInput label="NAP नंबर" value={survey.farmer.napNumber} />
                            <ReadOnlyInput label="बँकेचे नाव" value={survey.farmer.bankName} />
                            <ReadOnlyInput label="शाखा" value={survey.farmer.branchName} />
                            <ReadOnlyInput label="खाते क्रमांक" value={survey.farmer.accountNumber} />
                            <ReadOnlyInput label="IFSC कोड" value={survey.farmer.ifsc} />
                        </div>
                    </TabsContent>

                    <TabsContent value="farm-info" className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <ReadOnlyInput label="क्षेत्र (हेक्टर)" value={survey.farm.area} />
                            <ReadOnlyInput label="लागवड तारीख" value={format(survey.farm.plantationDate, "PPP")} isRejected={rejectedFields.includes('plantationDate')} />
                            <ReadOnlyInput label="उसाची जात" value={survey.farm.caneVariety} />
                            <ReadOnlyInput label="उसाचा प्रकार" value={survey.farm.caneType} />
                            <ReadOnlyInput label="सिंचनाचा प्रकार" value={survey.farm.irrigationType} />
                            <ReadOnlyInput label="सिंचनाचा स्रोत" value={survey.farm.irrigationSource} />
                            <ReadOnlyInput label="सिंचन पद्धत" value={survey.farm.irrigationMethod} />
                            <ReadOnlyInput label="लागवड पद्धत" value={survey.farm.plantationMethod} />
                             <ReadOnlyInput label="उसाची पक्वता" value={survey.farm.caneMaturityDate ? format(survey.farm.caneMaturityDate, "PPP") : '-'} />
                            <ReadOnlyInput label="पूर्व" value={survey.farm.east} />
                            <ReadOnlyInput label="पश्चिम" value={survey.farm.west} />
                            <ReadOnlyInput label="उत्तर" value={survey.farm.north} />
                            <ReadOnlyInput label="दक्षिण" value={survey.farm.south} />
                        </div>
                    </TabsContent>

                    <TabsContent value="media" className="pt-6">
                        <div className="flex flex-col gap-6">
                            <div>
                                <Label className="text-base font-medium">शेताचे फोटो</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                    {survey.media.farmPhotos.map((photo, index) => (
                                        <MediaDisplayItem 
                                            key={index}
                                            id={`farm-photo-${index}`}
                                            label={survey.media.farmPhotoLabels[index]} 
                                            src={photo} 
                                            isRejected={rejectedFields.includes(`farm-photo-${index}`)} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                <MediaDisplayItem id="farmer-photo" label="शेतकरी फोटो" src={survey.media.farmerPhoto} isRejected={rejectedFields.includes('farmerPhoto')} />
                                <MediaDisplayItem id="field-boy-photo" label="फील्ड बॉय फोटो" src={survey.media.fieldBoyPhoto} isRejected={rejectedFields.includes('fieldBoyPhoto')} />
                                <MediaDisplayItem id="saat-baara-photo" label="७/१२ कागदपत्र" src={survey.media.saatBaaraPhoto} isRejected={rejectedFields.includes('saatBaaraPhoto')} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="grid gap-2">
                                    <Label>ऑडिओ नोट</Label>
                                    <audio src={survey.media.audioNote} controls className="w-full" />
                                </div>
                                 <div className="grid gap-4">
                                    <Label>इतर मीडिया</Label>
                                    {survey.media.otherMedia.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                                            <FileText className="h-5 w-5 text-muted-foreground"/>
                                            <span className="font-medium text-sm">{item.name}</span>
                                            <Button asChild variant="link" size="sm" className="ml-auto">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">पहा</a>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="map" className="pt-6">
                        <div className="flex flex-col gap-6">
                             <Card className={cn(rejectedFields.includes('fieldBoyLocation') && "border-red-500 ring-2 ring-red-500/50")}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="space-y-1.5">
                                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                                        <LocateFixed className="w-5 h-5 text-primary"/>
                                        तुमचे स्थान
                                    </CardTitle>
                                    {distance && (
                                        <CardDescription>
                                            शेतापासून अंदाजित अंतर: <strong>{distance}</strong>
                                        </CardDescription>
                                    )}
                                    </div>
                                    <Button variant="outline" size="icon" onClick={() => mapRef.current?.refreshLocation()}>
                                        <RefreshCcw className="h-4 w-4" />
                                        <span className="sr-only">Refresh Location</span>
                                    </Button>
                                </CardHeader>
                                <CardContent className="h-64 bg-muted rounded-b-lg">
                                    <FieldBoyMap 
                                        ref={mapRef} 
                                        showDistance 
                                        farmLocation={farmLocation}
                                        onDistanceChange={setDistance}
                                    />
                                </CardContent>
                            </Card>
                            <Card className={cn(rejectedFields.includes('farmBoundary') && "border-red-500 ring-2 ring-red-500/50")}>
                                <CardHeader>
                                    <CardTitle className="font-headline text-lg">शेताची सीमा</CardTitle>
                                </CardHeader>
                                <CardContent className="h-96">
                                    <FieldBoyMap farmLocation={farmLocation} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
             <CardFooter className="border-t pt-6 mt-6 flex justify-between items-center">
                 <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2" /> मागे
                 </Button>

                <div className="flex items-center gap-2">
                    {survey.status === 'Rejected' && (
                        <>
                            <Button variant="outline" asChild>
                               <Link href={`/field-boy/dashboard/new?edit=${survey.id}`}>
                                    <Edit className="mr-2"/> संपादित करा
                               </Link>
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                        <RefreshCcw className="mr-2"/> पुन्हा सुरू करा
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>तुम्ही निश्चित आहात का?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        एकदा तुम्ही पुन्हा सुरू केल्यावर, सर्व भरलेला डेटा (शेतकरी निवडीव्यतिरिक्त) कायमचा हटवला जाईल आणि पुनर्संचयित केला जाऊ शकत नाही. तुम्हाला खात्री आहे का?
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>रद्द करा</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleRestartSurvey}>पुष्टी करा</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
                    
                    {!isLastTab && (
                        <Button onClick={handleNext}>
                            पुढे <ArrowRight className="ml-2" />
                        </Button>
                    )}
                </div>

                 {(isLastTab && survey.status !== 'Rejected') && (
                     <Button variant="outline" asChild>
                        <Link href="/field-boy/dashboard">डॅशबोर्डवर परत जा</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    </div>
  );
}
