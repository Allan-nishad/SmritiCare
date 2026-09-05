import React from 'react';
import { useApp } from '../../../context/AppContext';
import { translations, getLocalizedRoutine } from '../../../utils/translations';
import { speakText, sounds } from '../../../utils/audio';
import { 
  CheckCircle2, 
  Clock, 
  Pill, 
  Droplets, 
  UtensilsCrossed, 
  Brain, 
  Footprints, 
  PhoneCall, 
  Volume2, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { RoutineItem } from '../../../types';

export const MobileRoutineTab: React.FC = () => {
  const { routines, toggleRoutine, snoozeRoutine, language, isOffline } = useApp();
  const t = translations[language] || translations.en;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'medicine': return <Pill className="w-4 h-4 text-red-500" />;
      case 'hydration': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'meal': return <UtensilsCrossed className="w-4 h-4 text-amber-500" />;
      case 'activity': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'walk': return <Footprints className="w-4 h-4 text-emerald-500" />;
      case 'family': return <PhoneCall className="w-4 h-4 text-pink-500" />;
      default: return <Clock className="w-4 h-4 text-stone-500" />;
    }
  };

  const handleReadItem = (item: RoutineItem) => {
    const loc = getLocalizedRoutine(item, language);
    speakText(loc.spokenText, language);
  };

  const completedCount = routines.filter(r => r.completed).length;
  const progressPercent = Math.round((completedCount / (routines.length || 1)) * 100);

  return (
    <div className="space-y-4 pb-4 select-none">
      {/* Routine Progress Header */}
      <div className="bg-white rounded-2xl p-4 border border-sand-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-stone-900 font-serif">{t.routineTitle}</h3>
            <p className="text-xs text-stone-500">{t.todayLabel}</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-terracotta-600">{completedCount}/{routines.length}</span>
            <div className="text-[10px] text-stone-400 font-medium">Done</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-sand-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-terracotta-500 to-sage-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Routine Items List */}
      <div className="space-y-2.5">
        {routines.map((item) => {
          const loc = getLocalizedRoutine(item, language);

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.completed
                  ? 'bg-sage-50/70 border-sage-200 opacity-90'
                  : item.snoozed
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-white border-sand-200 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox Trigger */}
                <button
                  onClick={() => toggleRoutine(item.id)}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition active:scale-90 mt-0.5 ${
                    item.completed
                      ? 'bg-sage-600 text-white shadow-sm'
                      : 'border-2 border-sand-300 hover:border-terracotta-400 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      item.completed ? 'bg-sage-100 text-sage-800' : 'bg-sand-100 text-stone-600'
                    }`}>
                      {getCategoryIcon(item.category)}
                      <span>{item.time}</span>
                    </span>

                    {/* Speaker Read-Aloud for Illiterate Users */}
                    <button
                      onClick={() => handleReadItem(item)}
                      className="p-1 text-terracotta-600 hover:bg-sand-100 rounded-lg transition"
                      title="Speak instructions"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className={`font-bold text-xs ${item.completed ? 'text-stone-600 line-through' : 'text-stone-900'}`}>
                    {loc.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                    {loc.subtitle}
                  </p>

                  {/* Actions when not completed */}
                  {!item.completed && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-sand-100">
                      <button
                        onClick={() => toggleRoutine(item.id)}
                        className="text-[10px] font-bold text-terracotta-600 hover:text-terracotta-700 active:scale-95"
                      >
                        ✓ Done
                      </button>
                      <span className="text-stone-300">•</span>
                      <button
                        onClick={() => snoozeRoutine(item.id)}
                        className="text-[10px] font-medium text-stone-500 hover:text-stone-800 active:scale-95"
                      >
                        {t.alarmSnoozeBtn}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
