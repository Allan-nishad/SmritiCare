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
  Zap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, setIsVoiceOpen, setDemoTourStep, setIsDemoTourActive } = useApp();

  const handleStartJudgeTour = () => {
    setDemoTourStep(0);
    setIsDemoTourActive(true);
    setRole('patient');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 px-4 sm:px-6 overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 text-8xl opacity-10 select-none pointer-events-none hidden lg:block">
          🫖
        </div>

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
            An AI-enabled, offline-first cognitive companion designed specifically for elderly dementia support and caregivers in the North-Eastern Region of India.
          </p>

          {/* Quick Guided Judge Tour, Dual Live Sync & Mobile App Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setRole('dual')}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all active:scale-95 border border-emerald-300"
            >
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-bounce" />
              <span>📱📱 Launch Dual-Device Live Sync Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setRole('mobile')}
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-black text-amber-300 font-extrabold px-5 py-3.5 rounded-2xl text-sm shadow-xl transition-all active:scale-95 border border-stone-700"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Mobile Phone Shell</span>
            </button>

            <button
              onClick={handleStartJudgeTour}
              className="inline-flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-extrabold px-5 py-3.5 rounded-2xl text-sm shadow-xl transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>3-Min Judge Tour</span>
            </button>
          </div>

        </div>
      </section>

      {/* Role Selection Cards Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
            Select an Experience to Begin
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Integrated Ecosystem. Patient App & Caregiver Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Mobile App Prototype */}
          <div 
            onClick={() => setRole('mobile')}
            className="elder-card elder-card-interactive p-6 sm:p-7 text-left cursor-pointer group flex flex-col justify-between border-2 border-amber-400/60 bg-gradient-to-b from-amber-50/40 to-white shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-amber-400 text-stone-900 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Prototype App
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-md">
                <Smartphone className="w-7 h-7 text-amber-300" />
              </div>

              <div className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 mb-2">
                Smartphone Experience
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif mb-2">
                Mobile Native App
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Interactive smartphone simulator with iPhone 15 & Pixel frames, touch-friendly games, voice drawer, and bottom navigation.
              </p>
            </div>

            <div className="pt-3 border-t border-amber-200 flex items-center justify-between font-bold text-amber-800 text-xs sm:text-sm">
              <span>Open Mobile Shell</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
            </div>
          </div>

          {/* Card 2: Patient Experience */}
          <div 
            onClick={() => setRole('patient')}
            className="elder-card elder-card-interactive p-6 sm:p-7 text-left cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-inner">
                <User className="w-7 h-7 text-terracotta-600" />
              </div>

              <div className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta-200 mb-2">
                Asha's Patient Portal
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif mb-2">
                Elderly Full Canvas
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                High-contrast dashboard with spoken voice AI, 3 adaptive NER cognitive exercises, daily routines, and family reminiscence.
              </p>
            </div>

            <div className="pt-3 border-t border-sand-200 flex items-center justify-between font-bold text-terracotta-600 text-xs sm:text-sm">
              <span>Open Asha's Space</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
            </div>
          </div>

          {/* Card 3: Caregiver Portal */}
          <div 
            onClick={() => setRole('caregiver')}
            className="elder-card elder-card-interactive p-6 sm:p-7 text-left cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-inner">
                <Activity className="w-7 h-7 text-sage-600" />
              </div>

              <div className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-sage-800 bg-sage-50 px-2.5 py-0.5 rounded-full border border-sage-200 mb-2">
                Priya's Caregiver Hub
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif mb-2">
                Caregiver Studio
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Longitudinal 7-day N-of-1 baseline analytics, change detection alerts, custom memory studio, and real-time offline sync monitoring.
              </p>
            </div>

            <div className="pt-3 border-t border-sand-200 flex items-center justify-between font-bold text-sage-700 text-xs sm:text-sm">
              <span>Open Priya's Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
            </div>
          </div>

        </div>
      </section>

      {/* The Core Innovation: Personal Cognitive-Care Loop */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border-2 border-sand-200 shadow-soft">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-2">
              <Brain className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Core SIH Innovation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              The Personal Cognitive-Care Loop
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm font-medium mt-1">
              SmritiCare compares the patient primarily against <strong>THEIR OWN</strong> historical baseline rather than generic population averages.
            </p>
          </div>

          {/* Visual Step-by-Step Cycle */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-center">
            
            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">👵</span>
              <span className="text-xs font-extrabold text-stone-900">1. Patient Activity</span>
              <span className="text-[10px] text-stone-500">Memory match session</span>
            </div>

            <div className="hidden md:flex items-center justify-center text-terracotta-400 font-bold text-lg">→</div>

            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">📊</span>
              <span className="text-xs font-extrabold text-stone-900">2. Personal Baseline</span>
              <span className="text-[10px] text-stone-500">Asha vs. Asha 7-day</span>
            </div>

            <div className="hidden md:flex items-center justify-center text-terracotta-400 font-bold text-lg">→</div>

            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">⚙️</span>
              <span className="text-xs font-extrabold text-stone-900">3. Adaptive Game</span>
              <span className="text-[10px] text-stone-500">Gentle difficulty decision</span>
            </div>

            <div className="hidden md:flex items-center justify-center text-terracotta-400 font-bold text-lg">→</div>

            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex flex-col items-center justify-center">
              <span className="text-2xl mb-1">👩‍⚕️</span>
              <span className="text-xs font-extrabold text-stone-900">4. Caregiver Insight</span>
              <span className="text-[10px] text-stone-500">Actionable change alert</span>
            </div>

          </div>

          {/* Key Differentiator Banner */}
          <div className="mt-8 p-5 bg-gradient-to-r from-terracotta-50 to-sand-100 rounded-3xl border border-terracotta-200 text-stone-800 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-terracotta-800 text-sm sm:text-base font-serif block mb-0.5">
                "Not just a brain game. Not just a reminder. A personal cognitive companion."
              </strong>
              <span>Non-diagnostic, positive reinforcement and offline synchronization for true regional accessibility.</span>
            </div>
            <button
              onClick={() => setRole('patient')}
              className="btn-elder-primary text-xs shrink-0 py-2.5 px-5"
            >
              Explore Now
            </button>
          </div>

        </div>
      </section>

      {/* 4 Feature Pillars Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-3xl border-2 border-sand-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center font-bold">
              <WifiOff className="w-5 h-5 text-terracotta-600" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-sm">Offline-First Engine</h4>
            <p className="text-xs text-stone-600">
              Core cognitive activities and routine timestamps function with zero internet connection. Syncs on demand.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-sand-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 text-sage-600" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-sm">NER Cultural Touch</h4>
            <p className="text-xs text-stone-600">
              Multilingual (Assamese, Manipuri, Bengali, Hindi, English) with culturally familiar imagery (Assam tea, Gamosa, Bihu).
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-sand-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-sm">Asha vs. Asha Baseline</h4>
            <p className="text-xs text-stone-600">
              Longitudinal tracking of individual response time, recall accuracy, and routine adherence without clinical labels.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border-2 border-sand-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 text-terracotta-600" />
            </div>
            <h4 className="font-extrabold text-stone-900 text-sm">Reminiscence Care</h4>
            <p className="text-xs text-stone-600">
              Family photo prompts, loved ones' voice notes, and cherished hometown stories preserve emotional memory anchors.
            </p>
          </div>

        </div>
      </section>

      {/* SIH Footer */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 border-t border-sand-300 text-center text-xs text-stone-500 space-y-2">
        <div className="font-bold text-stone-700">
          SmritiCare • AI-Enabled, Offline-First Cognitive Assistance Platform
        </div>
        <div>
          Smart India Hackathon 2026 • Problem Statement 26003 • Built with empathy for the North-Eastern Region of India
        </div>
      </footer>

    </div>
  );
};
