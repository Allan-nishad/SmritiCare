import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Pill, 
  Droplets, 
  UtensilsCrossed, 
  Brain, 
  Footprints, 
  PhoneCall, 
  Bell, 
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';

export const MobileRoutineTab: React.FC = () => {
  const { routines, toggleRoutine, snoozeRoutine, isOffline } = useApp();

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

  const completedCount = routines.filter(r => r.completed).length;
  const progressPercent = Math.round((completedCount / (routines.length || 1)) * 100);

  return (
    <div className="space-y-4 pb-4">
      {/* Routine Progress Header */}
      <div className="bg-white rounded-2xl p-4 border border-sand-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-stone-900 font-serif">Daily Routine Support</h3>
            <p className="text-xs text-stone-500">Gentle rhythm for peace of mind</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-terracotta-600">{completedCount}/{routines.length}</span>
            <div className="text-[10px] text-stone-400 font-medium">Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-sand-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-terracotta-500 to-sage-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {isOffline && (
          <div className="flex items-center gap-1.5 text-[10px] text-stone-500 bg-sand-100 p-2 rounded-xl border border-sand-200">
            <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Offline-first: Checklist changes are safely stored on device and sync when reconnected.</span>
          </div>
        )}
      </div>

      {/* Routine Items List */}
      <div className="space-y-2.5">
        {routines.map((item) => (
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

                  {item.completed && item.completedAt && (
                    <span className="text-[10px] text-sage-700 font-bold">
                      Done at {item.completedAt}
                    </span>
                  )}

                  {!item.completed && item.snoozed && (
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                      Snoozed 15m
                    </span>
                  )}
                </div>

                <h4 className={`font-bold text-xs ${item.completed ? 'text-stone-600 line-through' : 'text-stone-900'}`}>
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>

                {/* Actions when not completed */}
                {!item.completed && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-sand-100">
                    <button
                      onClick={() => toggleRoutine(item.id)}
                      className="text-[10px] font-bold text-terracotta-600 hover:text-terracotta-700 active:scale-95"
                    >
                      ✓ Mark Complete
                    </button>
                    <span className="text-stone-300">•</span>
                    <button
                      onClick={() => snoozeRoutine(item.id)}
                      className="text-[10px] font-medium text-stone-500 hover:text-stone-800 active:scale-95"
                    >
                      Remind in 15 mins
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
