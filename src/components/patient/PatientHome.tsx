import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { speakText, sounds } from '../../utils/audio';
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { PatternSequenceGame } from './games/PatternSequenceGame';
import { AssociationGame } from './games/AssociationGame';
import { ShapeMatchGame } from './games/ShapeMatchGame';
import { MiniSudokuGame } from './games/MiniSudokuGame';
import { MemoriesThatMatter } from './MemoriesThatMatter';
import { SafetyCenter } from './SafetyCenter';
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
  Shapes,
  Grid
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
    location,
    triggerAlarm
  } = useApp();

  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [currentDateStr, setCurrentDateStr] = useState<string>('');
  const [selectedMainSection, setSelectedMainSection] = useState<'home' | 'games' | 'memories' | 'safety'>('home');

  const t = translations[language] || translations.en;
  const nextRoutine = routines.find(r => !r.completed) || routines[0];

  // Live Clock & Date for Orientation Support (Specification 22)
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      setCurrentDateStr(now.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-IN', options));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);

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
            <span className="text-base">Spoken Voice Reminder from {activePushReminder.senderName}</span>
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
                <span>✓ I Took It / Done</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Orientation Header (Specification 22: Day, Date, Time, Location, Next up) */}
      <div className="bg-gradient-to-br from-[#df724b] via-[#c95d36] to-[#b34c26] rounded-[2.5rem] p-6 sm:p-10 text-white shadow-touch relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white border border-white/20">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>{currentDateStr || 'Today'}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-stone-950/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono font-bold text-amber-300 border border-white/10">
              <Clock className="w-4 h-4" />
              <span>{currentTimeStr || '10:30 AM'}</span>
            </div>
          </div>

          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest font-black text-amber-200 block">
              {t.greetingMorning}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight mt-1">
              Asha Devi
            </h1>
          </div>

          <div className="flex items-center gap-2.5 text-sm sm:text-base text-terracotta-100 font-medium">
            <MapPin className="w-5 h-5 text-amber-300 fill-amber-300 shrink-0" />
            <span>{location.address}</span>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => {
                setSelectedMainSection('games');
                setActiveGameTab('memory_match');
                const el = document.getElementById('patient-games-view');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white hover:bg-sand-50 text-terracotta-800 font-black px-6 py-4 rounded-2xl text-base shadow-xl transition-all active:scale-95 flex items-center gap-2.5 border-2 border-white"
            >
              <Play className="w-5 h-5 fill-terracotta-600 text-terracotta-600" />
              <span>{t.startActivityBtn}</span>
            </button>

            <button
              onClick={() => setIsVoiceOpen(true)}
              className="bg-stone-900/90 hover:bg-black text-white font-black px-6 py-4 rounded-2xl text-base backdrop-blur-md transition-all active:scale-95 flex items-center gap-2.5 border border-white/20 shadow-xl"
            >
              <Mic className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>{t.talkToSmritiBtn}</span>
            </button>

            <button
              onClick={() => setSelectedMainSection('safety')}
              className="bg-emerald-700/80 hover:bg-emerald-800 text-white font-black px-5 py-4 rounded-2xl text-base backdrop-blur-md transition-all active:scale-95 flex items-center gap-2 border border-white/20 shadow-xl"
            >
              <Compass className="w-5 h-5 text-emerald-300" />
              <span>{t.safetyCenterTitle}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Next Up Routine Tile (Large touch targets & Voice instruction) */}
      {nextRoutine && (
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-terracotta-700">
              <Pill className="w-5 h-5 text-terracotta-600" />
              <span>{t.nextUpLabel}</span>
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
              <span>{nextRoutine.completed ? '✓ Completed Peacefully' : '✓ Mark as Completed'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Cognitive Gaming Hub (Specification 13, 14, 15, 16) */}
      <section id="patient-games-view" className="scroll-mt-24 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              Cognitive Activities
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              Gentle memory games personalized with family photos and familiar NER memories.
            </p>
          </div>

          {/* 5 Game Categories Selector */}
          <div className="flex items-center gap-1.5 bg-sand-200 p-1.5 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveGameTab('memory_match')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition whitespace-nowrap ${
                activeGameTab === 'memory_match' ? 'bg-white text-terracotta-700 shadow-sm' : 'text-stone-600'
              }`}
            >
              Memory Match
            </button>
            <button
              onClick={() => setActiveGameTab('pattern_sequence')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition whitespace-nowrap ${
                activeGameTab === 'pattern_sequence' ? 'bg-white text-terracotta-700 shadow-sm' : 'text-stone-600'
              }`}
            >
              Rhythm Pattern
            </button>
            <button
              onClick={() => setActiveGameTab('word_association')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition whitespace-nowrap ${
                activeGameTab === 'word_association' ? 'bg-white text-terracotta-700 shadow-sm' : 'text-stone-600'
              }`}
            >
              Object Match
            </button>
            <button
              onClick={() => setActiveGameTab('shape_match')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition whitespace-nowrap ${
                activeGameTab === 'shape_match' ? 'bg-white text-terracotta-700 shadow-sm' : 'text-stone-600'
              }`}
            >
              Shapes
            </button>
            <button
              onClick={() => setActiveGameTab('mini_sudoku')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition whitespace-nowrap ${
                activeGameTab === 'mini_sudoku' ? 'bg-white text-terracotta-700 shadow-sm' : 'text-stone-600'
              }`}
            >
              Number Grid
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-4 sm:p-6 border-2 border-sand-200 shadow-soft">
          {activeGameTab === 'memory_match' && <MemoryMatchGame />}
          {activeGameTab === 'pattern_sequence' && <PatternSequenceGame />}
          {activeGameTab === 'word_association' && <AssociationGame />}
          {activeGameTab === 'shape_match' && <ShapeMatchGame />}
          {activeGameTab === 'mini_sudoku' && <MiniSudokuGame />}
        </div>
      </section>

      {/* 5. Family Memories Reminiscence Section (Specification 20) */}
      <MemoriesThatMatter />

      {/* 6. Dedicated Safety Center (Specification 3, 4, 5, 6, 7, 34) */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
          {t.safetyCenterTitle}
        </h2>
        <SafetyCenter />
      </section>

    </div>
  );
};
