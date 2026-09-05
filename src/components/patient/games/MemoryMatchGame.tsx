import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import { translations, getLocalizedMemory } from '../../../utils/translations';
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

const culturalItemsByLang: Record<string, Array<{ id: string; name: string; relationship: string; imageUrl: string }>> = {
  as: [
    { id: 'ner-obj-1', name: 'অসম চাহৰ কেটলী', relationship: 'পুৱাৰ বাৰাণ্ডাৰ চাহ', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-2', name: 'এৰি গামোচা', relationship: 'মৰম আৰু সন্মানৰ প্ৰতীক', imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-3', name: 'নৰসিংহ আৰু শেৱালি ফুল', relationship: 'চোতালৰ ফুলনি', imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-4', name: 'কাঁহৰ কাঁহী বাটি', relationship: 'পুৰণি পৰম্পৰাগত বাচন', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400' }
  ],
  bn: [
    { id: 'ner-obj-1', name: 'চায়ের কেটলি', relationship: 'সকালের বারান্দার চা', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-2', name: 'লাল পাড় শাড়ি ও উত্তরীয়', relationship: 'স্নেহ ও ঐতিহ্যের প্রতীক', imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-3', name: 'গাঁদা ফুল ও শিউলি', relationship: 'উঠোনের ফুলের বাগান', imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-4', name: 'কাঁসার বাসন', relationship: 'ঐতিহ্যবাহী প্রাচীন বাসন', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400' }
  ],
  mni: [
    { id: 'ner-obj-1', name: 'চা কেটলী', relationship: 'য়ুমথোংগী নুমিদাং চা', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-2', name: 'ফী খূদেই ফীজেৎ', relationship: 'মৈতৈ লৈবাক্কী ফী রোল', imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-3', name: 'লৈরাং লৈ', relationship: 'শুমং লৈ কোল', imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-4', name: 'পীৎরাই থাবা পুখম', relationship: 'অরিবা ঈমুংগী খুদোল', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400' }
  ],
  hi: [
    { id: 'ner-obj-1', name: 'चाय की केतली', relationship: 'सुबह बरामदे की गरम चाय', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-2', name: 'पारंपरिक रेशमी गमछा', relationship: 'आदर और सम्मान का प्रतीक', imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-3', name: 'गेंदे के ताजे फूल', relationship: 'आंगन की बगिया', imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-4', name: 'पीतल के पारंपरिक बर्तन', relationship: 'पारिवारिक धरोहर', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400' }
  ],
  en: [
    { id: 'ner-obj-1', name: 'Assam Tea Kettle', relationship: 'Morning Veranda Tea', imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-2', name: 'Eri Silk Gamosa', relationship: 'Traditional Warmth & Respect', imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-3', name: 'Marigold Flowers', relationship: 'Courtyard Garden', imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400' },
    { id: 'ner-obj-4', name: 'Brass Kahi Bati', relationship: 'Ancestral Utensil', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400' }
  ]
};

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
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    language === 'as' ? 'শান্তভাৱে চাওক! ৩ ছেকেণ্ডত কাৰ্ডসমূহ লুটিব...'
    : language === 'bn' ? 'মন দিয়ে দেখুন! ৩ সেকেন্ডে কার্ডগুলি ঢেকে যাবে...'
    : language === 'mni' ? 'শান্তিগা লোয়ননা য়েংবীয়ু...'
    : language === 'hi' ? 'ध्यान से देखें! ३ सेकंड में कार्ड पलट जाएंगे...'
    : 'Look closely at the cards!'
  );
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [adaptiveSummary, setAdaptiveSummary] = useState<string | null>(null);

  // Diverse Cultural + Caregiver personalized items
  const culturalItems = culturalItemsByLang[language] || culturalItemsByLang.en;
  const localizedFamilyMemories = familyMemories.map(m => {
    const loc = getLocalizedMemory(m, language);
    return {
      id: m.id,
      name: loc.name,
      relationship: loc.relationship,
      imageUrl: m.photoUrl
    };
  });

  const allCardPool = [...localizedFamilyMemories, ...culturalItems];

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
    const previewMsg = language === 'as' ? 'শান্তভাৱে চাওক! ৩ ছেকেণ্ডত কাৰ্ডসমূহ লুটিব...'
      : language === 'bn' ? 'মন দিয়ে দেখুন! ৩ সেকেন্ডে কার্ডগুলি ঢেকে যাবে...'
      : language === 'mni' ? 'শান্তিগা লোয়ননা য়েংবীয়ু! চেকেণ্ড ৩ গী মনুংদা হংদোক্কনি...'
      : language === 'hi' ? 'ध्यान से देखें! ३ सेकंड में कार्ड पलट जाएंगे...'
      : 'Take a peaceful look! Cards will flip in 3 seconds...';
    setFeedbackMessage(previewMsg);
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
        const startMsg = language === 'as' ? 'যিকোনো কাৰ্ডত চুই মিল পোৱাৰ চেষ্টা কৰক।'
          : language === 'bn' ? 'যেকোনো কার্ডে স্পর্শ করে মিল খুঁজুন।'
          : language === 'mni' ? 'কাৰ্ড অমদা থমদুনা চাফম থিবীয়ু।'
          : language === 'hi' ? 'किसी भी कार्ड को छूकर जोड़ी बनाएं।'
          : 'Tap any card to find its match.';
        setFeedbackMessage(startMsg);
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
      : language === 'bn'
      ? "অসাধারণ আশা দেবী! আপনি সব ছবি ঠিক মিলিয়েছেন।"
      : language === 'mni'
      ? "য়াম্না ফৈ আশা দেবী! নহাক্না ফটো খুদিংমক চানবা থিবা ঙমখ্রে।"
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
    const hintMsg = language === 'as' ? 'আপোনাৰ সহায়ৰ বাবে ২ ছেকেণ্ডৰ বাবে সকলো কাৰ্ড দেখুওৱা হ’ল!'
      : language === 'bn' ? 'আপনাকে সাহায্য করতে ২ সেকেন্ডের জন্য সব কার্ড দেখানো হলো!'
      : language === 'mni' ? 'নহাকপু মতেং পাংনবা চেকেণ্ড ২ গী ওইনা কাৰ্ড পুম্নমক উৎকৎলে!'
      : language === 'hi' ? 'आपकी मदद के लिए २ सेकंड के लिए सभी कार्ड दिखाए गए हैं!'
      : 'Here is a gentle 2-second peek to help you!';
    setFeedbackMessage(hintMsg);
    speakText(hintMsg, language);
    setTimeout(() => {
      setCards(prev => prev.map(c => !c.isMatched && !flippedCards.includes(cards.indexOf(c)) ? { ...c, isFlipped: false } : c));
    }, 2000);
  };

  const speakGuidance = () => {
    speakText(feedbackMessage, language);
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
                {t.gamePairsLabel || 'Memory Match'} (Lvl {currentLevel})
              </span>
              <span className="text-[10px] bg-terracotta-100 text-terracotta-800 font-bold px-2 py-0.5 rounded-full">
                {getPairCountForLevel(currentLevel) * 2} {language === 'as' ? 'খন কাৰ্ড' : language === 'bn' ? 'টি কার্ড' : language === 'mni' ? 'কাৰ্ড' : language === 'hi' ? 'कार्ड' : 'Cards'}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              {language === 'as' ? 'পৰিয়ালৰ ফটো আৰু উত্তৰ-পূবৰ পৰম্পৰাগত বস্তু' : language === 'bn' ? 'পারিবারিক ছবি ও পরিচিত ঐতিহ্যবাহী জিনিস' : language === 'mni' ? 'ঈমুংগী ফটো অমসুং কুহ্মৈগী পোৎলমশিং' : language === 'hi' ? 'पारिवारिक यादें और पारंपरिक वस्तुएं' : 'Caregiver personalized photos & NER cultural objects'}
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

      {/* Encouragement & Status Banner with Voice Read-out */}
      <div className="bg-white p-4 rounded-2xl border-2 border-sand-200 shadow-soft flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={speakGuidance}
            className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 transition active:scale-95"
            title={t.listenVoiceNote || "Listen to guidance"}
          >
            {isPreviewing ? <Clock className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5 text-amber-700" />}
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {isPreviewing 
                ? (language === 'as' ? `কাৰ্ড চাওক (${previewCountdown}ছে)` : language === 'bn' ? `কার্ড দেখুন (${previewCountdown}সে)` : language === 'mni' ? `কাৰ্ড য়েংবীয়ু (${previewCountdown}s)` : language === 'hi' ? `कार्ड देखें (${previewCountdown}से)` : `Card Preview (${previewCountdown}s)`)
                : (language === 'as' ? 'সহজ সহায়' : language === 'bn' ? 'সহজ নির্দেশ' : language === 'mni' ? 'লমজিং' : language === 'hi' ? 'सहज मार्गदर्शन' : 'Companion Guidance')}
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
              <span>{language === 'as' ? 'সহায় চাওক' : language === 'bn' ? 'সহায়তা' : language === 'mni' ? 'মতেং' : language === 'hi' ? 'मदद' : 'Gentle Peek'}</span>
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
                    {t.appName || 'Smriti'}
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
                {language === 'as' ? 'খেলা সম্পূৰ্ণ হ’ল' : language === 'bn' ? 'খেলা সম্পন্ন হয়েছে' : language === 'mni' ? 'শান্নবা লোইরে' : language === 'hi' ? 'खेल पूरा हुआ' : 'Memory Activity Complete'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif">
                {language === 'as' ? 'বৰ সুন্দৰ আশা দেৱী!' : language === 'bn' ? 'অসাধারণ আশা দেবী!' : language === 'mni' ? 'য়াম্না ফৈ আশা দেবী!' : language === 'hi' ? 'बहुत खूब आशा जी!' : 'Wonderful Recall, Asha!'}
              </h3>
            </div>
          </div>

          <p className="text-base text-emerald-100 font-medium">
            {language === 'as' 
              ? `আপুনি ${attempts} বাৰত লেভেল ${currentLevel} সম্পূৰ্ণ কৰিলে। আপোনাৰ স্মৃতিশক্তি উজ্জ্বল হৈ আছে!`
              : language === 'bn'
              ? `আপনি ${attempts} বারে লেভেল ${currentLevel} শেষ করেছেন। আপনার স্মরণশক্তি দারুণ!`
              : language === 'mni'
              ? `নহাক্না লেভেল ${currentLevel} লোইশিনখ্রে। নহাক্কী স্মৃতী শক্তি ফৈ!`
              : language === 'hi'
              ? `आपने ${attempts} प्रयासों में स्तर ${currentLevel} पूरा किया। आपकी याददाश्त बहुत अच्छी है!`
              : `You completed Level ${currentLevel} in ${attempts} attempts. Your memory connection with family and familiar items is shining bright!`}
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
              <span>{language === 'as' ? `পৰৱৰ্তী লেভেল খেলক (Lvl ${Math.min(5, currentLevel + 1)})` : language === 'bn' ? `পরবর্তী লেভেল খেলুন (Lvl ${Math.min(5, currentLevel + 1)})` : language === 'mni' ? `মথংগী লেভেল (Lvl ${Math.min(5, currentLevel + 1)})` : language === 'hi' ? `अगला स्तर खेलें (Lvl ${Math.min(5, currentLevel + 1)})` : `Play Next Level (Lvl ${Math.min(5, currentLevel + 1)})`}</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setupLevel(currentLevel)}
              className="py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-base transition active:scale-95"
            >
              {language === 'as' ? `পুনৰ খেলক (Lvl ${currentLevel})` : language === 'bn' ? `আবার খেলুন (Lvl ${currentLevel})` : language === 'mni' ? `অমুক্কা শান্নবীয়ু` : language === 'hi' ? `फिर से खेलें` : `Play Level ${currentLevel} Again`}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
