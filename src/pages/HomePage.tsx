import React from 'react';
import { Hero } from '../components/home/Hero';
import { StatsCounter } from '../components/home/StatsCounter';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeatureCardsRow } from '../components/home/FeatureCardsRow';
import { EmergencyBanner } from '../components/home/EmergencyBanner';
import { NearbySection } from '../components/home/NearbySection';
import { MapPreviewSection } from '../components/home/MapPreviewSection';
import { WeatherWidget } from '../components/home/WeatherWidget';
import { TrustSection } from '../components/home/TrustSection';

interface HomePageProps {
  onOpenEmergency: () => void;
  onOpenEPassModal?: () => void;
  onOpenMedicalRecords?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenEmergency,
  onOpenEPassModal,
  onOpenMedicalRecords,
}) => {
  return (
    <main className="overflow-x-hidden bg-white">
      {/* 1. Hero Section with 3D Shield on Pedestal & Search */}
      <Hero
        onOpenEmergency={onOpenEmergency}
        onOpenEPassModal={onOpenEPassModal}
      />

      {/* 2. Floating 4-Metric Live Statistics Strip */}
      <StatsCounter />

      {/* 3. Find Resources Near You (6 Categorized Cards) */}
      <CategoryGrid />

      {/* 4. Action Cards (Medical Records, Chat with Doctor, Lodge Complaint) */}
      <FeatureCardsRow
        onOpenMedicalRecords={onOpenMedicalRecords}
      />

      {/* 5. 24/7 Emergency Assistance & Helpline Banner */}
      <EmergencyBanner
        onOpenEmergency={onOpenEmergency}
      />

      {/* 6. Additional Regional Discovery & Community Systems */}
      <NearbySection />
      <MapPreviewSection />
      <WeatherWidget />
      <TrustSection />
    </main>
  );
};
