import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { Heart, User, ShieldAlert, Mic, Sparkles, Home, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, setIsVoiceOpen } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-sand-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setRole('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-terracotta-600 to-terracotta-400 text-white flex items-center justify-center shadow-md shadow-terracotta-500/20 group-hover:scale-105 transition">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-stone-900 font-serif">
                SmritiCare
              </span>
              <span className="bg-sage-100 text-sage-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-sage-200">
                NER AI
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
              Personal Cognitive Companion
            </p>
          </div>
        </div>

        {/* Portal Switcher Tabs */}
        <nav className="flex items-center bg-sand-200/80 p-1 rounded-2xl border border-sand-300 shadow-inner">
          <button
            onClick={() => setRole('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              role === 'landing'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <button
            onClick={() => setRole('dual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
              role === 'dual'
                ? 'bg-gradient-to-r from-stone-900 to-amber-950 text-amber-300 shadow-md ring-2 ring-amber-400'
                : 'text-stone-800 hover:text-stone-950 font-black'
            }`}
          >
            <span>📱📱 Dual Live Demo</span>
            <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-black uppercase tracking-tighter animate-pulse">
              Live Sync
            </span>
          </button>

          <button
            onClick={() => setRole('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
              role === 'mobile'
                ? 'bg-stone-900 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                : 'text-stone-700 hover:text-stone-950 font-bold'
            }`}
          >
            <span>📱 Mobile App</span>
          </button>

          <button
            onClick={() => setRole('patient')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              role === 'patient'
                ? 'bg-terracotta-500 text-white shadow-md shadow-terracotta-500/30'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Asha's Space</span>
          </button>

          <button
            onClick={() => setRole('caregiver')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              role === 'caregiver'
                ? 'bg-sage-600 text-white shadow-md shadow-sage-600/30'
                : 'text-stone-600 hover:text-stone-900'
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
            className="flex items-center gap-1.5 bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition active:scale-95"
            title="Talk to SmritiCare Voice Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-terracotta-600 animate-pulse" />
            <span className="hidden md:inline">Voice Assistant</span>
          </button>

          <LanguageSelector compact />
        </div>

      </div>
    </header>
  );
};
