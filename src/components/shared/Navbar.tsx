import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { Heart, User, Mic, Home, Activity, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, setIsVoiceOpen } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#F8F5ED]/95 backdrop-blur-md border-b border-[#A8C3A0]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setRole('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#356859] to-[#5E9367] text-white flex items-center justify-center shadow-md shadow-[#356859]/20 group-hover:scale-105 transition">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#26332F] font-serif">
                SmritiCare
              </span>
              <span className="bg-[#EEF4EC] text-[#356859] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#A8C3A0]/60">
                NER AI
              </span>
            </div>
            <p className="text-[11px] text-[#526861] font-medium hidden sm:block">
              Cognitive Companion & Safety
            </p>
          </div>
        </div>

        {/* Portal Switcher Tabs */}
        <nav className="flex items-center bg-[#EEF4EC] p-1 rounded-2xl border border-[#A8C3A0]/50 shadow-inner">
          <button
            onClick={() => setRole('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              role === 'landing'
                ? 'bg-[#356859] text-white shadow-sm'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <button
            onClick={() => setRole('dual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
              role === 'dual'
                ? 'bg-[#356859] text-white shadow-md ring-2 ring-[#A8C3A0]'
                : 'text-[#26332F] hover:text-[#356859] font-black'
            }`}
          >
            <span>📱📱 Dual Live Demo</span>
            <span className="text-[9px] bg-[#5E9367] text-white px-1.5 py-0.2 rounded-full font-black uppercase tracking-tighter animate-pulse">
              Live Sync
            </span>
          </button>

          <button
            onClick={() => setRole('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
              role === 'mobile'
                ? 'bg-[#356859] text-white shadow-sm ring-1 ring-[#A8C3A0]/50'
                : 'text-[#26332F] hover:text-[#356859] font-bold'
            }`}
          >
            <span>📱 Single Phone</span>
          </button>

          <button
            onClick={() => setRole('patient')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              role === 'patient'
                ? 'bg-[#D88965] text-white shadow-md shadow-[#D88965]/30'
                : 'text-[#26332F] hover:text-[#D88965]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Asha's Space</span>
          </button>

          <button
            onClick={() => setRole('caregiver')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              role === 'caregiver'
                ? 'bg-[#356859] text-white shadow-md shadow-[#356859]/30'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Priya's Hub</span>
          </button>
        </nav>

        {/* Right Tools: Voice Trigger & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="flex items-center gap-1.5 bg-[#EEF4EC] hover:bg-[#dfeadc] text-[#356859] border border-[#A8C3A0]/60 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs transition active:scale-95"
            title="Talk to SmritiCare Voice Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-[#D88965] animate-pulse" />
            <span className="hidden md:inline">Voice Assistant</span>
          </button>

          <LanguageSelector compact />
        </div>

      </div>
    </header>
  );
};
