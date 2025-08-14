
"use client"

import * as React from "react"
import Link from "next/link"
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
import { Leaf } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleLogin = () => {
    if (email === "admin@admin.com" && password === "admin") {
      router.push("/dashboard")
    } else if (email === "fieldboy@gmail.com" && password === "boy123") {
      router.push("/field-boy/dashboard")
    }
    else {
      toast({
        title: "लॉगिन अयशस्वी",
        description: "अवैध क्रेडेन्शियल्स. कृपया पुन्हा प्रयत्न करा.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline text-center">केनव्हिजन</CardTitle>
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
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  पासवर्ड विसरलात?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              लॉगिन
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            खाते नाही?{" "}
            <Link href="#" className="underline">
              साइन अप करा
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
