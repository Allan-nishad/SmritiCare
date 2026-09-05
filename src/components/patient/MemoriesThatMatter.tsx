import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import { translations, getLocalizedMemory } from '../../utils/translations';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Users, 
  Calendar, 
  HelpCircle,
  Sparkle
} from 'lucide-react';
import { FamilyMemberMemory } from '../../types';

export const MemoriesThatMatter: React.FC = () => {
  const { familyMemories, language } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const t = translations[language] || translations.en;
  const rawMem: FamilyMemberMemory = familyMemories[selectedIdx] || familyMemories[0];
  const localizedMem = getLocalizedMemory(rawMem, language);

  const handlePlayVoiceNote = () => {
    setIsPlayingAudio(true);
    speakText(localizedMem.audioNoteText, language, { gender: rawMem.voiceGender || 'female' });
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  const handleReadStory = () => {
    const textToSpeak = `${localizedMem.name}, ${localizedMem.relationship}. ${localizedMem.storySnippet}`;
    speakText(textToSpeak, language);
  };

  return (
    <section id="memories-section" className="scroll-mt-24 select-none">
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-1">
              <Heart className="w-3.5 h-3.5 fill-terracotta-500 text-terracotta-600" />
              <span>{t.memoriesTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {localizedMem.name}
            </h2>
            <p className="text-sm text-stone-600 font-medium">
              {localizedMem.relationship}
            </p>
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
              {selectedIdx + 1} / {familyMemories.length}
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

        {/* Featured Memory Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Large Photo Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-sand-200 shadow-elevated group bg-stone-100 aspect-[4/3] max-h-[380px]">
              <img
                src={rawMem.photoUrl}
                alt={localizedMem.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-terracotta-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  {rawMem.keyYear || 'Family Anchor'}
                </span>
                <h4 className="text-xl sm:text-2xl font-black mt-1 font-serif">
                  {localizedMem.name}
                </h4>
              </div>
            </div>
          </div>

          {/* Right: Spoken Audio Story & Emotional Reinforcement */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Story Snippet */}
            <div className="bg-sand-50 p-5 rounded-3xl border border-sand-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-terracotta-700 tracking-wider">
                  {t.doYouRememberPrompt} {localizedMem.name}?
                </span>
                
                <button
                  onClick={handleReadStory}
                  className="p-2 bg-white hover:bg-sand-100 text-terracotta-700 rounded-xl border border-sand-200 flex items-center gap-1 text-xs font-bold transition active:scale-95"
                  title="Read story aloud"
                >
                  <Volume2 className="w-4 h-4 text-terracotta-600" />
                  <span>{t.listenAloudLabel}</span>
                </button>
              </div>

              <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed">
                {localizedMem.storySnippet}
              </p>
            </div>

            {/* Audio Note from Family Member */}
            <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-900 tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Spoken Audio Note</span>
              </div>

              <p className="text-sm sm:text-base font-bold text-stone-900 italic leading-snug">
                {localizedMem.audioNoteText}
              </p>

              <button
                onClick={handlePlayVoiceNote}
                className={`w-full py-4 px-6 rounded-2xl font-black text-base shadow-md transition flex items-center justify-center gap-2.5 active:scale-95 ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-stone-950 animate-pulse'
                    : 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
                }`}
              >
                <Volume2 className="w-6 h-6" />
                <span>{isPlayingAudio ? 'Speaking warmly...' : `Hear ${localizedMem.name}'s Voice`}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
