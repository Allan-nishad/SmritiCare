import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/shared/Navbar';
import { OfflineStatusBar } from './components/shared/OfflineStatusBar';
import { JudgeDemoBar } from './components/shared/JudgeDemoBar';
import { LandingPage } from './components/landing/LandingPage';
import { PatientHome } from './components/patient/PatientHome';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { MobileAppExperience } from './components/mobile/MobileAppExperience';
import { DualDeviceExperience } from './components/mobile/DualDeviceExperience';
import { VoiceAssistantModal } from './components/patient/VoiceAssistantModal';

const AppContent: React.FC = () => {
  const { role } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E] selection:bg-terracotta-200">
      {/* Clean Single Navigation Bar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {role === 'landing' && <LandingPage />}
        {role === 'dual' && <DualDeviceExperience />}
        {role === 'mobile' && <MobileAppExperience />}
        {role === 'patient' && <PatientHome />}
        {role === 'caregiver' && <CaregiverDashboard />}
      </main>

      {/* Multilingual Voice Assistant Modal */}
      <VoiceAssistantModal />
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
