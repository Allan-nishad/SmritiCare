import React from 'react';
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
  WifiOff
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
    setRole 
  } = useApp();

  const completedRoutines = routines.filter(r => r.completed).length;
  const activeAlerts = caregiverAlerts.filter(a => !a.dismissed);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      
      {/* Caregiver Welcome & Patient Profile Card */}
      <div className="bg-gradient-to-br from-sage-700 via-sage-800 to-stone-900 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-touch relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white mb-3 border border-white/30">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Caregiver Hub • Longitudinal Cognitive Support</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif mb-1">
              Good Morning, {patient.caregiverName}
            </h1>
            <p className="text-sage-200 text-sm sm:text-base font-medium">
              Here is your continuous cognitive and routine overview for <strong className="text-white">{patient.name}</strong>.
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
                <span className="text-xs text-sage-300">({patient.age} yrs)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sage-200 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                <span>{patient.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active {patient.lastActiveMinutesAgo}m ago
                </span>
                <button
                  onClick={() => setRole('patient')}
                  className="text-[11px] font-bold underline text-white hover:text-terracotta-300"
                >
                  Switch to Asha's View →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

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
            2 / 3
          </div>
          <div className="text-xs text-stone-600 font-medium">
            Memory match & pattern done
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

        {/* Metric 4: Personal Baseline */}
        <div className="bg-white p-5 sm:p-6 rounded-[2rem] border-2 border-sand-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Personal Baseline</span>
            <Heart className="w-5 h-5 text-terracotta-500 fill-terracotta-200" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sage-700 font-serif">
            Stable & Warm
          </div>
          <div className="text-xs text-stone-600 font-medium">
            Optimal recall response pace
          </div>
        </div>

      </div>

      {/* Meaningful Change Insights & Alerts */}
      <ChangeInsights />

      {/* Longitudinal Baseline Analytics */}
      <BaselineAnalytics />

      {/* SmritiCare Intelligence Pipeline Visualizer */}
      <IntelligenceVisualizer />

      {/* Caregiver Customization Studio */}
      <PersonalizationStudio />

    </div>
  );
};
