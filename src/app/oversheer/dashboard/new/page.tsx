
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
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ChevronsUpDown, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"


const mockStates = [
    { value: "maharashtra", label: "महाराष्ट्र" },
];

const mockDistricts = [
    { value: "latur", label: "लातूर" },
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
];

const mockShivars = [
    { value: "shivar-a", label: "शिवार अ" },
];

const mockSurveyNumbers = [
    { value: "sn-123", label: "SN-123" },
];

const mockFarmers = [
    { value: "farmer-1", label: "रमेश कुलकर्णी" },
    { value: "farmer-2", label: "सुरेश पाटील" },
    { value: "farmer-3", label: "गणेश जाधव" },
];

const mockFieldBoys = [
    { value: "fb-1", label: "सुनील पवार" },
    { value: "fb-2", label: "अनिल शिंदे" },
    { value: "fb-3", label: "राजेश पाटील" },
];

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

export default function AssignNewSurveyPage() {
    const router = useRouter();
    const { toast } = useToast();
    
    // State for each form field
    const [selectedState, setSelectedState] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [taluka, setTaluka] = React.useState("");
    const [circle, setCircle] = React.useState("");
    const [gut, setGut] = React.useState("");
    const [village, setVillage] = React.useState("");
    const [shivar, setShivar] = React.useState("");
    const [surveyNumber, setSurveyNumber] = React.useState("");
    const [farmer, setFarmer] = React.useState("");
    const [fieldBoy, setFieldBoy] = React.useState("");
    
    const handleAssignSurvey = () => {
        toast({
            title: "सर्वेक्षण नियुक्त केले!",
            description: "सर्वेक्षण यशस्वीरित्या फील्ड बॉयला नियुक्त केले आहे.",
        });
        router.push('/oversheer/dashboard');
    }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-xl">नवीन सर्वेक्षण नियुक्त करा</CardTitle>
        <CardDescription>सर्वेक्षणासाठी तपशील भरा आणि फील्ड बॉय निवडा.</CardDescription>
      </CardHeader>
      <CardContent>
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
                <Label htmlFor="farmer">शेतकरी</Label>
                <Combobox
                    options={mockFarmers}
                    value={farmer}
                    onValueChange={setFarmer}
                    placeholder="शेतकरी निवडा..."
                    searchPlaceholder="शेतकरी शोधा..."
                    disabled={!surveyNumber}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="field-boy">फील्ड बॉय</Label>
                <Combobox
                    options={mockFieldBoys}
                    value={fieldBoy}
                    onValueChange={setFieldBoy}
                    placeholder="फील्ड बॉय निवडा..."
                    searchPlaceholder="फील्ड बॉय शोधा..."
                    disabled={!farmer}
                />
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button variant="outline" asChild>
            <Link href="/oversheer/dashboard">रद्द करा</Link>
        </Button>
        <Button onClick={handleAssignSurvey}>सर्वेक्षण नियुक्त करा</Button>
      </CardFooter>
    </Card>
  )
}
