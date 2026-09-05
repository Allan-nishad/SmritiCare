import React from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import { 
  Watch, 
  Smartphone, 
  AlertTriangle, 
  Radio, 
  X, 
  Volume2, 
  Check, 
  BellRing,
  ShieldAlert,
  ArrowRight,
  Wifi
} from 'lucide-react';

interface PhoneSeparationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneSeparationModal: React.FC<PhoneSeparationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { smartbandMetrics, location, patient } = useApp();

  if (!isOpen) return null;

  const handleRingPhone = () => {
    sounds.playWarning();
    speakText("Asha Devi, your smartphone is ringing on the veranda table.", 'as');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in">
      <div className="bg-stone-950 text-white rounded-[2.5rem] max-w-lg w-full border-2 border-red-500 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center relative ring-4 ring-red-500/20">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Pill */}
        <div className="inline-flex items-center gap-2 bg-red-950/80 text-red-300 text-xs font-black px-4 py-1 rounded-full border border-red-500/50">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span>SMARTBAND PROXIMITY SEPARATION ALERT (BLE RSSI)</span>
        </div>

        {/* Visual Device Separation Graphic */}
        <div className="bg-stone-900/90 rounded-3xl p-6 border border-stone-800 space-y-4">
          <div className="flex items-center justify-center gap-6">
            
            {/* Phone */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-lg">
                <Smartphone className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-stone-400">Phone in Room</span>
            </div>

            {/* Pulsing Wireless Separation Wave */}
            <div className="flex flex-col items-center space-y-1">
              <div className="flex items-center gap-1 text-red-400">
                <Radio className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-mono font-black">18 METERS</span>
              </div>
              <span className="text-[10px] text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded-md border border-red-500/30">
                Out of BLE Range
              </span>
            </div>

            {/* Smartband on Wrist */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border-2 border-blue-400 text-blue-300 flex items-center justify-center shadow-lg animate-bounce">
                <Watch className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-blue-300">Band on Asha</span>
            </div>

          </div>

          <div className="p-3 bg-red-950/40 rounded-2xl border border-red-500/30 text-xs text-red-200 text-left space-y-1">
            <strong className="text-white">Wrist Haptic Vibration Triggered: </strong>
            <span>Asha's Smartband GPS Band v2 is gently vibrating on her wrist with message: <em>“Phone left behind on table — GPS Band is actively safeguarding you.”</em></span>
          </div>
        </div>

        {/* Telemetry Status */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="bg-stone-900 p-3 rounded-2xl border border-stone-800">
            <div className="text-[10px] font-bold text-stone-500 uppercase">Independent Band Mode</div>
            <div className="text-xs font-black text-emerald-400">Cellular & GPS Fallback Active</div>
          </div>
          <div className="bg-stone-900 p-3 rounded-2xl border border-stone-800">
            <div className="text-[10px] font-bold text-stone-500 uppercase">Caregiver Notification</div>
            <div className="text-xs font-black text-red-400">Priya Alerted (Red Banner)</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleRingPhone}
            className="py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <BellRing className="w-4 h-4" />
            <span>Ring Asha's Phone Out Loud</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs rounded-xl transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Acknowledge (Safe in Garden)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
