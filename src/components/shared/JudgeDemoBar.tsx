import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronRight, ChevronLeft, Check, Award, Eye, RotateCcw } from 'lucide-react';

interface DemoStep {
  title: string;
  badge: string;
  description: string;
  action: (ctx: any) => void;
}

const demoSteps: DemoStep[] = [
  {
    title: "1. Dual-Device Live Sync Demo",
    badge: "Dual Device",
    description: "Side-by-side interactive simulation of Asha (Patient) and Priya (Caregiver) with real-time zero-latency broadcast sync.",
    action: (ctx) => {
      ctx.setRole('dual');
    }
  },
  {
    title: "2. Mobile App Prototype",
    badge: "Mobile App",
    description: "Touch-first smartphone app interface with elderly-accessible navigation & caregiver companion hub.",
    action: (ctx) => {
      ctx.setRole('mobile');
      ctx.setMobileTab('home');
    }
  },
  {
    title: "3. Landing & SIH Concept",
    badge: "Concept",
    description: "Overview of Problem Statement 26003: Cognitive Loop, N-of-1 Baseline & NER Focus.",
    action: (ctx) => {
      ctx.setRole('landing');
    }
  },
  {
    title: "3. Patient Home & Orientation",
    badge: "Patient UI",
    description: "Elderly-friendly high-contrast dashboard with 'Where Am I Today?' orientation card.",
    action: (ctx) => {
      ctx.setRole('patient');
    }
  },
  {
    title: "3. Multilingual Voice AI",
    badge: "Voice-First",
    description: "Visual waveform & gentle conversational voice assistance in Assamese, Bengali, Hindi & English.",
    action: (ctx) => {
      ctx.setRole('patient');
      ctx.setIsVoiceOpen(true);
    }
  },
  {
    title: "4. Memory Match (NER Objects)",
    badge: "Game 1",
    description: "6-8 card cognitive exercise with Assam Tea, Gamosa, Rhinoceros, and Kamakhya temple.",
    action: (ctx) => {
      ctx.setRole('patient');
      ctx.setIsVoiceOpen(false);
      ctx.setActiveGameTab('memory_match');
    }
  },
  {
    title: "5. Pattern & Association Games",
    badge: "Game 2 & 3",
    description: "Daily rhythm sequences and culturally resonant semantic association exercises.",
    action: (ctx) => {
      ctx.setRole('patient');
      ctx.setActiveGameTab('pattern_sequence');
    }
  },
  {
    title: "6. Memories That Matter",
    badge: "Reminiscence",
    description: "Family photo prompts (Meera, Ravi, Jorhat home) with recorded voice notes & memories.",
    action: (ctx) => {
      ctx.setRole('patient');
      const el = document.getElementById('memories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: "7. Daily Routine Assistance",
    badge: "Routine",
    description: "Supportive timeline for medicine, hydration, and walking with warm confirmations.",
    action: (ctx) => {
      ctx.setRole('patient');
      const el = document.getElementById('routine-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: "8. Offline-First Test",
    badge: "Offline Core",
    description: "Toggle offline mode to verify local caching with zero lag and pending sync count.",
    action: (ctx) => {
      ctx.setIsOffline(true);
      ctx.setRole('patient');
    }
  },
  {
    title: "9. Cloud Sync Simulation",
    badge: "Sync Engine",
    description: "Trigger secure 3-step synchronization to push offline data to Caregiver dashboard.",
    action: (ctx) => {
      ctx.triggerSync();
    }
  },
  {
    title: "10. Caregiver Live Dashboard",
    badge: "Caregiver",
    description: "Priya's care overview with engagement metrics and synced cognitive activity status.",
    action: (ctx) => {
      ctx.setRole('caregiver');
    }
  },
  {
    title: "11. Asha vs Asha Baseline",
    badge: "Personal Baseline",
    description: "Longitudinal 7-day N-of-1 trend charts (Recall 68% -> 84%, Response 13s -> 9s).",
    action: (ctx) => {
      ctx.setRole('caregiver');
      const el = document.getElementById('caregiver-baseline');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: "12. Meaningful Change Insight",
    badge: "AI Insight",
    description: "Non-alarmist attention alerts with actionable care recommendations.",
    action: (ctx) => {
      ctx.setRole('caregiver');
      const el = document.getElementById('caregiver-insights');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: "13. Personalization Studio",
    badge: "Caregiver Tool",
    description: "Add custom family photos, voice notes, and routines that adapt the patient experience.",
    action: (ctx) => {
      ctx.setRole('caregiver');
      const el = document.getElementById('caregiver-personalize');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }
];

export const JudgeDemoBar: React.FC = () => {
  const app = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const currentStep = demoSteps[app.demoTourStep] || demoSteps[0];

  const handleStepClick = (index: number) => {
    app.setDemoTourStep(index);
    demoSteps[index].action(app);
  };

  const handleNext = () => {
    const nextIdx = (app.demoTourStep + 1) % demoSteps.length;
    handleStepClick(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (app.demoTourStep - 1 + demoSteps.length) % demoSteps.length;
    handleStepClick(prevIdx);
  };

  return (
    <div className="bg-gradient-to-r from-stone-900 via-terracotta-900 to-stone-900 text-white border-b border-terracotta-700/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          {/* Left Title & Badge */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/40 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-terracotta-400" />
              <span>SIH 2026 Judge Tour</span>
            </div>
            
            <div className="text-xs sm:text-sm font-semibold flex items-center gap-2">
              <span className="text-amber-300 font-bold">{currentStep.title}</span>
              <span className="hidden md:inline text-stone-300 text-xs">— {currentStep.description}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                app.setRole('dual');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-300 border border-emerald-400/40 text-xs font-bold transition active:scale-95"
              title="Launch Side-by-Side Dual Device Live Sync Studio"
            >
              <span>📱📱 Dual Live Demo</span>
            </button>

            <button
              onClick={() => {
                app.setRole('mobile');
                app.setMobileTab('home');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition active:scale-95"
              title="Launch Smartphone Mobile Prototype"
            >
              <span>📱 Mobile App</span>
            </button>

            <button
              onClick={handlePrev}
              className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition"
              title="Previous Demo Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-stone-300 bg-stone-800 px-2 py-0.5 rounded border border-stone-700">
              {app.demoTourStep + 1} / {demoSteps.length}
            </span>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold shadow-md transition active:scale-95"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-stone-300 hover:text-white underline ml-1 cursor-pointer"
            >
              {isExpanded ? 'Hide Steps' : 'View All Steps'}
            </button>
          </div>
        </div>

        {/* Expanded Steps Grid */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-stone-700/60 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pb-1 animate-in fade-in duration-200">
            {demoSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`p-2 rounded-xl text-left transition text-xs border ${
                  app.demoTourStep === idx
                    ? 'bg-terracotta-500/30 border-terracotta-400 text-white font-bold ring-1 ring-terracotta-400'
                    : 'bg-stone-800/60 hover:bg-stone-800 border-stone-700 text-stone-300'
                }`}
              >
                <div className="text-[10px] text-terracotta-300 uppercase font-semibold mb-0.5">{step.badge}</div>
                <div className="truncate font-medium">{step.title}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
