import React from 'react';
import { useApp } from '../../../context/AppContext';
import { translations } from '../../../utils/translations';
import { speakText } from '../../../utils/audio';
import { MemoryMatchGame } from '../../patient/games/MemoryMatchGame';
import { PatternSequenceGame } from '../../patient/games/PatternSequenceGame';
import { AssociationGame } from '../../patient/games/AssociationGame';
import { Brain, Sparkles, Award, Layers, Volume2, ShieldCheck, Heart, TrendingUp } from 'lucide-react';

export const MobileGamesTab: React.FC = () => {
  const { activeGameTab, setActiveGameTab, cognitiveSessions, language, familyMemories } = useApp();
  const lastSession = cognitiveSessions[0];
  const t = translations[language] || translations.en;

  const handleReadGameRule = () => {
    let instruction = t.gameInstructionsMemory;
    if (activeGameTab === 'pattern_sequence') instruction = t.gameInstructionsPattern;
    if (activeGameTab === 'word_association') instruction = t.gameInstructionsAssociation;
    speakText(instruction, language);
  };

  return (
    <div className="space-y-3.5 pb-4 select-none">
      {/* Header Banner */}
      <div className="bg-[#EEF4EC] rounded-2xl p-3.5 border border-[#A8C3A0]/60 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#356859]">
            <Brain className="w-4 h-4 text-[#D88965]" />
            <span>AI Cognitive Training</span>
          </div>
          <button
            onClick={handleReadGameRule}
            className="flex items-center gap-1 text-[10.5px] font-bold text-[#356859] bg-[#F8F5ED] hover:bg-[#dfeadc] px-2.5 py-1 rounded-full border border-[#A8C3A0]/40 transition active:scale-95"
            title={t.listenAloudLabel}
          >
            <Volume2 className="w-3.5 h-3.5 text-[#D88965]" />
            <span>{t.listenAloudLabel}</span>
          </button>
        </div>

        {/* Cognitive Domain Tags */}
        <div className="flex flex-wrap items-center gap-1 text-[9.5px] font-bold">
          <span className="bg-[#356859] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 text-[#EEF4EC]" />
            <span>Family Photo Match</span>
          </span>
          <span className="bg-[#D88965]/20 text-[#D88965] border border-[#D88965]/40 px-2 py-0.5 rounded-full">
            3s Recall Exposure
          </span>
          <span className="bg-[#5E9367]/20 text-[#5E9367] border border-[#5E9367]/40 px-2 py-0.5 rounded-full">
            Adaptive AI Difficulty
          </span>
        </div>

        {/* 3 Game Sub-Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#F8F5ED] p-1 rounded-xl border border-[#A8C3A0]/40">
          <button
            onClick={() => setActiveGameTab('memory_match')}
            className={`py-2 px-1 rounded-lg text-[10.5px] font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'memory_match'
                ? 'bg-[#356859] text-white shadow-xs'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <span>🦏 {t.gamePairsLabel}</span>
            <span className="text-[8.5px] font-normal opacity-85">Personal Memory</span>
          </button>

          <button
            onClick={() => setActiveGameTab('pattern_sequence')}
            className={`py-2 px-1 rounded-lg text-[10.5px] font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'pattern_sequence'
                ? 'bg-[#356859] text-white shadow-xs'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <span>🫖 {t.gameRhythmLabel}</span>
            <span className="text-[8.5px] font-normal opacity-85">Attention Sequence</span>
          </button>

          <button
            onClick={() => setActiveGameTab('word_association')}
            className={`py-2 px-1 rounded-lg text-[10.5px] font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeGameTab === 'word_association'
                ? 'bg-[#356859] text-white shadow-xs'
                : 'text-[#26332F] hover:text-[#356859]'
            }`}
          >
            <span>🧣 {t.gameWordsLabel}</span>
            <span className="text-[8.5px] font-normal opacity-85">Semantic Words</span>
          </button>
        </div>
      </div>

      {/* Active Game Area */}
      <div className="mobile-game-container">
        {activeGameTab === 'memory_match' && <MemoryMatchGame />}
        {activeGameTab === 'pattern_sequence' && <PatternSequenceGame />}
        {activeGameTab === 'word_association' && <AssociationGame />}
      </div>

      {/* Adaptive Reinforcement & Longitudinal Baseline */}
      {lastSession && (
        <div className="bg-[#EEF4EC] rounded-2xl p-3 border border-[#A8C3A0]/50 text-[#26332F] text-xs space-y-1">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1 text-[#356859]">
              <Award className="w-3.5 h-3.5 text-[#D88965]" />
              <span>{t.lastSessionResult}</span>
            </span>
            <span className="text-[#356859] font-black bg-[#F8F5ED] px-2 py-0.5 rounded-full border border-[#A8C3A0]/40">
              {lastSession.accuracyPercentage}% Accuracy
            </span>
          </div>
          <p className="text-[10.5px] text-[#26332F]/80">
            {lastSession.adaptiveDecision?.explanation || t.positiveReinforcement[0]}
          </p>
        </div>
      )}
    </div>
  );
};


