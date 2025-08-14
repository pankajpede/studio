
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
import { Pin, Footprints, ChevronsUpDown, Check, UploadCloud, X, File as FileIcon, PlusCircle, MinusCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mockFarmers = [
    { value: "farmer-1", label: "रमेश कुलकर्णी", mobile: "9876543210", docs: [{type: 'voter-id', number: 'ABC1234567'}] , bankName: "स्टेट बँक ऑफ इंडिया", accountNumber: "XXXX-XXXX-1234", ifsc: "SBIN0001234" },
    { value: "farmer-2", label: "सुरेश पाटील", mobile: "9876543211", docs: [{type: 'pan', number: 'BCDEF2345G'}], bankName: "HDFC बँक", accountNumber: "XXXX-XXXX-2345", ifsc: "HDFC0002345" },
    { value: "farmer-3", label: "गणेश जाधव", mobile: "9876543212", docs: [{type: 'voter-id', number: 'GHI3456789'}], bankName: "ICICI बँक", accountNumber: "XXXX-XXXX-3456", ifsc: "ICIC0003456" },
    { value: "farmer-4", label: "प्रकाश शिंदे", mobile: "9876543213", docs: [{type: 'voter-id', number: 'JKL4567890'}], bankName: "ऍक्सिस बँक", accountNumber: "XXXX-XXXX-4567", ifsc: "UTIB0004567" },
    { value: "farmer-5", label: "सचिन मोरे", mobile: "9876543214", docs: [{type: 'voter-id', number: 'MNO5678901'}], bankName: "बँक ऑफ बडोदा", accountNumber: "XXXX-XXXX-5678", ifsc: "BARB0005678" },
    { value: "farmer-6", label: "अनिल गायकवाड", mobile: "9876543215", docs: [{type: 'pan', number: 'FGHIJ6789K'}], bankName: "पंजाब नॅशनल बँक", accountNumber: "XXXX-XXXX-6789", ifsc: "PUNB0006789" },
    { value: "farmer-7", label: "दीपक चव्हाण", mobile: "9876543216", docs: [{type: 'voter-id', number: 'STU7890123'}], bankName: "कॅनरा बँक", accountNumber: "XXXX-XXXX-7890", ifsc: "CNRB0007890" },
    { value: "farmer-8", label: "संजय देशमुख", mobile: "9876543217", docs: [{type: 'voter-id', number: 'VWX8901234'}], bankName: "युनियन बँक ऑफ इंडिया", accountNumber: "XXXX-XXXX-8901", ifsc: "UBIN0008901" },
    { value: "farmer-9", label: "विशाल पवार", mobile: "9876543218", docs: [{type: 'pan', number: 'IJKLM9012N'}], bankName: "बँक ऑफ इंडिया", accountNumber: "XXXX-XXXX-9012", ifsc: "BKID0009012" },
    { value: "farmer-10", label: "अमित भोसले", mobile: "9876543219", docs: [{type: 'voter-id', number: 'BCD0123456'}], bankName: "सेंट्रल बँक ऑफ इंडिया", accountNumber: "XXXX-XXXX-0123", ifsc: "CBIN0000123" },
    { value: "farmer-11", label: "राहुल सावंत", mobile: "9876543220", docs: [{type: 'voter-id', number: 'EFG1234567'}], bankName: "इंडियन बँक", accountNumber: "XXXX-XXXX-1234", ifsc: "IDIB0001234" },
    { value: "farmer-12", label: "अजय कदम", mobile: "9876543221", docs: [{type: 'pan', number: 'LMNOP2345Q'}], bankName: "IDBI बँक", accountNumber: "XXXX-XXXX-2345", ifsc: "IBKL0002345" },
    { value: "farmer-13", label: "नितीन राऊत", mobile: "9876543222", docs: [{type: 'voter-id', number: 'KLM3456789'}], bankName: "कोटक महिंद्रा बँक", accountNumber: "XXXX-XXXX-3456", ifsc: "KKBK0003456" },
    { value: "farmer-14", label: "प्रशांत कांबळे", mobile: "9876543223", docs: [{type: 'voter-id', number: 'NOP4567890'}], bankName: "येस बँक", accountNumber: "XXXX-XXXX-4567", ifsc: "YESB0004567" },
    { value: "farmer-15", label: "मनोज जगताप", mobile: "9876543224", docs: [{type: 'pan', number: 'OPQRS5678T'}], bankName: "इंडसइंड बँक", accountNumber: "XXXX-XXXX-5678", ifsc: "INDB0005678" },
    { value: "farmer-16", label: "योगेश यादव", mobile: "9876543225", docs: [{type: 'voter-id', number: 'STU6789012'}], bankName: "RBL बँक", accountNumber: "XXXX-XXXX-6789", ifsc: "RATN0006789" },
    { value: "farmer-17", label: "महेश माने", mobile: "9876543226", docs: [{type: 'voter-id', number: 'VWX7890123'}], bankName: "फेडरल बँक", accountNumber: "XXXX-XXXX-7890", ifsc: "FDRL0007890" },
    { value: "farmer-18", label: "अमोल थोरात", mobile: "9876543227", docs: [{type: 'pan', number: 'RSTUV8901W'}], bankName: "साउथ इंडियन बँक", accountNumber: "XXXX-XXXX-8901", ifsc: "SIBL0008901" },
    { value: "farmer-19", label: "किरण साळुंखे", mobile: "9876543228", docs: [{type: 'voter-id', number: 'BCD9012345'}], bankName: "कर्नाटक बँक", accountNumber: "XXXX-XXXX-9012", ifsc: "KARB0009012" },
    { value: "farmer-20", label: "संदीप सूर्यवंशी", mobile: "9876543229", docs: [{type: 'voter-id', number: 'EFG0123456'}], bankName: "सिटी युनियन बँक", accountNumber: "XXXX-XXXX-0123", ifsc: "CIUB0000123" },
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

const FileUploadItem = ({ file, onRemove }: { file: File, onRemove: () => void }) => (
    <div className="flex items-center justify-between p-2 mt-2 border rounded-md bg-muted/50">
        <div className="flex items-center gap-2">
            <FileIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium truncate">{file.name}</span>
        </div>
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onRemove}>
            <X className="h-4 w-4" />
        </Button>
    </div>
);

export default function NewFieldSurveyPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState("farmer-selection");

    // State for each form field
    const [selectedState, setSelectedState] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [region, setRegion] = React.useState("");
    const [taluka, setTaluka] = React.useState("");
    const [village, setVillage] = React.useState("");
    const [surveyNo, setSurveyNo] = React.useState("");
    const [gatNo, setGatNo] = React.useState("");
    const [farmer, setFarmer] = React.useState("");
    
    // State for farmer info tab
    const [mobile, setMobile] = React.useState("");
    const [documents, setDocuments] = React.useState<Document[]>([{ id: 1, type: '', number: '', file: null }]);
    const [bankName, setBankName] = React.useState("");
    const [accountNumber, setAccountNumber] = React.useState("");
    const [ifscCode, setIfscCode] = React.useState("");

    const [farmerSearchOpen, setFarmerSearchOpen] = React.useState(false);
    const [villageSearchOpen, setVillageSearchOpen] = React.useState(false);

    const tabs = ["farmer-selection", "farmer-info", "farm-info", "map"];

    const handleNext = () => {
        window.scrollTo(0, 0);
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };
    
    const handleFinalSubmit = () => {
        // Logic for final submission
        console.log("Survey submitted!");
        window.scrollTo(0, 0);
        router.push('/field-boy/dashboard');
    }
    
    const selectedFarmer = mockFarmers.find(f => f.value === farmer);

    React.useEffect(() => {
        if (selectedFarmer) {
            setMobile(selectedFarmer.mobile);
            setBankName(selectedFarmer.bankName);
            setAccountNumber(selectedFarmer.accountNumber);
            setIfscCode(selectedFarmer.ifsc)
            setDocuments(selectedFarmer.docs.map((doc, index) => ({
                id: index + 1,
                type: doc.type as DocumentType,
                number: doc.number,
                file: null
            })))
        } else {
            // Clear fields if no farmer is selected
            setMobile("");
            setDocuments([{ id: 1, type: '', number: '', file: null }]);
            setBankName("");
            setAccountNumber("");
            setIfscCode("");
        }
    }, [farmer]);


    const getBreadcrumb = () => {
        const stateLabel = selectedState === 'maharashtra' ? 'महाराष्ट्र' : 'कर्नाटक';
        const districtLabel = district ? ' > लातूर' : '';
        const regionLabel = region ? ` > ${region === 'latur-east' ? 'लातूर पूर्व' : 'लातूर पश्चिम'}` : '';
        const talukaLabel = taluka ? ` > ${taluka === 'ahmedpur' ? 'अहमदपूर' : taluka === 'ausa' ? 'औसा' : 'लातूर'}` : '';
        const villageLabel = village ? ` > ${mockVillages.find(v => v.value === village)?.label}` : '';
        const surveyNoLabel = surveyNo ? ` > एसएन-${surveyNo}` : '';
        const gatNoLabel = gatNo ? ` > ${gatNo}` : '';

        return `${stateLabel}${districtLabel}${regionLabel}${talukaLabel}${villageLabel}${surveyNoLabel}${gatNoLabel}`;
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
            <CardTitle className="font-headline text-xl">नवीन शेत सर्वेक्षण</CardTitle>
            <CardDescription>नवीन सर्वेक्षणासाठी टॅबमध्ये तपशील भरा.</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="farmer-selection">शेतकरी</TabsTrigger>
            <TabsTrigger value="farmer-info">माहिती</TabsTrigger>
            <TabsTrigger value="farm-info">शेत</TabsTrigger>
            <TabsTrigger value="map">नकाशा</TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmer-selection" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="state">राज्य</Label>
                    <Select onValueChange={setSelectedState} value={selectedState}>
                        <SelectTrigger id="state"><SelectValue placeholder="राज्य निवडा..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="maharashtra">महाराष्ट्र</SelectItem>
                            <SelectItem value="karnataka">कर्नाटक</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="district">जिल्हा</Label>
                    <Select onValueChange={setDistrict} value={district} disabled={!selectedState}>
                        <SelectTrigger id="district"><SelectValue placeholder={!selectedState ? "प्रथम राज्य निवडा" : "जिल्हा निवडा..."} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latur">लातूर</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="region">रीजन</Label>
                    <Select onValueChange={setRegion} value={region} disabled={!district}>
                        <SelectTrigger id="region"><SelectValue placeholder={!district ? "प्रथम जिल्हा निवडा" : "रीजन निवडा..."} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latur-east">लातूर पूर्व</SelectItem>
                             <SelectItem value="latur-west">लातूर पश्चिम</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="taluka">तालुका</Label>
                    <Select onValueChange={setTaluka} value={taluka} disabled={!region}>
                        <SelectTrigger id="taluka"><SelectValue placeholder={!region ? "प्रथम रीजन निवडा" : "तालुका निवडा..."} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ahmedpur">अहमदपूर</SelectItem>
                            <SelectItem value="ausa">औसा</SelectItem>
                            <SelectItem value="latur">लातूर</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="village">गाव</Label>
                    <Popover open={villageSearchOpen} onOpenChange={setVillageSearchOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={villageSearchOpen}
                                className="w-full justify-between"
                                disabled={!taluka}
                            >
                                {village
                                    ? mockVillages.find((v) => v.value === village)?.label
                                    : !taluka ? "प्रथम तालुका निवडा" : "गाव निवडा..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder="गाव शोधा..." />
                                <CommandList>
                                    <CommandEmpty>गाव आढळले नाही.</CommandEmpty>
                                    <CommandGroup>
                                        {mockVillages.map((v) => (
                                        <CommandItem
                                            key={v.value}
                                            value={v.value}
                                            onSelect={(currentValue) => {
                                                setVillage(currentValue === village ? "" : currentValue)
                                                setVillageSearchOpen(false)
                                            }}
                                        >
                                            <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                village === v.value ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                            {v.label}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="survey-no">सर्वेक्षण क्र.</Label>
                     <Select onValueChange={setSurveyNo} value={surveyNo} disabled={!village}>
                        <SelectTrigger id="survey-no"><SelectValue placeholder={!village ? "प्रथम गाव निवडा" : "सर्वेक्षण क्रमांक निवडा"} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="१०१">एसएन-१०१</SelectItem>
                            <SelectItem value="१०२">एसएन-१०२</SelectItem>
                            <SelectItem value="१०३">एसएन-१०३</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="gat-no">गट क्र.</Label>
                     <Select onValueChange={setGatNo} value={gatNo} disabled={!surveyNo}>
                        <SelectTrigger id="gat-no"><SelectValue placeholder={!surveyNo ? "प्रथम सर्वेक्षण क्र. निवडा" : "गट क्रमांक निवडा"} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="१">१</SelectItem>
                            <SelectItem value="२">२</SelectItem>
                            <SelectItem value="३">३</SelectItem>
                            <SelectItem value="४">४</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="farmer-selection">शेतकरी निवड</Label>
                    <Popover open={farmerSearchOpen} onOpenChange={setFarmerSearchOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={farmerSearchOpen}
                                className="w-full justify-between"
                                disabled={!gatNo}
                            >
                                {farmer
                                    ? mockFarmers.find((f) => f.value === farmer)?.label
                                    : !gatNo ? "प्रथम गट क्र. निवडा" : "शेतकरी निवडा..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder="शेतकरी शोधा..." />
                                <CommandList>
                                    <CommandEmpty>शेतकरी आढळला नाही.</CommandEmpty>
                                    <CommandGroup>
                                        {mockFarmers.map((f) => (
                                        <CommandItem
                                            key={f.value}
                                            value={f.value}
                                            onSelect={(currentValue) => {
                                                setFarmer(currentValue === farmer ? "" : currentValue)
                                                setFarmerSearchOpen(false)
                                            }}
                                        >
                                            <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                farmer === f.value ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                            {f.label}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="farmer-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="mobile">मोबाइल नंबर</Label>
                    <Input id="mobile" type="tel" placeholder="मोबाइल नंबर टाका" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                 <div className="md:col-span-2 grid gap-4">
                     <Label>ओळखपत्र</Label>
                     {documents.map((doc, index) => (
                         <div key={doc.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
                            <Select
                                value={doc.type}
                                onValueChange={(value: DocumentType) => handleDocumentChange(doc.id, 'type', value)}
                            >
                                <SelectTrigger><SelectValue placeholder="ओळखपत्राचा प्रकार" /></SelectTrigger>
                                <SelectContent>
                                    {getAvailableDocTypes(doc.type).map(docType => (
                                        <SelectItem key={docType.value} value={docType.value}>{docType.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input 
                                placeholder="ओळखपत्र क्रमांक"
                                value={doc.number}
                                onChange={(e) => handleDocumentChange(doc.id, 'number', e.target.value)}
                            />
                            
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
                            
                            {documents.length > 1 && (
                                 <Button variant="ghost" size="icon" onClick={() => handleRemoveDocument(doc.id)}>
                                    <MinusCircle className="text-destructive" />
                                 </Button>
                            )}
                            {doc.file && (
                                <div className="sm:col-span-full">
                                    <FileUploadItem file={doc.file} onRemove={() => handleDocumentChange(doc.id, 'file', null)} />
                                </div>
                            )}
                         </div>
                     ))}
                     {documents.length < documentTypes.length && (
                        <Button variant="outline" onClick={handleAddDocument} className="w-full sm:w-auto justify-self-start">
                           <PlusCircle className="mr-2"/> आणखी जोडा
                        </Button>
                     )}
                 </div>
                <div className="grid gap-2">
                    <Label htmlFor="bank-name">बँकेचे नाव</Label>
                    <Input id="bank-name" placeholder="बँकेचे नाव टाका" value={bankName} onChange={(e) => setBankName(e.target.value)} />
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
          </TabsContent>

          <TabsContent value="farm-info" className="pt-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="area">क्षेत्र (एकरमध्ये)</Label>
                    <Input id="area" type="number" placeholder="उदा. २.५" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="crop-type">पिकाचा प्रकार</Label>
                    <Select>
                        <SelectTrigger id="crop-type"><SelectValue placeholder="पिकाचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="plant">रोप</SelectItem>
                            <SelectItem value="ratoon">खोडवा</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="soil-type">मातीचा प्रकार</Label>
                     <Select>
                        <SelectTrigger id="soil-type"><SelectValue placeholder="मातीचा प्रकार निवडा" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="black-cotton">काळी कापूस</SelectItem>
                            <SelectItem value="red-loam">लाल चिकणमाती</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="irrigation-type">सिंचनाचा प्रकार</Label>
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

          <TabsContent value="map" className="pt-6">
            <div className="flex flex-col items-center gap-4">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">नकाशा पूर्वावलोकन येथे असेल</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button variant="outline" className="w-full"><Pin className="mr-2" /> ड्रॉ बटण</Button>
                    <Button variant="outline" className="w-full"><Footprints className="mr-2" /> वॉक बटण</Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button variant="outline" asChild>
            <Link href="/field-boy/dashboard">रद्द करा</Link>
        </Button>
        {activeTab !== 'map' ? (
             <Button onClick={handleNext}>जतन करा आणि पुढे जा</Button>
        ) : (
             <Button onClick={handleFinalSubmit}>सर्वेक्षण सबमिट करा</Button>
        )}
      </CardFooter>
    </Card>
  )
}
