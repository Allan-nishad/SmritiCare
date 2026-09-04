import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppRole,
  LanguageCode,
  RoutineItem,
  CognitiveSessionResult,
  FamilyMemberMemory,
  BaselineMetric,
  CaregiverAlert,
  PatientProfile,
  SyncQueueItem,
  TelemetryLogItem,
  RemotePushReminder
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
  cognitiveSessions: CognitiveSessionResult[];
  recordCognitiveSession: (session: Omit<CognitiveSessionResult, 'id' | 'timestamp'>) => CognitiveSessionResult;
  familyMemories: FamilyMemberMemory[];
  addFamilyMemory: (memory: Omit<FamilyMemberMemory, 'id'>) => void;
  baselineMetrics: BaselineMetric[];
  caregiverAlerts: CaregiverAlert[];
  dismissAlert: (id: string) => void;
  markAlertAction: (id: string) => void;
  
  // Offline Engine
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  syncQueue: SyncQueueItem[];
  isSyncing: boolean;
  lastSyncedTime: string;
  triggerSync: () => Promise<void>;
  
  // Judge Demo Tour Mode
  demoTourStep: number;
  setDemoTourStep: (step: number) => void;
  isDemoTourActive: boolean;
  setIsDemoTourActive: (active: boolean) => void;
  activeGameTab: 'memory_match' | 'pattern_sequence' | 'word_association';
  setActiveGameTab: (tab: 'memory_match' | 'pattern_sequence' | 'word_association') => void;
  isVoiceOpen: boolean;
  setIsVoiceOpen: (open: boolean) => void;

  // Mobile Prototype Mode
  mobileTab: 'home' | 'games' | 'memories' | 'routine' | 'caregiver';
  setMobileTab: (tab: 'home' | 'games' | 'memories' | 'routine' | 'caregiver') => void;
  deviceFrame: 'iphone' | 'pixel' | 'fullscreen';
  setDeviceFrame: (frame: 'iphone' | 'pixel' | 'fullscreen') => void;
  mobileSubRole: 'patient' | 'caregiver';
  setMobileSubRole: (role: 'patient' | 'caregiver') => void;

  // Dual Device Live Sync Mode
  telemetryLogs: TelemetryLogItem[];
  addTelemetryLog: (item: Omit<TelemetryLogItem, 'id' | 'timestamp'>) => void;
  triggerSimulationEvent: (eventType: 'morning_med' | 'memory_game' | 'sos_help' | 'hydration') => void;

  // Remote Push Voice Reminder (Priya -> Asha)
  activePushReminder: RemotePushReminder | null;
  sendPushReminder: (reminder: Omit<RemotePushReminder, 'id' | 'timestamp'>) => void;
  acknowledgePushReminder: (id: string) => void;
  dismissPushReminder: () => void;
  latestPushAcknowledgement: string | null;
}

const initialPatient: PatientProfile = {
  name: "Asha Devi",
  age: 72,
  location: "Guwahati / Jorhat, Assam",
  nativeLanguage: "as",
  caregiverName: "Priya",
  caregiverRelationship: "Family Caregiver / Daughter-in-law",
  recentBaselineSummary: "Engaged and responsive. Morning cognitive recall is 14% higher than afternoon sessions.",
  lastActiveMinutesAgo: 4
};

const initialRoutines: RoutineItem[] = [
  {
    id: 'r1',
    time: '08:30 AM',
    title: 'Morning Blood Pressure Medicine',
    subtitle: '1 tablet of Telmisartan (40mg) with warm water',
    category: 'medicine',
    completed: true,
    completedAt: '08:42 AM',
    priority: 'high',
    icon: 'Pill',
    dosageOrNotes: 'With light breakfast'
  },
  {
    id: 'r2',
    time: '10:00 AM',
    title: 'Morning Memory & Orientation Activity',
    subtitle: 'SmritiCare Culturally Familiar Match session',
    category: 'activity',
    completed: false,
    priority: 'high',
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
    time: '04:30 PM',
    title: 'Veranda Walk & Garden Flowers',
    subtitle: '10-minute stroll in the courtyard garden',
    category: 'walk',
    completed: false,
    priority: 'normal',
    icon: 'Footprints',
    dosageOrNotes: 'Gentle mobility exercise'
  },
  {
    id: 'r6',
    time: '06:00 PM',
    title: 'Family Call with Meera & Aarav',
    subtitle: 'Video call with daughter Meera in Tezpur',
    category: 'family',
    completed: false,
    priority: 'normal',
    icon: 'PhoneCall',
    dosageOrNotes: 'Reminiscence and family bonding'
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
    storySnippet: 'Meera is your eldest daughter. She loves tea garden walks and teaches high school mathematics.',
    favoriteMemory: 'Making sweet coconut laru together during Magh Bihu festival in Jorhat.',
    keyYear: '2023 Festival',
    familiarObject: 'Traditional brass bowl (Kahi Bati)'
  },
  {
    id: 'm2',
    name: 'Ravi',
    relationship: 'Son (Engineer in Guwahati)',
    location: 'Guwahati, Assam',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    audioNoteText: '“Ma, I brought you the fresh red tea leaves from Doomdooma. Let’s sit together on the veranda.”',
    storySnippet: 'Ravi lives 10 minutes away and visits you every evening with Priya and little Aarav.',
    favoriteMemory: 'Planting marigolds and orchids in the front garden.',
    keyYear: '1998 & Current',
    familiarObject: 'Assam Tea Pot (Kettle)'
  },
  {
    id: 'm3',
    name: 'Aarav',
    relationship: 'Grandson (Age 8)',
    location: 'Guwahati, Assam',
    photoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=600',
    audioNoteText: '“Aita (Grandma), tell me the story of the Kaziranga Rhinoceros and the wise river river dolphin again!”',
    storySnippet: 'Aarav loves reading folklore stories with you in the afternoon sunshine.',
    favoriteMemory: 'Drawing the Brahmaputra ferry boat together.',
    keyYear: 'Present Day',
    familiarObject: 'Wooden Rhino Toy'
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
    familiarObject: 'Eri Silk Shawl (Gamosa)'
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
    difficulty: 'easy',
    responseAverageSeconds: 13.2,
    hintsUsed: 3,
    adaptiveDecision: {
      ruleApplied: 'Baseline Calibration (Day 1)',
      explanation: 'Established initial baseline response time and pair association speed.',
      nextRecommendedDifficulty: 'easy',
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
    difficulty: 'easy',
    responseAverageSeconds: 12.1,
    hintsUsed: 2,
    adaptiveDecision: {
      ruleApplied: 'Gentle Repetition Confirmation',
      explanation: 'Response time improved by 8%. Kept difficulty steady to build confidence.',
      nextRecommendedDifficulty: 'easy',
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
    difficulty: 'easy',
    responseAverageSeconds: 12.0,
    hintsUsed: 2,
    adaptiveDecision: {
      ruleApplied: 'Multi-modal Consistency Rule',
      explanation: 'Stable sequence recall maintained across visual icon patterns.',
      nextRecommendedDifficulty: 'easy',
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
    difficulty: 'easy',
    responseAverageSeconds: 11.2,
    hintsUsed: 1,
    adaptiveDecision: {
      ruleApplied: 'Positive Confidence Advance',
      explanation: 'High semantic association accuracy. Smooth transition to 6-item pairs.',
      nextRecommendedDifficulty: 'medium',
      nextGameType: 'memory_match'
    }
  },
  {
    id: 'cs-5',
    gameType: 'memory_match',
    gameTitle: 'Familiar Memory Match',
    timestamp: '3 days ago',
    durationSeconds: 90,
    totalAttempts: 7,
    accuracyPercentage: 78,
    difficulty: 'medium',
    responseAverageSeconds: 10.4,
    hintsUsed: 1,
    adaptiveDecision: {
      ruleApplied: 'Medium Tier Stabilization',
      explanation: 'Handled medium difficulty seamlessly without fatigue signals.',
      nextRecommendedDifficulty: 'medium',
      nextGameType: 'pattern_sequence'
    }
  },
  {
    id: 'cs-6',
    gameType: 'pattern_sequence',
    gameTitle: 'Daily Rhythm Pattern',
    timestamp: '2 days ago',
    durationSeconds: 84,
    totalAttempts: 6,
    accuracyPercentage: 80,
    difficulty: 'medium',
    responseAverageSeconds: 9.8,
    hintsUsed: 1,
    adaptiveDecision: {
      ruleApplied: 'Peak Engagement Trend',
      explanation: 'Prompt recognition with under 10s average response time.',
      nextRecommendedDifficulty: 'medium',
      nextGameType: 'memory_match'
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
    difficulty: 'medium',
    responseAverageSeconds: 9.1,
    hintsUsed: 0,
    adaptiveDecision: {
      ruleApplied: 'N-of-1 Personal Optimal Zone',
      explanation: 'Asha scored her personal best (84%). System will introduce subtle 8-pair challenges when she is well-rested.',
      nextRecommendedDifficulty: 'medium',
      nextGameType: 'memory_match'
    }
  }
];

const initialAlerts: CaregiverAlert[] = [
  {
    id: 'a1',
    timestamp: 'Today at 09:15 AM',
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

const initialTelemetry: TelemetryLogItem[] = [
  {
    id: 'tel-1',
    timestamp: '08:42 AM',
    source: 'patient',
    title: 'Morning Blood Pressure Med Confirmed',
    detail: 'Asha marked routine completed on device. Synchronized to Priya\'s hub.',
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
    detail: 'Dual device remote synchronization active with zero latency.',
    type: 'insight'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

// Shared BroadcastChannel for real-time cross-tab and cross-device communication
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('smriticare_live_sync_v1')
  : null;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<AppRole>('landing');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [patient] = useState<PatientProfile>(initialPatient);
  const [routines, setRoutines] = useState<RoutineItem[]>(() => {
    const saved = localStorage.getItem('smriticare_routines');
    return saved ? JSON.parse(saved) : initialRoutines;
  });
  const [cognitiveSessions, setCognitiveSessions] = useState<CognitiveSessionResult[]>(() => {
    const saved = localStorage.getItem('smriticare_sessions');
    return saved ? JSON.parse(saved) : initialSessions;
  });
  const [familyMemories, setFamilyMemories] = useState<FamilyMemberMemory[]>(() => {
    const saved = localStorage.getItem('smriticare_memories');
    return saved ? JSON.parse(saved) : initialMemories;
  });
  const [caregiverAlerts, setCaregiverAlerts] = useState<CaregiverAlert[]>(() => {
    const saved = localStorage.getItem('smriticare_alerts');
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  // Telemetry Log State for Dual Device & Real-time inspection
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLogItem[]>(() => {
    const saved = localStorage.getItem('smriticare_telemetry');
    return saved ? JSON.parse(saved) : initialTelemetry;
  });

  // Remote Push Voice Reminder State (Priya -> Asha)
  const [activePushReminder, setActivePushReminder] = useState<RemotePushReminder | null>(null);
  const [latestPushAcknowledgement, setLatestPushAcknowledgement] = useState<string | null>(null);

  // Offline Sync State
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>(() => {
    const saved = localStorage.getItem('smriticare_sync_queue');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  // Interactive Judge Demo Tour state
  const [demoTourStep, setDemoTourStep] = useState<number>(0);
  const [isDemoTourActive, setIsDemoTourActive] = useState<boolean>(false);
  const [activeGameTab, setActiveGameTab] = useState<'memory_match' | 'pattern_sequence' | 'word_association'>('memory_match');
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);

  // Mobile Prototype Mode state
  const [mobileTab, setMobileTab] = useState<'home' | 'games' | 'memories' | 'routine' | 'caregiver'>('home');
  const [deviceFrame, setDeviceFrame] = useState<'iphone' | 'pixel' | 'fullscreen'>('iphone');
  const [mobileSubRole, setMobileSubRole] = useState<'patient' | 'caregiver'>('patient');

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
        setTelemetryLogs(prev => [payload.log, ...prev.slice(0, 19)]);
      } else if (type === 'REMOTE_PUSH_REMINDER' && payload?.reminder) {
        setActivePushReminder(payload.reminder);
        sounds.playSuccess();
        speakText(payload.reminder.voiceNoteText || payload.reminder.text, language);
      } else if (type === 'REMOTE_PUSH_ACKNOWLEDGED' && payload) {
        setLatestPushAcknowledgement(payload.message || 'Asha confirmed routine with love!');
        sounds.playSuccess();
        setTimeout(() => setLatestPushAcknowledgement(null), 5000);
      } else if (type === 'REMOTE_PUSH_DISMISSED') {
        setActivePushReminder(null);
      }
    };

    syncChannel.addEventListener('message', handleBroadcast);
    return () => syncChannel.removeEventListener('message', handleBroadcast);
  }, [language]);

  // URL Hash & Query listener for direct sub demo links
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const demoParam = params.get('demo') || params.get('view') || params.get('role');

      if (hash === '#dual' || hash === '#dual-device' || demoParam === 'dual' || demoParam === 'dual-device') {
        setRole('dual');
      } else if (hash === '#mobile-patient' || hash === '#patient-phone' || demoParam === 'patient-phone') {
        setRole('mobile');
        setMobileSubRole('patient');
        setMobileTab('home');
      } else if (hash === '#mobile-caregiver' || hash === '#caregiver-phone' || demoParam === 'caregiver-phone') {
        setRole('mobile');
        setMobileSubRole('caregiver');
        setMobileTab('caregiver');
      } else if (hash === '#mobile' || hash === '#app' || demoParam === 'mobile' || demoParam === 'app') {
        setRole('mobile');
      } else if (hash === '#patient' || demoParam === 'patient') {
        setRole('patient');
      } else if (hash === '#caregiver' || demoParam === 'caregiver') {
        setRole('caregiver');
      } else if (hash === '#landing' || hash === '#overview' || demoParam === 'landing' || demoParam === 'overview') {
        setRole('landing');
      }
    };

    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    return () => window.removeEventListener('hashchange', handleUrlChange);
  }, []);

  // Helper to add telemetry log & broadcast
  const addTelemetryLog = (item: Omit<TelemetryLogItem, 'id' | 'timestamp'>) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fullItem: TelemetryLogItem = {
      ...item,
      id: 'tel-' + Date.now(),
      timestamp: nowStr
    };
    setTelemetryLogs(prev => [fullItem, ...prev.slice(0, 19)]);
    syncChannel?.postMessage({ type: 'TELEMETRY_ITEM', payload: { log: fullItem } });
  };

  // Update URL hash smoothly when role changes
  const handleSetRole = (newRole: AppRole) => {
    setRole(newRole);
    if (newRole === 'dual') {
      window.location.hash = '#dual';
    } else if (newRole === 'mobile') {
      window.location.hash = '#mobile';
    } else if (newRole === 'patient') {
      window.location.hash = '#patient';
    } else if (newRole === 'caregiver') {
      window.location.hash = '#caregiver';
    } else {
      window.location.hash = '#overview';
    }
  };

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('smriticare_routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('smriticare_sessions', JSON.stringify(cognitiveSessions));
  }, [cognitiveSessions]);

  useEffect(() => {
    localStorage.setItem('smriticare_memories', JSON.stringify(familyMemories));
  }, [familyMemories]);

  useEffect(() => {
    localStorage.setItem('smriticare_alerts', JSON.stringify(caregiverAlerts));
  }, [caregiverAlerts]);

  useEffect(() => {
    localStorage.setItem('smriticare_sync_queue', JSON.stringify(syncQueue));
  }, [syncQueue]);

  // Routine toggling
  const toggleRoutine = (id: string) => {
    setRoutines(prev => {
      const nextRoutines = prev.map(item => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          // If offline, push to sync queue
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

          // Add Telemetry Log
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

      // Broadcast to other tabs/windows
      syncChannel?.postMessage({ type: 'ROUTINE_UPDATE', payload: { routines: nextRoutines } });
      return nextRoutines;
    });
  };

  const snoozeRoutine = (id: string) => {
    setRoutines(prev => {
      const nextRoutines = prev.map(item => {
        if (item.id === id) {
          addTelemetryLog({
            source: 'patient',
            title: 'Routine Snoozed (15m)',
            detail: `Asha requested gentle reminder for "${item.title}".`,
            type: 'routine'
          });
          return { ...item, snoozed: true };
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
      detail: `Priya added "${item.title}" at ${item.time}`,
      type: 'routine'
    });
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
      // Add to offline sync queue
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
    setCaregiverAlerts(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, dismissed: true } : a);
      syncChannel?.postMessage({ type: 'ALERT_UPDATE', payload: { alerts: updated } });
      return updated;
    });
  };

  const markAlertAction = (id: string) => {
    setCaregiverAlerts(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, actionTaken: true } : a);
      syncChannel?.postMessage({ type: 'ALERT_UPDATE', payload: { alerts: updated } });
      return updated;
    });
    addTelemetryLog({
      source: 'caregiver',
      title: 'Caregiver Action Logged',
      detail: 'Priya verified and responded to alert on connected hub.',
      type: 'insight'
    });
  };

  // 1-Click Simulation Trigger for Live SIH Evaluator Tests
  const triggerSimulationEvent = (eventType: 'morning_med' | 'memory_game' | 'sos_help' | 'hydration') => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (eventType === 'morning_med') {
      const firstPending = routines.find(r => !r.completed) || routines[0];
      if (firstPending) {
        toggleRoutine(firstPending.id);
      }
    } else if (eventType === 'memory_game') {
      recordCognitiveSession({
        gameType: 'memory_match',
        gameTitle: 'Familiar Memory Match',
        durationSeconds: 68,
        totalAttempts: 6,
        accuracyPercentage: 86,
        difficulty: 'medium',
        responseAverageSeconds: 8.9,
        hintsUsed: 0,
        adaptiveDecision: {
          ruleApplied: 'Adaptive Consistency Peak',
          explanation: 'Asha beat her 7-day baseline (86% vs 84%). High response confidence recorded.',
          nextRecommendedDifficulty: 'medium',
          nextGameType: 'pattern_sequence'
        }
      });
    } else if (eventType === 'sos_help') {
      const sosAlert: CaregiverAlert = {
        id: 'sos-alert-' + Date.now(),
        timestamp: 'Just now (' + nowStr + ')',
        type: 'attention',
        title: 'Emergency Ring from Asha (Veranda Room)',
        description: 'Asha triggered one-touch voice assistance connection from Guwahati residence.',
        whatChanged: 'Immediate priority prompt activated on Caregiver Hub.',
        significance: 'Meaningful Check-in',
        suggestedAction: 'Answer incoming voice link or step into veranda.',
        dismissed: false
      };
      setCaregiverAlerts(prev => {
        const updated = [sosAlert, ...prev];
        syncChannel?.postMessage({ type: 'ALERT_UPDATE', payload: { alerts: updated } });
        return updated;
      });
      addTelemetryLog({
        source: 'patient',
        title: 'Emergency Help Ring Sent',
        detail: 'Asha triggered one-touch call to Priya from device.',
        type: 'sos'
      });
    } else if (eventType === 'hydration') {
      const hyd = routines.find(r => r.category === 'hydration');
      if (hyd) {
        toggleRoutine(hyd.id);
      }
    }
  };

  // Offline Sync execution
  const triggerSync = async () => {
    if (isSyncing || syncQueue.length === 0) return;
    setIsSyncing(true);

    // Simulate 3-stage synchronization
    await new Promise(resolve => setTimeout(resolve, 800)); // Step 1: Encrypt & Package
    await new Promise(resolve => setTimeout(resolve, 900)); // Step 2: Push to Caregiver Store
    await new Promise(resolve => setTimeout(resolve, 500)); // Step 3: Recalculate baseline

    // Add alert to Caregiver portal confirming sync
    const syncAlert: CaregiverAlert = {
      id: 'sync-alert-' + Date.now(),
      timestamp: 'Just now',
      type: 'insight',
      title: 'Offline Activities Synchronized',
      description: `Successfully synchronized ${syncQueue.length} pending activity and routine updates from Asha's offline session.`,
      whatChanged: 'Caregiver dashboard and personal baseline updated to latest timestamps.',
      significance: 'Low',
      suggestedAction: 'View updated cognitive session graph below.',
      dismissed: false
    };

    setCaregiverAlerts(prev => [syncAlert, ...prev]);
    setSyncQueue([]);
    setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setIsSyncing(false);
  };

  // Compute Asha's Personal Baseline from current session data (Asha vs Asha)
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

  // Remote Voice Push Reminders (Priya -> Asha)
  const sendPushReminder = (rem: Omit<RemotePushReminder, 'id' | 'timestamp'>) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullRem: RemotePushReminder = {
      ...rem,
      id: 'push-' + Date.now(),
      timestamp: nowStr
    };
    setActivePushReminder(fullRem);
    sounds.playSuccess();
    speakText(fullRem.voiceNoteText || fullRem.text, language);
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
    syncChannel?.postMessage({ type: 'REMOTE_PUSH_ACKNOWLEDGED', payload: { reminderId: id, message: ackMsg } });
    addTelemetryLog({
      source: 'patient',
      title: 'Voice Reminder Acknowledged',
      detail: `Asha confirmed: "${rem?.text || 'Reminder'}" completed peacefully.`,
      type: 'routine'
    });
  };

  const dismissPushReminder = () => {
    setActivePushReminder(null);
    syncChannel?.postMessage({ type: 'REMOTE_PUSH_DISMISSED', payload: {} });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole: handleSetRole,
        language,
        setLanguage,
        patient,
        routines,
        toggleRoutine,
        snoozeRoutine,
        addRoutineItem,
        cognitiveSessions,
        recordCognitiveSession,
        familyMemories,
        addFamilyMemory,
        baselineMetrics: calculateBaselineMetrics(),
        caregiverAlerts,
        dismissAlert,
        markAlertAction,
        isOffline,
        setIsOffline,
        syncQueue,
        isSyncing,
        lastSyncedTime,
        triggerSync,
        demoTourStep,
        setDemoTourStep,
        isDemoTourActive,
        setIsDemoTourActive,
        activeGameTab,
        setActiveGameTab,
        isVoiceOpen,
        setIsVoiceOpen,
        mobileTab,
        setMobileTab,
        deviceFrame,
        setDeviceFrame,
        mobileSubRole,
        setMobileSubRole,
        telemetryLogs,
        addTelemetryLog,
        triggerSimulationEvent,
        activePushReminder,
        sendPushReminder,
        acknowledgePushReminder,
        dismissPushReminder,
        latestPushAcknowledgement
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
