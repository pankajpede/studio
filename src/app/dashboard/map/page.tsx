
"use client"

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SurveyMap from '@/components/survey-map';
import type { Survey } from '../page';

// This is the same mock data generation function from the dashboard page.
// In a real application, you would fetch this data from a shared service or API.
const generateSurveyData = (count: number): Survey[] => {
  const data: Survey[] = [];
  const fieldBoys = ["Sunil Pawar", "Anil Shinde", "Rajesh Patil", "Kavita Jadhav"];
  const warshirs = ["Mahesh Deshmukh", "Sanjay Gaikwad", "Vikram Rathod", "Pooja Chavan"];
  const farmerFirstNames = ["Ramesh", "Suresh", "Ganesh", "Priya", "Prakash", "Anita", "Sachin", "Deepa"];
  const farmerLastNames = ["Kulkarni", "Patil", "Jadhav", "Shinde", "More", "Gaikwad", "Chavan", "Deshmukh"];
  const plantationTypes = ["Adsali", "Pre-seasonal", "Suru"];


  for (let i = 1; i <= count; i++) {
    const status = i % 3 === 0 ? "Rejected" : i % 2 === 0 ? "Pending" : "Approved";
    const village = ["Chakur", "Ahmedpur", "Udgir", "Nilanga"][i % 4];
    const taluka = ["Latur", "Ausa", "Udgir", "Nilanga"][i % 4];
    data.push({
      surveyId: `SURV-${String(i).padStart(3, '0')}`,
      surveyDate: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      surveyStatus: status,
      surveyStage: i % 2 === 0 ? "Data Entry" : "Completed",
      surveyedBy: fieldBoys[i % 4],
      warshir: warshirs[i % 4],
      reassignedTo: i % 5 === 0 ? fieldBoys[(i + 1) % 4] : "-",
      lastUpdated: `2023-10-${String((i % 30) + 2).padStart(2, '0')}`,
      farmerName: `${farmerFirstNames[i % farmerFirstNames.length]} ${farmerLastNames[i % farmerLastNames.length]}`,
      farmerContact: `9876543${String(i).padStart(3, '0')}`,
      state: "Maharashtra",
      district: "Latur",
      division: "Pune Division",
      taluka: taluka,
      village: village,
      shiwar: `Shiwar ${(i % 5) + 1}`,
      gatGroupNumber: `GAT-${String(123 + i)}`,
      surveyNumber: `SN-${String(456 + i)}`,
      areaHector: Number((Math.random() * 2 + 0.5).toFixed(2)),
      gpsCoordinates: `${(18.4088 + (Math.random() - 0.5) * 0.5).toFixed(4)}, ${(76.5702 + (Math.random() - 0.5) * 0.5).toFixed(4)}`,
      caneType: ["Adsali", "Pre-seasonal", "Suru"][i % 3],
      caneVariety: ["Co-86032", "CoM-0265", "MS-10001"][i % 3],
      cropCondition: ["Good", "Average", "Poor"][i % 3],
      photoCount: Math.floor(Math.random() * 5) + 1,
      approvedBy: status === "Approved" ? "Admin" : "-",
      approvalStatus: status,
      rejectionReason: status === "Rejected" ? "Incorrect Information" : "-",
      tokenNumber: status === "Approved" ? `TKN-${String(789 + i)}` : "-",
      tokenDate: status === "Approved" ? `2023-10-${String((i % 30) + 3).padStart(2, '0')}` : "-",
      otpVerified: i % 2 === 0 ? "Yes" : "No",
      cuttingPhotoUploaded: i % 2 === 0 ? "Yes" : "No",
      tonnageReceived: status === "Approved" ? Math.floor(Math.random() * 100 + 150) : 0,
      gatePassEntryDate: status === "Approved" ? `2023-11-${String((i % 28) + 1).padStart(2, '0')}` : "-",
      submittedFrom: i % 2 === 0 ? "Mobile" : "Web",
      offlineSync: i % 3 === 0 ? "Yes" : "No",
      createdOn: `2023-10-${String((i % 30) + 1).padStart(2, '0')}`,
      updatedBy: ["Sunil Pawar", "Anil Shinde", "Admin"][i % 3],
      voiceNoteUploaded: i % 4 === 0 ? "Yes" : "No",
      aadhaarNumber: `XXXX-XXXX-${String(1000 + i)}`,
      saatBaaraNumber: `SB-${String(2000 + i)}`,
      plantationType: plantationTypes[i % 3],
      cuttingNumber: (i % 5) + 1,
    });
  }
  return data;
};


export default function SurveyMapPage() {
    const [surveys, setSurveys] = React.useState<Survey[]>([]);

    React.useEffect(() => {
        // Fetch or generate survey data
        setSurveys(generateSurveyData(100));
    }, []);

    return (
        <Card className="h-[calc(100vh-10rem)] flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline">Survey Area Map</CardTitle>
                <CardDescription>A visual representation of survey density in Latur, Maharashtra.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="w-full h-full rounded-lg overflow-hidden relative bg-muted flex items-center justify-center">
                    <SurveyMap surveys={surveys} />
                </div>
            </CardContent>
        </Card>
    );
}
