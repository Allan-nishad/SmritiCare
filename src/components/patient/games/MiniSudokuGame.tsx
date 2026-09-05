import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { translations } from '../../../utils/translations';
import { sounds, speakText } from '../../../utils/audio';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Sparkles, Check, HelpCircle } from 'lucide-react';

export const MiniSudokuGame: React.FC = () => {
  const { language, recordCognitiveSession } = useApp();
  const t = translations[language] || translations.en;

  // 4x4 Simple Mini Grid (Fixed numbers + 4 easy slots to fill)
  // [1, 2, 3, 4]
  // [3, 4, 1, 2]
  // [2, 1, 4, 3]
  // [4, 3, 2, 1]
  const initialGrid = [
    [1, 2, 0, 4],
    [3, 0, 1, 2],
    [2, 1, 4, 0],
    [0, 3, 2, 1]
  ];

  const solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1]
  ];

  const [grid, setGrid] = useState<number[][]>(initialGrid);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>([0, 2]);
  const [isWon, setIsWon] = useState(false);
  const [feedback, setFeedback] = useState('Fill in the missing numbers (1 to 4) so each row has unique numbers.');
  const [startTime] = useState<number>(Date.now());

  const handleCellClick = (r: number, c: number) => {
    if (initialGrid[r][c] !== 0) return; // Locked initial clue
    setSelectedCell([r, c]);
    sounds.playCardFlip();
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    const newGrid = grid.map((row, ri) => row.map((val, ci) => (ri === r && ci === c) ? num : val));
    setGrid(newGrid);

    // Check if entered number is correct
    if (solution[r][c] === num) {
      sounds.playSuccess();
      const phrases = t.positiveReinforcement;
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      setFeedback(phrase);
    } else {
      sounds.playGentleTryAgain();
      setFeedback("That's okay! Try another number from 1 to 4.");
    }

    // Check complete grid
    let allCorrect = true;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (newGrid[i][j] !== solution[i][j]) {
          allCorrect = false;
        }
      }
    }

    if (allCorrect) {
      setIsWon(true);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      const victoryText = language === 'as'
        ? "অসাধাৰণ আশা দেৱী! সংখ্যাৰ গ্ৰিড সম্পূৰ্ণ হ'ল।"
        : "Wonderful Asha! You solved the number memory grid.";
      speakText(victoryText, language);

      const duration = Math.max(12, Math.round((Date.now() - startTime) / 1000));
      recordCognitiveSession({
        gameType: 'mini_sudoku',
        gameTitle: 'Mini Number Memory Grid',
        durationSeconds: duration,
        totalAttempts: 5,
        accuracyPercentage: 88,
        difficulty: 'level_3',
        responseAverageSeconds: Math.round((duration / 4) * 10) / 10,
        hintsUsed: 0,
        adaptiveDecision: {
          ruleApplied: 'Logical Working Memory Calibration',
          explanation: 'Working memory intact across numeric arrays. Asha solved 4x4 matrix without frustration.',
          nextRecommendedDifficulty: 'level_3',
          nextGameType: 'memory_match'
        }
      });
    }
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-sand-50 p-3 rounded-2xl border border-sand-200">
        <div>
          <span className="text-xs font-black uppercase text-terracotta-700 tracking-wider">
            Calm Number Puzzle
          </span>
          <h4 className="text-lg font-black text-stone-900">
            {t.gameSudokuTitle}
          </h4>
        </div>
        <button
          onClick={() => {
            setGrid(initialGrid);
            setIsWon(false);
            setSelectedCell([0, 2]);
          }}
          className="p-2 text-stone-600 bg-white hover:bg-sand-100 rounded-xl border border-sand-200"
          title="Reset puzzle"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-stone-600 font-medium bg-amber-50 p-3 rounded-2xl border border-amber-200 text-center">
        {feedback}
      </p>

      {/* 4x4 Mini Sudoku Grid */}
      <div className="max-w-xs mx-auto bg-white p-4 rounded-3xl border-3 border-stone-800 shadow-lg">
        <div className="grid grid-cols-4 gap-2">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isInitial = initialGrid[r][c] !== 0;
              const isSelected = selectedCell && selectedCell[0] === r && selectedCell[1] === c;

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                    isInitial
                      ? 'bg-sand-200 text-stone-800 cursor-not-allowed font-serif'
                      : isSelected
                      ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-300 scale-105 shadow-md'
                      : val !== 0
                      ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300 font-bold'
                      : 'bg-sand-50 border-2 border-dashed border-sand-300 text-stone-400 hover:border-terracotta-400'
                  }`}
                >
                  {val !== 0 ? val : ''}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Number Input Pad (1, 2, 3, 4) */}
      {!isWon && (
        <div className="max-w-xs mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase text-stone-500 tracking-wider block text-center">
            Tap a number to place in selected cell:
          </span>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                className="py-4 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-black text-2xl shadow-md transition active:scale-95 border-2 border-white"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Win Banner */}
      {isWon && (
        <div className="bg-emerald-600 text-white rounded-3xl p-6 text-center space-y-3 shadow-xl animate-in zoom-in-95">
          <Award className="w-14 h-14 mx-auto text-amber-300" />
          <h4 className="text-2xl font-black">Puzzle Solved Peacefully!</h4>
          <p className="text-sm text-emerald-100">
            Great logic and recall. You kept all 4 numbers balanced in harmony.
          </p>
        </div>
      )}

    </div>
  );
};
