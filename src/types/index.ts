export type AppRole = 'landing' | 'patient' | 'caregiver' | 'mobile' | 'dual';

export type MobileTab = 'home' | 'games' | 'memories' | 'routine' | 'safety' | 'caregiver';
export type DeviceFrameStyle = 'iphone' | 'pixel' | 'fullscreen';

export type LanguageCode = 'en' | 'as' | 'mni' | 'bn' | 'hi';

export interface TelemetryLogItem {
  id: string;
  timestamp: string;
  source: 'patient' | 'caregiver' | 'ai_engine';
  title: string;
  detail: string;
  type: 'routine' | 'game' | 'sos' | 'sync' | 'voice' | 'insight' | 'location' | 'alarm';
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

export interface AlarmOverlayState {
  isOpen: boolean;
  routineId: string;
  title: string;
  subtitle: string;
  category: 'medicine' | 'hydration' | 'meal' | 'activity' | 'appointment' | 'walk';
  time: string;
  snoozeCount: number;
  priority: 'normal' | 'important' | 'critical';
  callerName?: string;
}

export interface RoutineItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  category: 'medicine' | 'activity' | 'meal' | 'hydration' | 'family' | 'walk' | 'appointment';
  completed: boolean;
  completedAt?: string;
  snoozed?: boolean;
  snoozeCount?: number;
  priority: 'normal' | 'important' | 'critical';
  icon: string;
  dosageOrNotes?: string;
  doctorName?: string;
  locationName?: string;
}

export interface CognitiveSessionResult {
  id: string;
  gameType: 'memory_match' | 'pattern_sequence' | 'word_association' | 'shape_match' | 'mini_sudoku';
  gameTitle: string;
  timestamp: string;
  durationSeconds: number;
  totalAttempts: number;
  accuracyPercentage: number;
  difficulty: 'easy' | 'medium' | 'advanced' | 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'level_5';
  responseAverageSeconds: number;
  hintsUsed: number;
  adaptiveDecision: {
    ruleApplied: string;
    explanation: string;
    nextRecommendedDifficulty: 'easy' | 'medium' | 'advanced' | 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'level_5';
    nextGameType: 'memory_match' | 'pattern_sequence' | 'word_association' | 'shape_match' | 'mini_sudoku';
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
  voiceGender?: 'female' | 'male';
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
  type: 'attention' | 'routine' | 'celebration' | 'insight' | 'location' | 'snooze_warning' | 'sos';
  title: string;
  description: string;
  whatChanged: string;
  significance: 'Low' | 'Moderate' | 'Meaningful Check-in' | 'High Priority';
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
  bloodGroup?: string;
  emergencyDoctor?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  photoUrl: string;
  isPrimary: boolean;
  voiceGender: 'female' | 'male';
}

export type SosStep = 'idle' | 'calling_meera' | 'meera_failed' | 'calling_rahul' | 'connected_rahul' | 'sms_sent';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  address: string;
  areaName: string;
  isHome: boolean;
  distanceFromHomeKm: number;
  lastUpdated: string;
  isLive: boolean;
}

export interface PlaceLocation {
  id: string;
  name: string;
  category: 'home' | 'doctor' | 'hospital' | 'pharmacy' | 'family' | 'park';
  address: string;
  distanceKm: number;
  phone?: string;
  coordinates: { lat: number; lng: number };
  iconName: string;
}

export interface NavigationStep {
  instruction: string;
  distanceMeters: number;
  icon: 'straight' | 'turn-right' | 'turn-left' | 'destination';
  voicePrompt: string;
}

export interface SmartbandMetrics {
  connected: boolean;
  deviceName: string;
  batteryLevel: number;
  lastSyncTime: string;
  stepsToday: number;
  heartRateBpm: number;
  sleepHours: number;
  activityLevel: 'Resting' | 'Light Walking' | 'Active';
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  category: 'folk' | 'flute' | 'river_ambient' | 'bihu';
  duration: string;
  notes: string;
}

export interface ProfileCompletionItem {
  id: string;
  label: string;
  completed: boolean;
  category: 'medical' | 'memory' | 'emergency' | 'preferences';
}

export interface SyncQueueItem {
  id: string;
  type: 'cognitive_session' | 'routine_completion' | 'voice_interaction' | 'memory_interaction' | 'location_update';
  timestamp: string;
  summary: string;
  payload: any;
}
