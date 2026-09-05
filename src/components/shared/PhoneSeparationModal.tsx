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
      <div className="bg-[#26332F] text-white rounded-[2.5rem] max-w-lg w-full border-2 border-[#C95C5C] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center relative ring-4 ring-[#C95C5C]/20">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#EEF4EC] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Pill */}
        <div className="inline-flex items-center gap-2 bg-[#C95C5C]/20 text-[#FCECEC] text-xs font-black px-4 py-1 rounded-full border border-[#C95C5C]/50">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C95C5C] animate-ping" />
          <span>SMARTBAND PROXIMITY SEPARATION ALERT (BLE RSSI)</span>
        </div>

        {/* Visual Device Separation Graphic */}
        <div className="bg-[#1A2320] rounded-3xl p-6 border border-[#A8C3A0]/30 space-y-4">
          <div className="flex items-center justify-center gap-6">
            
            {/* Phone */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-16 h-16 rounded-2xl bg-[#D88965]/20 border-2 border-[#D88965] text-[#D88965] flex items-center justify-center shadow-lg">
                <Smartphone className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-[#EEF4EC]/70">Phone in Room</span>
            </div>

            {/* Pulsing Wireless Separation Wave */}
            <div className="flex flex-col items-center space-y-1">
              <div className="flex items-center gap-1 text-[#C95C5C]">
                <Radio className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-mono font-black">18 METERS</span>
              </div>
              <span className="text-[10px] text-[#C95C5C] font-bold bg-[#C95C5C]/20 px-2 py-0.5 rounded-md border border-[#C95C5C]/40">
                Out of BLE Range
              </span>
            </div>

            {/* Smartband on Wrist */}
            <div className="flex flex-col items-center space-y-1">
              <div className="w-16 h-16 rounded-2xl bg-[#356859]/40 border-2 border-[#A8C3A0] text-[#A8C3A0] flex items-center justify-center shadow-lg animate-bounce">
                <Watch className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-bold text-[#A8C3A0]">Band on Asha</span>
            </div>

          </div>

          <div className="p-3 bg-[#C95C5C]/20 rounded-2xl border border-[#C95C5C]/30 text-xs text-[#FCECEC] text-left space-y-1">
            <strong className="text-white">Wrist Haptic Vibration Triggered: </strong>
            <span>Asha's Smartband GPS Band v2 is gently vibrating on her wrist with message: <em>“Phone left behind on table — GPS Band is actively safeguarding you.”</em></span>
          </div>
        </div>

        {/* Telemetry Status */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="bg-[#1A2320] p-3 rounded-2xl border border-[#A8C3A0]/30">
            <div className="text-[10px] font-bold text-[#EEF4EC]/60 uppercase">Independent Band Mode</div>
            <div className="text-xs font-black text-[#5E9367]">Cellular & GPS Fallback Active</div>
          </div>
          <div className="bg-[#1A2320] p-3 rounded-2xl border border-[#A8C3A0]/30">
            <div className="text-[10px] font-bold text-[#EEF4EC]/60 uppercase">Caregiver Notification</div>
            <div className="text-xs font-black text-[#C95C5C]">Priya Alerted (Red Banner)</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleRingPhone}
            className="py-3 bg-[#D88965] hover:bg-[#C4724D] text-white font-black text-xs rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <BellRing className="w-4 h-4" />
            <span>Ring Asha's Phone Out Loud</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 bg-[#356859] hover:bg-[#2C574A] text-white font-bold text-xs rounded-xl transition active:scale-95 flex items-center justify-center gap-2 border border-[#A8C3A0]/40"
          >
            <Check className="w-4 h-4 text-[#5E9367]" />
            <span>Acknowledge (Safe in Garden)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
