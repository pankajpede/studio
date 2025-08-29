
"use client"

import * as React from "react"
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
import { useToast } from "@/hooks/use-toast"
import { KeyRound, User, Eye, EyeOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


// Mock data for the logged-in field boy
const fieldBoyData = {
  name: "सुनील पवार",
  email: "fieldboy@gmail.com",
  mobile: "9876543210",
  taluka: "अहमदपूर",
  village: "मोहगाव",
  reportsTo: "महेश देशमुख (वारशिर)",
  avatarUrl: "https://placehold.co/100x100.png",
}

type PasswordStrength = 'none' | 'poor' | 'weak' | 'strong';

const checkPasswordStrength = (password: string): { strength: PasswordStrength, text: string, score: number } => {
    if (!password) return { strength: 'none', text: '', score: 0 };
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isLongEnough = password.length >= 7;

    const score = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, isLongEnough].filter(Boolean).length;

    if (score === 5) return { strength: 'strong', text: 'मजबूत', score };
    if (score >= 3) return { strength: 'weak', text: 'कमकुवत', score };
    return { strength: 'poor', text: 'खराब', score };
};


export default function FieldBoyProfilePage() {
  const { toast } = useToast()
  
  // State for mobile number OTP
  const [originalMobile] = React.useState(fieldBoyData.mobile);
  const [mobile, setMobile] = React.useState(fieldBoyData.mobile);
  const [isOtpModalOpen, setIsOtpModalOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [timer, setTimer] = React.useState(30);
  const [canResend, setCanResend] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // State for password fields
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordStrength, setPasswordStrength] = React.useState<PasswordStrength>('none');
  const [strengthText, setStrengthText] = React.useState("");

  const isMobileChanged = mobile !== originalMobile && /^\d{10}$/.test(mobile);
  
  const startTimer = () => {
    setCanResend(false);
    setTimer(30);
    timerRef.current = setInterval(() => {
        setTimer(prev => {
            if (prev <= 1) {
                clearInterval(timerRef.current!);
                setCanResend(true);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
  };
  
  const handleSendOtp = () => {
    setIsOtpModalOpen(true);
    startTimer();
    toast({
        title: "OTP पाठवला",
        description: `तुमच्या मोबाईल नंबर ${mobile} वर एक OTP पाठवला आहे.`,
    });
  }

  const handleVerifyOtp = () => {
    if (otp === "1234") {
        toast({
            title: "यशस्वी!",
            description: "तुमचा मोबाईल नंबर यशस्वीरित्या सत्यापित झाला आहे.",
        });
        setIsOtpModalOpen(false);
        // Here you would typically update the user's mobile number in the backend.
        // For this mock, we'll just log it.
        console.log("Mobile number updated to:", mobile);
    } else {
        toast({
            variant: "destructive",
            title: "चुकीचा OTP",
            description: "तुम्ही टाकलेला OTP चुकीचा आहे. कृपया पुन्हा प्रयत्न करा.",
        });
    }
  }
  
  const handleResendOtp = () => {
      startTimer();
      toast({
        title: "OTP पुन्हा पाठवला",
        description: `तुमच्या मोबाईल नंबर ${mobile} वर एक नवीन OTP पाठवला आहे.`,
    });
  }
  
  React.useEffect(() => {
    return () => {
        if(timerRef.current) clearInterval(timerRef.current);
    }
  }, [])

  React.useEffect(() => {
      const { strength, text } = checkPasswordStrength(newPassword);
      setPasswordStrength(strength);
      setStrengthText(text);
  }, [newPassword]);


  const handleUpdateProfile = () => {
    toast({
      title: "प्रोफाइल अद्यतनित",
      description: "तुमची प्रोफाइल माहिती जतन केली आहे.",
    })
  }

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
        toast({
            variant: "destructive",
            title: "त्रुटी",
            description: "कृपया सर्व पासवर्ड फील्ड भरा."
        });
        return;
    }

    if (newPassword !== confirmPassword) {
        toast({
            variant: "destructive",
            title: "त्रुटी",
            description: "नवीन पासवर्ड आणि पुष्टी पासवर्ड जुळत नाहीत."
        });
        return;
    }

    const { score } = checkPasswordStrength(newPassword);
    if (score < 5) {
         toast({
            variant: "destructive",
            title: "कमकुवत पासवर्ड",
            description: "कृपया पासवर्ड आवश्यकता पूर्ण करा."
        });
        return;
    }

    // Add password change logic here
    toast({
      title: "पासवर्ड बदलला",
      description: "तुमचा पासवर्ड यशस्वीरित्या अद्यतनित केला आहे.",
    });

    // Clear fields after successful change
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }
  
  const strengthColorClasses = {
      none: 'text-muted-foreground',
      poor: 'text-red-500',
      weak: 'text-yellow-500',
      strong: 'text-green-500',
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">तुमचे प्रोफाइल</CardTitle>
            </div>
            <CardDescription>तुमची वैयक्तिक माहिती पहा आणि संपादित करा.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">पूर्ण नाव</Label>
              <Input id="name" defaultValue={fieldBoyData.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input id="email" type="email" placeholder="ईमेल पत्ता टाका" defaultValue={fieldBoyData.email} />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="mobile">मोबाइल नंबर</Label>
                <Button variant="link" size="sm" className="h-auto p-0" disabled={!isMobileChanged} onClick={handleSendOtp}>
                  OTP पाठवा
                </Button>
              </div>
              <Input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">तालुका</Label>
              <Input id="taluka" defaultValue={fieldBoyData.taluka} disabled />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="village">गाव</Label>
              <Input id="village" defaultValue={fieldBoyData.village} disabled />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="reportsTo">रिपोर्ट्स</Label>
              <Input id="reportsTo" defaultValue={fieldBoyData.reportsTo} disabled />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleUpdateProfile}>बदल जतन करा</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-4">
              <KeyRound className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">पासवर्ड बदला</CardTitle>
            </div>
            <CardDescription className="text-xs">
              किमान ७ अक्षरे, एक अप्परकेस, एक लोअरकेस आणि एक विशेष वर्ण आवश्यक आहे.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="current-password">सध्याचा पासवर्ड</Label>
               <div className="relative">
                  <Input 
                      id="current-password" 
                      type={showCurrentPassword ? "text" : "password"} 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="सध्याचा पासवर्ड टाका"
                  />
                  <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowCurrentPassword(prev => !prev)}
                  >
                      {showCurrentPassword ? <EyeOff /> : <Eye />}
                  </Button>
              </div>
            </div>
            <div /> 
            <div className="grid gap-2">
              <Label htmlFor="new-password">नवीन पासवर्ड</Label>
              <div className="relative">
                  <Input 
                      id="new-password" 
                      type={showNewPassword ? "text" : "password"} 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="नवीन पासवर्ड टाका"
                  />
                   <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowNewPassword(prev => !prev)}
                  >
                      {showNewPassword ? <EyeOff /> : <Eye />}
                  </Button>
              </div>
               {passwordStrength !== 'none' && (
                  <div className="flex items-center gap-2 text-xs">
                      <span>पासवर्डची ताकद:</span>
                      <span className={strengthColorClasses[passwordStrength]}>{strengthText}</span>
                  </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">नवीन पासवर्डची पुष्टी करा</Label>
              <div className="relative">
                  <Input 
                      id="confirm-password" 
                      type={showConfirmPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="नवीन पासवर्डची पुष्टी करा"
                  />
                   <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                  >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
              </div>
            </div>
          </CardContent>
           <CardFooter className="flex justify-end">
            <Button onClick={handleChangePassword}>पासवर्ड अद्यतनित करा</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>OTP सत्यापित करा</DialogTitle>
                <DialogDescription>
                    तुमच्या मोबाईल नंबरवर पाठवलेला ४-अंकी OTP टाका.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
                <Input
                    id="otp"
                    maxLength={4}
                    placeholder="****"
                    className="w-32 text-center text-2xl font-mono tracking-[1rem]"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                 <div className="text-sm text-muted-foreground">
                    {canResend ? (
                        <Button variant="link" className="p-0 h-auto" onClick={handleResendOtp}>
                            OTP पुन्हा पाठवा
                        </Button>
                    ) : (
                        <span>{`OTP पुन्हा पाठवण्यासाठी ${timer} सेकंद थांबा`}</span>
                    )}
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOtpModalOpen(false)}>रद्द करा</Button>
                <Button type="submit" onClick={handleVerifyOtp}>सत्यापित करा</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
