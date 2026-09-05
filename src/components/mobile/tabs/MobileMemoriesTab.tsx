import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { translations, getLocalizedMemory } from '../../../utils/translations';
import { speakText, sounds } from '../../../utils/audio';
import { 
  Heart, 
  Volume2, 
  PhoneCall, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Check, 
  X, 
  Plus, 
  MessageSquare, 
  Tag,
  Share2
} from 'lucide-react';

export const MobileMemoriesTab: React.FC = () => {
  const { familyMemories, language } = useApp();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeCallContact, setActiveCallContact] = useState<string | null>(null);
  const [callingState, setCallingState] = useState<boolean>(false);

  const t = translations[language] || translations.en;

  const handlePlayVoiceNote = (id: string, text: string, gender: 'female' | 'male' = 'female') => {
    if (playingId === id) {
      setPlayingId(null);
      window.speechSynthesis?.cancel();
      return;
    }

    setPlayingId(id);
    speakText(text, language, { gender });
    setTimeout(() => {
      setPlayingId(null);
    }, 4500);
  };

  const handleCall = (name: string) => {
    setActiveCallContact(name);
    setCallingState(true);
    setTimeout(() => {
      setCallingState(false);
      setActiveCallContact(null);
    }, 3500);
  };

  return (
    <div className="space-y-4 pb-4 select-none">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-sand-200 shadow-sm space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-terracotta-700">
            <Heart className="w-4 h-4 fill-terracotta-500 text-terracotta-500" />
            <span>{t.memoriesTitle}</span>
          </div>
          <span className="text-[10px] text-stone-500 bg-sand-100 px-2 py-0.5 rounded-full font-semibold">
            {familyMemories.length}
          </span>
        </div>
        <p className="text-xs text-stone-600">
          {t.greetingSubtitle}
        </p>
      </div>

      {/* Memory Cards Feed */}
      <div className="space-y-3.5">
        {familyMemories.map((rawMem) => {
          const loc = getLocalizedMemory(rawMem, language);
          const isPlaying = playingId === rawMem.id;

          return (
            <div 
              key={rawMem.id}
              className="bg-white rounded-3xl border border-sand-200 shadow-sm overflow-hidden transition hover:shadow-md"
            >
              {/* Photo Banner with Badges */}
              <div className="relative h-44 w-full bg-sand-200 overflow-hidden">
                <img 
                  src={rawMem.photoUrl} 
                  alt={loc.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Familiar Object Tag */}
                {rawMem.familiarObject && (
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-amber-300" />
                    <span>{rawMem.familiarObject}</span>
                  </div>
                )}

                {/* Name & Relation Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h4 className="font-extrabold text-lg font-serif leading-tight">
                    {loc.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-stone-200">
                    <span className="font-medium truncate">{loc.relationship}</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {rawMem.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Memory Details & Audio */}
              <div className="p-3.5 space-y-3">
                {/* Voice Note Section */}
                {loc.audioNoteText && (
                  <div className="bg-sand-50 rounded-2xl p-3 border border-sand-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-terracotta-600" />
                        <span>{t.listenVoiceNote}</span>
                      </div>
                      
                      <button
                        onClick={() => handlePlayVoiceNote(rawMem.id, loc.audioNoteText, rawMem.voiceGender || 'female')}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition active:scale-95 shadow-sm ${
                          isPlaying
                            ? 'bg-terracotta-600 text-white animate-pulse'
                            : 'bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200'
                        }`}
                      >
                        <Volume2 className="w-4 h-4 text-terracotta-600" />
                        <span>{isPlaying ? '...' : t.listenVoiceNote}</span>
                      </button>
                    </div>

                    <p className="text-xs text-stone-700 italic font-medium">
                      “{loc.audioNoteText}”
                    </p>
                  </div>
                )}

                {/* Story Snippet & Favorite Memory */}
                <div className="text-xs text-stone-600 space-y-1">
                  <p>{loc.storySnippet}</p>
                </div>

                {/* Quick Call Action (if person) */}
                {rawMem.id === 'm1' || rawMem.id === 'm2' ? (
                  <div className="pt-1">
                    <button
                      onClick={() => handleCall(loc.name)}
                      className="w-full py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t.callCaregiverBtn}</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Call Simulation Modal */}
      {callingState && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 text-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-terracotta-500 text-white mx-auto flex items-center justify-center shadow-lg animate-pulse">
              <PhoneCall className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Calling...</div>
              <h3 className="text-xl font-extrabold font-serif mt-1">{activeCallContact}</h3>
              <p className="text-xs text-stone-400 mt-0.5">Connecting via SmritiCare Family Network</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCallingState(false);
                  setActiveCallContact(null);
                }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

