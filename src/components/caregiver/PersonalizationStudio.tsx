import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Plus, 
  Heart, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Image as ImageIcon, 
  Music, 
  MapPin, 
  Clock,
  ArrowRight
} from 'lucide-react';

export const PersonalizationStudio: React.FC = () => {
  const { familyMemories, addFamilyMemory, addRoutineItem, setRole } = useApp();
  const [activeTab, setActiveTab] = useState<'memories' | 'routines'>('memories');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form states for Memory
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [audioNoteText, setAudioNoteText] = useState('');
  const [storySnippet, setStorySnippet] = useState('');

  // Form states for Routine
  const [routineTime, setRoutineTime] = useState('05:00 PM');
  const [routineTitle, setRoutineTitle] = useState('');
  const [routineSubtitle, setRoutineSubtitle] = useState('');
  const [routineCategory, setRoutineCategory] = useState<'medicine' | 'hydration' | 'activity' | 'walk' | 'family'>('family');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !relationship) return;

    sounds.playSuccess();
    confetti({ particleCount: 40, spread: 45 });

    addFamilyMemory({
      name,
      relationship,
      location: location || 'Guwahati, Assam',
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      audioNoteText: audioNoteText || `“Aita, we love you so much! Sending warm greetings from ${location || 'Assam'}.”`,
      storySnippet: storySnippet || `${name} is your dear ${relationship}.`,
      favoriteMemory: 'Family gathering on the veranda.'
    });

    setName('');
    setRelationship('');
    setLocation('');
    setPhotoUrl('');
    setAudioNoteText('');
    setStorySnippet('');

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  const handleQuickAddPredefined = () => {
    sounds.playSuccess();
    confetti({ particleCount: 50, spread: 50 });

    addFamilyMemory({
      name: 'Sneha & Rohan (Cousins)',
      relationship: 'Niece & Nephew from Sivasagar',
      location: 'Sivasagar, Assam',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      audioNoteText: '“Khuri (Aunt), we brought the sweet Komal Saul and fresh curd from Sivasagar for you!”',
      storySnippet: 'Sneha and Rohan visit during Bohag Bihu festival with traditional homemade sweets.',
      favoriteMemory: 'Tasting the first fresh batch of curd and jaggery.',
      keyYear: '2024 Visit',
      familiarObject: 'Clay Curd Pot (Doi Khura)'
    });

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  const handleAddRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routineTitle) return;

    sounds.playSuccess();
    addRoutineItem({
      time: routineTime,
      title: routineTitle,
      subtitle: routineSubtitle || 'Gentle daily reminder',
      category: routineCategory,
      priority: 'normal',
      icon: 'Heart'
    });

    setRoutineTitle('');
    setRoutineSubtitle('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  return (
    <div id="caregiver-personalize" className="scroll-mt-24 bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-sand-200 shadow-soft">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3 py-1 rounded-full border border-terracotta-200 mb-1">
            <Heart className="w-3.5 h-3.5 fill-terracotta-500 text-terracotta-600" />
            <span>Caregiver Customization Studio</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Personalize Asha's Experience
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Add familiar family photos, voice memories, and daily routines that adapt Asha's patient space in real time
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-sand-100 p-1.5 rounded-2xl border border-sand-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('memories')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              activeTab === 'memories'
                ? 'bg-white text-terracotta-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Family Memories</span>
          </button>

          <button
            onClick={() => setActiveTab('routines')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              activeTab === 'routines'
                ? 'bg-white text-terracotta-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Custom Routine</span>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="my-4 p-4 rounded-2xl bg-sage-100 border border-sage-300 text-sage-900 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-sage-700" />
            <span>Successfully updated! Asha's patient portal now reflects this new memory/routine immediately.</span>
          </div>
          <button
            onClick={() => setRole('patient')}
            className="text-xs font-bold underline text-sage-800 hover:text-sage-950 flex items-center gap-1"
          >
            <span>View in Asha's Space</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tab 1: Family Memories Form */}
      {activeTab === 'memories' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <form onSubmit={handleAddMemory} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Family Member Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rohan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Relationship *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Grandson (Nephew)"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Familiar Place / City
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sivasagar, Assam"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Audio Note Message (Read gently to Asha)
              </label>
              <textarea
                rows={2}
                placeholder="“Aita, I am bringing fresh tea and sweets for you this weekend!”"
                value={audioNoteText}
                onChange={(e) => setAudioNoteText(e.target.value)}
                className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="btn-elder-primary text-xs sm:text-sm py-3 px-6 rounded-2xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Asha's Memories</span>
              </button>

              <button
                type="button"
                onClick={handleQuickAddPredefined}
                className="btn-elder-secondary text-xs py-3 px-4 rounded-2xl flex items-center gap-1.5"
                title="1-click demo insert for judges"
              >
                <Sparkles className="w-4 h-4 text-terracotta-600" />
                <span>1-Click Sample Pre-fill</span>
              </button>
            </div>
          </form>

          {/* Right Side: Current Memories list */}
          <div className="lg:col-span-5 bg-sand-50 p-5 rounded-3xl border border-sand-200 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-600 flex justify-between">
              <span>Active Memories ({familyMemories.length})</span>
              <span className="text-terracotta-700 font-bold">Live Synced</span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {familyMemories.map((mem) => (
                <div key={mem.id} className="p-3 bg-white rounded-2xl border border-sand-200 flex items-center gap-3 shadow-sm">
                  <img src={mem.photoUrl} alt={mem.name} className="w-11 h-11 rounded-xl object-cover shrink-0" />
                  <div className="overflow-hidden">
                    <div className="font-extrabold text-stone-900 text-xs sm:text-sm truncate">{mem.name}</div>
                    <div className="text-[11px] text-stone-500 truncate">{mem.relationship} • {mem.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Custom Routine Form */}
      {activeTab === 'routines' && (
        <form onSubmit={handleAddRoutine} className="mt-6 max-w-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Scheduled Time *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 05:00 PM"
                value={routineTime}
                onChange={(e) => setRoutineTime(e.target.value)}
                className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Category *
              </label>
              <select
                value={routineCategory}
                onChange={(e: any) => setRoutineCategory(e.target.value)}
                className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
              >
                <option value="medicine">Medicine</option>
                <option value="hydration">Hydration</option>
                <option value="activity">Cognitive Activity</option>
                <option value="walk">Courtyard Walk</option>
                <option value="family">Family Time</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Routine Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Evening Green Tea & Brahmaputra Breeze"
              value={routineTitle}
              onChange={(e) => setRoutineTitle(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Notes / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g., Sit comfortably on the veranda with Priya"
              value={routineSubtitle}
              onChange={(e) => setRoutineSubtitle(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-sand-200 focus:border-terracotta-400 focus:outline-none text-sm text-stone-900 bg-sand-50/50"
            />
          </div>

          <button
            type="submit"
            className="btn-elder-primary text-xs sm:text-sm py-3 px-6 rounded-2xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Routine to Asha's Timeline</span>
          </button>
        </form>
      )}

    </div>
  );
};
