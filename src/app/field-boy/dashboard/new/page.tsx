
"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Pin, Footprints, ChevronsUpDown, Check, UploadCloud, X, File as FileIcon, PlusCircle, MinusCircle, LocateFixed, RefreshCw, AudioLines, FileImage, User, Image as ImageIcon, Send, ShieldCheck, CalendarIcon, Loader2, ArrowLeft, MessageSquare, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import FieldBoyMap from "@/components/field-boy-map"
import Image from "next/image"
import AudioRecorder from "@/components/audio-recorder"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { format, addMonths } from "date-fns"

const mockStates = [
    { value: "maharashtra", label: "महाराष्ट्र" },
    { value: "karnataka", label: "कर्नाटक" },
];

const mockDistricts = [
    { value: "latur", label: "लातूर" },
    { value: "pune", label: "पुणे" },
    { value: "mumbai", label: "मुंबई" },
];

const mockTalukas = [
    { value: "ahmedpur", label: "अहमदपूर" },
    { value: "ausa", label: "औसा" },
    { value: "latur", label: "लातूर" },
];

const mockCircles = [
    { value: "circle-1", label: "सर्कल १" },
    { value: "circle-2", label: "सर्कल २" },
];

const mockGuts = [
    { value: "gut-101", label: "गट १०१" },
    { value: "gut-102", label: "गट १०२" },
];

const mockVillages = [
    { value: "chakur", label: "चाकूर" },
    { value: "mohgaon", label: "मोहगाव" },
    { value: "lamjana", label: "लामजना" },
    { value: "kasarwadi", label: "कासारवाडी" },
    { value: "nalegaon", label: "नाळेगाव" },
    { value: "wadwal", label: "वडवळ" },
    { value: "handarguli", label: "हंडरगुळी" },
    { value: "devangra", label: "देवंग्रा" },
];

const mockShivars = [
    { value: "shivar-a", label: "शिवार अ" },
    { value: "shivar-b", label: "शिवार ब" },
];

const mockSurveyNumbers = [
    { value: "sn-123", label: "SN-123" },
    { value: "sn-456", label: "SN-456" },
];


const mockFarmers = [
    { value: "farmer-1", label: "रमेश कुलकर्णी", mobile: "9876543210", docs: [{type: 'voter-id', number: 'ABC1234567'}], bankName: "स्टेट बँक ऑफ इंडिया", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-1234", ifsc: "SBIN0001234", sabNumber: "SAB-A001", khataNumber: "KH-112233" },
    { value: "farmer-2", label: "सुरेश पाटील", mobile: "9876543211", docs: [{type: 'pan', number: 'BCDEF2345G'}], bankName: "HDFC बँक", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-2345", ifsc: "HDFC0002345", sabNumber: "SAB-B002", khataNumber: "KH-445566" },
    { value: "farmer-3", label: "गणेश जाधव", mobile: "9876543212", docs: [{type: 'voter-id', number: 'GHI3456789'}], bankName: "ICICI बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-3456", ifsc: "ICIC0003456", sabNumber: "SAB-C003", khataNumber: "KH-778899" },
    { value: "farmer-4", label: "प्रकाश शिंदे", mobile: "9876543213", docs: [{type: 'voter-id', number: 'JKL4567890'}], bankName: "ऍक्सिस बँक", branchName: "मुंबई शाखा", accountNumber: "XXXX-XXXX-4567", ifsc: "UTIB0004567", sabNumber: "SAB-D004", khataNumber: "KH-101112" },
    { value: "farmer-5", label: "सचिन मोरे", mobile: "9876543214", docs: [{type: 'voter-id', number: 'MNO5678901'}], bankName: "बँक ऑफ बडोदा", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-5678", ifsc: "BARB0005678", sabNumber: "SAB-E005", khataNumber: "KH-131415" },
    { value: "farmer-6", label: "अनिल गायकवाड", mobile: "9876543215", docs: [{type: 'pan', number: 'FGHIJ6789K'}], bankName: "पंजाब नॅशनल बँक", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-6789", ifsc: "PUNB0006789", sabNumber: "SAB-F006", khataNumber: "KH-161718" },
    { value: "farmer-7", label: "दीपक चव्हाण", mobile: "9876543216", docs: [{type: 'voter-id', number: 'STU7890123'}], bankName: "कॅनरा बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-7890", ifsc: "CNRB0007890", sabNumber: "SAB-G007", khataNumber: "KH-192021" },
    { value: "farmer-8", label: "संजय देशमुख", mobile: "9876543217", docs: [{type: 'voter-id', number: 'VWX8901234'}], bankName: "युनियन बँक ऑफ इंडिया", branchName: "मुंबई शाखा", accountNumber: "XXXX-XXXX-8901", ifsc: "UBIN0008901", sabNumber: "SAB-H008", khataNumber: "KH-222324" },
    { value: "farmer-9", label: "विशाल पवार", mobile: "9876543218", docs: [{type: 'pan', number: 'IJKLM9012N'}], bankName: "बँक ऑफ इंडिया", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-9012", ifsc: "BKID0009012", sabNumber: "SAB-I009", khataNumber: "KH-252627" },
    { value: "farmer-10", label: "अमित भोसले", mobile: "9876543219", docs: [{type: 'voter-id', number: 'BCD0123456'}], bankName: "सेंट्रल बँक ऑफ इंडिया", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-0123", ifsc: "CBIN0000123", sabNumber: "SAB-J010", khataNumber: "KH-282930" },
    { value: "farmer-111", label: "राहुल जाधव", mobile: "9876543219", docs: [{type: 'voter-id', number: 'BCD0123456'}], bankName: "सेंट्रल बँक ऑफ इंडिया", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-0123", ifsc: "CBIN0000123", sabNumber: "SAB-J010", khataNumber: "KH-282930" },
];

const mockDraftData: Record<string, any> = {
    'SUR006': { // Draft
        state: 'maharashtra',
        district: 'latur',
        taluka: 'latur',
        circle: 'circle-1',
        gut: 'gut-101',
        village: 'kasarwadi',
        shivar: 'shivar-a',
        surveyNumber: 'sn-123',
        partyName: 'farmer-111',
    },
    'SUR003': { // Rejected
        state: 'maharashtra',
        district: 'latur',
        taluka: 'ahmedpur',
        circle: 'circle-2',
        gut: 'gut-102',
        village: 'mohgaon',
        shivar: 'shivar-b',
        surveyNumber: 'sn-456',
        partyName: 'farmer-3',
        rejectionRemark: "कागदपत्रे अस्पष्ट आहेत. कृपया स्पष्ट फोटो अपलोड करा.",
    },
    'SUR008': { // Another Draft
        state: 'maharashtra',
        district: 'latur',
        taluka: 'ahmedpur',
        circle: 'circle-2',
        gut: 'gut-102',
        village: 'mohgaon',
        shivar: 'shivar-b',
        surveyNumber: 'sn-456',
        partyName: 'farmer-8',
    },
};

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


const ImageUploader = ({
    id,
    label,
    onFileChange,
    file,
    capture
}: {
    id: string;
    label: string;
    onFileChange: (file: File | null) => void;
    file: File | null;
    capture?: 'user' | 'environment';
}) => {
    // Create a preview URL for the file
    const previewUrl = React.useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
        return null;
    }, [file]);

    // Clean up the object URL when the component unmounts
    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    if (file && previewUrl) {
        return (
            <div className="grid gap-2">
                 <Label>{label}</Label>
                 <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                     <Image src={previewUrl} alt={label} layout="fill" objectFit="cover" />
                     <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-7 w-7 z-10" onClick={() => onFileChange(null)}>
                         <X className="h-4 w-4" />
                     </Button>
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

const NewSurveyContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const mapRef = React.useRef<{ refreshLocation: () => void }>(null);
    const [distance, setDistance] = React.useState<string | null>("0.2 km");

    const editSurveyId = searchParams.get('edit');
    const isRestart = searchParams.get('restart') === 'true';

    const [activeTab, setActiveTab] = React.useState("farmer-selection");

    // Form states
    const [selectedState, setSelectedState] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [taluka, setTaluka] = React.useState("");
    const [circle, setCircle] = React.useState("");
    const [gut, setGut] = React.useState("");
    const [village, setVillage] = React.useState("");
    const [shivar, setShivar] = React.useState("");
    const [surveyNumber, setSurveyNumber] = React.useState("");
    const [partyName, setPartyName] = React.useState("");
    const [growerType, setGrowerType] = React.useState("");
    const [plantationDate, setPlantationDate] = React.useState<Date>();
    const [caneType, setCaneType] = React.useState('');
    const [caneMaturityDate, setCaneMaturityDate] = React.useState<Date | null>(null);

    const [mobile, setMobile] = React.useState("");
    const [linkNumber, setLinkNumber] = React.useState("");
    const [napNumber, setNapNumber] = React.useState("");
    const [bankName, setBankName] = React.useState("");
    const [branchName, setBranchName] = React.useState("");
    const [accountNumber, setAccountNumber] = React.useState("");
    const [ifscCode, setIfscCode] = React.useState("");
    const [sabNumber, setSabNumber] = React.useState("");
    const [khataNumber, setKhataNumber] = React.useState("");
    const [mobileUsageCount, setMobileUsageCount] = React.useState(0);
    const [isVerifyingMobile, setIsVerifyingMobile] = React.useState(false);

    const [farmPhotos, setFarmPhotos] = React.useState<(File | null)[]>(Array(4).fill(null));
    const farmPhotoLabels = ["शेताचे फोटो", "उसाची जात", "मातीचा प्रकार", "सिंचनाचा प्रकार"];
    const [farmerPhoto, setFarmerPhoto] = React.useState<File | null>(null);
    const [fieldBoyPhoto, setFieldBoyPhoto] = React.useState<File | null>(null);
    const [saatBaaraPhoto, setSaatBaaraPhoto] = React.useState<File | null>(null);
    const [audioNote, setAudioNote] = React.useState<File | null>(null);
    const [otherMedia, setOtherMedia] = React.useState<OtherMedia[]>([{ id: 1, name: '', file: null }]);
    
    const [rejectionRemark, setRejectionRemark] = React.useState<string | null>(null);

    const tabs = ["farmer-selection", "farmer-info", "farm-info", "media", "map"];
    
    const clearForm = React.useCallback((keepFirstTab = false) => {
        if (!keepFirstTab) {
            setSelectedState("");
            setDistrict("");
            setTaluka("");
            setCircle("");
            setGut("");
            setVillage("");
            setShivar("");
            setSurveyNumber("");
            setPartyName("");
        }
        setGrowerType("");
        setPlantationDate(undefined);
        setCaneType("");
        setMobile("");
        setLinkNumber("");
        setNapNumber("");
        setBankName("");
        setBranchName("");
        setAccountNumber("");
        setIfscCode("");
        setSabNumber("");
        setKhataNumber("");
        setMobileUsageCount(0);
        setFarmPhotos(Array(4).fill(null));
        setFarmerPhoto(null);
        setFieldBoyPhoto(null);
        setSaatBaaraPhoto(null);
        setAudioNote(null);
        setOtherMedia([{ id: 1, name: '', file: null }]);
    }, []);

    React.useEffect(() => {
        if (editSurveyId && mockDraftData[editSurveyId]) {
            const draft = mockDraftData[editSurveyId];
            if(isRestart) {
                clearForm(true); // Keep first tab data
            } else {
                 clearForm(false); // Clear everything before populating
            }
            setSelectedState(draft.state || "");
            setDistrict(draft.district || "");
            setTaluka(draft.taluka || "");
            setCircle(draft.circle || "");
            setGut(draft.gut || "");
            setVillage(draft.village || "");
            setShivar(draft.shivar || "");
            setSurveyNumber(draft.surveyNumber || "");
            setPartyName(draft.partyName || "");
            setRejectionRemark(draft.rejectionRemark || null);

            // In a real app, you would load all other fields from the draft as well
        } else {
            clearForm(false);
        }
    }, [editSurveyId, isRestart, clearForm]);


    const handleNext = () => {
        window.scrollTo(0, 0);
        const currentIndex = tabs.indexOf(activeTab);
        toast({
            title: "यशस्वी!",
            description: "तुमचा डेटा यशस्वीरित्या जतन झाला आहे.",
        });
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };
    
    const handleBack = () => {
        window.scrollTo(0, 0);
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };
    
    const handleFinalSubmit = () => {
        // Logic for final submission
        console.log("Survey submitted!");
        toast({
            title: "सर्वेक्षण सबमिट केले!",
            description: "तुमचे सर्वेक्षण यशस्वीरित्या सबमिट झाले आहे.",
        });
        window.scrollTo(0, 0);
        router.push('/field-boy/dashboard');
    }
    
    const selectedFarmer = mockFarmers.find(f => f.value === partyName);

    React.useEffect(() => {
        if (selectedFarmer) {
            setMobile(selectedFarmer.mobile);
            setBankName(selectedFarmer.bankName);
            setBranchName(selectedFarmer.branchName);
            setAccountNumber(selectedFarmer.accountNumber);
            setIfscCode(selectedFarmer.ifsc)
            setSabNumber(selectedFarmer.sabNumber);
            setKhataNumber(selectedFarmer.khataNumber);
            setLinkNumber(""); 
            setNapNumber("");
            setMobileUsageCount(0);
        } else {
            setMobile("");
            setBankName("");
            setBranchName("");
            setAccountNumber("");
            setIfscCode("");
            setSabNumber("");
            setKhataNumber("");
            setLinkNumber("");
            setNapNumber("");
            setMobileUsageCount(0);
        }
    }, [partyName, selectedFarmer]);
    
    const handleVerifyMobile = () => {
        if (!mobile || mobile.length < 10) {
            toast({
                variant: "destructive",
                title: "अवैध मोबाइल नंबर",
                description: "कृपया वैध १०-अंकी मोबाइल नंबर प्रविष्ट करा."
            });
            return;
        }
        setIsVerifyingMobile(true);
        setTimeout(() => {
            const usedCount = Math.floor(Math.random() * 5) + 1;
            setMobileUsageCount(usedCount);
            setIsVerifyingMobile(false);
            toast({
                title: "मोबाइल सत्यापित",
                description: `हा नंबर ${usedCount} वेळा वापरला गेला आहे.`
            })
        }, 3000);
    };


    React.useEffect(() => {
        if (caneType && plantationDate) {
            let monthsToAdd = 0;
            if (caneType === 'type-1') { 
                monthsToAdd = 12; 
            } else if (caneType === 'type-2') { 
                monthsToAdd = 14; 
            }
            if (monthsToAdd > 0) {
                setCaneMaturityDate(addMonths(plantationDate, monthsToAdd));
            } else {
                setCaneMaturityDate(null);
            }
        } else {
            setCaneMaturityDate(null);
        }
    }, [caneType, plantationDate]);

    const getBreadcrumb = () => {
        const stateLabel = selectedState ? `${mockStates.find(s => s.value === selectedState)?.label}` : '';
        const districtLabel = district ? ` > ${mockDistricts.find(d => d.value === district)?.label}` : '';
        const talukaLabel = taluka ? ` > ${mockTalukas.find(t => t.value === taluka)?.label}` : '';
        const villageLabel = village ? ` > ${mockVillages.find(v => v.value === village)?.label}` : '';
        const partyNameLabel = partyName ? ` > ${mockFarmers.find(f => f.value === partyName)?.label}` : '';

        return `${stateLabel}${districtLabel}${talukaLabel}${villageLabel}${partyNameLabel}`;
    };
            
    const handleOtherMediaChange = (id: number, field: keyof OtherMedia, value: string | File | null) => {
        setOtherMedia(otherMedia.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleAddOtherMedia = () => {
        if (otherMedia.length < 3) {
            setOtherMedia([...otherMedia, { id: Date.now(), name: '', file: null }]);
        }
    };

    const handleRemoveOtherMedia = (id: number) => {
        setOtherMedia(otherMedia.filter(item => item.id !== id));
    };

    const handleFarmPhotoChange = (index: number, file: File | null) => {
        const newPhotos = [...farmPhotos];
        newPhotos[index] = file;
        setFarmPhotos(newPhotos);
    };
    
    const cardTitle = editSurveyId ? `सर्वेक्षण संपादित करा - ${editSurveyId}` : "नवीन शेत सर्वेक्षण";
    const cardDescription = editSurveyId ? "आवश्यक बदल करा आणि पुन्हा सबमिट करा." : "नवीन सर्वेक्षणासाठी टॅबमध्ये तपशील भरा.";


  return (
    <>
    {rejectionRemark && (
        <Card className="w-full max-w-4xl mx-auto mb-6 bg-red-50 border-red-200">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-800">
                    <AlertCircle />
                    नाकारण्याचा शेरा
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-red-700">{rejectionRemark}</p>
            </CardContent>
        </Card>
    )}
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        {selectedFarmer ? (
          <>
            <CardTitle className="font-headline text-xl">{selectedFarmer.label}</CardTitle>
            <CardDescription>{getBreadcrumb()}</CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="font-headline text-xl">{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
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
                <div className="grid gap-2">
                    <Label htmlFor="state">राज्य</Label>
                    <Combobox
                        options={mockStates}
                        value={selectedState}
                        onValueChange={setSelectedState}
                        placeholder="राज्य निवडा..."
                        searchPlaceholder="राज्य शोधा..."
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="district">जिल्हा</Label>
                    <Combobox
                        options={mockDistricts}
                        value={district}
                        onValueChange={setDistrict}
                        placeholder="जिल्हा निवडा..."
                        searchPlaceholder="जिल्हा शोधा..."
                        disabled={!selectedState}
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="taluka">तालुका</Label>
                    <Combobox
                        options={mockTalukas}
                        value={taluka}
                        onValueChange={setTaluka}
                        placeholder="तालुका निवडा..."
                        searchPlaceholder="तालुका शोधा..."
                        disabled={!district}
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="circle">सर्कल</Label>
                    <Combobox
                        options={mockCircles}
                        value={circle}
                        onValueChange={setCircle}
                        placeholder="सर्कल निवडा..."
                        searchPlaceholder="सर्कल शोधा..."
                        disabled={!taluka}
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="gut">गट</Label>
                    <Combobox
                        options={mockGuts}
                        value={gut}
                        onValueChange={setGut}
                        placeholder="गट निवडा..."
                        searchPlaceholder="गट शोधा..."
                        disabled={!circle}
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="village">गाव</Label>
                     <Combobox
                        options={mockVillages}
                        value={village}
                        onValueChange={setVillage}
                        placeholder="गाव निवडा..."
                        searchPlaceholder="गाव शोधा..."
                        disabled={!gut}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="shivar">शिवार</Label>
                    <Combobox
                        options={mockShivars}
                        value={shivar}
                        onValueChange={setShivar}
                        placeholder="शिवार निवडा..."
                        searchPlaceholder="शिवार शोधा..."
                        disabled={!village}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="survey-number">सर्वेक्षण क्र.</Label>
                    <Combobox
                        options={mockSurveyNumbers}
                        value={surveyNumber}
                        onValueChange={setSurveyNumber}
                        placeholder="सर्वेक्षण क्र. निवडा..."
                        searchPlaceholder="सर्वेक्षण क्र. शोधा..."
                        disabled={!shivar}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="party-name">शेतकरी</Label>
                    <Combobox
                        options={mockFarmers}
                        value={partyName}
                        onValueChange={setPartyName}
                        placeholder="शेतकरी निवडा..."
                        searchPlaceholder="शेतकरी शोधा..."
                        disabled={!surveyNumber}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="grower-type">उत्पादक प्रकार</Label>
                    <Select value={growerType} onValueChange={setGrowerType} disabled={!partyName}>
                        <SelectTrigger id="grower-type"><SelectValue placeholder="उत्पादक प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="member">सभासद</SelectItem>
                            <SelectItem value="non-member">बिगर सभासद</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="sab-number">सब नंबर</Label>
                    <Input id="sab-number" placeholder="सब नंबर टाका" value={sabNumber} onChange={(e) => setSabNumber(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="khata-number">खाता नंबर</Label>
                    <Input id="khata-number" placeholder="खाता नंबर टाका" value={khataNumber} onChange={(e) => setKhataNumber(e.target.value)} />
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                       <div className="flex justify-between items-center">
                            <Label htmlFor="mobile">मोबाइल नंबर</Label>
                            {mobileUsageCount > 0 && (
                                <span className="text-sm font-medium text-muted-foreground">{mobileUsageCount}/5</span>
                            )}
                        </div>
                        <div className="relative flex items-center">
                            <Input
                                id="mobile"
                                type="tel"
                                placeholder={isVerifyingMobile ? "तपासत आहे..." : "मोबाइल नंबर टाका"}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="pr-10"
                                disabled={isVerifyingMobile}
                            />
                             <Button type="button" variant="ghost" size="icon" className="absolute right-1 h-8 w-8" onClick={handleVerifyMobile} disabled={isVerifyingMobile}>
                                {isVerifyingMobile ? (
                                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                                ) : (
                                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="link-number">लिंक नंबर</Label>
                        <Input id="link-number" placeholder="लिंक नंबर टाका" value={linkNumber} onChange={(e) => setLinkNumber(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nap-number">NAP नंबर</Label>
                        <Input id="nap-number" placeholder="NAP नंबर टाका" value={napNumber} onChange={(e) => setNapNumber(e.target.value)} />
                    </div>
                </div>
                  <div className="space-y-4">
                    <div className="relative">
                        <Separator />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-2">
                            <span className="text-sm font-medium text-muted-foreground">बँक तपशील</span>
                        </div>
                    </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="grid gap-2">
                            <Label htmlFor="bank-name">बँकेचे नाव</Label>
                            <Input id="bank-name" placeholder="बँकेचे नाव टाका" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="branch-name">शाखा</Label>
                            <Input id="branch-name" placeholder="शाखेचे नाव टाका" value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="account-number">खाते क्रमांक</Label>
                            <Input id="account-number" placeholder="बँक खाते क्रमांक टाका" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ifsc-code">IFSC कोड</Label>
                            <Input id="ifsc-code" placeholder="IFSC कोड टाका" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                        </div>
                      </div>
                 </div>
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="area">क्षेत्र (हेक्टर)</Label>
                    <Input id="area" type="number" placeholder="उदा. १.०" />
                </div>
                 <div className="grid gap-2">
                    <Label>लागवड तारीख</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !plantationDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {plantationDate ? format(plantationDate, "PPP") : <span>एक तारीख निवडा</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={plantationDate}
                            onSelect={setPlantationDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cane-variety">उसाची जात</Label>
                    <Select>
                        <SelectTrigger id="cane-variety"><SelectValue placeholder="उसाची जात निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="variety-1">जात १</SelectItem>
                            <SelectItem value="variety-2">जात २</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cane-type">उसाचा प्रकार</Label>
                    <Select value={caneType} onValueChange={setCaneType}>
                        <SelectTrigger id="cane-type"><SelectValue placeholder="उसाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="type-1">प्रकार १ (12 महिने)</SelectItem>
                            <SelectItem value="type-2">प्रकार २ (14 महिने)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cane-maturity">उसाची पक्वता</Label>
                    <Input id="cane-maturity" value={caneMaturityDate ? format(caneMaturityDate, "PPP") : 'पक्वता तारीख'} disabled />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="irrigation-type">सिंचनाचा प्रकार</Label>
                    <Select>
                        <SelectTrigger id="irrigation-type"><SelectValue placeholder="सिंचनाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="drip">ठिबक</SelectItem>
                            <SelectItem value="flood">प्रवाही</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="irrigation-source">सिंचनाचा स्रोत</Label>
                    <Select>
                        <SelectTrigger id="irrigation-source"><SelectValue placeholder="सिंचनाचा स्रोत निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="well">विहीर</SelectItem>
                            <SelectItem value="canal">कालवा</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="irrigation-method">सिंचन पद्धत</Label>
                    <Select>
                        <SelectTrigger id="irrigation-method"><SelectValue placeholder="सिंचन पद्धत निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="method-1">पद्धत १</SelectItem>
                            <SelectItem value="method-2">पद्धत २</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="plantation-method">लागवड पद्धत</Label>
                    <Select>
                        <SelectTrigger id="plantation-method"><SelectValue placeholder="लागवड पद्धत निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="method-a">पद्धत अ</SelectItem>
                            <SelectItem value="method-b">पद्धत ब</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="east">पूर्व</Label>
                    <Input id="east" placeholder="पूर्व सीमा तपशील" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="west">पश्चिम</Label>
                    <Input id="west" placeholder="पश्चिम सीमा तपशील" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="north">उत्तर</Label>
                    <Input id="north" placeholder="उत्तर सीमा तपशील" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="south">दक्षिण</Label>
                    <Input id="south" placeholder="दक्षिण सीमा तपशील" />
                </div>
            </div>
          </TabsContent>

           <TabsContent value="media" className="pt-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <Label className="text-base font-medium">शेताचे फोटो (४ आवश्यक)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {farmPhotos.map((photo, index) => (
                                <ImageUploader
                                    key={index}
                                    id={`farm-photo-${index}`}
                                    label={farmPhotoLabels[index]}
                                    file={photo}
                                    onFileChange={(file) => handleFarmPhotoChange(index, file)}
                                    capture="environment"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                        <ImageUploader
                            id="farmer-photo"
                            label="शेतकरी फोटो"
                            file={farmerPhoto}
                            onFileChange={setFarmerPhoto}
                            capture="environment"
                        />
                        <ImageUploader
                            id="field-boy-photo"
                            label="फील्ड बॉय फोटो"
                            file={fieldBoyPhoto}
                            onFileChange={setFieldBoyPhoto}
                            capture="user"
                        />
                         <ImageUploader
                            id="saat-baara-photo"
                            label="७/१२ कागदपत्र"
                            file={saatBaaraPhoto}
                            onFileChange={setSaatBaaraPhoto}
                            capture="environment"
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="audio-note" className="flex items-center gap-2"><AudioLines /> ऑडिओ नोट (पर्यायी)</Label>
                            <AudioRecorder
                                onRecordingComplete={(file) => setAudioNote(file)}
                            />
                        </div>

                         <div className="grid gap-4">
                            <Label className="flex items-center gap-2"><FileImage /> इतर मीडिया (पर्यायी)</Label>
                            {otherMedia.map((item, index) => (
                                <div key={item.id} className="grid gap-2">
                                     <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                                        <Input
                                            placeholder="फाइलचे नाव"
                                            value={item.name}
                                            onChange={(e) => handleOtherMediaChange(item.id, 'name', e.target.value)}
                                        />
                                        <div className="relative">
                                            <Button asChild variant="outline" size="icon">
                                                 <Label htmlFor={`other-media-file-${item.id}`} className="cursor-pointer">
                                                    <UploadCloud className="h-4 w-4"/>
                                                </Label>
                                            </Button>
                                            <Input
                                                id={`other-media-file-${item.id}`}
                                                type="file"
                                                className="sr-only"
                                                accept="image/*,application/pdf"
                                                onChange={(e) => handleOtherMediaChange(item.id, 'file', e.target.files ? e.target.files[0] : null)}
                                            />
                                        </div>
                                         {otherMedia.length > 1 && (
                                             <Button variant="ghost" size="icon" onClick={() => handleRemoveOtherMedia(item.id)}>
                                                <MinusCircle className="text-destructive" />
                                             </Button>
                                        )}
                                    </div>
                                    {item.file && (
                                        <FileUploadItem
                                            file={item.file}
                                            name={item.name || item.file.name}
                                            onRemove={() => handleOtherMediaChange(item.id, 'file', null)}
                                        />
                                    )}
                                </div>
                            ))}
                             {otherMedia.length < 3 && (
                                <Button variant="outline" onClick={handleAddOtherMedia} className="w-full sm:w-auto justify-self-start">
                                   <PlusCircle className="mr-2"/> आणखी जोडा
                                </Button>
                             )}
                        </div>
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
                         <Button variant="outline" size="icon" onClick={() => mapRef.current?.refreshLocation()}>
                            <RefreshCw className="h-4 w-4" />
                            <span className="sr-only">Refresh Location</span>
                        </Button>
                    </CardHeader>
                    <CardContent className="h-64 bg-muted rounded-b-lg">
                        <FieldBoyMap 
                            ref={mapRef} 
                            showDistance 
                            farmLocation={{lat: 18.4088, lng: 76.5702}} 
                        />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">शेताची सीमा</CardTitle>
                        <CardDescription>शेताची सीमा निश्चित करण्यासाठी खालील बटणे वापरा.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-64 bg-muted rounded-lg">
                           <FieldBoyMap />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
                            <Button variant="outline" className="w-full"><Pin className="mr-2" /> ड्रॉ बटण</Button>
                            <Button variant="outline" className="w-full"><Footprints className="mr-2" /> वॉक बटण</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2 mt-4 border-t pt-6">
        {activeTab === 'farmer-selection' ? (
          <Button variant="outline" asChild>
            <Link href="/field-boy/dashboard">रद्द करा</Link>
          </Button>
        ) : (
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2" /> मागे
          </Button>
        )}

        {activeTab !== 'map' ? (
          <Button onClick={handleNext}>जतन करा आणि पुढे जा</Button>
        ) : (
          <Button onClick={handleFinalSubmit}>सर्वेक्षण सबमिट करा</Button>
        )}
      </CardFooter>
    </Card>
    </>
  )
}


export default function NewFieldSurveyPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <NewSurveyContent />
        </React.Suspense>
    )
}
