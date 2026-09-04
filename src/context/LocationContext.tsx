import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  city: string;
  pincode: string;
  addressString: string;
  isDetecting: boolean;
  error: string | null;
}

interface LocationContextType extends LocationState {
  detectLocation: () => Promise<void>;
  setLocationManually: (city: string, pincode?: string) => void;
}

// Default center: Mumbai / Central City area
const DEFAULT_LOCATION = {
  latitude: 19.0760,
  longitude: 72.8777,
  city: 'Central City',
  pincode: '400001',
  addressString: 'Central City Center, MG Road',
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationState>({
    ...DEFAULT_LOCATION,
    isDetecting: false,
    error: null,
  });

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: 'Geolocation is not supported by your browser' }));
      return;
    }

    setLocation(prev => ({ ...prev, isDetecting: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let city = 'Detected Area';
        let addressString = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        try {
          // OpenStreetMap Nominatim reverse geocode free call
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const geoData = await geoRes.json();
          if (geoData && geoData.address) {
            city = geoData.address.city || geoData.address.town || geoData.address.suburb || geoData.address.state_district || 'Detected Area';
            const pincode = geoData.address.postcode || '400001';
            addressString = geoData.display_name || `${city}, ${pincode}`;
            setLocation({
              latitude,
              longitude,
              city,
              pincode,
              addressString,
              isDetecting: false,
              error: null,
            });
            return;
          }
        } catch {
          // Ignore reverse geocode failure
        }

        setLocation({
          latitude,
          longitude,
          city,
          pincode: '400001',
          addressString,
          isDetecting: false,
          error: null,
        });
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
        setLocation(prev => ({
          ...prev,
          isDetecting: false,
          error: 'Could not access GPS. Using default city area.',
        }));
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const setLocationManually = (city: string, pincode: string = '') => {
    setLocation(prev => ({
      ...prev,
      city,
      pincode,
      addressString: `${city} ${pincode}`.trim(),
    }));
  };

  useEffect(() => {
    // Attempt auto-detect on mount
    detectLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        ...location,
        detectLocation,
        setLocationManually,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
};
