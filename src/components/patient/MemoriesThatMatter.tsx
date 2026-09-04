import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Volume2, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Users, Calendar, HelpCircle } from 'lucide-react';
import { FamilyMemberMemory } from '../../types';

export const MemoriesThatMatter: React.FC = () => {
  const { familyMemories } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [encouragement, setEncouragement] = useState("Tap on any familiar face to hear their voice and remember precious moments.");

  const currentMem: FamilyMemberMemory = familyMemories[selectedIdx] || familyMemories[0];

  const handlePlayVoiceNote = () => {
    setIsPlayingAudio(true);
    speakText(currentMem.audioNoteText);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  const handleQuizOption = (option: string, isCorrect: boolean) => {
    setQuizAnswered(option);
    if (isCorrect) {
      sounds.playSuccess();
      confetti({ particleCount: 40, spread: 45 });
      setEncouragement(`That's right! This photo was taken in ${currentMem.location}.`);
      speakText(`That's right Asha! This is ${currentMem.name} in ${currentMem.location}.`);
    } else {
      sounds.playSoftTryAgain();
      setEncouragement("A lovely guess! Look closely at the background scenery.");
    }
  };

  return (
    <section id="memories-section" className="scroll-mt-24">
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sand-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-1">
              <Heart className="w-3.5 h-3.5 fill-terracotta-500 text-terracotta-600" />
              <span>Personal Reminiscence Care</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Memories That Matter
            </h2>
          </div>

          {/* Memory Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const prev = (selectedIdx - 1 + familyMemories.length) % familyMemories.length;
                setSelectedIdx(prev);
                setQuizAnswered(null);
              }}
              className="w-10 h-10 rounded-full bg-sand-100 hover:bg-sand-200 text-stone-700 flex items-center justify-center transition active:scale-95"
              aria-label="Previous Memory"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-stone-600 bg-sand-50 px-3 py-1.5 rounded-full border border-sand-200">
              {selectedIdx + 1} of {familyMemories.length}
            </span>

            <button
              onClick={() => {
                const next = (selectedIdx + 1) % familyMemories.length;
                setSelectedIdx(next);
                setQuizAnswered(null);
              }}
              className="w-10 h-10 rounded-full bg-sand-100 hover:bg-sand-200 text-stone-700 flex items-center justify-center transition active:scale-95"
              aria-label="Next Memory"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Positive guidance banner */}
        <div className="my-4 bg-terracotta-50/70 p-3.5 rounded-2xl border border-terracotta-200 flex items-center gap-2.5 text-stone-800">
          <Sparkles className="w-5 h-5 text-terracotta-600 shrink-0" />
          <p className="text-sm font-semibold">
            {encouragement}
          </p>
        </div>

        {/* Featured Memory Card (Split layout for elderly tablet experience) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
          
          {/* Left: Large Photo Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-sand-200 shadow-elevated group bg-stone-100 aspect-[4/3] max-h-[380px]">
              <img
                src={currentMem.photoUrl}
                alt={currentMem.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <div className="inline-flex items-center gap-1.5 bg-terracotta-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{currentMem.relationship}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
                  {currentMem.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-stone-200 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-300" />
                  <span>{currentMem.location}</span>
                  {currentMem.keyYear && <span>• {currentMem.keyYear}</span>}
                </div>
              </div>
            </div>

            {/* Audio Voice Note Button */}
            <button
              onClick={handlePlayVoiceNote}
              className={`mt-4 w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-bold transition shadow-md ${
                isPlayingAudio
                  ? 'bg-sage-600 text-white animate-pulse'
                  : 'bg-sand-100 hover:bg-sand-200 text-stone-900 border border-sand-300'
              }`}
            >
              <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'text-white animate-bounce' : 'text-terracotta-600'}`} />
              <span>{isPlayingAudio ? "Playing Voice Note..." : `Hear ${currentMem.name}'s Voice Note`}</span>
            </button>
          </div>

          {/* Right: Story Snippet & Gentle Reminiscence Prompt */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Story Card */}
            <div className="bg-sand-50 p-5 rounded-3xl border border-sand-200">
              <div className="text-xs font-bold uppercase tracking-wider text-terracotta-700 mb-1">
                Cherished Story
              </div>
              <p className="text-stone-800 text-base leading-relaxed font-medium italic">
                {currentMem.audioNoteText}
              </p>
              <p className="text-stone-600 text-xs mt-3">
                {currentMem.storySnippet}
              </p>
            </div>

            {/* Interactive Reminiscence Quiz (Non-pressured prompt) */}
            <div className="bg-white p-5 rounded-3xl border-2 border-sand-200 shadow-sm">
              <div className="flex items-center gap-2 text-stone-900 font-extrabold text-base mb-1">
                <HelpCircle className="w-5 h-5 text-terracotta-500" />
                <span>Do you remember where this was?</span>
              </div>
              <p className="text-xs text-stone-500 mb-4">
                Tap the place that feels familiar to you:
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: currentMem.location, isCorrect: true },
                  { name: 'Guwahati Market', isCorrect: currentMem.location.includes('Market') },
                  { name: 'Ancestral Village', isCorrect: currentMem.location.includes('Village') },
                  { name: 'Tea Garden Veranda', isCorrect: currentMem.location.includes('Garden') }
                ].slice(0, 4).map((place, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleQuizOption(place.name, place.isCorrect)}
                    className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition text-left flex items-center justify-between ${
                      quizAnswered === place.name
                        ? place.isCorrect
                          ? 'bg-sage-100 border-sage-500 text-sage-900'
                          : 'bg-sand-100 border-sand-400 text-stone-800'
                        : 'bg-sand-50 hover:bg-terracotta-50 border-sand-200 text-stone-800 hover:border-terracotta-300'
                    }`}
                  >
                    <span>{place.name}</span>
                    {quizAnswered === place.name && place.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-8 pt-5 border-t border-sand-200">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            All Family Memories ({familyMemories.length}):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {familyMemories.map((mem, idx) => (
              <button
                key={mem.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setQuizAnswered(null);
                }}
                className={`p-2.5 rounded-2xl border-2 flex items-center gap-3 text-left transition shadow-sm ${
                  selectedIdx === idx
                    ? 'border-terracotta-500 bg-terracotta-50/50 ring-2 ring-terracotta-300'
                    : 'border-sand-200 bg-white hover:border-sand-300'
                }`}
              >
                <img
                  src={mem.photoUrl}
                  alt={mem.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="font-extrabold text-stone-900 text-sm truncate">{mem.name}</div>
                  <div className="text-[11px] text-stone-500 truncate">{mem.relationship}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
