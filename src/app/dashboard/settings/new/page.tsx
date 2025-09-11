
"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { masterDataMap, MasterDataKey } from "../page"
import { ArrowLeft } from "lucide-react"

const RequiredLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
    <Label htmlFor={htmlFor}>
        {children} <span className="text-red-500">*</span>
    </Label>
);

function NewMasterDataContent() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const initialConfig = searchParams.get('type') as MasterDataKey | null;
    
    const [selectedConfig, setSelectedConfig] = React.useState<MasterDataKey | null>(initialConfig);

    const [name, setName] = React.useState("");
    const [nameEn, setNameEn] = React.useState("");
    const [linkedTo, setLinkedTo] = React.useState("");
    const [maturityMonths, setMaturityMonths] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const configOptions = Object.keys(masterDataMap).map(key => ({
        value: key as MasterDataKey,
        label: masterDataMap[key as MasterDataKey].label,
    }));

    const entityInfo = selectedConfig ? masterDataMap[selectedConfig] : null;
    const entityType = entityInfo?.entityName;

    const getLinkedEntityInfo = () => {
        if (!entityType) return { linkedEntityOptions: [], linkedEntityLabel: '', isLinkedEntityRequired: false, placeholder: '' };

        let linkedEntityOptions: { id: string; name: string }[] = [];
        let linkedEntityLabel = '';
        let isLinkedEntityRequired = false;
        let placeholder = `${entityType} निवडा`;
        
        const linkedEntityKey = entityInfo?.linkedEntity;
        if(linkedEntityKey) {
             const foundKey = Object.keys(masterDataMap).find(key => masterDataMap[key as MasterDataKey].entityName === linkedEntityKey) as MasterDataKey | undefined;
             if(foundKey) {
                linkedEntityOptions = masterDataMap[foundKey].data;
                linkedEntityLabel = `जोडलेले ${linkedEntityKey}`;
                isLinkedEntityRequired = true;
                placeholder = `${linkedEntityKey} निवडा`;
             }
        }
        return { linkedEntityOptions, linkedEntityLabel, isLinkedEntityRequired, placeholder };
    }

    const { linkedEntityOptions, linkedEntityLabel, isLinkedEntityRequired, placeholder } = getLinkedEntityInfo();

    let isFormValid = !!selectedConfig && name.trim() !== "" && nameEn.trim() !== "" && (!isLinkedEntityRequired || linkedTo);
    if (entityType === "उसाची जात") {
        isFormValid = isFormValid && maturityMonths.trim() !== "" && !isNaN(Number(maturityMonths));
    }
  
    const handleSaveClick = () => {
      if (!isFormValid) {
          toast({
              variant: "destructive",
              title: "त्रुटी",
              description: "कृपया सर्व आवश्यक फील्ड भरा."
          });
          return;
      }
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
          toast({
              title: "यशस्वी!",
              description: `${entityType} यशस्वीरित्या तयार केले आहे.`
          });
          setIsSubmitting(false);
          router.push(`/dashboard/settings?config=${selectedConfig}`);
      }, 500);
    }
    
    // Reset form fields when config changes
    React.useEffect(() => {
        setName("");
        setNameEn("");
        setLinkedTo("");
        setMaturityMonths("");
    }, [selectedConfig]);

    const renderFormFields = () => {
        if (!selectedConfig || !entityType) {
            return <p className="text-muted-foreground text-center col-span-full">कृपया एक कॉन्फिगरेशन प्रकार निवडा.</p>;
        }

        let linkedEntityElement = null;

        if (linkedEntityLabel && linkedEntityOptions.length > 0) {
            linkedEntityElement = (
                <div className="grid gap-2">
                    <RequiredLabel htmlFor="parent-entity">{linkedEntityLabel}</RequiredLabel>
                    <Select value={linkedTo} onValueChange={setLinkedTo}>
                        <SelectTrigger id="parent-entity"><SelectValue placeholder={placeholder} /></SelectTrigger>
                        <SelectContent>
                            {linkedEntityOptions.map(o => <SelectItem key={o.id} value={o.name}>{o.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            );
        }
        
        return (
            <>
                <div className="grid gap-2">
                    <RequiredLabel htmlFor="name-mr">{entityType} नाव (मराठी)</RequiredLabel>
                    <Input id="name-mr" placeholder="मराठी नाव प्रविष्ट करा" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <RequiredLabel htmlFor="name-en">{entityType} नाव (इंग्रजी)</RequiredLabel>
                    <Input id="name-en" placeholder="इंग्रजी नाव प्रविष्ट करा" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
                </div>
                {linkedEntityElement}
                {entityType === 'उसाची जात' && (
                    <div className="grid gap-2">
                        <RequiredLabel htmlFor="maturity-months">उसाची पक्वता (months)</RequiredLabel>
                        <Input
                            id="maturity-months"
                            type="number"
                            placeholder="उदा. 12"
                            value={maturityMonths}
                            onChange={(e) => setMaturityMonths(e.target.value)}
                            required
                        />
                    </div>
                )}
            </>
        );
    };


    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>नवीन मास्टर डेटा</CardTitle>
                <CardDescription>नवीन मास्टर डेटा एन्ट्री तयार करण्यासाठी तपशील भरा.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-2">
                    <RequiredLabel htmlFor="config-type">कॉन्फिगरेशन प्रकार</RequiredLabel>
                    <Select value={selectedConfig || ''} onValueChange={(value) => setSelectedConfig(value as MasterDataKey)}>
                        <SelectTrigger id="config-type">
                            <SelectValue placeholder="एक प्रकार निवडा" />
                        </SelectTrigger>
                        <SelectContent>
                             {configOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                             ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderFormFields()}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                    <Link href={`/dashboard/settings?config=${initialConfig || 'states'}`}>
                        <ArrowLeft className="mr-2" /> रद्द करा
                    </Link>
                </Button>
                <Button onClick={handleSaveClick} disabled={!isFormValid || isSubmitting}>
                    {isSubmitting ? "जतन करत आहे..." : "नवीन जोडा"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function NewMasterDataPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <NewMasterDataContent />
        </React.Suspense>
    )
}

    