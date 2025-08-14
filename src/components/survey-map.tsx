
"use client"

import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import type { Survey } from '@/app/dashboard/page';
import { Skeleton } from './ui/skeleton';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Latur, Maharashtra
const center = {
  lat: 18.4088,
  lng: 76.5702
};

interface SurveyMapProps {
    surveys: Survey[];
}

export default function SurveyMap({ surveys }: SurveyMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const markers = surveys.map((survey) => {
    const [lat, lng] = survey.gpsCoordinates.split(',').map(Number);
    if(isNaN(lat) || isNaN(lng)) return null;

    return {
        ...survey,
        position: { lat, lng }
    }
  }).filter(Boolean) as (Survey & { position: { lat: number, lng: number }})[];

  const handleMouseOver = (markerId: string) => {
    setActiveMarker(markerId);
  };

  const handleMouseOut = () => {
    setActiveMarker(null);
  };

  if (loadError) {
    return <div>नकाशे लोड करताना त्रुटी. कृपया तुमचा API की तपासा.</div>;
  }
  
  if (!isLoaded) {
    return <Skeleton className="w-full h-full" />;
  }
  
  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.surveyId}
            position={marker.position}
            onMouseOver={() => handleMouseOver(marker.surveyId)}
            onMouseOut={handleMouseOut}
          >
            {activeMarker === marker.surveyId && (
              <InfoWindow
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="p-1 max-w-xs">
                  <h3 className="font-bold text-md mb-1">{marker.farmerName}</h3>
                  <p className="text-sm"><strong>क्षेत्र:</strong> {marker.areaAcre} एकर</p>
                  <p className="text-sm"><strong>उसाचा प्रकार:</strong> {marker.caneType}</p>
                  <p className="text-sm"><strong>सर्वेक्षण तारीख:</strong> {marker.surveyDate}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
  );
}
