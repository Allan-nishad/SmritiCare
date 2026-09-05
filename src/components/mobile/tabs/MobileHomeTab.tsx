import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { translations, getLocalizedRoutine, getLocalizedDayName } from '../../../utils/translations';
import { speakText, sounds } from '../../../utils/audio';
import { 
  Sun, 
  Mic, 
  Play, 
  MapPin, 
  Clock, 
  Calendar, 
  Heart, 
  CheckCircle2, 
  PhoneCall, 
  Pill, 
  Volume2, 
  Check, 
  Bell,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const MobileHomeTab: React.FC = () => {
  const { 
    language, 
    patient, 
    routines, 
    toggleRoutine, 
    setMobileTab, 
    setActiveGameTab, 
    setIsVoiceOpen, 
    activePushReminder,
    acknowledgePushReminder,
    isOffline,
    addTelemetryLog
  } = useApp();

  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosDialed, setSosDialed] = useState(false);

  const t = translations[language] || translations.en;
  
  // Find current active routine
  const rawRoutine = routines.find(r => !r.completed) || routines[0];
  const nextRoutine = rawRoutine ? getLocalizedRoutine(rawRoutine, language) : null;
  const emergencyPhone = "+91 98765 43210";
  const todayDayName = getLocalizedDayName(new Date(), language);

  // Handle Offline GSM / SMS Emergency SOS
  const handleTriggerOfflineSos = () => {
    setSosDialed(true);
    sounds.playSuccess();
    
    speakText(t.reassuranceSos, language);

    addTelemetryLog({
      source: 'patient',
      title: 'Offline GSM Emergency Call Triggered',
      detail: `Direct GSM cellular call placed to ${emergencyPhone}.`,
      type: 'sos'
    });
  };

  const handleReadOrientation = () => {
    const textToRead = `${t.greetingMorning}. ${t.todayLabel} ${todayDayName}. ${t.locationLabel}.`;
    speakText(textToRead, language);
  };

  const handleReadRoutine = () => {
    if (!nextRoutine) return;
    speakText(nextRoutine.spokenText, language);
  };

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-300 select-none">
      
      {/* ========================================================= */}
      {/* 1. REAL-TIME VOICE PUSH REMINDER (FROM PRIYA)             */}
      {/* ========================================================= */}
      {activePushReminder && (
        <div className="bg-amber-400 text-stone-950 p-4 sm:p-5 rounded-3xl shadow-xl border-4 border-amber-300 animate-in zoom-in-95 duration-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-950">
            <Bell className="w-5 h-5 text-stone-950 animate-bounce" />
            <span className="text-sm">{activePushReminder.senderName}</span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <p className="text-lg sm:text-xl font-black text-stone-900 leading-snug">
              “{activePushReminder.text}”
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                onClick={() => speakText(activePushReminder.voiceNoteText || activePushReminder.text, language)}
                className="py-3 px-4 bg-sand-100 hover:bg-sand-200 text-stone-900 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95"
              >
                <Volume2 className="w-5 h-5 text-terracotta-600" />
                <span>{t.listenAloudLabel}</span>
              </button>

              <button
                onClick={() => acknowledgePushReminder(activePushReminder.id)}
                className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-base font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 flex-1"
              >
                <Check className="w-6 h-6 stroke-[3]" />
                <span>{t.alarmDoneBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. CALM GREETING & SAFE STATUS (BIG & CLEAR)              */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-br from-[#df724b] to-[#b34c26] rounded-3xl p-5 text-white shadow-lg space-y-2 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black bg-white/20 px-3 py-1 rounded-full">
            <Sun className="w-4 h-4 text-amber-300" />
            <span>{t.todayLabel}: {todayDayName}</span>
          </div>
          <button
            onClick={handleReadOrientation}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-amber-200 transition active:scale-95"
            title={t.listenGreeting}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif leading-tight pt-1">
          {t.greetingMorning}
        </h1>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-terracotta-100 font-medium">
          <Heart className="w-4 h-4 text-amber-300 shrink-0 fill-amber-300" />
          <span>{t.locationLabel}</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. NEXT ROUTINE (GIANT BUTTON - IMPOSSIBLE TO MISS)       */}
      {/* ========================================================= */}
      {rawRoutine && nextRoutine && (
        <div className="bg-white rounded-3xl p-5 border-2 border-sand-200 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-terracotta-700 flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-terracotta-600" />
              <span>{t.whatToDoNow}</span>
            </span>
            <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
              {rawRoutine.time}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
              {nextRoutine.title}
            </h3>
            <p className="text-sm text-stone-600 mt-1 font-medium">
              {nextRoutine.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleReadRoutine}
              className="p-3.5 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-2xl font-bold flex items-center justify-center transition active:scale-95"
              title={t.listenAloudLabel}
            >
              <Volume2 className="w-6 h-6 text-terracotta-600" />
            </button>

            <button
              onClick={() => toggleRoutine(rawRoutine.id)}
              className={`flex-1 py-4 px-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition active:scale-95 ${
                rawRoutine.completed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 text-white'
              }`}
            >
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              <span>{rawRoutine.completed ? t.completedPeacefully : t.markAsCompleted}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. TWO BIG ACTIONS: PLAY GAME & TALK TO SMRITI            */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Play Memory Game */}
        <button
          onClick={() => {
            setActiveGameTab('memory_match');
            setMobileTab('games');
          }}
          className="bg-white hover:bg-sand-50 p-4 rounded-3xl border-2 border-sand-200 shadow-sm text-left flex flex-col justify-between space-y-3 transition active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
            <Play className="w-6 h-6 fill-amber-600 text-amber-600 ml-0.5" />
          </div>
          <div>
            <div className="text-base font-black text-stone-900 leading-tight">
              {t.tabGames}
            </div>
            <div className="text-xs text-stone-500 mt-0.5 font-medium">
              {t.gameMemoryTitle}
            </div>
          </div>
        </button>

        {/* Talk to Smriti Voice */}
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="bg-stone-900 hover:bg-black text-white p-4 rounded-3xl shadow-sm text-left flex flex-col justify-between space-y-3 transition active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center">
            <Mic className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-base font-black text-white leading-tight">
              {t.talkToSmritiBtn}
            </div>
            <div className="text-xs text-amber-300 mt-0.5 font-medium">
              {t.voiceTapPrompt}
            </div>
          </div>
        </button>

      </div>

      {/* ========================================================= */}
      {/* 5. BIG EMERGENCY CALL BUTTON (CALL PRIYA)                 */}
      {/* ========================================================= */}
      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-black text-stone-900">{t.sosEmergencyBtn}</div>
            <div className="text-xs text-stone-600">
              {isOffline ? t.offlineNotice : t.callCaregiverBtn}
            </div>
          </div>
        </div>

        <button
          onClick={() => setSosModalOpen(true)}
          className="py-3 px-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-sm shadow-md transition active:scale-95 shrink-0"
        >
          {t.callCaregiverBtn}
        </button>
      </div>

      {/* ========================================================= */}
      {/* EMERGENCY SOS MODAL DIALOG                                */}
      {/* ========================================================= */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <PhoneCall className="w-8 h-8 animate-bounce" />
            </div>

            {sosDialed ? (
              <div className="space-y-3">
                <div className="text-emerald-700 font-black text-lg">
                  {t.reassuranceSos}
                </div>
                <button
                  onClick={() => {
                    setSosModalOpen(false);
                    setSosDialed(false);
                  }}
                  className="w-full py-3 bg-stone-900 text-white font-bold text-sm rounded-2xl"
                >
                  OK
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-black text-lg text-stone-900">
                  {t.callCaregiverBtn}
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  {t.reassuranceSos}
                </p>

                <div className="pt-2 space-y-2">
                  <a
                    href={`tel:${emergencyPhone.replace(/\s+/g, '')}`}
                    onClick={handleTriggerOfflineSos}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-5 h-5" />
                    <span>{t.callCaregiverBtn} ({emergencyPhone})</span>
                  </a>

                  <button
                    onClick={() => setSosModalOpen(false)}
                    className="w-full py-2.5 bg-sand-100 hover:bg-sand-200 text-stone-700 font-bold text-xs rounded-2xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

