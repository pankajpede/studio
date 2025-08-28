
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
import { Pin, Footprints, ChevronsUpDown, Check, UploadCloud, X, File as FileIcon, PlusCircle, MinusCircle, LocateFixed, RefreshCw, AudioLines, FileImage, User, Image as ImageIcon, Send, ShieldCheck, CalendarIcon, Loader2, MessageSquare, CheckCircle, XCircle } from "lucide-react"
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
                     <Image src={previewUrl} alt={label} layout="fill" objectFit="cover" data-ai-hint="photo image" />
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
                    <span className="font-semibold">{capture ? 'फोटो काढा (Capture)' : 'अपलोड करा (Upload)'}</span>
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
    const [growerType, setGrowerType] = React.useState('member');
    const [sabNumber, setSabNumber] = React.useState("SAB-A001");
    const [khataNumber, setKhataNumber] = React.useState("KH-112233");

    // State for farmer info tab
    const [mobile, setMobile] = React.useState("9876543210");
    const [linkNumber, setLinkNumber] = React.useState("LNK-54321");
    const [napNumber, setNapNumber] = React.useState("NAP-98765");
    const [bankName, setBankName] = React.useState("स्टेट बँक ऑफ इंडिया");
    const [branchName, setBranchName] = React.useState("लातूर शाखा");
    const [accountNumber, setAccountNumber] = React.useState("XXXX-XXXX-1234");
    const [ifscCode, setIfscCode] = React.useState("SBIN0001234");
    
    // State for farm info
    const [plantationDate, setPlantationDate] = React.useState<Date | undefined>(new Date('2023-08-12'));
    const [caneType, setCaneType] = React.useState('type-1');
    const [caneMaturityDate, setCaneMaturityDate] = React.useState<Date | null>(null);

    // State for media tab
    const [farmPhotos, setFarmPhotos] = React.useState<(File | null)[]>(Array(4).fill(null));
    const farmPhotoLabels = ["शेताचे फोटो (Farm Photo)", "उसाची जात (Cane Variety)", "मातीचा प्रकार (Soil Type)", "सिंचनाचा प्रकार (Irrigation Type)"];
    const [farmerPhoto, setFarmerPhoto] = React.useState<File | null>(null);
    const [fieldBoyPhoto, setFieldBoyPhoto] = React.useState<File | null>(null);
    const [saatBaaraPhoto, setSaatBaaraPhoto] = React.useState<File | null>(null);
    const [audioNote, setAudioNote] = React.useState<File | null>(null);
    const [otherMedia, setOtherMedia] = React.useState<OtherMedia[]>([{ id: 1, name: '', file: null }]);
    
    // State for review modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState<'approve' | 'reject' | null>(null);
    const [remark, setRemark] = React.useState("");
    const [reviewAudio, setReviewAudio] = React.useState<File | null>(null);


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
    
    const selectedFarmer = mockFarmers.find(f => f.value === partyName);

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


  return (
    <>
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        {selectedFarmer ? (
          <>
            <CardTitle className="font-headline text-xl">{selectedFarmer.label} - {id}</CardTitle>
            <CardDescription>{getBreadcrumb()}</CardDescription>
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
                    <Input id="sab-number" placeholder="सब नंबर टाका" value={sabNumber} onChange={(e) => setSabNumber(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="khata-number">खाता नंबर (Khata Number)</Label>
                    <Input id="khata-number" placeholder="खाता नंबर टाका" value={khataNumber} onChange={(e) => setKhataNumber(e.target.value)} />
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                       <Label htmlFor="mobile">मोबाइल नंबर</Label>
                        <Input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="link-number">लिंक नंबर</Label>
                        <Input id="link-number" value={linkNumber} onChange={(e) => setLinkNumber(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nap-number">NAP नंबर</Label>
                        <Input id="nap-number" value={napNumber} onChange={(e) => setNapNumber(e.target.value)} />
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
                            <Input id="bank-name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="branch-name">शाखा</Label>
                            <Input id="branch-name" value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="account-number">खाते क्रमांक</Label>
                            <Input id="account-number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ifsc-code">IFSC कोड</Label>
                            <Input id="ifsc-code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                        </div>
                      </div>
                 </div>
            </div>
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="area">क्षेत्र (हेक्टर)</Label>
                    <Input id="area" type="number" defaultValue="1.0" />
                </div>
                 <div className="grid gap-2">
                    <Label>लागवड तारीख</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal",!plantationDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {plantationDate ? format(plantationDate, "PPP") : <span>एक तारीख निवडा</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={plantationDate} onSelect={setPlantationDate} initialFocus/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="cane-variety">उसाची जात</Label>
                    <Select defaultValue="variety-1">
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
                    <Label>उसाची पक्वता</Label>
                    <Input value={caneMaturityDate ? format(caneMaturityDate, "PPP") : 'पक्वता तारीख'} disabled />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="irrigation-type">सिंचनाचा प्रकार</Label>
                    <Select defaultValue="drip">
                        <SelectTrigger id="irrigation-type"><SelectValue placeholder="सिंचनाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="drip">ठिबक</SelectItem>
                            <SelectItem value="flood">प्रवाही</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="irrigation-source">सिंचनाचा स्रोत</Label>
                    <Select defaultValue="well">
                        <SelectTrigger id="irrigation-source"><SelectValue placeholder="सिंचनाचा स्रोत निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="well">विहीर</SelectItem>
                            <SelectItem value="canal">कालवा</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="irrigation-method">सिंचन पद्धत</Label>
                    <Select defaultValue="method-1">
                        <SelectTrigger id="irrigation-method"><SelectValue placeholder="सिंचन पद्धत निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="method-1">पद्धत १</SelectItem>
                            <SelectItem value="method-2">पद्धत २</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="plantation-method">लागवड पद्धत</Label>
                    <Select defaultValue="method-a">
                        <SelectTrigger id="plantation-method"><SelectValue placeholder="लागवड पद्धत निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="method-a">पद्धत अ</SelectItem>
                            <SelectItem value="method-b">पद्धत ब</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="east">पूर्व (East)</Label>
                    <Input id="east" placeholder="पूर्व सीमा तपशील" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="west">पश्चिम (West)</Label>
                    <Input id="west" placeholder="पश्चिम सीमा तपशील" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="north">उत्तर (North)</Label>
                    <Input id="north" placeholder="उत्तर सीमा तपशील" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="south">दक्षिण (South)</Label>
                    <Input id="south" placeholder="दक्षिण सीमा तपशील" />
                </div>
            </div>
          </TabsContent>

           <TabsContent value="media" className="pt-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <Label className="text-base font-medium">शेताचे फोटो</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {farmPhotos.map((photo, index) => (
                                <ImageUploader key={index} id={`farm-photo-${index}`} label={farmPhotoLabels[index]} file={photo} onFileChange={(file) => handleFarmPhotoChange(index, file)} capture="environment"/>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                        <ImageUploader id="farmer-photo" label="शेतकरी फोटो" file={farmerPhoto} onFileChange={setFarmerPhoto} capture="environment"/>
                        <ImageUploader id="field-boy-photo" label="फील्ड बॉय फोटो" file={fieldBoyPhoto} onFileChange={setFieldBoyPhoto} capture="user"/>
                        <ImageUploader id="saat-baara-photo" label="७/१२ कागदपत्र" file={saatBaaraPhoto} onFileChange={setSaatBaaraPhoto} capture="environment"/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="audio-note" className="flex items-center gap-2"><AudioLines /> ऑडिओ नोट</Label>
                            <AudioRecorder onRecordingComplete={(file) => setAudioNote(file)}/>
                        </div>
                         <div className="grid gap-4">
                            <Label className="flex items-center gap-2"><FileImage /> इतर मीडिया</Label>
                            {otherMedia.map((item) => (
                                <div key={item.id} className="grid gap-2">
                                     <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                                        <Input placeholder="फाइलचे नाव" value={item.name} onChange={(e) => handleOtherMediaChange(item.id, 'name', e.target.value)}/>
                                        <div className="relative">
                                            <Button asChild variant="outline" size="icon">
                                                 <Label htmlFor={`other-media-file-${item.id}`} className="cursor-pointer">
                                                    <UploadCloud className="h-4 w-4"/>
                                                </Label>
                                            </Button>
                                            <Input id={`other-media-file-${item.id}`} type="file" className="sr-only" accept="image/*,application/pdf" onChange={(e) => handleOtherMediaChange(item.id, 'file', e.target.files ? e.target.files[0] : null)}/>
                                        </div>
                                         {otherMedia.length > 1 && (
                                             <Button variant="ghost" size="icon" onClick={() => handleRemoveOtherMedia(item.id)}>
                                                <MinusCircle className="text-destructive" />
                                             </Button>
                                        )}
                                    </div>
                                    {item.file && (<FileUploadItem file={item.file} name={item.name || item.file.name} onRemove={() => handleOtherMediaChange(item.id, 'file', null)}/>)}
                                </div>
                            ))}
                             {otherMedia.length < 3 && (<Button variant="outline" onClick={handleAddOtherMedia} className="w-full sm:w-auto justify-self-start"><PlusCircle className="mr-2"/> आणखी जोडा</Button>)}
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
      <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button variant="outline" onClick={() => handleOpenModal('reject')} className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                <XCircle className="mr-2" /> नाकारा
            </Button>
            <Button onClick={() => handleOpenModal('approve')} className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="mr-2" /> मंजूर करा
            </Button>
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
                    <Label htmlFor="remark">शेरा (Remark)</Label>
                    <Textarea 
                        id="remark" 
                        placeholder="तुमचा शेरा येथे लिहा..." 
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                    />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="audio-review" className="flex items-center gap-2"><AudioLines /> ऑडिओ शेरा (Audio Remark)</Label>
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
