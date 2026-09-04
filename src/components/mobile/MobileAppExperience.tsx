import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHomeTab } from './tabs/MobileHomeTab';
import { MobileGamesTab } from './tabs/MobileGamesTab';
import { MobileMemoriesTab } from './tabs/MobileMemoriesTab';
import { MobileRoutineTab } from './tabs/MobileRoutineTab';
import { MobileCaregiverTab } from './tabs/MobileCaregiverTab';
import { LanguageSelector } from '../shared/LanguageSelector';
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  BatteryMedium, 
  Signal, 
  Home, 
  Brain, 
  Heart, 
  Calendar, 
  Activity, 
  Mic, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  User,
  ShieldCheck
} from 'lucide-react';

export const MobileAppExperience: React.FC = () => {
  const { 
    mobileTab, 
    setMobileTab, 
    deviceFrame, 
    setDeviceFrame, 
    mobileSubRole, 
    setMobileSubRole,
    isOffline, 
    setIsOffline, 
    setIsVoiceOpen,
    setRole,
    language
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#mobile`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 px-4 bg-gradient-to-b from-stone-900 via-[#1e1b18] to-stone-900 text-white flex flex-col items-center justify-start">
      
      {/* Top Mobile Prototype Bar & Controls for SIH Evaluators */}
      <div className="w-full max-w-4xl mx-auto mb-6 bg-stone-800/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-stone-700 shadow-xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Title & Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/40 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-stone-100">
                SmritiCare Mobile App Prototype
              </span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Native App Shell
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Interactive touch simulation of Problem Statement 26003 Mobile Companion
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Persona Switcher inside Mobile */}
          <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-700">
            <button
              onClick={() => {
                setMobileSubRole('patient');
                if (mobileTab === 'caregiver') setMobileTab('home');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                mobileSubRole === 'patient'
                  ? 'bg-terracotta-500 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Asha (Patient)
            </button>
            <button
              onClick={() => {
                setMobileSubRole('caregiver');
                setMobileTab('caregiver');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                mobileSubRole === 'caregiver'
                  ? 'bg-sage-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Priya (Caregiver)
            </button>
          </div>

          {/* Frame Style Selector */}
          <div className="hidden sm:flex items-center bg-stone-900 p-1 rounded-xl border border-stone-700 text-xs">
            <button
              onClick={() => setDeviceFrame('iphone')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                deviceFrame === 'iphone' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              iPhone 15
            </button>
            <button
              onClick={() => setDeviceFrame('pixel')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                deviceFrame === 'pixel' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              Pixel 8
            </button>
            <button
              onClick={() => setDeviceFrame('fullscreen')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                deviceFrame === 'fullscreen' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'
              }`}
            >
              Fullscreen
            </button>
          </div>

          {/* Offline Toggle in Toolbar */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
              isOffline
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-900 text-stone-300 border-stone-700 hover:text-white'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden md:inline">{isOffline ? 'Offline Mode' : 'Online'}</span>
          </button>

          {/* Share / Copy Sub-Demo Link */}
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition active:scale-95"
            title="Copy Direct Link to this Mobile Prototype"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Mobile Demo Link'}</span>
          </button>

          {/* QR Code trigger */}
          <button
            onClick={() => setShowQrModal(true)}
            className="p-1.5 bg-stone-900 hover:bg-stone-700 text-stone-300 rounded-xl border border-stone-700 transition"
            title="Scan QR Code to open on mobile phone"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Smartphone Shell Device Container */}
      <div className={`transition-all duration-300 w-full flex justify-center ${
        deviceFrame === 'fullscreen' ? 'max-w-md' : 'max-w-[420px]'
      }`}>
        
        {/* Realistic Smartphone Hardware Bezel Frame */}
        <div className={`w-full relative shadow-2xl transition-all ${
          deviceFrame === 'fullscreen'
            ? 'rounded-3xl border-2 border-stone-700 bg-[#FAF7F2]'
            : deviceFrame === 'iphone'
            ? 'rounded-[3.2rem] border-[10px] border-[#2d2c2a] ring-1 ring-white/10 bg-[#FAF7F2] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
            : 'rounded-[2.8rem] border-[10px] border-[#1f2421] ring-1 ring-white/10 bg-[#FAF7F2] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
        }`}>
          
          {/* Dynamic Island / Hardware Notch (for iPhone / Pixel) */}
          {deviceFrame !== 'fullscreen' && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              {deviceFrame === 'iphone' ? (
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-900 ring-1 ring-emerald-500/50" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-black shadow-inner border border-stone-800" />
              )}
            </div>
          )}

          {/* Internal Mobile Screen Viewport */}
          <div className="h-[740px] flex flex-col justify-between overflow-hidden relative text-[#2C241E] select-none rounded-[2.5rem] bg-[#FAF7F2]">
            
            {/* Native Mobile Status Bar (9:41 AM, 5G, Battery 100%) */}
            <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-stone-800 shrink-0 z-30 select-none">
              <span className="font-mono text-xs font-bold tracking-tight">09:41</span>
              
              <div className="flex items-center gap-2 text-stone-700">
                {isOffline ? (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-full border border-amber-300">
                    Offline
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-stone-600">5G</span>
                )}
                <Signal className="w-3.5 h-3.5" />
                {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5" />}
                <div className="flex items-center gap-0.5">
                  <BatteryMedium className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-mono font-bold">100%</span>
                </div>
              </div>
            </div>

            {/* Mobile In-App Top Bar */}
            <div className="px-4 py-2 border-b border-sand-200 bg-[#FAF7F2]/95 backdrop-blur-xs flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-terracotta-600 to-terracotta-400 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
                <div>
                  <span className="font-extrabold text-sm font-serif tracking-tight text-stone-900">
                    SmritiCare
                  </span>
                  <span className="ml-1 text-[9px] font-bold bg-sage-100 text-sage-800 px-1 py-0.2 rounded">
                    NER AI
                  </span>
                </div>
              </div>

              {/* Language Selector in Mobile Header */}
              <div className="flex items-center gap-1.5">
                <LanguageSelector compact />
              </div>
            </div>

            {/* Scrollable Screen Body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
              {mobileTab === 'home' && <MobileHomeTab />}
              {mobileTab === 'games' && <MobileGamesTab />}
              {mobileTab === 'memories' && <MobileMemoriesTab />}
              {mobileTab === 'routine' && <MobileRoutineTab />}
              {mobileTab === 'caregiver' && <MobileCaregiverTab />}
            </div>

            {/* Floating Mobile Voice Button */}
            <div className="absolute right-4 bottom-20 z-40">
              <button
                onClick={() => setIsVoiceOpen(true)}
                className="w-13 h-13 rounded-full bg-gradient-to-tr from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white shadow-xl flex items-center justify-center transition active:scale-90 border-2 border-white ring-4 ring-terracotta-500/20"
                title="Talk to Smriti Voice Assistant"
              >
                <Mic className="w-6 h-6 animate-pulse" />
              </button>
            </div>

            {/* Native Bottom Navigation Bar */}
            <div className="bg-white/95 backdrop-blur-md border-t border-sand-200 px-2 py-1.5 shrink-0 z-30 shadow-lg">
              <div className="grid grid-cols-5 gap-1 text-center">
                
                <button
                  onClick={() => setMobileTab('home')}
                  className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                    mobileTab === 'home'
                      ? 'text-terracotta-600 font-bold'
                      : 'text-stone-500 hover:text-stone-800 font-medium'
                  }`}
                >
                  <Home className={`w-5 h-5 ${mobileTab === 'home' ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[10px]">Home</span>
                </button>

                <button
                  onClick={() => setMobileTab('games')}
                  className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                    mobileTab === 'games'
                      ? 'text-terracotta-600 font-bold'
                      : 'text-stone-500 hover:text-stone-800 font-medium'
                  }`}
                >
                  <Brain className={`w-5 h-5 ${mobileTab === 'games' ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[10px]">Games</span>
                </button>

                <button
                  onClick={() => setMobileTab('memories')}
                  className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                    mobileTab === 'memories'
                      ? 'text-terracotta-600 font-bold'
                      : 'text-stone-500 hover:text-stone-800 font-medium'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${mobileTab === 'memories' ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[10px]">Memories</span>
                </button>

                <button
                  onClick={() => setMobileTab('routine')}
                  className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                    mobileTab === 'routine'
                      ? 'text-terracotta-600 font-bold'
                      : 'text-stone-500 hover:text-stone-800 font-medium'
                  }`}
                >
                  <Calendar className={`w-5 h-5 ${mobileTab === 'routine' ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[10px]">Routine</span>
                </button>

                <button
                  onClick={() => {
                    setMobileTab('caregiver');
                    setMobileSubRole('caregiver');
                  }}
                  className={`py-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition ${
                    mobileTab === 'caregiver'
                      ? 'text-sage-700 font-bold'
                      : 'text-stone-500 hover:text-stone-800 font-medium'
                  }`}
                >
                  <Activity className={`w-5 h-5 ${mobileTab === 'caregiver' ? 'stroke-[2.5]' : ''}`} />
                  <span className="text-[10px]">Priya's Hub</span>
                </button>

              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-32 h-1 bg-stone-300 rounded-full mx-auto mt-1.5" />
            </div>

          </div>
        </div>
      </div>

      {/* QR Code & Share Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 text-white rounded-3xl p-6 max-w-sm w-full border border-stone-700 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                <h4 className="font-extrabold text-sm text-stone-100">Test on Your Mobile Device</h4>
              </div>
              <button 
                onClick={() => setShowQrModal(false)}
                className="text-stone-400 hover:text-white text-xs font-bold px-2 py-1 bg-stone-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-400">
              Open the direct sub-demo link on any smartphone or tablet browser to evaluate the responsive mobile app directly.
            </p>

            {/* Direct URL Box */}
            <div className="bg-stone-800 p-3 rounded-2xl border border-stone-700 flex items-center justify-between gap-2">
              <code className="text-xs text-amber-300 truncate font-mono">
                {window.location.origin}{window.location.pathname}#mobile
              </code>
              <button
                onClick={handleCopyLink}
                className="shrink-0 p-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-lg text-xs font-bold"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sub Demo Footer Note */}
      <div className="mt-6 text-center text-xs text-stone-400 max-w-md space-y-1">
        <p>
          Designed for <strong className="text-stone-200">Elderly Ease-of-Use</strong> & <strong className="text-stone-200">Caregiver Remote Tracking</strong>.
        </p>
        <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-stone-500">
          <button onClick={() => setRole('patient')} className="hover:text-amber-300 underline">
            Desktop Asha Space
          </button>
          <span>•</span>
          <button onClick={() => setRole('caregiver')} className="hover:text-amber-300 underline">
            Desktop Priya Hub
          </button>
          <span>•</span>
          <button onClick={() => setRole('landing')} className="hover:text-amber-300 underline">
            SIH Concept Overview
          </button>
        </div>
      </div>

    </div>
  );
};
