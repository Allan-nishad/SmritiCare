import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  X, 
  ShieldCheck, 
  User, 
  Scan, 
  Heart,
  Lock,
  Unlock,
  AlertCircle
} from 'lucide-react';

interface PatientFaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientFaceRecognitionModal: React.FC<PatientFaceRecognitionModalProps> = ({
  isOpen,
  onClose
}) => {
  const { patient, language, setRole } = useApp();
  const [scanState, setScanState] = useState<'scanning' | 'matched' | 'unlocked'>('scanning');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setScanState('scanning');
      setScanProgress(0);

      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState('matched');
            sounds.playSuccess();
            speakText("Asha Devi, your face has been recognized. Welcome back home!", 'as');
            confetti({ particleCount: 50, spread: 50 });
            return 100;
          }
          return prev + 20;
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEnterApp = () => {
    sounds.playSuccess();
    setScanState('unlocked');
    setRole('patient');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in">
      <div className="bg-stone-950 text-white rounded-[2.5rem] max-w-md w-full border-2 border-amber-400/60 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/40">
            <Scan className="w-3.5 h-3.5" />
            <span>Elderly-Friendly Biometric Access (No PINs / Passwords)</span>
          </div>
          <h3 className="text-2xl font-extrabold font-serif text-white pt-1">
            Face Recognition Access
          </h3>
          <p className="text-xs text-stone-400">
            Natural face verification tailored for elderly dementia patients
          </p>
        </div>

        {/* Simulated Camera Viewfinder Frame */}
        <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-amber-400/70 shadow-2xl bg-stone-900 flex items-center justify-center group">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" 
            alt="Asha Devi"
            className="w-full h-full object-cover grayscale-[30%] brightness-90 group-hover:scale-105 transition-all duration-700" 
          />

          {/* Animated Scanning Grid Reticle */}
          {scanState === 'scanning' && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent animate-pulse pointer-events-none flex flex-col justify-center items-center">
              <div className="w-40 h-40 border-2 border-dashed border-amber-300 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 shadow-[0_0_15px_#f59e0b] animate-bounce" />
            </div>
          )}

          {/* Matched Overlay */}
          {scanState === 'matched' && (
            <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl mb-1">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black uppercase text-emerald-300">
                Match Verified 99.4%
              </span>
            </div>
          )}
        </div>

        {/* Status Text & Progress */}
        <div className="space-y-2">
          {scanState === 'scanning' ? (
            <div className="space-y-2">
              <div className="text-sm font-bold text-amber-300">
                Scanning facial biometric points... ({scanProgress}%)
              </div>
              <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-400 italic">
                Looking directly into the front camera. No password memory required.
              </p>
            </div>
          ) : (
            <div className="space-y-2 animate-in fade-in">
              <h4 className="text-xl font-black text-emerald-400 font-serif">
                Welcome Back, Asha Devi!
              </h4>
              <p className="text-xs text-stone-300 font-medium">
                Biometric profile confirmed. Unlocking your personalized home and memory space.
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        {scanState === 'matched' && (
          <button
            onClick={handleEnterApp}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-black text-sm rounded-2xl shadow-xl transition active:scale-95 flex items-center justify-center gap-2 animate-in slide-in-from-bottom"
          >
            <Unlock className="w-4 h-4" />
            <span>Enter Asha's Personal Space ✓</span>
          </button>
        )}

      </div>
    </div>
  );
};
