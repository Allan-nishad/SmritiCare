import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import { ShieldAlert, Bell, CheckCircle2, Heart, Phone, Sparkles, X, MessageSquare, Info } from 'lucide-react';
import { CaregiverAlert } from '../../types';

export const ChangeInsights: React.FC = () => {
  const { caregiverAlerts, dismissAlert, markAlertAction } = useApp();
  const [selectedAlert, setSelectedAlert] = useState<CaregiverAlert | null>(null);

  const activeAlerts = caregiverAlerts.filter(a => !a.dismissed);

  const handleAction = (alert: CaregiverAlert) => {
    sounds.playSuccess();
    markAlertAction(alert.id);
    setSelectedAlert(null);
  };

  return (
    <div id="caregiver-insights" className="scroll-mt-24 bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 mb-1">
            <Bell className="w-3.5 h-3.5 text-amber-700" />
            <span>Caregiver Attention & Longitudinal Insights</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Meaningful Change Insights
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Gentle alerts detecting deviations from Asha's personal baseline • Non-diagnostic & actionable
          </p>
        </div>

        <div className="bg-sand-100 px-3.5 py-1.5 rounded-2xl border border-sand-200 text-xs font-bold text-stone-700">
          {activeAlerts.length} Active {activeAlerts.length === 1 ? 'Notice' : 'Notices'}
        </div>
      </div>

      {/* Non-Diagnostic Principle Disclaimer */}
      <div className="my-5 bg-sand-50 p-4 rounded-2xl border border-sand-200 flex items-start gap-3 text-stone-700 text-xs sm:text-sm">
        <Info className="w-5 h-5 text-terracotta-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-stone-900">SmritiCare Care Philosophy: </span>
          <span>We highlight contextual variations (such as delayed hydration or slower morning recall) to empower gentle family check-ins. We never generate alarming or fear-based clinical labels.</span>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 bg-sage-50/50 rounded-3xl border border-sage-200 text-sage-800">
            <CheckCircle2 className="w-10 h-10 text-sage-600 mx-auto mb-2" />
            <h4 className="font-extrabold text-base">Asha is in her comfortable baseline range</h4>
            <p className="text-xs text-sage-700 mt-1">No deviations or uncompleted routines detected today.</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 sm:p-6 rounded-3xl border-2 transition-all shadow-sm ${
                alert.significance === 'Meaningful Check-in'
                  ? 'bg-amber-50/60 border-amber-300'
                  : 'bg-sand-50/70 border-sand-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                {/* Left Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-stone-500 bg-white px-2.5 py-0.5 rounded-lg border border-sand-200">
                      {alert.timestamp}
                    </span>
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      alert.significance === 'Meaningful Check-in'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-sand-200 text-stone-700 border-sand-300'
                    }`}>
                      {alert.significance}
                    </span>
                    {alert.actionTaken && (
                      <span className="text-[11px] font-bold text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full">
                        ✓ Check-in Completed
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-extrabold text-stone-900">
                    {alert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 font-medium">
                    {alert.description}
                  </p>

                  {/* 3-Point Explainer: What Changed & Suggested Action */}
                  <div className="bg-white p-3.5 rounded-2xl border border-sand-200 space-y-1.5 text-xs text-stone-800">
                    <div>
                      <strong className="text-stone-900">What changed: </strong>
                      <span className="text-stone-600">{alert.whatChanged}</span>
                    </div>
                    <div>
                      <strong className="text-terracotta-700">Suggested action: </strong>
                      <span className="text-stone-700 font-medium">{alert.suggestedAction}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-white transition"
                    title="Dismiss notification"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleAction(alert)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-sm active:scale-95 ${
                      alert.actionTaken
                        ? 'bg-sage-100 text-sage-800 border border-sage-300'
                        : 'bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-terracotta-600/20'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{alert.actionTaken ? 'Checked In ✓' : 'Check In with Asha'}</span>
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
