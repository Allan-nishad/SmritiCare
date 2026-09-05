import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BaselineAnalytics } from './BaselineAnalytics';
import { ChangeInsights } from './ChangeInsights';
import { IntelligenceVisualizer } from './IntelligenceVisualizer';
import { PersonalizationStudio } from './PersonalizationStudio';
import { sounds, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Brain, 
  Droplets, 
  Bell, 
  ShieldCheck, 
  User, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  Sliders, 
  RefreshCw,
  Sparkles,
  Wifi,
  WifiOff,
  Watch,
  PhoneCall,
  Calendar,
  AlertTriangle,
  Send,
  Navigation,
  Check,
  Award,
  ListTodo,
  Utensils,
  FileText,
  Home,
  Plus,
  Volume2,
  Users,
  Image as ImageIcon,
  Flame,
  Zap,
  BatteryCharging,
  Thermometer,
  Moon,
  Footprints,
  ShieldAlert,
  ArrowUpRight,
  Info
} from 'lucide-react';

export const CaregiverDashboard: React.FC = () => {
  const { 
    patient, 
    cognitiveSessions, 
    routines, 
    caregiverAlerts, 
    familyMemories,
    addFamilyMemory,
    addRoutineItem,
    isOffline, 
    setIsOffline,
    syncQueue, 
    isSyncing,
    syncProgressStep,
    triggerSync, 
    lastSyncedTime,
    location,
    smartbandMetrics,
    profileCompletionPercentage,
    profileCompletionItems,
    sendPushReminder,
    latestPushAcknowledgement,
    setRole 
  } = useApp();

  // 2 Master Pages: 1) Performance & Smart Health Hub, 2) Patient Info & Personalization Studio
  const [activeMasterPage, setActiveMasterPage] = useState<'performance_hub' | 'patient_info'>('performance_hub');
  
  // States for Quick Push & Interaction
  const [pushReminderText, setPushReminderText] = useState('');
  const [selectedVoiceProfile, setSelectedVoiceProfile] = useState<'female_meera' | 'male_rahul'>('female_meera');

  // Form states for feeding data in Page 2
  const [feedType, setFeedType] = useState<'routine' | 'memory' | 'medical'>('routine');
  const [newRoutineTime, setNewRoutineTime] = useState('03:30 PM');
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [newRoutineCategory, setNewRoutineCategory] = useState<'medicine' | 'hydration' | 'meal' | 'activity' | 'walk' | 'family'>('hydration');
  const [newRoutinePriority, setNewRoutinePriority] = useState<'normal' | 'important' | 'critical'>('important');
  const [newRoutineNotes, setNewRoutineNotes] = useState('');

  const [newMemoryName, setNewMemoryName] = useState('');
  const [newMemoryRelation, setNewMemoryRelation] = useState('');
  const [newMemoryLocation, setNewMemoryLocation] = useState('Guwahati, Assam');
  const [newMemoryAudio, setNewMemoryAudio] = useState('');
  const [newMemoryStory, setNewMemoryStory] = useState('');

  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  const completedRoutines = routines.filter(r => r.completed).length;
  const activeAlerts = caregiverAlerts.filter(a => !a.dismissed);
  const highPriorityAlerts = activeAlerts.filter(a => 
    a.significance === 'High Priority' || 
    a.type === 'sos' || 
    a.type === 'snooze_warning' || 
    a.title.toLowerCase().includes('warning') || 
    a.title.toLowerCase().includes('geofence')
  );

  const handleSendQuickPush = (text: string, category: any) => {
    sendPushReminder({
      text,
      category,
      senderName: selectedVoiceProfile === 'female_meera' ? 'Meera (Daughter)' : 'Rahul (Son)',
      voiceNoteText: selectedVoiceProfile === 'female_meera'
        ? `Ma, this is Meera. ${text}`
        : `Ma, this is Rahul. ${text}`
    });
    setPushReminderText('');
  };

  const handleAddRoutineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineTitle) return;

    sounds.playSuccess();
    confetti({ particleCount: 40, spread: 45 });

    addRoutineItem({
      time: newRoutineTime,
      title: newRoutineTitle,
      subtitle: newRoutineNotes || 'Added by Caregiver Priya',
      category: newRoutineCategory,
      priority: newRoutinePriority,
      icon: newRoutineCategory === 'hydration' ? 'Droplets' : newRoutineCategory === 'medicine' ? 'Heart' : 'Clock'
    });

    setNewRoutineTitle('');
    setNewRoutineNotes('');
    setFormSuccessMessage(`✓ Successfully added routine "${newRoutineTitle}" synced to Asha's device!`);
    setTimeout(() => setFormSuccessMessage(''), 4000);
  };

  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryName || !newMemoryRelation) return;

    sounds.playSuccess();
    confetti({ particleCount: 50, spread: 50 });

    addFamilyMemory({
      name: newMemoryName,
      relationship: newMemoryRelation,
      location: newMemoryLocation,
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      audioNoteText: newMemoryAudio || `“Aita, we love you so much! Sending warm greetings from ${newMemoryLocation}.”`,
      storySnippet: newMemoryStory || `${newMemoryName} is your dear ${newMemoryRelation}.`,
      favoriteMemory: 'Family festival gathering in Assam.'
    });

    setNewMemoryName('');
    setNewMemoryRelation('');
    setNewMemoryAudio('');
    setNewMemoryStory('');
    setFormSuccessMessage(`✓ Memory of "${newMemoryName}" added to Asha's cognitive personalization!`);
    setTimeout(() => setFormSuccessMessage(''), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 select-none">
      
      {/* 1. Caregiver Master Header Banner */}
      <div className="bg-gradient-to-br from-sage-800 via-stone-900 to-sage-950 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-touch relative overflow-hidden border border-sage-700/50">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white mb-3 border border-white/30">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>SIH 26003 • SmritiCare Caregiver Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif mb-1">
              Good Morning, {patient.caregiverName}
            </h1>
            <p className="text-sage-200 text-sm sm:text-base font-medium">
              Real-time cognitive monitoring, smart wearable telemetry & personalization for <strong className="text-white">{patient.name}</strong>.
            </p>
          </div>

          {/* Patient Quick Status Pill Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/20 flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center font-serif text-2xl font-extrabold shrink-0 shadow-md">
              AD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg">{patient.name}</span>
                <span className="text-xs text-sage-300">({patient.age} yrs • Blood: {patient.bloodGroup || 'O+'})</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sage-200 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                <span>{location.isHome ? 'At Guwahati Residence' : `${location.distanceFromHomeKm} km Away (G.S. Road)`}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-400/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  GPS Band: {smartbandMetrics.heartRateBpm} bpm
                </span>
                <button
                  onClick={() => setRole('patient')}
                  className="text-[11px] font-bold underline text-amber-200 hover:text-white transition"
                >
                  View Asha's Screen →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Real-Time Telemetry & Offline / Online Sync Status Banner */}
      <div className={`rounded-3xl p-5 border-2 shadow-soft transition-all duration-300 ${
        isOffline 
          ? 'bg-amber-50 border-amber-300 text-amber-950' 
          : isSyncing 
          ? 'bg-blue-50 border-blue-300 text-blue-950' 
          : 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              isOffline 
                ? 'bg-amber-200 text-amber-800' 
                : isSyncing 
                ? 'bg-blue-200 text-blue-800 animate-spin' 
                : 'bg-emerald-200 text-emerald-800'
            }`}>
              {isOffline ? <WifiOff className="w-5 h-5" /> : isSyncing ? <RefreshCw className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm sm:text-base">
                  {isOffline 
                    ? `⚠️ Patient Device (Asha) is Offline • Awaiting Reconnection`
                    : isSyncing 
                    ? `⚡ Synchronizing Offline Data Pipeline (Step 3-of-3)...`
                    : `🟢 Live Real-Time Telemetry Active • 0ms Broadcast Latency`}
                </h4>
                {isOffline && syncQueue.length > 0 && (
                  <span className="bg-amber-400 text-stone-950 text-xs font-black px-2 py-0.5 rounded-full">
                    {syncQueue.length} Pending Updates
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                {isOffline 
                  ? `Asha's device is currently disconnected. ${syncQueue.length} completed routines & cognitive activities are safely cached locally. Once connectivity is restored, this dashboard and her baseline will update automatically.`
                  : isSyncing
                  ? `Reconciling cached sqlite entries with caregiver cloud store and recalculating cognitive baseline in real-time...`
                  : `Caregiver metrics, smartband telemetry, cognitive scores, and GPS status update in real time.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {isOffline ? (
              <button
                onClick={() => setIsOffline(false)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
              >
                <Wifi className="w-4 h-4" />
                <span>Restore Online & Auto-Sync</span>
              </button>
            ) : syncQueue.length > 0 ? (
              <button
                onClick={triggerSync}
                disabled={isSyncing}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow transition active:scale-95 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync Pending ({syncQueue.length})</span>
              </button>
            ) : (
              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Last Synced: {lastSyncedTime}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. PRIMARY 2-PAGE MASTER NAVIGATION SWITCHER */}
      <div className="flex p-1.5 bg-sand-200/80 rounded-2xl border-2 border-sand-300 max-w-2xl mx-auto shadow-inner">
        <button
          onClick={() => setActiveMasterPage('performance_hub')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeMasterPage === 'performance_hub'
              ? 'bg-white text-stone-900 shadow-md scale-[1.01]'
              : 'text-stone-600 hover:text-stone-900 hover:bg-sand-100'
          }`}
        >
          <Activity className="w-4 h-4 text-terracotta-600" />
          <span>Page 1: 📊 Patient Performance & Smart Health Hub</span>
        </button>

        <button
          onClick={() => setActiveMasterPage('patient_info')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeMasterPage === 'patient_info'
              ? 'bg-white text-stone-900 shadow-md scale-[1.01]'
              : 'text-stone-600 hover:text-stone-900 hover:bg-sand-100'
          }`}
        >
          <User className="w-4 h-4 text-sage-600" />
          <span>Page 2: 🗂️ Patient Information & Personalization Studio</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 1: PATIENT PERFORMANCE & SMART HEALTH HUB */}
      {/* ========================================================================= */}
      {activeMasterPage === 'performance_hub' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* A. ⌚ SMART DEVICES TELEMETRY STATION (Smartband GPS Band v2) */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full border border-blue-300 mb-1">
                  <Watch className="w-3.5 h-3.5 text-blue-700" />
                  <span>Connected Wearables & IoT Sensors Station</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                  Smartband GPS Band v2 Telemetry
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  Real-time physiological telemetry, fall detection & continuous activity tracking
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  BLE 5.2 Live Connected
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <BatteryCharging className="w-3.5 h-3.5 text-amber-700" />
                  88% Battery
                </span>
              </div>
            </div>

            {/* Smart Devices 6-Card Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* Device Metric 1: Live Heart Rate */}
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Heart Rate</span>
                  <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  {smartbandMetrics.heartRateBpm} <span className="text-xs font-normal text-stone-500">BPM</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <span>Normal (68 - 84 range)</span>
                </div>
              </div>

              {/* Device Metric 2: Step Counter */}
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Steps Today</span>
                  <Footprints className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  {smartbandMetrics.stepsToday}
                </div>
                <div className="text-[11px] text-stone-600 font-medium">
                  2.6 km • 48 min active
                </div>
              </div>

              {/* Device Metric 3: Sleep Architecture */}
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Last Night Sleep</span>
                  <Moon className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  {smartbandMetrics.sleepHours} <span className="text-xs font-normal text-stone-500">hrs</span>
                </div>
                <div className="text-[11px] text-purple-700 font-bold">
                  2.1h Deep • 0 Night Wakeups
                </div>
              </div>

              {/* Device Metric 4: Fall Detection */}
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Fall Detection</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-stone-900">
                  Normal / Safe
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  3-Axis Accelerometer Active
                </div>
              </div>

              {/* Device Metric 5: Blood Oxygen SpO2 */}
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-[11px] font-bold uppercase tracking-wider">SpO2 Oxygen</span>
                  <Activity className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  98%
                </div>
                <div className="text-[11px] text-teal-700 font-bold">
                  Optimal Oxygenation
                </div>
              </div>

              {/* Device Metric 6: Skin Temperature */}
              <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Skin Temp</span>
                  <Thermometer className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  98.4°F
                </div>
                <div className="text-[11px] text-amber-800 font-bold">
                  Normal Baseline
                </div>
              </div>

            </div>
          </div>

          {/* B. 🚨 CRITICAL GLOWING RED ALERTS & IMMEDIATE CARE ACTIONS */}
          {highPriorityAlerts.length > 0 && (
            <div className="bg-red-50 border-2 border-red-500 rounded-[2.5rem] p-6 sm:p-8 shadow-lg ring-4 ring-red-500/20 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-600 animate-ping" />
                  <h3 className="text-xl sm:text-2xl font-black text-red-950 font-serif">
                    🚨 High-Priority Caregiver Alerts ({highPriorityAlerts.length} Requiring Attention)
                  </h3>
                </div>
                <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Immediate Family Action
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {highPriorityAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border-2 border-red-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-red-200 text-red-950 font-black text-xs px-2.5 py-0.5 rounded-md">
                          {alert.timestamp}
                        </span>
                        <h4 className="font-extrabold text-base text-red-950">{alert.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-red-900 mt-1">{alert.description}</p>
                      <div className="mt-2 text-xs text-stone-800 bg-red-50 p-2.5 rounded-xl border border-red-200">
                        <strong className="text-red-950">Action for Priya: </strong> {alert.suggestedAction}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSendQuickPush('Checking in on you, Ma! I will call you in 2 mins.', 'family')}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md transition active:scale-95 shrink-0 flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Check In Now</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. 📈 LONGITUDINAL HEALTH & COGNITIVE IMPACT MATRIX (Improvements vs What's Affecting) */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Longitudinal Caregiver Guidance • Non-Diagnostic</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                Asha's Cognitive Improvements vs What's Affecting Her
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                Actionable insights highlighting positive progress and specific moments where caregiver assistance makes a difference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Column 1: ✅ What's Improving / Patient Strengths */}
              <div className="bg-emerald-50/60 rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 space-y-4">
                <div className="flex items-center gap-2 text-emerald-950 font-black text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h4>✅ What's Improving & Strong Areas</h4>
                </div>

                <div className="space-y-3">
                  {/* Improvement 1 */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-stone-900">Morning Recall Accuracy (+14%)</h5>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">+14% Growth</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Asha's accuracy on 4-card memory match rose from 70% to 84% over 14 days when played between 8:30 AM – 9:30 AM.
                    </p>
                  </div>

                  {/* Improvement 2 */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-stone-900">100% Morning Medication Adherence</h5>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Consistent</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Zero missed morning BP tablets when daughter Meera's recorded voice reminder was played.
                    </p>
                  </div>

                  {/* Improvement 3 */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-stone-900">Emotional Composure & Focus</h5>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Stable</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Zero task abandonment or frustration triggers when familiar NER cultural music and Assamese voice prompts are active.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2: ⚠️ What's Affecting Performance & Caregiver Action */}
              <div className="bg-amber-50/70 rounded-3xl p-5 sm:p-6 border-2 border-amber-200 space-y-4">
                <div className="flex items-center gap-2 text-amber-950 font-black text-lg">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <h4>⚠️ What's Affecting Asha & How Caregiver Can Help</h4>
                </div>

                <div className="space-y-3">
                  {/* Affecting 1: Hydration dip */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-stone-900">Late Afternoon Hydration Drop (3:00 PM)</h5>
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">Snoozed 3x</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Asha tends to snooze afternoon water alarms when resting inside.
                    </p>
                    <div className="bg-amber-50 p-2 rounded-xl text-xs text-amber-950 font-medium">
                      <strong>👉 Priya's Action:</strong> Offer warm lemon water (Kazi Nemu) or tender coconut water in the veranda around 3:15 PM.
                    </div>
                  </div>

                  {/* Affecting 2: Twilight sundowning */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-stone-900">Twilight Sundowning Hesitation (6:30 PM)</h5>
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">14.2s Latency</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Response speed slows down as natural sunlight fades before dinner.
                    </p>
                    <div className="bg-amber-50 p-2 rounded-xl text-xs text-amber-950 font-medium">
                      <strong>👉 Priya's Action:</strong> Turn on warm 2700K room lighting early at 6:00 PM and play calming Bhupen Hazarika flute melodies.
                    </div>
                  </div>

                  {/* Affecting 3: Spatial navigation */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-stone-900">Spatial Hesitation Beyond 400m</h5>
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">Safe Zone Edge</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      Walking speed drops when approaching Silpukhuri Pond outer perimeter.
                    </p>
                    <div className="bg-amber-50 p-2 rounded-xl text-xs text-amber-950 font-medium">
                      <strong>👉 Priya's Action:</strong> Ensure Smartband is secured and use audio landmark cues (e.g. "Namghar is 50 steps ahead").
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* D. REMOTE VOICE REMINDER BROADCAST (Priya -> Asha) */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-black text-terracotta-700 uppercase tracking-wider">
                <Bell className="w-4 h-4 text-terracotta-600" />
                <span>Instant Voice Reminder Broadcast (To Asha's Screen)</span>
              </div>
              
              {/* Voice Gender Switcher */}
              <div className="flex items-center gap-1 bg-sand-100 p-1 rounded-xl text-xs font-bold text-stone-700">
                <button
                  onClick={() => setSelectedVoiceProfile('female_meera')}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedVoiceProfile === 'female_meera' ? 'bg-white shadow text-terracotta-700 font-extrabold' : 'text-stone-500'
                  }`}
                >
                  Meera (Daughter's Voice)
                </button>
                <button
                  onClick={() => setSelectedVoiceProfile('male_rahul')}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedVoiceProfile === 'male_rahul' ? 'bg-white shadow text-terracotta-700 font-extrabold' : 'text-stone-500'
                  }`}
                >
                  Rahul (Son's Voice)
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => handleSendQuickPush('Please take your afternoon hydration water with lemon!', 'hydration')}
                className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>💧 "Drink Lemon Water"</span>
              </button>
              <button
                onClick={() => handleSendQuickPush('It is time for your afternoon rest on the veranda.', 'walk')}
                className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5 text-emerald-600" />
                <span>🌿 "Veranda Rest"</span>
              </button>
              <button
                onClick={() => handleSendQuickPush('I will call you in 15 minutes, Ma!', 'family')}
                className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
                <span>📞 "Calling in 15 mins"</span>
              </button>
              <button
                onClick={() => handleSendQuickPush('Time for evening light walk around the garden.', 'walk')}
                className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Footprints className="w-3.5 h-3.5 text-amber-600" />
                <span>🚶 "Garden Walk"</span>
              </button>
            </div>

            {latestPushAcknowledgement && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>{latestPushAcknowledgement}</span>
              </div>
            )}
          </div>

          {/* E. LONGITUDINAL COGNITIVE BASELINE (ASHA VS ASHA) */}
          <BaselineAnalytics />

          {/* F. MEANINGFUL CHANGE INSIGHTS */}
          <ChangeInsights />

          {/* G. GEOFENCE SAFETY MAP */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-terracotta-700 tracking-wider">
                  Real-Time Geofencing & Fallback Layer
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                  Asha's Location Safety Hub
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  location.isHome ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800 animate-pulse font-black'
                }`}>
                  {location.isHome ? 'Within Safe Home Boundary' : 'Outside Geofence (1.8 km)'}
                </span>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="w-full h-72 rounded-3xl bg-slate-900 border-4 border-sand-200 overflow-hidden relative flex items-center justify-center text-white">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="text-center space-y-2 relative z-10">
                <MapPin className="w-12 h-12 text-terracotta-500 mx-auto animate-bounce" />
                <h4 className="text-xl font-black">{location.address}</h4>
                <p className="text-xs text-stone-400 font-mono">
                  Coordinates: {location.lat}° N, {location.lng}° E • GPS Status: {location.isLive ? 'LIVE' : 'Cached Offline'}
                </p>
              </div>
            </div>

            {/* Emergency Fallback Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-sand-50 p-5 rounded-2xl border border-sand-200 space-y-2">
                <h5 className="text-xs font-black text-stone-500 uppercase tracking-wider">Contact 1 (Primary)</h5>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-stone-900">Meera Devi (Daughter)</h4>
                    <p className="text-xs text-stone-600">+91 94350 12345 • Tezpur, Assam</p>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">Verified</span>
                </div>
              </div>

              <div className="bg-sand-50 p-5 rounded-2xl border border-sand-200 space-y-2">
                <h5 className="text-xs font-black text-stone-500 uppercase tracking-wider">Contact 2 (Fallback)</h5>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-stone-900">Rahul Sharma (Son)</h4>
                    <p className="text-xs text-stone-600">+91 98640 67890 • Guwahati, Assam</p>
                  </div>
                  <span className="text-xs font-bold bg-cyan-100 text-cyan-800 px-2.5 py-1 rounded-lg">Verified</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2: PATIENT INFORMATION & PERSONALIZATION STUDIO */}
      {/* ========================================================================= */}
      {activeMasterPage === 'patient_info' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* A. COMPREHENSIVE PATIENT IDENTITY & MEDICAL PROFILE */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-sage-100 text-sage-900 text-xs font-bold px-3 py-1 rounded-full border border-sage-300 mb-1">
                  <User className="w-3.5 h-3.5 text-sage-700" />
                  <span>Clinical Profile & Cognitive Identity</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                  Patient Identity & Health Record
                </h3>
              </div>

              <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full border border-amber-300">
                Early Amnestic MCI (CDR 0.5)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Profile Card */}
              <div className="bg-sand-50 p-5 rounded-3xl border border-sand-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center font-serif text-3xl font-black">
                    AD
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-stone-900">{patient.name}</h4>
                    <p className="text-xs text-stone-500">Age: 74 • Female • Blood: {patient.bloodGroup || 'O+'}</p>
                    <p className="text-xs text-sage-700 font-bold">Languages: Assamese, Bengali</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-sand-200 text-xs text-stone-700 space-y-1">
                  <div><strong>Primary Caregiver:</strong> {patient.caregiverName} ({patient.caregiverRelationship})</div>
                  <div><strong>Emergency Hospital:</strong> Gauhati Medical College (GMCH - 3.2 km)</div>
                  <div><strong>Attending Neurologist:</strong> Dr. B. Barman (MD Neuro)</div>
                </div>
              </div>

              {/* Residence & Safe Perimeter */}
              <div className="bg-sand-50 p-5 rounded-3xl border border-sand-200 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-base">
                  <Home className="w-5 h-5 text-terracotta-600" />
                  <h4>Residence & Safe Perimeter</h4>
                </div>

                <div className="text-xs text-stone-700 space-y-2">
                  <div>
                    <strong className="text-stone-900">Home Address:</strong>
                    <p className="text-stone-600">House #14, Brahmaputra View Lane, Silpukhuri, Guwahati, Assam - 781003</p>
                  </div>
                  <div>
                    <strong className="text-stone-900">Safe Boundary:</strong>
                    <p className="text-stone-600">Silpukhuri Pond Walkway & Neighborhood (Radius: 400 meters)</p>
                  </div>
                </div>
              </div>

              {/* Clinical Summary & Allergies */}
              <div className="bg-sand-50 p-5 rounded-3xl border border-sand-200 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-base">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h4>Clinical Profile & Prescriptions</h4>
                </div>

                <div className="text-xs text-stone-700 space-y-1.5">
                  <div><strong>Diagnosed:</strong> March 2024 (Mild Cognitive Impairment)</div>
                  <div><strong>Allergies:</strong> <span className="text-red-700 font-bold">Penicillin, High-Sodium Foods</span></div>
                  <div><strong>Prescriptions:</strong> Donepezil 5mg (Morning), Telmisartan 40mg (BP)</div>
                  <div><strong>Medical File ID:</strong> SMC-AS-7409</div>
                </div>
              </div>

            </div>
          </div>

          {/* B. 🍽️ DAILY FEEDING, DIETARY & HYDRATION TIMETABLE */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 mb-1">
                  <Utensils className="w-3.5 h-3.5 text-amber-700" />
                  <span>Nutrition & Hydration Schedule</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                  Asha's Daily Feeding & Diet Timetable
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  Traditional Assamese comfort dishes, soft textures, hydration goals & medication pairing
                </p>
              </div>

              <div className="bg-sand-100 px-3.5 py-1.5 rounded-2xl border border-sand-200 text-xs font-bold text-stone-700">
                Daily Fluid Target: 2,200 mL
              </div>
            </div>

            {/* Timetable Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Meal 1 */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-stone-900 text-amber-300 px-2 py-0.5 rounded">08:00 AM</span>
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Breakfast</span>
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Joha Rice Kheer & Egg</h4>
                <p className="text-xs text-stone-600">Soft warm rice porridge, soft boiled egg, cardamom aroma.</p>
                <div className="text-[11px] font-bold text-terracotta-700 pt-1 border-t border-amber-200">
                  💊 Morning BP Pill Pair
                </div>
              </div>

              {/* Meal 2 */}
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-stone-900 text-amber-300 px-2 py-0.5 rounded">11:00 AM</span>
                  <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">Hydration</span>
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Assam Kazi Nemu Water</h4>
                <p className="text-xs text-stone-600">Warm water with fresh Assam lemon, honey & crushed tulsi.</p>
                <div className="text-[11px] font-bold text-blue-700 pt-1 border-t border-blue-200">
                  💧 350 mL Target
                </div>
              </div>

              {/* Meal 3 */}
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-stone-900 text-amber-300 px-2 py-0.5 rounded">01:00 PM</span>
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Lunch</span>
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Masor Tenga & Greens</h4>
                <p className="text-xs text-stone-600">Light fish sour curry with tomato/lemon & boiled tender Dhekia greens.</p>
                <div className="text-[11px] font-bold text-emerald-700 pt-1 border-t border-emerald-200">
                  🍚 Steamed Joha Rice
                </div>
              </div>

              {/* Meal 4 */}
              <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-stone-900 text-amber-300 px-2 py-0.5 rounded">04:00 PM</span>
                  <span className="text-[10px] font-black uppercase text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">Afternoon Tea</span>
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Assam Tea & Narikol Laru</h4>
                <p className="text-xs text-stone-600">Mild milky CTC tea with homemade soft coconut laddoo sweet.</p>
                <div className="text-[11px] font-bold text-orange-700 pt-1 border-t border-orange-200">
                  🍵 Veranda Leisure Time
                </div>
              </div>

              {/* Meal 5 */}
              <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black bg-stone-900 text-amber-300 px-2 py-0.5 rounded">08:30 PM</span>
                  <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">Dinner</span>
                </div>
                <h4 className="font-extrabold text-sm text-stone-900">Moong Dal Khichdi & Ghee</h4>
                <p className="text-xs text-stone-600">Warm, easily digestible khichdi with pure cow ghee & light vegetable mash.</p>
                <div className="text-[11px] font-bold text-purple-700 pt-1 border-t border-purple-200">
                  💊 Bedtime Vitamin Pair
                </div>
              </div>

            </div>
          </div>

          {/* C. 🖼️ FAMILY MEMORIES WALL & VOICE NOTES GALLERY */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-1">
                  <Users className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>Personalized Cognitive Stimuli</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                  Asha's Family Memory Wall & Voice Notes
                </h3>
              </div>

              <span className="text-xs text-stone-500 font-medium">
                Used in Cognitive Flashcard Games & Reminiscence Therapy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {familyMemories.map(member => (
                <div 
                  key={member.id}
                  className="bg-sand-50 rounded-3xl p-5 border border-sand-200 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-2xl overflow-hidden shadow-inner">
                      <img 
                        src={member.photoUrl} 
                        alt={member.name}
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {member.relationship}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base text-stone-900">{member.name}</h4>
                      <p className="text-xs text-stone-500">{member.location}</p>
                      <p className="text-xs text-stone-700 italic mt-2 bg-white p-2.5 rounded-xl border border-sand-200">
                        {member.audioNoteText}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => speakText(member.audioNoteText, 'as')}
                    className="w-full py-2.5 bg-terracotta-100 hover:bg-terracotta-200 text-terracotta-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Play Recorded Voice Note</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* D. 🌸 FAMILIAR NER CULTURAL ANCHORS & SENSORY CUES */}
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-4">
            <div className="flex items-center gap-2 text-xs font-black text-amber-800 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>North Eastern Cultural Anchors (In Game Engine)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-serif">
              Culturally Familiar Objects & Regional Anchors
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              The AI dynamically weaves these beloved NER cultural artifacts into cognitive memory games to avoid clinical anxiety:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-sand-100 text-stone-800 font-bold text-xs border border-sand-200">
                🥁 Bihu Dhol (Folk Drum)
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-sand-100 text-stone-800 font-bold text-xs border border-sand-200">
                👑 Brass Xorai (Offering Tray)
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-sand-100 text-stone-800 font-bold text-xs border border-sand-200">
                👒 Assamese Jaapi (Conical Sun Hat)
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-sand-100 text-stone-800 font-bold text-xs border border-sand-200">
                🌸 Chameli Flower & Tulsi Mala
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-sand-100 text-stone-800 font-bold text-xs border border-sand-200">
                🧣 Golden Muga Silk Gamosa
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-sand-100 text-stone-800 font-bold text-xs border border-sand-200">
                🌅 Brahmaputra Sunset Ferry
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-sand-100 text-stone-800 font-bold text-xs border border-sand-200">
                🎶 Bhupen Hazarika Borgeet
              </span>
            </div>
          </div>

          {/* E. ✏️ INTERACTIVE DATA FEEDING FORM (Syncs Live to Asha's Device) */}
          <div className="bg-gradient-to-br from-sand-100 to-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-300 shadow-touch space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-300">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-stone-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Real-Time Patient Data Feeding Station</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                  Feed New Routine, Meal or Family Memory
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  Changes made here instantly update Asha's local cache and schedule
                </p>
              </div>

              {/* Form Mode Selector */}
              <div className="flex items-center gap-1 bg-sand-200 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setFeedType('routine')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    feedType === 'routine' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
                  }`}
                >
                  Add Routine / Meal
                </button>
                <button
                  onClick={() => setFeedType('memory')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    feedType === 'memory' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
                  }`}
                >
                  Add Family Memory
                </button>
              </div>
            </div>

            {formSuccessMessage && (
              <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs sm:text-sm font-black text-emerald-900 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{formSuccessMessage}</span>
              </div>
            )}

            {/* Form 1: Add Routine / Feeding */}
            {feedType === 'routine' && (
              <form onSubmit={handleAddRoutineSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Scheduled Time</label>
                    <input
                      type="text"
                      value={newRoutineTime}
                      onChange={(e) => setNewRoutineTime(e.target.value)}
                      placeholder="e.g. 03:30 PM"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Category</label>
                    <select
                      value={newRoutineCategory}
                      onChange={(e: any) => setNewRoutineCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    >
                      <option value="hydration">Hydration / Water</option>
                      <option value="meal">Meal / Feeding</option>
                      <option value="medicine">Medicine / Tablets</option>
                      <option value="walk">Garden Walk / Rest</option>
                      <option value="family">Family Check-in</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Priority Alert</label>
                    <select
                      value={newRoutinePriority}
                      onChange={(e: any) => setNewRoutinePriority(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    >
                      <option value="important">Important (Gentle Chime)</option>
                      <option value="critical">Critical (Red Alert on 3x Snooze)</option>
                      <option value="normal">Normal (Routine)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Item Title / Instruction</label>
                    <input
                      type="text"
                      value={newRoutineTitle}
                      onChange={(e) => setNewRoutineTitle(e.target.value)}
                      placeholder="e.g. Afternoon Tender Coconut Water"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Caregiver Note for Asha</label>
                    <input
                      type="text"
                      value={newRoutineNotes}
                      onChange={(e) => setNewRoutineNotes(e.target.value)}
                      placeholder="e.g. Fresh coconut water prepared in the veranda"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-medium bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-stone-900 hover:bg-black text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Save & Sync Routine to Asha's Screen</span>
                </button>
              </form>
            )}

            {/* Form 2: Add Family Memory */}
            {feedType === 'memory' && (
              <form onSubmit={handleAddMemorySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Family Member Name</label>
                    <input
                      type="text"
                      value={newMemoryName}
                      onChange={(e) => setNewMemoryName(e.target.value)}
                      placeholder="e.g. Aarav (Grandson)"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Relationship</label>
                    <input
                      type="text"
                      value={newMemoryRelation}
                      onChange={(e) => setNewMemoryRelation(e.target.value)}
                      placeholder="e.g. Youngest Grandson"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-stone-700 uppercase mb-1">Current Location</label>
                    <input
                      type="text"
                      value={newMemoryLocation}
                      onChange={(e) => setNewMemoryLocation(e.target.value)}
                      placeholder="e.g. Jorhat, Assam"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-stone-700 uppercase mb-1">Voice Greeting / Spoken Audio Note</label>
                  <input
                    type="text"
                    value={newMemoryAudio}
                    onChange={(e) => setNewMemoryAudio(e.target.value)}
                    placeholder='e.g. "Aita, I scored 1st place in my school drawing competition!"'
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-medium bg-white focus:ring-2 focus:ring-terracotta-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Memory to Personalization Studio</span>
                </button>
              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
