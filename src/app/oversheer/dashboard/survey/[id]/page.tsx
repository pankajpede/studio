
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
    { value: "maharashtra", label: "Maharashtra" },
];

const mockDistricts = [
    { value: "latur", label: "Latur" },
];

const mockTalukas = [
    { value: "ahmedpur", label: "Ahmedpur" },
];

const mockCircles = [
    { value: "circle-1", label: "Circle 1" },
];

const mockGuts = [
    { value: "gut-101", label: "Gut 101" },
];

const mockVillages = [
    { value: "mohgaon", label: "Mohgaon" },
];

const mockShivars = [
    { value: "shivar-a", label: "Shivar A" },
];

const mockSurveyNumbers = [
    { value: "sn-123", label: "SN-123" },
];

const mockFarmers = [
    { value: "farmer-1", label: "Sachin Kulkarni", mobile: "9876543210", docs: [{type: 'voter-id', number: 'ABC1234567'}], bankName: "State Bank of India", branchName: "Latur Branch", accountNumber: "XXXX-XXXX-1234", ifsc: "SBIN0001234", sabNumber: "SAB-A001", khataNumber: "KH-112233" },
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
                        <p className="text-xs mt-2 text-muted-foreground">Click to view</p>
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
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandEmpty>No results found.</CommandEmpty>
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
    const [currentMediaStatus, setCurrentMediaStatus] = React.useState<VerificationStatus>('pending');
    
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
        'farmer-photo': 'pending', 'field-boy-photo': 'pending', 'saat-baara-photo': 'pending'
    }
    const [mediaVerification, setMediaVerification] = React.useState<Record<string, VerificationStatus>>(initialMediaStatus);
    const [otherMediaVerification, setOtherMediaVerification] = React.useState<Record<string, VerificationStatus>>({});

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
            title: `Survey ${finalModalAction === 'approve' ? 'Approved' : 'Rejected'}!`,
            description: `The farm survey has been successfully ${finalModalAction === 'approve' ? 'approved' : 'rejected'}.`,
        });
        setIsFinalReviewModalOpen(false);
        setRemark("");
        setReviewAudio(null);
        setFinalModalAction(null);
        router.push('/oversheer/dashboard');
    }
    
    const handleOpenMediaModal = (media: {id: string; label: string; src: string; type: 'image' | 'audio' | 'other'}) => {
        let status: VerificationStatus = 'pending';
        if(media.id in mediaVerification) {
            status = mediaVerification[media.id];
        } else if (media.id in otherMediaVerification) {
            status = otherMediaVerification[media.id];
        }
        setCurrentMediaStatus(status);
        setCurrentMedia(media);
        setIsMediaModalOpen(true);
    }
    
    const handleMediaVerification = (status: VerificationStatus) => {
        if(currentMedia) {
            const currentId = currentMedia.id;
            const newStatus = currentMediaStatus === status ? 'pending' : status;

            if(currentId in mediaVerification){
                 setMediaVerification(prev => ({...prev, [currentId]: newStatus}));
            } else {
                 setOtherMediaVerification(prev => ({...prev, [currentId]: newStatus}));
            }
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
    
    const farmPhotoLabels = ["Farm Photo", "Cane Variety", "Soil Type", "Irrigation Type"];
    
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
                <CardDescription>Field Boy: Sunil Pawar</CardDescription>
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
                        <Button variant="destructive" size="sm" onClick={() => handleOpenFinalModal('reject')}>
                            <X className="mr-2 h-4 w-4"/> Reject
                        </Button>
                    ) : acceptedCount === totalFields ? (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenFinalModal('approve')}>
                            <Check className="mr-2 h-4 w-4"/> Approve
                        </Button>
                    ) : null}
                </div>
            </div>
          </>
        ) : (
          <>
            <CardTitle className="font-headline text-xl">Farm Survey Details</CardTitle>
            <CardDescription>Review the survey submitted by the field boy.</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="farmer-selection">Farmer</TabsTrigger>
            <TabsTrigger value="farmer-info">Information</TabsTrigger>
            <TabsTrigger value="farm-info">Farm</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmer-selection" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReadOnlyInput label="State" value="Maharashtra" />
                <ReadOnlyInput label="District" value="Latur" />
                <ReadOnlyInput label="Taluka" value="Ahmedpur" />
                <ReadOnlyInput label="Circle" value="Circle 1" />
                <ReadOnlyInput label="Gut" value="Gut 101" />
                <ReadOnlyInput label="Village" value="Mohgaon" />
                <ReadOnlyInput label="Shivar" value="Shivar A" />
                <ReadOnlyInput label="Survey No." value="SN-123" />
                <ReadOnlyInput label="Farmer" value="Sachin Kulkarni" />
                <ReadOnlyInput label="Grower Type" value="Member" />
                <VerifiableInput 
                    label="Sab Number" 
                    value="SAB-A001" 
                    status={verificationStatus.sabNumber}
                    onAccept={() => toggleVerification('sabNumber', 'accept')}
                    onReject={() => toggleVerification('sabNumber', 'reject')}
                />
                <VerifiableInput 
                    label="Khata Number" 
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
                    label="Mobile Number" 
                    value="9876543210" 
                    status={verificationStatus.mobileNumber}
                    onAccept={() => toggleVerification('mobileNumber', 'accept')}
                    onReject={() => toggleVerification('mobileNumber', 'reject')}
                />
                 <VerifiableInput 
                    label="Link Number" 
                    value="LNK-54321" 
                    status={verificationStatus.linkNumber}
                    onAccept={() => toggleVerification('linkNumber', 'accept')}
                    onReject={() => toggleVerification('linkNumber', 'reject')}
                />
                 <VerifiableInput 
                    label="NAP Number" 
                    value="NAP-98765" 
                    status={verificationStatus.napNumber}
                    onAccept={() => toggleVerification('napNumber', 'accept')}
                    onReject={() => toggleVerification('napNumber', 'reject')}
                />
                <ReadOnlyInput label="Bank Name" value="State Bank of India" />
                <ReadOnlyInput label="Branch" value="Latur Branch" />
                <ReadOnlyInput label="Account Number" value="XXXX-XXXX-1234" />
                <ReadOnlyInput label="IFSC Code" value="SBIN0001234" />
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VerifiableInput 
                    label="Area (Hectare)" 
                    value="1.0" 
                    status={verificationStatus.area}
                    onAccept={() => toggleVerification('area', 'accept')}
                    onReject={() => toggleVerification('area', 'reject')}
                />
                <VerifiableInput 
                    label="Plantation Date" 
                    value={format(new Date('2023-08-12'), "PPP")} 
                    status={verificationStatus.plantationDate}
                    onAccept={() => toggleVerification('plantationDate', 'accept')}
                    onReject={() => toggleVerification('plantationDate', 'reject')}
                />
                <VerifiableInput 
                    label="Cane Variety" 
                    value="Variety 1" 
                    status={verificationStatus.caneVariety}
                    onAccept={() => toggleVerification('caneVariety', 'accept')}
                    onReject={() => toggleVerification('caneVariety', 'reject')}
                />
                <VerifiableInput 
                    label="Cane Type" 
                    value="Type 1 (12 months)" 
                    status={verificationStatus.caneType}
                    onAccept={() => toggleVerification('caneType', 'accept')}
                    onReject={() => toggleVerification('caneType', 'reject')}
                />
                <ReadOnlyInput label="Cane Maturity" value={format(addMonths(new Date('2023-08-12'), 12), "PPP")} />
                <VerifiableInput 
                    label="Irrigation Type" 
                    value="Drip" 
                    status={verificationStatus.irrigationType}
                    onAccept={() => toggleVerification('irrigationType', 'accept')}
                    onReject={() => toggleVerification('irrigationType', 'reject')}
                />
                <VerifiableInput 
                    label="Irrigation Source" 
                    value="Well" 
                    status={verificationStatus.irrigationSource}
                    onAccept={() => toggleVerification('irrigationSource', 'accept')}
                    onReject={() => toggleVerification('irrigationSource', 'reject')}
                />
                <VerifiableInput 
                    label="Irrigation Method" 
                    value="Method 1" 
                    status={verificationStatus.irrigationMethod}
                    onAccept={() => toggleVerification('irrigationMethod', 'accept')}
                    onReject={() => toggleVerification('irrigationMethod', 'reject')}
                />
                <VerifiableInput 
                    label="Plantation Method" 
                    value="Method A" 
                    status={verificationStatus.plantationMethod}
                    onAccept={() => toggleVerification('plantationMethod', 'accept')}
                    onReject={() => toggleVerification('plantationMethod', 'reject')}
                />
                <ReadOnlyInput label="East" value="Neighboring Farm" />
                <ReadOnlyInput label="West" value="Road" />
                <ReadOnlyInput label="North" value="Stream" />
                <ReadOnlyInput label="South" value="Fallow Land" />
            </div>
          </TabsContent>

           <TabsContent value="media" className="pt-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <Label className="text-base font-medium">Farm Photos</Label>
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
                            label="Farmer Photo"
                            src="https://placehold.co/400x300.png"
                            type="image"
                            status={mediaVerification['farmer-photo']}
                            onClick={() => handleOpenMediaModal({id: 'farmer-photo', label: 'Farmer Photo', src: 'https://placehold.co/800x600.png', type: 'image'})}
                        />
                         <VerifiableMediaItem 
                            label="Field Boy Photo"
                            src="https://placehold.co/400x300.png"
                            type="image"
                            status={mediaVerification['field-boy-photo']}
                            onClick={() => handleOpenMediaModal({id: 'field-boy-photo', label: 'Field Boy Photo', src: 'https://placehold.co/800x600.png', type: 'image'})}
                        />
                         <VerifiableMediaItem 
                            label="7/12 Document"
                            src="https://placehold.co/400x300.png"
                            type="image"
                            status={mediaVerification['saat-baara-photo']}
                            onClick={() => handleOpenMediaModal({id: 'saat-baara-photo', label: '7/12 Document', src: 'https://placehold.co/600x800.png', type: 'image'})}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <VerifiableMediaItem 
                            label="Audio Note"
                            src="data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA="
                            type="audio"
                            status={otherMediaVerification['audio-note'] || 'pending'}
                            onClick={() => handleOpenMediaModal({id: 'audio-note', label: 'Audio Note', src: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=', type: 'audio'})}
                        />
                        <VerifiableMediaItem 
                            label="Other Media (Registration)"
                            src="https://placehold.co/200x100.png"
                            type="other"
                            status={otherMediaVerification['other-media-0'] || 'pending'}
                            onClick={() => handleOpenMediaModal({id: 'other-media-0', label: 'Other Media (Registration)', src: 'https://placehold.co/800x400.png', type: 'image'})}
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
                                Field Boy Location
                            </CardTitle>
                             <CardDescription>
                                Estimated distance from farm: <strong>0.2 km</strong>
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
                            <CardTitle className="font-headline text-lg">Farm Boundary</CardTitle>
                            <CardDescription>Registered area: 0.95 Ha (Difference: -0.05 Ha)</CardDescription>
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
                         <Button variant="outline"><ArrowLeft className="mr-2" /> Back</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                If you leave the review, any changes you made will not be saved. Are you sure?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.push('/oversheer/dashboard')}>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2" /> Back
                </Button>
            )}
            
            {!isLastTab && (
                 <Button onClick={handleNext}>
                    Next <ArrowRight className="ml-2" />
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
                         <p className="text-muted-foreground">Preview not available for this media type.</p>
                         <Button asChild variant="link" className="mt-2">
                             <a href={currentMedia.src} target="_blank" rel="noopener noreferrer">Open in new tab</a>
                         </Button>
                     </div>
                 )}
            </div>
            <DialogFooter>
                <Button variant={currentMediaStatus === 'rejected' ? 'destructive' : 'outline'} onClick={() => handleMediaVerification('rejected')} className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <XCircle className="mr-2" /> Reject
                </Button>
                <Button onClick={() => handleMediaVerification('accepted')} className={cn(
                    currentMediaStatus === 'accepted' ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700',
                    'text-white'
                )}>
                    <CheckCircle className="mr-2" /> Accept
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <Dialog open={isFinalReviewModalOpen} onOpenChange={setIsFinalReviewModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {finalModalAction === 'approve' ? 'Approve Survey' : 'Reject Survey'}
                </DialogTitle>
                <DialogDescription>
                  {finalModalAction === 'approve' ? 'You can add an optional remark before approving this survey.' : 'Please provide a reason for rejecting this survey.'}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="remark">Remark</Label>
                    <Textarea 
                        id="remark" 
                        placeholder="Write your remark here..." 
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="audio-review" className="flex items-center gap-2"><AudioLines /> Audio Remark</Label>
                    <AudioRecorder onRecordingComplete={(file) => setReviewAudio(file)} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button onClick={handleFinalSubmit}>
                    {finalModalAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
