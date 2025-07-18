"use client"

import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { BarChart3, CheckCircle2, ListTodo, Ruler } from "lucide-react"

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

const recentSurveys = [
  {
    id: "SURV-001",
    farmer: "Ramesh Kumar",
    village: "Kothari",
    area: "5.2 Acres",
    status: "Approved",
  },
  {
    id: "SURV-002",
    farmer: "Suresh Patil",
    village: "Wadgaon",
    area: "3.1 Acres",
    status: "Pending",
  },
  {
    id: "SURV-003",
    farmer: "Geeta Singh",
    village: "Sonai",
    area: "10.5 Acres",
    status: "Approved",
  },
  {
    id: "SURV-004",
    farmer: "Amit Deshmukh",
    village: "Manjari",
    area: "2.8 Acres",
    status: "Rejected",
  },
    {
    id: "SURV-005",
    farmer: "Priya Sharma",
    village: "Kothari",
    area: "7.0 Acres",
    status: "Approved",
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
            <CardTitle className="font-headline">Recent Surveys</CardTitle>
            <CardDescription>An overview of the latest farm surveys.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Survey ID</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSurveys.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell className="font-medium">{survey.id}</TableCell>
                    <TableCell>{survey.farmer}</TableCell>
                    <TableCell>{survey.village}</TableCell>
                    <TableCell>{survey.area}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          survey.status === "Approved"
                            ? "default"
                            : survey.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          survey.status === "Approved" ? "bg-green-600/20 text-green-800 border-green-600/30 hover:bg-green-600/30" 
                          : survey.status === "Pending" ? "bg-amber-500/20 text-amber-800 border-amber-500/30 hover:bg-amber-500/30" 
                          : "bg-red-500/20 text-red-800 border-red-500/30 hover:bg-red-500/30"
                        }
                      >
                        {survey.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
