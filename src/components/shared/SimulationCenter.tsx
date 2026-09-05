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
  Zap
} from 'lucide-react';

export const SimulationCenter: React.FC = () => {
  const { triggerSimulation, isOffline, language, setRole, role } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'clinical' | 'safety' | 'onboarding' | 'sync'>('all');
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

  const simulationCards = [
    { id: 'alarm_medicine', category: 'clinical', label: 'Medicine Alarm', icon: Bell, color: 'text-[#D88965] border-[#D88965]/40 hover:bg-[#D88965]/10' },
    { id: 'snooze_x3', category: 'clinical', label: 'Snooze 3x Alert', icon: Clock, color: 'text-[#D88965] border-[#D88965]/40 hover:bg-[#D88965]/10' },
    { id: 'sos_fallback', category: 'clinical', label: 'SOS Fallback Flow', icon: PhoneCall, color: 'text-[#FCECEC] bg-[#C95C5C]/20 border-[#C95C5C]/50 hover:bg-[#C95C5C]/30' },
    { id: 'family_voice_push', category: 'clinical', label: 'Priya Voice Reminder', icon: Mic, color: 'text-white bg-[#356859] border-[#356859] hover:bg-[#2C574A]' },

    { id: 'missing_patient', category: 'safety', label: 'Missing Patient (1.8km)', icon: AlertTriangle, color: 'text-[#EEF4EC] bg-[#D88965]/20 border-[#D88965]/50 hover:bg-[#D88965]/30' },
    { id: 'take_me_home', category: 'safety', label: 'Take Me Home Route', icon: Navigation, color: 'text-[#EAF3EC] bg-[#5E9367]/20 border-[#5E9367]/50 hover:bg-[#5E9367]/30' },
    { id: 'phone_separation', category: 'safety', label: 'Phone Separation Alert', icon: AlertTriangle, color: 'text-[#FCECEC] bg-[#C95C5C]/20 border-[#C95C5C]/50 hover:bg-[#C95C5C]/30' },

    { id: 'caregiver_setup_express', category: 'onboarding', label: 'Option 1: 1-Min Express', icon: Zap, color: 'text-[#A8C3A0] border-[#A8C3A0]/40 hover:bg-[#356859]/30' },
    { id: 'caregiver_setup_custom', category: 'onboarding', label: 'Option 2: 5-Step Wizard', icon: Sparkles, color: 'text-[#5E9367] border-[#5E9367]/40 hover:bg-[#5E9367]/20' },
    { id: 'face_recognition', category: 'onboarding', label: 'Patient Face ID Access', icon: Sliders, color: 'text-[#A8C3A0] border-[#A8C3A0]/40 hover:bg-[#356859]/30' },

    { id: 'smartband_pulse', category: 'sync', label: 'Smartband Pulse (78 bpm)', icon: Watch, color: 'text-[#5E9367] border-[#5E9367]/40 hover:bg-[#5E9367]/20' },
    { id: 'sync_reconcile', category: 'sync', label: '3-Step Offline Sync', icon: RefreshCw, color: 'text-[#A8C3A0] border-[#A8C3A0]/40 hover:bg-[#356859]/30' },
    { id: 'game_adaptive_up', category: 'sync', label: 'Adaptive AI Level Up', icon: TrendingUp, color: 'text-[#A8C3A0] border-[#A8C3A0]/40 hover:bg-[#356859]/30' },
    { id: 'lang_assamese', category: 'sync', label: 'Assamese Switch', icon: Languages, color: 'text-[#A8C3A0] border-[#A8C3A0]/40 hover:bg-[#356859]/30' }
  ];

  const filteredCards = activeCategory === 'all' 
    ? simulationCards 
    : simulationCards.filter(c => c.category === activeCategory);

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-[calc(100vw-2rem)] sm:w-[420px] select-none">
      <div className="bg-[#26332F]/95 backdrop-blur-md text-white rounded-3xl p-3.5 sm:p-4 shadow-2xl border border-[#A8C3A0]/40 space-y-3 animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#356859] text-[#EEF4EC] flex items-center justify-center font-bold shadow-xs">
              <Sliders className="w-4 h-4 text-[#A8C3A0]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-[#EEF4EC] tracking-tight">
                  Simulation Studio
                </span>
                <span className="bg-[#356859] text-[#EEF4EC] text-[9px] font-bold px-1.5 py-0.2 rounded">
                  SIH 26003
                </span>
              </div>
              <p className="text-[11px] text-[#EEF4EC]/70">
                1-Click Live Evaluation Controls
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 bg-[#356859] hover:bg-[#2C574A] text-[#EEF4EC] rounded-xl text-xs font-bold transition flex items-center gap-1 border border-[#A8C3A0]/40 shadow-xs"
          >
            <span>{isOpen ? 'Minimize' : 'Open Studio'}</span>
            {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#A8C3A0]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#A8C3A0]" />}
          </button>
        </div>

        {/* Action Toast Feedback */}
        {lastActionToast && (
          <div className="p-2.5 rounded-xl bg-[#356859] border border-[#A8C3A0]/50 text-[#EEF4EC] text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#5E9367] shrink-0" />
            <span className="truncate">{lastActionToast}</span>
          </div>
        )}

        {/* Expanded Controls */}
        {isOpen && (
          <div className="pt-2 border-t border-[#A8C3A0]/20 space-y-3 animate-in fade-in duration-200">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 bg-[#1F2B27] p-1 rounded-xl border border-[#A8C3A0]/30 text-[11px] font-bold overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'all' ? 'bg-[#356859] text-white' : 'text-[#EEF4EC]/70 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('clinical')}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'clinical' ? 'bg-[#356859] text-white' : 'text-[#EEF4EC]/70 hover:text-white'
                }`}
              >
                Clinical
              </button>
              <button
                onClick={() => setActiveCategory('safety')}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'safety' ? 'bg-[#356859] text-white' : 'text-[#EEF4EC]/70 hover:text-white'
                }`}
              >
                Safety & Map
              </button>
              <button
                onClick={() => setActiveCategory('onboarding')}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'onboarding' ? 'bg-[#356859] text-white' : 'text-[#EEF4EC]/70 hover:text-white'
                }`}
              >
                Setup & Face ID
              </button>
              <button
                onClick={() => setActiveCategory('sync')}
                className={`px-2 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'sync' ? 'bg-[#356859] text-white' : 'text-[#EEF4EC]/70 hover:text-white'
                }`}
              >
                Sync & Vitals
              </button>
            </div>

            {/* Grid of Simulation Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold max-h-72 overflow-y-auto no-scrollbar pt-1">
              {filteredCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleAction(card.id as any, card.label)}
                    className={`p-2.5 bg-[#1F2B27] border rounded-2xl flex items-center gap-2 text-left transition active:scale-95 shadow-xs ${card.color}`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span className="leading-tight truncate">{card.label}</span>
                  </button>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

