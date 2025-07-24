
"use client"

import * as React from "react"
import Link from "next/link"
import { PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type Survey = {
  id: string
  date: string
  farmerName: string
  village: string
  status: "Pending" | "Approved" | "Rejected"
}

const mockSurveys: Survey[] = [
  { id: "SUR001", date: "2024-07-15", farmerName: "Suresh Patil", village: "Kothari", status: "Approved" },
  { id: "SUR002", date: "2024-07-14", farmerName: "Ramesh Pawar", village: "Wadgaon", status: "Pending" },
  { id: "SUR003", date: "2024-07-13", farmerName: "Anil Jadhav", village: "Sangvi", status: "Rejected" },
  { id: "SUR004", date: "2024-07-12", farmerName: "Sunita More", village: "Kothari", status: "Approved" },
  { id: "SUR005", date: "2024-07-11", farmerName: "Kavita Deshmukh", village: "Malegaon", status: "Pending" },
]

export default function FieldBoyDashboard() {
  const [surveys, setSurveys] = React.useState<Survey[]>(mockSurveys)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.farmerName.toLowerCase().includes(search.toLowerCase()) || survey.village.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">My Surveys</h1>
          <p className="text-muted-foreground">Recent surveys submitted by you.</p>
        </div>
        <Button asChild>
          <Link href="/field-boy/dashboard/new">
            <PlusCircle className="mr-2" />
            New Survey
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Survey List</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by farmer name or village..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Farmer Name</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSurveys.length > 0 ? (
                filteredSurveys.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell>{survey.date}</TableCell>
                    <TableCell className="font-medium">{survey.farmerName}</TableCell>
                    <TableCell>{survey.village}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          survey.status === "Approved"
                            ? "default"
                            : survey.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {survey.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No surveys found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
