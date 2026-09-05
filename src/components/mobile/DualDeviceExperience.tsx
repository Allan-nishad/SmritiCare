import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHomeTab } from './tabs/MobileHomeTab';
import { MobileGamesTab } from './tabs/MobileGamesTab';
import { MobileMemoriesTab } from './tabs/MobileMemoriesTab';
import { MobileRoutineTab } from './tabs/MobileRoutineTab';
import { MobileSafetyTab } from './tabs/MobileSafetyTab';
import { MobileCaregiverTab } from './tabs/MobileCaregiverTab';
import { LanguageSelector } from '../shared/LanguageSelector';
import { translations } from '../../utils/translations';
import { 
  Smartphone, 
  Activity, 
  User, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Wifi, 
  WifiOff, 
  Signal, 
  BatteryMedium,
  Heart,
  Home,
  Brain,
  Calendar,
  Mic,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  MapPin,
  ListFilter,
  Bell
} from 'lucide-react';

export const DualDeviceExperience: React.FC = () => {
  const { 
    patient, 
    routines, 
    cognitiveSessions, 
    caregiverAlerts, 
    telemetryLogs, 
    isOffline, 
    setIsOffline, 
    setIsVoiceOpen, 
    language,
    location,
    activePatientTab,
    setActivePatientTab,
    triggerSimulation,
    alarmOverlay,
    dismissAlarm,
    snoozeAlarm
  } = useApp();

  const t = translations[language] || translations.en;

  const [showLogsDrawer, setShowLogsDrawer] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [activeCaregiverTab, setActiveCaregiverTab] = useState<'performance' | 'map' | 'patient_info'>('performance');

  const handleQuickSim = (scenario: any, label: string) => {
    triggerSimulation(scenario);
    setActiveToast(`Simulated: ${label}`);
    setTimeout(() => setActiveToast(null), 4000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#dual`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const openPatientTab = () => {
    window.open(`${window.location.origin}${window.location.pathname}#patient-phone`, '_blank');
  };

  const openCaregiverTab = () => {
    window.open(`${window.location.origin}${window.location.pathname}#caregiver-phone`, '_blank');
  };

  // Storytelling State
  const [storyIndex, setStoryIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [storyModeView, setStoryModeView] = useState<'story' | 'grid'>('story');

  const storySteps = [
    {
      id: 'caregiver_setup_express',
      stepNumber: 1,
      actNumber: 1,
      actTitle: 'Act 1: First-Time Setup & Patient Access',
      title: 'Caregiver Rapid Setup (1-Min Express)',
      badge: 'Onboarding',
      icon: '⚡',
      scenario: 'caregiver_setup_express' as const,
      targetDevice: 'Caregiver Hub' as const,
      narrative: 'Priya configures Asha\'s cognitive profile, routine schedule, geofence, and contact priorities in under 60 seconds.',
      evaluatorNote: 'Solves caregiver setup fatigue with pre-configured geriatric care templates.',
      theme: 'from-[#356859] to-[#2C574A] border-[#A8C3A0]/60'
    },
    {
      id: 'caregiver_setup_custom',
      stepNumber: 2,
      actNumber: 1,
      actTitle: 'Act 1: First-Time Setup & Patient Access',
      title: '5-Step Clinical Configuration Wizard',
      badge: 'Personalization',
      icon: '🛠️',
      scenario: 'caregiver_setup_custom' as const,
      targetDevice: 'Caregiver Hub' as const,
      narrative: 'Priya customizes in-depth medical dosage, fall-detection thresholds, safe geofence radius, and memory albums.',
      evaluatorNote: 'Comprehensive clinical personalization tailored to mild-to-moderate dementia stages.',
      theme: 'from-[#356859] to-[#2C574A] border-[#A8C3A0]/60'
    },
    {
      id: 'face_recognition',
      stepNumber: 3,
      actNumber: 1,
      actTitle: 'Act 1: First-Time Setup & Patient Access',
      title: 'Patient Facial Recognition Biometric Login',
      badge: 'Accessibility',
      icon: '📷',
      scenario: 'face_recognition' as const,
      targetDevice: 'Patient Phone' as const,
      narrative: 'Elderly patient Asha Devi unlocks and accesses her personal portal effortlessly with zero passwords via facial biometrics.',
      evaluatorNote: 'Eliminates password recall barriers completely for memory-impaired patients.',
      theme: 'from-[#356859] to-[#2C574A] border-[#A8C3A0]/60'
    },
    {
      id: 'alarm_medicine',
      stepNumber: 4,
      actNumber: 2,
      actTitle: 'Act 2: Daily Companion & Timetable Alarms',
      title: 'Morning Medicine Routine Alarm',
      badge: 'Clinical Adherence',
      icon: '🔔',
      scenario: 'alarm_medicine' as const,
      targetDevice: 'Patient Phone' as const,
      narrative: 'At 10:00 AM, Asha\'s phone sounds a high-contrast full-screen alarm with voice prompts for Donepezil 5mg.',
      evaluatorNote: 'Android-grade persistent interrupt screen that cannot be dismissed by accidental touch.',
      theme: 'from-[#D88965] to-[#B86E4B] border-[#D88965]/70'
    },
    {
      id: 'snooze_x3',
      stepNumber: 5,
      actNumber: 2,
      actTitle: 'Act 2: Daily Companion & Timetable Alarms',
      title: 'Snooze 3x Escalation Alert to Priya',
      badge: 'Auto Escalation',
      icon: '⏳',
      scenario: 'snooze_x3' as const,
      targetDevice: 'Caregiver Hub' as const,
      narrative: 'Asha snoozes her medicine 3 consecutive times; SmritiCare automatically escalates an urgent missed-dose alert to Priya.',
      evaluatorNote: 'Guarantees patient adherence without requiring constant physical caregiver presence.',
      theme: 'from-[#D88965] to-[#B86E4B] border-[#D88965]/70'
    },
    {
      id: 'family_voice_push',
      stepNumber: 6,
      actNumber: 2,
      actTitle: 'Act 2: Daily Companion & Timetable Alarms',
      title: 'Priya Pushes Calming Voice Reminder',
      badge: 'Tele-Care',
      icon: '🗣️',
      scenario: 'family_voice_push' as const,
      targetDevice: 'Patient Phone' as const,
      narrative: 'Priya sends a customized family voice note that plays directly on Asha\'s phone with soothing tones to guide her back to schedule.',
      evaluatorNote: 'Proven clinical efficacy in reducing dementia agitation through familiar family voices.',
      theme: 'from-[#356859] to-[#2C574A] border-[#A8C3A0]/60'
    },
    {
      id: 'game_adaptive_up',
      stepNumber: 7,
      actNumber: 2,
      actTitle: 'Act 2: Daily Companion & Timetable Alarms',
      title: 'Adaptive AI Cognitive Games (Level Up)',
      badge: 'Neuroplasticity',
      icon: '📈',
      scenario: 'game_adaptive_up' as const,
      targetDevice: 'Patient Phone' as const,
      narrative: 'Asha completes cognitive memory & word pairing games; the AI dynamically increases difficulty and streams performance telemetry.',
      evaluatorNote: 'Dynamic neuroplasticity training calibrated to prevent cognitive decline.',
      theme: 'from-[#5E9367] to-[#45744E] border-[#5E9367]/60'
    },
    {
      id: 'smartband_pulse',
      stepNumber: 8,
      actNumber: 3,
      actTitle: 'Act 3: IoT Smart Wearables & Critical Safety',
      title: 'Smartband BLE Vitals Stream (78 bpm)',
      badge: 'IoT Telemetry',
      icon: '📡',
      scenario: 'smartband_pulse' as const,
      targetDevice: 'Both Devices' as const,
      narrative: 'Asha\'s wearable wristband continuously broadcasts heart rate (78 bpm), steps, and fall sensor health telemetry with 0ms delay.',
      evaluatorNote: 'Zero-latency cross-device broadcast via Web Bluetooth & local sync protocol.',
      theme: 'from-[#5E9367] to-[#45744E] border-[#5E9367]/60'
    },
    {
      id: 'phone_separation',
      stepNumber: 9,
      actNumber: 3,
      actTitle: 'Act 3: IoT Smart Wearables & Critical Safety',
      title: 'Smartband Phone Separation Proximity Alert',
      badge: 'IoT Safety',
      icon: '📳',
      scenario: 'phone_separation' as const,
      targetDevice: 'Smartband IoT' as const,
      narrative: 'Asha walks outside leaving her phone behind; her smartband vibrates urgently and alerts Priya of device separation.',
      evaluatorNote: 'Crucial IoT safety innovation preventing patients from wandering unmonitored.',
      theme: 'from-[#C95C5C] to-[#A34242] border-[#C95C5C]/70'
    },
    {
      id: 'missing_patient',
      stepNumber: 10,
      actNumber: 3,
      actTitle: 'Act 3: IoT Smart Wearables & Critical Safety',
      title: 'Geofence Breach (Missing Patient 1.8km Away)',
      badge: 'Geofence Safety',
      icon: '📍',
      scenario: 'missing_patient' as const,
      targetDevice: 'Caregiver Hub' as const,
      narrative: 'Asha wanders beyond the 500m safe perimeter to 1.8km away; Priya\'s caregiver radar sounds a red alert with live GPS coordinates.',
      evaluatorNote: 'Real-time wandering detection with interactive breadcrumb tracking.',
      theme: 'from-[#D88965] to-[#B86E4B] border-[#D88965]/70'
    },
    {
      id: 'take_me_home',
      stepNumber: 11,
      actNumber: 3,
      actTitle: 'Act 3: IoT Smart Wearables & Critical Safety',
      title: 'Take Me Home Turn-by-Turn Landmark Navigation',
      badge: 'Wayfinding',
      icon: '🧭',
      scenario: 'take_me_home' as const,
      targetDevice: 'Patient Phone' as const,
      narrative: 'Asha\'s phone switches into \'Take Me Home\' mode, showing recognizable visual landmarks and audio directions back to home.',
      evaluatorNote: 'Dementia-friendly simplified navigation using visual memory anchors rather than complex maps.',
      theme: 'from-[#5E9367] to-[#45744E] border-[#5E9367]/60'
    },
    {
      id: 'sos_fallback',
      stepNumber: 12,
      actNumber: 3,
      actTitle: 'Act 3: IoT Smart Wearables & Critical Safety',
      title: 'Emergency SOS 2-Contact Fallback Cascade',
      badge: 'Life Safety',
      icon: '🚨',
      scenario: 'sos_fallback' as const,
      targetDevice: 'Patient Phone' as const,
      narrative: 'Asha triggers emergency SOS; when Primary Contact Meera is unanswered, it automatically rolls to Secondary Contact Rahul.',
      evaluatorNote: 'Fail-safe emergency cascade ensuring life safety during crises.',
      theme: 'from-[#C95C5C] to-[#A34242] border-[#C95C5C]/70'
    },
    {
      id: 'offline_toggle',
      stepNumber: 13,
      actNumber: 4,
      actTitle: 'Act 4: Rural Offline Resilience & Regional Reach',
      title: 'Simulate Network Disconnection (Offline Mode)',
      badge: 'Zero Network',
      icon: '🔌',
      scenario: 'offline_toggle' as const,
      targetDevice: 'Both Devices' as const,
      narrative: 'Internet connection is cut; SmritiCare automatically switches to local IndexedDB caching with zero crash.',
      evaluatorNote: 'Essential for remote Indian rural areas with intermittent cellular connectivity.',
      theme: 'from-[#356859] to-[#2C574A] border-[#A8C3A0]/60'
    },
    {
      id: 'sync_reconcile',
      stepNumber: 14,
      actNumber: 4,
      actTitle: 'Act 4: Rural Offline Resilience & Regional Reach',
      title: '3-Step Local Reconciliation Sync',
      badge: 'Data Integrity',
      icon: '🔄',
      scenario: 'sync_reconcile' as const,
      targetDevice: 'Both Devices' as const,
      narrative: 'Network is restored; all cached telemetry, game scores, and medication timestamps reconcile seamlessly without data loss.',
      evaluatorNote: 'Full offline-first architecture with automatic conflict resolution.',
      theme: 'from-[#356859] to-[#2C574A] border-[#A8C3A0]/60'
    },
    {
      id: 'lang_assamese',
      stepNumber: 15,
      actNumber: 4,
      actTitle: 'Act 4: Rural Offline Resilience & Regional Reach',
      title: 'Regional Language Dialect Switch (Assamese)',
      badge: 'Vernacular AI',
      icon: '🗣️',
      scenario: 'lang_assamese' as const,
      targetDevice: 'Both Devices' as const,
      narrative: 'Voice prompts and UI switch instantly to regional Indian languages (অসমীয়া) ensuring vernacular inclusivity.',
      evaluatorNote: 'Multilingual NER engine supporting diverse linguistic elderly populations across India.',
      theme: 'from-[#356859] to-[#2C574A] border-[#A8C3A0]/60'
    }
  ];

  const currentStep = storySteps[storyIndex];

  const handleNextStep = () => {
    const nextIdx = (storyIndex + 1) % storySteps.length;
    setStoryIndex(nextIdx);
    const target = storySteps[nextIdx];
    handleQuickSim(target.scenario, target.title);
  };

  const handlePrevStep = () => {
    const prevIdx = (storyIndex - 1 + storySteps.length) % storySteps.length;
    setStoryIndex(prevIdx);
    const target = storySteps[prevIdx];
    handleQuickSim(target.scenario, target.title);
  };

  const handleJumpToStep = (index: number) => {
    setStoryIndex(index);
    const target = storySteps[index];
    handleQuickSim(target.scenario, target.title);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-8 bg-gradient-to-b from-[#182320] via-[#26332F] to-[#182320] text-white flex flex-col items-center select-none">
      
      {/* Top Experience Header */}
      <div className="w-full max-w-6xl mx-auto mb-4 bg-[#26332F]/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-[#A8C3A0]/40 shadow-lg flex flex-wrap items-center justify-between gap-3">
        
        {/* Title & Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#356859] text-white flex items-center justify-center font-bold shadow-sm">
            <Smartphone className="w-5 h-5 text-[#EEF4EC]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm sm:text-base text-white font-serif">
                SmritiCare Dual-Device Presentation Stage
              </h2>
              <span className="bg-[#356859] text-[#EEF4EC] border border-[#A8C3A0]/50 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5E9367] animate-pulse" />
                <span>Live Sync Active</span>
              </span>
            </div>
            <p className="text-xs text-[#EEF4EC]/75 font-medium">
              Asha Devi (Patient Mobile) & Priya (Caregiver Hub) communicating with zero latency.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Offline */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
              isOffline
                ? 'bg-[#D88965]/30 text-[#EEF4EC] border-[#D88965] ring-1 ring-[#D88965]'
                : 'bg-[#356859] text-white border-[#A8C3A0]/40 hover:bg-[#2C574A]'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-[#D88965]" /> : <Wifi className="w-3.5 h-3.5 text-[#5E9367]" />}
            <span>{isOffline ? 'Offline Active' : 'Online'}</span>
          </button>

          {/* Popout Windows */}
          <button
            onClick={openPatientTab}
            className="px-3 py-1.5 bg-[#1F2B27] hover:bg-[#356859]/50 text-[#D88965] border border-[#A8C3A0]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            title="Open Asha's phone in a separate window"
          >
            <span>👵 Asha Phone</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={openCaregiverTab}
            className="px-3 py-1.5 bg-[#1F2B27] hover:bg-[#356859]/50 text-[#A8C3A0] border border-[#A8C3A0]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            title="Open Priya's hub in a separate window"
          >
            <span>👩‍⚕️ Priya Hub</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Toggle Telemetry Logs */}
          <button
            onClick={() => setShowLogsDrawer(!showLogsDrawer)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
              showLogsDrawer
                ? 'bg-[#D88965] text-white border-[#D88965]'
                : 'bg-[#1F2B27] text-[#EEF4EC] border-[#A8C3A0]/30 hover:bg-[#356859]'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Logs ({telemetryLogs.length})</span>
            {showLogsDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-[#356859] hover:bg-[#2C574A] text-white border border-[#A8C3A0]/40 rounded-xl text-xs font-bold transition"
            title="Copy Share Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#5E9367]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE STORYTELLING PRESENTATION CONSOLE (SETUP TO FINAL FEATURE)    */}
      {/* ========================================================================= */}
      <div className="w-full max-w-6xl mx-auto mb-6 bg-[#26332F]/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-2 border-[#A8C3A0]/50 shadow-2xl space-y-4">
        
        {/* Header: Storytelling Mode Controller */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#A8C3A0]/25">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#356859] text-white flex items-center justify-center font-bold shadow-xs">
              <Zap className="w-4 h-4 text-[#D88965]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-[#EEF4EC] tracking-tight">
                  SIH 26003 Storytelling Simulation Console
                </span>
                <span className="bg-[#356859] text-[#EEF4EC] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#A8C3A0]/50">
                  Step {currentStep.stepNumber} of {storySteps.length}
                </span>
              </div>
              <p className="text-xs text-[#A8C3A0] font-medium">
                {currentStep.actTitle}
              </p>
            </div>
          </div>

          {/* Mode Switcher (Story vs All Grid) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#1F2B27] p-1 rounded-xl border border-[#A8C3A0]/30 text-xs">
              <button
                onClick={() => setStoryModeView('story')}
                className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  storyModeView === 'story' ? 'bg-[#356859] text-white shadow-xs' : 'text-[#EEF4EC]/70 hover:text-white'
                }`}
              >
                <span>📖 Story Mode</span>
              </button>
              <button
                onClick={() => setStoryModeView('grid')}
                className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  storyModeView === 'grid' ? 'bg-[#356859] text-white shadow-xs' : 'text-[#EEF4EC]/70 hover:text-white'
                }`}
              >
                <span>🗂️ All 15 Features</span>
              </button>
            </div>

            {activeToast && (
              <span className="text-xs font-bold text-[#EEF4EC] bg-[#356859] px-3 py-1 rounded-xl border border-[#A8C3A0]/50 animate-pulse">
                ✓ {activeToast}
              </span>
            )}
          </div>
        </div>

        {/* 15-Step Interactive Timeline Dots (1 to 15) */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
          {storySteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => handleJumpToStep(idx)}
              className={`flex-1 min-w-[32px] sm:min-w-[38px] py-1.5 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-0.5 border ${
                storyIndex === idx
                  ? 'bg-[#356859] text-white border-[#A8C3A0] ring-2 ring-[#A8C3A0] scale-105 shadow-md'
                  : 'bg-[#1F2B27] text-[#EEF4EC]/60 border-[#A8C3A0]/20 hover:text-[#EEF4EC] hover:bg-[#356859]/30'
              }`}
              title={`Step ${step.stepNumber}: ${step.title}`}
            >
              <span className="text-[10px]">{step.icon}</span>
              <span className="text-[10px] font-mono">{step.stepNumber}</span>
            </button>
          ))}
        </div>

        {/* STORY WALKTHROUGH CARD */}
        {storyModeView === 'story' ? (
          <div className="bg-[#1F2B27] rounded-2xl p-4 sm:p-5 border border-[#A8C3A0]/40 shadow-inner flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Story Narrative Content */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg">{currentStep.icon}</span>
                <h3 className="font-extrabold text-base sm:text-lg text-white font-serif">
                  Step {currentStep.stepNumber}: {currentStep.title}
                </h3>
                <span className="bg-[#356859] text-[#EEF4EC] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#A8C3A0]/40">
                  Target: {currentStep.targetDevice}
                </span>
                <span className="bg-[#D88965]/20 text-[#D88965] border border-[#D88965]/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {currentStep.badge}
                </span>
              </div>

              {/* Story Line */}
              <p className="text-sm text-[#EEF4EC] leading-relaxed font-medium">
                "{currentStep.narrative}"
              </p>

              {/* Evaluator Insight */}
              <div className="bg-[#26332F] p-2.5 rounded-xl border border-[#A8C3A0]/30 text-xs text-[#A8C3A0] flex items-center gap-2">
                <span className="font-bold text-[#D88965] shrink-0">💡 Pitch Note:</span>
                <span className="text-[#EEF4EC]/85">{currentStep.evaluatorNote}</span>
              </div>
            </div>

            {/* Navigation & Action Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={handlePrevStep}
                className="px-3.5 py-2.5 bg-[#26332F] hover:bg-[#356859]/50 text-[#EEF4EC] border border-[#A8C3A0]/40 rounded-xl text-xs font-bold transition active:scale-95"
              >
                ◀ Prev Step
              </button>

              <button
                onClick={() => handleQuickSim(currentStep.scenario, currentStep.title)}
                className="px-4 py-2.5 bg-[#D88965] hover:bg-[#C4724D] text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Simulate Step {currentStep.stepNumber}</span>
              </button>

              <button
                onClick={handleNextStep}
                className="px-4 py-2.5 bg-[#356859] hover:bg-[#2C574A] text-white border border-[#A8C3A0]/50 rounded-xl text-xs font-bold transition active:scale-95 shadow-md flex items-center gap-1.5"
              >
                <span>Next Step ▶</span>
              </button>
            </div>

          </div>
        ) : (
          /* GRID VIEW OF ALL 15 FEATURES */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto no-scrollbar pt-1">
            {storySteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => handleJumpToStep(idx)}
                className={`p-3 bg-[#1F2B27] border rounded-2xl transition active:scale-95 text-left flex items-start gap-2.5 shadow-xs ${
                  storyIndex === idx ? 'border-[#356859] ring-2 ring-[#A8C3A0] bg-[#356859]/20' : 'border-[#A8C3A0]/30 hover:border-[#A8C3A0]'
                }`}
              >
                <span className="text-xl shrink-0 mt-0.5">{step.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#A8C3A0]">#{step.stepNumber}</span>
                    <span className="font-bold text-xs text-white truncate">{step.title}</span>
                  </div>
                  <p className="text-[11px] text-[#EEF4EC]/65 line-clamp-1 mt-0.5">{step.narrative}</p>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Collapsible Logs Drawer */}
      {showLogsDrawer && (
        <div className="w-full max-w-6xl mx-auto mb-6 bg-[#26332F] rounded-2xl p-4 border border-[#A8C3A0]/40 shadow-2xl space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#A8C3A0]/20">
            <span className="text-xs font-bold uppercase text-[#A8C3A0] tracking-wider">
              Real-Time Cross-Device Telemetry Logs
            </span>
            <span className="text-[10px] font-mono text-[#5E9367]">Zero-Latency Local Broadcast</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto no-scrollbar pt-1">
            {telemetryLogs.slice(0, 9).map((log) => (
              <div 
                key={log.id}
                className="bg-[#1F2B27] p-2.5 rounded-xl border border-[#A8C3A0]/30 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[#EEF4EC]/70">
                  <span className="font-mono text-[10px] text-[#D88965]">{log.timestamp}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                    log.source === 'patient' 
                      ? 'bg-[#D88965]/20 text-[#D88965]'
                      : log.source === 'caregiver'
                      ? 'bg-[#A8C3A0]/20 text-[#A8C3A0]'
                      : 'bg-[#356859] text-[#EEF4EC]'
                  }`}>
                    {log.source}
                  </span>
                </div>
                <div className="font-bold text-[#EEF4EC] text-xs truncate">{log.title}</div>
                <div className="text-[11px] text-[#EEF4EC]/60 truncate">{log.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Main 2-Phone Stage Display (Left: Asha, Right: Priya) */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        
        {/* ========================================================= */}
        {/* DEVICE 1: ASHA DEVI (PATIENT PHONE)                       */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center w-full max-w-[410px]">
          
          <div className="mb-2.5 flex items-center justify-between w-full px-2 text-xs font-bold text-terracotta-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta-500 animate-ping" />
              <span className="text-sm font-black font-serif">Asha Devi (Patient Mobile)</span>
            </div>
            <span className="text-stone-400 text-xs font-medium">Guwahati Space</span>
          </div>

          {/* Smartphone Frame 1 */}
          <div className="w-full relative rounded-[3rem] border-[10px] border-[#292624] ring-1 ring-white/10 bg-[#FAF7F2] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <div className="w-22 h-4.5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                <div className="w-2 h-2 rounded-full bg-stone-900 ring-1 ring-terracotta-500/50" />
              </div>
            </div>

            {/* Screen Viewport */}
            <div className="h-[710px] flex flex-col justify-between overflow-hidden relative text-[#2C241E] select-none bg-[#FAF7F2]">
              
              {/* Native Status Bar */}
              <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-stone-800 shrink-0 z-30">
                <span className="font-mono text-xs font-bold">09:41</span>
                <div className="flex items-center gap-1.5 text-stone-700">
                  {isOffline ? (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-full">Offline</span>
                  ) : (
                    <span className="text-[10px] font-bold text-stone-600">5G</span>
                  )}
                  <Signal className="w-3.5 h-3.5" />
                  {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5" />}
                  <BatteryMedium className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* Mobile App Header */}
              <div className="px-4 py-1.5 border-b border-sand-200 bg-[#FAF7F2]/95 backdrop-blur-xs flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-terracotta-600 to-terracotta-400 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span className="font-extrabold text-xs font-serif tracking-tight text-stone-900">
                    SmritiCare
                  </span>
                </div>
                <LanguageSelector compact />
              </div>

              {/* Patient Content Body */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 no-scrollbar relative">
                {activePatientTab === 'home' && <MobileHomeTab />}
                {activePatientTab === 'games' && <MobileGamesTab />}
                {activePatientTab === 'memories' && <MobileMemoriesTab />}
                {activePatientTab === 'routine' && <MobileRoutineTab />}
                {activePatientTab === 'safety' && <MobileSafetyTab />}

                {/* IN-PHONE ALARM OVERLAY (Visible directly on the phone mockup) */}
                {alarmOverlay?.isOpen && (
                  <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-md p-5 flex flex-col items-center justify-between text-white text-center rounded-2xl animate-in zoom-in-95">
                    <div className="w-full flex items-center justify-between pt-2">
                      <span className="text-[10px] font-mono font-bold bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full">
                        {alarmOverlay.time}
                      </span>
                      <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1 uppercase">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        Alarm Ringing
                      </span>
                    </div>

                    <div className="space-y-3 my-auto">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-terracotta-600 to-amber-500 flex items-center justify-center shadow-xl border-2 border-white/20 animate-bounce">
                        <Bell className="w-10 h-10 text-amber-200" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black font-serif text-amber-300">
                          {alarmOverlay.title}
                        </h3>
                        <p className="text-xs text-stone-300 mt-1 font-medium">
                          {alarmOverlay.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="w-full space-y-2 pb-2">
                      <button
                        onClick={() => dismissAlarm(true)}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>✓ Done (Take Medicine)</span>
                      </button>
                      <button
                        onClick={snoozeAlarm}
                        className="w-full py-2 bg-white/15 hover:bg-white/20 text-stone-300 font-bold text-xs rounded-xl transition"
                      >
                        Snooze 10 Minutes
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Voice Button */}
              <div className="absolute right-3.5 bottom-16 z-40">
                <button
                  onClick={() => setIsVoiceOpen(true)}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 text-white shadow-xl flex items-center justify-center transition active:scale-90 border-2 border-white ring-2 ring-terracotta-500/30"
                  title="Speak to Voice AI"
                >
                  <Mic className="w-5 h-5 animate-pulse" />
                </button>
              </div>

              {/* 5-Tab Patient Bottom Navigation */}
              <div className="bg-white/95 backdrop-blur-md border-t border-sand-200 px-2 py-1.5 shrink-0 z-30 shadow-md">
                <div className="grid grid-cols-5 gap-1 text-center">
                  
                  <button
                    onClick={() => setActivePatientTab('home')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      activePatientTab === 'home' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Home className={`w-4 h-4 ${activePatientTab === 'home' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px] truncate max-w-[55px]">{t.tabHome}</span>
                  </button>

                  <button
                    onClick={() => setActivePatientTab('games')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      activePatientTab === 'games' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Brain className={`w-4 h-4 ${activePatientTab === 'games' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px] truncate max-w-[55px]">{t.tabGames}</span>
                  </button>

                  <button
                    onClick={() => setActivePatientTab('memories')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      activePatientTab === 'memories' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activePatientTab === 'memories' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px] truncate max-w-[55px]">{t.tabMemories}</span>
                  </button>

                  <button
                    onClick={() => setActivePatientTab('routine')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      activePatientTab === 'routine' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Calendar className={`w-4 h-4 ${activePatientTab === 'routine' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px] truncate max-w-[55px]">{t.tabRoutine}</span>
                  </button>

                  <button
                    onClick={() => setActivePatientTab('safety')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      activePatientTab === 'safety' ? 'text-emerald-700 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <ShieldAlert className={`w-4 h-4 ${activePatientTab === 'safety' ? 'stroke-[2.5] text-emerald-600' : ''}`} />
                    <span className="text-[9px] truncate max-w-[55px]">{t.tabSafety}</span>
                  </button>

                </div>
                <div className="w-24 h-1 bg-stone-300 rounded-full mx-auto mt-1" />
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DEVICE 2: PRIYA (CAREGIVER MOBILE HUB)                    */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center w-full max-w-[410px]">
          
          <div className="mb-2.5 flex items-center justify-between w-full px-2 text-xs font-bold text-sage-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sage-500 animate-pulse" />
              <span className="text-sm font-black font-serif">Priya (Caregiver Mobile Hub)</span>
            </div>
            <span className="text-stone-400 text-xs font-medium">Remote Monitoring</span>
          </div>

          {/* Smartphone Frame 2 */}
          <div className="w-full relative rounded-[3rem] border-[10px] border-[#1d2220] ring-1 ring-white/10 bg-[#FAF7F2] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <div className="w-22 h-4.5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                <div className="w-2 h-2 rounded-full bg-stone-900 ring-1 ring-emerald-500/50" />
              </div>
            </div>

            {/* Screen Viewport */}
            <div className="h-[710px] flex flex-col justify-between overflow-hidden relative text-[#2C241E] select-none bg-[#FAF7F2]">
              
              {/* Native Status Bar */}
              <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-stone-800 shrink-0 z-30">
                <span className="font-mono text-xs font-bold">09:41</span>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                    Hub Online
                  </span>
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <BatteryMedium className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* Caregiver Mobile In-App Top Bar */}
              <div className="px-4 py-1.5 border-b border-sand-200 bg-[#FAF7F2]/95 backdrop-blur-xs flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sage-700 to-sage-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Activity className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span className="font-extrabold text-xs font-serif tracking-tight text-stone-900">
                    Priya's Hub
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-sage-800 bg-sage-100 px-2 py-0.5 rounded-full">
                  <span>Asha: {routines.filter(r => r.completed).length}/{routines.length} Done</span>
                </div>
              </div>

              {/* Caregiver Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 no-scrollbar">
                <MobileCaregiverTab 
                  activePage={activeCaregiverTab} 
                  onPageChange={setActiveCaregiverTab} 
                  hideTopSwitcher 
                />
              </div>

              {/* 3-Tab Caregiver Bottom Navigation (Matches Patient Phone Bottom Interface) */}
              <div className="bg-white/95 backdrop-blur-md border-t border-sand-200 px-3 py-1.5 shrink-0 z-30 shadow-md">
                <div className="grid grid-cols-3 gap-1 text-center">
                  
                  <button
                    onClick={() => setActiveCaregiverTab('performance')}
                    className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                      activeCaregiverTab === 'performance'
                        ? 'text-[#356859] font-black'
                        : 'text-stone-500 font-medium hover:text-[#356859]'
                    }`}
                  >
                    <Activity className={`w-4 h-4 ${activeCaregiverTab === 'performance' ? 'stroke-[2.5] text-[#356859]' : ''}`} />
                    <span className="text-[10px] truncate max-w-[85px]">Health & Vitals</span>
                  </button>

                  <button
                    onClick={() => setActiveCaregiverTab('map')}
                    className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                      activeCaregiverTab === 'map'
                        ? 'text-[#356859] font-black'
                        : 'text-stone-500 font-medium hover:text-[#356859]'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 ${activeCaregiverTab === 'map' ? 'stroke-[2.5] text-[#D88965]' : ''}`} />
                    <span className="text-[10px] truncate max-w-[85px]">Safety Map</span>
                  </button>

                  <button
                    onClick={() => setActiveCaregiverTab('patient_info')}
                    className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                      activeCaregiverTab === 'patient_info'
                        ? 'text-[#356859] font-black'
                        : 'text-stone-500 font-medium hover:text-[#356859]'
                    }`}
                  >
                    <User className={`w-4 h-4 ${activeCaregiverTab === 'patient_info' ? 'stroke-[2.5] text-[#356859]' : ''}`} />
                    <span className="text-[10px] truncate max-w-[85px]">Patient Info</span>
                  </button>

                </div>
                
                {/* iOS Home Indicator Bar */}
                <div className="w-24 h-1 bg-stone-300 rounded-full mx-auto mt-1" />
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
