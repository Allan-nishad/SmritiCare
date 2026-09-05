import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import { translations } from '../../../utils/translations';
import { sounds, speakText } from '../../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  Brain, 
  Clock, 
  HelpCircle, 
  TrendingUp, 
  Volume2, 
  Award,
  ChevronRight
} from 'lucide-react';

interface CardItem {
  id: string;
  uniqueId: string;
  name: string;
  relationship: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryMatchGame: React.FC = () => {
  const { 
    familyMemories, 
    recordCognitiveSession, 
    language, 
    isOffline 
  } = useApp();

  const t = translations[language] || translations.en;

  // Level System: Level 1 (4 cards), Level 2 (6 cards), Level 3 (8 cards), Level 4 (12 cards), Level 5 (16 cards)
  const [currentLevel, setCurrentLevel] = useState<number>(2); // Default to Level 2 (6 cards)
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isPreviewing, setIsPreviewing] = useState<boolean>(true);
  const [previewCountdown, setPreviewCountdown] = useState<number>(3);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Look closely at the cards!');
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [adaptiveSummary, setAdaptiveSummary] = useState<string | null>(null);

  // Diverse Cultural + Caregiver personalized items
  const allCardPool = [
    ...familyMemories.map(m => ({
      id: m.id,
      name: m.name,
      relationship: m.relationship,
      imageUrl: m.photoUrl
    })),
    {
      id: 'ner-obj-1',
      name: 'Assam Tea Kettle',
      relationship: 'Morning Veranda Tea',
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'ner-obj-2',
      name: 'Eri Silk Gamosa',
      relationship: 'Traditional Warmth',
      imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'ner-obj-3',
      name: 'Marigold Flowers',
      relationship: 'Courtyard Garden',
      imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'ner-obj-4',
      name: 'Brass Kahi Bati',
      relationship: 'Ancestral Utensil',
      imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400'
    }
  ];

  // Number of pairs per level
  const getPairCountForLevel = (lvl: number) => {
    switch (lvl) {
      case 1: return 2; // 4 cards
      case 2: return 3; // 6 cards
      case 3: return 4; // 8 cards
      case 4: return 6; // 12 cards
      case 5: return 8; // 16 cards
      default: return 3;
    }
  };

  const setupLevel = (lvl: number) => {
    setCurrentLevel(lvl);
    const pairCount = getPairCountForLevel(lvl);
    const selectedPool = allCardPool.slice(0, pairCount);

    const deck: CardItem[] = [];
    selectedPool.forEach((item) => {
      // First card
      deck.push({
        ...item,
        uniqueId: `${item.id}-a`,
        isFlipped: true, // Face up for 3.5s preview
        isMatched: false
      });
      // Second card
      deck.push({
        ...item,
        uniqueId: `${item.id}-b`,
        isFlipped: true, // Face up for 3.5s preview
        isMatched: false
      });
    });

    // Shuffle deck
    const shuffled = [...deck].sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairsCount(0);
    setAttempts(0);
    setGameCompleted(false);
    setIsPreviewing(true);
    setPreviewCountdown(3);
    setFeedbackMessage('Take a peaceful look! Cards will flip in 3 seconds...');
    setAdaptiveSummary(null);

    // 3-second face-up preview countdown
    let countdown = 3;
    const interval = setInterval(() => {
      countdown--;
      setPreviewCountdown(countdown);
      if (countdown <= 0) {
        clearInterval(interval);
        setIsPreviewing(false);
        setCards(prev => prev.map(c => ({ ...c, isFlipped: false })));
        setFeedbackMessage('Tap any card to find its match.');
        setStartTime(Date.now());
      }
    }, 1000);
  };

  useEffect(() => {
    setupLevel(currentLevel);
  }, []);

  const handleCardClick = (index: number) => {
    if (isPreviewing || flippedCards.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    sounds.playCardFlip();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const nextFlipped = [...flippedCards, index];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setAttempts(prev => prev + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.id === secondCard.id) {
        // MATCH FOUND
        sounds.playSuccess();
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === firstIdx || i === secondIdx) ? { ...c, isMatched: true } : c));
          setFlippedCards([]);
          const nextMatched = matchedPairsCount + 1;
          setMatchedPairsCount(nextMatched);

          // Pick encouraging phrase
          const phrases = t.positiveReinforcement;
          const chosenPhrase = phrases[Math.floor(Math.random() * phrases.length)];
          setFeedbackMessage(chosenPhrase);
          speakText(chosenPhrase, language);

          // Check if game complete
          const totalPairs = getPairCountForLevel(currentLevel);
          if (nextMatched >= totalPairs) {
            handleGameWin();
          }
        }, 600);

      } else {
        // MISTAKE / MISMATCH -> Always Positive Varied Encouragement (Never "Wrong!")
        sounds.playGentleTryAgain();
        const mistakePhrases = t.positiveMistakeEncouragement;
        const gentlePhrase = mistakePhrases[Math.floor(Math.random() * mistakePhrases.length)];
        setFeedbackMessage(gentlePhrase);

        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === firstIdx || i === secondIdx) ? { ...c, isFlipped: false } : c));
          setFlippedCards([]);
        }, 1200);
      }
    }
  };

  const handleGameWin = () => {
    setGameCompleted(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

    const duration = Math.max(8, Math.round((Date.now() - startTime) / 1000));
    const totalPairs = getPairCountForLevel(currentLevel);
    const accuracy = Math.min(100, Math.round((totalPairs / Math.max(totalPairs, attempts + 1)) * 100));
    const avgResponseTime = Math.round((duration / Math.max(1, attempts + 1)) * 10) / 10;

    // Explainable Rule-based Adaptive Difficulty Engine
    let nextLevel = currentLevel;
    let ruleExplanation = '';

    if (accuracy >= 80 && avgResponseTime <= 10 && currentLevel < 5) {
      nextLevel = currentLevel + 1;
      ruleExplanation = `High accuracy (${accuracy}%) and confident pace (${avgResponseTime}s). System smoothly elevated difficulty to Level ${nextLevel}.`;
    } else if (accuracy < 60 && currentLevel > 1) {
      nextLevel = currentLevel - 1;
      ruleExplanation = `Gentle pacing adaptation. Reduced to Level ${nextLevel} to maintain comfort and zero fatigue.`;
    } else {
      ruleExplanation = `Asha's recall is within her optimal stable zone (${accuracy}%). Maintained at Level ${currentLevel}.`;
    }

    setAdaptiveSummary(ruleExplanation);

    // Record session into AppContext & Baseline
    recordCognitiveSession({
      gameType: 'memory_match',
      gameTitle: 'Familiar Memory Match',
      durationSeconds: duration,
      totalAttempts: attempts + 1,
      accuracyPercentage: accuracy,
      difficulty: `level_${currentLevel}` as any,
      responseAverageSeconds: avgResponseTime,
      hintsUsed,
      adaptiveDecision: {
        ruleApplied: 'Personal Baseline Adaptive Calibration',
        explanation: ruleExplanation,
        nextRecommendedDifficulty: `level_${nextLevel}` as any,
        nextGameType: 'memory_match'
      }
    });

    const victoryVoice = language === 'as'
      ? "বৰ সুন্দৰ আশা দেৱী! আপুনি সকলো ফটো মিলি পেলালে।"
      : language === 'hi'
      ? "बहुत खूब आशा जी! आपने सभी तस्वीरें सही मिला लीं।"
      : "Wonderful job Asha! You matched all the memories.";
    speakText(victoryVoice, language);
  };

  const handleGiveHint = () => {
    if (isPreviewing || gameCompleted) return;
    setHintsUsed(prev => prev + 1);
    
    // Briefly peek unmatched cards
    setCards(prev => prev.map(c => !c.isMatched ? { ...c, isFlipped: true } : c));
    setFeedbackMessage('Here is a gentle 2-second peek to help you!');
    setTimeout(() => {
      setCards(prev => prev.map(c => !c.isMatched && !flippedCards.includes(cards.indexOf(c)) ? { ...c, isFlipped: false } : c));
    }, 2000);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      
      {/* Top Level Bar & Level Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-sand-50 p-3 rounded-2xl border border-sand-200">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold text-sm">
            L{currentLevel}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-stone-900">
                Memory Match Level {currentLevel}
              </span>
              <span className="text-[10px] bg-terracotta-100 text-terracotta-800 font-bold px-2 py-0.5 rounded-full">
                {getPairCountForLevel(currentLevel) * 2} Cards
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Caregiver personalized photos & NER cultural objects
            </p>
          </div>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-sand-200 text-xs">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setupLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                currentLevel === lvl
                  ? 'bg-terracotta-500 text-white shadow'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Encouragement & Status Banner */}
      <div className="bg-white p-4 rounded-2xl border-2 border-sand-200 shadow-soft flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            {isPreviewing ? <Clock className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-amber-600" />}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {isPreviewing ? `Card Preview (${previewCountdown}s)` : 'Companion Guidance'}
            </span>
            <p className="text-base sm:text-lg font-black text-stone-900 leading-tight">
              {feedbackMessage}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isPreviewing && !gameCompleted && (
            <button
              onClick={handleGiveHint}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Gentle Peek</span>
            </button>
          )}

          <button
            onClick={() => setupLevel(currentLevel)}
            className="p-2 text-stone-500 hover:text-stone-900 bg-sand-100 rounded-xl transition"
            title="Restart round"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Grid (Dynamic layout based on level) */}
      <div className={`grid gap-3 sm:gap-4 ${
        cards.length <= 6 
          ? 'grid-cols-2 sm:grid-cols-3' 
          : cards.length <= 8 
          ? 'grid-cols-2 sm:grid-cols-4' 
          : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'
      }`}>
        {cards.map((card, idx) => {
          const isShow = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-3xl cursor-pointer transition-all duration-300 transform perspective-1000 ${
                card.isMatched
                  ? 'opacity-80 scale-95 ring-4 ring-emerald-400/80 bg-emerald-50'
                  : isShow
                  ? 'scale-100 ring-4 ring-terracotta-400 bg-white shadow-lg'
                  : 'bg-gradient-to-br from-terracotta-500 to-[#b84a22] hover:scale-102 shadow-md active:scale-95'
              }`}
            >
              {isShow ? (
                <div className="w-full h-full p-2.5 flex flex-col items-center justify-between rounded-3xl overflow-hidden bg-white">
                  <div className="w-full flex-1 rounded-2xl overflow-hidden relative shadow-inner bg-sand-100">
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                    {card.isMatched && (
                      <div className="absolute inset-0 bg-emerald-600/30 backdrop-blur-2xs flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-white drop-shadow-md stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div className="text-center pt-1 w-full">
                    <h5 className="font-black text-xs sm:text-sm text-stone-900 truncate">
                      {card.name}
                    </h5>
                    <p className="text-[10px] text-stone-500 truncate font-medium">
                      {card.relationship}
                    </p>
                  </div>
                </div>
              ) : (
                /* Card Back */
                <div className="w-full h-full rounded-3xl flex flex-col items-center justify-center p-4 text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <Heart className="w-6 h-6 text-amber-300 fill-amber-300/30" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-200 mt-2 tracking-wider uppercase">
                    Smriti
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Game Win / Adaptive AI Progress Modal */}
      {gameCompleted && (
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shadow-lg shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
                Memory Activity Complete
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif">
                Wonderful Recall, Asha!
              </h3>
            </div>
          </div>

          <p className="text-base text-emerald-100 font-medium">
            You completed Level {currentLevel} in {attempts} attempts. Your memory connection with family and familiar items is shining bright!
          </p>

          {/* Explainable Adaptive AI Decision Box */}
          {adaptiveSummary && (
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>SmritiCare Adaptive Intelligence</span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-mono">
                {adaptiveSummary}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setupLevel(Math.min(5, currentLevel + 1))}
              className="flex-1 py-4 px-6 bg-white text-emerald-950 font-black rounded-2xl text-base sm:text-lg shadow-xl hover:bg-sand-50 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Play Next Level (Lvl {Math.min(5, currentLevel + 1)})</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setupLevel(currentLevel)}
              className="py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-base transition active:scale-95"
            >
              Play Level {currentLevel} Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
