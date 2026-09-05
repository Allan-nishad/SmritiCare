import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/shared/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { PatientHome } from './components/patient/PatientHome';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { MobileAppExperience } from './components/mobile/MobileAppExperience';
import { DualDeviceExperience } from './components/mobile/DualDeviceExperience';
import { VoiceAssistantModal } from './components/patient/VoiceAssistantModal';
import { AlarmOverlay } from './components/patient/AlarmOverlay';
import { MusicPlayerWidget } from './components/patient/MusicPlayerWidget';
import { SimulationCenter } from './components/shared/SimulationCenter';
import { EmergencySosOverlay } from './components/patient/EmergencySosOverlay';
import { IncomingPushOverlay } from './components/patient/IncomingPushOverlay';
import { LiveSimulationBanner } from './components/shared/LiveSimulationBanner';
import { CaregiverOnboardingModal } from './components/shared/CaregiverOnboardingModal';
import { PatientFaceRecognitionModal } from './components/shared/PatientFaceRecognitionModal';
import { PhoneSeparationModal } from './components/shared/PhoneSeparationModal';

const AppContent: React.FC = () => {
  const { 
    role, 
    isOnboardingOpen, 
    setIsOnboardingOpen, 
    isFaceIdOpen, 
    setIsFaceIdOpen, 
    isPhoneSeparationOpen, 
    setIsPhoneSeparationOpen 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E] selection:bg-terracotta-200">
      {/* Real-time Global Simulation Notification Banner */}
      <LiveSimulationBanner />

      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 pb-24">
        {role === 'landing' && <LandingPage />}
        {role === 'dual' && <DualDeviceExperience />}
        {role === 'mobile' && <MobileAppExperience />}
        {role === 'patient' && <PatientHome />}
        {role === 'caregiver' && <CaregiverDashboard />}
      </main>

      {/* Fullscreen Android-like Interrupting Alarm Overlay (Specification 8 & 9) */}
      <AlarmOverlay />

      {/* Fullscreen SOS 2-Contact Fallback Calling Screen (Specification 15 & 16) */}
      <EmergencySosOverlay />

      {/* Caregiver Remote Push Voice Reminder Overlay (Specification 20) */}
      <IncomingPushOverlay />

      {/* First-Time Caregiver Onboarding / Setup Screen Modal */}
      <CaregiverOnboardingModal 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
      />

      {/* Patient Access via Face Recognition Modal */}
      <PatientFaceRecognitionModal 
        isOpen={isFaceIdOpen} 
        onClose={() => setIsFaceIdOpen(false)} 
      />

      {/* Smartband Proximity / Phone Separation Alert Modal */}
      <PhoneSeparationModal 
        isOpen={isPhoneSeparationOpen} 
        onClose={() => setIsPhoneSeparationOpen(false)} 
      />

      {/* Persistent Soothing Background Music Player Widget (Specification 23) */}
      <MusicPlayerWidget />

      {/* Multilingual Voice Assistant Modal (Specification 11 & 12) */}
      <VoiceAssistantModal />

      {/* 1-Click Human-Operated Demo & Simulation Center (Specification 39) */}
      <SimulationCenter />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
