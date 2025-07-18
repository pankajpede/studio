"use client"

import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { BarChart3, CheckCircle2, ListTodo, Ruler, ArrowRight } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Surveys",
    value: "1,250",
    icon: <ListTodo className="h-6 w-6 text-muted-foreground" />,
    change: "+12.5%",
  },
  {
    title: "Approved Surveys",
    value: "980",
    icon: <CheckCircle2 className="h-6 w-6 text-muted-foreground" />,
    change: "+5.2%",
  },
  {
    title: "Hectares Covered",
    value: "4,521",
    icon: <Ruler className="h-6 w-6 text-muted-foreground" />,
    change: "+8.1%",
  },
  {
    title: "Yield Forecast (Tons)",
    value: "22,605",
    icon: <BarChart3 className="h-6 w-6 text-muted-foreground" />,
    change: "+2.3%",
  },
]


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle className="font-headline">All Surveys</CardTitle>
            <CardDescription>
              Browse, filter, and manage all 34 survey data points.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start gap-4">
                <p className="text-muted-foreground">The full survey table with advanced filtering and sorting is now available on the dedicated surveys page.</p>
                <Button asChild>
                    <Link href="/dashboard/surveys">
                        Go to Surveys Page <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Cutting Schedule</CardTitle>
            <CardDescription>Upcoming cane cutting dates.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md"
              onSelect={() => {}}
              disabled={(date) => date < new Date("1900-01-01")}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Survey Area Heatmap</CardTitle>
          <CardDescription>Visual representation of survey density and coverage.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="w-full h-96 rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                 <Image
                    src="https://placehold.co/1200x600.png"
                    alt="Map of survey areas"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="map satellite"
                  />
                  <p className="z-10 text-lg font-semibold text-background bg-foreground/50 px-4 py-2 rounded-md">Map Placeholder</p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
