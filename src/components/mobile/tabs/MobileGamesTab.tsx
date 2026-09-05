import React from 'react';
import { useApp } from '../../../context/AppContext';
import { translations } from '../../../utils/translations';
import { speakText } from '../../../utils/audio';
import { MemoryMatchGame } from '../../patient/games/MemoryMatchGame';
import { PatternSequenceGame } from '../../patient/games/PatternSequenceGame';
import { AssociationGame } from '../../patient/games/AssociationGame';
import { Brain, Sparkles, Award, Layers, Volume2 } from 'lucide-react';

export const MobileGamesTab: React.FC = () => {
  const { activeGameTab, setActiveGameTab, cognitiveSessions, language } = useApp();
  const lastSession = cognitiveSessions[0];
  const t = translations[language] || translations.en;

  const handleReadGameRule = () => {
    let instruction = t.gameInstructionsMemory;
    if (activeGameTab === 'pattern_sequence') instruction = t.gameInstructionsPattern;
    if (activeGameTab === 'word_association') instruction = t.gameInstructionsAssociation;
    speakText(instruction, language);
  };

  return (
    <div className="space-y-4 pb-4 select-none">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-4 border border-sand-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-terracotta-700">
            <Brain className="w-4 h-4 text-terracotta-600" />
            <span>{t.tabGames}</span>
          </div>
          <button
            onClick={handleReadGameRule}
            className="flex items-center gap-1 text-[11px] font-bold text-terracotta-700 bg-sand-100 hover:bg-sand-200 px-2.5 py-1 rounded-full transition active:scale-95"
            title={t.listenAloudLabel}
          >
            <Volume2 className="w-3.5 h-3.5 text-terracotta-600" />
            <span>{t.listenAloudLabel}</span>
          </button>
        </div>

        <p className="text-xs text-stone-600">
          {t.gameInstructionsMemory}
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
            <span>🦏 {t.gamePairsLabel}</span>
          </button>

          <button
            onClick={() => setActiveGameTab('pattern_sequence')}
            className={`py-2 px-1 rounded-lg text-[11px] font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'pattern_sequence'
                ? 'bg-white text-terracotta-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🫖 {t.gameRhythmLabel}</span>
          </button>

          <button
            onClick={() => setActiveGameTab('word_association')}
            className={`py-2 px-1 rounded-lg text-[11px] font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'word_association'
                ? 'bg-white text-terracotta-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🧣 {t.gameWordsLabel}</span>
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
              <span>{t.lastSessionResult}</span>
            </span>
            <span className="text-terracotta-700 font-extrabold">{lastSession.accuracyPercentage}%</span>
          </div>
          <p className="text-[11px] text-stone-500">
            {lastSession.adaptiveDecision?.explanation || t.positiveReinforcement[0]}
          </p>
        </div>
      )}
    </div>
  );
};

