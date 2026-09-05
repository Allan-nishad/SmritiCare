import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Radio, 
  Sparkles,
  Play,
  RotateCcw,
  Volume2
} from 'lucide-react';

export const LiveSimulationBanner: React.FC = () => {
  const { 
    activeSimulation, 
    setActiveSimulation, 
    triggerSimulation,
    isOffline,
    role,
    setRole
  } = useApp();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (activeSimulation) {
      setVisible(true);
      setProgress(100);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1.25; // ~8 seconds total display
        });
      }, 100);

      const timeout = setTimeout(() => {
        setVisible(false);
        setActiveSimulation(null);
      }, 8000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [activeSimulation]);

  if (!activeSimulation || !visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl select-none animate-in slide-in-from-top-4 duration-300">
      <div className="bg-stone-950/95 backdrop-blur-xl text-white rounded-3xl p-4 sm:p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border-2 border-amber-400 space-y-3 relative overflow-hidden">
        
        {/* Animated Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-terracotta-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 26003 Live Simulation Executing</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {role !== 'dual' && (
              <button
                onClick={() => setRole('dual')}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-bold rounded-lg transition"
              >
                View Dual Mockups →
              </button>
            )}
            <button
              onClick={() => {
                setVisible(false);
                setActiveSimulation(null);
              }}
              className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Simulation Details */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-black text-amber-300 font-serif flex items-center gap-2">
            <span>{activeSimulation.title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed">
            {activeSimulation.subtitle}
          </p>
        </div>

        {/* Real-time Step Pipeline */}
        {activeSimulation.stepDetails && activeSimulation.stepDetails.length > 0 && (
          <div className="pt-2 border-t border-stone-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-bold">
              {activeSimulation.stepDetails.map((step, idx) => (
                <div 
                  key={idx}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5 text-stone-300"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[10px] font-black shrink-0">
                    {idx + 1}
                  </span>
                  <span className="truncate">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
