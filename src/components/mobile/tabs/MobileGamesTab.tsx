import React from 'react';
import { useApp } from '../../../context/AppContext';
import { MemoryMatchGame } from '../../patient/games/MemoryMatchGame';
import { PatternSequenceGame } from '../../patient/games/PatternSequenceGame';
import { AssociationGame } from '../../patient/games/AssociationGame';
import { Brain, Sparkles, Award, Layers, Compass, HelpCircle } from 'lucide-react';

export const MobileGamesTab: React.FC = () => {
  const { activeGameTab, setActiveGameTab, cognitiveSessions } = useApp();
  const lastSession = cognitiveSessions[0];

  return (
    <div className="space-y-4 pb-4">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-4 border border-sand-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-terracotta-700">
            <Brain className="w-4 h-4 text-terracotta-600" />
            <span>NER Cognitive Exercises</span>
          </div>
          <span className="text-[10px] font-bold text-sage-800 bg-sage-100 px-2 py-0.5 rounded-full border border-sage-200">
            Adaptive N-of-1
          </span>
        </div>

        <p className="text-xs text-stone-600">
          Culturally familiar games with zero rush, positive reinforcement, and self-calibrating pace.
        </p>

        {/* 3 Game Sub-Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-sand-100 p-1 rounded-xl border border-sand-200">
          <button
            onClick={() => setActiveGameTab('memory_match')}
            className={`py-2 px-1 rounded-lg text-[11px] font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'memory_match'
                ? 'bg-white text-terracotta-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🦏 Match</span>
            <span className="text-[9px] font-normal text-stone-500">Pairs</span>
          </button>

          <button
            onClick={() => setActiveGameTab('pattern_sequence')}
            className={`py-2 px-1 rounded-lg text-[11px] font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'pattern_sequence'
                ? 'bg-white text-terracotta-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🫖 Rhythm</span>
            <span className="text-[9px] font-normal text-stone-500">Order</span>
          </button>

          <button
            onClick={() => setActiveGameTab('word_association')}
            className={`py-2 px-1 rounded-lg text-[11px] font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'word_association'
                ? 'bg-white text-terracotta-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🧣 Words</span>
            <span className="text-[9px] font-normal text-stone-500">Connect</span>
          </button>
        </div>
      </div>

      {/* Active Game Area */}
      <div className="mobile-game-container">
        {activeGameTab === 'memory_match' && <MemoryMatchGame />}
        {activeGameTab === 'pattern_sequence' && <PatternSequenceGame />}
        {activeGameTab === 'word_association' && <AssociationGame />}
      </div>

      {/* Last Session Baseline Insight Pill */}
      {lastSession && (
        <div className="bg-sand-50 rounded-2xl p-3.5 border border-sand-200 text-stone-700 text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-stone-900">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Last Session Result</span>
            </span>
            <span className="text-terracotta-700 font-extrabold">{lastSession.accuracyPercentage}% Accuracy</span>
          </div>
          <p className="text-[11px] text-stone-500">
            {lastSession.adaptiveDecision?.explanation || "Great focus shown during the session."}
          </p>
        </div>
      )}
    </div>
  );
};
