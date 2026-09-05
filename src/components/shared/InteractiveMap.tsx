import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Home, 
  Stethoscope, 
  Building2, 
  Pill, 
  Heart, 
  Navigation, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Compass,
  AlertTriangle
} from 'lucide-react';

interface InteractiveMapProps {
  heightClass?: string;
  showNavigationRoute?: boolean;
  onSelectPlace?: (place: any) => void;
  compact?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  heightClass = "h-72 sm:h-80",
  showNavigationRoute = true,
  onSelectPlace,
  compact = false
}) => {
  const { location, places, isOffline } = useApp();
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Guwahati Center Coordinates
  // Home: (26.1834, 91.7656)
  // GS Road Away: (26.1550, 91.7820)
  const isAway = !location.isHome;

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl sm:rounded-3xl bg-[#0f172a] border-2 sm:border-3 border-stone-700 overflow-hidden shadow-inner select-none`}>
      
      {/* Real-world OpenStreetMap Tile Layer + Dark/Warm Map Styling */}
      <div 
        className="absolute inset-0 opacity-80 transition-all duration-300 pointer-events-none"
        style={{
          backgroundImage: `url('https://tile.openstreetmap.org/14/12368/7058.png')`,
          backgroundSize: 'cover',
          backgroundPosition: isAway ? '60% 70%' : '45% 40%',
          filter: 'contrast(1.15) saturate(1.2) brightness(0.85)'
        }}
      />

      {/* Grid Pattern Overlay for Futuristic/Clean Tech Feel */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

      {/* SVG Topology & Road Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-amber-300/60 stroke-[3] fill-none">
        {/* Main Road Lines */}
        <path d="M 40 180 Q 200 130 380 180 T 700 160" strokeDasharray="6 4" />
        <path d="M 180 30 Q 210 200 230 360" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.4" />
        
        {/* Animated Navigation Path from Away Spot to Home */}
        {isAway && showNavigationRoute && (
          <path 
            d="M 280 230 C 230 180, 190 140, 130 90" 
            stroke="#10b981" 
            strokeWidth="5" 
            strokeLinecap="round"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Safe Geofence Perimeter Circle (500m Safe Zone around Home) */}
      <div className="absolute top-[80px] left-[130px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-36 h-36 rounded-full border-2 border-dashed border-emerald-400/70 bg-emerald-500/10 animate-pulse flex items-center justify-center">
          <span className="text-[9px] font-black uppercase text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full shadow">
            500m Safe Zone
          </span>
        </div>
      </div>

      {/* MARKER 1: Home (Chandmari, Guwahati) */}
      <div 
        onClick={() => {
          setSelectedMarker('home');
          onSelectPlace?.(places[0]);
        }}
        className="absolute top-[80px] left-[130px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
      >
        <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl border-2 border-white ring-4 ring-emerald-500/30 group-hover:scale-110 transition">
          <Home className="w-5 h-5" />
        </div>
        <span className="bg-emerald-950/90 text-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-md mt-1 shadow border border-emerald-500/40 whitespace-nowrap">
          🏡 Home (Chandmari)
        </span>
      </div>

      {/* MARKER 2: Asha's Current GPS Position */}
      <div 
        className={`absolute ${
          isAway ? 'top-[230px] left-[280px]' : 'top-[80px] left-[130px]'
        } -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 transition-all duration-500`}
      >
        <div className="relative">
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-terracotta-600 to-amber-500 text-white flex items-center justify-center shadow-2xl border-3 border-white animate-bounce">
            <MapPin className="w-7 h-7 fill-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-40 pointer-events-none" />
        </div>
        <span className="bg-stone-950 text-amber-300 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full mt-1 shadow-2xl border border-amber-400/50 whitespace-nowrap">
          📍 ASHA IS HERE
        </span>
      </div>

      {/* MARKER 3: Dr. Barua Clinic */}
      <div 
        onClick={() => {
          setSelectedMarker('doctor');
          onSelectPlace?.(places[1]);
        }}
        className="absolute top-[40px] right-[40px] flex flex-col items-center cursor-pointer group z-20"
      >
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow border-2 border-white group-hover:scale-110 transition">
          <Stethoscope className="w-4 h-4" />
        </div>
        <span className="bg-slate-900/90 text-blue-200 text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 border border-blue-500/30 whitespace-nowrap">
          Dr. Barua Clinic (0.9km)
        </span>
      </div>

      {/* MARKER 4: Sanjivani Pharmacy */}
      <div 
        onClick={() => {
          setSelectedMarker('pharmacy');
          onSelectPlace?.(places[3]);
        }}
        className="absolute bottom-[35px] left-[40px] flex flex-col items-center cursor-pointer group z-20"
      >
        <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shadow border-2 border-white group-hover:scale-110 transition">
          <Pill className="w-4 h-4" />
        </div>
        <span className="bg-slate-900/90 text-purple-200 text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 border border-purple-500/30 whitespace-nowrap">
          Pharmacy (0.6km)
        </span>
      </div>

      {/* Top Map Status Bar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-30 pointer-events-none">
        <div className="bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-stone-700 flex items-center gap-2 text-[10px] text-white pointer-events-auto">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span className="font-bold font-mono">
            {location.isHome ? 'Status: Safe at Home' : `Status: Away (${location.distanceFromHomeKm} km)`}
          </span>
        </div>

        <div className="bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-stone-700 flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isOffline ? 'Offline GPS Cached' : 'Live GPS Beacon'}</span>
        </div>
      </div>

      {/* Bottom Address HUD Banner */}
      <div className="absolute bottom-2 left-2 right-2 bg-stone-950/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-stone-700 flex items-center justify-between gap-2 text-white z-30">
        <div className="min-w-0">
          <div className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">
            Current GPS Fix
          </div>
          <div className="text-xs font-bold truncate text-stone-100">
            {location.address}
          </div>
        </div>

        {isAway && (
          <span className="shrink-0 bg-red-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-lg animate-pulse flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Outside Geofence</span>
          </span>
        )}
      </div>

    </div>
  );
};
