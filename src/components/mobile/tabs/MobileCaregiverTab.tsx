import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Heart, 
  ChevronRight, 
  Sparkles, 
  Send, 
  Pill, 
  Droplets, 
  Footprints, 
  UtensilsCrossed, 
  Bell, 
  Volume2, 
  Check, 
  ArrowUpRight
} from 'lucide-react';

export const MobileCaregiverTab: React.FC = () => {
  const { 
    patient, 
    baselineMetrics, 
    caregiverAlerts, 
    dismissAlert, 
    markAlertAction, 
    isSyncing, 
    lastSyncedTime, 
    syncQueue, 
    triggerSync, 
    sendPushReminder,
    latestPushAcknowledgement,
    setRole
  } = useApp();

  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [justSentPreset, setJustSentPreset] = useState<string | null>(null);

  const presets = [
    {
      id: 'p_med',
      label: '💊 Morning BP Medicine',
      text: 'Ma, please take your morning blood pressure medicine with a cup of warm water.',
      voiceNoteText: 'Ma, remember to take your blood pressure medicine with warm water. I love you!',
      category: 'medicine' as const
    },
    {
      id: 'p_hyd',
      label: '💧 Lemon Citron Water',
      text: 'Aita, drink a fresh glass of warm lemon honey water to stay energized.',
      voiceNoteText: 'Aita, please drink your warm lemon water from the tea table.',
      category: 'hydration' as const
    },
    {
      id: 'p_walk',
      label: '🚶 Courtyard Garden Walk',
      text: 'Ma, time for a gentle 10-minute stroll on the veranda to enjoy the orchids.',
      voiceNoteText: 'Ma, let us take a gentle walk outside to see the fresh marigold flowers.',
      category: 'walk' as const
    },
    {
      id: 'p_lunch',
      label: '🍵 Traditional Meal & Tea',
      text: 'Ma, fresh Joha rice and warm Assam tea are ready for you in the dining room.',
      voiceNoteText: 'Ma, lunch and fresh tea are served for you.',
      category: 'meal' as const
    }
  ];

  const handleSendPreset = (preset: typeof presets[0]) => {
    sendPushReminder({
      text: preset.text,
      category: preset.category,
      senderName: 'Priya',
      voiceNoteText: preset.voiceNoteText
    });
    setJustSentPreset(preset.id);
    setTimeout(() => setJustSentPreset(null), 2500);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    sendPushReminder({
      text: customText.trim(),
      category: 'custom',
      senderName: 'Priya',
      voiceNoteText: customText.trim()
    });
    setCustomText('');
    setShowCustomInput(false);
    setJustSentPreset('custom');
    setTimeout(() => setJustSentPreset(null), 2500);
  };

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-300">
      
      {/* 1. Real-time Asha Acknowledged Toast Alert */}
      {latestPushAcknowledgement && (
        <div className="bg-emerald-600 text-white p-3.5 rounded-2xl shadow-xl border-2 border-emerald-300 flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 stroke-[3] text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-xs">Asha Confirmed Just Now!</div>
            <div className="text-[11px] text-emerald-100 truncate">{latestPushAcknowledgement}</div>
          </div>
        </div>
      )}

      {/* 2. Caregiver Header & Peace of Mind Status */}
      <div className="bg-gradient-to-br from-[#203a2f] via-[#1a3027] to-[#12231c] text-white rounded-3xl p-4 sm:p-5 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-sage-500/30 border border-sage-400/40 text-sage-300 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-stone-100">Priya's Companion Hub</div>
              <div className="text-[11px] text-stone-300">Asha Devi (Mother-in-law)</div>
            </div>
          </div>

          <span className="text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Resting Peacefully</span>
          </span>
        </div>

        {/* Sync & Connectivity status */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-stone-300">Last Telemetry Sync</div>
            <div className="font-bold text-stone-100">{lastSyncedTime}</div>
          </div>

          {syncQueue.length > 0 ? (
            <button
              onClick={triggerSync}
              disabled={isSyncing}
              className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync ({syncQueue.length})</span>
            </button>
          ) : (
            <span className="text-emerald-300 font-bold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>0ms Real-Time Sync</span>
            </span>
          )}
        </div>
      </div>

      {/* 3. Send Remote Voice Reminder (Game-Changing Feature) */}
      <div className="bg-white rounded-3xl p-4 border-2 border-sand-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-terracotta-700">
            <Send className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Send Remote Voice Reminder</span>
          </div>
          <span className="text-[10px] font-bold text-stone-500 bg-sand-100 px-2 py-0.5 rounded-full">
            Speaks Out Loud to Asha
          </span>
        </div>

        <p className="text-xs text-stone-600">
          Tap any preset to broadcast an immediate audio chime & gentle spoken reminder to Asha's phone.
        </p>

        {/* 1-Tap Preset Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSendPreset(p)}
              className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all active:scale-95 flex items-center justify-between ${
                justSentPreset === p.id
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400'
                  : 'bg-sand-50 hover:bg-sand-100 border-sand-200 text-stone-800'
              }`}
            >
              <span className="truncate">{p.label}</span>
              {justSentPreset === p.id ? (
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              ) : (
                <Send className="w-3.5 h-3.5 text-terracotta-500 shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Custom Message Toggle */}
        {showCustomInput ? (
          <form onSubmit={handleSendCustom} className="pt-1 space-y-2">
            <input 
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type a custom warm voice note for Asha..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 text-xs focus:ring-2 focus:ring-terracotta-500 text-stone-900 outline-none"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-xl text-xs font-bold transition"
              >
                Send Voice Push
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowCustomInput(true)}
            className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <span>+ Write Custom Voice Reminder</span>
          </button>
        )}
      </div>

      {/* 4. Asha vs Asha 7-Day Baseline Metrics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-stone-700">
            Asha vs Asha Personal Baseline
          </h4>
          <span className="text-[10px] text-stone-500 font-medium">N-of-1 Long-term</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {baselineMetrics.map((m, idx) => (
            <div 
              key={idx}
              className="bg-white p-3.5 rounded-2xl border border-sand-200 shadow-sm space-y-1"
            >
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-tight truncate">
                {m.name}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-stone-900 font-serif">{m.score}</span>
                <span className="text-xs font-bold text-stone-500">{m.unit}</span>
              </div>
              <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1 truncate">
                <TrendingUp className="w-3 h-3 shrink-0" />
                <span className="truncate">{m.trendText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Care Alerts & Actions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black uppercase tracking-wider text-stone-700">
            Care Insights & Alerts
          </h4>
          <span className="text-[10px] text-terracotta-600 font-bold">
            {caregiverAlerts.filter(a => !a.dismissed).length} Active
          </span>
        </div>

        <div className="space-y-2">
          {caregiverAlerts.filter(a => !a.dismissed).map((alert) => (
            <div 
              key={alert.id}
              className={`p-3.5 rounded-2xl border ${
                alert.type === 'attention'
                  ? 'bg-amber-50/90 border-amber-300'
                  : 'bg-white border-sand-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-stone-500">{alert.timestamp}</span>
                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-sand-200 text-stone-800">
                  {alert.significance}
                </span>
              </div>
              <h5 className="font-bold text-xs text-stone-900 mb-0.5">{alert.title}</h5>
              <p className="text-[11px] text-stone-600 mb-2">{alert.description}</p>
              
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-sand-200">
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-[10px] text-stone-500 hover:text-stone-800"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => markAlertAction(alert.id)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition ${
                    alert.actionTaken ? 'bg-emerald-600 text-white' : 'bg-terracotta-600 text-white'
                  }`}
                >
                  {alert.actionTaken ? '✓ Action Logged' : 'Take Action'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Desktop Hub Link */}
      <div className="pt-1">
        <button
          onClick={() => setRole('caregiver')}
          className="w-full py-2.5 bg-sand-100 hover:bg-sand-200 text-stone-800 border border-sand-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
        >
          <span>Open Full Desktop Caregiver Studio</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
