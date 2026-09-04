import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHomeTab } from './tabs/MobileHomeTab';
import { MobileGamesTab } from './tabs/MobileGamesTab';
import { MobileMemoriesTab } from './tabs/MobileMemoriesTab';
import { MobileRoutineTab } from './tabs/MobileRoutineTab';
import { MobileCaregiverTab } from './tabs/MobileCaregiverTab';
import { LanguageSelector } from '../shared/LanguageSelector';
import { 
  Smartphone, 
  Activity, 
  User, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight, 
  Wifi, 
  WifiOff, 
  Signal, 
  BatteryMedium,
  Heart,
  Home,
  Brain,
  Calendar,
  Mic,
  Pill,
  PhoneCall,
  RotateCcw,
  Send,
  Volume2
} from 'lucide-react';

export const DualDeviceExperience: React.FC = () => {
  const { 
    patient, 
    routines, 
    cognitiveSessions, 
    baselineMetrics, 
    caregiverAlerts, 
    telemetryLogs, 
    triggerSimulationEvent,
    sendPushReminder,
    isOffline,
    setIsOffline,
    setIsVoiceOpen,
    language
  } = useApp();

  // Left Phone Tab State (Asha)
  const [patientTab, setPatientTab] = useState<'home' | 'games' | 'memories' | 'routine'>('home');
  const [copiedLink, setCopiedLink] = useState(false);
  const [lastEventFlash, setLastEventFlash] = useState(false);

  // Flash animation whenever telemetry log updates
  useEffect(() => {
    setLastEventFlash(true);
    const timer = setTimeout(() => setLastEventFlash(false), 1200);
    return () => clearTimeout(timer);
  }, [telemetryLogs]);

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
    <div className="min-h-[calc(100vh-4rem)] py-5 px-3 sm:px-6 bg-gradient-to-b from-[#181614] via-[#201d1a] to-[#141210] text-white flex flex-col items-center">
      
      {/* Top Calming Status Banner */}
      <div className="w-full max-w-7xl mx-auto mb-5 bg-stone-800/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-stone-700 shadow-xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Title & Pulse */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-stone-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
            <Zap className="w-5 h-5 fill-stone-950 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-stone-100 font-serif">
                Dual-Device Live Synchronized Care Loop
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero Latency Live Sync</span>
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Interactive demonstration of Problem Statement 26003: Patient & Caregiver synced in real-time.
            </p>
          </div>
        </div>

        {/* Multi-Window & Offline Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Offline Mode Toggle in Dual View */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
              isOffline
                ? 'bg-amber-500/25 text-amber-300 border-amber-400/50 ring-1 ring-amber-400'
                : 'bg-stone-900 text-stone-300 border-stone-700 hover:text-white'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOffline ? 'Offline Mode Active' : 'Online Mode'}</span>
          </button>

          <button
            onClick={openPatientTab}
            className="px-3 py-1.5 bg-terracotta-600/30 hover:bg-terracotta-600/40 text-terracotta-300 border border-terracotta-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
            title="Pop out Asha's phone in a separate tab or phone"
          >
            <span>👵 Asha's Phone</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={openCaregiverTab}
            className="px-3 py-1.5 bg-sage-600/30 hover:bg-sage-600/40 text-sage-300 border border-sage-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
            title="Pop out Priya's hub in a separate tab or tablet"
          >
            <span>👩‍⚕️ Priya's Hub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Link'}</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Studio Grid: [Phone 1: Asha] <---> [Center Telemetry Loop] <---> [Phone 2: Priya] */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-start justify-center">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Asha Devi's Patient Phone (Device 1)         */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div className="mb-2 flex items-center justify-between w-full max-w-[390px] px-2 text-xs font-bold text-terracotta-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-ping" />
              <span>Device 1: Asha Devi (Patient Mobile)</span>
            </div>
            <span className="text-stone-400 font-mono text-[10px]">Guwahati, Assam</span>
          </div>

          {/* Smartphone Frame 1 */}
          <div className="w-full max-w-[390px] relative rounded-[2.8rem] border-[9px] border-[#292624] ring-1 ring-white/10 bg-[#FAF7F2] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <div className="w-22 h-4.5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                <div className="w-2 h-2 rounded-full bg-stone-900 ring-1 ring-terracotta-500/50" />
              </div>
            </div>

            {/* Screen Inner */}
            <div className="h-[680px] flex flex-col justify-between overflow-hidden relative text-[#2C241E] select-none bg-[#FAF7F2]">
              
              {/* Native Status Bar */}
              <div className="pt-2 px-5 pb-1 flex items-center justify-between text-xs font-semibold text-stone-800 shrink-0 z-30">
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

              {/* Mobile In-App Top Bar */}
              <div className="px-3.5 py-1.5 border-b border-sand-200 bg-[#FAF7F2]/95 backdrop-blur-xs flex items-center justify-between shrink-0 z-20">
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

              {/* Scrollable Patient Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-3.5 no-scrollbar">
                {patientTab === 'home' && <MobileHomeTab />}
                {patientTab === 'games' && <MobileGamesTab />}
                {patientTab === 'memories' && <MobileMemoriesTab />}
                {patientTab === 'routine' && <MobileRoutineTab />}
              </div>

              {/* Floating Mic */}
              <div className="absolute right-3.5 bottom-16 z-40">
                <button
                  onClick={() => setIsVoiceOpen(true)}
                  className="w-11 h-11 rounded-full bg-gradient-to-tr from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 text-white shadow-lg flex items-center justify-center transition active:scale-90 border-2 border-white ring-2 ring-terracotta-500/30"
                  title="Speak to Voice AI"
                >
                  <Mic className="w-5 h-5 animate-pulse" />
                </button>
              </div>

              {/* Patient Bottom Nav */}
              <div className="bg-white/95 backdrop-blur-md border-t border-sand-200 px-2 py-1 shrink-0 z-30 shadow-md">
                <div className="grid grid-cols-4 gap-1 text-center">
                  <button
                    onClick={() => setPatientTab('home')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      patientTab === 'home' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Home className={`w-4 h-4 ${patientTab === 'home' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px]">Home</span>
                  </button>

                  <button
                    onClick={() => setPatientTab('games')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      patientTab === 'games' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Brain className={`w-4 h-4 ${patientTab === 'games' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px]">Games</span>
                  </button>

                  <button
                    onClick={() => setPatientTab('memories')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      patientTab === 'memories' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${patientTab === 'memories' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px]">Memories</span>
                  </button>

                  <button
                    onClick={() => setPatientTab('routine')}
                    className={`py-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition ${
                      patientTab === 'routine' ? 'text-terracotta-600 font-bold' : 'text-stone-500'
                    }`}
                  >
                    <Calendar className={`w-4 h-4 ${patientTab === 'routine' ? 'stroke-[2.5]' : ''}`} />
                    <span className="text-[9px]">Routine</span>
                  </button>
                </div>
                <div className="w-24 h-1 bg-stone-300 rounded-full mx-auto mt-1" />
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER COLUMN: Real-Time Telemetry Bridge & Triggers     */}
        {/* ========================================================= */}
        <div className="lg:col-span-2 flex flex-col items-center space-y-3.5 py-1">
          
          {/* Animated Sync Data Bridge */}
          <div className="w-full bg-stone-900/90 rounded-2xl p-3 border border-stone-700 shadow-xl space-y-2.5 text-center">
            
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-300">
              <Zap className="w-4 h-4 animate-bounce" />
              <span>Live Care Bridge</span>
            </div>

            {/* Glowing Flow Animation */}
            <div className={`py-2 px-2.5 rounded-xl border transition-all duration-300 ${
              lastEventFlash
                ? 'bg-amber-400/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/50 scale-105'
                : 'bg-stone-800/80 border-stone-700 text-stone-300'
            }`}>
              <div className="text-[9px] uppercase font-black tracking-wider mb-0.5">
                Instant Telemetry Loop
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-black">
                <span className="text-terracotta-400">Asha</span>
                <span className="animate-pulse text-amber-400">──⇄──</span>
                <span className="text-sage-400">Priya</span>
              </div>
            </div>

            {/* 1-Click Interactive Evaluation Triggers */}
            <div className="space-y-1.5 pt-1 text-left">
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-400 text-center">
                Try Live Scenarios:
              </div>

              <button
                onClick={() => {
                  sendPushReminder({
                    text: 'Ma, remember to take your morning blood pressure medicine with warm water.',
                    category: 'medicine',
                    senderName: 'Priya',
                    voiceNoteText: 'Ma, please take your morning blood pressure medicine with warm water. I love you!'
                  });
                }}
                className="w-full py-1.5 px-2 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/60 rounded-xl text-[10px] font-bold transition active:scale-95 flex items-center justify-between"
                title="Priya pushes voice reminder -> Asha hears spoken voice"
              >
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>1. Push Voice Reminder</span>
                </span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => triggerSimulationEvent('morning_med')}
                className="w-full py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 rounded-xl text-[10px] font-bold transition active:scale-95 flex items-center justify-between"
              >
                <span className="flex items-center gap-1">
                  <Pill className="w-3 h-3 text-amber-400" />
                  <span>2. Asha Med Check</span>
                </span>
                <Check className="w-3 h-3" />
              </button>

              <button
                onClick={() => triggerSimulationEvent('memory_game')}
                className="w-full py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-terracotta-300 border border-stone-700 rounded-xl text-[10px] font-bold transition active:scale-95 flex items-center justify-between"
              >
                <span className="flex items-center gap-1">
                  <Brain className="w-3 h-3 text-terracotta-400" />
                  <span>3. Asha 86% Match Game</span>
                </span>
                <Check className="w-3 h-3" />
              </button>

              <button
                onClick={() => triggerSimulationEvent('sos_help')}
                className="w-full py-1.5 px-2 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-700/60 rounded-xl text-[10px] font-bold transition active:scale-95 flex items-center justify-between"
              >
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-red-400 animate-pulse" />
                  <span>4. Offline GSM SOS Call</span>
                </span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Live Telemetry Log Feed */}
          <div className="w-full bg-stone-900/90 rounded-2xl p-3 border border-stone-700 shadow-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-stone-300 px-1">
              <span>Live Events</span>
              <span className="text-[10px] text-emerald-400 font-mono">0ms Sync</span>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto no-scrollbar text-left text-[9px]">
              {telemetryLogs.slice(0, 5).map((log) => (
                <div 
                  key={log.id}
                  className="bg-stone-800/80 p-1.5 rounded-xl border border-stone-700/80 space-y-0.5 animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between text-stone-400">
                    <span className="font-mono text-[8px] text-amber-400">{log.timestamp}</span>
                    <span className={`px-1 rounded uppercase font-bold text-[8px] ${
                      log.source === 'patient' 
                        ? 'bg-terracotta-500/20 text-terracotta-300'
                        : log.source === 'caregiver'
                        ? 'bg-sage-500/20 text-sage-300'
                        : 'bg-stone-700 text-stone-300'
                    }`}>
                      {log.source}
                    </span>
                  </div>
                  <div className="font-bold text-stone-100 truncate">{log.title}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Priya's Caregiver Phone (Device 2)          */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div className="mb-2 flex items-center justify-between w-full max-w-[390px] px-2 text-xs font-bold text-sage-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sage-400 animate-ping" />
              <span>Device 2: Priya (Caregiver Companion)</span>
            </div>
            <span className="text-emerald-400 font-mono text-[10px]">Connected (0ms)</span>
          </div>

          {/* Smartphone Frame 2 */}
          <div className="w-full max-w-[390px] relative rounded-[2.8rem] border-[9px] border-[#1e2420] ring-1 ring-white/10 bg-[#FAF7F2] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <div className="w-22 h-4.5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                <div className="w-2 h-2 rounded-full bg-stone-900 ring-1 ring-sage-500/50" />
              </div>
            </div>

            {/* Screen Inner */}
            <div className="h-[680px] flex flex-col justify-between overflow-hidden relative text-[#2C241E] select-none bg-[#FAF7F2]">
              
              {/* Native Status Bar */}
              <div className="pt-2 px-5 pb-1 flex items-center justify-between text-xs font-semibold text-stone-800 shrink-0 z-30">
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

              {/* In-App Header */}
              <div className="px-3.5 py-1.5 border-b border-sand-200 bg-[#FAF7F2]/95 backdrop-blur-xs flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sage-700 to-sage-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-extrabold text-xs font-serif tracking-tight text-stone-900">
                    Priya's Companion Hub
                  </span>
                </div>
                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Live Sync
                </span>
              </div>

              {/* Scrollable Caregiver Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-3.5 no-scrollbar">
                <MobileCaregiverTab />
              </div>

              {/* Caregiver Bottom Nav Bar */}
              <div className="bg-white/95 backdrop-blur-md border-t border-sand-200 px-3 py-2 shrink-0 z-30 shadow-md flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-1.5 font-bold text-sage-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px]">Synced with Asha Devi</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400">
                  Zero Latency
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
