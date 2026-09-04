import React from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, ArrowRight, Sparkles, Sliders, ShieldAlert, CheckCircle2, TrendingUp } from 'lucide-react';

export const IntelligenceVisualizer: React.FC = () => {
  const { cognitiveSessions } = useApp();
  const latestSession = cognitiveSessions[0] || {
    accuracyPercentage: 84,
    responseAverageSeconds: 9.1,
    difficulty: 'medium',
    adaptiveDecision: {
      ruleApplied: 'Positive Confidence Advance',
      explanation: 'Accurate recall with comfortable 9.1s response. Introducing subtle floral multi-pair challenges.',
      nextRecommendedDifficulty: 'medium',
      nextGameType: 'memory_match'
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-1">
            <Brain className="w-3.5 h-3.5 text-terracotta-600" />
            <span>AI Architecture • Section 18</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            SmritiCare N-of-1 Intelligence Loop
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            How SmritiCare transforms individual session signals into personalized, stress-free care
          </p>
        </div>

        <div className="bg-sand-100 px-3.5 py-1.5 rounded-2xl border border-sand-200 text-xs font-bold text-stone-700">
          Individual Baseline Model (N=1)
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        
        {/* Step 1: Recent Performance */}
        <div className="bg-sand-50 p-5 rounded-3xl border-2 border-sand-200 relative flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1">
              Step 1: Patient Signal
            </div>
            <h4 className="font-extrabold text-stone-900 text-base mb-2">
              Recent Session Data
            </h4>
            <div className="space-y-1.5 text-xs text-stone-700 bg-white p-3 rounded-2xl border border-sand-200">
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <strong className="text-sage-700">{latestSession.accuracyPercentage}%</strong>
              </div>
              <div className="flex justify-between">
                <span>Avg Response:</span>
                <strong className="text-stone-900">{latestSession.responseAverageSeconds}s</strong>
              </div>
              <div className="flex justify-between">
                <span>Hints Used:</span>
                <strong className="text-stone-900">{latestSession.hintsUsed || 0}</strong>
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-stone-500">
            Encrypted local capture without cloud latency
          </div>
        </div>

        {/* Step 2: Personal Baseline Comparison */}
        <div className="bg-sand-50 p-5 rounded-3xl border-2 border-sand-200 relative flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1">
              Step 2: Drift Detection
            </div>
            <h4 className="font-extrabold text-stone-900 text-base mb-2">
              Asha vs. Asha Baseline
            </h4>
            <div className="space-y-1.5 text-xs text-stone-700 bg-white p-3 rounded-2xl border border-sand-200">
              <div className="flex justify-between">
                <span>7-Day Baseline:</span>
                <strong className="text-stone-900">76% recall</strong>
              </div>
              <div className="flex justify-between">
                <span>Today's Variance:</span>
                <strong className="text-sage-700">+8% (Positive)</strong>
              </div>
              <div className="flex justify-between">
                <span>Fatigue Index:</span>
                <strong className="text-emerald-700">0.0 (None)</strong>
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-stone-500">
            Evaluates change against Asha's own normal range
          </div>
        </div>

        {/* Step 3: Adaptive Decision */}
        <div className="bg-sand-50 p-5 rounded-3xl border-2 border-sand-200 relative flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-1">
              Step 3: Adaptive Engine
            </div>
            <h4 className="font-extrabold text-stone-900 text-base mb-2">
              Decision Rule Applied
            </h4>
            <div className="text-xs text-stone-800 bg-white p-3 rounded-2xl border border-sand-200">
              <div className="font-bold text-terracotta-700 mb-1">
                {latestSession.adaptiveDecision?.ruleApplied || 'Positive Mastery Rule'}
              </div>
              <p className="text-[11px] text-stone-600 line-clamp-3">
                {latestSession.adaptiveDecision?.explanation || 'Asha is confident and steady.'}
              </p>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-stone-500">
            Non-medical rule logic optimized for comfort
          </div>
        </div>

        {/* Step 4: Next Calibrated Activity */}
        <div className="bg-gradient-to-br from-terracotta-50 to-sage-50 p-5 rounded-3xl border-2 border-terracotta-300 relative flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-terracotta-700 mb-1">
              Step 4: Adaptation Output
            </div>
            <h4 className="font-extrabold text-stone-900 text-base mb-2">
              Next Personalized Task
            </h4>
            <div className="space-y-1.5 text-xs text-stone-800 bg-white p-3 rounded-2xl border border-terracotta-200">
              <div className="flex justify-between">
                <span>Next Activity:</span>
                <strong className="text-terracotta-700 capitalize">
                  {latestSession.adaptiveDecision?.nextGameType?.replace('_', ' ') || 'Memory Match'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <strong className="text-stone-900 uppercase">
                  {latestSession.adaptiveDecision?.nextRecommendedDifficulty || 'Medium'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Theme:</span>
                <strong className="text-stone-900">NER Flora & Garden</strong>
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] font-bold text-sage-800">
            ✓ Care loop closed seamlessly
          </div>
        </div>

      </div>

    </div>
  );
};
