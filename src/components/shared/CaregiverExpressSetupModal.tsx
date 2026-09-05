import React from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  X, 
  User, 
  Heart, 
  Clock, 
  MapPin, 
  Watch, 
  Volume2, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface CaregiverExpressSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaregiverExpressSetupModal: React.FC<CaregiverExpressSetupModalProps> = ({
  isOpen,
  onClose
}) => {
  const { setRole } = useApp();

  if (!isOpen) return null;

  const handleLaunch = () => {
    sounds.playSuccess();
    confetti({ particleCount: 70, spread: 60 });
    setRole('caregiver');
    onClose();
  };

  const handleTestVoice = () => {
    speakText("Ma, your morning blood pressure medicine is ready with a cup of warm water.", 'as');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in">
      <div className="bg-[#F8F5ED] text-[#26332F] rounded-[2.5rem] max-w-xl w-full border-3 border-[#356859]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Banner in Deep Forest Green */}
        <div className="bg-[#356859] text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-[#A8C3A0]/30 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white mb-2 border border-white/20">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Option 1: Caregiver Express 1-Min Rapid Setup</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
            1-Click Pre-Configured Setup
          </h3>
          <p className="text-xs sm:text-sm text-[#A8C3A0] mt-1 font-medium">
            How a caretaker sets up SmritiCare for Asha Devi in under 60 seconds
          </p>
        </div>

        {/* 5-Step Pipeline Card Stack */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-3 flex-1">
          
          {/* Step 1 Pill */}
          <div className="bg-[#EEF4EC] p-3.5 rounded-2xl border border-[#A8C3A0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#356859] text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#26332F]">Patient Identity & Regional Context</h4>
                <p className="text-[11px] text-[#526861]">Asha Devi (74 yrs, O+) • Assamese Native Dialect • Early MCI</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-[#356859] bg-[#A8C3A0]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" /> Preloaded
            </span>
          </div>

          {/* Step 2 Pill */}
          <div className="bg-[#EEF4EC] p-3.5 rounded-2xl border border-[#A8C3A0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D88965] text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#26332F]">Family Voice & Cultural Anchors</h4>
                <p className="text-[11px] text-[#526861]">Meera Devi (Daughter) Voice Sample • Bihu & Flute Music</p>
              </div>
            </div>
            <button
              onClick={handleTestVoice}
              className="text-[10px] font-bold text-[#D88965] bg-white hover:bg-[#FAEFE9] px-2.5 py-1 rounded-lg border border-[#D88965]/40 flex items-center gap-1 transition"
            >
              <Volume2 className="w-3 h-3" /> Sample
            </button>
          </div>

          {/* Step 3 Pill */}
          <div className="bg-[#EEF4EC] p-3.5 rounded-2xl border border-[#A8C3A0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#356859] text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#26332F]">Feeding & Medication Timetable</h4>
                <p className="text-[11px] text-[#526861]">08:00 AM BP Pill • 11:00 AM Lemon Water • 01:00 PM Joha Rice</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-[#356859] bg-[#A8C3A0]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" /> Scheduled
            </span>
          </div>

          {/* Step 4 Pill */}
          <div className="bg-[#EEF4EC] p-3.5 rounded-2xl border border-[#A8C3A0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#5E9367] text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#26332F]">Geofence Safe Radius & 2-Tier SOS</h4>
                <p className="text-[11px] text-[#526861]">400m Perimeter at Silpukhuri • Meera ➔ Rahul ➔ GMCH</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-[#5E9367] bg-[#EAF3EC] px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Armed
            </span>
          </div>

          {/* Step 5 Pill */}
          <div className="bg-[#EEF4EC] p-3.5 rounded-2xl border border-[#A8C3A0]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#356859] text-white flex items-center justify-center font-bold text-xs">
                5
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#26332F]">Wearable Smartband GPS Band v2</h4>
                <p className="text-[11px] text-[#526861]">BLE 5.2 Auto-Paired • 88% Battery • Separation Sensor Active</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-[#5E9367] bg-[#EAF3EC] px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E9367] animate-pulse" /> Live
            </span>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-6 bg-[#EEF4EC] border-t border-[#A8C3A0]/40 flex items-center justify-between shrink-0">
          <div className="text-xs text-[#526861] font-bold">
            All 5 layers synchronized in 1 click
          </div>

          <button
            type="button"
            onClick={handleLaunch}
            className="px-6 py-3 bg-[#356859] hover:bg-[#2C574A] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition active:scale-95 flex items-center gap-2"
          >
            <span>Launch Caregiver Hub</span>
            <ArrowRight className="w-4 h-4 text-[#A8C3A0]" />
          </button>
        </div>

      </div>
    </div>
  );
};
