
"use client"

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
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
    onDistanceChange?: (distance: string) => void;
}

const FieldBoyMap = forwardRef(({ showDistance = false, farmLocation, onDistanceChange }: FieldBoyMapProps, ref) => {
  const { toast } = useToast();
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ['geometry']
  });
  
  const calculateDistance = React.useCallback((pos1: google.maps.LatLngLiteral, pos2: google.maps.LatLngLiteral) => {
    if (window.google && window.google.maps && window.google.maps.geometry) {
        const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(pos1),
            new google.maps.LatLng(pos2)
        );
        
        if (distanceInMeters >= 1000) {
            return `${(distanceInMeters / 1000).toFixed(2)} km`;
        } else {
            return `${Math.round(distanceInMeters)} m`;
        }
    }
    return null;
  }, []);

  const getLocation = React.useCallback(() => {
    if (navigator.geolocation) {
      setIsFetching(true);
      setErrorMsg(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = { lat: latitude, lng: longitude };
          setCurrentPosition(newPos);
          setErrorMsg(null);
          setIsFetching(false);
          toast({
            title: "स्थान अद्यतनित केले",
            description: "तुमचे वर्तमान स्थान यशस्वीरित्या लोड झाले आहे.",
          });
          if (farmLocation && onDistanceChange) {
              const distance = calculateDistance(newPos, farmLocation);
              if(distance) onDistanceChange(distance);
          }
        },
        (error) => {
          setErrorMsg("तुमचे स्थान मिळवण्यास अक्षम. कृपया स्थान परवानग्या तपासा.");
          setIsFetching(false);
          toast({
            variant: "destructive",
            title: "स्थान त्रुटी",
            description: "तुमचे स्थान मिळवता आले नाही. कृपया ब्राउझर सेटिंग्जमध्ये परवानगी सक्षम करा.",
          });
          console.error("Geolocation error:", error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setErrorMsg("या ब्राउझरमध्ये जिओलोकेशन समर्थित नाही.");
      setIsFetching(false);
    }
  }, [toast, farmLocation, onDistanceChange, calculateDistance]);
  
  useImperativeHandle(ref, () => ({
    refreshLocation: () => {
      getLocation();
    }
  }));

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (isLoaded && currentPosition && farmLocation && onDistanceChange) {
        const distance = calculateDistance(currentPosition, farmLocation);
        if(distance) onDistanceChange(distance);
    }
  }, [isLoaded, currentPosition, farmLocation, onDistanceChange, calculateDistance]);



  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Alert variant="destructive">
          <AlertTitle>Google Maps Error</AlertTitle>
          <AlertDescription>
            The map could not be loaded. This is often due to an invalid API key, missing billing information, or the Google Maps JavaScript API not being enabled in your Google Cloud project. Please check your project configuration.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!isLoaded || isFetching) {
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
            gestureHandling: 'cooperative'
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
});

FieldBoyMap.displayName = "FieldBoyMap";

export default FieldBoyMap;
