import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ListFilter, PlusCircle, Search } from "lucide-react";
import Link from "next/link";

const allSurveys = [
  { id: "SURV-001", farmer: "Ramesh Kumar", village: "Kothari", area: "5.2 Acres", status: "Approved", date: "2023-10-01" },
  { id: "SURV-002", farmer: "Suresh Patil", village: "Wadgaon", area: "3.1 Acres", status: "Pending", date: "2023-10-02" },
  { id: "SURV-003", farmer: "Geeta Singh", village: "Sonai", area: "10.5 Acres", status: "Approved", date: "2023-10-03" },
  { id: "SURV-004", farmer: "Amit Deshmukh", village: "Manjari", area: "2.8 Acres", status: "Rejected", date: "2023-10-04" },
  { id: "SURV-005", farmer: "Priya Sharma", village: "Kothari", area: "7.0 Acres", status: "Approved", date: "2023-10-05" },
  { id: "SURV-006", farmer: "Anjali Gupta", village: "Wadgaon", area: "4.5 Acres", status: "Pending", date: "2023-10-06" },
  { id: "SURV-007", farmer: "Vikram Rathod", village: "Sonai", area: "8.2 Acres", status: "Approved", date: "2023-10-07" },
];

export default function SurveysListPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
            <div>
                <CardTitle className="font-headline">Farm Surveys</CardTitle>
                <CardDescription>Manage and track all farm surveys.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search surveys..." className="pl-8 sm:w-[300px]" />
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                        Approved
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Rejected</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button asChild size="sm" className="h-9 gap-1">
                    <Link href="/dashboard/surveys/new">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Survey</span>
                    </Link>
                </Button>
            </div>
        </div>
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
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allSurveys.map((survey) => (
              <TableRow key={survey.id} className="cursor-pointer hover:bg-muted/50">
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
                <TableCell>{survey.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
