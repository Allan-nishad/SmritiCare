import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppRole,
  MobileTab,
  DeviceFrameStyle,
  LanguageCode,
  RoutineItem,
  CognitiveSessionResult,
  FamilyMemberMemory,
  BaselineMetric,
  CaregiverAlert,
  PatientProfile,
  EmergencyContact,
  SosStep,
  LocationCoordinates,
  PlaceLocation,
  NavigationStep,
  SmartbandMetrics,
  MusicTrack,
  ProfileCompletionItem,
  SyncQueueItem,
  TelemetryLogItem,
  RemotePushReminder,
  AlarmOverlayState
} from '../types';
import { sounds, speakText } from '../utils/audio';

interface AppContextType {
  role: AppRole;
  setRole: (role: AppRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  patient: PatientProfile;
  routines: RoutineItem[];
  toggleRoutine: (id: string) => void;
  snoozeRoutine: (id: string) => void;
  addRoutineItem: (item: Omit<RoutineItem, 'id' | 'completed'>) => void;
  updateRoutinePriority: (id: string, priority: 'normal' | 'important' | 'critical') => void;
  
  // Cognitive Games & Sessions
  cognitiveSessions: CognitiveSessionResult[];
  recordCognitiveSession: (session: Omit<CognitiveSessionResult, 'id' | 'timestamp'>) => CognitiveSessionResult;
  familyMemories: FamilyMemberMemory[];
  addFamilyMemory: (memory: Omit<FamilyMemberMemory, 'id'>) => void;
  baselineMetrics: BaselineMetric[];
  caregiverAlerts: CaregiverAlert[];
  dismissAlert: (id: string) => void;
  markAlertAction: (id: string) => void;
  
  // Alarm & Snooze Overlay System (Specification 8 & 9)
  alarmOverlay: AlarmOverlayState | null;
  triggerAlarm: (routineId?: string) => void;
  dismissAlarm: (completed: boolean) => void;
  snoozeAlarm: () => void;

  // SOS 2-Contact Fallback System (Specification 3)
  sosStep: SosStep;
  emergencyContacts: EmergencyContact[];
  startSosFlow: () => void;
  resetSosFlow: () => void;
  generatedSosSms: string | null;

  // Location & Safety (Specification 4, 5, 6, 7, 32, 33, 34)
  location: LocationCoordinates;
  places: PlaceLocation[];
  navigationSteps: NavigationStep[];
  isMissingPatientScenario: boolean;
  setIsMissingPatientScenario: (isMissing: boolean) => void;
  smartbandMetrics: SmartbandMetrics;
  toggleSmartbandConnection: () => void;

  // Music Player System (Specification 23)
  musicTracks: MusicTrack[];
  currentTrackIndex: number;
  isPlayingMusic: boolean;
  togglePlayMusic: () => void;
  nextTrack: () => void;
  prevTrack: () => void;

  // Profile Completion & Personalization (Specification 27)
  profileCompletionItems: ProfileCompletionItem[];
  profileCompletionPercentage: number;

  // Offline Engine (Specification 31 & 32)
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  syncQueue: SyncQueueItem[];
  isSyncing: boolean;
  syncProgressStep: number;
  lastSyncedTime: string;
  triggerSync: () => Promise<void>;
  
  // Voice Assistant & Tour
  isVoiceOpen: boolean;
  setIsVoiceOpen: (open: boolean) => void;
  activeGameTab: 'memory_match' | 'pattern_sequence' | 'word_association' | 'shape_match' | 'mini_sudoku';
  setActiveGameTab: (tab: 'memory_match' | 'pattern_sequence' | 'word_association' | 'shape_match' | 'mini_sudoku') => void;
  activeSafetyTab: 'overview' | 'location' | 'sos' | 'take_me_home' | 'places';
  setActiveSafetyTab: (tab: 'overview' | 'location' | 'sos' | 'take_me_home' | 'places') => void;
  activePatientTab: 'home' | 'games' | 'memories' | 'routine' | 'safety';
  setActivePatientTab: (tab: 'home' | 'games' | 'memories' | 'routine' | 'safety') => void;

  // Mobile Prototype Mode
  mobileTab: MobileTab;
  setMobileTab: (tab: MobileTab) => void;
  deviceFrame: DeviceFrameStyle;
  setDeviceFrame: (frame: DeviceFrameStyle) => void;
  mobileSubRole: 'patient' | 'caregiver';
  setMobileSubRole: (role: 'patient' | 'caregiver') => void;

  // Live Sync & Telemetry Logs
  telemetryLogs: TelemetryLogItem[];
  addTelemetryLog: (item: Omit<TelemetryLogItem, 'id' | 'timestamp'>) => void;

  // Push Reminders (Priya -> Asha)
  activePushReminder: RemotePushReminder | null;
  sendPushReminder: (reminder: Omit<RemotePushReminder, 'id' | 'timestamp'>) => void;
  acknowledgePushReminder: (id: string) => void;
  dismissPushReminder: () => void;
  latestPushAcknowledgement: string | null;

  // Tour & Simulation Aliases
  demoTourStep: number;
  setDemoTourStep: (step: number) => void;
  isDemoTourActive: boolean;
  setIsDemoTourActive: (active: boolean) => void;
  triggerSimulationEvent: (eventType: 'morning_med' | 'memory_game' | 'sos_help' | 'hydration') => void;

  // Evaluator Simulation Center Triggers (Specification 39)
  activeSimulation: { scenario: string; title: string; subtitle: string; timestamp: string; stepDetails: string[] } | null;
  setActiveSimulation: (sim: { scenario: string; title: string; subtitle: string; timestamp: string; stepDetails: string[] } | null) => void;
  triggerSimulation: (scenario: 
    | 'alarm_medicine' 
    | 'snooze_x3' 
    | 'sos_fallback' 
    | 'missing_patient' 
    | 'take_me_home' 
    | 'offline_toggle' 
    | 'sync_reconcile' 
    | 'game_adaptive_up' 
    | 'smartband_pulse' 
    | 'lang_assamese' 
    | 'family_voice_push'
  ) => void;
}

const initialPatient: PatientProfile = {
  name: "Asha Devi",
  age: 72,
  location: "Guwahati / Jorhat, Assam",
  nativeLanguage: "as",
  caregiverName: "Priya",
  caregiverRelationship: "Family Caregiver / Daughter-in-law",
  recentBaselineSummary: "Engaged and responsive. Morning cognitive recall is 14% higher than afternoon sessions.",
  lastActiveMinutesAgo: 4,
  bloodGroup: "O+",
  emergencyDoctor: "Dr. B. K. Barua (Cardiologist)"
};

const initialEmergencyContacts: EmergencyContact[] = [
  {
    id: 'c1',
    name: 'Meera Devi',
    relationship: 'Daughter (Teacher in Tezpur)',
    phone: '+91 94350 12345',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    isPrimary: true,
    voiceGender: 'female'
  },
  {
    id: 'c2',
    name: 'Rahul Sharma',
    relationship: 'Son (Engineer in Guwahati)',
    phone: '+91 98640 67890',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    isPrimary: false,
    voiceGender: 'male'
  }
];

const initialPlaces: PlaceLocation[] = [
  {
    id: 'p1',
    name: 'Guwahati Residence (Home)',
    category: 'home',
    address: 'House 14, Rajgarh Road, Chandmari, Guwahati, Assam',
    distanceKm: 0,
    phone: '+91 94350 12345',
    coordinates: { lat: 26.1834, lng: 91.7656 },
    iconName: 'Home'
  },
  {
    id: 'p2',
    name: 'Dr. Barua Healthcare Clinic',
    category: 'doctor',
    address: 'Opposite Guwahati Club, G.S. Road, Guwahati',
    distanceKm: 0.9,
    phone: '+91 98640 11223',
    coordinates: { lat: 26.1780, lng: 91.7580 },
    iconName: 'Stethoscope'
  },
  {
    id: 'p3',
    name: 'Dispur Supercare Hospital',
    category: 'hospital',
    address: 'Ganeshguri Chariali, Dispur, Guwahati',
    distanceKm: 2.8,
    phone: '+91 361 2234567',
    coordinates: { lat: 26.1445, lng: 91.7862 },
    iconName: 'Building2'
  },
  {
    id: 'p4',
    name: 'Sanjivani Medicos (Pharmacy)',
    category: 'pharmacy',
    address: 'Silpukhuri Main Market, Guwahati',
    distanceKm: 0.6,
    phone: '+91 98640 99887',
    coordinates: { lat: 26.1890, lng: 91.7710 },
    iconName: 'Pill'
  },
  {
    id: 'p5',
    name: 'Meera’s House (Tezpur)',
    category: 'family',
    address: 'Mission Chariali, Tezpur, Sonitpur, Assam',
    distanceKm: 175,
    phone: '+91 94350 12345',
    coordinates: { lat: 26.6338, lng: 92.7926 },
    iconName: 'Heart'
  }
];

const initialNavigationSteps: NavigationStep[] = [
  {
    instruction: "Walk straight along R.G. Baruah Road towards Chandmari",
    distanceMeters: 400,
    icon: 'straight',
    voicePrompt: "Asha, walk straight along this shaded footpath for 400 meters."
  },
  {
    instruction: "Turn right at the Tea Stall corner into Rajgarh By-lane 3",
    distanceMeters: 250,
    icon: 'turn-right',
    voicePrompt: "Turn right near the tea stall into your familiar home lane."
  },
  {
    instruction: "Walk 150 meters to Green Gate House #14",
    distanceMeters: 150,
    icon: 'straight',
    voicePrompt: "Your home with the green gate is just ahead on the left."
  },
  {
    instruction: "Arrived safely at Home. Priya is waiting on the veranda.",
    distanceMeters: 0,
    icon: 'destination',
    voicePrompt: "You have arrived home safely, Asha!"
  }
];

const initialMusicTracks: MusicTrack[] = [
  {
    id: 't1',
    title: 'Borxunor Gaan (Veranda Rain Flute)',
    artist: 'Traditional Assam Folk Synth',
    category: 'flute',
    duration: '3:45',
    notes: 'Peaceful morning flute evoking Jorhat tea garden breeze'
  },
  {
    id: 't2',
    title: 'Brahmaputra Serenade',
    artist: 'Gentle River Chords',
    category: 'river_ambient',
    duration: '4:10',
    notes: 'Soothing water flow harmonics for calm relaxation'
  },
  {
    id: 't3',
    title: 'Magh Bihu Folk Memory',
    artist: 'Cultural Reminiscence Melody',
    category: 'bihu',
    duration: '3:20',
    notes: 'Joyful nostalgic notes of Bihu festival'
  }
];

const initialRoutines: RoutineItem[] = [
  {
    id: 'r1',
    time: '08:30 AM',
    title: 'Morning Blood Pressure Medicine',
    subtitle: '1 tablet of Telmisartan (40mg) with warm water',
    category: 'medicine',
    completed: true,
    completedAt: '08:42 AM',
    priority: 'critical',
    icon: 'Pill',
    dosageOrNotes: 'Take with light breakfast'
  },
  {
    id: 'r2',
    time: '10:00 AM',
    title: 'Morning Memory & Orientation Activity',
    subtitle: 'SmritiCare Culturally Familiar Match session',
    category: 'activity',
    completed: false,
    priority: 'important',
    icon: 'Brain',
    dosageOrNotes: '5-8 mins gentle recall'
  },
  {
    id: 'r3',
    time: '11:30 AM',
    title: 'Hydration & Lemon Honey Water',
    subtitle: '1 glass of warm lemon water from Assam citron',
    category: 'hydration',
    completed: false,
    priority: 'normal',
    icon: 'Droplets',
    dosageOrNotes: 'Keep hydrated before noon'
  },
  {
    id: 'r4',
    time: '01:00 PM',
    title: 'Nutritious Lunch & Joha Rice',
    subtitle: 'Steamed Joha rice, dal, and fresh garden greens',
    category: 'meal',
    completed: false,
    priority: 'normal',
    icon: 'UtensilsCrossed',
    dosageOrNotes: 'Traditional home-cooked meal'
  },
  {
    id: 'r5',
    time: '04:00 PM',
    title: 'Appointment: Dr. Barua Consultation',
    subtitle: 'Routine blood pressure review & checkup',
    category: 'appointment',
    completed: false,
    priority: 'critical',
    icon: 'Calendar',
    doctorName: 'Dr. B. K. Barua',
    locationName: 'Guwahati Club Clinic'
  },
  {
    id: 'r6',
    time: '05:30 PM',
    title: 'Veranda Walk & Marigold Flowers',
    subtitle: '10-minute stroll in the courtyard garden',
    category: 'walk',
    completed: false,
    priority: 'normal',
    icon: 'Footprints',
    dosageOrNotes: 'Gentle mobility exercise'
  }
];

const initialMemories: FamilyMemberMemory[] = [
  {
    id: 'm1',
    name: 'Meera',
    relationship: 'Daughter (Teacher in Tezpur)',
    location: 'Tezpur, Assam',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    audioNoteText: '“Ma, remember when we used to make Narikol Laru together for Magh Bihu in Jorhat? I will visit you this Sunday!”',
    storySnippet: 'Meera is your eldest daughter. She loves tea garden walks and teaches high school mathematics in Tezpur.',
    favoriteMemory: 'Making sweet coconut laru together during Magh Bihu festival in Jorhat.',
    keyYear: '2023 Festival',
    familiarObject: 'Traditional brass bowl (Kahi Bati)',
    voiceGender: 'female'
  },
  {
    id: 'm2',
    name: 'Rahul',
    relationship: 'Son (Engineer in Guwahati)',
    location: 'Guwahati, Assam',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    audioNoteText: '“Ma, I brought you the fresh red tea leaves from Doomdooma. Let’s sit together on the veranda.”',
    storySnippet: 'Rahul lives 10 minutes away and visits you every evening with Priya and little Aarav.',
    favoriteMemory: 'Planting marigolds and orchids in the front garden.',
    keyYear: '1998 & Current',
    familiarObject: 'Assam Tea Pot (Kettle)',
    voiceGender: 'male'
  },
  {
    id: 'm3',
    name: 'Aarav',
    relationship: 'Grandson (Age 8)',
    location: 'Guwahati, Assam',
    photoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=600',
    audioNoteText: '“Aita (Grandma), tell me the story of the Kaziranga Rhinoceros and the wise river dolphin again!”',
    storySnippet: 'Aarav loves reading folklore stories with you in the afternoon sunshine.',
    favoriteMemory: 'Drawing the Brahmaputra ferry boat together.',
    keyYear: 'Present Day',
    familiarObject: 'Wooden Rhino Toy',
    voiceGender: 'female'
  },
  {
    id: 'm4',
    name: 'Ancestral Jorhat Home',
    relationship: 'Family Homestead & Tea Garden',
    location: 'Jorhat, Upper Assam',
    photoUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&q=80&w=600',
    audioNoteText: '“The peaceful scent of fresh tea leaves and rain on the tin roof of our veranda in Jorhat.”',
    storySnippet: 'Where you lived with your husband Dr. Barua for 38 years surrounded by lush areca palms.',
    favoriteMemory: 'Listening to Bhupen Hazarika songs while morning tea was brewing.',
    keyYear: '1975 - 2013',
    familiarObject: 'Eri Silk Shawl (Gamosa)',
    voiceGender: 'female'
  }
];

const initialSessions: CognitiveSessionResult[] = [
  {
    id: 'cs-1',
    gameType: 'memory_match',
    gameTitle: 'Familiar Memory Match',
    timestamp: '7 days ago',
    durationSeconds: 140,
    totalAttempts: 12,
    accuracyPercentage: 68,
    difficulty: 'level_1',
    responseAverageSeconds: 13.2,
    hintsUsed: 3,
    adaptiveDecision: {
      ruleApplied: 'Baseline Calibration (Day 1)',
      explanation: 'Established initial baseline response time and pair association speed.',
      nextRecommendedDifficulty: 'level_1',
      nextGameType: 'memory_match'
    }
  },
  {
    id: 'cs-2',
    gameType: 'memory_match',
    gameTitle: 'Familiar Memory Match',
    timestamp: '6 days ago',
    durationSeconds: 124,
    totalAttempts: 10,
    accuracyPercentage: 71,
    difficulty: 'level_1',
    responseAverageSeconds: 12.1,
    hintsUsed: 2,
    adaptiveDecision: {
      ruleApplied: 'Gentle Repetition Confirmation',
      explanation: 'Response time improved by 8%. Kept difficulty steady to build confidence.',
      nextRecommendedDifficulty: 'level_1',
      nextGameType: 'pattern_sequence'
    }
  },
  {
    id: 'cs-3',
    gameType: 'pattern_sequence',
    gameTitle: 'Daily Rhythm Pattern',
    timestamp: '5 days ago',
    durationSeconds: 110,
    totalAttempts: 8,
    accuracyPercentage: 70,
    difficulty: 'level_2',
    responseAverageSeconds: 12.0,
    hintsUsed: 2,
    adaptiveDecision: {
      ruleApplied: 'Multi-modal Consistency Rule',
      explanation: 'Stable sequence recall maintained across visual icon patterns.',
      nextRecommendedDifficulty: 'level_2',
      nextGameType: 'word_association'
    }
  },
  {
    id: 'cs-4',
    gameType: 'word_association',
    gameTitle: 'Word & Object Connections',
    timestamp: '4 days ago',
    durationSeconds: 98,
    totalAttempts: 7,
    accuracyPercentage: 74,
    difficulty: 'level_2',
    responseAverageSeconds: 11.2,
    hintsUsed: 1,
    adaptiveDecision: {
      ruleApplied: 'Positive Confidence Advance',
      explanation: 'High semantic association accuracy. Smooth transition to 6-item pairs.',
      nextRecommendedDifficulty: 'level_2',
      nextGameType: 'shape_match'
    }
  },
  {
    id: 'cs-5',
    gameType: 'shape_match',
    gameTitle: 'Soothing Shape Match',
    timestamp: '3 days ago',
    durationSeconds: 90,
    totalAttempts: 7,
    accuracyPercentage: 78,
    difficulty: 'level_2',
    responseAverageSeconds: 10.4,
    hintsUsed: 1,
    adaptiveDecision: {
      ruleApplied: 'Medium Tier Stabilization',
      explanation: 'Handled shape categories seamlessly without fatigue signals.',
      nextRecommendedDifficulty: 'level_3',
      nextGameType: 'memory_match'
    }
  },
  {
    id: 'cs-6',
    gameType: 'memory_match',
    gameTitle: 'Familiar Memory Match',
    timestamp: '2 days ago',
    durationSeconds: 84,
    totalAttempts: 6,
    accuracyPercentage: 80,
    difficulty: 'level_3',
    responseAverageSeconds: 9.8,
    hintsUsed: 1,
    adaptiveDecision: {
      ruleApplied: 'Peak Engagement Trend',
      explanation: 'Prompt recognition with under 10s average response time.',
      nextRecommendedDifficulty: 'level_3',
      nextGameType: 'mini_sudoku'
    }
  },
  {
    id: 'cs-7',
    gameType: 'memory_match',
    gameTitle: 'Familiar Memory Match',
    timestamp: 'Yesterday (Morning)',
    durationSeconds: 76,
    totalAttempts: 6,
    accuracyPercentage: 84,
    difficulty: 'level_3',
    responseAverageSeconds: 9.1,
    hintsUsed: 0,
    adaptiveDecision: {
      ruleApplied: 'N-of-1 Personal Optimal Zone',
      explanation: 'Asha scored her personal best (84%). System adapts smoothly to 8-card sets when well-rested.',
      nextRecommendedDifficulty: 'level_3',
      nextGameType: 'memory_match'
    }
  }
];

const initialAlerts: CaregiverAlert[] = [
  {
    id: 'a1',
    timestamp: 'Today at 08:42 AM',
    type: 'routine',
    title: 'Morning Medicine Taken Peacefully',
    description: 'Asha confirmed her blood pressure medication at 08:42 AM with warm water.',
    whatChanged: 'Completed on schedule (within normal 15-minute window).',
    significance: 'Low',
    suggestedAction: 'No action needed. Routine well established.',
    dismissed: false
  },
  {
    id: 'a2',
    timestamp: 'Yesterday at 04:00 PM',
    type: 'attention',
    title: 'Hydration Reminder Follow-up',
    description: 'Afternoon hydration was snoozed once before being marked complete.',
    whatChanged: 'Response was 22 minutes later than Asha\'s usual afternoon pattern.',
    significance: 'Meaningful Check-in',
    suggestedAction: 'Offer a gentle cup of warm lemon water or green tea during afternoon visits.',
    dismissed: false
  }
];

const initialProfileCompletion: ProfileCompletionItem[] = [
  { id: 'pc1', label: 'Patient Basic Info & Age (72)', completed: true, category: 'medical' },
  { id: 'pc2', label: 'Primary Emergency Contact (Meera Devi)', completed: true, category: 'emergency' },
  { id: 'pc3', label: 'Secondary Fallback Contact (Rahul Sharma)', completed: true, category: 'emergency' },
  { id: 'pc4', label: 'Home Geofence & Important Places Configured', completed: true, category: 'preferences' },
  { id: 'pc5', label: '4 Personalized Family Reminiscence Memories Added', completed: true, category: 'memory' },
  { id: 'pc6', label: 'Medication Schedule & Dosage Configured', completed: true, category: 'medical' },
  { id: 'pc7', label: 'Assamese Regional Voice Profile Linked', completed: true, category: 'preferences' },
  { id: 'pc8', label: 'Upcoming Cardiology Appointment Added', completed: true, category: 'medical' },
  { id: 'pc9', label: 'Additional Family Photos Uploaded for Match Game', completed: false, category: 'memory' },
  { id: 'pc10', label: 'Smartband Bluetooth Wearable Pairing Verified', completed: false, category: 'preferences' }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

// Shared BroadcastChannel for real-time cross-tab and cross-device communication
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('smriticare_live_sync_v2')
  : null;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<AppRole>('landing');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [patient] = useState<PatientProfile>(initialPatient);
  
  const [routines, setRoutines] = useState<RoutineItem[]>(() => {
    const saved = localStorage.getItem('smriticare_routines_v2');
    return saved ? JSON.parse(saved) : initialRoutines;
  });

  const [cognitiveSessions, setCognitiveSessions] = useState<CognitiveSessionResult[]>(() => {
    const saved = localStorage.getItem('smriticare_sessions_v2');
    return saved ? JSON.parse(saved) : initialSessions;
  });

  const [familyMemories, setFamilyMemories] = useState<FamilyMemberMemory[]>(() => {
    const saved = localStorage.getItem('smriticare_memories_v2');
    return saved ? JSON.parse(saved) : initialMemories;
  });

  const [caregiverAlerts, setCaregiverAlerts] = useState<CaregiverAlert[]>(() => {
    const saved = localStorage.getItem('smriticare_alerts_v2');
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  const [profileCompletionItems, setProfileCompletionItems] = useState<ProfileCompletionItem[]>(() => {
    const saved = localStorage.getItem('smriticare_profile_comp');
    return saved ? JSON.parse(saved) : initialProfileCompletion;
  });

  // Alarm & Snooze Overlay System
  const [alarmOverlay, setAlarmOverlay] = useState<AlarmOverlayState | null>(null);

  // SOS Fallback System
  const [sosStep, setSosStep] = useState<SosStep>('idle');
  const [emergencyContacts] = useState<EmergencyContact[]>(initialEmergencyContacts);
  const [generatedSosSms, setGeneratedSosSms] = useState<string | null>(null);

  // Location & Safety State
  const [location, setLocation] = useState<LocationCoordinates>({
    lat: 26.1834,
    lng: 91.7656,
    address: "House 14, Rajgarh Road, Chandmari, Guwahati",
    areaName: "Chandmari Home Area",
    isHome: true,
    distanceFromHomeKm: 0,
    lastUpdated: "Just now",
    isLive: true
  });
  const [places] = useState<PlaceLocation[]>(initialPlaces);
  const [navigationSteps] = useState<NavigationStep[]>(initialNavigationSteps);
  const [isMissingPatientScenario, setIsMissingPatientScenario] = useState<boolean>(false);

  // Smartband Wearable Telemetry
  const [smartbandMetrics, setSmartbandMetrics] = useState<SmartbandMetrics>({
    connected: true,
    deviceName: "SmritiCare GPS Band v2",
    batteryLevel: 88,
    lastSyncTime: "2 mins ago",
    stepsToday: 3420,
    heartRateBpm: 74,
    sleepHours: 7.5,
    activityLevel: 'Light Walking'
  });

  // Background Music Player
  const [musicTracks] = useState<MusicTrack[]>(initialMusicTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Offline Sync State
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>(() => {
    const saved = localStorage.getItem('smriticare_sync_queue_v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgressStep, setSyncProgressStep] = useState<number>(0);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  const handleSetIsOffline = (offline: boolean) => {
    setIsOffline(offline);
    if (!offline && syncQueue.length > 0) {
      setTimeout(() => {
        triggerSync();
      }, 350);
    }
  };

  // Tour state
  const [demoTourStep, setDemoTourStep] = useState<number>(0);
  const [isDemoTourActive, setIsDemoTourActive] = useState<boolean>(false);

  // UI Tabs & Views
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [activeGameTab, setActiveGameTab] = useState<'memory_match' | 'pattern_sequence' | 'word_association' | 'shape_match' | 'mini_sudoku'>('memory_match');
  const [activeSafetyTab, setActiveSafetyTab] = useState<'overview' | 'location' | 'sos' | 'take_me_home' | 'places'>('overview');
  const [activePatientTab, setActivePatientTab] = useState<'home' | 'games' | 'memories' | 'routine' | 'safety'>('home');
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrameStyle>('iphone');
  const [mobileSubRole, setMobileSubRole] = useState<'patient' | 'caregiver'>('patient');
  const [activeSimulation, setActiveSimulation] = useState<{ scenario: string; title: string; subtitle: string; timestamp: string; stepDetails: string[] } | null>(null);

  // Telemetry Logs for Real-time inspection
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLogItem[]>([
    {
      id: 'tel-1',
      timestamp: '08:42 AM',
      source: 'patient',
      title: 'Morning Medicine Confirmed',
      detail: 'Asha took Telmisartan (40mg). Synchronized to Priya\'s hub.',
      type: 'routine'
    },
    {
      id: 'tel-2',
      timestamp: '09:15 AM',
      source: 'ai_engine',
      title: 'Personal Baseline Synchronized',
      detail: 'Asha vs Asha 7-day recall curve updated (84% score, 9.1s avg pace).',
      type: 'sync'
    },
    {
      id: 'tel-3',
      timestamp: '10:00 AM',
      source: 'caregiver',
      title: 'Caregiver Live Telemetry Connected',
      detail: 'GPS Geofence active. Asha is at Guwahati Residence.',
      type: 'location'
    }
  ]);

  // Remote Push Voice Reminder State (Priya -> Asha)
  const [activePushReminder, setActivePushReminder] = useState<RemotePushReminder | null>(null);
  const [latestPushAcknowledgement, setLatestPushAcknowledgement] = useState<string | null>(null);

  // Broadcast & Cross-tab message listener
  useEffect(() => {
    if (!syncChannel) return;

    const handleBroadcast = (event: MessageEvent) => {
      const { type, payload } = event.data || {};
      if (!type) return;

      if (type === 'ROUTINE_UPDATE' && payload?.routines) {
        setRoutines(payload.routines);
      } else if (type === 'SESSION_UPDATE' && payload?.session) {
        setCognitiveSessions(prev => [payload.session, ...prev]);
      } else if (type === 'ALERT_UPDATE' && payload?.alerts) {
        setCaregiverAlerts(payload.alerts);
      } else if (type === 'TELEMETRY_ITEM' && payload?.log) {
        setTelemetryLogs(prev => [payload.log, ...prev.slice(0, 24)]);
      } else if (type === 'ALARM_TRIGGER' && payload?.alarm) {
        setAlarmOverlay(payload.alarm);
        sounds.playAlarm();
      } else if (type === 'LOCATION_UPDATE' && payload?.location) {
        setLocation(payload.location);
      }
    };

    syncChannel.addEventListener('message', handleBroadcast);
    return () => syncChannel.removeEventListener('message', handleBroadcast);
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('smriticare_routines_v2', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('smriticare_sessions_v2', JSON.stringify(cognitiveSessions));
  }, [cognitiveSessions]);

  useEffect(() => {
    localStorage.setItem('smriticare_memories_v2', JSON.stringify(familyMemories));
  }, [familyMemories]);

  useEffect(() => {
    localStorage.setItem('smriticare_alerts_v2', JSON.stringify(caregiverAlerts));
  }, [caregiverAlerts]);

  useEffect(() => {
    localStorage.setItem('smriticare_sync_queue_v2', JSON.stringify(syncQueue));
  }, [syncQueue]);

  const addTelemetryLog = (item: Omit<TelemetryLogItem, 'id' | 'timestamp'>) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fullItem: TelemetryLogItem = {
      ...item,
      id: 'tel-' + Date.now(),
      timestamp: nowStr
    };
    setTelemetryLogs(prev => [fullItem, ...prev.slice(0, 24)]);
    syncChannel?.postMessage({ type: 'TELEMETRY_ITEM', payload: { log: fullItem } });
  };

  // Routine toggling
  const toggleRoutine = (id: string) => {
    setRoutines(prev => {
      const nextRoutines = prev.map(item => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          if (isOffline) {
            const queueItem: SyncQueueItem = {
              id: 'sync-r-' + Date.now(),
              type: 'routine_completion',
              timestamp: nowStr,
              summary: `Routine: "${item.title}" marked as ${nextCompleted ? 'Done' : 'Pending'}`,
              payload: { id, completed: nextCompleted }
            };
            setSyncQueue(q => [queueItem, ...q]);
          }

          addTelemetryLog({
            source: 'patient',
            title: `Routine ${nextCompleted ? 'Completed' : 'Reopened'}`,
            detail: `Asha: "${item.title}" (${nextCompleted ? 'Checked at ' + nowStr : 'Pending'})`,
            type: 'routine'
          });

          return {
            ...item,
            completed: nextCompleted,
            completedAt: nextCompleted ? nowStr : undefined,
            snoozed: false
          };
        }
        return item;
      });

      syncChannel?.postMessage({ type: 'ROUTINE_UPDATE', payload: { routines: nextRoutines } });
      return nextRoutines;
    });
  };

  const snoozeRoutine = (id: string) => {
    setRoutines(prev => {
      const nextRoutines = prev.map(item => {
        if (item.id === id) {
          const nextSnoozeCount = (item.snoozeCount || 0) + 1;
          addTelemetryLog({
            source: 'patient',
            title: `Routine Snoozed (${nextSnoozeCount}x)`,
            detail: `Asha snoozed "${item.title}" (10 mins).`,
            type: 'alarm'
          });

          // If snoozed 3 times, generate caregiver alert
          if (nextSnoozeCount >= 3) {
            const snoozeAlert: CaregiverAlert = {
              id: 'snooze-alert-' + Date.now(),
              timestamp: 'Just now',
              type: 'snooze_warning',
              title: `Important Reminder Repeatedly Snoozed (${item.title})`,
              description: `Asha has snoozed her ${item.title} 3 times. Please consider checking in with her warmly.`,
              whatChanged: `Reminder was snoozed 3 consecutive times past schedule.`,
              significance: 'High Priority',
              suggestedAction: 'Call Asha or step in with a comforting drink.',
              dismissed: false
            };
            setCaregiverAlerts(alerts => [snoozeAlert, ...alerts]);
          }

          return { ...item, snoozed: true, snoozeCount: nextSnoozeCount };
        }
        return item;
      });
      syncChannel?.postMessage({ type: 'ROUTINE_UPDATE', payload: { routines: nextRoutines } });
      return nextRoutines;
    });
  };

  const addRoutineItem = (item: Omit<RoutineItem, 'id' | 'completed'>) => {
    const newItem: RoutineItem = {
      ...item,
      id: 'r-' + Date.now(),
      completed: false
    };
    setRoutines(prev => {
      const updated = [...prev, newItem];
      syncChannel?.postMessage({ type: 'ROUTINE_UPDATE', payload: { routines: updated } });
      return updated;
    });
    addTelemetryLog({
      source: 'caregiver',
      title: 'New Routine Scheduled',
      detail: `Priya scheduled "${item.title}" at ${item.time} (${item.priority.toUpperCase()})`,
      type: 'routine'
    });
  };

  const updateRoutinePriority = (id: string, priority: 'normal' | 'important' | 'critical') => {
    setRoutines(prev => prev.map(r => r.id === id ? { ...r, priority } : r));
  };

  // Alarm Overlay Management
  const triggerAlarm = (routineId?: string) => {
    const target = routineId ? routines.find(r => r.id === routineId) : (routines.find(r => !r.completed) || routines[0]);
    if (!target) return;

    const alarmState: AlarmOverlayState = {
      isOpen: true,
      routineId: target.id,
      title: target.title,
      subtitle: target.subtitle,
      category: target.category as any,
      time: target.time,
      snoozeCount: target.snoozeCount || 0,
      priority: target.priority,
      callerName: target.category === 'medicine' ? 'Meera (Daughter)' : 'Priya (Caregiver)'
    };

    setAlarmOverlay(alarmState);
    sounds.playAlarm();
    syncChannel?.postMessage({ type: 'ALARM_TRIGGER', payload: { alarm: alarmState } });

    // Voice announcement in selected language
    const speechText = language === 'as'
      ? `আশা দেৱী, আপোনাৰ ${target.title}ৰ সময় হৈছে।`
      : language === 'hi'
      ? `आशा जी, आपकी ${target.title} का समय हो गया है।`
      : `Asha, it is time for your ${target.title}.`;
    speakText(speechText, language);

    addTelemetryLog({
      source: 'ai_engine',
      title: 'Prominent Alarm Triggered',
      detail: `Overlay interrupted device for "${target.title}" at ${target.time}.`,
      type: 'alarm'
    });
  };

  const dismissAlarm = (completed: boolean) => {
    if (alarmOverlay && completed) {
      toggleRoutine(alarmOverlay.routineId);
      sounds.playSuccess();
    }
    setAlarmOverlay(null);
  };

  const snoozeAlarm = () => {
    if (!alarmOverlay) return;
    snoozeRoutine(alarmOverlay.routineId);
    setAlarmOverlay(null);
    sounds.playTone(440, 'sine', 0.3, 0.15);
  };

  // SOS 2-Contact Fallback State Machine
  const startSosFlow = () => {
    setSosStep('calling_meera');
    sounds.playPhoneRing();

    addTelemetryLog({
      source: 'patient',
      title: 'Emergency SOS Triggered',
      detail: 'Calling Contact 1 (Meera Devi - Daughter)...',
      type: 'sos'
    });

    // Speak initial call attempt
    const msg1 = language === 'as'
      ? "মীৰালৈ ফোন কৰা হৈছে..."
      : language === 'hi'
      ? "मीरा को कॉल किया जा रहा है..."
      : "Calling Meera Devi (Daughter)...";
    speakText(msg1, language);

    // After 3.5 seconds: Meera does not answer -> Fallback to Rahul
    setTimeout(() => {
      setSosStep('meera_failed');
      setTimeout(() => {
        setSosStep('calling_rahul');
        sounds.playPhoneRing();

        const msg2 = language === 'as'
          ? "মীৰাই সঁহাৰি নিদিলে। ৰাহুললৈ ফোন কৰা হৈছে..."
          : language === 'hi'
          ? "मीरा का उत्तर नहीं मिला। राहुल को कॉल किया जा रहा है..."
          : "No response from Meera. Automatically trying Rahul Sharma (Son)...";
        speakText(msg2, language);

        // After another 3.5 seconds: Rahul Answers & SMS is generated
        setTimeout(() => {
          setSosStep('connected_rahul');
          sounds.playSuccess();

          const locText = location.isHome ? "Guwahati Residence (Rajgarh Road)" : "Outside Home Area (1.8 km Away, G.S. Road)";
          const smsText = `EMERGENCY ALERT: Asha triggered SOS from ${locText}. Battery: ${smartbandMetrics.batteryLevel}%. Please check immediately.`;
          setGeneratedSosSms(smsText);

          // Alert to Caregiver
          const sosAlert: CaregiverAlert = {
            id: 'sos-alert-' + Date.now(),
            timestamp: 'Just now',
            type: 'sos',
            title: 'EMERGENCY SOS ALERT: Asha Connected with Rahul',
            description: `Asha triggered SOS. Contact 1 (Meera) unavailable; Contact 2 (Rahul) connected successfully. SMS broadcast sent.`,
            whatChanged: `Emergency fallback flow completed. Location: ${locText}.`,
            significance: 'High Priority',
            suggestedAction: 'Coordinate with Rahul immediately.',
            dismissed: false
          };
          setCaregiverAlerts(alerts => [sosAlert, ...alerts]);

          addTelemetryLog({
            source: 'patient',
            title: 'SOS Fallback Connected to Rahul',
            detail: `Location SMS dispatched: "${smsText}"`,
            type: 'sos'
          });
        }, 3500);
      }, 1500);
    }, 3500);
  };

  const resetSosFlow = () => {
    setSosStep('idle');
    setGeneratedSosSms(null);
  };

  // Background Music Controller
  const togglePlayMusic = () => {
    if (isPlayingMusic) {
      sounds.stopBackgroundMusic();
      setIsPlayingMusic(false);
    } else {
      const track = musicTracks[currentTrackIndex];
      sounds.startBackgroundMusic(track.category);
      setIsPlayingMusic(true);
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % musicTracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlayingMusic) {
      sounds.startBackgroundMusic(musicTracks[nextIdx].category);
    }
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
    setCurrentTrackIndex(prevIdx);
    if (isPlayingMusic) {
      sounds.startBackgroundMusic(musicTracks[prevIdx].category);
    }
  };

  const toggleSmartbandConnection = () => {
    setSmartbandMetrics(prev => ({
      ...prev,
      connected: !prev.connected,
      lastSyncTime: 'Just now'
    }));
  };

  // Recording cognitive game session
  const recordCognitiveSession = (data: Omit<CognitiveSessionResult, 'id' | 'timestamp'>): CognitiveSessionResult => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullSession: CognitiveSessionResult = {
      ...data,
      id: 'cs-' + Date.now(),
      timestamp: `Today (${nowStr})`,
      offlineCreated: isOffline
    };

    if (isOffline) {
      const queueItem: SyncQueueItem = {
        id: 'sync-game-' + Date.now(),
        type: 'cognitive_session',
        timestamp: nowStr,
        summary: `${data.gameTitle} (${data.difficulty.toUpperCase()}): ${data.accuracyPercentage}% accuracy, ${data.responseAverageSeconds}s response time`,
        payload: fullSession
      };
      setSyncQueue(prev => [queueItem, ...prev]);
    }

    setCognitiveSessions(prev => {
      const updated = [fullSession, ...prev];
      syncChannel?.postMessage({ type: 'SESSION_UPDATE', payload: { session: fullSession } });
      return updated;
    });

    addTelemetryLog({
      source: 'patient',
      title: `${data.gameTitle} Completed`,
      detail: `Accuracy: ${data.accuracyPercentage}%, Avg Response: ${data.responseAverageSeconds}s (${data.difficulty.toUpperCase()})`,
      type: 'game'
    });

    return fullSession;
  };

  const addFamilyMemory = (mem: Omit<FamilyMemberMemory, 'id'>) => {
    const newMem: FamilyMemberMemory = {
      ...mem,
      id: 'm-' + Date.now()
    };
    setFamilyMemories(prev => [newMem, ...prev]);
    addTelemetryLog({
      source: 'caregiver',
      title: 'Family Memory Added',
      detail: `Priya added reminiscence anchor for "${mem.name}" (${mem.relationship})`,
      type: 'insight'
    });
  };

  const dismissAlert = (id: string) => {
    setCaregiverAlerts(prev => prev.map(a => a.id === id ? { ...a, dismissed: true } : a));
  };

  const markAlertAction = (id: string) => {
    setCaregiverAlerts(prev => prev.map(a => a.id === id ? { ...a, actionTaken: true } : a));
    addTelemetryLog({
      source: 'caregiver',
      title: 'Caregiver Action Logged',
      detail: 'Priya verified and responded to alert on connected hub.',
      type: 'insight'
    });
  };

  // Offline Sync execution
  const triggerSync = async () => {
    if (isSyncing || syncQueue.length === 0) return;
    setIsSyncing(true);
    setSyncProgressStep(1);

    await new Promise(resolve => setTimeout(resolve, 700)); // Step 1: Encrypt & Package local DB
    setSyncProgressStep(2);
    await new Promise(resolve => setTimeout(resolve, 800)); // Step 2: Push to Caregiver Store
    setSyncProgressStep(3);
    await new Promise(resolve => setTimeout(resolve, 600)); // Step 3: Recalculate baseline in real-time

    const count = syncQueue.length;
    const syncAlert: CaregiverAlert = {
      id: 'sync-alert-' + Date.now(),
      timestamp: 'Just now',
      type: 'insight',
      title: '⚡ Offline Activities Reconciled & Baseline Updated',
      description: `Successfully synchronized ${count} pending cognitive and routine activities from Asha's device. Caregiver dashboard is now 100% live.`,
      whatChanged: 'Caregiver dashboard, adherence metrics, and personal baseline updated to latest timestamps.',
      significance: 'Low',
      suggestedAction: 'View real-time updated cognitive baseline metrics below.',
      dismissed: false
    };

    setCaregiverAlerts(prev => [syncAlert, ...prev]);
    setSyncQueue([]);
    setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setSyncProgressStep(0);
    setIsSyncing(false);
    sounds.playSuccess();
  };

  // Compute Personal Baseline (Asha vs Asha)
  const calculateBaselineMetrics = (): BaselineMetric[] => {
    const last7 = cognitiveSessions.slice(0, 7).reverse();
    const accuracies = last7.length > 0 ? last7.map(s => s.accuracyPercentage) : [70, 72, 74, 76, 78, 80, 84];
    const responseTimes = last7.length > 0 ? last7.map(s => s.responseAverageSeconds) : [13, 12, 12, 11, 10, 10, 9];

    const currentAcc = accuracies[accuracies.length - 1] || 84;
    const initialAcc = accuracies[0] || 68;
    const accDiff = currentAcc - initialAcc;

    const currentResp = responseTimes[responseTimes.length - 1] || 9.1;
    const initialResp = responseTimes[0] || 13.2;

    const routineCompletedCount = routines.filter(r => r.completed).length;
    const routinePercent = Math.round((routineCompletedCount / (routines.length || 1)) * 100);

    return [
      {
        name: "Memory Recall Accuracy",
        score: currentAcc,
        recentTrend: accDiff >= 5 ? 'improving' : accDiff >= -3 ? 'stable' : 'gentle_attention',
        trendText: accDiff >= 0 ? `+${accDiff}% vs Asha's 7-day start` : `${accDiff}% vs 7-day start`,
        sevenDayHistory: accuracies,
        unit: '%',
        interpretation: "Compared with Asha's own initial sessions, recall is steadily strengthening with familiar NER imagery."
      },
      {
        name: "Average Response Time",
        score: Math.round(currentResp * 10) / 10,
        recentTrend: currentResp <= initialResp ? 'improving' : 'slower',
        trendText: `${Math.round((initialResp - currentResp) * 10) / 10}s faster than Day 1`,
        sevenDayHistory: responseTimes,
        unit: 'sec',
        interpretation: "Asha is taking comfortable, relaxed time without rushing. Response pace has naturally normalized to ~9 seconds."
      },
      {
        name: "Routine & Orientation Engagement",
        score: routinePercent,
        recentTrend: routinePercent >= 70 ? 'stable' : 'gentle_attention',
        trendText: `${routineCompletedCount} of ${routines.length} completed today`,
        sevenDayHistory: [80, 85, 100, 70, 85, 90, routinePercent],
        unit: '%',
        interpretation: "High consistency in morning medication. Afternoon hydration has occasional gentle snoozes."
      },
      {
        name: "Cognitive Comfort Index",
        score: 88,
        recentTrend: 'improving',
        trendText: "Zero frustration drop-offs",
        sevenDayHistory: [72, 75, 76, 80, 82, 85, 88],
        unit: '/100',
        interpretation: "Positive reinforcement and self-paced flip delays keep sessions calm and comforting."
      }
    ];
  };

  // Profile completion calculation
  const completedCount = profileCompletionItems.filter(i => i.completed).length;
  const profileCompletionPercentage = Math.round((completedCount / profileCompletionItems.length) * 100);

  // Push Reminders (Priya -> Asha)
  const sendPushReminder = (rem: Omit<RemotePushReminder, 'id' | 'timestamp'>) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullRem: RemotePushReminder = {
      ...rem,
      id: 'push-' + Date.now(),
      timestamp: nowStr
    };
    setActivePushReminder(fullRem);
    sounds.playSuccess();
    speakText(fullRem.voiceNoteText || fullRem.text, language, { gender: 'female' });
    syncChannel?.postMessage({ type: 'REMOTE_PUSH_REMINDER', payload: { reminder: fullRem } });
    addTelemetryLog({
      source: 'caregiver',
      title: 'Voice Reminder Sent',
      detail: `Priya ➔ Asha: "${fullRem.text}"`,
      type: 'voice'
    });
  };

  const acknowledgePushReminder = (id: string) => {
    const rem = activePushReminder;
    setActivePushReminder(null);
    sounds.playSuccess();

    if (rem && (rem.category === 'medicine' || rem.category === 'hydration')) {
      const match = routines.find(r => r.category === rem.category && !r.completed);
      if (match) {
        toggleRoutine(match.id);
      }
    }

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ackMsg = `Asha confirmed: "${rem?.text || 'Routine'}" at ${nowStr}`;
    setLatestPushAcknowledgement(ackMsg);
    setTimeout(() => setLatestPushAcknowledgement(null), 5000);
    addTelemetryLog({
      source: 'patient',
      title: 'Voice Reminder Acknowledged',
      detail: `Asha confirmed: "${rem?.text || 'Reminder'}" completed peacefully.`,
      type: 'routine'
    });
  };

  const dismissPushReminder = () => {
    setActivePushReminder(null);
  };

  // Evaluator Simulation Center (Specification 39)
  const triggerSimulation = (scenario: 
    | 'alarm_medicine' 
    | 'snooze_x3' 
    | 'sos_fallback' 
    | 'missing_patient' 
    | 'take_me_home' 
    | 'offline_toggle' 
    | 'sync_reconcile' 
    | 'game_adaptive_up' 
    | 'smartband_pulse' 
    | 'lang_assamese' 
    | 'family_voice_push'
  ) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    switch (scenario) {
      case 'alarm_medicine':
        setActiveSimulation({
          scenario: 'alarm_medicine',
          title: '🔔 Android-Like Medication Alarm Triggered (SIH 26003.8 & 9)',
          subtitle: 'Prominent screen-interrupting alarm overlay with audio chime & spoken voice dosage for Telmisartan (40mg).',
          timestamp: nowTime,
          stepDetails: ['Screen Overlay Interrupted', 'Audio Chime & Speech Triggered', 'Awaiting Patient Done / Snooze']
        });
        setActivePatientTab('routine');
        triggerAlarm('r1');
        break;

      case 'snooze_x3':
        setActiveSimulation({
          scenario: 'snooze_x3',
          title: '⏳ 3x Repeated Snooze Escalation (SIH 26003.10)',
          subtitle: 'Asha snoozed her morning medication 3 consecutive times past schedule. System auto-escalated into a High-Priority Caregiver Alert on Priya\'s dashboard.',
          timestamp: nowTime,
          stepDetails: ['Snooze 1 (10 mins)', 'Snooze 2 (20 mins)', 'Snooze 3 ➔ Caregiver Alert Dispatched']
        });
        setActivePatientTab('routine');
        snoozeRoutine('r1');
        setTimeout(() => snoozeRoutine('r1'), 200);
        setTimeout(() => snoozeRoutine('r1'), 400);
        break;

      case 'sos_fallback':
        setActiveSimulation({
          scenario: 'sos_fallback',
          title: '🚨 Emergency SOS 2-Contact Fallback (SIH 26003.15 & 16)',
          subtitle: 'Emergency call initiated to Meera Devi (Daughter). No answer ➔ Zero-latency fallback to Rahul Sharma (Son) ➔ Connected with live timer and GPS SMS broadcast.',
          timestamp: nowTime,
          stepDetails: ['Calling Meera Devi', 'Fallback to Rahul Sharma', 'Connected & GPS SMS Broadcasted']
        });
        setActivePatientTab('safety');
        setActiveSafetyTab('sos');
        startSosFlow();
        break;

      case 'missing_patient':
        setLocation({
          lat: 26.1550,
          lng: 91.7820,
          address: "G.S. Road near Dispur Supermarket",
          areaName: "Outside Usual Home Area",
          isHome: false,
          distanceFromHomeKm: 1.8,
          lastUpdated: "Just now",
          isLive: true
        });
        setIsMissingPatientScenario(true);
        setActivePatientTab('safety');
        setActiveSafetyTab('take_me_home');
        
        setActiveSimulation({
          scenario: 'missing_patient',
          title: '📍 Geofence Breach & Missing Patient (SIH 26003.17 & 18)',
          subtitle: 'Patient stepped 1.8 km outside safe home boundary near G.S. Road. Caregiver received critical Geofence Alert with live map, while Asha\'s phone activated "Take Me Home" navigation.',
          timestamp: nowTime,
          stepDetails: ['1.8km Geofence Departure', 'Caregiver Alert Dispatched', 'Take Me Home Route Activated']
        });

        const locAlert: CaregiverAlert = {
          id: 'geofence-alert-' + Date.now(),
          timestamp: 'Just now',
          type: 'location',
          title: 'GEOFENCE ALERT: Asha is Outside Home Area',
          description: 'Asha is currently 1.8 km away from Guwahati residence near G.S. Road. Navigation guidance is active on her device.',
          whatChanged: 'Patient stepped outside the 500m safe home boundary.',
          significance: 'High Priority',
          suggestedAction: 'Check Asha\'s live route or call Meera/Rahul.',
          dismissed: false
        };
        setCaregiverAlerts(alerts => [locAlert, ...alerts]);
        sounds.playWarning();
        addTelemetryLog({
          source: 'ai_engine',
          title: 'Geofence Departure Detected',
          detail: 'Asha is 1.8 km away from home. "Take Me Home" activated.',
          type: 'location'
        });
        break;

      case 'take_me_home':
        setActiveSimulation({
          scenario: 'take_me_home',
          title: '🧭 Turn-by-Turn Landmark Navigation (SIH 26003.18)',
          subtitle: 'Asha\'s phone opened simple landmark-based navigation ("Your green gate is on the left") with spoken audio read-out.',
          timestamp: nowTime,
          stepDetails: ['Acquiring GPS Position', 'Rendering Landmark Route', 'Speaking Step Guidance']
        });
        setActivePatientTab('safety');
        setActiveSafetyTab('take_me_home');
        speakText("Asha, follow the simple steps on your screen to walk back home safely.", language);
        break;

      case 'offline_toggle':
        const nextOffline = !isOffline;
        setIsOffline(nextOffline);
        setActiveSimulation({
          scenario: 'offline_toggle',
          title: nextOffline ? '⚠️ Offline-First Mode Active (SIH 26003.31)' : '🟢 Network Restored (Online Mode Active)',
          subtitle: nextOffline 
            ? 'All cognitive games, routines, and interactions are now securely cached in local SQLite database with zero downtime.'
            : 'Reconnected to cloud network. Automatic 3-step synchronization will reconcile all pending local updates.',
          timestamp: nowTime,
          stepDetails: nextOffline 
            ? ['Network Disconnected', 'Local SQLite DB Cache Active', 'Zero Latency Response']
            : ['Network Restored', 'Auto-Sync Triggered', 'Reconciling Live Data']
        });
        addTelemetryLog({
          source: 'ai_engine',
          title: nextOffline ? 'Network Disconnected (Offline Mode)' : 'Network Reconnected',
          detail: nextOffline ? 'Local storage caching active. Zero downtime.' : 'Ready to synchronize pending items.',
          type: 'sync'
        });
        break;

      case 'sync_reconcile':
        setActiveSimulation({
          scenario: 'sync_reconcile',
          title: '🔄 3-Step Offline Batch Synchronization (SIH 26003.32)',
          subtitle: 'Packaging local encrypted SQLite database, pushing payload to caregiver store, and recalculating personal baseline in real-time.',
          timestamp: nowTime,
          stepDetails: ['1. Packaging Local SQLite', '2. Streaming to Caregiver Hub', '3. Recalculating Baseline Live']
        });
        triggerSync();
        break;

      case 'game_adaptive_up':
        setActivePatientTab('games');
        setActiveGameTab('memory_match');
        setActiveSimulation({
          scenario: 'game_adaptive_up',
          title: '📈 Adaptive AI Cognitive Calibration (SIH 26003.5)',
          subtitle: 'Asha achieved 92% recall accuracy with rapid 7.8s pace. Explainable rule engine automatically promoted difficulty from Level 3 to Level 4 (12 cards) and recalculated baseline.',
          timestamp: nowTime,
          stepDetails: ['92% Recall Accuracy Logged', 'Explainable Decision Applied', 'Elevated to Level 4 Deck']
        });
        recordCognitiveSession({
          gameType: 'memory_match',
          gameTitle: 'Familiar Memory Match',
          durationSeconds: 58,
          totalAttempts: 6,
          accuracyPercentage: 92,
          difficulty: 'level_3',
          responseAverageSeconds: 7.8,
          hintsUsed: 0,
          adaptiveDecision: {
            ruleApplied: 'High Accuracy & Speed Acceleration',
            explanation: 'Asha achieved 92% accuracy with rapid 7.8s recall. Difficulty automatically increased from Level 3 to Level 4 (12 cards).',
            nextRecommendedDifficulty: 'level_4',
            nextGameType: 'memory_match'
          }
        });
        sounds.playSuccess();
        break;

      case 'smartband_pulse':
        setActiveSimulation({
          scenario: 'smartband_pulse',
          title: '📡 Wearable Smartband Telemetry Stream (SIH 26003.19)',
          subtitle: 'Real-time biometric data packet received: Step count +350, Heart rate 76 bpm (Resting/Walking state).',
          timestamp: nowTime,
          stepDetails: ['Pairing BLE Smartband', 'Streaming HR & Steps', 'Updating Caregiver Hub Live']
        });
        setSmartbandMetrics(prev => ({
          ...prev,
          stepsToday: prev.stepsToday + 350,
          heartRateBpm: 76,
          activityLevel: 'Active'
        }));
        sounds.playChime();
        addTelemetryLog({
          source: 'ai_engine',
          title: 'Smartband Telemetry Updated',
          detail: 'Step count: 3,770, HR: 76 bpm. Active walking detected.',
          type: 'insight'
        });
        break;

      case 'lang_assamese':
        setActiveSimulation({
          scenario: 'lang_assamese',
          title: '🗣️ Assamese Regional Localization (SIH 26003.3)',
          subtitle: 'System localized into Assamese (অসমীয়া) with native typography and speech synthesis for illiterate elderly users.',
          timestamp: nowTime,
          stepDetails: ['Switching Language to Assamese', 'Rendering Native Script', 'Speaking Welcome Greeting']
        });
        setLanguage('as');
        speakText("শুভ প্ৰভাত আশা দেৱী। স্মৃতিকোৱাৰ আপোনাৰ লগত আছে।", 'as');
        break;

      case 'family_voice_push':
        setActiveSimulation({
          scenario: 'family_voice_push',
          title: '🗣️ Caregiver Remote Voice Push (SIH 26003.20)',
          subtitle: 'Priya sent an audio reminder from her hub. Asha\'s phone popped up with Priya\'s photo, audio playback, and a one-tap confirmation button.',
          timestamp: nowTime,
          stepDetails: ['Composing Voice Note', 'Broadcasting to Asha', 'Waiting for Acknowledgment']
        });
        sendPushReminder({
          text: "Ma, please drink a warm cup of water and take your medicine. Priya is with you.",
          category: 'hydration',
          senderName: 'Priya (Caregiver)',
          voiceNoteText: "Ma, this is Priya. Please drink your warm water now. We are right here with you."
        });
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        patient,
        routines,
        toggleRoutine,
        snoozeRoutine,
        addRoutineItem,
        updateRoutinePriority,
        cognitiveSessions,
        recordCognitiveSession,
        familyMemories,
        addFamilyMemory,
        baselineMetrics: calculateBaselineMetrics(),
        caregiverAlerts,
        dismissAlert,
        markAlertAction,
        alarmOverlay,
        triggerAlarm,
        dismissAlarm,
        snoozeAlarm,
        sosStep,
        emergencyContacts,
        startSosFlow,
        resetSosFlow,
        generatedSosSms,
        location,
        places,
        navigationSteps,
        isMissingPatientScenario,
        setIsMissingPatientScenario,
        smartbandMetrics,
        toggleSmartbandConnection,
        musicTracks,
        currentTrackIndex,
        isPlayingMusic,
        togglePlayMusic,
        nextTrack,
        prevTrack,
        profileCompletionItems,
        profileCompletionPercentage,
        isOffline,
        setIsOffline: handleSetIsOffline,
        syncQueue,
        isSyncing,
        syncProgressStep,
        lastSyncedTime,
        triggerSync,
        isVoiceOpen,
        setIsVoiceOpen,
        activeGameTab,
        setActiveGameTab,
        activeSafetyTab,
        setActiveSafetyTab,
        activePatientTab,
        setActivePatientTab,
        mobileTab,
        setMobileTab,
        deviceFrame,
        setDeviceFrame,
        mobileSubRole,
        setMobileSubRole,
        telemetryLogs,
        addTelemetryLog,
        activePushReminder,
        sendPushReminder,
        acknowledgePushReminder,
        dismissPushReminder,
        latestPushAcknowledgement,
        demoTourStep,
        setDemoTourStep,
        isDemoTourActive,
        setIsDemoTourActive,
        activeSimulation,
        setActiveSimulation,
        triggerSimulationEvent: (ev) => {
          if (ev === 'morning_med') triggerSimulation('alarm_medicine');
          else if (ev === 'memory_game') triggerSimulation('game_adaptive_up');
          else if (ev === 'sos_help') triggerSimulation('sos_fallback');
          else if (ev === 'hydration') triggerSimulation('family_voice_push');
        },
        triggerSimulation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
