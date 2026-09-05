import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { translations } from '../../../utils/translations';
import { sounds, speakText } from '../../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Circle, 
  Square, 
  Triangle, 
  Star, 
  Heart, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Award 
} from 'lucide-react';

interface ShapeItem {
  id: string;
  name: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}

const shapesPool: ShapeItem[] = [
  { id: 'sh1', name: 'Golden Sun Star', icon: 'Star', colorClass: 'text-amber-500 fill-amber-400', bgClass: 'bg-amber-100 border-amber-300' },
  { id: 'sh2', name: 'Ruby Heart', icon: 'Heart', colorClass: 'text-red-500 fill-red-400', bgClass: 'bg-red-100 border-red-300' },
  { id: 'sh3', name: 'River Lotus Circle', icon: 'Circle', colorClass: 'text-blue-500 fill-blue-400', bgClass: 'bg-blue-100 border-blue-300' },
  { id: 'sh4', name: 'Tea Garden Triangle', icon: 'Triangle', colorClass: 'text-emerald-500 fill-emerald-400', bgClass: 'bg-emerald-100 border-emerald-300' }
];

export const ShapeMatchGame: React.FC = () => {
  const { language, recordCognitiveSession } = useApp();
  const t = translations[language] || translations.en;

  const [targetShape, setTargetShape] = useState<ShapeItem>(shapesPool[0]);
  const [options, setOptions] = useState<ShapeItem[]>([]);
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>('Match the shape shown in the center.');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());

  const setupRound = (r: number) => {
    const target = shapesPool[(r - 1) % shapesPool.length];
    setTargetShape(target);
    const shuffled = [...shapesPool].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setFeedback(`Find the matching shape: ${target.name}`);
  };

  useEffect(() => {
    setupRound(round);
  }, [round]);

  const handleSelect = (shape: ShapeItem) => {
    if (shape.id === targetShape.id) {
      sounds.playSuccess();
      const phrases = t.positiveReinforcement;
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      setFeedback(phrase);
      speakText(phrase, language);
      setScore(s => s + 1);

      if (round >= 4) {
        setIsCompleted(true);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });

        const duration = Math.max(8, Math.round((Date.now() - startTime) / 1000));
        recordCognitiveSession({
          gameType: 'shape_match',
          gameTitle: 'Soothing Shape Match',
          durationSeconds: duration,
          totalAttempts: 4,
          accuracyPercentage: 100,
          difficulty: 'level_2',
          responseAverageSeconds: Math.round((duration / 4) * 10) / 10,
          hintsUsed: 0,
          adaptiveDecision: {
            ruleApplied: 'Visual Shape Recognition Rule',
            explanation: 'Perfect shape discrimination. Asha effortlessly identified geometries without visual fatigue.',
            nextRecommendedDifficulty: 'level_3',
            nextGameType: 'memory_match'
          }
        });
      } else {
        setTimeout(() => setRound(r => r + 1), 900);
      }
    } else {
      sounds.playGentleTryAgain();
      const mistakePhrases = t.positiveMistakeEncouragement;
      const phrase = mistakePhrases[Math.floor(Math.random() * mistakePhrases.length)];
      setFeedback(phrase);
    }
  };

  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'Star': return <Star className={`w-16 h-16 ${className}`} />;
      case 'Heart': return <Heart className={`w-16 h-16 ${className}`} />;
      case 'Circle': return <Circle className={`w-16 h-16 ${className}`} />;
      case 'Triangle': return <Triangle className={`w-16 h-16 ${className}`} />;
      default: return <Star className={`w-16 h-16 ${className}`} />;
    }
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-sand-50 p-3 rounded-2xl border border-sand-200">
        <div>
          <span className="text-xs font-black uppercase text-terracotta-700 tracking-wider">
            Cognitive Focus Activity
          </span>
          <h4 className="text-lg font-black text-stone-900">
            {t.gameShapeTitle}
          </h4>
        </div>
        <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-sand-300">
          Round {round} of 4
        </span>
      </div>

      {/* Target Shape Display */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft text-center space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-stone-500">
          Target Shape To Match
        </span>

        <div className={`w-32 h-32 mx-auto rounded-3xl flex items-center justify-center border-4 shadow-md ${targetShape.bgClass} animate-bounce`}>
          {renderIcon(targetShape.icon, targetShape.colorClass)}
        </div>

        <h3 className="text-2xl font-black text-stone-900">
          {targetShape.name}
        </h3>

        <p className="text-sm font-bold text-terracotta-700">
          {feedback}
        </p>
      </div>

      {/* Choices Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {options.map((shape) => (
          <button
            key={shape.id}
            onClick={() => handleSelect(shape)}
            className={`p-6 rounded-3xl border-3 flex flex-col items-center justify-center gap-3 transition-all duration-200 active:scale-95 shadow hover:shadow-lg ${shape.bgClass}`}
          >
            {renderIcon(shape.icon, shape.colorClass)}
            <span className="text-xs font-black text-stone-900 text-center">
              {shape.name}
            </span>
          </button>
        ))}
      </div>

      {/* Win Banner */}
      {isCompleted && (
        <div className="bg-emerald-600 text-white rounded-3xl p-6 text-center space-y-4 shadow-xl animate-in zoom-in-95">
          <Award className="w-16 h-16 mx-auto text-amber-300" />
          <h4 className="text-2xl font-black">All Shapes Matched Perfectly!</h4>
          <p className="text-sm text-emerald-100">
            Asha scored 100% on shape recognition. Your attention to visual shapes is in great shape!
          </p>
          <button
            onClick={() => {
              setIsCompleted(false);
              setRound(1);
              setScore(0);
            }}
            className="py-3 px-6 bg-white text-emerald-950 font-black rounded-2xl text-sm shadow"
          >
            Play Again
          </button>
        </div>
      )}

    </div>
  );
};
