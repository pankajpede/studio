
"use client"

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
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

interface FieldBoyMapProps {
    showDistance?: boolean;
    farmLocation?: google.maps.LatLngLiteral;
}

export default function FieldBoyMap({ showDistance = false, farmLocation }: FieldBoyMapProps) {
  const { toast } = useToast();
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setErrorMsg(null);
        },
        (error) => {
          setErrorMsg("तुमचे स्थान मिळवण्यास अक्षम. कृपया स्थान परवानग्या तपासा.");
          if(currentPosition === null){ // only show toast if location was never fetched
             toast({
                variant: "destructive",
                title: "स्थान त्रुटी",
                description: "तुमचे स्थान मिळवता आले नाही. कृपया ब्राउझर सेटिंग्जमध्ये परवानगी सक्षम करा.",
            });
          }
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true }
      );
      
      return () => navigator.geolocation.clearWatch(watchId);

    } else {
      setErrorMsg("या ब्राउझरमध्ये जिओलोकेशन समर्थित नाही.");
    }
  }, [toast, currentPosition]);

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

  if (errorMsg && !currentPosition) {
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
  
  const centerMapOn = currentPosition || farmLocation || defaultCenter;

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerMapOn}
        zoom={currentPosition || farmLocation ? 15 : 10}
        options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }}
      >
        {currentPosition && (
          <Marker 
            position={currentPosition} 
            title="तुमचे सध्याचे स्थान"
            icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "white",
            }}
          />
        )}
        {showDistance && farmLocation && (
             <Marker position={farmLocation} title="शेताचे स्थान" />
        )}
         {showDistance && farmLocation && currentPosition && (
            <Polyline
                path={[currentPosition, farmLocation]}
                options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    icons: [{
                        icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                        offset: '100%'
                    }]
                }}
            />
        )}
      </GoogleMap>
  );
}
