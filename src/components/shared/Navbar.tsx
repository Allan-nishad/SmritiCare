import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { Heart, User, Mic, Home, Activity, Smartphone, Sparkles, RefreshCw } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, setIsVoiceOpen, isOffline } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5ED]/95 backdrop-blur-md border-b border-[#A8C3A0]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setRole('dual')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#356859] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Heart className="w-4.5 h-4.5 fill-[#EEF4EC]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#26332F] font-serif">
                SmritiCare
              </span>
              <span className="bg-[#EEF4EC] text-[#356859] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#A8C3A0]/60">
                LIVE DEMO
              </span>
            </div>
            <p className="text-[11px] text-[#26332F]/70 font-medium hidden sm:block">
              Dual-Device Cognitive Companion & Safety
            </p>
          </div>
        </div>

        {/* Clean Center Stage Indicator / View Selector */}
        <nav className="flex items-center bg-[#EEF4EC] p-1 rounded-2xl border border-[#A8C3A0]/40 shadow-inner">
          <button
            onClick={() => setRole('dual')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              role === 'dual'
                ? 'bg-[#356859] text-white shadow-xs ring-1 ring-[#A8C3A0]'
                : 'text-[#26332F] hover:text-[#356859] hover:bg-[#F8F5ED]/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#A8C3A0]" />
            <span>📱📱 2-Phones Demo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E9367] animate-pulse" />
          </button>

          <button
            onClick={() => setRole('patient')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              role === 'patient'
                ? 'bg-[#D88965] text-white shadow-xs'
                : 'text-[#26332F] hover:text-[#D88965] hover:bg-[#F8F5ED]/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Asha (Patient)</span>
          </button>

          <button
            onClick={() => setRole('caregiver')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              role === 'caregiver'
                ? 'bg-[#356859] text-white shadow-xs'
                : 'text-[#26332F] hover:text-[#356859] hover:bg-[#F8F5ED]/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Priya (Caregiver)</span>
          </button>
        </nav>

        {/* Right Tools: Voice & Language */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="flex items-center gap-1.5 bg-[#EEF4EC] hover:bg-[#e0ebe0] text-[#356859] border border-[#A8C3A0]/50 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 shadow-2xs"
            title="Talk to SmritiCare Voice Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-[#D88965]" />
            <span className="hidden md:inline">Voice AI</span>
          </button>

          <LanguageSelector compact />
        </div>

      </div>
    </header>
  );
};
