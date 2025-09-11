
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
    { value: "maharashtra", label: "Maharashtra" },
];

const mockDistricts = [
    { value: "latur", label: "Latur" },
];

const mockTalukas = [
    { value: "ahmedpur", label: "Ahmedpur" },
    { value: "ausa", label: "Ausa" },
    { value: "latur", label: "Latur" },
];

const mockCircles = [
    { value: "circle-1", label: "Circle 1" },
    { value: "circle-2", label: "Circle 2" },
];

const mockGuts = [
    { value: "gut-101", label: "Gut 101" },
    { value: "gut-102", label: "Gut 102" },
];

const mockVillages = [
    { value: "chakur", label: "Chakur" },
    { value: "mohgaon", label: "Mohgaon" },
    { value: "lamjana", label: "Lamjana" },
];

const mockShivars = [
    { value: "shivar-a", label: "Shivar A" },
];

const mockSurveyNumbers = [
    { value: "sn-123", label: "SN-123" },
];

const mockFarmers = [
    { value: "farmer-1", label: "Ramesh Kulkarni" },
    { value: "farmer-2", label: "Suresh Patil" },
    { value: "farmer-3", label: "Ganesh Jadhav" },
];

const mockFieldBoys = [
    { value: "fb-1", label: "Sunil Pawar" },
    { value: "fb-2", label: "Anil Shinde" },
    { value: "fb-3", label: "Rajesh Patil" },
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
            title: "Survey Assigned!",
            description: "The survey has been successfully assigned to the field boy.",
        });
        router.push('/oversheer/dashboard');
    }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Assign New Survey</CardTitle>
        <CardDescription>Fill in the details and select a field boy for the survey.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Combobox
                    options={mockStates}
                    value={selectedState}
                    onValueChange={setSelectedState}
                    placeholder="Select state..."
                    searchPlaceholder="Search state..."
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="district">District</Label>
                <Combobox
                    options={mockDistricts}
                    value={district}
                    onValueChange={setDistrict}
                    placeholder="Select district..."
                    searchPlaceholder="Search district..."
                    disabled={!selectedState}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="taluka">Taluka</Label>
                <Combobox
                    options={mockTalukas}
                    value={taluka}
                    onValueChange={setTaluka}
                    placeholder="Select taluka..."
                    searchPlaceholder="Search taluka..."
                    disabled={!district}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="circle">Circle</Label>
                <Combobox
                    options={mockCircles}
                    value={circle}
                    onValueChange={setCircle}
                    placeholder="Select circle..."
                    searchPlaceholder="Search circle..."
                    disabled={!taluka}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="gut">Gut</Label>
                <Combobox
                    options={mockGuts}
                    value={gut}
                    onValueChange={setGut}
                    placeholder="Select gut..."
                    searchPlaceholder="Search gut..."
                    disabled={!circle}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="village">Village</Label>
                <Combobox
                    options={mockVillages}
                    value={village}
                    onValueChange={setVillage}
                    placeholder="Select village..."
                    searchPlaceholder="Search village..."
                    disabled={!gut}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="shivar">Shivar</Label>
                <Combobox
                    options={mockShivars}
                    value={shivar}
                    onValueChange={setShivar}
                    placeholder="Select shivar..."
                    searchPlaceholder="Search shivar..."
                    disabled={!village}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="survey-number">Survey No.</Label>
                <Combobox
                    options={mockSurveyNumbers}
                    value={surveyNumber}
                    onValueChange={setSurveyNumber}
                    placeholder="Select survey no..."
                    searchPlaceholder="Search survey no..."
                    disabled={!shivar}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="farmer">Farmer</Label>
                <Combobox
                    options={mockFarmers}
                    value={farmer}
                    onValueChange={setFarmer}
                    placeholder="Select farmer..."
                    searchPlaceholder="Search farmer..."
                    disabled={!surveyNumber}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="field-boy">Field Boy</Label>
                <Combobox
                    options={mockFieldBoys}
                    value={fieldBoy}
                    onValueChange={setFieldBoy}
                    placeholder="Select field boy..."
                    searchPlaceholder="Search field boy..."
                    disabled={!farmer}
                />
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button variant="outline" asChild>
            <Link href="/oversheer/dashboard">Cancel</Link>
        </Button>
        <Button onClick={handleAssignSurvey}>Assign Survey</Button>
      </CardFooter>
    </Card>
  )
}
