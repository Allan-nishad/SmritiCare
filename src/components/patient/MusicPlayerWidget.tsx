import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  ChevronUp, 
  ChevronDown,
  Volume2
} from 'lucide-react';

export const MusicPlayerWidget: React.FC = () => {
  const { 
    musicTracks, 
    currentTrackIndex, 
    isPlayingMusic, 
    togglePlayMusic, 
    nextTrack, 
    prevTrack, 
    language 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const currentTrack = musicTracks[currentTrackIndex] || musicTracks[0];

  return (
    <div className="fixed bottom-4 left-4 z-40 select-none">
      {!isOpen ? (
        /* Minimized Tiny Floating Pill */
        <button
          onClick={() => setIsOpen(true)}
          className={`px-3 py-2 rounded-2xl shadow-xl border flex items-center gap-2 transition active:scale-95 ${
            isPlayingMusic 
              ? 'bg-gradient-to-r from-amber-500 to-terracotta-600 text-white border-amber-300 animate-pulse' 
              : 'bg-stone-900/90 backdrop-blur-md text-stone-300 hover:text-white border-stone-700'
          }`}
          title="Open Peaceful Music Player"
        >
          <Music className="w-4 h-4" />
          <span className="text-xs font-bold font-serif hidden sm:inline truncate max-w-[140px]">
            {isPlayingMusic ? currentTrack.title : 'Peaceful Music'}
          </span>
          {isPlayingMusic && (
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          )}
        </button>
      ) : (
        /* Compact Expanded Player */
        <div className="w-72 sm:w-80 bg-stone-950/95 backdrop-blur-md text-white rounded-3xl p-3.5 shadow-2xl border border-stone-700 space-y-3 animate-in zoom-in-95 duration-200">
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isPlayingMusic ? 'bg-amber-500 text-stone-950 animate-pulse' : 'bg-stone-800 text-stone-400'
              }`}>
                <Music className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-amber-400">
                  {isPlayingMusic ? 'Now Playing' : 'Background Audio'}
                </div>
                <h4 className="text-xs font-bold text-stone-100 truncate">
                  {currentTrack.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={togglePlayMusic}
                className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition active:scale-90 font-bold shadow"
              >
                {isPlayingMusic ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition text-xs font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 italic">
            “{currentTrack.notes}”
          </p>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-1 border-t border-stone-800">
            <button onClick={prevTrack} className="hover:text-amber-300 flex items-center gap-1 text-[11px]">
              <SkipBack className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <span className="font-mono text-[10px] text-stone-500">{currentTrack.duration}</span>
            <button onClick={nextTrack} className="hover:text-amber-300 flex items-center gap-1 text-[11px]">
              <span>Next</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
