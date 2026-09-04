import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
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
  RotateCcw
} from 'lucide-react';
import { RoutineItem } from '../../types';

export const DailyRoutineTimeline: React.FC = () => {
  const { routines, toggleRoutine, snoozeRoutine, isOffline } = useApp();
  const [activeDialogItem, setActiveDialogItem] = useState<RoutineItem | null>(null);

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

  const handleConfirmDone = (item: RoutineItem) => {
    sounds.playSuccess();
    confetti({ particleCount: 35, spread: 40 });
    toggleRoutine(item.id);
    setActiveDialogItem(null);
    speakText(`Wonderful, Asha! You completed ${item.title}. Have a lovely day.`);
  };

  const handleSnooze = (item: RoutineItem) => {
    sounds.playFlip();
    snoozeRoutine(item.id);
    setActiveDialogItem(null);
    speakText("No problem, Asha. We will remind you gently later.");
  };

  const completedCount = routines.filter(r => r.completed).length;

  return (
    <section id="routine-section" className="scroll-mt-24">
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft">
        
        {/* Section Title & Today's Progress */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sand-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1 rounded-full border border-sage-200 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>Daily Routine Care</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              My Day Routine
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-sand-100 px-4 py-2 rounded-2xl border border-sand-200">
            <CheckCircle2 className="w-5 h-5 text-sage-600" />
            <span className="text-sm font-extrabold text-stone-800">
              {completedCount} of {routines.length} Completed
            </span>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="mt-6 space-y-4">
          {routines.map((item) => (
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
              <div className="flex items-start gap-3.5">
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

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-stone-500 bg-white px-2.5 py-0.5 rounded-lg border border-sand-200">
                      {item.time}
                    </span>
                    {item.completed && (
                      <span className="text-[11px] font-bold text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full">
                        ✓ Done at {item.completedAt}
                      </span>
                    )}
                    {item.snoozed && !item.completed && (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Remind Later
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base sm:text-lg font-extrabold ${item.completed ? 'text-stone-700 line-through decoration-stone-400' : 'text-stone-900'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto justify-end">
                {item.completed ? (
                  <button
                    onClick={() => toggleRoutine(item.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700 bg-white px-3 py-1.5 rounded-xl border border-sand-200 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Undo</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleSnooze(item)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-sand-100 border border-sand-300 transition active:scale-95"
                    >
                      Remind Me Later
                    </button>
                    <button
                      onClick={() => handleConfirmDone(item)}
                      className="btn-elder-primary text-xs sm:text-sm py-2 px-4 rounded-xl flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Yes, Done</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {isOffline && (
          <div className="mt-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Routine updates are safely recorded offline on Asha's device and will sync automatically to Priya.</span>
          </div>
        )}

      </div>
    </section>
  );
};
