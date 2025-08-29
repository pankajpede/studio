
"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Pin, Footprints, ChevronsUpDown, Check, UploadCloud, X, File as FileIcon, PlusCircle, MinusCircle, LocateFixed, RefreshCw, AudioLines, FileImage, User, Image as ImageIcon, Send, ShieldCheck, CalendarIcon, Loader2, MessageSquare, CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import FieldBoyMap from "@/components/field-boy-map"
import Image from "next/image"
import AudioRecorder from "@/components/audio-recorder"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { format, addMonths } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"


const mockStates = [
    { value: "maharashtra", label: "महाराष्ट्र" },
];

const mockDistricts = [
    { value: "latur", label: "लातूर" },
];

const mockTalukas = [
    { value: "ahmedpur", label: "अहमदपूर" },
];

const mockCircles = [
    { value: "circle-1", label: "सर्कल १" },
];

const mockGuts = [
    { value: "gut-101", label: "गट १०१" },
];

const mockVillages = [
    { value: "mohgaon", label: "मोहगाव" },
];

const mockShivars = [
    { value: "shivar-a", label: "शिवार अ" },
];

const mockSurveyNumbers = [
    { value: "sn-123", label: "SN-123" },
];

const mockFarmers = [
    { value: "farmer-1", label: "सचिन कुलकर्णी", mobile: "9876543210", docs: [{type: 'voter-id', number: 'ABC1234567'}], bankName: "स्टेट बँक ऑफ इंडिया", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-1234", ifsc: "SBIN0001234", sabNumber: "SAB-A001", khataNumber: "KH-112233" },
];

type OtherMedia = {
    id: number;
    name: string;
    file: File | null;
}

const FileUploadItem = ({ file, onRemove, name }: { file: File, onRemove: () => void, name?: string }) => (
    <div className="flex items-center justify-between p-2 mt-2 border rounded-md bg-muted/50">
        <div className="flex items-center gap-2 overflow-hidden">
            <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{name || file.name}</span>
                <span className="text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB</span>
            </div>
        </div>
        <Button size="icon" variant="ghost" className="h-6 w-6 flex-shrink-0" onClick={onRemove}>
            <X className="h-4 w-4" />
        </Button>
    </div>
);

const ReadOnlyInput = ({ label, value }: { label: string, value?: string | number | null }) => (
    <div className="grid gap-1.5">
        <Label className="text-muted-foreground text-sm">{label}</Label>
        <p className="font-medium text-base h-10 flex items-center px-3 rounded-md border bg-muted/50">{value || '-'}</p>
    </div>
);

const VerifiableInput = ({ 
    label, 
    value,
    status,
    onAccept,
    onReject
}: { 
    label: string;
    value?: string | number | null;
    status: VerificationStatus;
    onAccept: () => void;
    onReject: () => void;
}) => {
    return (
        <div className="grid gap-1.5">
            <Label className="text-muted-foreground text-sm">{label}</Label>
            <div className="flex items-center gap-2">
                <p className="flex-grow font-medium text-base h-10 flex items-center px-3 rounded-md border bg-muted/50">{value || '-'}</p>
                <Button 
                    variant={status === 'accepted' ? 'default' : 'outline'} 
                    size="icon" 
                    className={cn(
                        "h-10 w-10",
                        status === 'accepted' && "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                    )}
                    onClick={onAccept}
                >
                    <Check className="h-5 w-5" />
                </Button>
                <Button 
                    variant={status === 'rejected' ? 'destructive' : 'outline'} 
                    size="icon" 
                    className="h-10 w-10"
                    onClick={onReject}
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
};

const mediaStatusClasses: Record<VerificationStatus, string> = {
    pending: "border-muted-foreground/20",
    accepted: "border-green-500",
    rejected: "border-red-500",
}
const mediaStatusIcon: Record<VerificationStatus, React.ReactNode> = {
    pending: null,
    accepted: <CheckCircle className="h-5 w-5 text-white bg-green-500 rounded-full p-0.5" />,
    rejected: <XCircle className="h-5 w-5 text-white bg-red-500 rounded-full p-0.5" />,
}

const VerifiableMediaItem = ({
    label,
    src,
    type,
    status,
    onClick,
}: {
    label: string;
    src: string;
    type: 'image' | 'audio' | 'other';
    status: VerificationStatus;
    onClick: () => void;
}) => {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <div 
                className={cn(
                    "relative w-full aspect-video rounded-lg overflow-hidden border-2 cursor-pointer group",
                    mediaStatusClasses[status]
                )}
                onClick={onClick}
            >
                {type === 'image' ? (
                     <Image src={src} alt={label} layout="fill" objectFit="cover" data-ai-hint="photo image" />
                ) : (
                    <div className="h-full w-full bg-muted/50 flex flex-col items-center justify-center p-4 text-center">
                        {type === 'audio' ? <AudioLines className="h-10 w-10 text-muted-foreground" /> : <FileImage className="h-10 w-10 text-muted-foreground" />}
                        <p className="text-xs mt-2 text-muted-foreground">पाहण्यासाठी क्लिक करा</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-1.5 right-1.5">
                    {mediaStatusIcon[status]}
                </div>
            </div>
        </div>
    )
}

const Combobox = ({
    options,
    value,
    onValueChange,
    placeholder,
    searchPlaceholder,
    disabled = false,
}: {
    options: { value: string; label: string }[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    searchPlaceholder: string;
    disabled?: boolean;
}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={disabled}
                >
                    <span className="truncate">
                        {value ? options.find((option) => option.value === value)?.label : placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandEmpty>कोणतेही परिणाम आढळले नाहीत.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        onValueChange(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

type VerificationStatus = 'pending' | 'accepted' | 'rejected';

export default function SurveyReviewPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const { toast } = useToast();
    const [activeTab, setActiveTab] = React.useState("farmer-selection");
    const mapRef = React.useRef<{ refreshLocation: () => void }>(null);


    // State for each form field - pre-filled with mock data
    const [selectedState, setSelectedState] = React.useState("maharashtra");
    const [district, setDistrict] = React.useState("latur");
    const [taluka, setTaluka] = React.useState("ahmedpur");
    const [circle, setCircle] = React.useState("circle-1");
    const [gut, setGut] = React.useState("gut-101");
    const [village, setVillage] = React.useState("mohgaon");
    const [shivar, setShivar] = React.useState("shivar-a");
    const [surveyNumber, setSurveyNumber] = React.useState("sn-123");
    const [partyName, setPartyName] = React.useState("farmer-1");
    
    // State for review modal
    const [isFinalReviewModalOpen, setIsFinalReviewModalOpen] = React.useState(false);
    const [finalModalAction, setFinalModalAction] = React.useState<'approve' | 'reject' | null>(null);
    const [remark, setRemark] = React.useState("");
    const [reviewAudio, setReviewAudio] = React.useState<File | null>(null);
    
    // State for media modal
    const [isMediaModalOpen, setIsMediaModalOpen] = React.useState(false);
    const [currentMedia, setCurrentMedia] = React.useState<{id: string; label: string; src: string; type: 'image' | 'audio' | 'other'} | null>(null);
    
    const [verificationStatus, setVerificationStatus] = React.useState({
        sabNumber: 'pending' as VerificationStatus,
        khataNumber: 'pending' as VerificationStatus,
        mobileNumber: 'pending' as VerificationStatus,
        linkNumber: 'pending' as VerificationStatus,
        napNumber: 'pending' as VerificationStatus,
        area: 'pending' as VerificationStatus,
        plantationDate: 'pending' as VerificationStatus,
        caneVariety: 'pending' as VerificationStatus,
        caneType: 'pending' as VerificationStatus,
        irrigationType: 'pending' as VerificationStatus,
        irrigationSource: 'pending' as VerificationStatus,
        irrigationMethod: 'pending' as VerificationStatus,
        plantationMethod: 'pending' as VerificationStatus,
        fieldBoyLocation: 'pending' as VerificationStatus,
        farmBoundary: 'pending' as VerificationStatus,
    });
    
    const initialMediaStatus = {
        'farm-photo-0': 'pending', 'farm-photo-1': 'pending', 'farm-photo-2': 'pending', 'farm-photo-3': 'pending',
        'farmer-photo': 'pending', 'field-boy-photo': 'pending', 'saat-baara-photo': 'pending', 'audio-note': 'pending', 'other-media-0': 'pending'
    }
    const [mediaVerification, setMediaVerification] = React.useState<Record<string, VerificationStatus>>(initialMediaStatus);

    const tabs = ["farmer-selection", "farmer-info", "farm-info", "media", "map"];

    const toggleVerification = (field: keyof typeof verificationStatus, type: 'accept' | 'reject') => {
         const currentStatus = verificationStatus[field];
         const targetStatus = type === 'accept' ? 'accepted' : 'rejected';
         setVerificationStatus(prev => ({
             ...prev,
             [field]: currentStatus === targetStatus ? 'pending' : targetStatus
         }))
    }

    const allVerificationFields = {...verificationStatus, ...mediaVerification};
    const totalFields = Object.keys(allVerificationFields).length;
    const acceptedCount = Object.values(allVerificationFields).filter(s => s === 'accepted').length;
    const rejectedCount = Object.values(allVerificationFields).filter(s => s === 'rejected').length;

    const handleOpenFinalModal = (action: 'approve' | 'reject') => {
        setFinalModalAction(action);
        setIsFinalReviewModalOpen(true);
    };

    const handleFinalSubmit = () => {
        if (!finalModalAction) return;

        toast({
            title: `सर्वेक्षण ${finalModalAction === 'approve' ? 'मंजूर' : 'नाकारले'}!`,
            description: `शेती सर्वेक्षण यशस्वीरित्या ${finalModalAction === 'approve' ? 'मंजूर' : 'नाकारले'} आहे.`,
        });
        setIsFinalReviewModalOpen(false);
        setRemark("");
        setReviewAudio(null);
        setFinalModalAction(null);
        router.push('/oversheer/dashboard');
    }
    
    const handleOpenMediaModal = (media: {id: string; label: string; src: string; type: 'image' | 'audio' | 'other'}) => {
        setCurrentMedia(media);
        setIsMediaModalOpen(true);
    }
    
    const handleMediaVerification = (status: VerificationStatus) => {
        if(currentMedia) {
            setMediaVerification(prev => ({...prev, [currentMedia.id]: status}));
            setIsMediaModalOpen(false);
            setCurrentMedia(null);
        }
    }

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
        }
    };
    
    const selectedFarmer = mockFarmers.find(f => f.value === partyName);
    
    const farmPhotoLabels = ["शेताचे फोटो", "उसाची जात", "मातीचा प्रकार", "सिंचनाचा प्रकार"];
    
    const isFirstTab = activeTab === tabs[0];
    const isLastTab = activeTab === tabs[tabs.length - 1];


  return (
    <>
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        {selectedFarmer ? (
          <>
            <CardTitle className="font-headline text-xl">{selectedFarmer.label} - {id}</CardTitle>
            <div className="flex items-center justify-between">
                <CardDescription>फील्ड बॉय: सुनील पवार</CardDescription>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-base">{acceptedCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-bold text-base">{rejectedCount}</span>
                    </div>
                    {rejectedCount > 0 ? (
                        <Button size="sm" onClick={() => handleOpenFinalModal('reject')}>
                            <X className="mr-2 h-4 w-4"/> नाकारा
                        </Button>
                    ) : acceptedCount === totalFields ? (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenFinalModal('approve')}>
                            <Check className="mr-2 h-4 w-4"/> मंजूर करा
                        </Button>
                    ) : null}
                </div>
            </div>
          </>
        ) : (
          <>
            <CardTitle className="font-headline text-xl">शेती सर्वेक्षण तपशील</CardTitle>
            <CardDescription>फील्ड बॉयने सबमिट केलेल्या सर्वेक्षणाचे पुनरावलोकन करा.</CardDescription>
          </>
        )}
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
                <ReadOnlyInput label="राज्य" value="महाराष्ट्र" />
                <ReadOnlyInput label="जिल्हा" value="लातूर" />
                <ReadOnlyInput label="तालुका" value="अहमदपूर" />
                <ReadOnlyInput label="सर्कल" value="सर्कल १" />
                <ReadOnlyInput label="गट" value="गट १०१" />
                <ReadOnlyInput label="गाव" value="मोहगाव" />
                <ReadOnlyInput label="शिवार" value="शिवार अ" />
                <ReadOnlyInput label="सर्वेक्षण क्र." value="SN-123" />
                <ReadOnlyInput label="शेतकरी" value="सचिन कुलकर्णी" />
                <ReadOnlyInput label="उत्पादक प्रकार" value="सभासद" />
                <VerifiableInput 
                    label="सब नंबर" 
                    value="SAB-A001" 
                    status={verificationStatus.sabNumber}
                    onAccept={() => toggleVerification('sabNumber', 'accept')}
                    onReject={() => toggleVerification('sabNumber', 'reject')}
                />
                <VerifiableInput 
                    label="खाता नंबर" 
                    value="KH-112233" 
                    status={verificationStatus.khataNumber}
                    onAccept={() => toggleVerification('khataNumber', 'accept')}
                    onReject={() => toggleVerification('khataNumber', 'reject')}
                />
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <VerifiableInput 
                    label="मोबाइल नंबर" 
                    value="9876543210" 
                    status={verificationStatus.mobileNumber}
                    onAccept={() => toggleVerification('mobileNumber', 'accept')}
                    onReject={() => toggleVerification('mobileNumber', 'reject')}
                />
                 <VerifiableInput 
                    label="लिंक नंबर" 
                    value="LNK-54321" 
                    status={verificationStatus.linkNumber}
                    onAccept={() => toggleVerification('linkNumber', 'accept')}
                    onReject={() => toggleVerification('linkNumber', 'reject')}
                />
                 <VerifiableInput 
                    label="NAP नंबर" 
                    value="NAP-98765" 
                    status={verificationStatus.napNumber}
                    onAccept={() => toggleVerification('napNumber', 'accept')}
                    onReject={() => toggleVerification('napNumber', 'reject')}
                />
                <ReadOnlyInput label="बँकेचे नाव" value="स्टेट बँक ऑफ इंडिया" />
                <ReadOnlyInput label="शाखा" value="लातूर शाखा" />
                <ReadOnlyInput label="खाते क्रमांक" value="XXXX-XXXX-1234" />
                <ReadOnlyInput label="IFSC कोड" value="SBIN0001234" />
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VerifiableInput 
                    label="क्षेत्र (हेक्टर)" 
                    value="1.0" 
                    status={verificationStatus.area}
                    onAccept={() => toggleVerification('area', 'accept')}
                    onReject={() => toggleVerification('area', 'reject')}
                />
                <VerifiableInput 
                    label="लागवड तारीख" 
                    value={format(new Date('2023-08-12'), "PPP")} 
                    status={verificationStatus.plantationDate}
                    onAccept={() => toggleVerification('plantationDate', 'accept')}
                    onReject={() => toggleVerification('plantationDate', 'reject')}
                />
                <VerifiableInput 
                    label="उसाची जात" 
                    value="जात १" 
                    status={verificationStatus.caneVariety}
                    onAccept={() => toggleVerification('caneVariety', 'accept')}
                    onReject={() => toggleVerification('caneVariety', 'reject')}
                />
                <VerifiableInput 
                    label="उसाचा प्रकार" 
                    value="प्रकार १ (12 महिने)" 
                    status={verificationStatus.caneType}
                    onAccept={() => toggleVerification('caneType', 'accept')}
                    onReject={() => toggleVerification('caneType', 'reject')}
                />
                <ReadOnlyInput label="उसाची पक्वता" value={format(addMonths(new Date('2023-08-12'), 12), "PPP")} />
                <VerifiableInput 
                    label="सिंचनाचा प्रकार" 
                    value="ठिबक" 
                    status={verificationStatus.irrigationType}
                    onAccept={() => toggleVerification('irrigationType', 'accept')}
                    onReject={() => toggleVerification('irrigationType', 'reject')}
                />
                <VerifiableInput 
                    label="सिंचनाचा स्रोत" 
                    value="विहीर" 
                    status={verificationStatus.irrigationSource}
                    onAccept={() => toggleVerification('irrigationSource', 'accept')}
                    onReject={() => toggleVerification('irrigationSource', 'reject')}
                />
                <VerifiableInput 
                    label="सिंचन पद्धत" 
                    value="पद्धत १" 
                    status={verificationStatus.irrigationMethod}
                    onAccept={() => toggleVerification('irrigationMethod', 'accept')}
                    onReject={() => toggleVerification('irrigationMethod', 'reject')}
                />
                <VerifiableInput 
                    label="लागवड पद्धत" 
                    value="पद्धत अ" 
                    status={verificationStatus.plantationMethod}
                    onAccept={() => toggleVerification('plantationMethod', 'accept')}
                    onReject={() => toggleVerification('plantationMethod', 'reject')}
                />
                <ReadOnlyInput label="पूर्व" value="शेजारील शेत" />
                <ReadOnlyInput label="पश्चिम" value="रस्ता" />
                <ReadOnlyInput label="उत्तर" value="ओढा" />
                <ReadOnlyInput label="दक्षिण" value="पडीक जमीन" />
            </div>
          </TabsContent>

           <TabsContent value="media" className="pt-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <Label className="text-base font-medium">शेताचे फोटो</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {farmPhotoLabels.map((label, index) => {
                                const mediaId = `farm-photo-${index}`;
                                return (
                                    <VerifiableMediaItem 
                                        key={mediaId} 
                                        label={label} 
                                        src={`https://placehold.co/400x300.png?text=${index+1}`} 
                                        type="image" 
                                        status={mediaVerification[mediaId]}
                                        onClick={() => handleOpenMediaModal({id: mediaId, label, src: `https://placehold.co/800x600.png?text=${index+1}`, type: 'image'})}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                        <VerifiableMediaItem 
                            label="शेतकरी फोटो"
                            src="https://placehold.co/400x300.png"
                            type="image"
                            status={mediaVerification['farmer-photo']}
                            onClick={() => handleOpenMediaModal({id: 'farmer-photo', label: 'शेतकरी फोटो', src: 'https://placehold.co/800x600.png', type: 'image'})}
                        />
                         <VerifiableMediaItem 
                            label="फील्ड बॉय फोटो"
                            src="https://placehold.co/400x300.png"
                            type="image"
                            status={mediaVerification['field-boy-photo']}
                            onClick={() => handleOpenMediaModal({id: 'field-boy-photo', label: 'फील्ड बॉय फोटो', src: 'https://placehold.co/800x600.png', type: 'image'})}
                        />
                         <VerifiableMediaItem 
                            label="७/१२ कागदपत्र"
                            src="https://placehold.co/400x300.png"
                            type="image"
                            status={mediaVerification['saat-baara-photo']}
                            onClick={() => handleOpenMediaModal({id: 'saat-baara-photo', label: '७/१२ कागदपत्र', src: 'https://placehold.co/600x800.png', type: 'image'})}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <VerifiableMediaItem 
                            label="ऑडिओ नोट"
                            src="data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA="
                            type="audio"
                            status={mediaVerification['audio-note']}
                            onClick={() => handleOpenMediaModal({id: 'audio-note', label: 'ऑडिओ नोट', src: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=', type: 'audio'})}
                        />
                        <VerifiableMediaItem 
                            label="इतर मीडिया (नोंदणी)"
                            src="https://placehold.co/200x100.png"
                            type="other"
                            status={mediaVerification['other-media-0']}
                            onClick={() => handleOpenMediaModal({id: 'other-media-0', label: 'इतर मीडिया (नोंदणी)', src: 'https://placehold.co/800x400.png', type: 'image'})}
                        />
                    </div>
                </div>
            </TabsContent>

          <TabsContent value="map" className="pt-6">
             <div className="flex flex-col gap-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="space-y-1.5">
                           <CardTitle className="font-headline text-lg flex items-center gap-2">
                                <LocateFixed className="w-5 h-5 text-primary"/>
                                फील्ड बॉयचे स्थान
                            </CardTitle>
                             <CardDescription>
                                शेतापासून अंदाजित अंतर: <strong>0.2 km</strong>
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant={verificationStatus.fieldBoyLocation === 'accepted' ? 'default' : 'outline'} 
                                size="icon" 
                                className={cn(
                                    "h-8 w-8",
                                    verificationStatus.fieldBoyLocation === 'accepted' && "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                                )}
                                onClick={() => toggleVerification('fieldBoyLocation', 'accept')}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant={verificationStatus.fieldBoyLocation === 'rejected' ? 'destructive' : 'outline'} 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => toggleVerification('fieldBoyLocation', 'reject')}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => mapRef.current?.refreshLocation()} className="h-8 w-8">
                                <RefreshCw className="h-4 w-4" />
                                <span className="sr-only">Refresh Location</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="h-64 bg-muted rounded-b-lg">
                        <FieldBoyMap ref={mapRef} showDistance />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline text-lg">शेताची सीमा</CardTitle>
                            <CardDescription>नोंदलेले क्षेत्र: 0.95 हेक्टर (फरक: -0.05 हेक्टर)</CardDescription>
                        </div>
                         <div className="flex items-center gap-2">
                            <Button 
                                variant={verificationStatus.farmBoundary === 'accepted' ? 'default' : 'outline'} 
                                size="icon" 
                                className={cn(
                                    "h-8 w-8",
                                    verificationStatus.farmBoundary === 'accepted' && "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                                )}
                                onClick={() => toggleVerification('farmBoundary', 'accept')}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant={verificationStatus.farmBoundary === 'rejected' ? 'destructive' : 'outline'} 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => toggleVerification('farmBoundary', 'reject')}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                             <Button variant="outline" size="icon" onClick={() => mapRef.current?.refreshLocation()} className="h-8 w-8">
                                <RefreshCw className="h-4 w-4" />
                                <span className="sr-only">Refresh Boundary</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="h-96">
                       <FieldBoyMap />
                    </CardContent>
                </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-6 mt-6 flex justify-between items-center">
            {isFirstTab ? (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="outline"><ArrowLeft className="mr-2" /> मागे</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>तुम्ही निश्चित आहात का?</AlertDialogTitle>
                            <AlertDialogDescription>
                                तुम्ही पुनरावलोकनातून बाहेर पडल्यास, तुम्ही केलेले कोणतेही बदल जतन होणार नाहीत. तुम्हाला खात्री आहे का?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>रद्द करा</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.push('/oversheer/dashboard')}>पुष्टी करा</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2" /> मागे
                </Button>
            )}
            
            {isLastTab ? (
                 <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handleOpenFinalModal('reject')} className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                        <XCircle className="mr-2" /> नाकारा
                    </Button>
                    <Button onClick={() => handleOpenFinalModal('approve')} className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="mr-2" /> मंजूर करा
                    </Button>
                </div>
            ) : (
                 <Button onClick={handleNext}>
                    पुढे <ArrowRight className="ml-2" />
                </Button>
            )}
        </CardFooter>
    </Card>
    
    <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>{currentMedia?.label}</DialogTitle>
            </DialogHeader>
            <div className="py-4 flex items-center justify-center bg-muted/50 rounded-md">
                 {currentMedia?.type === 'image' && currentMedia.src && (
                    <Image src={currentMedia.src} alt={currentMedia.label} width={800} height={600} className="max-h-[60vh] w-auto object-contain" />
                 )}
                 {currentMedia?.type === 'audio' && currentMedia.src && (
                    <audio src={currentMedia.src} controls autoPlay className="w-full" />
                 )}
                 {currentMedia?.type === 'other' && (
                     <div className="text-center p-8">
                         <p className="text-muted-foreground">या प्रकारच्या मीडियासाठी पूर्वावलोकन उपलब्ध नाही.</p>
                         <Button asChild variant="link" className="mt-2">
                             <a href={currentMedia.src} target="_blank" rel="noopener noreferrer">नवीन टॅबमध्ये उघडा</a>
                         </Button>
                     </div>
                 )}
            </div>
            {(currentMedia?.type === 'image') && (
                <DialogFooter>
                    <Button variant="outline" onClick={() => handleMediaVerification('rejected')} className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                        <XCircle className="mr-2" /> नाकारा
                    </Button>
                    <Button onClick={() => handleMediaVerification('accepted')} className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="mr-2" /> स्वीकारा
                    </Button>
                </DialogFooter>
            )}
        </DialogContent>
    </Dialog>

    <Dialog open={isFinalReviewModalOpen} onOpenChange={setIsFinalReviewModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {finalModalAction === 'approve' ? 'सर्वेक्षण मंजूर करा' : 'सर्वेक्षण नाकारा'}
                </DialogTitle>
                <DialogDescription>
                  {finalModalAction === 'approve' ? 'हे सर्वेक्षण मंजूर करण्यापूर्वी तुम्ही कोणताही अतिरिक्त शेरा जोडू शकता.' : 'कृपया हे सर्वेक्षण नाकारण्याचे कारण द्या.'}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="remark">शेरा</Label>
                    <Textarea 
                        id="remark" 
                        placeholder="तुमचा शेरा येथे लिहा..." 
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="audio-review" className="flex items-center gap-2"><AudioLines /> ऑडिओ शेरा</Label>
                    <AudioRecorder onRecordingComplete={(file) => setReviewAudio(file)} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">रद्द करा</Button>
                </DialogClose>
                <Button onClick={handleFinalSubmit}>
                    {finalModalAction === 'approve' ? 'मंजुरीची पुष्टी करा' : 'नकारची पुष्टी करा'}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
