import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { sounds, speakText } from '../../../utils/audio';
import { translations, getLocalizedPatternPuzzles } from '../../../utils/translations';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw, Heart, Award, ArrowRight, Brain, Volume2 } from 'lucide-react';

export const PatternSequenceGame: React.FC = () => {
  const { recordCognitiveSession, isOffline, language } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const t = translations[language] || translations.en;
  const puzzles = getLocalizedPatternPuzzles(language);
  const puzzle = puzzles[currentIdx] || puzzles[0];

  const [feedback, setFeedback] = useState<string>(t.gameInstructionsPattern);

  const handleReadQuestion = () => {
    speakText(t.gameInstructionsPattern, language);
  };

  const handleOptionClick = (option: { icon: string; name: string }) => {
    setSelectedOption(option.icon);
    setAttempts(prev => prev + 1);

    if (option.icon === puzzle.correctIcon) {
      sounds.playSuccess();
      confetti({ particleCount: 50, spread: 50 });
      setFeedback(puzzle.ruleExplanation);
      speakText(puzzle.spokenSuccess, language);

      setTimeout(() => {
        if (currentIdx + 1 < puzzles.length) {
          setCurrentIdx(prev => prev + 1);
          setSelectedOption(null);
          setFeedback(t.gameInstructionsPattern);
        } else {
          setIsFinished(true);
          recordCognitiveSession({
            gameType: 'pattern_sequence',
            gameTitle: t.gamePatternTitle,
            durationSeconds: 45,
            totalAttempts: attempts + 1,
            accuracyPercentage: 88,
            difficulty: 'easy',
            responseAverageSeconds: 8.5,
            hintsUsed: 0,
            adaptiveDecision: {
              ruleApplied: 'Sequential Memory Reinforcement',
              explanation: 'Accurate temporal pattern recognition. Ready for multi-step daily sequence exercises.',
              nextRecommendedDifficulty: 'medium',
              nextGameType: 'word_association'
            }
          });
        }
      }, 1600);
    } else {
      sounds.playSoftTryAgain();
      const phrases = t.positiveMistakeEncouragement;
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      setFeedback(phrase);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-7 border-2 border-sand-200 shadow-soft max-w-3xl mx-auto select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.gamePatternTitle}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
            {t.gameRhythmLabel}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReadQuestion}
            className="p-2 bg-sand-100 hover:bg-sand-200 rounded-xl text-terracotta-700 transition active:scale-95"
            title={t.listenAloudLabel}
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <div className="bg-sand-100 px-3 py-1.5 rounded-xl border border-sand-200 text-xs font-bold text-stone-700">
            {currentIdx + 1} / {puzzles.length}
          </div>
        </div>
      </div>

      {/* Encouragement Banner */}
      <div className="my-4 bg-sand-50 p-3.5 rounded-2xl border border-sand-200 flex items-center gap-2.5 text-stone-800">
        <Heart className="w-5 h-5 text-terracotta-500 fill-terracotta-200 shrink-0" />
        <p className="text-sm sm:text-base font-semibold">
          {feedback}
        </p>
      </div>

      {!isFinished ? (
        <div className="space-y-6 my-4">
          
          {/* Sequence Display Strip */}
          <div className="bg-gradient-to-r from-sand-100 via-amber-50 to-sand-100 p-4 sm:p-6 rounded-3xl border-2 border-sand-300 flex flex-wrap items-center justify-center gap-2 sm:gap-4 shadow-inner">
            {puzzle.sequence.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl min-w-[70px] sm:min-w-[84px] shadow-sm transition ${
                  item.icon === '❓'
                    ? 'bg-terracotta-100 border-2 border-dashed border-terracotta-400 animate-pulse text-terracotta-700'
                    : 'bg-white border-2 border-sand-200 text-stone-800'
                }`}>
                  <span className="text-3xl sm:text-4xl mb-1">{item.icon}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-600">{item.name}</span>
                </div>
                {idx < puzzle.sequence.length - 1 && (
                  <span className="text-terracotta-400 font-extrabold text-lg sm:text-xl">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Options Grid */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 text-center">
              {t.gameInstructionsPattern}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {puzzle.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center transition shadow-md ${
                    selectedOption === opt.icon
                      ? opt.icon === puzzle.correctIcon
                        ? 'bg-sage-100 border-sage-500 ring-4 ring-sage-200'
                        : 'bg-sand-100 border-sand-400'
                      : 'bg-white hover:bg-amber-50 border-sand-200 hover:border-terracotta-400 hover:scale-105 active:scale-95'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl mb-2">{opt.icon}</span>
                  <span className="font-extrabold text-stone-900 text-sm">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Completion Screen */
        <div className="bg-[#FAF7F2] rounded-3xl p-6 border-2 border-sage-200 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 mx-auto flex items-center justify-center mb-3">
            <Award className="w-8 h-8 text-sage-600" />
          </div>

          <h4 className="text-2xl font-extrabold text-stone-900 mb-1 font-serif">
            {t.positiveReinforcement[0]}
          </h4>
          <p className="text-stone-600 text-sm mb-5">
            {t.gamePatternTitle}
          </p>

          <button
            onClick={() => {
              setCurrentIdx(0);
              setIsFinished(false);
              setSelectedOption(null);
            }}
            className="btn-elder-secondary text-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.startActivityBtn}</span>
          </button>
        </div>
      )}

    </div>
  );
};

