import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { InteractiveMap } from '../../shared/InteractiveMap';
import { sounds, speakText } from '../../../utils/audio';
import confetti from 'canvas-confetti';
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
  ArrowUpRight,
  User,
  Watch,
  Moon,
  BatteryCharging,
  Thermometer,
  Home,
  Plus,
  Users,
  MapPin,
  Utensils,
  Navigation,
  Brain,
  PhoneCall
} from 'lucide-react';

interface MobileCaregiverTabProps {
  activePage?: 'performance' | 'map' | 'patient_info';
  onPageChange?: (page: 'performance' | 'map' | 'patient_info') => void;
  hideTopSwitcher?: boolean;
}

export const MobileCaregiverTab: React.FC<MobileCaregiverTabProps> = ({
  activePage: propActivePage,
  onPageChange: propOnPageChange,
  hideTopSwitcher = false
}) => {
  const { 
    patient, 
    baselineMetrics, 
    caregiverAlerts, 
    dismissAlert, 
    markAlertAction, 
    routines,
    familyMemories,
    addRoutineItem,
    addFamilyMemory,
    smartbandMetrics,
    location,
    isOffline,
    setIsOffline,
    isSyncing, 
    syncProgressStep,
    lastSyncedTime, 
    syncQueue, 
    triggerSync, 
    sendPushReminder,
    latestPushAcknowledgement,
    triggerSimulation,
    setRole
  } = useApp();

  // 3 Master Pages inside Mobile Caregiver Hub: 1) Health, 2) Map, 3) Patient Info & Feeding
  const [internalActivePage, setInternalActivePage] = useState<'performance' | 'map' | 'patient_info'>('performance');
  const activeMobilePage = propActivePage || internalActivePage;
  const setActiveMobilePage = propOnPageChange || setInternalActivePage;

  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [justSentPreset, setJustSentPreset] = useState<string | null>(null);

  // Form states for feeding data in Mobile Page 3
  const [newRoutineTime, setNewRoutineTime] = useState('03:30 PM');
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [newRoutineCategory, setNewRoutineCategory] = useState<'medicine' | 'hydration' | 'meal' | 'activity' | 'walk' | 'family'>('hydration');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  const activeAlerts = caregiverAlerts.filter(a => !a.dismissed);
  const highPriorityAlerts = activeAlerts.filter(a => 
    a.significance === 'High Priority' || 
    a.type === 'sos' || 
    a.type === 'snooze_warning' || 
    a.title.toLowerCase().includes('warning') || 
    a.title.toLowerCase().includes('geofence')
  );

  const presets = [
    {
      id: 'p_med',
      label: '💊 Morning BP Medicine',
      text: 'Ma, please take your morning blood pressure medicine with warm water.',
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
      label: '🌿 Veranda Garden Rest',
      text: 'Ma, time for a gentle rest on the veranda to enjoy the fresh breeze.',
      voiceNoteText: 'Ma, let us take a gentle rest on the veranda outside.',
      category: 'walk' as const
    },
    {
      id: 'p_lunch',
      label: '🍵 Traditional Joha Rice',
      text: 'Ma, fresh Joha rice and warm Assam tea are ready for you.',
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

  const handleAddQuickRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineTitle) return;

    sounds.playSuccess();
    confetti({ particleCount: 30, spread: 40 });

    addRoutineItem({
      time: newRoutineTime,
      title: newRoutineTitle,
      subtitle: 'Added from Priya Companion App',
      category: newRoutineCategory,
      priority: 'important',
      icon: newRoutineCategory === 'hydration' ? 'Droplets' : 'Heart'
    });

    setNewRoutineTitle('');
    setFormSuccessMessage(`✓ Added "${newRoutineTitle}" synced to Asha!`);
    setTimeout(() => setFormSuccessMessage(''), 3500);
  };

  return (
    <div className="space-y-3.5 text-stone-900 select-none animate-in fade-in pb-4">
      
      {/* Real-time Asha Acknowledged Toast Alert */}
      {latestPushAcknowledgement && (
        <div className="bg-[#5E9367] text-white p-3 rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3] text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-[11px]">Asha Confirmed Just Now!</div>
            <div className="text-[10px] text-emerald-100 truncate">{latestPushAcknowledgement}</div>
          </div>
        </div>
      )}

      {/* 3-PAGE MASTER TABS SWITCHER (Shown only if not in bottom nav mode) */}
      {!hideTopSwitcher && (
        <div className="flex p-1 bg-[#EEF4EC] rounded-xl border border-[#A8C3A0]/60 shadow-inner gap-1">
          <button
            onClick={() => setActiveMobilePage('performance')}
            className={`flex-1 py-2 px-1.5 rounded-lg text-[10.5px] font-black transition-all flex items-center justify-center gap-1 ${
              activeMobilePage === 'performance'
                ? 'bg-[#356859] text-white shadow-sm'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#D88965]" />
            <span>1. 📊 Health</span>
          </button>

          <button
            onClick={() => setActiveMobilePage('map')}
            className={`flex-1 py-2 px-1.5 rounded-lg text-[10.5px] font-black transition-all flex items-center justify-center gap-1 ${
              activeMobilePage === 'map'
                ? 'bg-[#356859] text-white shadow-sm'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#D88965]" />
            <span>2. 🗺️ Safety Map</span>
          </button>

          <button
            onClick={() => setActiveMobilePage('patient_info')}
            className={`flex-1 py-2 px-1.5 rounded-lg text-[10.5px] font-black transition-all flex items-center justify-center gap-1 ${
              activeMobilePage === 'patient_info'
                ? 'bg-[#356859] text-white shadow-sm'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#A8C3A0]" />
            <span>3. 🗂️ Info</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 1: HEALTH, SMART WEARABLES & RED ALERTS                              */}
      {/* ========================================================================= */}
      {activeMobilePage === 'performance' && (
        <div className="space-y-3.5 animate-in fade-in">
          
          {/* Live Sync Status */}
          <div className={`p-2.5 rounded-2xl border text-xs transition ${
            isOffline 
              ? 'bg-amber-500/15 border-amber-400 text-amber-950' 
              : isSyncing 
              ? 'bg-blue-500/15 border-blue-400 text-blue-950' 
              : 'bg-emerald-500/15 border-emerald-400 text-emerald-950'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] text-stone-600 uppercase font-bold">
                  {isOffline ? '⚠️ Patient Offline' : isSyncing ? '⚡ Syncing Offline Pipeline' : '🟢 Real-Time Telemetry'}
                </div>
                <div className="font-extrabold text-[11px]">
                  {isOffline 
                    ? `${syncQueue.length} Updates Cached Locally` 
                    : isSyncing 
                    ? `Step ${syncProgressStep || 1}/3...` 
                    : `Last Synced: ${lastSyncedTime}`}
                </div>
              </div>

              {isOffline ? (
                <button
                  onClick={() => setIsOffline(false)}
                  className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-[10px] px-2.5 py-1 rounded-lg transition active:scale-95 shadow"
                >
                  Restore Online
                </button>
              ) : syncQueue.length > 0 ? (
                <button
                  onClick={triggerSync}
                  disabled={isSyncing}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1 transition active:scale-95 shadow"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Sync ({syncQueue.length})</span>
                </button>
              ) : (
                <span className="text-emerald-800 font-bold text-[10px] flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>0ms Latency</span>
                </span>
              )}
            </div>
          </div>

          {/* ⌚ Smart Devices Telemetry Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-sand-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] font-black text-blue-900 uppercase">
                <Watch className="w-3.5 h-3.5 text-blue-600" />
                <span>Smartband GPS Band v2</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <BatteryCharging className="w-3 h-3 text-amber-600" />
                <span>88% Battery</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="bg-sand-50 p-2 rounded-xl border border-sand-200 text-center">
                <div className="text-[9px] text-stone-500 uppercase font-bold">Heart Rate</div>
                <div className="text-sm font-black text-stone-900 font-serif flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                  <span>{smartbandMetrics.heartRateBpm} bpm</span>
                </div>
                <div className="text-[9px] text-emerald-700 font-bold">Normal</div>
              </div>

              <div className="bg-sand-50 p-2 rounded-xl border border-sand-200 text-center">
                <div className="text-[9px] text-stone-500 uppercase font-bold">Steps</div>
                <div className="text-sm font-black text-stone-900 font-serif">{smartbandMetrics.stepsToday}</div>
                <div className="text-[9px] text-stone-600 font-medium">2.6 km</div>
              </div>

              <div className="bg-sand-50 p-2 rounded-xl border border-sand-200 text-center">
                <div className="text-[9px] text-stone-500 uppercase font-bold">Sleep</div>
                <div className="text-sm font-black text-stone-900 font-serif">{smartbandMetrics.sleepHours}h</div>
                <div className="text-[9px] text-purple-700 font-bold">2.1h Deep</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-600 px-1 pt-1 border-t border-sand-200">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Fall Sensor: Safe
              </span>
              <span>SpO2: <strong>98%</strong> • Temp: <strong>98.4°F</strong></span>
            </div>
          </div>

          {/* 🚨 CRITICAL HIGH PRIORITY RED ALERTS */}
          {highPriorityAlerts.length > 0 && (
            <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-3 shadow-md space-y-2 ring-2 ring-red-400/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-red-950 flex items-center gap-1.5 uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span>🚨 Red Alert ({highPriorityAlerts.length})</span>
                </span>
                <span className="text-[9px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full">
                  Action Required
                </span>
              </div>

              {highPriorityAlerts.map(alert => (
                <div key={alert.id} className="bg-white p-2.5 rounded-xl border border-red-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-red-950">{alert.title}</span>
                    <span className="text-[9px] text-stone-500">{alert.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-red-900">{alert.description}</p>
                  <div className="text-[10px] text-stone-800 bg-red-50 p-1.5 rounded-lg border border-red-200 font-medium">
                    <strong>Priya's Action:</strong> {alert.suggestedAction}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🧠 AI COGNITIVE & PERSONALISATION LONGITUDINAL ANALYTICS */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#A8C3A0]/60 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-black text-[#356859] uppercase">
                <Brain className="w-3.5 h-3.5 text-[#D88965]" />
                <span>Cognitive & Personalization Health</span>
              </div>
              <span className="text-[9px] font-bold text-[#5E9367] bg-[#EEF4EC] px-2 py-0.5 rounded-full border border-[#A8C3A0]/40">
                14-Day AI Baseline
              </span>
            </div>

            {/* 4 Cognitive Domains Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#EEF4EC] p-2.5 rounded-xl border border-[#A8C3A0]/40 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#26332F]">
                  <span>🦏 Family Memory Recall</span>
                  <span className="text-[#356859] font-black">88%</span>
                </div>
                <div className="w-full bg-[#F8F5ED] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#356859] h-full rounded-full" style={{ width: '88%' }} />
                </div>
                <div className="text-[9px] text-[#26332F]/70 flex items-center justify-between">
                  <span>3s Preview Exposure</span>
                  <span className="text-[#5E9367] font-bold">Lvl 3</span>
                </div>
              </div>

              <div className="bg-[#EEF4EC] p-2.5 rounded-xl border border-[#A8C3A0]/40 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#26332F]">
                  <span>🫖 Visual Attention</span>
                  <span className="text-[#356859] font-black">82%</span>
                </div>
                <div className="w-full bg-[#F8F5ED] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#5E9367] h-full rounded-full" style={{ width: '82%' }} />
                </div>
                <div className="text-[9px] text-[#26332F]/70 flex items-center justify-between">
                  <span>Rhythm Sequencing</span>
                  <span className="text-[#5E9367] font-bold">Lvl 2</span>
                </div>
              </div>

              <div className="bg-[#EEF4EC] p-2.5 rounded-xl border border-[#A8C3A0]/40 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#26332F]">
                  <span>🧣 Semantic Words</span>
                  <span className="text-[#356859] font-black">91%</span>
                </div>
                <div className="w-full bg-[#F8F5ED] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#356859] h-full rounded-full" style={{ width: '91%' }} />
                </div>
                <div className="text-[9px] text-[#26332F]/70 flex items-center justify-between">
                  <span>Cultural Vernacular</span>
                  <span className="text-[#5E9367] font-bold">Lvl 3</span>
                </div>
              </div>

              <div className="bg-[#EEF4EC] p-2.5 rounded-xl border border-[#A8C3A0]/40 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#26332F]">
                  <span>⏰ Routine Recall</span>
                  <span className="text-[#356859] font-black">79%</span>
                </div>
                <div className="w-full bg-[#F8F5ED] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#D88965] h-full rounded-full" style={{ width: '79%' }} />
                </div>
                <div className="text-[9px] text-[#26332F]/70 flex items-center justify-between">
                  <span>Feeding Timetable</span>
                  <span className="text-[#D88965] font-bold">Lvl 2</span>
                </div>
              </div>
            </div>

            {/* AI Adaptive Performance Decision Insight */}
            <div className="bg-[#F8F5ED] p-2.5 rounded-xl border border-[#A8C3A0]/40 text-[10.5px] text-[#26332F] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#356859]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D88965]" />
                  <span>AI Performance Adaptation Engine</span>
                </span>
                <span className="text-[9.5px] text-[#5E9367] font-extrabold">+14% Growth</span>
              </div>
              <p className="text-[10px] text-[#26332F]/80">
                Difficulty dynamically calibrated up from <strong>Level 2 → Level 3</strong> based on consecutive mistake-free recall and faster response speed (4.2s avg).
              </p>
            </div>
          </div>

          {/* 📈 LONGITUDINAL HEALTH IMPACT MATRIX (Improvements vs Affecting) */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#A8C3A0]/60 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-[#356859] uppercase">
                Asha's Impact Matrix
              </span>
              <span className="text-[9px] text-[#26332F]/60 font-bold">14-Day Trends</span>
            </div>

            {/* Improving item */}
            <div className="bg-[#EEF4EC] p-2.5 rounded-xl border border-[#A8C3A0]/50 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-black text-[#356859]">
                <span>✅ Morning Recall Accuracy</span>
                <span className="bg-[#5E9367] text-white text-[9px] px-1.5 py-0.2 rounded font-bold">+14% Growth</span>
              </div>
              <p className="text-[10px] text-[#26332F]/80">
                Accuracy rose to 84% when played between 8:30 AM – 9:30 AM with Meera's voice notes.
              </p>
            </div>

            {/* Affecting item */}
            <div className="bg-[#F8F5ED] p-2.5 rounded-xl border border-[#D88965]/40 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-black text-[#26332F]">
                <span className="text-[#D88965]">⚠️ 3:00 PM Hydration Dip</span>
                <span className="bg-[#D88965]/20 text-[#D88965] border border-[#D88965]/50 text-[9px] px-1.5 py-0.2 rounded font-bold">Snoozed 3x</span>
              </div>
              <p className="text-[10px] text-[#26332F]/80">
                Asha snoozes afternoon water alarms when resting.
              </p>
              <div className="text-[10px] text-[#26332F] bg-white p-1.5 rounded-lg border border-[#A8C3A0]/40 font-medium">
                <strong>👉 Priya's Action:</strong> Offer warm lemon water (Kazi Nemu) on the veranda.
              </div>
            </div>
          </div>

          {/* Remote Voice Reminder Sender */}
          <div className="bg-white rounded-2xl p-3.5 border border-sand-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-terracotta-700 flex items-center gap-1">
                <Send className="w-3 h-3" />
                <span>Send Voice Reminder</span>
              </span>
              <span className="text-[9px] text-stone-500 bg-sand-100 px-1.5 py-0.5 rounded-full">
                Speaks on Asha's Phone
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSendPreset(p)}
                  className={`p-2 rounded-xl border text-left text-[11px] font-bold transition-all active:scale-95 flex items-center justify-between ${
                    justSentPreset === p.id
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-sand-50 hover:bg-sand-100 border-sand-200 text-stone-800'
                  }`}
                >
                  <span className="truncate">{p.label}</span>
                  {justSentPreset === p.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  ) : (
                    <Send className="w-3 h-3 text-terracotta-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {showCustomInput ? (
              <form onSubmit={handleSendCustom} className="pt-1 space-y-1.5">
                <input 
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Custom voice note for Asha..."
                  className="w-full px-3 py-1.5 rounded-xl border border-sand-300 text-xs focus:ring-2 focus:ring-terracotta-500 text-stone-900 outline-none"
                  autoFocus
                />
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="px-2.5 py-1 text-[10px] text-stone-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-terracotta-600 text-white rounded-lg text-[10px] font-bold"
                  >
                    Send
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full py-1.5 bg-stone-100 text-stone-700 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1"
              >
                <span>+ Custom Voice Note</span>
              </button>
            )}
          </div>

          {/* Asha vs Asha Baseline Metrics */}
          <div className="bg-white rounded-2xl p-3.5 border border-sand-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-stone-700">
                Cognitive Baseline (Asha vs Asha)
              </span>
              <span className="text-[9px] text-stone-500">30-Day Curve</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {baselineMetrics.map((m, idx) => (
                <div key={idx} className="bg-sand-50 p-2 rounded-xl border border-sand-200">
                  <div className="text-[9px] text-stone-500 uppercase font-bold truncate">{m.name}</div>
                  <div className="text-base font-black text-stone-900 font-serif">{m.score} {m.unit}</div>
                  <div className="text-[9px] text-emerald-700 font-bold truncate">{m.trendText}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2: DEDICATED LOCATION SAFETY & GEOFENCE MAP HUB                      */}
      {/* ========================================================================= */}
      {activeMobilePage === 'map' && (
        <div className="space-y-3.5 animate-in fade-in">
          
          {/* Header & Geofence Status Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#A8C3A0]/60 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-black text-[#356859] uppercase">
                <MapPin className="w-4 h-4 text-[#D88965]" />
                <span>Live Location & Geofence</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                location.isHome 
                  ? 'bg-[#EAF3EC] text-[#356859] border border-[#5E9367]/40' 
                  : 'bg-[#FCECEC] text-[#C95C5C] border border-[#C95C5C]/50 animate-pulse font-black'
              }`}>
                {location.isHome ? '🟢 Safe at Home (Guwahati)' : '🚨 1.8km Away (Outside Geofence)'}
              </span>
            </div>

            {/* Live Interactive OpenStreetMap */}
            <div className="rounded-xl overflow-hidden border border-[#A8C3A0]/40 shadow-inner">
              <InteractiveMap heightClass="h-64" />
            </div>

            {/* Geofence Simulation Button */}
            <button
              onClick={() => triggerSimulation(location.isHome ? 'missing_patient' : 'take_me_home')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition active:scale-95 flex items-center justify-center gap-2 shadow-sm ${
                location.isHome
                  ? 'bg-[#C95C5C] hover:bg-red-700 text-white'
                  : 'bg-[#5E9367] hover:bg-emerald-700 text-white'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>{location.isHome ? 'Simulate Geofence Departure (1.8km Alert)' : 'Simulate Return Home (Safe Radius)'}</span>
            </button>
          </div>

          {/* Safe Perimeter Info Card */}
          <div className="bg-[#EEF4EC] rounded-2xl p-3 border border-[#A8C3A0]/60 space-y-1.5 text-xs text-[#26332F]">
            <div className="flex items-center justify-between font-black text-[11px] text-[#356859]">
              <span className="flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-[#D88965]" />
                <span>Configured Safe Zone</span>
              </span>
              <span className="bg-white/80 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#356859]">400m Radius</span>
            </div>
            <p className="text-[10.5px] text-[#526861] leading-relaxed">
              <strong>Guwahati Home:</strong> House #14, Brahmaputra View Lane, Silpukhuri. Fallback alerts trigger automatically when GPS leaves boundary for &gt;3 mins.
            </p>
          </div>

          {/* Emergency Contacts Quick Dial */}
          <div className="bg-white rounded-2xl p-3 border border-sand-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-black uppercase text-[#26332F]">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#D88965]" />
                <span>Emergency Fallback Contacts</span>
              </span>
              <span className="text-[9px] text-stone-500">Tier 1 & 2</span>
            </div>

            <div className="space-y-1.5">
              <div className="p-2 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-stone-900 text-[11px]">Meera Devi (Daughter)</div>
                  <div className="text-[10px] text-stone-500">+91 94350 12345 • Tier 1</div>
                </div>
                <a
                  href="tel:9435012345"
                  className="px-2.5 py-1 bg-[#356859] text-white rounded-lg text-[10px] font-bold flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>

              <div className="p-2 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-stone-900 text-[11px]">GMCH Guwahati Hospital</div>
                  <div className="text-[10px] text-stone-500">3.2 km • 24x7 Emergency</div>
                </div>
                <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                  Tier 3 Facility
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 3: PATIENT INFO, FEEDING TIMETABLE & DATA FEEDING STUDIO             */}
      {/* ========================================================================= */}
      {activeMobilePage === 'patient_info' && (
        <div className="space-y-3.5 animate-in fade-in">
          
          {/* Patient Profile Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-sand-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-sand-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-terracotta-600 text-white flex items-center justify-center font-serif text-lg font-black">
                  AD
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-stone-900">{patient.name}</h4>
                  <p className="text-[10px] text-stone-500">74 yrs • Blood: O+ • Assamese / Bengali</p>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                MCI Stage 0.5
              </span>
            </div>

            <div className="text-[10px] text-stone-700 space-y-1">
              <div><strong>Residence:</strong> House #14, Brahmaputra View Lane, Silpukhuri, Guwahati</div>
              <div><strong>Hospital:</strong> GMCH Guwahati (3.2 km, Dr. B. Barman)</div>
              <div><strong>Allergies:</strong> <span className="text-red-700 font-bold">Penicillin</span></div>
            </div>
          </div>

          {/* 🍽️ Feeding & Nutrition Timetable */}
          <div className="bg-white rounded-2xl p-3.5 border border-sand-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-amber-900 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-700" />
                <span>Daily Feeding Timetable</span>
              </span>
              <span className="text-[9px] text-stone-500 font-bold">2,200 mL Target</span>
            </div>

            <div className="space-y-1.5">
              <div className="p-2 bg-amber-50/60 rounded-xl border border-amber-200 flex items-center justify-between text-[10px]">
                <div>
                  <strong className="text-stone-900">08:00 AM • Breakfast:</strong> Joha Rice Kheer & Boiled Egg
                </div>
                <span className="text-[9px] font-bold text-terracotta-700">💊 BP Pill</span>
              </div>

              <div className="p-2 bg-blue-50/60 rounded-xl border border-blue-200 flex items-center justify-between text-[10px]">
                <div>
                  <strong className="text-stone-900">11:00 AM • Hydration:</strong> Warm Assam Lemon (Nemu) Water
                </div>
                <span className="text-[9px] font-bold text-blue-700">💧 350 mL</span>
              </div>

              <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center justify-between text-[10px]">
                <div>
                  <strong className="text-stone-900">01:00 PM • Lunch:</strong> Masor Tenga (Fish) & Dhekia Greens
                </div>
                <span className="text-[9px] font-bold text-emerald-700">🍚 Joha Rice</span>
              </div>

              <div className="p-2 bg-orange-50/60 rounded-xl border border-orange-200 flex items-center justify-between text-[10px]">
                <div>
                  <strong className="text-stone-900">04:00 PM • Tea:</strong> Assam CTC Tea & Narikol Laru
                </div>
                <span className="text-[9px] font-bold text-orange-700">🍵 Veranda</span>
              </div>

              <div className="p-2 bg-purple-50/60 rounded-xl border border-purple-200 flex items-center justify-between text-[10px]">
                <div>
                  <strong className="text-stone-900">08:30 PM • Dinner:</strong> Moong Khichdi with Ghee
                </div>
                <span className="text-[9px] font-bold text-purple-700">💊 Bedtime</span>
              </div>
            </div>
          </div>

          {/* 🖼️ Family Memories Gallery & Audio Notes */}
          <div className="bg-white rounded-2xl p-3.5 border border-sand-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-terracotta-700 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>Family Memories & Audio</span>
              </span>
            </div>

            <div className="space-y-2">
              {familyMemories.slice(0, 2).map((member) => (
                <div key={member.id} className="p-2.5 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img src={member.photoUrl} alt={member.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs font-bold text-stone-900">{member.name}</div>
                      <div className="text-[9px] text-stone-500">{member.relationship}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => speakText(member.audioNoteText, 'as')}
                    className="p-2 bg-terracotta-100 text-terracotta-800 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Play</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ✏️ Interactive Feeding Data Form (Add to Asha's Schedule) */}
          <div className="bg-sand-100 rounded-2xl p-3.5 border border-sand-300 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-stone-900 flex items-center gap-1 uppercase">
                <Plus className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Feed New Routine / Meal</span>
              </span>
            </div>

            {formSuccessMessage && (
              <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg text-[10px] font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{formSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleAddQuickRoutine} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newRoutineTime}
                  onChange={(e) => setNewRoutineTime(e.target.value)}
                  placeholder="03:30 PM"
                  className="px-2.5 py-1.5 bg-white rounded-lg border border-sand-300 text-xs font-bold outline-none"
                />
                <select
                  value={newRoutineCategory}
                  onChange={(e: any) => setNewRoutineCategory(e.target.value)}
                  className="px-2.5 py-1.5 bg-white rounded-lg border border-sand-300 text-xs font-bold outline-none"
                >
                  <option value="hydration">Hydration / Water</option>
                  <option value="meal">Meal / Food</option>
                  <option value="medicine">Medicine</option>
                  <option value="walk">Garden Walk</option>
                </select>
              </div>

              <input
                type="text"
                value={newRoutineTitle}
                onChange={(e) => setNewRoutineTitle(e.target.value)}
                placeholder="e.g. Afternoon Tender Coconut Water"
                className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-sand-300 text-xs font-bold outline-none"
              />

              <button
                type="submit"
                className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>Sync to Asha's Screen</span>
              </button>
            </form>
          </div>

        </div>
      )}

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
