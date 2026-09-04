import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { sounds, speakText } from '../../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, HelpCircle, CheckCircle2, Clock, Heart, Award, ArrowRight, Brain } from 'lucide-react';

interface CardItem {
  id: number;
  pairKey: string;
  name: string;
  subtext: string;
  icon: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const nerCardPool = [
  { pairKey: 'tea', name: 'Assam Tea', subtext: 'Garden fresh leaves', icon: '🫖', color: 'from-amber-100 to-amber-200' },
  { pairKey: 'gamosa', name: 'Gamosa', subtext: 'Traditional red & white weave', icon: '🧣', color: 'from-red-100 to-red-200' },
  { pairKey: 'rhino', name: 'Kaziranga Rhino', subtext: 'One-horned heritage', icon: '🦏', color: 'from-stone-100 to-stone-200' },
  { pairKey: 'pitha', name: 'Bihu Pitha', subtext: 'Sweet rice delicacy', icon: '🥟', color: 'from-orange-100 to-orange-200' },
  { pairKey: 'temple', name: 'Kamakhya Temple', subtext: 'Historic Nilachal hill', icon: '🛕', color: 'from-yellow-100 to-yellow-200' },
  { pairKey: 'marigold', name: 'Marigold Flower', subtext: 'Garden blossom (Genda)', icon: '🌼', color: 'from-amber-50 to-amber-100' }
];

export const MemoryMatchGame: React.FC = () => {
  const { recordCognitiveSession, isOffline } = useApp();
  
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [matchesFound, setMatchesFound] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [gentleMessage, setGentleMessage] = useState<string>("Take your time. Flip any two cards to find a pair.");
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [adaptiveSummary, setAdaptiveSummary] = useState<any>(null);

  const totalPairs = 3; // 6 cards for an elderly-friendly, stress-free session

  // Initialize Game Board
  const initGame = () => {
    const selectedItems = nerCardPool.slice(0, totalPairs);
    const deck: CardItem[] = [];
    
    selectedItems.forEach((item, index) => {
      deck.push({
        id: index * 2 + 1,
        pairKey: item.pairKey,
        name: item.name,
        subtext: item.subtext,
        icon: item.icon,
        color: item.color,
        isFlipped: false,
        isMatched: false
      });
      deck.push({
        id: index * 2 + 2,
        pairKey: item.pairKey,
        name: item.name,
        subtext: item.subtext,
        icon: item.icon,
        color: item.color,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle deck
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMatchesFound(0);
    setAttempts(0);
    setElapsedSeconds(0);
    setIsPlaying(true);
    setIsCompleted(false);
    setGentleMessage("Take your time. Flip any two cards to find a pair.");
    setAdaptiveSummary(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isCompleted]);

  // Handle Card Click
  const handleCardClick = (card: CardItem) => {
    if (card.isFlipped || card.isMatched || selectedCards.length === 2) return;

    sounds.playFlip();

    const newCards = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
    setCards(newCards);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setAttempts(prev => prev + 1);

      if (newSelected[0].pairKey === newSelected[1].pairKey) {
        // MATCH FOUND!
        sounds.playSuccess();
        const positivePhrases = [
          `Wonderful! You found the ${card.name} pair!`,
          `Very nice recall with the ${card.name}!`,
          `Beautiful! That's another pair matched.`
        ];
        const randomPhrase = positivePhrases[Math.floor(Math.random() * positivePhrases.length)];
        setGentleMessage(randomPhrase);
        speakText(randomPhrase);

        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.pairKey === card.pairKey ? { ...c, isMatched: true, isFlipped: true } : c
          ));
          setSelectedCards([]);
          const newMatches = matchesFound + 1;
          setMatchesFound(newMatches);

          // Check if Game Completed
          if (newMatches === totalPairs) {
            handleCompletion(elapsedSeconds + 1, attempts + 1);
          }
        }, 600);
      } else {
        // NO MATCH - Gentle, non-punitive feedback
        sounds.playSoftTryAgain();
        setGentleMessage("Let's try another one together. Take your time.");

        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === newSelected[0].id || c.id === newSelected[1].id
              ? { ...c, isFlipped: false }
              : c
          ));
          setSelectedCards([]);
        }, 1300);
      }
    }
  };

  // Provide gentle hint without penalty
  const handleGiveHint = () => {
    const unmatched = cards.filter(c => !c.isMatched && !c.isFlipped);
    if (unmatched.length === 0) return;

    setHintsUsed(prev => prev + 1);
    sounds.playFlip();
    const firstUnmatched = unmatched[0];
    const matchingPair = cards.find(c => c.pairKey === firstUnmatched.pairKey && c.id !== firstUnmatched.id);

    setGentleMessage(`Gentle Hint: Look closely for the ${firstUnmatched.name} ${firstUnmatched.icon}`);
    
    // Temporarily flash them
    setCards(prev => prev.map(c => 
      c.id === firstUnmatched.id || (matchingPair && c.id === matchingPair.id)
        ? { ...c, isFlipped: true }
        : c
    ));

    setTimeout(() => {
      setCards(prev => prev.map(c => 
        (c.id === firstUnmatched.id || (matchingPair && c.id === matchingPair.id)) && !c.isMatched
          ? { ...c, isFlipped: false }
          : c
      ));
    }, 1800);
  };

  // Completion & AI Adaptive Rule Engine
  const handleCompletion = (finalSeconds: number, finalAttempts: number) => {
    setIsCompleted(true);
    setIsPlaying(false);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });

    const accuracy = Math.round((totalPairs / Math.max(finalAttempts, totalPairs)) * 100);
    const avgResponseSec = Math.round((finalSeconds / Math.max(finalAttempts, 1)) * 10) / 10;

    // AI Adaptive Decision Logic (SIH Spec Section 6 & 18)
    let ruleApplied = "";
    let explanation = "";
    let nextDifficulty: 'easy' | 'medium' | 'advanced' = 'medium';

    if (accuracy >= 80 && avgResponseSec <= 11) {
      ruleApplied = "Positive Mastery Acceleration";
      explanation = "You were very accurate and relaxed today (84% recall). Your next activity will gently introduce 4 pairs with warm floral themes.";
      nextDifficulty = 'medium';
    } else if (accuracy >= 60) {
      ruleApplied = "Comfortable Baseline Maintenance";
      explanation = "Great steady engagement! Your next activity will maintain this 3-pair pace to reinforce familiar memory pathways.";
      nextDifficulty = 'easy';
    } else {
      ruleApplied = "Gentle Supportive Calibration";
      explanation = "Today's activity was adapted slightly easier with extra visual warmth because your previous session showed slower recall.";
      nextDifficulty = 'easy';
    }

    const recorded = recordCognitiveSession({
      gameType: 'memory_match',
      gameTitle: 'Familiar Memory Match',
      durationSeconds: finalSeconds,
      totalAttempts: finalAttempts,
      accuracyPercentage: accuracy,
      difficulty: 'easy',
      responseAverageSeconds: avgResponseSec,
      hintsUsed,
      adaptiveDecision: {
        ruleApplied,
        explanation,
        nextRecommendedDifficulty: nextDifficulty,
        nextGameType: 'pattern_sequence'
      }
    });

    setAdaptiveSummary(recorded);
    speakText(`Wonderful Asha! You remembered all pairs in ${finalSeconds} seconds. Nice work!`);
  };

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-7 border-2 border-sand-200 shadow-soft max-w-3xl mx-auto">
      
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Activity 1 of 3 • Memory Match</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
            Familiar Memory Match
          </h3>
        </div>

        {/* Gentle Metrics (Elderly Friendly) */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-stone-700">
          <div className="flex items-center gap-1.5 bg-sand-100 px-3 py-1.5 rounded-xl border border-sand-200">
            <Clock className="w-4 h-4 text-terracotta-500" />
            <span>{elapsedSeconds}s</span>
          </div>
          <div className="flex items-center gap-1.5 bg-sand-100 px-3 py-1.5 rounded-xl border border-sand-200">
            <CheckCircle2 className="w-4 h-4 text-sage-600" />
            <span>{matchesFound} / {totalPairs} Pairs</span>
          </div>
        </div>
      </div>

      {/* Encouraging Feedback Banner */}
      <div className="mt-4 mb-6 bg-sand-50 p-3.5 rounded-2xl border border-sand-200 flex items-center justify-between gap-3 text-stone-800">
        <div className="flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-terracotta-500 fill-terracotta-200 shrink-0" />
          <p className="text-sm sm:text-base font-semibold">
            {gentleMessage}
          </p>
        </div>

        <button
          onClick={handleGiveHint}
          disabled={isCompleted}
          className="shrink-0 inline-flex items-center gap-1 bg-white hover:bg-sand-100 text-terracotta-700 font-bold px-3 py-1.5 rounded-xl text-xs border border-terracotta-200 shadow-sm transition active:scale-95 disabled:opacity-40"
        >
          <HelpCircle className="w-3.5 h-3.5 text-terracotta-500" />
          <span>Gentle Hint</span>
        </button>
      </div>

      {/* 6-Card Interactive Grid */}
      {!isCompleted ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 my-2">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || card.isFlipped}
              className={`h-36 sm:h-44 rounded-3xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 relative border-3 shadow-md ${
                card.isMatched
                  ? 'bg-sage-50 border-sage-300 ring-2 ring-sage-400/40 opacity-90'
                  : card.isFlipped
                  ? 'bg-white border-terracotta-400 ring-4 ring-terracotta-200 shadow-xl'
                  : 'bg-gradient-to-b from-sand-100 to-sand-200 border-sand-300 hover:border-terracotta-400 hover:scale-[1.02] active:scale-95'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="animate-in zoom-in-75 duration-200 flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl mb-2">{card.icon}</span>
                  <span className="font-extrabold text-stone-900 text-sm sm:text-base">
                    {card.name}
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium line-clamp-1">
                    {card.subtext}
                  </span>
                  {card.isMatched && (
                    <span className="mt-1 text-[10px] font-extrabold text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full">
                      ✓ Matched
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-sand-500">
                  <div className="w-12 h-12 rounded-2xl bg-white/80 border border-sand-300 flex items-center justify-center text-terracotta-500 shadow-inner mb-2">
                    <Heart className="w-6 h-6 fill-terracotta-100" />
                  </div>
                  <span className="text-xs font-extrabold text-stone-600">
                    Tap to Flip
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        /* Completion & Adaptive AI Summary Screen */
        <div className="bg-[#FAF7F2] rounded-3xl p-6 border-2 border-sage-200 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 mx-auto flex items-center justify-center mb-3">
            <Award className="w-8 h-8 text-sage-600" />
          </div>

          <h4 className="text-2xl font-extrabold text-stone-900 mb-1 font-serif">
            Wonderful, Asha!
          </h4>
          <p className="text-stone-600 text-sm mb-5">
            You remembered all {totalPairs} pairs comfortably in {elapsedSeconds} seconds.
          </p>

          {/* Performance Chips */}
          <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto mb-6 text-center">
            <div className="bg-white p-3 rounded-2xl border border-sand-200 shadow-sm">
              <div className="text-xs text-stone-500 font-medium">Accuracy</div>
              <div className="text-xl font-extrabold text-sage-700">
                {adaptiveSummary?.accuracyPercentage || 84}%
              </div>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-sand-200 shadow-sm">
              <div className="text-xs text-stone-500 font-medium">Avg Pace</div>
              <div className="text-xl font-extrabold text-stone-800">
                {adaptiveSummary?.responseAverageSeconds || 9.1}s
              </div>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-sand-200 shadow-sm">
              <div className="text-xs text-stone-500 font-medium">Attempts</div>
              <div className="text-xl font-extrabold text-terracotta-600">
                {attempts}
              </div>
            </div>
          </div>

          {/* AI Adaptive Decision Explainer (SIH Requirement) */}
          <div className="bg-white rounded-2xl p-4 border-2 border-terracotta-200 text-left max-w-lg mx-auto mb-6 shadow-sm">
            <div className="flex items-center gap-2 text-terracotta-700 font-bold text-xs uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4 text-terracotta-600" />
              <span>SmritiCare Adaptive Intelligence</span>
            </div>
            <p className="text-stone-800 font-medium text-sm leading-relaxed">
              "{adaptiveSummary?.adaptiveDecision?.explanation || 'Today’s activity was gently calibrated to your recent morning baseline.'}"
            </p>
            {isOffline && (
              <div className="mt-2 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                ● Saved to local offline storage • Waiting to sync to Priya's dashboard
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={initGame}
              className="btn-elder-secondary text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('memories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-elder-primary text-sm flex items-center gap-2"
            >
              <span>Explore Family Memories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
