import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds, speakText } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  User, 
  Heart, 
  MapPin, 
  Clock, 
  Watch, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Volume2, 
  Plus, 
  Droplets,
  Languages,
  CheckCircle2,
  Lock,
  Camera
} from 'lucide-react';

interface CaregiverOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaregiverOnboardingModal: React.FC<CaregiverOnboardingModalProps> = ({
  isOpen,
  onClose
}) => {
  const { patient, language, setRole } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Patient Profile & Language
  const [patientName, setPatientName] = useState('Asha Devi');
  const [patientAge, setPatientAge] = useState('74');
  const [patientBlood, setPatientBlood] = useState('O+');
  const [patientLang, setPatientLang] = useState('Assamese (অসমীয়া)');

  // Step 2: Voice & Cultural Calibration
  const [selectedVoice, setSelectedVoice] = useState<'female_meera' | 'male_rahul'>('female_meera');
  const [culturalAnchor, setCulturalAnchor] = useState('Assamese Folk / Bihu & Flute');

  // Step 3: Routines & Hydration
  const [medTime, setMedTime] = useState('08:00 AM');
  const [waterGoal, setWaterGoal] = useState('2,200 mL');

  // Step 4: Geofence & Emergency
  const [geofenceRadius, setGeofenceRadius] = useState('400 meters (Silpukhuri Pond)');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 94350 12345 (Meera Devi)');

  // Step 5: Wearable Pairing
  const [smartbandPaired, setSmartbandPaired] = useState(true);

  if (!isOpen) return null;

  const handleNext = () => {
    sounds.playSuccess();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      confetti({ particleCount: 70, spread: 60 });
      sounds.playSuccess();
      onClose();
    }
  };

  const handlePrev = () => {
    sounds.playFlip();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const playVoiceSample = () => {
    if (selectedVoice === 'female_meera') {
      speakText("Ma, remember to take your morning blood pressure medicine with warm water. I love you!", 'as');
    } else {
      speakText("Ma, this is Rahul. Lunch is served with fresh Joha rice and tea.", 'as');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in">
      <div className="bg-[#F8F5ED] rounded-[2.5rem] max-w-2xl w-full border-2 border-[#A8C3A0]/60 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header in Deep Forest Green */}
        <div className="bg-[#356859] text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-[#A8C3A0]/30 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white mb-2 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D88965]" />
            <span>Option 2: 5-Step Custom Setup Wizard</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Setup Caregiver Hub for Asha Devi
          </h3>
          <p className="text-xs sm:text-sm text-[#A8C3A0] mt-1 font-medium">
            Step {currentStep} of 5 • Tailoring dementia assistance & sensory familiarity
          </p>

          {/* Progress Dots */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === currentStep
                    ? 'w-10 bg-[#D88965]'
                    : s < currentStep
                    ? 'w-4 bg-[#5E9367]'
                    : 'w-4 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#26332F]">
          
          {/* STEP 1: PATIENT IDENTITY */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-terracotta-700">
                <User className="w-4 h-4 text-terracotta-600" />
                <span>Step 1: Patient Identity & Cognitive Stage</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Tell us about your elderly loved one
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-stone-700 uppercase mb-1">Full Name</label>
                  <input 
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold focus:ring-2 focus:ring-terracotta-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-700 uppercase mb-1">Age & Blood Group</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="w-24 px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                    <input 
                      type="text"
                      value={patientBlood}
                      onChange={(e) => setPatientBlood(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-sand-300 text-sm font-bold focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-stone-700 uppercase mb-1">Primary Native Language</label>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between">
                  <span>Assamese (অসমীয়া) • Regional North Eastern Dialect</span>
                  <span className="bg-amber-200 text-amber-950 px-2 py-0.5 rounded-md text-[11px]">Active</span>
                </div>
              </div>

              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-stone-600 space-y-1">
                <strong className="text-stone-900">Cognitive Stage: </strong>
                <span>Early Stage Amnestic MCI (CDR 0.5) • Preserves long-term memory, gentle daily reminders needed for hydration and medication.</span>
              </div>
            </div>
          )}

          {/* STEP 2: VOICE & CULTURAL CALIBRATION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-terracotta-700">
                <Heart className="w-4 h-4 text-terracotta-600" />
                <span>Step 2: Family Voice & Cultural Calibration</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Familiarity reduces dementia anxiety
              </h4>

              <div className="space-y-2">
                <label className="block text-xs font-black text-stone-700 uppercase">Select Primary Recorded Family Voice</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedVoice('female_meera')}
                    className={`p-4 rounded-2xl border text-left transition ${
                      selectedVoice === 'female_meera'
                        ? 'bg-terracotta-50 border-terracotta-500 ring-2 ring-terracotta-400'
                        : 'bg-sand-50 border-sand-200'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-stone-900">Meera Devi</div>
                    <div className="text-xs text-stone-500">Daughter (Warm female voice)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedVoice('male_rahul')}
                    className={`p-4 rounded-2xl border text-left transition ${
                      selectedVoice === 'male_rahul'
                        ? 'bg-terracotta-50 border-terracotta-500 ring-2 ring-terracotta-400'
                        : 'bg-sand-50 border-sand-200'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-stone-900">Rahul Sharma</div>
                    <div className="text-xs text-stone-500">Son (Gentle male voice)</div>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={playVoiceSample}
                className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Volume2 className="w-4 h-4" />
                <span>Test Spoken Voice Sample for Asha</span>
              </button>

              <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-stone-700 space-y-1">
                <strong className="text-stone-900">Cultural Anchors: </strong>
                <span>Bihu Dhol, Brass Xorai, Jaapi, Chameli Flower, and Brahmaputra river ambient sounds are preloaded.</span>
              </div>
            </div>
          )}

          {/* STEP 3: ROUTINES & MEDICATIONS */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-terracotta-700">
                <Clock className="w-4 h-4 text-terracotta-600" />
                <span>Step 3: Daily Routine & Medication Manager</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Structured schedule with gentle nudges
              </h4>

              <div className="space-y-2.5">
                <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-stone-900">08:00 AM • Morning BP Medicine:</strong> Telmisartan (40mg)
                  </div>
                  <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">High Priority</span>
                </div>

                <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-stone-900">11:00 AM • Hydration:</strong> Warm Assam Lemon Honey Water
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">350 mL</span>
                </div>

                <div className="p-3 bg-sand-50 rounded-2xl border border-sand-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-stone-900">01:00 PM • Traditional Lunch:</strong> Masor Tenga & Joha Rice
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Meal</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GEOFENCING & SAFETY */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-terracotta-700">
                <MapPin className="w-4 h-4 text-terracotta-600" />
                <span>Step 4: Geofence Safe Boundary & Fallback</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Safe walking radius & emergency escalation
              </h4>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span>Guwahati Residence Safe Zone</span>
                  <span className="bg-emerald-200 px-2 py-0.5 rounded-md">400m Radius</span>
                </div>
                <p className="text-xs text-emerald-900">
                  House #14, Brahmaputra View Lane, Silpukhuri. If Asha steps beyond 400m, her phone activates "Take Me Home" and Priya receives an instant GPS alert.
                </p>
              </div>

              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-2">
                <div className="text-xs font-bold text-stone-900">2-Tier SOS Emergency Fallback:</div>
                <div className="text-xs text-stone-600">
                  1. Meera Devi (Daughter) ➔ 2. Rahul Sharma (Son) ➔ 3. SMS Broadcast to GMCH Emergency.
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: WEARABLE IOT SMARTBAND */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-terracotta-700">
                <Watch className="w-4 h-4 text-terracotta-600" />
                <span>Step 5: Smartband GPS Band v2 Pairing</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Independent wearable tracking & separation alerts
              </h4>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl border-2 border-blue-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Watch className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-stone-900">GPS Band v2 (BLE 5.2)</div>
                    <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Paired & Live Telemetry Connected</span>
                    </div>
                  </div>
                </div>

                <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow">
                  Ready ✓
                </span>
              </div>

              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-stone-700 space-y-1">
                <strong className="text-stone-900">Proximity Safety Feature: </strong>
                <span>If Asha walks into the courtyard without her phone, the band vibrates on her wrist and engages independent cellular GPS tracking.</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Controls */}
        <div className="p-6 bg-[#EEF4EC] border-t border-[#A8C3A0]/40 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              currentStep === 1
                ? 'opacity-30 cursor-not-allowed text-[#526861]'
                : 'bg-white hover:bg-[#F8F5ED] text-[#26332F] border border-[#A8C3A0]/50 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-[#356859] hover:bg-[#2C574A] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <span>{currentStep === 5 ? 'Complete Onboarding & Launch' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4 text-[#A8C3A0]" />
          </button>
        </div>

      </div>
    </div>
  );
};
