
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

const VerifiableInput = ({ label, value }: { label: string, value?: string | number | null }) => {
    const [status, setStatus] = React.useState<'pending' | 'accepted' | 'rejected'>('pending');

    const handleAccept = () => setStatus(prev => prev === 'accepted' ? 'pending' : 'accepted');
    const handleReject = () => setStatus(prev => prev === 'rejected' ? 'pending' : 'rejected');

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
                    onClick={handleAccept}
                >
                    <Check className="h-5 w-5" />
                </Button>
                <Button 
                    variant={status === 'rejected' ? 'destructive' : 'outline'} 
                    size="icon" 
                    className="h-10 w-10"
                    onClick={handleReject}
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
};


const ImageUploader = ({
    id,
    label,
    onFileChange,
    file,
    capture,
    isReadOnly = false,
    imageUrl
}: {
    id: string;
    label: string;
    onFileChange: (file: File | null) => void;
    file: File | null;
    capture?: 'user' | 'environment';
    isReadOnly?: boolean;
    imageUrl?: string;
}) => {
    const previewUrl = React.useMemo(() => {
        if (file) return URL.createObjectURL(file);
        if (imageUrl) return imageUrl;
        return null;
    }, [file, imageUrl]);

    React.useEffect(() => {
        return () => {
            if (file && previewUrl && !imageUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl, file, imageUrl]);

    if (previewUrl) {
        return (
            <div className="grid gap-2">
                 <Label>{label}</Label>
                 <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                     <Image src={previewUrl} alt={label} layout="fill" objectFit="cover" data-ai-hint="photo image" />
                     {!isReadOnly && (
                        <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-7 w-7 z-10" onClick={() => onFileChange(null)}>
                           <X className="h-4 w-4" />
                        </Button>
                     )}
                 </div>
            </div>
        );
    }

    if (isReadOnly) {
         return (
            <div className="grid gap-2">
                 <Label>{label}</Label>
                 <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted/50 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">फोटो उपलब्ध नाही</p>
                 </div>
            </div>
        );
    }

    return (
        <div className="grid gap-2">
            <Label htmlFor={id} className="flex items-center gap-2">{label}</Label>
            <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 relative aspect-video">
                <UploadCloud className="w-8 h-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-center text-muted-foreground">
                    <span className="font-semibold">{capture ? 'फोटो काढा' : 'अपलोड करा'}</span>
                </p>
                <Input
                    id={id}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)}
                    capture={capture}
                />
            </div>
        </div>
    );
};


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
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState<'approve' | 'reject' | null>(null);
    const [remark, setRemark] = React.useState("");
    const [reviewAudio, setReviewAudio] = React.useState<File | null>(null);
    
    const tabs = ["farmer-selection", "farmer-info", "farm-info", "media", "map"];

    const handleOpenModal = (action: 'approve' | 'reject') => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleFinalSubmit = () => {
        if (!modalAction) return;

        toast({
            title: `सर्वेक्षण ${modalAction === 'approve' ? 'मंजूर' : 'नाकारले'}!`,
            description: `शेती सर्वेक्षण यशस्वीरित्या ${modalAction === 'approve' ? 'मंजूर' : 'नाकारले'} आहे.`,
        });
        setIsModalOpen(false);
        setRemark("");
        setReviewAudio(null);
        setModalAction(null);
        router.push('/oversheer/dashboard');
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
            <CardDescription>फील्ड बॉय: सुनील पवार</CardDescription>
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
                <VerifiableInput label="सब नंबर" value="SAB-A001" />
                <VerifiableInput label="खाता नंबर" value="KH-112233" />
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReadOnlyInput label="मोबाइल नंबर" value="9876543210" />
                <ReadOnlyInput label="लिंक नंबर" value="LNK-54321" />
                <ReadOnlyInput label="NAP नंबर" value="NAP-98765" />
                <ReadOnlyInput label="बँकेचे नाव" value="स्टेट बँक ऑफ इंडिया" />
                <ReadOnlyInput label="शाखा" value="लातूर शाखा" />
                <ReadOnlyInput label="खाते क्रमांक" value="XXXX-XXXX-1234" />
                <ReadOnlyInput label="IFSC कोड" value="SBIN0001234" />
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReadOnlyInput label="क्षेत्र (हेक्टर)" value="1.0" />
                <ReadOnlyInput label="लागवड तारीख" value={format(new Date('2023-08-12'), "PPP")} />
                <ReadOnlyInput label="उसाची जात" value="जात १" />
                <ReadOnlyInput label="उसाचा प्रकार" value="प्रकार १ (12 महिने)" />
                <ReadOnlyInput label="उसाची पक्वता" value={format(addMonths(new Date('2023-08-12'), 12), "PPP")} />
                <ReadOnlyInput label="सिंचनाचा प्रकार" value="ठिबक" />
                <ReadOnlyInput label="सिंचनाचा स्रोत" value="विहीर" />
                <ReadOnlyInput label="सिंचन पद्धत" value="पद्धत १" />
                <ReadOnlyInput label="लागवड पद्धत" value="पद्धत अ" />
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
                            {farmPhotoLabels.map((label, index) => (
                                <ImageUploader key={index} id={`farm-photo-${index}`} label={label} file={null} onFileChange={()=>{}} isReadOnly imageUrl={`https://placehold.co/400x300.png?text=${index+1}`}/>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                        <ImageUploader id="farmer-photo" label="शेतकरी फोटो" file={null} onFileChange={()=>{}} isReadOnly imageUrl="https://placehold.co/400x300.png"/>
                        <ImageUploader id="field-boy-photo" label="फील्ड बॉय फोटो" file={null} onFileChange={()=>{}} isReadOnly imageUrl="https://placehold.co/400x300.png"/>
                        <ImageUploader id="saat-baara-photo" label="७/१२ कागदपत्र" file={null} onFileChange={()=>{}} isReadOnly imageUrl="https://placehold.co/400x300.png"/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="audio-note" className="flex items-center gap-2"><AudioLines /> ऑडिओ नोट</Label>
                            <audio src="data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhIAAAAAA=" controls className="w-full" />
                        </div>
                         <div className="grid gap-4">
                            <Label className="flex items-center gap-2"><FileImage /> इतर मीडिया</Label>
                            <div className="flex items-center gap-2 p-2 border rounded-md">
                                <FileIcon className="h-5 w-5 text-muted-foreground"/>
                                <span className="font-medium text-sm">नोंदणी कागदपत्र</span>
                                <Button asChild variant="link" size="sm" className="ml-auto">
                                    <a href="https://placehold.co/200x100.png" target="_blank" rel="noopener noreferrer">पहा</a>
                                </Button>
                            </div>
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
                       <FieldBoyMap />
                    </CardContent>
                </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-6 mt-4 flex justify-between items-center">
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
                    <Button variant="outline" onClick={() => handleOpenModal('reject')} className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                        <XCircle className="mr-2" /> नाकारा
                    </Button>
                    <Button onClick={() => handleOpenModal('approve')} className="bg-green-600 hover:bg-green-700 text-white">
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

    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {modalAction === 'approve' ? 'सर्वेक्षण मंजूर करा' : 'सर्वेक्षण नाकारा'}
                </DialogTitle>
                <DialogDescription>
                  {modalAction === 'approve' ? 'हे सर्वेक्षण मंजूर करण्यापूर्वी तुम्ही कोणताही अतिरिक्त शेरा जोडू शकता.' : 'कृपया हे सर्वेक्षण नाकारण्याचे कारण द्या.'}
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
                    {modalAction === 'approve' ? 'मंजुरीची पुष्टी करा' : 'नकारची पुष्टी करा'}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
