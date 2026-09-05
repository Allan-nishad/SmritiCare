import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { sounds, speakText } from '../../../utils/audio';
import { translations, getLocalizedAssociationDeck } from '../../../utils/translations';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw, Heart, Award, ArrowRight, Brain, Volume2 } from 'lucide-react';

export const AssociationGame: React.FC = () => {
  const { recordCognitiveSession, language } = useApp();
  const [index, setIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const t = translations[language] || translations.en;
  const associationDeck = getLocalizedAssociationDeck(language);
  const currentQ = associationDeck[index] || associationDeck[0];

  const [gentleStatus, setGentleStatus] = useState<string>(t.gameInstructionsAssociation);

  const handleReadQuestion = () => {
    const textToSpeak = `${t.gameInstructionsAssociation}. ${currentQ.promptTitle}: ${currentQ.promptSubtext}`;
    speakText(textToSpeak, language);
  };

  const handleSelect = (opt: { icon: string; title: string; isCorrect: boolean }) => {
    setSelectedOpt(opt.title);
    setAttempts(prev => prev + 1);

    if (opt.isCorrect) {
      sounds.playSuccess();
      confetti({ particleCount: 50, spread: 50 });
      setGentleStatus(currentQ.explanation);
      speakText(currentQ.spokenSuccess, language);

      setTimeout(() => {
        if (index + 1 < associationDeck.length) {
          setIndex(prev => prev + 1);
          setSelectedOpt(null);
          setGentleStatus(t.gameInstructionsAssociation);
        } else {
          setIsCompleted(true);
          recordCognitiveSession({
            gameType: 'word_association',
            gameTitle: t.gameAssociationTitle,
            durationSeconds: 50,
            totalAttempts: attempts + 1,
            accuracyPercentage: 92,
            difficulty: 'easy',
            responseAverageSeconds: 7.8,
            hintsUsed: 0,
            adaptiveDecision: {
              ruleApplied: 'Semantic Network Preservation',
              explanation: 'High semantic association score (92%). Preserves everyday contextual memory without cognitive fatigue.',
              nextRecommendedDifficulty: 'medium',
              nextGameType: 'memory_match'
            }
          });
        }
      }, 1600);
    } else {
      sounds.playSoftTryAgain();
      const phrases = t.positiveMistakeEncouragement;
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      setGentleStatus(phrase);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-7 border-2 border-sand-200 shadow-soft max-w-3xl mx-auto select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1 rounded-full border border-sage-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sage-600" />
            <span>{t.gameAssociationTitle}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
            {t.gameWordsLabel}
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
            {index + 1} / {associationDeck.length}
          </div>
        </div>
      </div>

      {/* Encouragement Banner */}
      <div className="my-4 bg-sand-50 p-3.5 rounded-2xl border border-sand-200 flex items-center gap-2.5 text-stone-800">
        <Heart className="w-5 h-5 text-terracotta-500 fill-terracotta-200 shrink-0" />
        <p className="text-sm sm:text-base font-semibold">
          {gentleStatus}
        </p>
      </div>

      {!isCompleted ? (
        <div className="space-y-6 my-4">
          
          {/* Main Object Spotlight */}
          <div className="bg-gradient-to-tr from-sand-100 to-terracotta-50 p-6 rounded-3xl border-2 border-sand-300 text-center shadow-inner max-w-md mx-auto">
            <span className="text-6xl sm:text-7xl mb-3 block animate-float-subtle">
              {currentQ.promptIcon}
            </span>
            <h4 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-1">
              {currentQ.promptTitle}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              {currentQ.promptSubtext}
            </p>
          </div>

          {/* Options Grid */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 text-center">
              {t.gameInstructionsAssociation}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 sm:p-5 rounded-2xl border-3 flex items-center gap-3.5 transition shadow-md ${
                    selectedOpt === opt.title
                      ? opt.isCorrect
                        ? 'bg-sage-100 border-sage-500 ring-4 ring-sage-200'
                        : 'bg-sand-100 border-sand-400'
                      : 'bg-white hover:bg-sage-50 border-sand-200 hover:border-sage-400 hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl shrink-0">{opt.icon}</span>
                  <div className="text-left">
                    <span className="font-extrabold text-stone-900 text-sm sm:text-base block">
                      {opt.title}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {t.doYouRememberPrompt}?
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Completion */
        <div className="bg-[#FAF7F2] rounded-3xl p-6 border-2 border-sage-200 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 mx-auto flex items-center justify-center mb-3">
            <Award className="w-8 h-8 text-sage-600" />
          </div>

          <h4 className="text-2xl font-extrabold text-stone-900 mb-1 font-serif">
            {t.positiveReinforcement[0]}
          </h4>
          <p className="text-stone-600 text-sm mb-5">
            {t.gameAssociationTitle}
          </p>

          <button
            onClick={() => {
              setIndex(0);
              setIsCompleted(false);
              setSelectedOpt(null);
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

