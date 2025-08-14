
"use client"

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (Latur, Maharashtra)
const defaultCenter = {
  lat: 18.4088,
  lng: 76.5702
};

export default function FieldBoyMap() {
  const { toast } = useToast();
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          setErrorMsg("तुमचे स्थान मिळवण्यास अक्षम. कृपया स्थान परवानग्या तपासा.");
          toast({
            variant: "destructive",
            title: "स्थान त्रुटी",
            description: "तुमचे स्थान मिळवता आले नाही. कृपया ब्राउझर सेटिंग्जमध्ये परवानगी सक्षम करा.",
          });
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setErrorMsg("या ब्राउझरमध्ये जिओलोकेशन समर्थित नाही.");
    }
  }, [toast]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script-field-boy',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  if (loadError) {
    return <div className="p-4 text-center">नकाशे लोड करताना त्रुटी. कृपया तुमचा API की तपासा.</div>;
  }
  
  if (!isLoaded) {
    return <Skeleton className="w-full h-full" />;
  }

  if (errorMsg) {
      return (
         <div className="h-full flex items-center justify-center p-4">
             <Alert variant="destructive">
              <AlertTitle>स्थान प्रवेश अक्षम</AlertTitle>
              <AlertDescription>
                {errorMsg}
              </AlertDescription>
            </Alert>
         </div>
      )
  }
  
  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || defaultCenter}
        zoom={currentPosition ? 15 : 10}
      >
        {currentPosition && (
          <Marker position={currentPosition}>
              <InfoWindow position={currentPosition}>
                  <div>
                      <p className="font-bold">तुम्ही येथे आहात</p>
                  </div>
              </InfoWindow>
          </Marker>
        )}
      </GoogleMap>
  );
}
