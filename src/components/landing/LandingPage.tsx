import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  User, 
  Activity, 
  Brain, 
  Sparkles, 
  ShieldCheck, 
  WifiOff, 
  Globe, 
  ArrowRight, 
  Award, 
  Clock, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  PhoneCall, 
  Compass,
  Smartphone,
  Zap,
  MapPin,
  Watch,
  Languages,
  Navigation
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, setIsVoiceOpen, triggerSimulation } = useApp();

  return (
    <div className="space-y-16 pb-16 select-none">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          {/* SIH Badge */}
          <div className="inline-flex items-center gap-2 bg-terracotta-100 text-terracotta-800 border border-terracotta-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
            <Award className="w-4 h-4 text-terracotta-600" />
            <span>Smart India Hackathon 2026 • Problem Statement 26003</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight font-serif leading-[1.15]">
            Technology that remembers <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 to-terracotta-500">
              what matters.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
            AI-based cognitive gaming, personal reminiscence, routine assistance, and location safety platform for elderly dementia patients in North Eastern Region (NER).
          </p>

          {/* Direct Clear Entry Buttons: [ Patient ] [ Caregiver ] */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            
            <button
              onClick={() => setRole('patient')}
              className="px-8 py-5 rounded-2xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 text-white font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl transition active:scale-95 flex items-center gap-3 border-2 border-white ring-4 ring-terracotta-500/20"
            >
              <User className="w-6 h-6" />
              <span>Asha's Space (Patient)</span>
            </button>

            <button
              onClick={() => setRole('caregiver')}
              className="px-8 py-5 rounded-2xl bg-sage-700 hover:bg-sage-800 text-white font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl transition active:scale-95 flex items-center gap-3 border-2 border-white ring-4 ring-sage-600/20"
            >
              <Activity className="w-6 h-6" />
              <span>Priya's Hub (Caregiver)</span>
            </button>

            <button
              onClick={() => setRole('mobile')}
              className="px-6 py-5 rounded-2xl bg-stone-900 hover:bg-black text-amber-300 font-bold text-base sm:text-lg shadow-xl transition active:scale-95 flex items-center gap-2.5 border border-stone-700"
            >
              <Smartphone className="w-5 h-5 text-amber-400" />
              <span>Mobile App Shell</span>
            </button>

          </div>

        </div>
      </section>

      {/* 5-Minute Judge Demo Sequence Flow Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase text-terracotta-700 tracking-wider">
                Official SIH 26003 Demonstration Workflow
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                5-Minute Complete Evaluator Walkthrough
              </h3>
            </div>
            <span className="text-xs font-bold bg-sand-100 text-stone-700 px-3 py-1.5 rounded-xl border border-sand-300">
              Continuous Loop: Patient ➔ Caregiver
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* Step 1 */}
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
              <span className="font-mono font-black text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded">01</span>
              <h4 className="font-black text-sm text-stone-900">Orientation & Language</h4>
              <p className="text-stone-600">
                Asha's home shows today's date, live clock, and next routine. Switch language to <strong>Assamese</strong> or <strong>Manipuri</strong> with native voice read-out.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
              <span className="font-mono font-black text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded">02</span>
              <h4 className="font-black text-sm text-stone-900">Alarm & Snooze x3</h4>
              <p className="text-stone-600">
                Trigger medication alarm overlay. Snooze 3x to demonstrate explainable Caregiver Snooze Warning escalation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
              <span className="font-mono font-black text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded">03</span>
              <h4 className="font-black text-sm text-stone-900">Adaptive Memory Match</h4>
              <p className="text-stone-600">
                Caregiver-personalized family photos, 3.5s card preview, positive encouraging voice (never "Wrong!"), and rule-based adaptive level up.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-2">
              <span className="font-mono font-black text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded">04</span>
              <h4 className="font-black text-sm text-stone-900">Location, Missing & SOS</h4>
              <p className="text-stone-600">
                Simulate patient away from home (1.8 km). Demonstrate "Take Me Home" guidance and SOS two-contact fallback (Meera ➔ Rahul).
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core SIH Pillar Alignment Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">
            System Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
            Built for Dementia Support in the North Eastern Region
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border-2 border-sand-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold">
              <Brain className="w-6 h-6" />
            </div>
            <h4 className="font-black text-lg text-stone-900">Adaptive Cognitive Games</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Personalized with family photos, level progression (1-5), pattern recall, shape matching, and positive reinforcement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-sand-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="font-black text-lg text-stone-900">Multilingual NER Support</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Assamese, Bengali, Manipuri/Meitei, Hindi, and English with regional speech synthesis and family voice customization.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-sand-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <WifiOff className="w-6 h-6" />
            </div>
            <h4 className="font-black text-lg text-stone-900">Offline-First Resiliency</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              All games, routines, emergency data, and last-known locations work without internet. Seamless 3-step synchronization when restored.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-sand-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h4 className="font-black text-lg text-stone-900">Two-Contact Fallback SOS</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Automatic escalation from Meera (Daughter) to Rahul (Son) with instant GPS location SMS dispatch.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-sand-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Navigation className="w-6 h-6" />
            </div>
            <h4 className="font-black text-lg text-stone-900">Missing Patient & Places</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              "Take Me Home" step-by-step guidance, familiar landmarks, and phone-independent wearable safety layer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-sand-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="font-black text-lg text-stone-900">Personal Baseline (Asha vs Asha)</h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Evaluates Asha's own longitudinal progress instead of generic population averages. Empowers compassionate caregiver insights.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
