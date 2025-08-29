
"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CalendarClock, CheckCircle, XCircle, AlertCircle, ArrowLeft, ArrowRight, MessageSquare, Edit, Trash2, UserPlus, RefreshCcw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { format, addMonths } from 'date-fns';
import Image from 'next/image';
import FieldBoyMap from '@/components/field-boy-map';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

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

  return {
    id: surveyFromList.id,
    status: surveyFromList.status as SurveyStatus,
    daysLeft: surveyFromList.daysLeft,
    rejectionReason: surveyFromList.status === "Rejected" ? "अपूर्ण कागदपत्रे सादर केली." : "-",
    rejectionRemark: surveyFromList.status === 'Rejected' ? 'कृपया शेतकरी आणि ७/१२ कागदपत्रांचे फोटो पुन्हा अपलोड करा.' : null,
    rejectionAudioUrl: surveyFromList.status === 'Rejected' ? "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=" : null,
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
        east: "शेजारील शेत (Neighboring Farm)",
        west: "रस्ता (Road)",
        north: "ओढा (Stream)",
        south: "पडीक जमीन (Fallow Land)",
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {icon}
                        <div className="flex flex-col">
                            <CardTitle className={`text-lg ${textClass}`}>{label}</CardTitle>
                            {survey.status === 'Rejected' && <CardDescription className={`${textClass} opacity-80`}>{survey.rejectionReason}</CardDescription>}
                        </div>
                    </div>
                     {(survey.status === 'Pending' || survey.status === 'Assigned' || survey.status === 'Rejected') && survey.daysLeft !== undefined && (
                        <div className="flex items-center text-sm font-medium">
                            <CalendarClock className="h-4 w-4 mr-1.5"/>
                            <span>{survey.daysLeft} दिवस बाकी</span>
                        </div>
                    )}
                </div>
            </CardHeader>
            {survey.status === 'Rejected' && (
                 <CardContent>
                    <div className="space-y-4 rounded-lg bg-red-50/50 p-4 border border-red-200/50">
                        <h4 className="font-semibold flex items-center gap-2"><MessageSquare className="h-5 w-5"/> ओव्हरसीअरचा शेरा (Overseer's Remark)</h4>
                        {survey.rejectionRemark && <p className="text-sm">{survey.rejectionRemark}</p>}
                        {survey.rejectionAudioUrl && <audio src={survey.rejectionAudioUrl} controls className="w-full h-10" />}
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

const ReadOnlyInput = ({ label, value }: { label: string, value?: string | number | null }) => (
    <div className="grid gap-1.5">
        <Label className="text-muted-foreground text-sm">{label}</Label>
        <p className="font-medium text-base h-10 flex items-center px-3 rounded-md border bg-muted/50">{value || '-'}</p>
    </div>
);


export default function SurveyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [survey, setSurvey] = React.useState<SurveyData>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("farmer-selection");

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
                            <ReadOnlyInput label="सब नंबर" value={survey.farmer.sabNumber} />
                            <ReadOnlyInput label="खाता नंबर" value={survey.farmer.khataNumber} />
                        </div>
                    </TabsContent>

                    <TabsContent value="farmer-info" className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReadOnlyInput label="मोबाइल नंबर" value={survey.farmer.mobile} />
                            <ReadOnlyInput label="लिंक नंबर" value={survey.farmer.linkNumber} />
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
                            <ReadOnlyInput label="लागवड तारीख" value={format(survey.farm.plantationDate, "PPP")} />
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
                                        <div key={index} className="grid gap-2">
                                            <Label className="text-sm">{survey.media.farmPhotoLabels[index]}</Label>
                                            <Image src={photo} alt={survey.media.farmPhotoLabels[index]} width={400} height={300} className="rounded-lg border aspect-video object-cover" data-ai-hint="farm photo" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                <div className="grid gap-2">
                                    <Label>शेतकरी फोटो</Label>
                                    <Image src={survey.media.farmerPhoto} alt="Farmer Photo" width={400} height={300} className="rounded-lg border aspect-video object-cover" data-ai-hint="person photo" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>फील्ड बॉय फोटो</Label>
                                    <Image src={survey.media.fieldBoyPhoto} alt="Field Boy Photo" width={400} height={300} className="rounded-lg border aspect-video object-cover" data-ai-hint="person photo" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>७/१२ कागदपत्र</Label>
                                    <Image src={survey.media.saatBaaraPhoto} alt="7/12 Document" width={400} height={300} className="rounded-lg border aspect-video object-cover" data-ai-hint="document photo" />
                                </div>
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
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline text-lg">शेताची सीमा</CardTitle>
                                </CardHeader>
                                <CardContent className="h-96">
                                    <FieldBoyMap farmLocation={{lat: 18.4088, lng: 76.5702}} />
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
                                        ही क्रिया पूर्ववत करता येणार नाही. हे सर्वेक्षण हटवेल आणि तुम्हाला नवीन सर्वेक्षण सुरू करण्याची परवानगी देईल.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>रद्द करा</AlertDialogCancel>
                                    <AlertDialogAction>पुन्हा सुरू करा</AlertDialogAction>
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

    