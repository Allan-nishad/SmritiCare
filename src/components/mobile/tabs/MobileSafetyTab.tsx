import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { translations, getLocalizedPlace, getLocalizedNavigationStep } from '../../../utils/translations';
import { speakText, sounds } from '../../../utils/audio';
import { InteractiveMap } from '../../shared/InteractiveMap';
import { 
  ShieldAlert, 
  MapPin, 
  Navigation, 
  PhoneCall, 
  Home, 
  Compass, 
  Clock, 
  AlertTriangle, 
  Stethoscope, 
  Building2, 
  Pill, 
  Heart, 
  Volume2, 
  Send,
  Watch,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const MobileSafetyTab: React.FC = () => {
  const { 
    language, 
    location, 
    places, 
    navigationSteps, 
    sosStep, 
    startSosFlow, 
    resetSosFlow, 
    generatedSosSms, 
    emergencyContacts, 
    smartbandMetrics, 
    isOffline 
  } = useApp();

  const [activeSubView, setActiveSubView] = useState<'map' | 'take_me_home' | 'sos' | 'places'>('map');
  const [currentNavStep, setCurrentNavStep] = useState(0);
  const t = translations[language] || translations.en;

  const currentStep = navigationSteps[currentNavStep] || navigationSteps[0];
  const locStep = currentStep ? getLocalizedNavigationStep(currentStep, language) : null;

  const handleReadNavStep = (stepText?: string) => {
    const textToSpeak = stepText || (locStep ? `${locStep.instruction}. ${locStep.landmark}` : '');
    speakText(textToSpeak, language);
  };

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-300 select-none">
      
      {/* Top Segmented Tabs for Safety Hub in Mobile */}
      <div className="flex items-center gap-1 bg-sand-200/90 p-1 rounded-2xl border border-sand-300">
        <button
          onClick={() => setActiveSubView('map')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 ${
            activeSubView === 'map' ? 'bg-white text-terracotta-700 shadow-xs' : 'text-stone-600'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{t.tabSafety}</span>
        </button>

        <button
          onClick={() => setActiveSubView('take_me_home')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 ${
            activeSubView === 'take_me_home' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{t.takeMeHomeBtn}</span>
        </button>

        <button
          onClick={() => setActiveSubView('sos')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 ${
            activeSubView === 'sos' ? 'bg-red-600 text-white shadow-xs' : 'text-stone-600'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{t.sosEmergencyBtn}</span>
        </button>

        <button
          onClick={() => setActiveSubView('places')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 ${
            activeSubView === 'places' ? 'bg-white text-terracotta-700 shadow-xs' : 'text-stone-600'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>{t.tabHome}</span>
        </button>
      </div>

      {/* 1. Away From Home Banner */}
      {!location.isHome && (
        <div className="bg-amber-500 text-stone-950 p-4 rounded-3xl border-3 border-amber-400 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-950 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>{t.awayFromHomeTitle}</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-stone-900 text-amber-300 px-2 py-0.5 rounded-full">
              {location.distanceFromHomeKm} km
            </span>
          </div>
          <p className="text-sm font-black text-stone-950">
            {t.locationLabel}
          </p>
          <button
            onClick={() => setActiveSubView('take_me_home')}
            className="w-full py-2.5 bg-stone-950 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>{t.takeMeHomeBtn}</span>
          </button>
        </div>
      )}

      {/* SUBVIEW 1: INTERACTIVE MAP */}
      {activeSubView === 'map' && (
        <div className="space-y-3">
          <InteractiveMap heightClass="h-72" />

          {/* Quick Action Buttons Under Map */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveSubView('take_me_home')}
              className="py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>{t.takeMeHomeBtn}</span>
            </button>

            <button
              onClick={() => {
                setActiveSubView('sos');
                startSosFlow();
              }}
              className="py-3 px-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.sosEmergencyBtn}</span>
            </button>
          </div>

          {/* Smartband Status Card */}
          <div className="bg-stone-900 text-white p-3.5 rounded-2xl border border-stone-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Watch className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-stone-100">{smartbandMetrics.deviceName}</div>
                <div className="text-[10px] text-stone-400">GPS Tracker • {smartbandMetrics.batteryLevel}% Battery</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Active
            </span>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: TAKE ME HOME */}
      {activeSubView === 'take_me_home' && locStep && (
        <div className="bg-white rounded-3xl p-5 border-2 border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700">Walking Guidance</span>
              <h3 className="text-xl font-black text-stone-900 font-serif">{t.takeMeHomeBtn}</h3>
            </div>
            <button
              onClick={() => handleReadNavStep()}
              className="p-2 bg-sand-100 text-terracotta-600 rounded-xl transition active:scale-95"
              title={t.listenDirections}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-black text-emerald-800">
              <span>STEP {currentNavStep + 1} OF {navigationSteps.length}</span>
              <span>{currentStep.distanceMeters}m</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
                <Navigation className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <h4 className="font-black text-sm text-stone-900 leading-snug">
                  {locStep.instruction}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  📍 {locStep.landmark}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentNavStep === 0}
                onClick={() => setCurrentNavStep(prev => Math.max(0, prev - 1))}
                className="px-3 py-1.5 bg-white text-stone-700 font-bold rounded-xl text-xs disabled:opacity-40 border border-sand-300"
              >
                Back
              </button>

              <div className="flex items-center gap-1">
                {navigationSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === currentNavStep ? 'w-5 bg-emerald-600' : 'bg-emerald-200'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (currentNavStep < navigationSteps.length - 1) {
                    const nextIdx = currentNavStep + 1;
                    setCurrentNavStep(nextIdx);
                    const nextLoc = getLocalizedNavigationStep(navigationSteps[nextIdx], language);
                    speakText(`${nextLoc.instruction}. ${nextLoc.landmark}`, language);
                  }
                }}
                className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow active:scale-95"
              >
                {currentNavStep === navigationSteps.length - 1 ? t.completedPeacefully : 'Next ➔'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: SOS EMERGENCY FALLBACK */}
      {activeSubView === 'sos' && (
        <div className="bg-white rounded-3xl p-5 border-2 border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-red-700">Two-Contact Sequence</span>
              <h3 className="text-xl font-black text-stone-900 font-serif">{t.sosEmergencyBtn}</h3>
            </div>
            {sosStep !== 'idle' && (
              <button
                onClick={resetSosFlow}
                className="p-1.5 text-stone-500 bg-sand-100 rounded-lg text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-center space-y-3">
            {sosStep === 'idle' && (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                  <PhoneCall className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-stone-900">{t.sosEmergencyBtn}</h4>
                  <p className="text-xs text-stone-600">Dials Meera ➔ then dials Rahul if unanswered.</p>
                </div>
                <button
                  onClick={startSosFlow}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-base rounded-2xl shadow-lg active:scale-95"
                >
                  {t.sosEmergencyBtn}
                </button>
              </div>
            )}

            {sosStep === 'calling_meera' && (
              <div className="space-y-2 py-2">
                <div className="w-14 h-14 rounded-full bg-amber-500 text-stone-950 mx-auto flex items-center justify-center animate-pulse shadow">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-stone-900">Calling Meera (Daughter)...</h4>
                <p className="text-xs text-stone-600 font-mono">Dialing +91 94350 12345...</p>
              </div>
            )}

            {sosStep === 'meera_failed' && (
              <div className="space-y-2 py-2">
                <div className="w-14 h-14 rounded-full bg-stone-700 text-white mx-auto flex items-center justify-center shadow">
                  <Clock className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-stone-900">Meera Unavailable. Trying Rahul...</h4>
                <p className="text-xs text-stone-600">Switching to Secondary Contact automatically...</p>
              </div>
            )}

            {sosStep === 'calling_rahul' && (
              <div className="space-y-2 py-2">
                <div className="w-14 h-14 rounded-full bg-cyan-600 text-white mx-auto flex items-center justify-center animate-pulse shadow">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-stone-900">Calling Rahul (Son)...</h4>
                <p className="text-xs text-stone-600 font-mono">Dialing +91 98640 67890...</p>
              </div>
            )}

            {sosStep === 'connected_rahul' && (
              <div className="space-y-3 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-emerald-800">Connected with Rahul!</h4>
                <p className="text-xs text-stone-600">{t.reassuranceSos}</p>
                {generatedSosSms && (
                  <div className="bg-white p-3 rounded-xl border border-emerald-300 text-[11px] font-mono text-stone-800 text-left">
                    “{generatedSosSms}”
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBVIEW 4: MY PLACES */}
      {activeSubView === 'places' && (
        <div className="space-y-2">
          {places.map(place => {
            const locPlace = getLocalizedPlace(place, language);

            return (
              <div
                key={place.id}
                className="bg-white p-3.5 rounded-2xl border border-sand-200 flex items-center justify-between gap-2 shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                    {place.category === 'home' && <Home className="w-4 h-4" />}
                    {place.category === 'doctor' && <Stethoscope className="w-4 h-4" />}
                    {place.category === 'hospital' && <Building2 className="w-4 h-4" />}
                    {place.category === 'pharmacy' && <Pill className="w-4 h-4" />}
                    {place.category === 'family' && <Heart className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-stone-900 truncate">{locPlace.name}</h5>
                    <p className="text-[10px] text-stone-500 truncate">{locPlace.address}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold bg-sand-100 px-2 py-1 rounded-lg shrink-0">
                  {place.distanceKm === 0 ? 'Here' : `${place.distanceKm} km`}
                </span>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

