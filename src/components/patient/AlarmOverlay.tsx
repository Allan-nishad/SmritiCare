import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { speakText, sounds } from '../../utils/audio';
import { 
  Bell, 
  Check, 
  Clock, 
  Pill, 
  Droplets, 
  UtensilsCrossed, 
  Calendar, 
  Footprints, 
  Volume2, 
  Heart,
  AlertTriangle
} from 'lucide-react';

export const AlarmOverlay: React.FC = () => {
  const { alarmOverlay, dismissAlarm, snoozeAlarm, language } = useApp();

  if (!alarmOverlay || !alarmOverlay.isOpen) return null;

  const t = translations[language] || translations.en;

  const getCategoryIcon = () => {
    switch (alarmOverlay.category) {
      case 'medicine':
        return <Pill className="w-16 h-16 text-amber-300 animate-pulse" />;
      case 'hydration':
        return <Droplets className="w-16 h-16 text-cyan-300 animate-pulse" />;
      case 'meal':
        return <UtensilsCrossed className="w-16 h-16 text-emerald-300 animate-pulse" />;
      case 'appointment':
        return <Calendar className="w-16 h-16 text-red-300 animate-pulse" />;
      case 'walk':
        return <Footprints className="w-16 h-16 text-green-300 animate-pulse" />;
      default:
        return <Bell className="w-16 h-16 text-amber-300 animate-pulse" />;
    }
  };

  const handleReadAloud = () => {
    const text = `${alarmOverlay.title}. ${alarmOverlay.subtitle}`;
    speakText(text, language);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 text-white select-none animate-in fade-in duration-300">
      
      {/* Outer Pulse Rings for Alarm Attention */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-36 h-36 rounded-full bg-amber-500/30 animate-ping" />
        <div className="absolute w-28 h-28 rounded-full bg-amber-500/40 animate-pulse" />
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-terracotta-600 to-amber-500 flex items-center justify-center shadow-2xl relative z-10 border-4 border-white/20">
          {getCategoryIcon()}
        </div>
      </div>

      {/* Priority Pill & Snooze Indicator */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border ${
          alarmOverlay.priority === 'critical'
            ? 'bg-red-600/90 text-white border-red-400'
            : 'bg-amber-500/80 text-black border-amber-300'
        }`}>
          {alarmOverlay.priority === 'critical' ? 'Priority Reminder' : 'Routine Reminder'}
        </span>

        {alarmOverlay.snoozeCount > 0 && (
          <span className="bg-stone-800 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-stone-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Snoozed {alarmOverlay.snoozeCount} {alarmOverlay.snoozeCount === 1 ? 'time' : 'times'}</span>
          </span>
        )}
      </div>

      {/* Alarm Title & Message (Huge, high-contrast, crystal readable) */}
      <div className="text-center max-w-xl space-y-3 mb-8">
        <div className="text-amber-300 font-mono text-xl sm:text-2xl font-bold">
          {alarmOverlay.time}
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-black font-serif leading-tight text-white tracking-tight">
          {alarmOverlay.title}
        </h2>

        <p className="text-lg sm:text-2xl text-stone-300 font-medium leading-snug">
          {alarmOverlay.subtitle}
        </p>

        {alarmOverlay.callerName && (
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm text-stone-200 mt-2">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Reminded with care by {alarmOverlay.callerName}</span>
          </div>
        )}
      </div>

      {/* Audio Read-out Helper Button */}
      <button
        onClick={handleReadAloud}
        className="mb-8 px-6 py-3 bg-stone-800/80 hover:bg-stone-700 text-stone-200 rounded-full font-bold text-base flex items-center gap-2.5 border border-stone-600 active:scale-95 transition"
      >
        <Volume2 className="w-6 h-6 text-amber-400" />
        <span>Listen to instructions</span>
      </button>

      {/* Giant Action Buttons for Elderly Patients */}
      <div className="w-full max-w-md space-y-4">
        
        {/* Main [ DONE / I TOOK IT ] Button */}
        <button
          onClick={() => dismissAlarm(true)}
          className="w-full py-6 px-8 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-2xl sm:text-3xl shadow-2xl flex items-center justify-center gap-4 transition active:scale-95 border-4 border-emerald-300"
        >
          <Check className="w-10 h-10 stroke-[3.5]" />
          <span>{t.alarmDoneBtn}</span>
        </button>

        {/* [ SNOOZE 10 MINS ] Button */}
        <button
          onClick={snoozeAlarm}
          className="w-full py-4 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition active:scale-95 border border-stone-700"
        >
          <Clock className="w-6 h-6" />
          <span>{t.alarmSnoozeBtn}</span>
        </button>
      </div>

      {/* Snooze 3x escalation notice if applicable */}
      {alarmOverlay.snoozeCount >= 2 && (
        <div className="mt-6 flex items-center gap-2 text-xs text-amber-300/80 bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-800/50">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Next snooze will automatically notify Priya to ensure your comfort.</span>
        </div>
      )}

    </div>
  );
};
