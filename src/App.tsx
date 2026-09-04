import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { NotificationProvider } from './context/NotificationContext';
import { Preloader } from './components/layout/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { EmergencyModal } from './components/emergency/EmergencyModal';
import { EPassModal } from './components/modals/EPassModal';
import { MedicalRecordsModal } from './components/modals/MedicalRecordsModal';
import { FloatingAssistantDrawer } from './components/assistant/FloatingAssistantDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { MapPage } from './pages/MapPage';
import { AssistantPage } from './pages/AssistantPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { WeatherPage } from './pages/WeatherPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminResourcesPage } from './pages/admin/AdminResourcesPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

export const App: React.FC = () => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isEPassModalOpen, setIsEPassModalOpen] = useState(false);
  const [isMedicalRecordsModalOpen, setIsMedicalRecordsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <AuthProvider>
      <LocationProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-teal-600 selection:text-white relative">
              {/* Initial GSAP Loading Preloader */}
              {!isPreloaderDone && <Preloader onComplete={() => setIsPreloaderDone(true)} />}

              {/* Redesigned Floating Navbar with Live Updates Bar */}
              <Navbar
                onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
                onOpenEPassModal={() => setIsEPassModalOpen(true)}
                onOpenMedicalRecordsModal={() => setIsMedicalRecordsModalOpen(true)}
              />

              {/* Main Content Router */}
              <div className="flex-grow">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomePage
                        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
                        onOpenEPassModal={() => setIsEPassModalOpen(true)}
                        onOpenMedicalRecords={() => setIsMedicalRecordsModalOpen(true)}
                      />
                    }
                  />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/resources/:id" element={<ResourceDetailPage />} />
                  
                  {/* Category Fast-Links */}
                  <Route path="/hospitals" element={<ResourcesPage forcedCategory="Hospitals" />} />
                  <Route path="/pharmacies" element={<ResourcesPage forcedCategory="Pharmacies" />} />
                  <Route path="/oxygen" element={<ResourcesPage forcedCategory="Oxygen" />} />
                  <Route path="/blood" element={<ResourcesPage forcedCategory="Blood Banks" />} />
                  <Route path="/food" element={<ResourcesPage forcedCategory="Food Support" />} />
                  <Route path="/shelters" element={<ResourcesPage forcedCategory="Shelters" />} />
                  <Route path="/ambulance" element={<ResourcesPage forcedCategory="Ambulances" />} />
                  <Route path="/medicines" element={<ResourcesPage forcedCategory="Medicines" />} />
                  <Route path="/vaccination" element={<ResourcesPage forcedCategory="Vaccination" />} />

                  <Route path="/map" element={<MapPage />} />
                  <Route path="/assistant" element={<AssistantPage />} />
                  <Route path="/emergency" element={<EmergencyPage onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)} />} />
                  <Route path="/complaints" element={<ComplaintsPage />} />
                  <Route path="/volunteers" element={<VolunteerPage />} />
                  <Route path="/weather" element={<WeatherPage />} />
                  
                  {/* Auth & Profile */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* Admin Suite */}
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/resources" element={<AdminResourcesPage />} />
                  <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                  <Route path="/admin/emergencies" element={<EmergencyPage onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)} />} />
                  <Route path="/admin/complaints" element={<ComplaintsPage />} />
                </Routes>
              </div>

              {/* Global Floating AI Assistant Button & Drawer */}
              <FloatingAssistantDrawer />

              {/* Emergency SOS Modal */}
              <EmergencyModal
                isOpen={isEmergencyModalOpen}
                onClose={() => setIsEmergencyModalOpen(false)}
              />

              {/* Digital E-Pass Modal */}
              <EPassModal
                isOpen={isEPassModalOpen}
                onClose={() => setIsEPassModalOpen(false)}
              />

              {/* Personal Medical Records Vault Modal */}
              <MedicalRecordsModal
                isOpen={isMedicalRecordsModalOpen}
                onClose={() => setIsMedicalRecordsModalOpen(false)}
              />

              {/* Toast Notifications */}
              <ToastContainer />

              {/* Redesigned Deep Navy Footer */}
              <Footer
                onOpenEPassModal={() => setIsEPassModalOpen(true)}
                onOpenMedicalRecordsModal={() => setIsMedicalRecordsModalOpen(true)}
              />
            </div>
          </Router>
        </NotificationProvider>
      </LocationProvider>
    </AuthProvider>
  );
};
