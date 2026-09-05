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

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-8 bg-gradient-to-b from-[#141210] via-[#1c1917] to-[#141210] text-white flex flex-col items-center select-none">
      
      {/* Top Clean Presentation Header */}
      <div className="w-full max-w-6xl mx-auto mb-4 bg-stone-900/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-stone-700 shadow-xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-terracotta-600 to-amber-500 text-white flex items-center justify-center font-black shadow-md shadow-terracotta-500/20">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base sm:text-lg text-stone-100 font-serif">
                SmritiCare Dual-Device Presentation
              </h2>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Sync Active</span>
              </span>
            </div>
            <p className="text-xs text-stone-400">
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
                ? 'bg-amber-500/25 text-amber-300 border-amber-400/50 ring-1 ring-amber-400'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOffline ? 'Offline Active' : 'Online'}</span>
          </button>

          {/* Popout Windows */}
          <button
            onClick={openPatientTab}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-terracotta-300 border border-stone-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            title="Open Asha's phone in a separate window"
          >
            <span>👵 Asha Phone</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={openCaregiverTab}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-sage-300 border border-stone-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
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
                ? 'bg-amber-400 text-stone-950 border-amber-300'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Logs ({telemetryLogs.length})</span>
            {showLogsDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 rounded-xl text-xs font-bold transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Prominent Evaluator Simulation Quick-Bar */}
      <div className="w-full max-w-6xl mx-auto mb-6 bg-stone-900/95 backdrop-blur-md rounded-2xl p-3 border-2 border-amber-400/50 shadow-xl space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 26003 Interactive Simulation Center (Click any scenario to test live):</span>
            </span>
          </div>

          {activeToast && (
            <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-lg border border-amber-400/40 animate-pulse">
              ✓ {activeToast}
            </span>
          )}
        </div>

        {/* Action Trigger Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <button
            onClick={() => handleQuickSim('alarm_medicine', 'Medicine Alarm Overlay')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40 rounded-xl transition active:scale-95 shadow-xs"
          >
            🔔 Medicine Alarm
          </button>

          <button
            onClick={() => handleQuickSim('snooze_x3', 'Snooze 3x Escalation Alert')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40 rounded-xl transition active:scale-95 shadow-xs"
          >
            ⏳ Snooze 3x Alert
          </button>

          <button
            onClick={() => handleQuickSim('sos_fallback', 'SOS 2-Contact Fallback Flow')}
            className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/50 rounded-xl transition active:scale-95 shadow-xs"
          >
            🚨 SOS 2-Contact Fallback
          </button>

          <button
            onClick={() => handleQuickSim('missing_patient', 'Missing Patient (1.8km Geofence Alert)')}
            className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/50 rounded-xl transition active:scale-95 shadow-xs"
          >
            📍 Missing Patient (1.8km)
          </button>

          <button
            onClick={() => handleQuickSim('take_me_home', 'Take Me Home Navigation')}
            className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/50 rounded-xl transition active:scale-95 shadow-xs"
          >
            🧭 Take Me Home
          </button>

          <button
            onClick={() => handleQuickSim('game_adaptive_up', 'Adaptive AI Level Up')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-teal-300 border border-stone-700 rounded-xl transition active:scale-95 shadow-xs"
          >
            📈 Adaptive AI (Level Up)
          </button>

          <button
            onClick={() => handleQuickSim('smartband_pulse', 'Smartband Pulse')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-stone-700 rounded-xl transition active:scale-95 shadow-xs"
          >
            📡 Smartband Pulse
          </button>

          <button
            onClick={() => handleQuickSim('sync_reconcile', '3-Step Offline Sync')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-blue-300 border border-stone-700 rounded-xl transition active:scale-95 shadow-xs"
          >
            🔄 3-Step Offline Sync
          </button>

          <button
            onClick={() => handleQuickSim('family_voice_push', 'Priya Voice Reminder Push')}
            className="px-3 py-1.5 bg-gradient-to-r from-terracotta-600 to-terracotta-700 hover:from-terracotta-700 text-white rounded-xl transition active:scale-95 shadow"
          >
            🗣️ Push Voice Reminder
          </button>

          <button
            onClick={() => handleQuickSim('caregiver_setup', 'First-Time Caregiver Setup Screen')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-emerald-500/50 rounded-xl transition active:scale-95 shadow-xs"
          >
            🧙 1st-Time Setup Screen
          </button>

          <button
            onClick={() => handleQuickSim('face_recognition', 'Patient Face ID Access')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/50 rounded-xl transition active:scale-95 shadow-xs"
          >
            📷 Patient Face ID
          </button>

          <button
            onClick={() => handleQuickSim('phone_separation', 'Smartband Phone Separation Alert')}
            className="px-3 py-1.5 bg-red-900/90 hover:bg-red-800 text-red-100 border border-red-500/60 rounded-xl transition active:scale-95 shadow-xs"
          >
            ⚠️ Phone Separation Alert
          </button>

          <button
            onClick={() => handleQuickSim('lang_assamese', 'Assamese Language')}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 rounded-xl transition active:scale-95 shadow-xs"
          >
            অসমীয়া Switch
          </button>
        </div>
      </div>

      {/* Collapsible Logs Drawer */}
      {showLogsDrawer && (
        <div className="w-full max-w-6xl mx-auto mb-6 bg-stone-900 rounded-2xl p-4 border border-stone-700 shadow-2xl space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
              Real-Time Cross-Device Telemetry Logs
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Zero-Latency Local Broadcast</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto no-scrollbar pt-1">
            {telemetryLogs.slice(0, 9).map((log) => (
              <div 
                key={log.id}
                className="bg-stone-800/90 p-2.5 rounded-xl border border-stone-700 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-stone-400">
                  <span className="font-mono text-[10px] text-amber-400">{log.timestamp}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                    log.source === 'patient' 
                      ? 'bg-terracotta-500/20 text-terracotta-300'
                      : log.source === 'caregiver'
                      ? 'bg-sage-500/20 text-sage-300'
                      : 'bg-stone-700 text-stone-300'
                  }`}>
                    {log.source}
                  </span>
                </div>
                <div className="font-bold text-stone-100 text-xs truncate">{log.title}</div>
                <div className="text-[11px] text-stone-400 truncate">{log.detail}</div>
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
                <MobileCaregiverTab />
              </div>

              {/* Caregiver Bottom Nav Indicator */}
              <div className="bg-white/95 backdrop-blur-md border-t border-sand-200 px-4 py-2 shrink-0 z-30 shadow-md flex items-center justify-between text-xs font-bold text-stone-600">
                <span className="flex items-center gap-1 text-sage-700">
                  <Activity className="w-4 h-4 text-sage-600" />
                  <span>Caregiver Dashboard</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">Synced</span>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
