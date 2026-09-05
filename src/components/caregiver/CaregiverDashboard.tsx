import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BaselineAnalytics } from './BaselineAnalytics';
import { ChangeInsights } from './ChangeInsights';
import { IntelligenceVisualizer } from './IntelligenceVisualizer';
import { PersonalizationStudio } from './PersonalizationStudio';
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
  ListTodo
} from 'lucide-react';

export const CaregiverDashboard: React.FC = () => {
  const { 
    patient, 
    cognitiveSessions, 
    routines, 
    caregiverAlerts, 
    isOffline, 
    syncQueue, 
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

  const [activeTab, setActiveTab] = useState<'overview' | 'location_safety' | 'progress' | 'routines_meds' | 'profile_completion'>('overview');
  const [pushReminderText, setPushReminderText] = useState('');
  const [selectedVoiceProfile, setSelectedVoiceProfile] = useState<'female_meera' | 'male_rahul'>('female_meera');

  const completedRoutines = routines.filter(r => r.completed).length;
  const activeAlerts = caregiverAlerts.filter(a => !a.dismissed);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 select-none">
      
      {/* 1. Caregiver Welcome & Patient Profile Banner */}
      <div className="bg-gradient-to-br from-sage-700 via-sage-800 to-stone-900 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-touch relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white mb-3 border border-white/30">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Caregiver Hub • Cognitive Monitoring & Safety</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif mb-1">
              Good Morning, {patient.caregiverName}
            </h1>
            <p className="text-sage-200 text-sm sm:text-base font-medium">
              Continuous cognitive health, routine adherence, and safety tracking for <strong className="text-white">{patient.name}</strong>.
            </p>
          </div>

          {/* Patient Quick Status Pill Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/20 flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-terracotta-500/90 text-white flex items-center justify-center font-serif text-2xl font-extrabold shrink-0 shadow-md">
              AD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg">{patient.name}</span>
                <span className="text-xs text-sage-300">({patient.age} yrs • {patient.bloodGroup})</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sage-200 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                <span>{location.isHome ? 'At Guwahati Residence' : `${location.distanceFromHomeKm} km Away (G.S. Road)`}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Smartband: {smartbandMetrics.heartRateBpm} bpm
                </span>
                <button
                  onClick={() => setRole('patient')}
                  className="text-[11px] font-bold underline text-white hover:text-terracotta-300"
                >
                  Asha's Space →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 bg-sand-200 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Today's Overview
        </button>
        <button
          onClick={() => setActiveTab('location_safety')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'location_safety' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <MapPin className="w-4 h-4 text-terracotta-600" />
          <span>Patient Location & Safety</span>
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'progress' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Brain className="w-4 h-4 text-sage-600" />
          <span>Cognitive Baseline (Asha vs Asha)</span>
        </button>
        <button
          onClick={() => setActiveTab('routines_meds')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'routines_meds' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Routines & Medicines</span>
        </button>
        <button
          onClick={() => setActiveTab('profile_completion')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'profile_completion' ? 'bg-white text-stone-900 shadow' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Profile Personalization ({profileCompletionPercentage}%)</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* 4 Core Summary Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1: Today's Engagement */}
            <div className="bg-white p-5 sm:p-6 rounded-[2rem] border-2 border-sand-200 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Today's Engagement</span>
                <Activity className="w-5 h-5 text-terracotta-500" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
                84%
              </div>
              <div className="text-xs text-sage-700 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>High morning consistency</span>
              </div>
            </div>

            {/* Metric 2: Cognitive Activities */}
            <div className="bg-white p-5 sm:p-6 rounded-[2rem] border-2 border-sand-200 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Cognitive Tasks</span>
                <Brain className="w-5 h-5 text-terracotta-500" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
                {cognitiveSessions.length > 0 ? cognitiveSessions[0].accuracyPercentage : 84}%
              </div>
              <div className="text-xs text-stone-600 font-medium">
                {cognitiveSessions.length > 0 ? cognitiveSessions[0].gameTitle : 'Memory match'}
              </div>
            </div>

            {/* Metric 3: Routine Completed */}
            <div className="bg-white p-5 sm:p-6 rounded-[2rem] border-2 border-sand-200 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Routine Progress</span>
                <CheckCircle2 className="w-5 h-5 text-sage-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
                {completedRoutines} / {routines.length}
              </div>
              <div className="text-xs text-stone-600 font-medium">
                Morning medicine confirmed ✓
              </div>
            </div>

            {/* Metric 4: Connected Smartband */}
            <div className="bg-white p-5 sm:p-6 rounded-[2rem] border-2 border-sand-200 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Connected Band</span>
                <Watch className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                {smartbandMetrics.stepsToday} steps
              </div>
              <div className="text-xs text-stone-600 font-medium">
                {smartbandMetrics.sleepHours}h sleep • {smartbandMetrics.heartRateBpm} bpm
              </div>
            </div>

          </div>

          {/* Multimodal Correlation Insights Banner (Specification 30) */}
          <div className="bg-gradient-to-r from-amber-500/10 via-terracotta-500/10 to-sage-500/10 p-6 rounded-3xl border-2 border-amber-200/80 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>SmritiCare Multimodal Correlation Intelligence (Cognitive + Health + Routine)</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
              “Asha completed her morning cognitive session at her highest recall pace (84% accuracy, 9.1s) following 7.5 hours of restful sleep and timely blood pressure routine.”
            </p>
            <p className="text-xs text-stone-600 italic">
              Non-diagnostic longitudinal wellness correlation. Designed to empower compassionate family check-ins.
            </p>
          </div>

          {/* Remote Push Voice Reminder Sender (Priya -> Asha) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sand-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-terracotta-700 uppercase tracking-wider">
                <Bell className="w-4 h-4 text-terracotta-600" />
                <span>Instant Voice Reminder Broadcast (To Asha's Screen)</span>
              </div>
              
              {/* Voice Gender Switcher (Meera female vs Rahul male) */}
              <div className="flex items-center gap-1 bg-sand-100 p-1 rounded-xl text-xs font-bold text-stone-700">
                <button
                  onClick={() => setSelectedVoiceProfile('female_meera')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedVoiceProfile === 'female_meera' ? 'bg-white shadow text-terracotta-700' : 'text-stone-500'
                  }`}
                >
                  Meera (Female Voice)
                </button>
                <button
                  onClick={() => setSelectedVoiceProfile('male_rahul')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedVoiceProfile === 'male_rahul' ? 'bg-white shadow text-terracotta-700' : 'text-stone-500'
                  }`}
                >
                  Rahul (Male Voice)
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSendQuickPush('Please take your afternoon hydration water with lemon!', 'hydration')}
                className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-xl text-xs font-bold transition"
              >
                💧 "Drink Lemon Water"
              </button>
              <button
                onClick={() => handleSendQuickPush('It is time for your afternoon rest on the veranda.', 'walk')}
                className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-xl text-xs font-bold transition"
              >
                🌿 "Veranda Rest"
              </button>
              <button
                onClick={() => handleSendQuickPush('I will call you in 15 minutes, Ma!', 'family')}
                className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-xl text-xs font-bold transition"
              >
                📞 "Calling in 15 mins"
              </button>
            </div>

            {latestPushAcknowledgement && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{latestPushAcknowledgement}</span>
              </div>
            )}
          </div>

          {/* Meaningful Change Insights */}
          <ChangeInsights />

          {/* Longitudinal Baseline Analytics */}
          <BaselineAnalytics />

          {/* SmritiCare Intelligence Pipeline Visualizer */}
          <IntelligenceVisualizer />

          {/* Customization Studio */}
          <PersonalizationStudio />

        </div>
      )}

      {/* TAB 2: LOCATION & SAFETY */}
      {activeTab === 'location_safety' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
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
                location.isHome ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800 animate-pulse'
              }`}>
                {location.isHome ? 'Within Safe Home Boundary' : 'Outside Geofence (1.8 km)'}
              </span>
            </div>
          </div>

          {/* Simulated Map */}
          <div className="w-full h-80 rounded-3xl bg-slate-900 border-4 border-sand-200 overflow-hidden relative flex items-center justify-center text-white">
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
      )}

      {/* TAB 3: COGNITIVE BASELINE (ASHA VS ASHA) */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <BaselineAnalytics />
          <ChangeInsights />
        </div>
      )}

      {/* TAB 4: ROUTINES & MEDICINES */}
      {activeTab === 'routines_meds' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-terracotta-700 tracking-wider">
                Schedule & Priorities
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                Asha's Daily Schedule & Medication Manager
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {routines.map(routine => (
              <div
                key={routine.id}
                className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black bg-stone-900 text-amber-300 px-2.5 py-0.5 rounded-md">
                      {routine.time}
                    </span>
                    <h4 className="font-black text-base text-stone-900">{routine.title}</h4>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      routine.priority === 'critical'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : routine.priority === 'important'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-sand-200 text-stone-700'
                    }`}>
                      {routine.priority}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">{routine.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                    routine.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-sand-200 text-stone-700'
                  }`}>
                    {routine.completed ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE COMPLETION WIDGET (Specification 27) */}
      {activeTab === 'profile_completion' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase text-terracotta-700 tracking-wider">
                Progressive Personalization Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                Asha's Profile Personalization: {profileCompletionPercentage}%
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-64 space-y-1">
              <div className="flex justify-between text-xs font-black text-stone-700">
                <span>Completion Status</span>
                <span>{profileCompletionPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-sand-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-terracotta-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {profileCompletionItems.map(item => (
              <div
                key={item.id}
                className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-emerald-500 text-white' : 'bg-sand-300 text-stone-500'
                  }`}>
                    {item.completed && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <span className={`text-xs sm:text-sm font-bold ${item.completed ? 'text-stone-900' : 'text-stone-500'}`}>
                    {item.label}
                  </span>
                </div>

                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  item.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.completed ? 'Active' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
