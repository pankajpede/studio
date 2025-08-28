
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Leaf } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const LegalContent = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4 -mr-4">
            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 text-justify">
                {children}
            </div>
        </ScrollArea>
    </DialogContent>
);

const TermsOfService = () => (
    <>
        <p className="font-bold">Last Updated: 1 August 2024</p>
        <p>Welcome to साई शुगर ("Sai Sugar"), a service provided by Onella Soft. These Terms of Service ("Terms") govern your access to and use of our sugarcane farm survey system (the "Service"). Please read these Terms carefully.</p>
        
        <h3 className="font-bold mt-4">1. Acceptance of Terms</h3>
        <p>By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Service. You agree that you are authorized to accept these terms on behalf of the entity you represent.</p>
        
        <h3 className="font-bold mt-4">2. The Service</h3>
        <p>The Service provides a platform for managing sugarcane farm surveys, including data collection, user management, location tracking, and report generation for Sai Sugar factory. The Service is accessible via a web dashboard for administrators and a mobile application for field personnel.</p>
        
        <h3 className="font-bold mt-4">3. User Accounts & Responsibilities</h3>
        <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. You are responsible for all activities that occur under your account. You must ensure that all information you provide is accurate and up-to-date.</p>
        
        <h3 className="font-bold mt-4">4. Data Ownership and Processing</h3>
        <p><strong>Ownership:</strong> All data collected through the Service, including but not limited to farmer details, survey data, GPS coordinates, and media files ("Survey Data"), is the exclusive property of Sai Sugar factory.</p>
        <p><strong>Processing:</strong> Onella Soft processes this data on behalf of Sai Sugar to provide the Service. This includes storing, organizing, and analyzing the data to generate reports, maps, and tokens. We will not use Survey Data for any purpose other than providing and improving the Service for Sai Sugar.</p>
        
        <h3 className="font-bold mt-4">5. Data Storage and Security</h3>
        <p>We are committed to protecting your data. All data is stored on secure cloud servers with industry-standard security measures, including encryption at rest and in transit. While we take reasonable precautions, no security system is impenetrable, and we cannot guarantee the absolute security of your data. For more details, please see our Privacy Policy.</p>
        
        <h3 className="font-bold mt-4">6. Intellectual Property</h3>
        <p>The Service, including its software, design, and branding, is the exclusive intellectual property of Onella Soft. You are granted a limited, non-exclusive, non-transferable license to use the Service as intended. You may not copy, modify, distribute, sell, or lease any part of our Service or software.</p>
        
        <h3 className="font-bold mt-4">7. Limitation of Liability</h3>
        <p>The Service is provided "as is." Onella Soft and its affiliates disclaim all warranties, express or implied, including the warranty of merchantability, fitness for a particular purpose, and non-infringement. We are not liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.</p>
        
        <h3 className="font-bold mt-4">8. Governing Law and Jurisdiction</h3>
        <p>These Terms shall be governed by the laws of India, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Latur, Maharashtra, India, and the parties hereby consent to personal jurisdiction and venue therein.</p>
    </>
);

const PrivacyPolicy = () => (
    <>
        <p className="font-bold">Last Updated: 1 August 2024</p>
        <p>Onella Soft ("we," "us," or "our") is committed to protecting the privacy of the users of the साई शुगर ("Sai Sugar") application. This Privacy Policy explains how we collect, use, store, and disclose information on behalf of Sai Sugar factory.</p>

        <h3 className="font-bold mt-4">1. Information We Collect</h3>
        <p>We collect the following types of information through the Service:</p>
        <ul className="list-disc pl-6 space-y-1">
            <li><strong>Personal Identification Information:</strong> Farmer's name, contact number, address, government-issued ID numbers (e.g., Aadhaar, PAN), and bank account details for payment processing.</li>
            <li><strong>Farm & Survey Data:</strong> Geographic location (GPS coordinates), farm size, survey numbers, crop details (type, variety, condition), irrigation methods, and soil type.</li>
            <li><strong>Media Files:</strong> Photographs and audio notes of the farm, crops, documents, and individuals involved in the survey process, which may be considered personal data.</li>
            <li><strong>User Account Information:</strong> Name, email, role, and contact details for administrators and field personnel.</li>
        </ul>

        <h3 className="font-bold mt-4">2. How We Use Information</h3>
        <p>The collected data is used exclusively for the operational purposes of Sai Sugar factory, which include:</p>
        <ul className="list-disc pl-6 space-y-1">
            <li>To conduct and manage sugarcane farm surveys.</li>
            <li>To verify farmer and farm identity.</li>
            <li>To create and manage cutting tokens and gate passes.</li>
            <li>To generate analytical reports, maps, and dashboards for factory management.</li>
            <li>To facilitate communication between the factory, field personnel, and farmers.</li>
        </ul>

        <h3 className="font-bold mt-4">3. Data Processing and Storage</h3>
        <p><strong>Legal Basis:</strong> We process data based on the contractual necessity to provide the Service to Sai Sugar and for the legitimate interests of managing their operations. Where sensitive personal data is involved, processing is based on explicit consent obtained during the survey process.</p>
        <p><strong>Storage:</strong> All data is stored on secure, encrypted cloud infrastructure. We implement access controls and other technical safeguards to prevent unauthorized access.</p>
        <p><strong>Retention:</strong> Data is retained for as long as it is necessary for the operational and legal requirements of Sai Sugar factory. Upon termination of our service agreement, we will securely delete or return all data as instructed by the factory.</p>
        
        <h3 className="font-bold mt-4">4. Data Sharing and Disclosure</h3>
        <p>We do not sell or rent personal information. Data may be shared with:</p>
        <ul className="list-disc pl-6 space-y-1">
            <li>Personnel within Sai Sugar factory who have a legitimate need to access the data.</li>
            <li>Third-party service providers (e.g., cloud hosting) who are contractually bound to protect the data.</li>
            <li>Government or law enforcement agencies if required by law.</li>
        </ul>
        
        <h3 className="font-bold mt-4">5. Your Rights</h3>
        <p>As the data collected pertains to individuals, they have certain rights under applicable data protection laws. Farmers can exercise their rights, such as access or correction of their data, by contacting Sai Sugar factory's designated data protection officer.</p>
        
        <h3 className="font-bold mt-4">6. Changes to this Policy</h3>
        <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes. Your continued use of the Service after such changes constitutes your acceptance of the new Policy.</p>
    </>
);


export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  
  const handleLogin = () => {
    if (email && password) {
      if (email === 'fieldboy@gmail.com') {
        router.push('/field-boy/dashboard');
      } else if (email === 'admin@gmail.com') {
        router.push('/dashboard');
      } else if (email === 'overseer@gmail.com' && password === 'over123') {
        router.push('/overseer/dashboard');
      }
      else {
        toast({
          variant: "destructive",
          title: "लॉगिन अयशस्वी",
          description: "कृपया आपले ईमेल आणि पासवर्ड तपासा.",
        });
      }
    } else {
       toast({
          variant: "destructive",
          title: "लॉगिन अयशस्वी",
          description: "कृपया आपले ईमेल आणि पासवर्ड प्रविष्ट करा.",
        });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline text-center">साई शुगर</CardTitle>
            <CardDescription className="text-center">
              तुमच्या खात्यात प्रवेश करण्यासाठी क्रेडेन्शियल्स प्रविष्ट करा
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">ईमेल</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">पासवर्ड</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                  />
                  <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(prev => !prev)}
                  >
                      {showPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>
                लॉगिन
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="fixed bottom-4 left-0 right-0 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs h-auto p-0">Terms</Button>
            </DialogTrigger>
            <LegalContent title="Terms of Service">
              <TermsOfService />
            </LegalContent>
          </Dialog>
          <span>|</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs h-auto p-0">Policy</Button>
            </DialogTrigger>
            <LegalContent title="Privacy Policy">
              <PrivacyPolicy />
            </LegalContent>
          </Dialog>
        </div>
        <p>Developed & Maintained by Onella Soft</p>
      </footer>
    </>
  )
}
