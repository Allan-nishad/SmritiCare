import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { speakText, sounds } from '../../utils/audio';
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { PatternSequenceGame } from './games/PatternSequenceGame';
import { AssociationGame } from './games/AssociationGame';
import { MemoriesThatMatter } from './MemoriesThatMatter';
import { 
  Sun, 
  Mic, 
  Play, 
  MapPin, 
  Clock, 
  Calendar, 
  Compass, 
  Heart, 
  CheckCircle2, 
  PhoneCall, 
  Pill, 
  Volume2, 
  Check, 
  Bell,
  Sparkles,
  ShieldCheck,
  Brain,
  Layers,
  Link as LinkIcon
} from 'lucide-react';

export const PatientHome: React.FC = () => {
  const { 
    language, 
    patient, 
    routines, 
    toggleRoutine, 
    activeGameTab, 
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
  const nextRoutine = routines.find(r => !r.completed) || routines[0];
  const emergencyPhone = "+91 98765 43210";

  const handleTriggerOfflineSos = () => {
    setSosDialed(true);
    sounds.playSuccess();
    
    const reassuranceText = language === 'as'
      ? "আশা বা, প্ৰিয়াৰ মোবাইল নম্বৰত ফোন কৰা হৈছে। অনুগ্ৰহ কৰি শান্তিৰে বহক।"
      : language === 'hi'
      ? "आशा जी, प्रिया के मोबाइल पर सीधे कॉल किया गया है। कृपया शांति से बैठें।"
      : "Asha, Priya's phone has been dialed. Please remain seated comfortably.";

    speakText(reassuranceText, language);

    addTelemetryLog({
      source: 'patient',
      title: 'Offline GSM Emergency Call Triggered',
      detail: `Direct GSM cellular call placed to ${emergencyPhone}.`,
      type: 'sos'
    });
  };

  const handleReadRoutine = () => {
    if (!nextRoutine) return;
    const textToRead = `${nextRoutine.title}. ${nextRoutine.subtitle}`;
    speakText(textToRead, language);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 select-none">
      
      {/* 1. Real-Time Remote Voice Push Reminder from Priya (if active) */}
      {activePushReminder && (
        <div className="bg-amber-400 text-stone-950 p-6 rounded-[2.5rem] shadow-xl border-4 border-amber-300 animate-in zoom-in-95 duration-200 space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-black uppercase tracking-wider text-amber-950">
            <Bell className="w-6 h-6 text-stone-950 animate-bounce" />
            <span className="text-base">Spoken Voice Reminder from Priya</span>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
            <p className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
              “{activePushReminder.text}”
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => speakText(activePushReminder.voiceNoteText || activePushReminder.text, language)}
                className="py-4 px-6 bg-sand-100 hover:bg-sand-200 text-stone-900 rounded-2xl text-base font-bold flex items-center gap-2 active:scale-95"
              >
                <Volume2 className="w-6 h-6 text-terracotta-600" />
                <span>Listen Again</span>
              </button>

              <button
                onClick={() => acknowledgePushReminder(activePushReminder.id)}
                className="py-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-lg font-black flex items-center gap-3 shadow-lg active:scale-95 flex-1 justify-center"
              >
                <Check className="w-7 h-7 stroke-[3]" />
                <span>✓ I Took It, Priya</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Warm Peaceful Greeting Banner */}
      <div className="bg-gradient-to-br from-[#df724b] via-[#c95d36] to-[#b34c26] rounded-[2.5rem] p-6 sm:p-10 text-white shadow-touch relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-white border border-white/20">
            <Sun className="w-4 h-4 text-amber-300" />
            <span>Friday Morning • Pleasant Sunshine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
            Good Morning, Asha
          </h1>

          <div className="flex items-center gap-2.5 text-base sm:text-lg text-terracotta-100 font-medium">
            <Heart className="w-5 h-5 text-amber-300 fill-amber-300 shrink-0" />
            <span>You are safe at home in Guwahati with Priya</span>
          </div>

          {/* 2 Big Clear Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                setActiveGameTab('memory_match');
                const el = document.getElementById('simple-games-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white hover:bg-sand-50 text-terracotta-800 font-black px-6 sm:px-8 py-4 rounded-2xl text-base sm:text-lg shadow-xl transition-all active:scale-95 flex items-center gap-3 border-2 border-white"
            >
              <Play className="w-6 h-6 fill-terracotta-600 text-terracotta-600" />
              <span>Play Memory Game</span>
            </button>

            <button
              onClick={() => setIsVoiceOpen(true)}
              className="bg-stone-900/90 hover:bg-black text-white font-black px-6 sm:px-8 py-4 rounded-2xl text-base sm:text-lg backdrop-blur-md transition-all active:scale-95 flex items-center gap-3 border border-white/20 shadow-xl"
            >
              <Mic className="w-6 h-6 text-amber-300 animate-pulse" />
              <span>Talk to Smriti (Voice)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Next Medicine / Routine Tile (Large & High Contrast) */}
      {nextRoutine && (
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-terracotta-700">
              <Pill className="w-5 h-5 text-terracotta-600" />
              <span>What To Do Now</span>
            </div>
            <span className="text-xs sm:text-sm font-black text-amber-900 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200">
              {nextRoutine.time}
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
              {nextRoutine.title}
            </h3>
            <p className="text-sm sm:text-base text-stone-600 mt-1 font-medium">
              {nextRoutine.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleReadRoutine}
              className="p-4 bg-sand-100 hover:bg-sand-200 text-stone-800 rounded-2xl font-bold flex items-center justify-center transition active:scale-95"
              title="Read instructions out loud"
            >
              <Volume2 className="w-7 h-7 text-terracotta-600" />
            </button>

            <button
              onClick={() => toggleRoutine(nextRoutine.id)}
              className={`flex-1 py-5 px-6 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-lg transition active:scale-95 ${
                nextRoutine.completed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 text-white'
              }`}
            >
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              <span>{nextRoutine.completed ? '✓ Completed Peacefully' : '✓ I Took My Medicine'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Cognitive Memory Match Game Section */}
      <section id="simple-games-section" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              Memory Games
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              Gentle, relaxing card matching with zero rush.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-sand-200 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveGameTab('memory_match')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition ${
                activeGameTab === 'memory_match' ? 'bg-white text-terracotta-700 shadow-sm' : 'text-stone-600'
              }`}
            >
              Match Game
            </button>
            <button
              onClick={() => setActiveGameTab('pattern_sequence')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition ${
                activeGameTab === 'pattern_sequence' ? 'bg-white text-terracotta-700 shadow-sm' : 'text-stone-600'
              }`}
            >
              Rhythm
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-4 sm:p-6 border-2 border-sand-200 shadow-soft">
          {activeGameTab === 'memory_match' && <MemoryMatchGame />}
          {activeGameTab === 'pattern_sequence' && <PatternSequenceGame />}
          {activeGameTab === 'word_association' && <AssociationGame />}
        </div>
      </section>

      {/* 5. Family Memories Section */}
      <MemoriesThatMatter />

      {/* 6. Big Emergency Call Card */}
      <div className="bg-red-50 border-2 border-red-200 rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-3xl bg-red-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <PhoneCall className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              Need Priya Right Now?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              {isOffline ? 'Offline direct GSM cellular call' : 'Direct one-touch call to Priya’s mobile phone'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSosModalOpen(true)}
          className="w-full sm:w-auto py-4 px-8 bg-red-600 hover:bg-red-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg transition active:scale-95"
        >
          Call Priya ({emergencyPhone})
        </button>
      </div>

      {/* Emergency Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <PhoneCall className="w-8 h-8 animate-bounce" />
            </div>

            {sosDialed ? (
              <div className="space-y-3">
                <div className="text-emerald-700 font-black text-lg">
                  Calling Priya Directly...
                </div>
                <p className="text-xs text-stone-600 font-medium">
                  Please stay seated comfortably. Priya is answering your call.
                </p>
                <button
                  onClick={() => {
                    setSosModalOpen(false);
                    setSosDialed(false);
                  }}
                  className="w-full py-3 bg-stone-900 text-white font-bold text-sm rounded-2xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-black text-lg text-stone-900">
                  Call Priya Now?
                </h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  This will ring Priya's mobile phone directly so you can talk to her.
                </p>

                <div className="pt-2 space-y-2">
                  <a
                    href={`tel:${emergencyPhone.replace(/\s+/g, '')}`}
                    onClick={handleTriggerOfflineSos}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-5 h-5" />
                    <span>Dial Priya ({emergencyPhone})</span>
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
