import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, TrendingUp, Heart, CheckCircle2, Clock, Brain, ShieldCheck } from 'lucide-react';

export const PersonalProgress: React.FC = () => {
  const { baselineMetrics } = useApp();

  return (
    <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1 rounded-full border border-sage-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sage-600" />
            <span>N-of-1 Personal Learning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Your Personal Progress
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Compared with your own recent activity pattern • Never compared to others
          </p>
        </div>

        <div className="bg-sand-100 px-4 py-2 rounded-2xl border border-sand-200 text-xs font-bold text-stone-700 flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-terracotta-500 fill-terracotta-200" />
          <span>7-Day Personal Care Loop</span>
        </div>
      </div>

      {/* Innovation Microcopy Alert */}
      <div className="my-5 bg-gradient-to-r from-terracotta-50 via-sand-50 to-sage-50 p-4 rounded-2xl border border-sand-300 text-stone-800 text-xs sm:text-sm">
        <span className="font-extrabold text-terracotta-700">How SmritiCare works: </span>
        <span>SmritiCare learns your usual comfortable rhythm and gently personalizes future memory activities so you always feel confident and relaxed.</span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {baselineMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-sand-50/70 border-2 border-sand-200 hover:border-terracotta-300 transition shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {metric.name}
              </span>
              <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${
                metric.recentTrend === 'improving'
                  ? 'bg-sage-100 text-sage-800 border-sage-300'
                  : metric.recentTrend === 'stable'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-sand-200 text-stone-700 border-sand-300'
              }`}>
                {metric.recentTrend === 'improving' ? '↑ Improving' : metric.recentTrend === 'stable' ? '→ Steady' : 'Comfortable'}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 font-serif">
                {metric.score}
              </span>
              <span className="text-xs font-bold text-stone-500">
                {metric.unit}
              </span>
            </div>

            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              {metric.interpretation}
            </p>

            {/* Micro 7-day sparkline bar visualizer */}
            <div className="pt-2">
              <div className="flex items-end gap-1.5 h-7">
                {metric.sevenDayHistory.map((val, barIdx) => {
                  const maxVal = Math.max(...metric.sevenDayHistory, 1);
                  const heightPercent = Math.max((val / maxVal) * 100, 20);
                  return (
                    <div
                      key={barIdx}
                      className={`flex-1 rounded-t-sm transition-all ${
                        barIdx === metric.sevenDayHistory.length - 1
                          ? 'bg-terracotta-500'
                          : 'bg-sand-300'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                      title={`Day ${barIdx + 1}: ${val}${metric.unit || ''}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 font-semibold mt-1">
                <span>7 Days Ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
