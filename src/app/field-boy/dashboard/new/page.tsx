
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
import { Pin, Footprints, ChevronsUpDown, Check, UploadCloud, X, File as FileIcon, PlusCircle, MinusCircle, LocateFixed, RefreshCw, AudioLines, FileImage, User, Image as ImageIcon, Send, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import FieldBoyMap from "@/components/field-boy-map"
import Image from "next/image"
import AudioRecorder from "@/components/audio-recorder"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

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
    { value: "farmer-1", label: "रमेश कुलकर्णी", mobile: "9876543210", docs: [{type: 'voter-id', number: 'ABC1234567'}], nameAsPerPassbook: "रमेश एस कुलकर्णी", bankName: "स्टेट बँक ऑफ इंडिया", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-1234", ifsc: "SBIN0001234", sabNumber: "SAB-A001", khataNumber: "KH-112233" },
    { value: "farmer-2", label: "सुरेश पाटील", mobile: "9876543211", docs: [{type: 'pan', number: 'BCDEF2345G'}], nameAsPerPassbook: "सुरेश पाटील", bankName: "HDFC बँक", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-2345", ifsc: "HDFC0002345", sabNumber: "SAB-B002", khataNumber: "KH-445566" },
    { value: "farmer-3", label: "गणेश जाधव", mobile: "9876543212", docs: [{type: 'voter-id', number: 'GHI3456789'}], nameAsPerPassbook: "गणेश एम जाधव", bankName: "ICICI बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-3456", ifsc: "ICIC0003456", sabNumber: "SAB-C003", khataNumber: "KH-778899" },
    { value: "farmer-4", label: "प्रकाश शिंदे", mobile: "9876543213", docs: [{type: 'voter-id', number: 'JKL4567890'}], nameAsPerPassbook: "प्रकाश शिंदे", bankName: "ऍक्सिस बँक", branchName: "मुंबई शाखा", accountNumber: "XXXX-XXXX-4567", ifsc: "UTIB0004567", sabNumber: "SAB-D004", khataNumber: "KH-101112" },
    { value: "farmer-5", label: "सचिन मोरे", mobile: "9876543214", docs: [{type: 'voter-id', number: 'MNO5678901'}], nameAsPerPassbook: "सचिन आर मोरे", bankName: "बँक ऑफ बडोदा", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-5678", ifsc: "BARB0005678", sabNumber: "SAB-E005", khataNumber: "KH-131415" },
    { value: "farmer-6", label: "अनिल गायकवाड", mobile: "9876543215", docs: [{type: 'pan', number: 'FGHIJ6789K'}], nameAsPerPassbook: "अनिल गायकवाड", bankName: "पंजाब नॅशनल बँक", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-6789", ifsc: "PUNB0006789", sabNumber: "SAB-F006", khataNumber: "KH-161718" },
    { value: "farmer-7", label: "दीपक चव्हाण", mobile: "9876543216", docs: [{type: 'voter-id', number: 'STU7890123'}], nameAsPerPassbook: "दीपक व्ही चव्हाण", bankName: "कॅनरा बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-7890", ifsc: "CNRB0007890", sabNumber: "SAB-G007", khataNumber: "KH-192021" },
    { value: "farmer-8", label: "संजय देशमुख", mobile: "9876543217", docs: [{type: 'voter-id', number: 'VWX8901234'}], nameAsPerPassbook: "संजय देशमुख", bankName: "युनियन बँक ऑफ इंडिया", branchName: "मुंबई शाखा", accountNumber: "XXXX-XXXX-8901", ifsc: "UBIN0008901", sabNumber: "SAB-H008", khataNumber: "KH-222324" },
    { value: "farmer-9", label: "विशाल पवार", mobile: "9876543218", docs: [{type: 'pan', number: 'IJKLM9012N'}], nameAsPerPassbook: "विशाल एस पवार", bankName: "बँक ऑफ इंडिया", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-9012", ifsc: "BKID0009012", sabNumber: "SAB-I009", khataNumber: "KH-252627" },
    { value: "farmer-10", label: "अमित भोसले", mobile: "9876543219", docs: [{type: 'voter-id', number: 'BCD0123456'}], nameAsPerPassbook: "अमित भोसले", bankName: "सेंट्रल बँक ऑफ इंडिया", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-0123", ifsc: "CBIN0000123", sabNumber: "SAB-J010", khataNumber: "KH-282930" },
    { value: "farmer-11", label: "राहुल सावंत", mobile: "9876543220", docs: [{type: 'voter-id', number: 'EFG1234567'}], nameAsPerPassbook: "राहुल सावंत", bankName: "इंडियन बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-1234", ifsc: "IDIB0001234", sabNumber: "SAB-K011", khataNumber: "KH-313233" },
    { value: "farmer-12", label: "अजय कदम", mobile: "9876543221", docs: [{type: 'pan', number: 'LMNOP2345Q'}], nameAsPerPassbook: "अजय कदम", bankName: "IDBI बँक", branchName: "मुंबई शाखा", accountNumber: "XXXX-XXXX-2345", ifsc: "IBKL0002345", sabNumber: "SAB-L012", khataNumber: "KH-343536" },
    { value: "farmer-13", label: "नितीन राऊत", mobile: "9876543222", docs: [{type: 'voter-id', number: 'KLM3456789'}], nameAsPerPassbook: "नितीन राऊत", bankName: "कोटक महिंद्रा बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-3456", ifsc: "KKBK0003456", sabNumber: "SAB-M013", khataNumber: "KH-373839" },
    { value: "farmer-14", label: "प्रशांत कांबळे", mobile: "9876543223", docs: [{type: 'voter-id', number: 'NOP4567890'}], nameAsPerPassbook: "प्रशांत कांबळे", bankName: "येस बँक", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-4567", ifsc: "YESB0004567", sabNumber: "SAB-N014", khataNumber: "KH-404142" },
    { value: "farmer-15", label: "मनोज जगताप", mobile: "9876543224", docs: [{type: 'pan', number: 'OPQRS5678T'}], nameAsPerPassbook: "मनोज जगताप", bankName: "इंडसइंड बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-5678", ifsc: "INDB0005678", sabNumber: "SAB-O015", khataNumber: "KH-434445" },
    { value: "farmer-16", label: "योगेश यादव", mobile: "9876543225", docs: [{type: 'voter-id', number: 'STU6789012'}], nameAsPerPassbook: "योगेश यादव", bankName: "RBL बँक", branchName: "मुंबई शाखा", accountNumber: "XXXX-XXXX-6789", ifsc: "RATN0006789", sabNumber: "SAB-P016", khataNumber: "KH-464748" },
    { value: "farmer-17", label: "महेश माने", mobile: "9876543226", docs: [{type: 'voter-id', number: 'VWX7890123'}], nameAsPerPassbook: "महेश माने", bankName: "फेडरल बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-7890", ifsc: "FDRL0007890", sabNumber: "SAB-Q017", khataNumber: "KH-495051" },
    { value: "farmer-18", label: "अमोल थोरात", mobile: "9876543227", docs: [{type: 'pan', number: 'RSTUV8901W'}], nameAsPerPassbook: "अमोल थोरात", bankName: "साउथ इंडियन बँक", branchName: "पुणे शाखा", accountNumber: "XXXX-XXXX-8901", ifsc: "SIBL0008901", sabNumber: "SAB-R018", khataNumber: "KH-525354" },
    { value: "farmer-19", label: "किरण साळुंखे", mobile: "9876543228", docs: [{type: 'voter-id', number: 'BCD9012345'}], nameAsPerPassbook: "किरण साळुंखे", bankName: "कर्नाटक बँक", branchName: "लातूर शाखा", accountNumber: "XXXX-XXXX-9012", ifsc: "KARB0009012", sabNumber: "SAB-S019", khataNumber: "KH-555657" },
    { value: "farmer-20", label: "संदीप सूर्यवंशी", mobile: "9876543229", docs: [{type: 'voter-id', number: 'EFG0123456'}], nameAsPerPassbook: "संदीप सूर्यवंशी", bankName: "सिटी युनियन बँक", branchName: "मुंबई शाखा", accountNumber: "XXXX-XXXX-0123", ifsc: "CIUB0000123", sabNumber: "SAB-T020", khataNumber: "KH-585960" },
];

type DocumentType = 'voter-id' | 'pan' | 'driving-license';
const documentTypes: {value: DocumentType, label: string}[] = [
    {value: 'voter-id', label: 'मतदार ओळखपत्र'},
    {value: 'pan', label: 'पॅन कार्ड'},
    {value: 'driving-license', label: 'ड्रायविंग लायसन्स'},
];

type Document = {
    id: number;
    type: DocumentType | '';
    number: string;
    file: File | null;
}

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


export default function NewFieldSurveyPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = React.useState("farmer-selection");
    const mapRef = React.useRef<{ refreshLocation: () => void }>(null);


    // State for each form field
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
    const [sabNumber, setSabNumber] = React.useState("");
    const [khataNumber, setKhataNumber] = React.useState("");

    // State for farmer info tab
    const [mobile, setMobile] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [isOtpSent, setIsOtpSent] = React.useState(false);
    const [isOtpVerified, setIsOtpVerified] = React.useState(false);
    const [documents, setDocuments] = React.useState<Document[]>([{ id: 1, type: '', number: '', file: null }]);
    const [nameAsPerPassbook, setNameAsPerPassbook] = React.useState("");
    const [bankName, setBankName] = React.useState("");
    const [branchName, setBranchName] = React.useState("");
    const [accountNumber, setAccountNumber] = React.useState("");
    const [ifscCode, setIfscCode] = React.useState("");

    // State for media tab
    const [farmPhotos, setFarmPhotos] = React.useState<(File | null)[]>(Array(4).fill(null));
    const farmPhotoLabels = ["शेताचे फोटो", "उसाची जात", "मातीचा प्रकार", "सिंचनाचा प्रकार"];
    const [farmerPhoto, setFarmerPhoto] = React.useState<File | null>(null);
    const [fieldBoyPhoto, setFieldBoyPhoto] = React.useState<File | null>(null);
    const [audioNote, setAudioNote] = React.useState<File | null>(null);
    const [otherMedia, setOtherMedia] = React.useState<OtherMedia[]>([{ id: 1, name: '', file: null }]);


    const tabs = ["farmer-selection", "farmer-info", "farm-info", "media", "map"];

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
            setNameAsPerPassbook(selectedFarmer.nameAsPerPassbook);
            setBankName(selectedFarmer.bankName);
            setBranchName(selectedFarmer.branchName);
            setAccountNumber(selectedFarmer.accountNumber);
            setIfscCode(selectedFarmer.ifsc)
            setSabNumber(selectedFarmer.sabNumber);
            setKhataNumber(selectedFarmer.khataNumber);
            setDocuments(selectedFarmer.docs.map((doc, index) => ({
                id: index + 1,
                type: doc.type as DocumentType,
                number: doc.number,
                file: null
            })))
        } else {
            // Clear fields if no farmer is selected
            setMobile("");
            setNameAsPerPassbook("");
            setDocuments([{ id: 1, type: '', number: '', file: null }]);
            setBankName("");
            setBranchName("");
            setAccountNumber("");
            setIfscCode("");
            setSabNumber("");
            setKhataNumber("");
        }
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setOtp("");
    }, [partyName]);

    const handleSendOtp = () => {
        // Simulate sending OTP
        if (mobile && mobile.length === 10) {
            setIsOtpSent(true);
            toast({
                title: "ओटीपी पाठवला",
                description: `ओटीपी ${mobile} वर पाठवला आहे.`,
            });
        } else {
            toast({
                variant: "destructive",
                title: "अवैध मोबाईल नंबर",
                description: "कृपया १०-अंकी मोबाईल नंबर प्रविष्ट करा.",
            });
        }
    };

    const handleVerifyOtp = () => {
        // Simulate verifying OTP
        if (otp === "1234") { // Mock OTP
            setIsOtpVerified(true);
            toast({
                title: "यशस्वी!",
                description: "ओटीपी यशस्वीरित्या सत्यापित झाला आहे.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "अवैध ओटीपी",
                description: "प्रविष्ट केलेला ओटीपी चुकीचा आहे.",
            });
        }
    };


    const getBreadcrumb = () => {
        const stateLabel = selectedState ? `${mockStates.find(s => s.value === selectedState)?.label}` : '';
        const districtLabel = district ? ` > ${mockDistricts.find(d => d.value === district)?.label}` : '';
        const talukaLabel = taluka ? ` > ${mockTalukas.find(t => t.value === taluka)?.label}` : '';
        const villageLabel = village ? ` > ${mockVillages.find(v => v.value === village)?.label}` : '';
        const partyNameLabel = partyName ? ` > ${mockFarmers.find(f => f.value === partyName)?.label}` : '';

        return `${stateLabel}${districtLabel}${talukaLabel}${villageLabel}${partyNameLabel}`;
    };
    
    const handleDocumentChange = (id: number, field: keyof Document, value: string | File | null) => {
        setDocuments(documents.map(doc => doc.id === id ? { ...doc, [field]: value } : doc));
    };

    const handleAddDocument = () => {
        if (documents.length < documentTypes.length) {
            setDocuments([...documents, { id: Date.now(), type: '', number: '', file: null }]);
        }
    };

    const handleRemoveDocument = (id: number) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };
    
    const getAvailableDocTypes = (currentDocType: DocumentType | '') => {
        const selectedTypes = documents.map(d => d.type).filter(t => t && t !== currentDocType);
        return documentTypes.filter(type => !selectedTypes.includes(type.value));
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


  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        {selectedFarmer ? (
          <>
            <CardTitle className="font-headline text-xl">{selectedFarmer.label}</CardTitle>
            <CardDescription>{getBreadcrumb()}</CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="font-headline text-xl">नवीन शेत सर्वेक्षण (New Farm Survey)</CardTitle>
            <CardDescription>नवीन सर्वेक्षणासाठी टॅबमध्ये तपशील भरा. (Fill details in the tabs for a new survey.)</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="farmer-selection">शेतकरी (Farmer)</TabsTrigger>
            <TabsTrigger value="farmer-info">माहिती (Info)</TabsTrigger>
            <TabsTrigger value="farm-info">शेत (Farm)</TabsTrigger>
            <TabsTrigger value="media">मीडिया (Media)</TabsTrigger>
            <TabsTrigger value="map">नकाशा (Map)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmer-selection" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="state">राज्य (State)</Label>
                    <Combobox
                        options={mockStates}
                        value={selectedState}
                        onValueChange={setSelectedState}
                        placeholder="राज्य निवडा..."
                        searchPlaceholder="राज्य शोधा..."
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="district">जिल्हा (District)</Label>
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
                    <Label htmlFor="taluka">तालुका (Taluka)</Label>
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
                    <Label htmlFor="circle">सर्कल (Circle)</Label>
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
                    <Label htmlFor="gut">गट (Gut)</Label>
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
                    <Label htmlFor="village">गाव (Village)</Label>
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
                    <Label htmlFor="shivar">शिवार (Shivar)</Label>
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
                    <Label htmlFor="survey-number">सर्वेक्षण क्र. (Survey No.)</Label>
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
                    <Label htmlFor="party-name">शेतकरी (Party Name)</Label>
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
                    <Label htmlFor="grower-type">उत्पादक प्रकार (Grower Type)</Label>
                    <Select value={growerType} onValueChange={setGrowerType} disabled={!partyName}>
                        <SelectTrigger id="grower-type"><SelectValue placeholder="उत्पादक प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="member">सभासद</SelectItem>
                            <SelectItem value="non-member">बिगर सभासद</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="sab-number">सब नंबर (Sab Number)</Label>
                    <Input id="sab-number" placeholder="सब नंबर टाका" value={sabNumber} disabled />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="khata-number">खाता नंबर (Khata Number)</Label>
                    <Input id="khata-number" placeholder="खाता नंबर टाका" value={khataNumber} disabled />
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2 md:col-span-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="mobile">मोबाइल नंबर (Mobile Number)</Label>
                            <Button variant="link" size="sm" onClick={handleSendOtp} disabled={isOtpSent || !mobile}>
                                <Send className="mr-2 h-4 w-4"/>
                                ओटीपी पाठवा (Send OTP)
                            </Button>
                        </div>
                        <Input id="mobile" type="tel" placeholder="मोबाइल नंबर टाका" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>

                    {isOtpSent && (
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="otp">ओटीपी (OTP)</Label>
                            <div className="flex gap-2">
                                <Input id="otp" type="text" placeholder="ओटीपी प्रविष्ट करा" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={isOtpVerified} />
                                <Button onClick={handleVerifyOtp} disabled={isOtpVerified || !otp}>
                                    {isOtpVerified ? <ShieldCheck /> : null}
                                    {isOtpVerified ? "सत्यापित (Verified)" : "सत्यापित करा (Verify)"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                 <div className="space-y-4">
                     <Separator />
                     <Label className="text-base font-medium">ओळखपत्र (Identification)</Label>
                     {documents.map((doc) => (
                         <div key={doc.id} className="space-y-2">
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 items-end">
                                <div className="grid gap-1.5">
                                <Label htmlFor={`doc-type-${doc.id}`} className="text-xs text-muted-foreground">ओळखपत्राचा प्रकार</Label>
                                <Select
                                    value={doc.type}
                                    onValueChange={(value: DocumentType) => handleDocumentChange(doc.id, 'type', value)}
                                >
                                    <SelectTrigger id={`doc-type-${doc.id}`}><SelectValue placeholder="ओळखपत्राचा प्रकार" /></SelectTrigger>
                                    <SelectContent>
                                        {getAvailableDocTypes(doc.type).map(docType => (
                                            <SelectItem key={docType.value} value={docType.value}>{docType.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                </div>
                                {documents.length > 1 && (
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveDocument(doc.id)}>
                                        <MinusCircle className="text-destructive" />
                                    </Button>
                                )}
                            </div>
                             <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
                                 <div className="grid gap-1.5">
                                      <Label htmlFor={`doc-number-${doc.id}`} className="text-xs text-muted-foreground">ओळखपत्र क्रमांक</Label>
                                     <Input
                                         id={`doc-number-${doc.id}`}
                                         placeholder="ओळखपत्र क्रमांक"
                                         value={doc.number}
                                         onChange={(e) => handleDocumentChange(doc.id, 'number', e.target.value)}
                                     />
                                 </div>
                                    <Input
                                        id={`doc-file-${doc.id}`}
                                        type="file"
                                        className="sr-only"
                                        onChange={(e) => {
                                            handleDocumentChange(doc.id, 'file', e.target.files ? e.target.files[0] : null);
                                        }}
                                    />
                                    <Button asChild variant="outline" size="icon">
                                        <Label htmlFor={`doc-file-${doc.id}`} className="cursor-pointer">
                                            <UploadCloud className="h-4 w-4"/>
                                        </Label>
                                    </Button>
                             </div>
                            {doc.file && (
                                <FileUploadItem file={doc.file} onRemove={() => handleDocumentChange(doc.id, 'file', null)} />
                            )}
                         </div>
                     ))}
                     {documents.length < documentTypes.length && (
                        <Button variant="outline" onClick={handleAddDocument} className="w-full sm:w-auto justify-self-start" disabled={documents.length >= documentTypes.length}>
                           <PlusCircle className="mr-2"/> आणखी जोडा (Add More)
                        </Button>
                     )}
                 </div>
                  <div className="space-y-4">
                     <Separator />
                     <Label className="text-base font-medium">बँक तपशील (Bank Details)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                             <Label htmlFor="passbook-name">पासबुक वरील नाव (Name as per Passbook)</Label>
                            <Input id="passbook-name" placeholder="पासबुकनुसार नाव टाका" value={nameAsPerPassbook} onChange={(e) => setNameAsPerPassbook(e.target.value)} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="bank-name">बँकेचे नाव (Bank Name)</Label>
                            <Input id="bank-name" placeholder="बँकेचे नाव टाका" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="branch-name">शाखा (Branch)</Label>
                            <Input id="branch-name" placeholder="शाखेचे नाव टाका" value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="account-number">खाते क्रमांक (Account Number)</Label>
                            <Input id="account-number" placeholder="बँक खाते क्रमांक टाका" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ifsc-code">IFSC कोड (IFSC Code)</Label>
                            <Input id="ifsc-code" placeholder="IFSC कोड टाका" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                        </div>
                      </div>
                 </div>
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="area">क्षेत्र (एकरमध्ये) (Area in Acres)</Label>
                    <Input id="area" type="number" placeholder="उदा. २.५" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="planting-type">पिकाचा प्रकार (Crop Type)</Label>
                    <Select>
                        <SelectTrigger id="planting-type"><SelectValue placeholder="पिकाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="plant">रोप</SelectItem>
                            <SelectItem value="ratoon">खोडवा</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cane-type">उसाचा प्रकार (Cane Type)</Label>
                    <Select>
                        <SelectTrigger id="cane-type"><SelectValue placeholder="उसाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="adsali">अडसाली</SelectItem>
                            <SelectItem value="preseasonal">पूर्व-हंगामी</SelectItem>
                             <SelectItem value="suru">सुरू</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="soil-type">मातीचा प्रकार (Soil Type)</Label>
                     <Select>
                        <SelectTrigger id="soil-type"><SelectValue placeholder="मातीचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="black-cotton">काळी कापूस</SelectItem>
                            <SelectItem value="red-loam">लाल चिकणमाती</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="irrigation-type">सिंचनाचा प्रकार (Irrigation Type)</Label>
                    <Select>
                        <SelectTrigger id="irrigation-type"><SelectValue placeholder="सिंचनाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="drip">ठिबक</SelectItem>
                            <SelectItem value="flood">प्रवाही</SelectItem>
                            <SelectItem value="canal">कालवा</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </TabsContent>

           <TabsContent value="media" className="pt-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <Label className="text-base font-medium">शेताचे फोटो (४ आवश्यक) (Farm Photos - 4 required)</Label>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <ImageUploader
                            id="farmer-photo"
                            label="शेतकरी फोटो (Farmer Photo)"
                            file={farmerPhoto}
                            onFileChange={setFarmerPhoto}
                            capture="environment"
                        />
                        <ImageUploader
                            id="field-boy-photo"
                            label="फील्ड बॉय फोटो (Field Boy Photo)"
                            file={fieldBoyPhoto}
                            onFileChange={setFieldBoyPhoto}
                            capture="user"
                        />
                    
                        <div className="grid gap-2">
                            <Label htmlFor="audio-note" className="flex items-center gap-2"><AudioLines /> ऑडिओ नोट (पर्यायी) (Audio Note - Optional)</Label>
                            <AudioRecorder
                                onRecordingComplete={(file) => setAudioNote(file)}
                            />
                        </div>

                         <div className="grid gap-4">
                            <Label className="flex items-center gap-2"><FileImage /> इतर मीडिया (पर्यायी) (Other Media - Optional)</Label>
                            {otherMedia.map((item, index) => (
                                <div key={item.id} className="grid gap-2">
                                     <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 items-center">
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
                                   <PlusCircle className="mr-2"/> आणखी जोडा (Add More)
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
                                फील्ड बॉयचे स्थान (Field Boy's Location)
                            </CardTitle>
                            <CardDescription>
                                शेतापासून अंदाजित अंतर: <strong>०.२ किमी</strong> (Est. distance from farm: 0.2 km)
                            </CardDescription>
                        </div>
                         <Button variant="outline" size="icon" onClick={() => mapRef.current?.refreshLocation()}>
                            <RefreshCw className="h-4 w-4" />
                            <span className="sr-only">Refresh Location</span>
                        </Button>
                    </CardHeader>
                    <CardContent className="h-64 bg-muted rounded-b-lg">
                        <FieldBoyMap ref={mapRef} showDistance farmLocation={{lat: 18.4088, lng: 76.5702}} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">शेताची सीमा (Farm Boundary)</CardTitle>
                        <CardDescription>शेताची सीमा निश्चित करण्यासाठी खालील बटणे वापरा. (Use the buttons below to mark the farm boundary.)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-64 bg-muted rounded-lg">
                           <FieldBoyMap />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
                            <Button variant="outline" className="w-full"><Pin className="mr-2" /> ड्रॉ बटण (Draw Button)</Button>
                            <Button variant="outline" className="w-full"><Footprints className="mr-2" /> वॉक बटण (Walk Button)</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button variant="outline" asChild>
            <Link href="/field-boy/dashboard">रद्द करा (Cancel)</Link>
        </Button>
        {activeTab !== 'map' ? (
             <Button onClick={handleNext}>जतन करा आणि पुढे जा (Save & Next)</Button>
        ) : (
             <Button onClick={handleFinalSubmit}>सर्वेक्षण सबमिट करा (Submit Survey)</Button>
        )}
      </CardFooter>
    </Card>
  )
}

    