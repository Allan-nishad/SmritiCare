import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Bell, 
  Clock, 
  PhoneCall, 
  Navigation, 
  WifiOff, 
  RefreshCw, 
  TrendingUp, 
  Watch, 
  Languages, 
  Mic, 
  ChevronUp, 
  ChevronDown,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  Zap
} from 'lucide-react';

export const SimulationCenter: React.FC = () => {
  const { triggerSimulation, isOffline, language, setRole, role } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [lastActionToast, setLastActionToast] = useState<string | null>(null);

  const handleAction = (
    scenario: 
      | 'alarm_medicine' 
      | 'snooze_x3' 
      | 'sos_fallback' 
      | 'missing_patient' 
      | 'take_me_home' 
      | 'offline_toggle' 
      | 'sync_reconcile' 
      | 'game_adaptive_up' 
      | 'smartband_pulse' 
      | 'lang_assamese' 
      | 'family_voice_push'
      | 'caregiver_setup'
      | 'caregiver_setup_express'
      | 'caregiver_setup_custom'
      | 'face_recognition'
      | 'phone_separation',
    label: string
  ) => {
    triggerSimulation(scenario);
    setLastActionToast(`Simulated: ${label}`);
    setTimeout(() => setLastActionToast(null), 4000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-[calc(100vw-2rem)] sm:w-96 select-none">
      <div className="bg-stone-950/95 backdrop-blur-md text-white rounded-3xl p-3 sm:p-4 shadow-2xl border-2 border-amber-400/60 space-y-3 animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-amber-300 uppercase tracking-wider">
                  Simulation Center
                </span>
                <span className="bg-amber-400/20 text-amber-300 text-[9px] font-mono px-1.5 py-0.2 rounded">
                  SIH 26003
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                1-Click Human-Operated Demo Panel
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-stone-700"
          >
            <span>{isOpen ? 'Minimize' : 'Open Controls'}</span>
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Action Toast Feedback */}
        {lastActionToast && (
          <div className="p-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{lastActionToast}</span>
          </div>
        )}

        {/* Expanded Controls Grid */}
        {isOpen && (
          <div className="pt-2 border-t border-stone-800 space-y-3 animate-in fade-in duration-200 max-h-96 overflow-y-auto no-scrollbar">
            
            <p className="text-[11px] text-stone-400 font-medium">
              Click any scenario to instantly demonstrate that SIH 26003 workflow to evaluators:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              
              {/* 1. Alarm Reminder Overlay */}
              <button
                onClick={() => handleAction('alarm_medicine', 'Android Alarm Overlay')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <Bell className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="leading-tight">Simulate Medicine Alarm</span>
              </button>

              {/* 2. Snooze x3 Escalation */}
              <button
                onClick={() => handleAction('snooze_x3', 'Snooze x3 & Caregiver Alert')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="leading-tight">Simulate Snooze 3x Alert</span>
              </button>

              {/* 3. SOS Fallback (Meera -> Rahul) */}
              <button
                onClick={() => handleAction('sos_fallback', 'SOS 2-Contact Fallback')}
                className="p-2.5 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-500/40 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                <span className="leading-tight">Simulate SOS Fallback</span>
              </button>

              {/* 4. Missing Patient (1.8 km Away) */}
              <button
                onClick={() => handleAction('missing_patient', 'Missing Patient & Geofence Departure')}
                className="p-2.5 bg-amber-950/60 hover:bg-amber-900 text-amber-200 border border-amber-500/40 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="leading-tight">Simulate Missing Patient</span>
              </button>

              {/* 5. Take Me Home Guidance */}
              <button
                onClick={() => handleAction('take_me_home', 'Take Me Home Step Guidance')}
                className="p-2.5 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <Navigation className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-tight">Simulate Take Me Home</span>
              </button>

              {/* 6. Adaptive Game Level Up */}
              <button
                onClick={() => handleAction('game_adaptive_up', 'Adaptive AI Difficulty Level Up')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <TrendingUp className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="leading-tight">Simulate Adaptive AI Level Up</span>
              </button>

              {/* 7. Offline Toggle */}
              <button
                onClick={() => handleAction('offline_toggle', !isOffline ? 'Offline Mode Active' : 'Online Mode Restored')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="leading-tight">{isOffline ? 'Restore Online' : 'Simulate Offline'}</span>
              </button>

              {/* 8. Sync Reconcile */}
              <button
                onClick={() => handleAction('sync_reconcile', 'Syncing Cached Activities')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <RefreshCw className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="leading-tight">Simulate 3-Step Sync</span>
              </button>

              {/* 9. Smartband Stream */}
              <button
                onClick={() => handleAction('smartband_pulse', 'Wearable Smartband Stream Update')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <Watch className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-tight">Simulate Smartband Pulse</span>
              </button>

              {/* 10. Assamese Regional Switch */}
              <button
                onClick={() => handleAction('lang_assamese', 'Assamese (অসমীয়া) Localization')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <Languages className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="leading-tight">Switch to Assamese</span>
              </button>

              {/* 11. Family Voice Reminder */}
              <button
                onClick={() => handleAction('family_voice_push', 'Family Spoken Voice Reminder')}
                className="col-span-2 p-2.5 bg-gradient-to-r from-terracotta-600 to-terracotta-700 hover:from-terracotta-700 text-white rounded-2xl flex items-center justify-center gap-2 text-center transition active:scale-95 shadow"
              >
                <Mic className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Simulate Spoken Family Voice Reminder</span>
              </button>

              {/* 12. Option 1: Caregiver Express 1-Min Setup */}
              <button
                onClick={() => handleAction('caregiver_setup_express', 'Option 1: 1-Min Express Setup')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="leading-tight">Simulate Option 1 (1-Min Express Setup)</span>
              </button>

              {/* 13. Option 2: Caregiver 5-Step Custom Setup Wizard */}
              <button
                onClick={() => handleAction('caregiver_setup_custom', 'Option 2: 5-Step Custom Setup Wizard')}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 text-emerald-300 border border-emerald-500/40 rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="leading-tight">Simulate Option 2 (5-Step Setup Wizard)</span>
              </button>

              {/* 14. Patient Access via Face Recognition (Requested) */}
              <button
                onClick={() => handleAction('face_recognition', 'Elderly Face ID Access Scan')}
                className="col-span-2 p-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 rounded-2xl flex items-center justify-center gap-2 text-center transition active:scale-95 shadow-sm"
              >
                <Sliders className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="leading-tight">Simulate Patient Face ID Biometric Access</span>
              </button>

              {/* 15. Patient Phone Separation / Device Alert (Requested) */}
              <button
                onClick={() => handleAction('phone_separation', 'Smartband Phone Separation Proximity Alert')}
                className="col-span-2 p-2.5 bg-gradient-to-r from-red-900 to-red-950 hover:from-red-800 text-red-100 border border-red-500/50 rounded-2xl flex items-center justify-center gap-2 text-center transition active:scale-95 shadow"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Simulate Phone Separation Alert (Smartband Vibration)</span>
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
