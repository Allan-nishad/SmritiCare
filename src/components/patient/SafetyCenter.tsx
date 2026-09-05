import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { speakText, sounds } from '../../utils/audio';
import { 
  ShieldAlert, 
  MapPin, 
  Navigation, 
  PhoneCall, 
  Home, 
  Compass, 
  Clock, 
  Wifi, 
  WifiOff, 
  Watch, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Building2, 
  Stethoscope, 
  Pill, 
  Heart, 
  Volume2, 
  Send,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const SafetyCenter: React.FC = () => {
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
    isOffline,
    activeSafetyTab,
    setActiveSafetyTab,
    isMissingPatientScenario,
    setIsMissingPatientScenario
  } = useApp();

  const [currentNavStep, setCurrentNavStep] = useState(0);
  const t = translations[language] || translations.en;

  const handleReadNavStep = (stepText: string) => {
    speakText(stepText, language);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      
      {/* Top Safety Center Navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border-2 border-sand-200 shadow-soft">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveSafetyTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeSafetyTab === 'overview' ? 'bg-terracotta-500 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Safety Hub</span>
          </button>

          <button
            onClick={() => setActiveSafetyTab('location')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeSafetyTab === 'location' ? 'bg-terracotta-500 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Where Am I?</span>
          </button>

          <button
            onClick={() => setActiveSafetyTab('take_me_home')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeSafetyTab === 'take_me_home' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>Take Me Home</span>
          </button>

          <button
            onClick={() => setActiveSafetyTab('sos')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeSafetyTab === 'sos' ? 'bg-red-600 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency SOS</span>
          </button>

          <button
            onClick={() => setActiveSafetyTab('places')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeSafetyTab === 'places' ? 'bg-terracotta-500 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>My Places</span>
          </button>
        </div>

        {/* Live / Offline Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-sand-100 rounded-xl text-xs font-bold text-stone-700">
          {isOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span>Offline (Last Known GPS)</span>
            </>
          ) : (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live GPS Active</span>
            </>
          )}
        </div>
      </div>

      {/* 1. MISSING PATIENT / AWAY FROM HOME BANNER (If active or away) */}
      {!location.isHome && (
        <div className="bg-amber-500 text-stone-950 p-6 rounded-3xl border-4 border-amber-400 shadow-xl space-y-3 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-amber-950">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
              <span>You are currently away from home</span>
            </div>
            <span className="bg-stone-950 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded-full">
              {location.distanceFromHomeKm} km from home
            </span>
          </div>

          <p className="text-xl sm:text-2xl font-black text-stone-950">
            “Do you need help getting back to your Guwahati residence?”
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveSafetyTab('take_me_home')}
              className="py-4 px-6 bg-stone-950 hover:bg-black text-white font-black rounded-2xl text-base sm:text-lg flex items-center gap-2 shadow-lg active:scale-95 flex-1 justify-center"
            >
              <Navigation className="w-6 h-6 text-emerald-400" />
              <span>Take Me Home Now</span>
            </button>

            <button
              onClick={() => setActiveSafetyTab('sos')}
              className="py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-base sm:text-lg flex items-center gap-2 shadow-lg active:scale-95"
            >
              <PhoneCall className="w-6 h-6" />
              <span>Call Family</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: OVERVIEW HUB */}
      {activeSafetyTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Quick Location Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sand-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-terracotta-700 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-terracotta-600" />
                <span>My Current Location</span>
              </div>
              <span className="text-[11px] font-bold text-stone-500">
                {isOffline ? 'Updated 18m ago' : 'Live Updated'}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-stone-900 leading-tight">
                {location.isHome ? 'You are at Home' : 'Outside Usual Area'}
              </h3>
              <p className="text-sm text-stone-600 mt-1 font-medium">
                {location.address}
              </p>
            </div>

            <button
              onClick={() => setActiveSafetyTab('location')}
              className="w-full py-3.5 bg-sand-100 hover:bg-sand-200 text-stone-900 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition"
            >
              <span>View Map & Nearby Places</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick SOS Card */}
          <div className="bg-red-50 rounded-3xl p-6 border-2 border-red-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-red-700 uppercase tracking-wider">
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Emergency Two-Contact SOS</span>
              </div>
              <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                Meera ➔ Rahul
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-stone-900 leading-tight">
                Need Help Right Away?
              </h3>
              <p className="text-sm text-stone-600 mt-1 font-medium">
                Calls Meera first. If unavailable, automatically dials Rahul and sends location.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveSafetyTab('sos');
                startSosFlow();
              }}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow transition active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Activate Emergency SOS</span>
            </button>
          </div>

          {/* Connected Wearable / GPS Tag Status */}
          <div className="md:col-span-2 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 border border-stone-700 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Watch className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h4 className="font-black text-base text-stone-100">
                    {smartbandMetrics.deviceName}
                  </h4>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {smartbandMetrics.connected ? 'Connected' : 'Last Seen 12m ago'}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Phone-independent safety layer: Real-time GPS beacon & emergency trigger.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono font-bold text-stone-300">
              <div className="text-center bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700">
                <span className="text-[10px] text-stone-400 block font-sans">Battery</span>
                <span className="text-emerald-400">{smartbandMetrics.batteryLevel}%</span>
              </div>
              <div className="text-center bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700">
                <span className="text-[10px] text-stone-400 block font-sans">Heart Rate</span>
                <span className="text-amber-300">{smartbandMetrics.heartRateBpm} bpm</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: WHERE AM I? (MAP EXPERIENCE) */}
      {activeSafetyTab === 'location' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                {t.whereAmITitle}
              </h3>
              <p className="text-sm text-stone-600 font-medium mt-0.5">
                Current GPS position and important nearby landmarks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-8 h-8 text-terracotta-600 animate-spin duration-1000" />
            </div>
          </div>

          {/* Interactive Simulated Vector Map */}
          <div className="relative w-full h-80 rounded-3xl bg-slate-900 border-4 border-sand-200 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Map Roads / Topology Graphics */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-700 stroke-[3] fill-none">
              <path d="M 0 160 Q 200 120 400 160 T 800 140" />
              <path d="M 180 0 Q 220 200 240 400" />
              <path d="M 0 260 L 800 220" />
              <path d="M 450 0 L 420 400" />
            </svg>

            {/* Home Marker */}
            <div className="absolute top-24 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-emerald-400/30">
                <Home className="w-6 h-6" />
              </div>
              <span className="bg-emerald-950/90 text-emerald-200 text-xs font-bold px-2 py-0.5 rounded-md mt-1 shadow">
                Home (Chandmari)
              </span>
            </div>

            {/* Asha's Current Marker */}
            <div className={`absolute ${location.isHome ? 'top-24 left-1/3' : 'bottom-20 right-1/4'} -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20`}>
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-terracotta-500 text-white flex items-center justify-center shadow-2xl border-4 border-white animate-bounce">
                  <MapPin className="w-8 h-8 fill-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-terracotta-400 animate-ping opacity-40 pointer-events-none" />
              </div>
              <span className="bg-stone-900 text-amber-300 text-xs font-black px-3 py-1 rounded-full mt-1.5 shadow-xl border border-amber-400/30">
                YOU ARE HERE
              </span>
            </div>

            {/* Hospital / Clinic Marker */}
            <div className="absolute top-16 right-16 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow border-2 border-white">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="bg-slate-900/80 text-blue-200 text-[10px] font-bold px-2 py-0.5 rounded mt-1">
                Dr. Barua Clinic
              </span>
            </div>

            {/* Bottom Status Overlay */}
            <div className="absolute bottom-3 left-3 right-3 bg-stone-950/90 backdrop-blur-md p-3 rounded-2xl border border-stone-700 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="font-bold truncate">{location.address}</span>
              </div>
              <span className="text-[11px] text-stone-400 shrink-0 font-mono">
                {location.isHome ? 'Safe at Home' : `${location.distanceFromHomeKm} km away`}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSafetyTab('take_me_home')}
              className="flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-base flex items-center justify-center gap-2 shadow active:scale-95"
            >
              <Navigation className="w-5 h-5" />
              <span>{t.takeMeHomeBtn}</span>
            </button>

            <button
              onClick={() => setActiveSafetyTab('sos')}
              className="py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-base flex items-center justify-center gap-2 shadow active:scale-95"
            >
              <PhoneCall className="w-5 h-5" />
              <span>{t.sosEmergencyBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: TAKE ME HOME NAVIGATION GUIDANCE */}
      {activeSafetyTab === 'take_me_home' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">
                Step-by-Step Walking Directions
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                Take Me Home
              </h3>
            </div>
            <button
              onClick={() => handleReadNavStep(navigationSteps[currentNavStep].voicePrompt)}
              className="p-3 bg-sand-100 hover:bg-sand-200 text-terracotta-600 rounded-2xl transition"
              title="Voice directions"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Prominent Current Navigation Step Card */}
          <div className="bg-emerald-50 border-3 border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between text-xs font-black text-emerald-800">
              <span>STEP {currentNavStep + 1} OF {navigationSteps.length}</span>
              <span>{navigationSteps[currentNavStep].distanceMeters}m remaining</span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shrink-0">
                <Navigation className="w-8 h-8 rotate-45" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                  {navigationSteps[currentNavStep].instruction}
                </h4>
                <p className="text-sm text-stone-600 font-medium">
                  {navigationSteps[currentNavStep].voicePrompt}
                </p>
              </div>
            </div>

            {/* Navigation Progress Dots */}
            <div className="flex items-center justify-between pt-4">
              <button
                disabled={currentNavStep === 0}
                onClick={() => setCurrentNavStep(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-white text-stone-700 font-bold rounded-xl text-xs disabled:opacity-40 border border-sand-300"
              >
                Previous Step
              </button>

              <div className="flex items-center gap-1.5">
                {navigationSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentNavStep ? 'w-8 bg-emerald-600' : 'bg-emerald-200'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (currentNavStep < navigationSteps.length - 1) {
                    setCurrentNavStep(prev => prev + 1);
                    handleReadNavStep(navigationSteps[currentNavStep + 1].voicePrompt);
                  }
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition active:scale-95"
              >
                {currentNavStep === navigationSteps.length - 1 ? '✓ At Home' : 'Next Step ➔'}
              </button>
            </div>
          </div>

          <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex items-center justify-between text-xs text-stone-700">
            <span>Destination: <strong>House 14, Rajgarh Road (Priya & Family)</strong></span>
            <button
              onClick={() => setActiveSafetyTab('sos')}
              className="text-red-600 font-bold hover:underline"
            >
              Need someone to pick you up?
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: TWO-CONTACT SOS FALLBACK SIMULATION */}
      {activeSafetyTab === 'sos' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-red-700 tracking-wider">
                Two-Contact Fallback Safety Sequence
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                Emergency SOS Assistance
              </h3>
            </div>
            {sosStep !== 'idle' && (
              <button
                onClick={resetSosFlow}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>

          {/* Visual Step Simulation Flow */}
          <div className="bg-red-50 border-3 border-red-200 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {sosStep === 'idle' && (
              <div className="text-center space-y-4 py-4">
                <div className="w-20 h-20 rounded-full bg-red-600 text-white mx-auto flex items-center justify-center shadow-xl">
                  <PhoneCall className="w-10 h-10 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-black text-stone-900">
                    Press to Call Emergency Contacts
                  </h4>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    The platform will call <strong>Meera (Daughter)</strong> first. If she is unavailable, it automatically switches to <strong>Rahul (Son)</strong> and transmits your exact location.
                  </p>
                </div>

                <button
                  onClick={startSosFlow}
                  className="py-5 px-10 bg-red-600 hover:bg-red-700 text-white font-black text-xl rounded-2xl shadow-2xl transition active:scale-95 inline-flex items-center gap-3"
                >
                  <PhoneCall className="w-7 h-7" />
                  <span>START EMERGENCY SOS NOW</span>
                </button>
              </div>
            )}

            {sosStep === 'calling_meera' && (
              <div className="text-center space-y-4 py-4 animate-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-amber-500 text-stone-950 mx-auto flex items-center justify-center shadow-xl animate-pulse">
                  <PhoneCall className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-amber-800 uppercase tracking-wider">Step 1 in Progress</span>
                  <h4 className="text-3xl font-black text-stone-900">
                    Calling Meera (Daughter)...
                  </h4>
                  <p className="text-sm text-stone-600 font-mono">
                    Dialing +91 94350 12345 • Ringing...
                  </p>
                </div>
              </div>
            )}

            {sosStep === 'meera_failed' && (
              <div className="text-center space-y-4 py-4 animate-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-stone-700 text-white mx-auto flex items-center justify-center shadow-xl">
                  <Clock className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-red-700 uppercase tracking-wider">Contact 1 Unavailable</span>
                  <h4 className="text-2xl font-black text-stone-900">
                    No Response from Meera. Switching...
                  </h4>
                  <p className="text-sm text-stone-600">
                    Automatically routing to Secondary Contact (Rahul Sharma)...
                  </p>
                </div>
              </div>
            )}

            {sosStep === 'calling_rahul' && (
              <div className="text-center space-y-4 py-4 animate-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-cyan-600 text-white mx-auto flex items-center justify-center shadow-xl animate-pulse">
                  <PhoneCall className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-cyan-800 uppercase tracking-wider">Step 2: Fallback Activated</span>
                  <h4 className="text-3xl font-black text-stone-900">
                    Calling Rahul (Son)...
                  </h4>
                  <p className="text-sm text-stone-600 font-mono">
                    Dialing +91 98640 67890 • Ringing...
                  </p>
                </div>
              </div>
            )}

            {sosStep === 'connected_rahul' && (
              <div className="space-y-6 py-2 animate-in zoom-in-95">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-black text-emerald-800">
                    Connected with Rahul!
                  </h4>
                  <p className="text-sm text-stone-700 font-medium">
                    Rahul has answered the emergency call. Speak naturally to him.
                  </p>
                </div>

                {/* Simulated Location SMS Payload */}
                {generatedSosSms && (
                  <div className="bg-white rounded-2xl p-4 border-2 border-emerald-300 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase">
                      <Send className="w-4 h-4 text-emerald-600" />
                      <span>Automatic Emergency Location SMS Generated</span>
                    </div>
                    <p className="font-mono text-xs text-stone-800 bg-sand-50 p-3 rounded-xl border border-sand-200">
                      “{generatedSosSms}”
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Emergency Contact List */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-stone-900 uppercase tracking-wider">
              Configured Emergency Fallback Contacts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emergencyContacts.map(contact => (
                <div
                  key={contact.id}
                  className="bg-sand-50 p-4 rounded-2xl border border-sand-200 flex items-center gap-3.5"
                >
                  <img
                    src={contact.photoUrl}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-black text-sm text-stone-900">{contact.name}</h5>
                      <span className="text-[10px] font-bold bg-sand-200 text-stone-700 px-1.5 py-0.2 rounded">
                        {contact.isPrimary ? 'Primary' : 'Fallback'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">{contact.relationship}</p>
                    <p className="text-xs font-mono font-bold text-terracotta-700 mt-0.5">{contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MY PLACES */}
      {activeSafetyTab === 'places' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sand-200 shadow-soft space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              My Familiar Places
            </h3>
            <p className="text-sm text-stone-600 font-medium mt-0.5">
              Important family homes, doctor clinics, and pharmacies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {places.map(place => (
              <div
                key={place.id}
                className="bg-sand-50 rounded-2xl p-5 border border-sand-200 hover:border-terracotta-300 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                      {place.category === 'home' && <Home className="w-5 h-5" />}
                      {place.category === 'doctor' && <Stethoscope className="w-5 h-5" />}
                      {place.category === 'hospital' && <Building2 className="w-5 h-5" />}
                      {place.category === 'pharmacy' && <Pill className="w-5 h-5" />}
                      {place.category === 'family' && <Heart className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-black text-base text-stone-900">{place.name}</h4>
                      <p className="text-xs text-stone-600">{place.address}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-sand-200 px-2.5 py-1 rounded-lg text-stone-800 shrink-0">
                    {place.distanceKm === 0 ? 'Here' : `${place.distanceKm} km`}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveSafetyTab('take_me_home')}
                    className="flex-1 py-2 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Navigate</span>
                  </button>

                  {place.phone && (
                    <a
                      href={`tel:${place.phone.replace(/\s+/g, '')}`}
                      className="py-2 px-4 bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 border border-terracotta-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
