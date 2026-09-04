export type AppRole = 'landing' | 'patient' | 'caregiver' | 'mobile' | 'dual';

export type MobileTab = 'home' | 'games' | 'memories' | 'routine' | 'caregiver';
export type DeviceFrameStyle = 'iphone' | 'pixel' | 'fullscreen';

export interface TelemetryLogItem {
  id: string;
  timestamp: string;
  source: 'patient' | 'caregiver' | 'ai_engine';
  title: string;
  detail: string;
  type: 'routine' | 'game' | 'sos' | 'sync' | 'voice' | 'insight';
}

export interface RemotePushReminder {
  id: string;
  text: string;
  category: 'medicine' | 'hydration' | 'meal' | 'walk' | 'family' | 'custom';
  timestamp: string;
  senderName: string;
  voiceNoteText?: string;
  acknowledged?: boolean;
}

export type LanguageCode = 'en' | 'as' | 'mni' | 'bn' | 'hi';

export interface RoutineItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  category: 'medicine' | 'activity' | 'meal' | 'hydration' | 'family' | 'walk';
  completed: boolean;
  completedAt?: string;
  snoozed?: boolean;
  priority: 'high' | 'normal';
  icon: string;
  dosageOrNotes?: string;
}

export interface CognitiveSessionResult {
  id: string;
  gameType: 'memory_match' | 'pattern_sequence' | 'word_association';
  gameTitle: string;
  timestamp: string;
  durationSeconds: number;
  totalAttempts: number;
  accuracyPercentage: number;
  difficulty: 'easy' | 'medium' | 'advanced';
  responseAverageSeconds: number;
  hintsUsed: number;
  adaptiveDecision: {
    ruleApplied: string;
    explanation: string;
    nextRecommendedDifficulty: 'easy' | 'medium' | 'advanced';
    nextGameType: 'memory_match' | 'pattern_sequence' | 'word_association';
  };
  offlineCreated?: boolean;
}

export interface FamilyMemberMemory {
  id: string;
  name: string;
  relationship: string;
  location: string;
  photoUrl: string;
  audioNoteText: string;
  storySnippet: string;
  favoriteMemory: string;
  keyYear?: string;
  familiarObject?: string;
}

export interface BaselineMetric {
  name: string;
  score: number; // 0-100
  recentTrend: 'improving' | 'stable' | 'slower' | 'gentle_attention';
  trendText: string;
  sevenDayHistory: number[]; // array of 7 points
  unit?: string;
  interpretation: string;
}

export interface CaregiverAlert {
  id: string;
  timestamp: string;
  type: 'attention' | 'routine' | 'celebration' | 'insight';
  title: string;
  description: string;
  whatChanged: string;
  significance: 'Low' | 'Moderate' | 'Meaningful Check-in';
  suggestedAction: string;
  dismissed: boolean;
  actionTaken?: boolean;
}

export interface PatientProfile {
  name: string;
  age: number;
  location: string;
  nativeLanguage: LanguageCode;
  caregiverName: string;
  caregiverRelationship: string;
  recentBaselineSummary: string;
  lastActiveMinutesAgo: number;
}

export interface SyncQueueItem {
  id: string;
  type: 'cognitive_session' | 'routine_completion' | 'voice_interaction' | 'memory_interaction';
  timestamp: string;
  summary: string;
  payload: any;
}
