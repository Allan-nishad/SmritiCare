import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, ShieldCheck, Database, ArrowRight } from 'lucide-react';

export const OfflineStatusBar: React.FC = () => {
  const { isOffline, setIsOffline, syncQueue, isSyncing, triggerSync, lastSyncedTime } = useApp();
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncStep, setSyncStep] = useState(1);

  const handleSyncClick = async () => {
    setShowSyncModal(true);
    setSyncStep(1);
    
    // Simulate animated sync steps
    setTimeout(() => setSyncStep(2), 600);
    setTimeout(() => setSyncStep(3), 1300);
    
    await triggerSync();
    
    setTimeout(() => {
      setShowSyncModal(false);
      setSyncStep(1);
    }, 1800);
  };

  return (
    <>
      <div className="bg-white/90 backdrop-blur border-b border-sand-200 py-1.5 px-3 sm:px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          
          {/* Status Indicator & Offline Switch */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold transition-all shadow-sm ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 ring-2 ring-amber-400/30'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              }`}
              title="Click to toggle Offline Simulation for SIH Demonstration"
            >
              {isOffline ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <WifiOff className="w-4 h-4 text-amber-700" />
                  <span>Offline Mode Enabled (Demo Active)</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <Wifi className="w-4 h-4 text-emerald-600" />
                  <span>Connected (Local AI Sync Ready)</span>
                </>
              )}
            </button>

            <span className="hidden md:inline text-stone-500 text-xs">
              {isOffline
                ? 'Activities store in local device memory with zero lag'
                : `Last synced: ${lastSyncedTime}`}
            </span>
          </div>

          {/* Sync Queue & Action */}
          <div className="flex items-center gap-2">
            {syncQueue.length > 0 ? (
              <div className="flex items-center gap-2 animate-pulse-gentle">
                <span className="bg-terracotta-100 text-terracotta-700 font-bold px-2.5 py-0.5 rounded-full text-xs border border-terracotta-200">
                  {syncQueue.length} {syncQueue.length === 1 ? 'activity' : 'activities'} waiting to sync
                </span>
                <button
                  onClick={handleSyncClick}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold px-3 py-1 rounded-full text-xs shadow transition-all active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-sage-600 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-sage-500" />
                <span>All patient activities up to date</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sync Simulation Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-sand-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-terracotta-100 text-terracotta-600 mx-auto flex items-center justify-center mb-4">
              <RefreshCw className="w-8 h-8 animate-spin text-terracotta-500" />
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-1">
              Synchronizing SmritiCare Engine
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              Transmitting encrypted local offline data to Caregiver dashboard & recalculating baseline.
            </p>

            {/* Steps Progress */}
            <div className="space-y-3 text-left mb-6 bg-sand-50 p-4 rounded-2xl border border-sand-200 text-xs">
              <div className={`flex items-center gap-2.5 ${syncStep >= 1 ? 'text-sage-700 font-bold' : 'text-stone-400'}`}>
                {syncStep >= 1 ? <CheckCircle2 className="w-4 h-4 text-sage-600" /> : <div className="w-4 h-4 rounded-full border border-stone-300" />}
                <span>1. Packaging local memory and routine timestamps</span>
              </div>
              <div className={`flex items-center gap-2.5 ${syncStep >= 2 ? 'text-sage-700 font-bold' : 'text-stone-400'}`}>
                {syncStep >= 2 ? <CheckCircle2 className="w-4 h-4 text-sage-600" /> : <div className="w-4 h-4 rounded-full border border-stone-300" />}
                <span>2. Updating Caregiver longitudinal baseline</span>
              </div>
              <div className={`flex items-center gap-2.5 ${syncStep >= 3 ? 'text-sage-700 font-bold' : 'text-stone-400'}`}>
                {syncStep >= 3 ? <CheckCircle2 className="w-4 h-4 text-sage-600" /> : <div className="w-4 h-4 rounded-full border border-stone-300" />}
                <span>3. All data synchronized successfully!</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-sage-700 font-semibold bg-sage-50 px-4 py-2 rounded-xl border border-sage-200">
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              <span>Edge SQLite / Local-First Privacy Compliant</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
