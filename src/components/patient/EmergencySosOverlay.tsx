import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { 
  PhoneCall, 
  PhoneOff, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Radio
} from 'lucide-react';

export const EmergencySosOverlay: React.FC = () => {
  const { sosStep, resetSosFlow, emergencyContacts, generatedSosSms, language } = useApp();
  const [callDuration, setCallDuration] = useState(0);

  const t = translations[language] || translations.en;

  useEffect(() => {
    let timer: any;
    if (sosStep === 'connected_rahul') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [sosStep]);

  if (sosStep === 'idle') return null;

  const meera = emergencyContacts.find(c => c.id === 'c1') || emergencyContacts[0];
  const rahul = emergencyContacts.find(c => c.id === 'c2') || emergencyContacts[1];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 text-white select-none animate-in fade-in duration-200">
      
      {/* Container Phone Screen Style */}
      <div className="w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-950 to-black rounded-[3rem] p-6 sm:p-8 border-4 border-red-500/50 shadow-2xl space-y-6 text-center relative overflow-hidden">
        
        {/* Glowing Top SOS Banner */}
        <div className="inline-flex items-center gap-2 bg-red-600/30 text-red-300 border border-red-500/50 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider animate-pulse">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Emergency Assistance System</span>
        </div>

        {/* STAGE 1: Calling Meera */}
        {sosStep === 'calling_meera' && (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="relative mx-auto w-28 h-28">
              <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
              <img 
                src={meera.photoUrl} 
                alt={meera.name} 
                className="w-full h-full object-cover rounded-full border-4 border-amber-400 relative z-10 shadow-xl"
              />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Contact 1 (Primary)
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">
                {meera.name}
              </h3>
              <p className="text-xs text-stone-400 font-medium">
                {meera.relationship} • {meera.phone}
              </p>
            </div>

            <div className="py-2.5 px-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center gap-2 text-amber-200 text-xs font-bold">
              <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Calling primary contact...</span>
            </div>
          </div>
        )}

        {/* STAGE 2: Meera Failed (Transitioning to Fallback) */}
        {sosStep === 'meera_failed' && (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="mx-auto w-28 h-28 rounded-full bg-red-950/80 border-4 border-red-500 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-400 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-bold text-red-300 uppercase tracking-widest">
                No Answer from Meera
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Initiating 2-Contact Fallback
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Zero human delay. Automatically routing to Contact 2 (Rahul Sharma)...
              </p>
            </div>
          </div>
        )}

        {/* STAGE 3: Calling Rahul (Secondary Fallback) */}
        {sosStep === 'calling_rahul' && (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="relative mx-auto w-28 h-28">
              <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping" />
              <img 
                src={rahul.photoUrl} 
                alt={rahul.name} 
                className="w-full h-full object-cover rounded-full border-4 border-amber-400 relative z-10 shadow-xl"
              />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Contact 2 (Fallback Active)
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">
                {rahul.name}
              </h3>
              <p className="text-xs text-stone-400 font-medium">
                {rahul.relationship} • {rahul.phone}
              </p>
            </div>

            <div className="py-2.5 px-4 bg-amber-500/20 rounded-2xl border border-amber-500/30 flex items-center justify-center gap-2 text-amber-200 text-xs font-bold">
              <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Ringing Rahul Sharma...</span>
            </div>
          </div>
        )}

        {/* STAGE 4: Connected to Rahul & SMS Generated */}
        {sosStep === 'connected_rahul' && (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="relative mx-auto w-28 h-28">
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse" />
              <img 
                src={rahul.photoUrl} 
                alt={rahul.name} 
                className="w-full h-full object-cover rounded-full border-4 border-emerald-400 relative z-10 shadow-xl"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-3 py-0.5 rounded-full text-xs font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Call Connected • {formatDuration(callDuration)}</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {rahul.name}
              </h3>
              <p className="text-xs text-stone-300">
                “Ma, I hear you! I am coming right away with Priya.”
              </p>
            </div>

            {/* Emergency SMS Broadcast Card */}
            {generatedSosSms && (
              <div className="p-3 bg-stone-900/90 rounded-2xl border border-emerald-500/30 text-left space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-black text-[11px] uppercase tracking-wider">
                  <Send className="w-3.5 h-3.5" />
                  <span>Automated GPS SMS Broadcast Sent</span>
                </div>
                <p className="text-stone-300 text-[11px] font-mono leading-relaxed">
                  {generatedSosSms}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Emergency Cancel / End Call Button */}
        <div className="pt-2">
          <button
            onClick={resetSosFlow}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
          >
            <PhoneOff className="w-5 h-5" />
            <span>{sosStep === 'connected_rahul' ? 'End Emergency Call' : 'Cancel SOS Call'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
