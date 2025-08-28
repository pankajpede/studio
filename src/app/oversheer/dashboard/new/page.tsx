
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ChevronsUpDown, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const mockFieldBoys = [
    { value: "fb-1", label: "सुनील पवार" },
    { value: "fb-2", label: "अनिल शिंदे" },
    { value: "fb-3", label: "राजेश पाटील" },
    { value: "fb-4", label: "कविता जाधव" },
    { value: "fb-5", label: "विक्रम राठोड" },
];

const mockVillages = [
    { value: "chakur", label: "चाकूर" },
    { value: "mohgaon", label: "मोहगाव" },
    { value: "lamjana", label: "लामजना" },
];

const mockFarmers = [
    { value: "farmer-1", label: "रमेश कुलकर्णी" },
    { value: "farmer-2", label: "सुरेश पाटील" },
    { value: "farmer-3", label: "गणेश जाधव" },
];

const Combobox = ({
    options,
    value,
    onValueChange,
    placeholder,
    searchPlaceholder,
}: {
    options: { value: string; label: string }[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    searchPlaceholder: string;
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
    
    const [village, setVillage] = React.useState("");
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
        <CardDescription>सर्वेक्षणासाठी गाव, शेतकरी आणि फील्ड बॉय निवडा.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="village">गाव (Village)</Label>
                <Combobox
                    options={mockVillages}
                    value={village}
                    onValueChange={setVillage}
                    placeholder="गाव निवडा..."
                    searchPlaceholder="गाव शोधा..."
                />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="farmer">शेतकरी (Farmer)</Label>
                <Combobox
                    options={mockFarmers}
                    value={farmer}
                    onValueChange={setFarmer}
                    placeholder="शेतकरी निवडा..."
                    searchPlaceholder="शेतकरी शोधा..."
                />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="field-boy">फील्ड बॉय (Field Boy)</Label>
                <Combobox
                    options={mockFieldBoys}
                    value={fieldBoy}
                    onValueChange={setFieldBoy}
                    placeholder="फील्ड बॉय निवडा..."
                    searchPlaceholder="फील्ड बॉय शोधा..."
                />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="area">क्षेत्र (हेक्टर) (Area in Hectare)</Label>
                <Input id="area" type="number" placeholder="उदा. १.०" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="survey-number">सर्वेक्षण क्र. (Survey No.)</Label>
                <Input id="survey-number" placeholder="सर्वेक्षण क्र. टाका" />
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button variant="outline" asChild>
            <Link href="/oversheer/dashboard">रद्द करा (Cancel)</Link>
        </Button>
        <Button onClick={handleAssignSurvey}>सर्वेक्षण नियुक्त करा (Assign Survey)</Button>
      </CardFooter>
    </Card>
  )
}
