import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import { translations, getLocalizedRoutine } from '../../utils/translations';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Clock, 
  Pill, 
  Brain, 
  Droplets, 
  UtensilsCrossed, 
  Footprints, 
  PhoneCall, 
  Bell, 
  Heart, 
  Sparkles,
  Check,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { RoutineItem } from '../../types';

export const DailyRoutineTimeline: React.FC = () => {
  const { routines, toggleRoutine, snoozeRoutine, language, isOffline } = useApp();
  const t = translations[language] || translations.en;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medicine': return <Pill className="w-6 h-6 text-terracotta-600" />;
      case 'activity': return <Brain className="w-6 h-6 text-terracotta-600" />;
      case 'hydration': return <Droplets className="w-6 h-6 text-sky-600" />;
      case 'meal': return <UtensilsCrossed className="w-6 h-6 text-amber-600" />;
      case 'walk': return <Footprints className="w-6 h-6 text-sage-600" />;
      case 'family': return <PhoneCall className="w-6 h-6 text-terracotta-600" />;
      default: return <Clock className="w-6 h-6 text-stone-600" />;
    }
  };

  const handleReadItem = (item: RoutineItem) => {
    const loc = getLocalizedRoutine(item, language);
    speakText(loc.spokenText, language);
  };

  const handleToggle = (item: RoutineItem) => {
    const isNowDone = !item.completed;
    if (isNowDone) {
      sounds.playSuccess();
      confetti({ particleCount: 35, spread: 40 });
    }
    toggleRoutine(item.id);
  };

  const completedCount = routines.filter(r => r.completed).length;

  return (
    <section id="routine-section" className="scroll-mt-24 select-none">
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
        
        {/* Section Title & Today's Progress */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1 rounded-full border border-sage-200 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>{t.routineTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {t.todayLabel}
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-sand-100 px-4 py-2 rounded-2xl border border-sand-200">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-extrabold text-stone-800">
              {completedCount} / {routines.length} {t.completedPeacefully || 'Done'}
            </span>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="space-y-4">
          {routines.map((item) => {
            const loc = getLocalizedRoutine(item, language);

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  item.completed
                    ? 'bg-sage-50/70 border-sage-200 opacity-90'
                    : item.snoozed
                    ? 'bg-amber-50/80 border-amber-200'
                    : 'bg-sand-50/60 border-sand-200 hover:border-sand-300'
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    item.completed
                      ? 'bg-sage-100 border-sage-300 text-sage-700'
                      : 'bg-white border-sand-300 shadow-sm'
                  }`}>
                    {item.completed ? (
                      <Check className="w-6 h-6 text-sage-700 font-extrabold" />
                    ) : (
                      getCategoryIcon(item.category)
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black bg-stone-900 text-amber-300 px-2.5 py-0.5 rounded-md">
                        {item.time}
                      </span>
                      {item.snoozed && (
                        <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                          Snoozed
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-1">
                      {loc.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                      {loc.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Read Aloud Button for illiterate elderly */}
                  <button
                    onClick={() => handleReadItem(item)}
                    className="p-3 bg-sand-200 hover:bg-sand-300 text-stone-800 rounded-2xl font-bold flex items-center justify-center transition active:scale-95 shrink-0"
                    title={t.listenVoiceNote || "Read instructions out loud"}
                  >
                    <Volume2 className="w-5 h-5 text-terracotta-600" />
                  </button>

                  <button
                    onClick={() => handleToggle(item)}
                    className={`flex-1 sm:flex-initial py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow transition active:scale-95 ${
                      item.completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 hover:bg-black text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{item.completed ? (t.completedPeacefully || '✓ Done') : (t.markAsCompleted || 'Mark Done')}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
