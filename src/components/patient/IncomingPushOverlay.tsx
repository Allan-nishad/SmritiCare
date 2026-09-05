import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { speakText, sounds } from '../../utils/audio';
import { 
  Heart, 
  Volume2, 
  CheckCircle2, 
  X, 
  Sparkles,
  MessageCircle
} from 'lucide-react';

export const IncomingPushOverlay: React.FC = () => {
  const { activePushReminder, acknowledgePushReminder, dismissPushReminder, language } = useApp();

  if (!activePushReminder) return null;

  const t = translations[language] || translations.en;

  const handlePlayVoice = () => {
    sounds.playChime();
    speakText(activePushReminder.voiceNoteText || activePushReminder.text, language, { gender: 'female' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6 text-white select-none animate-in zoom-in-95 duration-200">
      <div className="w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 rounded-[2.5rem] p-6 border-2 border-amber-400 shadow-2xl space-y-5 text-center relative">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>Message From {activePushReminder.senderName || 'Priya'}</span>
          </div>

          <button
            onClick={dismissPushReminder}
            className="p-1.5 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Caregiver Avatar & Voice Note */}
        <div className="space-y-3">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
              alt="Caregiver Priya"
              className="w-full h-full object-cover rounded-full border-3 border-amber-400 relative z-10 shadow-lg"
            />
          </div>

          <div>
            <h3 className="text-xl font-black text-white">
              {activePushReminder.senderName || 'Priya'} sent a warm reminder
            </h3>
            <p className="text-xs text-amber-200/90 mt-0.5">
              {activePushReminder.timestamp}
            </p>
          </div>

          {/* Voice Prompt Box */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-500/30 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Spoken Voice Note
              </span>
              <button
                onClick={handlePlayVoice}
                className="px-2.5 py-1 bg-amber-400 text-stone-950 rounded-lg text-xs font-black flex items-center gap-1 hover:bg-amber-300 transition active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Play Voice</span>
              </button>
            </div>
            <p className="text-sm font-bold text-white leading-snug">
              “{activePushReminder.text}”
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => acknowledgePushReminder(activePushReminder.id)}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl transition active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span>{language === 'as' ? 'মই কৰিলোঁ / ধন্যবাদ প্ৰিয়া' : language === 'bn' ? 'আমি করেছি / ধন্যবাদ প্রিয়া' : language === 'mni' ? 'ঐ তৌরে / থাগৎচরি' : language === 'hi' ? 'मैंने कर लिया / धन्यवाद प्रिया' : 'I Did This / Thank You Priya'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
