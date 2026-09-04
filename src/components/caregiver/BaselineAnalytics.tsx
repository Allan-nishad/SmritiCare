import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LineChart, Sparkles, TrendingUp, Heart, CheckCircle2, Clock, Brain, Info, Calendar } from 'lucide-react';

export const BaselineAnalytics: React.FC = () => {
  const { baselineMetrics, cognitiveSessions } = useApp();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7days' | '14days'>('7days');

  const daysLabel = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'];

  return (
    <div id="caregiver-baseline" className="scroll-mt-24 bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1 rounded-full border border-sage-200 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-sage-600" />
            <span>Longitudinal Trends • N-of-1 Analytics</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Asha's Personal Baseline
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Longitudinal cognitive health trajectory measured against Asha's own baseline
          </p>
        </div>

        <div className="flex items-center gap-2 bg-sand-100 p-1 rounded-2xl border border-sand-200 text-xs font-bold">
          <button
            onClick={() => setSelectedTimeframe('7days')}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedTimeframe === '7days'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Past 7 Days
          </button>
          <button
            onClick={() => setSelectedTimeframe('14days')}
            className={`px-3 py-1.5 rounded-xl transition ${
              selectedTimeframe === '14days'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            14-Day View
          </button>
        </div>
      </div>

      {/* Visual Quote / Innovation Highlight */}
      <div className="my-5 p-4 rounded-3xl bg-sand-50 border border-sand-200 text-stone-800 text-xs sm:text-sm italic font-serif">
        "SmritiCare doesn't ask: How does Asha compare with everyone else? <br />
        <span className="font-sans font-bold text-terracotta-700 not-italic">
          It asks: How is Asha doing compared with Asha?
        </span>"
      </div>

      {/* 4 Interactive Baseline Cards with Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {baselineMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-sand-50/70 border-2 border-sand-200 hover:border-sand-300 transition shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  {metric.name}
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-3xl font-extrabold text-stone-900 font-serif">
                    {metric.score}
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    {metric.unit}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-block text-xs font-extrabold px-2.5 py-1 rounded-full border ${
                  metric.recentTrend === 'improving'
                    ? 'bg-sage-100 text-sage-800 border-sage-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {metric.trendText}
                </span>
              </div>
            </div>

            {/* Interactive SVG Chart representation */}
            <div className="bg-white p-4 rounded-2xl border border-sand-200 shadow-inner">
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2 flex justify-between">
                <span>7-Day Progression</span>
                <span className="text-terracotta-600">N=1 Curve</span>
              </div>

              <div className="h-24 flex items-end justify-between gap-2 pt-3 px-1">
                {metric.sevenDayHistory.map((val, barIdx) => {
                  const min = Math.min(...metric.sevenDayHistory);
                  const max = Math.max(...metric.sevenDayHistory, 1);
                  const range = max - min || 1;
                  const heightPercent = Math.max(30, ((val - min) / range) * 70 + 25);

                  return (
                    <div key={barIdx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="text-[9px] font-bold text-stone-500 opacity-0 group-hover:opacity-100 transition">
                        {val}
                      </div>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          barIdx === metric.sevenDayHistory.length - 1
                            ? 'bg-gradient-to-t from-terracotta-500 to-terracotta-400 shadow-sm'
                            : 'bg-sand-300 hover:bg-sand-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[9px] font-bold text-stone-400">
                        D{barIdx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              {metric.interpretation}
            </p>
          </div>
        ))}
      </div>

      {/* Activity History Logs (Recent Sessions) */}
      <div className="mt-8 pt-6 border-t border-sand-200">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
          Detailed Activity History ({cognitiveSessions.length} Sessions Logged):
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sand-200 text-stone-400 font-bold uppercase">
                <th className="py-2.5 px-3">Session</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Accuracy</th>
                <th className="py-2.5 px-3">Avg Response</th>
                <th className="py-2.5 px-3">Difficulty</th>
                <th className="py-2.5 px-3">Adaptive Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 text-stone-800 font-medium">
              {cognitiveSessions.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-sand-50 transition">
                  <td className="py-3 px-3 font-extrabold text-stone-900 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{s.gameTitle}</span>
                  </td>
                  <td className="py-3 px-3 text-stone-500">{s.timestamp}</td>
                  <td className="py-3 px-3 font-bold text-sage-700">{s.accuracyPercentage}%</td>
                  <td className="py-3 px-3">{s.responseAverageSeconds}s</td>
                  <td className="py-3 px-3 uppercase font-bold text-[10px] text-stone-600">
                    <span className="bg-sand-200 px-2 py-0.5 rounded-full">{s.difficulty}</span>
                  </td>
                  <td className="py-3 px-3 text-stone-600 line-clamp-1 max-w-xs">
                    {s.adaptiveDecision?.ruleApplied}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
