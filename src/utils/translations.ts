import { LanguageCode, RoutineItem, FamilyMemberMemory, PlaceLocation, NavigationStep } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  greetingMorning: string;
  greetingSubtitle: string;
  orientationTitle: string;
  todayLabel: string;
  timeNowLabel: string;
  locationLabel: string;
  nextUpLabel: string;
  whatToDoNow: string;
  startActivityBtn: string;
  talkToSmritiBtn: string;
  memoriesTitle: string;
  routineTitle: string;
  progressTitle: string;
  safetyCenterTitle: string;
  whereAmITitle: string;
  takeMeHomeBtn: string;
  callCaregiverBtn: string;
  sosEmergencyBtn: string;
  offlineNotice: string;
  onlineNotice: string;
  syncNowBtn: string;
  syncCompleteNotice: string;
  positiveReinforcement: string[];
  positiveMistakeEncouragement: string[];
  rolePatient: string;
  roleCaregiver: string;
  voiceListening: string;
  voiceRecognizing: string;
  voiceResponding: string;
  voiceTapPrompt: string;
  voiceSampleQuestions: string[];
  gameMemoryTitle: string;
  gamePatternTitle: string;
  gameAssociationTitle: string;
  gameShapeTitle: string;
  gameSudokuTitle: string;
  medicineReminder: string;
  hydrationReminder: string;
  alarmDoneBtn: string;
  alarmSnoozeBtn: string;
  musicTitle: string;
  musicNowPlaying: string;
  profileCompletionLabel: string;
  personalBaselineTitle: string;
  // Mobile Nav Tab Labels
  tabHome: string;
  tabGames: string;
  tabMemories: string;
  tabRoutine: string;
  tabSafety: string;
  tabCaregiver: string;
  listenAloudLabel: string;
  listenVoiceNote: string;
  listenDirections: string;
  listenGreeting: string;
  completedPeacefully: string;
  markAsCompleted: string;
  gamePairsLabel: string;
  gameRhythmLabel: string;
  gameWordsLabel: string;
  gameShapesLabel: string;
  gameSudokuLabel: string;
  gameInstructionsMemory: string;
  gameInstructionsPattern: string;
  gameInstructionsAssociation: string;
  gameInstructionsShape: string;
  gameInstructionsSudoku: string;
  lastSessionResult: string;
  awayFromHomeTitle: string;
  reassuranceSos: string;
  reassuranceTakeHome: string;
  doYouRememberPrompt: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "SmritiCare",
    tagline: "Technology that remembers what matters.",
    greetingMorning: "Good Morning, Asha",
    greetingSubtitle: "Let's take today one peaceful step at a time.",
    orientationTitle: "Today & Time",
    todayLabel: "Today",
    timeNowLabel: "Current Time",
    locationLabel: "You are safe at Home in Guwahati with Priya",
    nextUpLabel: "Next Activity",
    whatToDoNow: "What To Do Now",
    startActivityBtn: "Start Memory Game",
    talkToSmritiBtn: "Talk to Smriti",
    memoriesTitle: "Memories That Matter",
    routineTitle: "My Day Routine",
    progressTitle: "Personal Progress",
    safetyCenterTitle: "Safety & Location",
    whereAmITitle: "Where Am I?",
    takeMeHomeBtn: "Take Me Home",
    callCaregiverBtn: "Call Meera (Daughter)",
    sosEmergencyBtn: "Emergency SOS",
    offlineNotice: "OFFLINE • Activities safely saved on device",
    onlineNotice: "ONLINE • Synchronized with Priya",
    syncNowBtn: "Sync Now",
    syncCompleteNotice: "Sync Complete! All records updated.",
    positiveReinforcement: [
      "Wonderful effort, Asha!",
      "You're doing very well. Take your time.",
      "Beautiful memory recall!",
      "Let's explore another one together.",
      "Every small step keeps your mind bright."
    ],
    positiveMistakeEncouragement: [
      "Almost! Let's try another one.",
      "That's okay. Take your time.",
      "Let's look again.",
      "You're doing well. Try another card.",
      "Not this one — let's find its match."
    ],
    rolePatient: "Asha (Patient)",
    roleCaregiver: "Priya (Caregiver)",
    voiceListening: "Listening warmly to you...",
    voiceRecognizing: "Recognizing your words...",
    voiceResponding: "Responding with care...",
    voiceTapPrompt: "Tap microphone and speak naturally",
    voiceSampleQuestions: [
      "What do I have to do now?",
      "Did I take my morning medicine?",
      "Show me photos of Meera and Rahul",
      "Where am I and what time is it?"
    ],
    gameMemoryTitle: "Familiar Memory Match",
    gamePatternTitle: "Daily Rhythm Pattern",
    gameAssociationTitle: "Word & Object Connections",
    gameShapeTitle: "Soothing Shape Match",
    gameSudokuTitle: "Mini Number Memory Grid",
    medicineReminder: "Time for Blood Pressure Medicine",
    hydrationReminder: "Time for Warm Lemon Water",
    alarmDoneBtn: "✓ I Took It / Done",
    alarmSnoozeBtn: "⏰ Snooze 10 Mins",
    musicTitle: "My Favourite Songs",
    musicNowPlaying: "Peaceful Melodies Playing",
    profileCompletionLabel: "Profile Personalization",
    personalBaselineTitle: "Asha's Personal Baseline (Asha vs Asha)",
    tabHome: "Home",
    tabGames: "Games",
    tabMemories: "Memories",
    tabRoutine: "Routine",
    tabSafety: "Safety/Map",
    tabCaregiver: "Priya's Hub",
    listenAloudLabel: "Listen out loud",
    listenVoiceNote: "Listen Voice Note",
    listenDirections: "Listen Directions",
    listenGreeting: "Hear Today's Summary",
    completedPeacefully: "✓ Completed Peacefully",
    markAsCompleted: "✓ Mark as Completed",
    gamePairsLabel: "Pairs",
    gameRhythmLabel: "Rhythm",
    gameWordsLabel: "Words",
    gameShapesLabel: "Shapes",
    gameSudokuLabel: "Grid",
    gameInstructionsMemory: "Find matching pairs of familiar photos. Take your time, there is no rush.",
    gameInstructionsPattern: "Look at the repeating rhythm pattern and choose the friendly picture that comes next.",
    gameInstructionsAssociation: "Look at the main picture and tap what naturally belongs with it.",
    gameInstructionsShape: "Match the shape shown in the center with the options below.",
    gameInstructionsSudoku: "Place the numbers so each row and column has numbers 1 to 4.",
    lastSessionResult: "Last Session Result",
    awayFromHomeTitle: "You Are Away From Home",
    reassuranceSos: "Asha, Priya has been dialed on cellular call. Please sit comfortably, help is on the way.",
    reassuranceTakeHome: "Follow the green walking path towards your home in Guwahati. We are guiding you step by step.",
    doYouRememberPrompt: "Do you remember"
  },
  as: {
    appName: "স্মৃতিকেয়াৰ (SmritiCare)",
    tagline: "যি স্মৃতি আপোনাৰ বাবে মূল্যৱান, তাক মনত ৰখা প্ৰযুক্তি।",
    greetingMorning: "শুভ প্ৰভাত, আশা দেৱী",
    greetingSubtitle: "আজিৰ দিনটো আমি শান্ত আৰু সহজভাৱে আৰম্ভ কৰোঁ।",
    orientationTitle: "আজিৰ বাৰ আৰু সময়",
    todayLabel: "আজি",
    timeNowLabel: "বৰ্তমান সময়",
    locationLabel: "আপুনি গুৱাহাটীৰ নিজা ঘৰত প্ৰিয়াৰ লগত সুৰক্ষিতভাৱে আছে",
    nextUpLabel: "পৰৱৰ্তী কাম",
    whatToDoNow: "এতিয়া কি কৰিব লাগিব",
    startActivityBtn: "স্মৃতি খেল আৰম্ভ কৰক",
    talkToSmritiBtn: "স্মৃতিকোৱাৰ লগত কথা পাতক",
    memoriesTitle: "মৰমৰ সোণোৱালী স্মৃতিবোৰ",
    routineTitle: "মোৰ দিনলিপি আৰু নিয়ম",
    progressTitle: "মোৰ নিজা প্ৰগতি",
    safetyCenterTitle: "সুৰক্ষা আৰু অৱস্থান",
    whereAmITitle: "মই ক'ত আছোঁ?",
    takeMeHomeBtn: "মোক ঘৰলৈ লৈ যাওক",
    callCaregiverBtn: "মীৰাক ফোন কৰক (জীয়াৰী)",
    sosEmergencyBtn: "জৰুৰীকালীন SOS",
    offlineNotice: "অফলাইন • ইন্টাৰনেট নোহোৱাকৈও সকলো সক্ৰিয়",
    onlineNotice: "অনলাইন • প্ৰিয়াৰ লগত সংযুক্ত",
    syncNowBtn: "এতিয়া সিঙ্ক কৰক",
    syncCompleteNotice: "সিঙ্ক সম্পূৰ্ণ হ'ল! সকলো তথ্য আপডেট হৈছে।",
    positiveReinforcement: [
      "বৰ সুন্দৰ প্ৰচেষ্টা, আশা দেৱী!",
      "আপুনি বৰ ভালকৈ কৰিছে। কোনো খৰখেদা নাই।",
      "অতি সুন্দৰ স্মৃতি শক্তি!",
      "আহক, আৰু এটা একেলগে চেষ্টা কৰোঁ।",
      "প্ৰতিটো সৰু পদক্ষেপে আপোনাৰ মন সজীৱ ৰাখে।"
    ],
    positiveMistakeEncouragement: [
      "প্ৰায় মিলি গৈছিল! আহক আন এখন কাৰ্ড চাওঁ।",
      "একো কথা নাই, লাহে লাহে কৰক।",
      "আহক আকৌ এবাৰ চাওঁ।",
      "আপুনি বৰ ভাল খেলিছে, আন এটা কাৰ্ড চেষ্টা কৰক।",
      "এইটো নহয় — আহক ইয়াৰ জোৰাটো বিচাৰি উলিয়াওঁ।"
    ],
    rolePatient: "আশা দেৱী (ৰোগী)",
    roleCaregiver: "প্ৰিয়া (শুশ্ৰূষাকাৰী)",
    voiceListening: "আপোনাৰ কথা শুনি আছোঁ...",
    voiceRecognizing: "বুজিবলৈ চেষ্টা কৰি আছোঁ...",
    voiceResponding: "উত্তৰ দি আছোঁ...",
    voiceTapPrompt: "মাইক্ৰ'ফোনত চুই কথা কওক",
    voiceSampleQuestions: [
      "এতিয়া মই কি কৰিব লাগিব?",
      "মই ৰাতিপুৱাৰ ঔষধ খালোঁনে?",
      "মীৰা আৰু ৰাহুলৰ ফটো দেখুওৱা",
      "আজি কি বাৰ আৰু কেইটা বাজিছে?"
    ],
    gameMemoryTitle: "পৰিচিত বস্তুৰ স্মৃতি খেল",
    gamePatternTitle: "নিয়মীয়া ছন্দ চিনাক্তকৰণ",
    gameAssociationTitle: "শব্দ আৰু ছবিৰ সংযোগ",
    gameShapeTitle: "আকাৰ আৰু ৰং খেল",
    gameSudokuTitle: "মিনি সংখ্যা স্মৃতি গ্ৰিড",
    medicineReminder: "ৰাতিপুৱাৰ ঔষধ খোৱাৰ সময়",
    hydrationReminder: "নেমু পানী খোৱাৰ সময়",
    alarmDoneBtn: "✓ মই খালোঁ / সম্পূৰ্ণ হ'ল",
    alarmSnoozeBtn: "⏰ ১০ মিনিট পলম কৰক",
    musicTitle: "মোৰ প্ৰিয় গান আৰু সুৰ",
    musicNowPlaying: "শান্তিপূৰ্ণ বাঁহীৰ সুৰ বাজি আছে",
    profileCompletionLabel: "প্ৰফাইল সম্পূৰ্ণতা",
    personalBaselineTitle: "আশা দেৱীৰ ব্যক্তিগত বেচলাইন",
    tabHome: "ঘৰ",
    tabGames: "খেল",
    tabMemories: "স্মৃতি",
    tabRoutine: "দিনলিপি",
    tabSafety: "সুৰক্ষা/মেপ",
    tabCaregiver: "প্ৰিয়াৰ হাব",
    listenAloudLabel: "মাত শুনিবলৈ চুই দিয়ক",
    listenVoiceNote: "মৰমৰ মাত শুনক",
    listenDirections: "ৰাস্তাৰ নিৰ্দেশনা শুনক",
    listenGreeting: "আজিৰ দিনটোৰ কথা শুনক",
    completedPeacefully: "✓ শান্তভাৱে সম্পূৰ্ণ হ'ল",
    markAsCompleted: "✓ সম্পূৰ্ণ হ'ল বুলি চিন দিয়ক",
    gamePairsLabel: "যোৰ মিলোৱা",
    gameRhythmLabel: "ছন্দৰ ক্ৰম",
    gameWordsLabel: "ছবি সংযোগ",
    gameShapesLabel: "আকাৰ মিলোৱা",
    gameSudokuLabel: "সংখ্যা গ্ৰিড",
    gameInstructionsMemory: "পৰিচিত ছবিবোৰৰ যোৰ মিলাওক। কোনো খৰখেদা নাই, আৰামেৰে কৰক।",
    gameInstructionsPattern: "ছন্দ আৰু ক্ৰম লক্ষ্য কৰক আৰু ইয়াৰ পিছত কি আহিব বাছি লওক।",
    gameInstructionsAssociation: "প্ৰধান ছবিখন চাওক আৰু ইয়াৰ লগত কোনটো বস্তু খাপ খায় বাছক।",
    gameInstructionsShape: "মাজত দেখুওৱা আকাৰৰ লগত মিল থকা ছবিখন চুই দিয়ক।",
    gameInstructionsSudoku: "১ ৰ পৰা ৪ লৈ সংখ্যাবোৰ খালি ঠাইত বহুৱাওক।",
    lastSessionResult: "পূৰ্বৰ খেলৰ ফলাফল",
    awayFromHomeTitle: "আপুনি ঘৰৰ বাহিৰত আছে",
    reassuranceSos: "আশা বাইদেউ, প্ৰিয়াৰ মোবাইলত ফোন কৰা হৈছে। অনুগ্ৰহ কৰি শান্তিৰে বহক, সহায় আহি আছে।",
    reassuranceTakeHome: "গুৱাহাটীৰ নিজৰ ঘৰলৈ যাবলৈ সেউজীয়া পথ অনুসৰণ কৰক। আমি আপোনাক বাট দেখুৱাই আছোঁ।",
    doYouRememberPrompt: "আপুনি মনত পেলাইছেনে"
  },
  bn: {
    appName: "স্মৃতিকেয়ার (SmritiCare)",
    tagline: "যা কিছু আপন, তা মনে রাখার সহজ প্রযুক্তি।",
    greetingMorning: "শুভ সকাল, আশা দেবী",
    greetingSubtitle: "চলুন আজকের দিনটি শান্ত ও সুন্দরভাবে শুরু করি।",
    orientationTitle: "আজকের দিন ও সময়",
    todayLabel: "আজ",
    timeNowLabel: "বর্তমান সময়",
    locationLabel: "আপনি গুয়াহাটির নিজের বাড়িতে প্রিয়ার সাথে নিরাপদে আছেন",
    nextUpLabel: "পরবর্তী কাজ",
    whatToDoNow: "এখন কী করতে হবে",
    startActivityBtn: "মেমোরি গেম খেলুন",
    talkToSmritiBtn: "স্মৃতির সাথে কথা বলুন",
    memoriesTitle: "মধুর পারিবারিক স্মৃতিমালা",
    routineTitle: "সারাদিনের রুটিন",
    progressTitle: "ব্যক্তিগত প্রগতি",
    safetyCenterTitle: "সুরক্ষা ও অবস্থান",
    whereAmITitle: "আমি কোথায় আছি?",
    takeMeHomeBtn: "আমাকে বাড়ি নিয়ে চলো",
    callCaregiverBtn: "মীরাকে কল করুন (মেয়ে)",
    sosEmergencyBtn: "জরুরী SOS কল",
    offlineNotice: "অফলাইন • ইন্টারনেট ছাড়াই সব নিরাপদে সংরক্ষিত",
    onlineNotice: "অনলাইন • প্রিয়ায় সাথে সিঙ্ক রয়েছে",
    syncNowBtn: "এখনই সিঙ্ক করুন",
    syncCompleteNotice: "সিঙ্ক সম্পন্ন হয়েছে!",
    positiveReinforcement: [
      "অসাধারণ প্রচেষ্টা, আশা দেবী!",
      "আপনি খুব সুন্দর করছেন। একদম সময় নিন।",
      "চমৎকার স্মৃতিশক্তি!",
      "আসুন, একসাথে আরেকটি চেষ্টা করি।",
      "প্রতিটি ছোট পদক্ষেপ আপনার মন সতেজ রাখে।"
    ],
    positiveMistakeEncouragement: [
      "প্রায় হয়ে গিয়েছিল! আসুন অন্য কার্ড দেখি।",
      "কোনো তাড়া নেই, ধীরে সুস্থে করুন।",
      "আসুন আরেকবার দেখে নিই।",
      "আপনি খুব ভালো করছেন, অন্য কার্ড বাছুন।",
      "এটা নয় — আসুন এর সঠিক জোড়া খুঁজি।"
    ],
    rolePatient: "আশা দেবী (রোগী)",
    roleCaregiver: "প্রিয়া (কেয়ারগিভার)",
    voiceListening: "মনোযোগ দিয়ে শুনছি...",
    voiceRecognizing: "আপনার কথা বুঝতে পারছি...",
    voiceResponding: "উত্তর দিচ্ছি...",
    voiceTapPrompt: "মাইকে ট্যাপ করে কথা বলুন",
    voiceSampleQuestions: [
      "এখন আমার কী কাজ আছে?",
      "সকালের ওষুধ কি নিয়েছি?",
      "মীরার ছবি দেখাও",
      "আজ কি বার ও কয়টা বাজে?"
    ],
    gameMemoryTitle: "পরিচিত ছবির মেমোরি ম্যাচ",
    gamePatternTitle: "ছন্দের প্যাটার্ন মেলাও",
    gameAssociationTitle: "শব্দ ও বস্তুর মেলবন্ধন",
    gameShapeTitle: "আকার মেলানোর খেলা",
    gameSudokuTitle: "মিনি সংখ্যার মেমোরি গ্রিড",
    medicineReminder: "সকালের প্রেশারের ওষুধ খাবার সময়",
    hydrationReminder: "লেবু জল খাওয়ার সময়",
    alarmDoneBtn: "✓ ওষুধ খেয়েছি / সম্পন্ন",
    alarmSnoozeBtn: "⏰ ১০ মিনিট পরে মনে করাও",
    musicTitle: "আমার প্রিয় গান",
    musicNowPlaying: "শান্ত বাঁশির সুর বাজছে",
    profileCompletionLabel: "প্রোফাইল সম্পূর্ণতা",
    personalBaselineTitle: "আশা দেবীর নিজস্ব বেসলাইন",
    tabHome: "গৃহ",
    tabGames: "খেলা",
    tabMemories: "স্মৃতি",
    tabRoutine: "রুটিন",
    tabSafety: "সুরক্ষা/ম্যাপ",
    tabCaregiver: "প্রিয়ার হাব",
    listenAloudLabel: "কথাটি শুনুন",
    listenVoiceNote: "গলার আওয়াজ শুনুন",
    listenDirections: "রাস্তার নির্দেশ শুনুন",
    listenGreeting: "আজকের বিবরণ শুনুন",
    completedPeacefully: "✓ শান্তভাবে সম্পন্ন",
    markAsCompleted: "✓ সম্পন্ন চিহ্নিত করুন",
    gamePairsLabel: "জোড়া মেলান",
    gameRhythmLabel: "ছন্দের ক্রম",
    gameWordsLabel: "ছবি সংযোগ",
    gameShapesLabel: "আকার মিল",
    gameSudokuLabel: "সংখ্যার গ্রিড",
    gameInstructionsMemory: "পরিচিত ছবির জোড়া মেলাুন। একদম তাড়া নেই, ধীরে সুস্থে করুন।",
    gameInstructionsPattern: "ছন্দ লক্ষ্য করুন এবং এরপরে কোন ছবি আসবে তা বেছে নিন।",
    gameInstructionsAssociation: "প্রধান ছবিটি দেখুন এবং এর সাথে কোনটি মানানসই তা বাছুন।",
    gameInstructionsShape: "মাঝের আকারের সাথে মিলে যাওয়া ছবিটিতে চাপ দিন।",
    gameInstructionsSudoku: "১ থেকে ৪ সংখ্যাগুলি খালি ঘরে বসিয়ে গ্রিড পূরণ করুন।",
    lastSessionResult: "আগের খেলার ফলাফল",
    awayFromHomeTitle: "আপনি বাড়ির বাইরে আছেন",
    reassuranceSos: "আশা দেবী, প্রিয়ার ফোনে কল করা হয়েছে। শান্ত হয়ে বসুন, সাহায্য পৌঁছে যাচ্ছে।",
    reassuranceTakeHome: "গুয়াহাটির নিজের বাড়ি পৌঁছানোর জন্য সবুজ পথ অনুসরণ করুন। আমরা আপনাকে পথ দেখাচ্ছি।",
    doYouRememberPrompt: "আপনি কি মনে করতে পারছেন"
  },
  mni: {
    appName: "স্মৃতিক্যের (SmritiCare)",
    tagline: "অদোমগী অপাম্ববু নীংশিংবগী তেক্নোলোজি।",
    greetingMorning: "নুমিৎখু খুদিংমক য়াইফরে, আশা",
    greetingSubtitle: "ঙসিগী নুমিৎসি অপাম্বা অমসুং শান্তিনা হৌদোকসি।",
    orientationTitle: "ঙসিগী মতম অমসুং নুমিৎ",
    todayLabel: "ঙসি",
    timeNowLabel: "হৌজিক্কী মতম",
    locationLabel: "অদোম গুৱাহাটিগী য়ুমদা প্রিয়াগা লোয়ননা শান্তিনা লৈরে",
    nextUpLabel: "মথংগী থবক",
    whatToDoNow: "হৌজিক করি তৌগনি",
    startActivityBtn: "নীংশিং সানাবা হৌগসি",
    talkToSmritiBtn: "স্মৃতিক্যেরগা ৱারী শাগসি",
    memoriesTitle: "লুবা নীংশিং খুল্লোন",
    routineTitle: "ঙসিগী থৌরম অমসুং নুমিৎলিপ",
    progressTitle: "অদোমগী নীংশিং প্রগতি",
    safetyCenterTitle: "চেকশিন থৌরাং অমসুং মফম",
    whereAmITitle: "ঐ কদয়দা লৈবগে?",
    takeMeHomeBtn: "ঐবু য়ুমদা পুরম্মু",
    callCaregiverBtn: "মীরাদা কোল তৌবীয়ু",
    sosEmergencyBtn: "খুদক্কী SOS",
    offlineNotice: "ওফলাইন • ইন্টরনেট লৈত্ৰবসু চত্থগনি",
    onlineNotice: "ওনলাইন • প্রিয়াগা শম্নরে",
    syncNowBtn: "হৌজিক সিঙ্ক তৌগসি",
    syncCompleteNotice: "সিঙ্ক লোইরে!",
    positiveReinforcement: [
      "য়াম্না ফরে, আশা দেৱী!",
      "অদোম্না য়াম্না নীংথিনা তৌরি। তেন্না তৌবীয়ু।",
      "নুংঙাইরবা নীংশিং থবক!",
      "অমুক হন্না লোয়ননা হোৎনসি।"
    ],
    positiveMistakeEncouragement: [
      "য়াম্না নকশিল্লক্লে! অমুক হন্না য়েংসি।",
      "তেন্না তৌবীয়ু, খরা মতম লৌজৌ।",
      "অমুক হন্না হোৎনসি।"
    ],
    rolePatient: "আশা (পেসেণ্ট)",
    roleCaregiver: "প্রিয়া (কেয়রগিভর)",
    voiceListening: "অদোমগী খোন্থোক তারে...",
    voiceRecognizing: "ৱাহৈ খঙদোক্লে...",
    voiceResponding: "পাউখুম পীরি...",
    voiceTapPrompt: "মাইক্রোফোন তাশিল্লগা ৱারী শাবীয়ু",
    voiceSampleQuestions: [
      "হৌজিক ঐনা করি তৌগনি?",
      "ঐনা হিদাক চারবরা?",
      "মীরার ফোটো উৎলু"
    ],
    gameMemoryTitle: "পামজবা পোৎলমগী নীংশিং সানাবা",
    gamePatternTitle: "মতৌ খংদোকপা",
    gameAssociationTitle: "ৱাহৈ অমসুং পোৎশক শম্নহনবা",
    gameShapeTitle: "আকার চিনাক্তকরণ",
    gameSudokuTitle: "মিনি মশীং মেমোরি গ্রিড",
    medicineReminder: "অয়ুক্কী হিদাক চাবগী মতম",
    hydrationReminder: "ঈশিং থকপগী নীংশিংহনবা",
    alarmDoneBtn: "✓ চারবনি / লোইরে",
    alarmSnoozeBtn: "⏰ মিনিট ১০ তুংদা",
    musicTitle: "ঐগী পামজবা ইশৈ",
    musicNowPlaying: "বাঁহীগী শান্ত ইশৈ তারে",
    profileCompletionLabel: "প্রোফাইল লোইশিনবা",
    personalBaselineTitle: "আশাগী মশাগী বেসলাইন",
    tabHome: "য়ুম",
    tabGames: "সানাবা",
    tabMemories: "নীংশিং",
    tabRoutine: "থৌরম",
    tabSafety: "চেকশিন/মেপ",
    tabCaregiver: "প্রিয়াগী হব",
    listenAloudLabel: "খোন্থা তাশিল্লগা তাবীয়ু",
    listenVoiceNote: "খোন্থা তাবীয়ু",
    listenDirections: "লম্বীগী পাউতাক তাবীয়ু",
    listenGreeting: "ঙসিগী পাউ তাবীয়ু",
    completedPeacefully: "✓ লোইরে",
    markAsCompleted: "✓ লোইরে হায়না নম্লু",
    gamePairsLabel: "যোড় শম্নহনবা",
    gameRhythmLabel: "মতৌগী ক্ৰম",
    gameWordsLabel: "পোৎশক শম্নহনবা",
    gameShapesLabel: "আকার মিল",
    gameSudokuLabel: "মশীং গ্রিড",
    gameInstructionsMemory: "পামজবা ফোটোগী যোড় শম্নহল্লু। তেন্না তৌবীয়ু।",
    gameInstructionsPattern: "মথংদা করি লাক্কনি য়েংদুনা খল্লু।",
    gameInstructionsAssociation: "মরুওইবা ফোটোসিগা চানবা পোৎলম খল্লু।",
    gameInstructionsShape: "মশক মানবা আকারসিদা নম্লু।",
    gameInstructionsSudoku: "মশীং ১ দগী ৪ ফাওবা খল্লু।",
    lastSessionResult: "মাংঙৈগী মহৈ",
    awayFromHomeTitle: "অদোম য়ুমগী মাপান্দা লৈরি",
    reassuranceSos: "আশা, প্রিয়াগী কোল তৌরে। শান্তিনা লৈবীয়ু, মতেং লাক্কনি।",
    reassuranceTakeHome: "য়ুমদা হল্লক্নবা অশংবা লম্বীসি য়েংবীয়ু।",
    doYouRememberPrompt: "অদোম্না নীংশিংব্ৰা"
  },
  hi: {
    appName: "स्मृतिकेयर (SmritiCare)",
    tagline: "तकनीक जो अपनों और ज़रूरी बातों को याद रखती है।",
    greetingMorning: "सुप्रभात, आशा जी",
    greetingSubtitle: "आइए आज का दिन शांति और सहजता से बिताएं।",
    orientationTitle: "आज का दिन और समय",
    todayLabel: "आज",
    timeNowLabel: "वर्तमान समय",
    locationLabel: "आप गुवाहाटी में अपने घर पर प्रिया के साथ पूरी तरह सुरक्षित हैं",
    nextUpLabel: "अगला कार्य",
    whatToDoNow: "अभी क्या करना है",
    startActivityBtn: "स्मृति खेल शुरू करें",
    talkToSmritiBtn: "स्मृतिकेयर से बात करें",
    memoriesTitle: "प्यारी पारिवारिक यादें",
    routineTitle: "आज की दिनचर्या",
    progressTitle: "आपकी अपनी प्रगति",
    safetyCenterTitle: "सुरक्षा और स्थान",
    whereAmITitle: "मैं कहाँ हूँ?",
    takeMeHomeBtn: "मुझे घर ले चलो",
    callCaregiverBtn: "मीरा को कॉल करें (बेटी)",
    sosEmergencyBtn: "आपातकालीन SOS",
    offlineNotice: "ऑफ़लाइन • बिना इंटरनेट के भी सब चालू और सुरक्षित है",
    onlineNotice: "ऑनलाइन • प्रिया के हब से जुड़ा हुआ",
    syncNowBtn: "अभी सिंक करें",
    syncCompleteNotice: "सिंक पूरा हुआ! सभी आंकड़े अपडेट हो गए हैं।",
    positiveReinforcement: [
      "बहुत बढ़िया प्रयास, आशा जी!",
      "आप बहुत अच्छा कर रही हैं। आराम से करें।",
      "शानदार याददाश्त!",
      "आइए मिलकर एक और कोशिश करें।",
      "हर छोटा कदम आपके मन को तरोताज़ा रखता है।"
    ],
    positiveMistakeEncouragement: [
      "लगभग सही था! आइए दूसरा कार्ड देखते हैं।",
      "कोई बात नहीं, पूरा समय लीजिए।",
      "आइए एक बार फिर ध्यान से देखें।",
      "आप बहुत अच्छा कर रही हैं, दूसरा पत्ता चुनिए।",
      "यह वाला नहीं — आइए इसका सही साथी ढूंढें।"
    ],
    rolePatient: "आशा जी (मरीज़)",
    roleCaregiver: "प्रिया (देखभालकर्ता)",
    voiceListening: "आपकी आवाज़ सुन रहे हैं...",
    voiceRecognizing: "आपके शब्द समझ रहे हैं...",
    voiceResponding: "उत्तर दे रहे हैं...",
    voiceTapPrompt: "माइक छुएं और आराम से बोलें",
    voiceSampleQuestions: [
      "मुझे अभी क्या करना है?",
      "क्या मैंने सुबह की दवा ले ली?",
      "मीरा और राहुल की तस्वीर दिखाएं",
      "आज कौन सा दिन और समय क्या है?"
    ],
    gameMemoryTitle: "पहचाने हुए सामान की स्मृति खेल",
    gamePatternTitle: "पैटर्न और क्रम पहचान",
    gameAssociationTitle: "शब्द और वस्तु का मेल",
    gameShapeTitle: "आकार और रंग मिलान",
    gameSudokuTitle: "मिनी संख्या स्मृति ग्रिड",
    medicineReminder: "सुबह की रक्तचाप दवाई का समय",
    hydrationReminder: "नींबू पानी पीने का समय",
    alarmDoneBtn: "✓ दवाई ले ली / पूरा हुआ",
    alarmSnoozeBtn: "⏰ १० मिनट बाद याद दिलाएं",
    musicTitle: "मेरे पसंदीदा गीत",
    musicNowPlaying: "शांत बांसुरी की धुन बज रही है",
    profileCompletionLabel: "प्रोफ़ाइल पूर्णता",
    personalBaselineTitle: "आशा जी का व्यक्तिगत बेसलाइन (आशा बनाम आशा)",
    tabHome: "घर",
    tabGames: "खेल",
    tabMemories: "यादें",
    tabRoutine: "दिनचर्या",
    tabSafety: "सुरक्षा/नक्शा",
    tabCaregiver: "प्रिया का हब",
    listenAloudLabel: "बोलकर सुनें",
    listenVoiceNote: "अपनों की आवाज़ सुनें",
    listenDirections: "रास्ते के निर्देश सुनें",
    listenGreeting: "आज की पूरी जानकारी सुनें",
    completedPeacefully: "✓ शांतिपूर्वक पूरा हुआ",
    markAsCompleted: "✓ पूरा हुआ दर्ज करें",
    gamePairsLabel: "जोड़ी मिलाएं",
    gameRhythmLabel: "क्रम पहचान",
    gameWordsLabel: "तस्वीर जोड़",
    gameShapesLabel: "आकार मिलान",
    gameSudokuLabel: "संख्या ग्रिड",
    gameInstructionsMemory: "पहचानी हुई तस्वीरों की जोड़ी बनाएं। कोई जल्दबाज़ी नहीं है, आराम से करें।",
    gameInstructionsPattern: "क्रम ध्यान से देखें और पहचानें कि इसके बाद कौन सी तस्वीर आएगी।",
    gameInstructionsAssociation: "मुख्य तस्वीर को देखें और उससे मेल खाने वाली वस्तु चुनें।",
    gameInstructionsShape: "बीच में दिखाए गए आकार से मिलती हुई तस्वीर पर टैप करें।",
    gameInstructionsSudoku: "१ से ४ तक के अंक खाली डिब्बों में भरें।",
    lastSessionResult: "पिछले खेल का परिणाम",
    awayFromHomeTitle: "आप घर से बाहर हैं",
    reassuranceSos: "आशा जी, प्रिया के फ़ोन पर कॉल कर दिया गया है। आराम से बैठिए, सहायता आ रही है।",
    reassuranceTakeHome: "गुवाहाटी के अपने घर लौटने के लिए हरे रास्ते पर आगे बढ़ें। हम आपको रास्ता दिखा रहे हैं।",
    doYouRememberPrompt: "क्या आपको याद हैं"
  }
};

/**
 * Helper to get 100% full localized routine titles & spoken instruction
 */
export function getLocalizedRoutine(routine: RoutineItem, lang: LanguageCode) {
  const map: Record<string, Record<LanguageCode, { title: string; subtitle: string; spoken: string }>> = {
    r1: {
      en: {
        title: "Morning Blood Pressure Medicine",
        subtitle: "1 tablet of Telmisartan (40mg) with warm water",
        spoken: "Asha, please take your morning blood pressure medicine with a glass of warm water."
      },
      as: {
        title: "ৰাতিপুৱাৰ ৰক্তচাপৰ ঔষধ",
        subtitle: "১ টা টেবলেট কুহুমীয়া পানীৰ সৈতে খাব লাগে",
        spoken: "আশা বাইদেউ, অনুগ্ৰহ কৰি ৰাতিপুৱাৰ ব্লাড প্ৰেচাৰৰ ঔষধ কুহুমীয়া পানীৰে খাব।"
      },
      bn: {
        title: "সকালের প্রেশারের ওষুধ",
        subtitle: "১টি ট্যাবলেট হালকা গরম জল দিয়ে খান",
        spoken: "আশা দেবী, সকালের প্রেশারের ওষুধ এক গ্লাস হালকা গরম জল দিয়ে খেয়ে নিন।"
      },
      mni: {
        title: "অয়ুক্কী ব্লাদ প্রেসারগী হিদাক",
        subtitle: "ঈশিং মমৈগা লোয়ননা হিদাক চাবীয়ু",
        spoken: "আশা, অয়ুক্কী ব্লাদ প্রেসারগী হিদাক কুহুম্বা ঈশিংগা লোয়ননা চাবীয়ু।"
      },
      hi: {
        title: "सुबह की ब्लड प्रेशर दवाई",
        subtitle: "१ गोली गुनगुने पानी के साथ लें",
        spoken: "आशा जी, कृपया सुबह की ब्लड प्रेशर की दवाई एक गिलास गुनगुने पानी के साथ ले लीजिए।"
      }
    },
    r2: {
      en: {
        title: "Morning Memory Activity",
        subtitle: "Gentle card matching with familiar memories",
        spoken: "Asha, it is time for your relaxing memory match game."
      },
      as: {
        title: "পুৱাৰ স্মৃতি আৰু মনৰ খেল",
        subtitle: "পৰিচিত মৰমৰ ছবিবোৰ মিলাই মনটো সতেজ কৰক",
        spoken: "আশা বাইদেউ, এতিয়া পুৱাৰ শান্তিপূৰ্ণ স্মৃতি খেল খেলাৰ সময় হৈছে।"
      },
      bn: {
        title: "সকালের মেমোরি গেম",
        subtitle: "প্রিয় ছবির কার্ড মিলিয়ে মন সতেজ রাখুন",
        spoken: "আশা দেবী, এখন আপনার পছন্দের মেমোরি কার্ড মেলানোর সময়।"
      },
      mni: {
        title: "অয়ুক্কী নীংশিং সানাবা",
        subtitle: "পামজবা ফোটো য়েংদুনা নীংশিং সানাবীয়ু",
        spoken: "আশা, হৌজিক অয়ুক্কী শান্ত নীংশিং সানাবা হৌগসি।"
      },
      hi: {
        title: "सुबह का स्मृति खेल",
        subtitle: "पहचानी तस्वीरों के साथ शांतिपूर्वक खेलें",
        spoken: "आशा जी, अब आपके पसंदीदा स्मृति कार्ड खेल का समय है।"
      }
    },
    r3: {
      en: {
        title: "Hydration: Warm Water & Lemon",
        subtitle: "One fresh tall glass with a squeeze of fresh lemon",
        spoken: "Asha, drink a refreshing glass of warm lemon water to stay energized."
      },
      as: {
        title: "কুহুমীয়া নেমু পানী",
        subtitle: "এগিলাচ কুহুমীয়া পানীত অলপ নেমু ৰস মিহলাই খাব লাগে",
        spoken: "আশা বাইদেউ, গাটো সতেজ ৰাখিবলৈ এগিলাচ কুহুমীয়া নেমু পানী খাওক।"
      },
      bn: {
        title: "হালকা গরম লেবু জল",
        subtitle: "শরীর সতেজ রাখতে এক গ্লাস হালকা গরম লেবুর জল",
        spoken: "আশা দেবী, শরীর চনমনে রাখতে এক গ্লাস হালকা গরম লেবুর জল পান করুন।"
      },
      mni: {
        title: "কুহুম্বা চম্প্রা ঈশিং",
        subtitle: "হকচাং নুংঙাইনবা ঈশিং গ্লাস অমা থকপীয়ু",
        spoken: "আশা, হকচাং সোজানবা কুহুম্বা চম্প্রা ঈশিং থকপীয়ু।"
      },
      hi: {
        title: "गुनगुना नींबू पानी",
        subtitle: "शरीर को चुस्त रखने के लिए एक गिलास ताज़ा पानी",
        spoken: "आशा जी, ताज़गी के लिए एक गिलास गुनगुना नींबू पानी पी लीजिए।"
      }
    },
    r4: {
      en: {
        title: "Nutritious Afternoon Meal",
        subtitle: "Steamed Joha rice, yellow dal, and stir-fried greens",
        spoken: "Asha, your warm Joha rice and yellow dal lunch is ready."
      },
      as: {
        title: "দুপৰীয়াৰ পুষ্টিকৰ আহাৰ",
        subtitle: "জহা চাউলৰ ভাত, মচুৰ দাইল আৰু খৰিচা ভাজি",
        spoken: "আশা বাইদেউ, দুপৰীয়াৰ গৰম জহা চাউলৰ ভাত আৰু দাইল খাবৰ হ'ল।"
      },
      bn: {
        title: "দুপুরের পুষ্টিকর খাবার",
        subtitle: "গরম ভাত, ডাল ও টাটকা শাকসবজি",
        spoken: "আশা দেবী, দুপুরের খাবারের সময় হয়েছে। গরম ভাত ও ডাল খেয়ে নিন।"
      },
      mni: {
        title: "নুংথিলগী চাক চাবগী মতম",
        subtitle: "হকচাংগী ফবা চাক অমসুং কাংহোই",
        spoken: "আশা, নুংথিলগী চাক চাবগী মতম ওইরে।"
      },
      hi: {
        title: "दोपहर का पौष्टिक भोजन",
        subtitle: "गरमा-गरम चावल, दाल और हरी सब्ज़ी",
        spoken: "आशा जी, दोपहर के भोजन का समय हो गया है। गरमा-गरम दाल चावल खा लीजिए।"
      }
    },
    r5: {
      en: {
        title: "Appointment: Dr. Barua Consultation",
        subtitle: "Routine blood pressure review at Guwahati Club Clinic",
        spoken: "Asha, you have an appointment with Dr. Barua this afternoon."
      },
      as: {
        title: "ডাঃ বৰুৱাৰ সৈতে স্বাস্থ্য পৰীক্ষা",
        subtitle: "গুৱাহাটী ক্লাব ক্লিনিকত স্বাস্থ্য পৰীক্ষা",
        spoken: "আশা বাইদেউ, আজি আবেলি ডাঃ বৰুৱাৰ ওচৰলৈ যোৱাৰ সময় আছে।"
      },
      bn: {
        title: "ডাক্তার বরুয়ার সাথে পরামর্শ",
        subtitle: "রুটিন প্রেশার চেকআপের অ্যাপয়েন্টমেন্ট",
        spoken: "আশা দেবী, আজ বিকেলে ডাক্তার বরুয়ার সাথে দেখা করার সময় রয়েছে।"
      },
      mni: {
        title: "দোক্তর বরুয়াগা উন্নবগী মতম",
        subtitle: "হকচাং য়েংশিনবগী এপয়েন্টমেন্ট",
        spoken: "আশা, ঙসি নুমিদাংৱাইরমদা দোক্তরগা উন্নবগী মতমনি।"
      },
      hi: {
        title: "डॉक्टर बरुआ से जांच का समय",
        subtitle: "गुवाहाटी क्लब क्लिनिक में नियमित जांच",
        spoken: "आशा जी, आज दोपहर डॉक्टर बरुआ के साथ आपकी जांच का समय है।"
      }
    },
    r6: {
      en: {
        title: "Veranda Walk & Marigold Flowers",
        subtitle: "10-minute peaceful stroll in courtyard garden",
        spoken: "Asha, take a pleasant 10-minute walk in the front garden."
      },
      as: {
        title: "বাৰাণ্ডা আৰু ফুলনিৰ খোজকঢ়া",
        subtitle: "ফুলনি বাগিচাত ১০ মিনিট শান্ত খোজ কঢ়া",
        spoken: "আশা বাইদেউ, ফুলনি বাগিচাত ১০ মিনিট আৰামেৰে খোজ কাঢ়ি লওক।"
      },
      bn: {
        title: "বারান্দা ও বাগানে পায়চারি",
        subtitle: "১০ মিনিট শান্তভাবে বাগানে হাঁটুন",
        spoken: "আশা দেবী, বাগানে গিয়ে ১০ মিনিট একটু আরাম করে হেঁটে আসুন।"
      },
      mni: {
        title: "লেইকোলদা খোংনা চৎপা",
        subtitle: "মিনিট ১০ নুংঙাইনা খোংনা চৎপীয়ু",
        spoken: "আশা, লেইকোল মনুংদা মিনিট ১০ নুংঙাইনা চৎলু।"
      },
      hi: {
        title: "बगीचे में टहलने का समय",
        subtitle: "आंगन और फूलों के बीच १० मिनट टहलें",
        spoken: "आशा जी, बगीचे में जाकर १० मिनट आराम से टहल लीजिए।"
      }
    }
  };

  const entry = map[routine.id] && map[routine.id][lang];
  if (entry) {
    return {
      title: entry.title,
      subtitle: entry.subtitle,
      spokenText: entry.spoken
    };
  }

  return {
    title: routine.title,
    subtitle: routine.subtitle,
    spokenText: `${routine.title}. ${routine.subtitle}`
  };
}

/**
 * Helper to get 100% localized Family Memories for illiterate patients
 */
export function getLocalizedMemory(memory: FamilyMemberMemory, lang: LanguageCode) {
  const map: Record<string, Record<LanguageCode, { relationship: string; story: string; audioText: string; questionPrompt: string }>> = {
    m1: {
      en: {
        relationship: "Daughter (Teacher in Tezpur)",
        story: "Meera is your eldest daughter. She loves tea garden walks and teaches mathematics in Tezpur.",
        audioText: "Ma, remember when we made Narikol Laru together for Magh Bihu? I will visit you this Sunday!",
        questionPrompt: "Do you remember your loving daughter Meera?"
      },
      as: {
        relationship: "জীয়াৰী (তেজপুৰৰ শিক্ষয়িত্ৰী)",
        story: "মীৰা আপোনাৰ জেষ্ঠ্যা কন্যা। তেওঁ চাহ বাগিচাৰ খোজ আৰু তেজপুৰত অংক পঢ়ুৱাই ভাল পায়।",
        audioText: "মা, আমি মাঘ বিহুত একেলগে নাৰিকলৰ লাড়ু বনোৱা মনত আছেনে? মই দেওবাৰে আপোনাৰ ওচৰলৈ যাম!",
        questionPrompt: "আপুনি নিজৰ মৰমৰ জীয়াৰী মীৰাক মনত পেলাইছেনে?"
      },
      bn: {
        relationship: "মেয়ে (তেজপুরের শিক্ষিকা)",
        story: "মীরা আপনার বড় মেয়ে। সে গণিত পড়ায় এবং রবিবার আপনার সাথে দেখা করতে আসছে।",
        audioText: "মা, মনে আছে আমরা বিহু উৎসবে নারকেলের নাড়ু বানাতাম? এই রবিবার আমি আসছি!",
        questionPrompt: "আপনি কি নিজের মেয়ে মীরাকে মনে করতে পারছেন?"
      },
      mni: {
        relationship: "মচানুপী (তেজপুরগী ওজা)",
        story: "মীরা অদোমগী মচানুপীনি। মহাক্না তেজপুরদা ওজা ওইরি।",
        audioText: "ইমা, অদোমগী মচানুপী মীরা ঙসি নুমিৎসিদা কোল তৌরকখ্রে!",
        questionPrompt: "অদোমগী মচানুপী মীরাবু নীংশিংব্ৰা?"
      },
      hi: {
        relationship: "बेटी (तेज़पुर में अध्यापिका)",
        story: "मीरा आपकी बड़ी बेटी हैं। वे तेज़पुर में पढ़ाती हैं और आपसे बहुत प्यार करती हैं।",
        audioText: "माँ, याद है हम बिहू में नारियल के लड्डू बनाते थे? मैं इस रविवार आपसे मिलने आ रही हूँ!",
        questionPrompt: "क्या आपको अपनी प्यारी बेटी मीरा याद हैं?"
      }
    },
    m2: {
      en: {
        relationship: "Son (Engineer in Guwahati)",
        story: "Rahul lives 10 minutes away and visits you every evening with Priya and little Aarav.",
        audioText: "Ma, I brought you fresh red tea leaves from Doomdooma. Let’s sit together on the veranda.",
        questionPrompt: "Do you remember your son Rahul?"
      },
      as: {
        relationship: "পুত্ৰ (গুৱাহাটীৰ অভিযন্তা)",
        story: "ৰাহুল ১০ মিনিট আঁতৰত থাকে আৰু প্ৰতিদিনে সন্ধিয়া প্ৰিয়া আৰু আৰৱক লৈ আপোনাক লগ কৰে।",
        audioText: "মা, মই ডুমডুমাৰ পৰা সুগন্ধি ৰঙা চাহ আনিছোঁ। আহক দুয়ো বাৰাণ্ডাত বহি চাহ খাওঁ।",
        questionPrompt: "আপুনি আপোনাৰ পুত্ৰ ৰাহুলক মনত পেলাইছেনে?"
      },
      bn: {
        relationship: "ছেলে (গুয়াহাটির ইঞ্জিনিয়ার)",
        story: "রাহুল প্রতিদিন সন্ধ্যায় প্রিয়া ও ছোট আরভকে নিয়ে আপনার সাথে দেখা করতে আসে।",
        audioText: "মা, ডুমডুমা থেকে টাটকা চায়ের পাতা এনেছি। চলুন বারান্দায় বসে চা খাই।",
        questionPrompt: "আপনি কি নিজের ছেলে রাহুলকে মনে করতে পারছেন?"
      },
      mni: {
        relationship: "মচানুপা (গুয়াহাটিগী ইঞ্জিনিয়ার)",
        story: "রাহুল অদোমগী মচানুপানি। মহাক্না নুমিদাং খুদিংমক অদোমবু য়েংনবা লাকই।",
        audioText: "ইমা, রাহুরনা অদোমগীদমক চা পুদুনা লাকই।",
        questionPrompt: "অদোমগী মচানুপা রাহুলবু নীংশিংব্ৰা?"
      },
      hi: {
        relationship: "बेटा (गुवाहाटी में इंजीनियर)",
        story: "राहुल रोज़ शाम को प्रिया और आरव के साथ आपसे मिलने आते हैं।",
        audioText: "माँ, मैं ताज़ा लाल चाय पत्ती लाया हूँ। आइए बरामदे में बैठकर चाय पीते हैं।",
        questionPrompt: "क्या आपको अपने सुपुत्र राहुल याद हैं?"
      }
    },
    m3: {
      en: {
        relationship: "Grandson (Age 8)",
        story: "Aarav loves reading folklore stories with you in the afternoon sunshine.",
        audioText: "Aita (Grandma), tell me the story of the Kaziranga Rhinoceros and wise river dolphin again!",
        questionPrompt: "Do you remember your little grandson Aarav?"
      },
      as: {
        relationship: "নাতি ল'ৰা (বয়স ৮ বছৰ)",
        story: "আৰৱে আপোনাৰ লগত দুপৰীয়া সাধুকথা শুনি আৰু ছবি আঁকি বৰ ভাল পায়।",
        audioText: "আইতা, মোক কাজিৰঙাৰ এশিঙীয়া গঁড় আৰু শিহুৰ সাধুটো আকৌ এবাৰ কোৱানা!",
        questionPrompt: "আপুনি নিজৰ মৰমৰ নাতি আৰৱক মনত পেলাইছেনে?"
      },
      bn: {
        relationship: "নাতি (বয়স ৮ বছর)",
        story: "আরভ আপনার কাছে বিকেলে রূপকথার গল্প শুনতে খুব ভালোবাসে।",
        audioText: "ঠাকুমা, আমাকে কাজিরাঙ্গার গণ্ডারের গল্পটা আরেকবার শোনাও না!",
        questionPrompt: "আপনি কি নিজের নাতি আরভকে মনে করতে পারছেন?"
      },
      mni: {
        relationship: "মশু (চহী ৮)",
        story: "আরভ অদোমগা লোয়ননা ফুঙ্গাৱারী তাবা য়াম্না পাম্মি।",
        audioText: "ইবুধৌ/ইবেল্লোক, ঐঙোন্দা ৱারী অমা তাবা পাম্মি!",
        questionPrompt: "মশু আরভবু নীংশিংব্ৰা?"
      },
      hi: {
        relationship: "पोता (उम्र ८ वर्ष)",
        story: "आरव को आपके साथ बैठकर काजीरंगा की कहानियाँ सुनना बहुत पसंद है।",
        audioText: "दादी माँ, मुझे काजीरंगा के गैंडे वाली कहानी फिर से सुनाइए ना!",
        questionPrompt: "क्या आपको अपने छोटे पोते आरव याद हैं?"
      }
    },
    m4: {
      en: {
        relationship: "Ancestral Home in Jorhat",
        story: "Where you lived with your husband surrounded by lush areca palms and tea aroma.",
        audioText: "The peaceful scent of fresh tea leaves and rain on the tin roof of our veranda in Jorhat.",
        questionPrompt: "Do you remember our ancestral home in Jorhat?"
      },
      as: {
        relationship: "যোৰহাটৰ পুৰণি ঘৰ আৰু চাহ বাগিচা",
        story: "য'ত আপুনি তামোল গছ আৰু সেউজীয়া চাহ বাগিচাৰ মাজত বহু বছৰ সুখৰ দিন কটাইছিল।",
        audioText: "যোৰহাটৰ বাৰাণ্ডাৰ টিনৰ চালত বৰষুণৰ টোপাল আৰু পুৱাৰ সুগন্ধি চাহৰ স্মৃতি।",
        questionPrompt: "আপোনাৰ যোৰহাটৰ পুৰণি ঘৰখন মনত পৰিছেনে?"
      },
      bn: {
        relationship: "যোরহাটের পৈতৃক বাড়ি",
        story: "যেখানে চা বাগানের সুগন্ধ আর বৃষ্টির শব্দে অনেক সুন্দর সময় কেটেছে।",
        audioText: "যোরহাটের বারান্দার চালের ওপর বৃষ্টির শব্দ আর সকালের চা।",
        questionPrompt: "আপনার কি যোরহাটের স্মৃতি মনে পড়ছে?"
      },
      mni: {
        relationship: "যোরহাটকী অরিবা য়ুম",
        story: "চাগী লেইকোল মনুংদা শান্তিনা লৈরম্বা মফম।",
        audioText: "যোরহাটকী নুংঙাইরবা নোং অমসুং চাগী নীংশিং।",
        questionPrompt: "যোরহাটকী য়ুম নীংশিংব্ৰা?"
      },
      hi: {
        relationship: "जोरहाट का पुश्तैनी घर",
        story: "जहाँ चाय के बागानों और बरामदे में बैठकर बारिश की बूँदों का आनंद लेते थे।",
        audioText: "जोरहाट के बरामदे में ताज़ा चाय की खुशबू और छत पर बारिश की आवाज़।",
        questionPrompt: "क्या आपको जोरहाट का अपना घर याद है?"
      }
    }
  };

  const entry = map[memory.id] && map[memory.id][lang];
  if (entry) {
    return {
      name: memory.name,
      relationship: entry.relationship,
      storySnippet: entry.story,
      audioNoteText: entry.audioText,
      questionPrompt: entry.questionPrompt
    };
  }

  return {
    name: memory.name,
    relationship: memory.relationship,
    storySnippet: memory.storySnippet,
    audioNoteText: memory.audioNoteText,
    questionPrompt: `Do you remember ${memory.name}?`
  };
}

/**
 * Helper to get 100% localized Places
 */
export function getLocalizedPlace(place: PlaceLocation, lang: LanguageCode) {
  const map: Record<string, Record<LanguageCode, { name: string; address: string; description?: string }>> = {
    p1: {
      en: { name: "Home (Guwahati)", address: "Sector 4, Dispur, Guwahati", description: "Your safe family home with Priya & Rahul" },
      as: { name: "নিজ গৃহ (গুৱাহাটী)", address: "চেক্টৰ ৪, দিশপুৰ, গুৱাহাটী", description: "প্ৰিয়া আৰু ৰাহুলৰ সৈতে আপোনাৰ মৰমৰ ঘৰ" },
      bn: { name: "নিজের বাড়ি (গুয়াহাটি)", address: "সেক্টর ৪, দিশপুর, গুয়াহাটি", description: "প্রিয়া ও রাহুলের সাথে আপনার নিরাপদ বাড়ি" },
      mni: { name: "য়ুম (গুৱাহাটি)", address: "সেক্তর ৪, দিসপুর, গুৱাহাটি", description: "প্রিয়াগা লোয়ননা অদোমগী য়ুম" },
      hi: { name: "अपना घर (गुवाहाटी)", address: "सेक्टर ४, दिसपुर, गुवाहाटी", description: "प्रिया और राहुल के साथ आपका सुरक्षित घर" }
    },
    p2: {
      en: { name: "Guwahati Club Clinic", address: "Dr. Barua Clinic, MC Road", description: "Consultation & BP check clinic" },
      as: { name: "গুৱাহাটী ক্লাব ক্লিনিক", address: "ডাঃ বৰুৱাৰ ক্লিনিক, এম.চি. ৰোড", description: "স্বাস্থ্য পৰীক্ষাৰ ক্লিনিক" },
      bn: { name: "গুয়াহাটি ক্লাব ক্লিনিক", address: "ডাঃ বরুয়া ক্লিনিক, এমসি রোড", description: "ডাক্তারের পরামর্শ কেন্দ্র" },
      mni: { name: "গুৱাহাটি ক্লব ক্লিনিক", address: "দোক্তর বরুয়া ক্লিনিক", description: "হকচাং য়েংশিনবগী মফম" },
      hi: { name: "गुवाहाटी क्लब क्लिनिक", address: "डॉ. बरुआ क्लिनिक, एमसी रोड", description: "स्वास्थ्य जांच व परामर्श केंद्र" }
    },
    p3: {
      en: { name: "Dighalipukhuri Park", address: "Near Assam State Museum", description: "Pleasant garden for afternoon walks" },
      as: { name: "দীঘলীপুখুৰী উদ্যান", address: "অসম ৰাজ্যিক সংগ্ৰহালয়ৰ ওচৰত", description: "আবেলি খোজ কঢ়া সুন্দৰ উদ্যান" },
      bn: { name: "দীঘলীপুকুর পার্ক", address: "আসাম রাজ্য মিউজিয়ামের পাশে", description: "বিকেলের সুন্দর বাগান" },
      mni: { name: "দীঘলীপুখুরী পার্ক", address: "অসাম মিউজিয়মগী নক্নবা", description: "খোংনা চৎপগী মফম" },
      hi: { name: "दीघलीपुखुरी पार्क", address: "असम राज्य संग्रहालय के पास", description: "शाम की सैर के लिए शांत बगीचा" }
    },
    p4: {
      en: { name: "Kamakhya Temple", address: "Nilachal Hills, Guwahati", description: "Sacred temple visited with family" },
      as: { name: "কামাখ্যা ধাম", address: "নীলাচল পাহাৰ, গুৱাহাটী", description: "পবিত্ৰ তীৰ্থ স্থান" },
      bn: { name: "কামাখ্যা মন্দির", address: "নীলাচল পাহাড়, গুয়াহাটি", description: "পবিত্র তীর্থস্থান" },
      mni: { name: "কামাখ্যা লাইশং", address: "নীলাচল চিং", description: "পবিত্র লাইশং" },
      hi: { name: "कामाख्या मंदिर", address: "नीलांचल पर्वत, गुवाहाटी", description: "पवित्र तीर्थ स्थल" }
    }
  };

  const entry = map[place.id] && map[place.id][lang];
  if (entry) {
    return {
      ...place,
      name: entry.name,
      address: entry.address,
      description: entry.description
    };
  }
  return place;
}

/**
 * Helper to get 100% localized Navigation Steps
 */
export function getLocalizedNavigationStep(step: NavigationStep, lang: LanguageCode) {
  const map: Record<string, Record<LanguageCode, { instruction: string; landmark: string }>> = {
    s1: {
      en: { instruction: "Walk straight along the peaceful footpath towards the Assam Tea Stall.", landmark: "Assam Tea Stall with red canopy" },
      as: { instruction: "ৰঙা চালি থকা অসম চাহৰ দোকানৰ ফালে ফুটপাথেৰে পোনহৈ খোজ কাঢ়ক।", landmark: "ৰঙা চালি থকা অসম চাহৰ দোকান" },
      bn: { instruction: "লাল ছাউনি দেওয়া চায়ের দোকানের দিকে ফুটপাত ধরে সোজা এগিয়ে চলুন।", landmark: "লাল ছাউনি দেওয়া চায়ের দোকান" },
      mni: { instruction: "অঙাংবা ফিদা শাবা চাগী দুকানগী মায়কৈদা চৎলু।", landmark: "অসম চাগী দুকান" },
      hi: { instruction: "लाल छतरी वाली असम चाय दुकान की ओर फुटपाथ पर सीधे चलें।", landmark: "लाल छतरी वाली असम चाय दुकान" }
    },
    s2: {
      en: { instruction: "Turn gently right at the Dispur Post Office crossing.", landmark: "Dispur Post Office (Yellow Board)" },
      as: { instruction: "দিশপুৰ ডাকঘৰৰ ওচৰত সোঁফালে লাহেকৈ ঘূৰক।", landmark: "দিশপুৰ ডাকঘৰ (হালধীয়া ফলক)" },
      bn: { instruction: "দিশপুর পোস্ট অফিসের ক্রসিংয়ে আলতো করে ডানদিকে ঘুরুন।", landmark: "দিশপুর পোস্ট অফিস (হলুদ বোর্ড)" },
      mni: { instruction: "দিসপুর পোস্ত ওফিসকী নাকন্দা য়েৎলোমদা লেংউ।", landmark: "দিসপুর পোস্ত ওফিস" },
      hi: { instruction: "दिसपुर डाकघर के पास दाईं ओर मुड़ें।", landmark: "दिसपुर डाकघर (पीला बोर्ड)" }
    },
    s3: {
      en: { instruction: "Continue 100 meters ahead to Sector 4. Your green gate is on the left.", landmark: "Your Green Home Gate with Marigolds" },
      as: { instruction: "১০০ মিটাৰ আগলৈ যাওক। বাওঁফালে আপোনাৰ ফুল থকা সেউজীয়া গেটখন আছে।", landmark: "ফুলনি থকা আপোনাৰ সেউজীয়া ঘৰৰ গেট" },
      bn: { instruction: "১০০ মিটার এগিয়ে যান। বাঁদিকে আপনার ফুলগাছ ঘেরা সবুজ গেট দেখতে পাবেন।", landmark: "আপনার ফুলের বাগান ঘেরা সবুজ গেট" },
      mni: { instruction: "মিতর ১০০ মাংলোমদা চৎলু। ওইরোমদা অদোমগী য়ুমগী থোং লৈরে।", landmark: "য়ুমগী অশংবা থোং" },
      hi: { instruction: "१०० मीटर आगे बढ़ें। बाईं तरफ गेंदे के फूलों वाला आपका हरा गेट है।", landmark: "फूलों वाला आपका हरा घर का गेट" }
    }
  };

  const stepKey = step.id || 's1';
  const entry = (map as any)[stepKey] && (map as any)[stepKey][lang];
  if (entry) {
    return {
      ...step,
      instruction: entry.instruction,
      landmark: entry.landmark
    };
  }
  return step;
}

/**
 * Helper to get Localized Day Names
 */
export function getLocalizedDayName(date: Date, lang: LanguageCode): string {
  const days: Record<LanguageCode, string[]> = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    as: ['দেওবাৰ', 'সোমবাৰ', 'মঙলবাৰ', 'বুধবাৰ', 'বৃহস্পতিবাৰ', 'শুকুৰবাৰ', 'শনিবাৰ'],
    bn: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
    mni: ['নোংমাইজিং', 'নিংথৌকাবা', 'লৈপাকপোকপা', 'য়ুমশেকেইশা', 'শগোলসেন', 'ইরাই', 'থাংজা'],
    hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार']
  };

  const dayIndex = date.getDay();
  return (days[lang] && days[lang][dayIndex]) || days.en[dayIndex];
}

/**
 * Localized Pattern Sequence Puzzles
 */
export function getLocalizedPatternPuzzles(lang: LanguageCode) {
  const puzzles: Record<LanguageCode, {
    sequence: { icon: string; name: string }[];
    options: { icon: string; name: string }[];
    correctIcon: string;
    ruleExplanation: string;
    spokenSuccess: string;
  }[]> = {
    en: [
      {
        sequence: [
          { icon: '🫖', name: 'Tea' },
          { icon: '🌸', name: 'Lotus' },
          { icon: '🫖', name: 'Tea' },
          { icon: '🌸', name: 'Lotus' },
          { icon: '🫖', name: 'Tea' },
          { icon: '❓', name: 'What is next?' }
        ],
        options: [
          { icon: '🌸', name: 'Lotus Flower' },
          { icon: '🦏', name: 'Rhino' },
          { icon: '🍚', name: 'Rice Bowl' },
          { icon: '🧣', name: 'Gamosa' }
        ],
        correctIcon: '🌸',
        ruleExplanation: 'The rhythm alternates gently between Tea Pot and Lotus Flower.',
        spokenSuccess: 'Very nice, Asha! Lotus Flower completes the alternating rhythm.'
      },
      {
        sequence: [
          { icon: '☀️', name: 'Morning Sun' },
          { icon: '🫖', name: 'Morning Tea' },
          { icon: '☀️', name: 'Morning Sun' },
          { icon: '🫖', name: 'Morning Tea' },
          { icon: '❓', name: 'What is next?' }
        ],
        options: [
          { icon: '☀️', name: 'Morning Sun' },
          { icon: '🌙', name: 'Night Moon' },
          { icon: '🥟', name: 'Pitha' },
          { icon: '🛕', name: 'Temple' }
        ],
        correctIcon: '☀️',
        ruleExplanation: 'A daily morning rhythm sequence starting with the bright sun.',
        spokenSuccess: 'Wonderful! The bright morning sun comes next in your daily rhythm.'
      }
    ],
    as: [
      {
        sequence: [
          { icon: '🫖', name: 'চাহ' },
          { icon: '🌸', name: 'পদুম ফুল' },
          { icon: '🫖', name: 'চাহ' },
          { icon: '🌸', name: 'পদুম ফুল' },
          { icon: '🫖', name: 'চাহ' },
          { icon: '❓', name: 'ইয়াৰ পিছত কি আহিব?' }
        ],
        options: [
          { icon: '🌸', name: 'পদুম ফুল' },
          { icon: '🦏', name: 'এশিঙীয়া গঁড়' },
          { icon: '🍚', name: 'ভাতৰ কাঁহী' },
          { icon: '🧣', name: 'গামোচা' }
        ],
        correctIcon: '🌸',
        ruleExplanation: 'চাহ আৰু পদুম ফুল এটাৰ পিছত আনটো নিয়মিত ছন্দত আহিছে।',
        spokenSuccess: 'বৰ সুন্দৰ আশা বাইদেউ! পদুম ফুলে এই ছন্দ সম্পূৰ্ণ কৰিলে।'
      },
      {
        sequence: [
          { icon: '☀️', name: 'পুৱাৰ বেলি' },
          { icon: '🫖', name: 'পুৱাৰ চাহ' },
          { icon: '☀️', name: 'পুৱাৰ বেলি' },
          { icon: '🫖', name: 'পুৱাৰ চাহ' },
          { icon: '❓', name: 'ইয়াৰ পিছত কি আহিব?' }
        ],
        options: [
          { icon: '☀️', name: 'পুৱাৰ বেলি' },
          { icon: '🌙', name: 'জোনবাই' },
          { icon: '🥟', name: 'ঘিলা পিঠা' },
          { icon: '🛕', name: 'নামঘৰ' }
        ],
        correctIcon: '☀️',
        ruleExplanation: 'পুৱাৰ বেলিৰে দিনটোৰ নিয়মীয়া ছন্দ আৰম্ভ হয়।',
        spokenSuccess: 'অতি সুন্দৰ! পুৱাৰ ৰাঙলী বেলি এই ক্ৰমত শুদ্ধ উত্তৰ।'
      }
    ],
    bn: [
      {
        sequence: [
          { icon: '🫖', name: 'চা' },
          { icon: '🌸', name: 'পদ্ম ফুল' },
          { icon: '🫖', name: 'চা' },
          { icon: '🌸', name: 'পদ্ম ফুল' },
          { icon: '🫖', name: 'চা' },
          { icon: '❓', name: 'এর পরে কী?' }
        ],
        options: [
          { icon: '🌸', name: 'পদ্ম ফুল' },
          { icon: '🦏', name: 'গণ্ডার' },
          { icon: '🍚', name: 'ভাতের থালা' },
          { icon: '🧣', name: 'গামোছা' }
        ],
        correctIcon: '🌸',
        ruleExplanation: 'চা এবং পদ্ম ফুল একের পর এক নিয়মিত ছন্দে আসছে।',
        spokenSuccess: 'খুব সুন্দর আশা দেবী! পদ্ম ফুল সঠিক উত্তর।'
      },
      {
        sequence: [
          { icon: '☀️', name: 'সকালের সূর্য' },
          { icon: '🫖', name: 'সকালের চা' },
          { icon: '☀️', name: 'সকালের সূর্য' },
          { icon: '🫖', name: 'সকালের চা' },
          { icon: '❓', name: 'এর পরে কী?' }
        ],
        options: [
          { icon: '☀️', name: 'সকালের সূর্য' },
          { icon: '🌙', name: 'চাঁদ' },
          { icon: '🥟', name: 'পিঠে' },
          { icon: '🛕', name: 'মন্দির' }
        ],
        correctIcon: '☀️',
        ruleExplanation: 'সকালের সুন্দর ছন্দে সূর্যের আলো দিয়ে শুরু।',
        spokenSuccess: 'চমৎকার! সকালের সূর্য এই ছন্দের সঠিক উত্তর।'
      }
    ],
    mni: [
      {
        sequence: [
          { icon: '🫖', name: 'চা' },
          { icon: '🌸', name: 'থম্বাল' },
          { icon: '🫖', name: 'চা' },
          { icon: '🌸', name: 'থম্বাল' },
          { icon: '🫖', name: 'চা' },
          { icon: '❓', name: 'মথংদা করি লাক্কনি?' }
        ],
        options: [
          { icon: '🌸', name: 'থম্বাল লৈ' },
          { icon: '🦏', name: 'সামু' },
          { icon: '🍚', name: 'চাক' },
          { icon: '🧣', name: 'ফি' }
        ],
        correctIcon: '🌸',
        ruleExplanation: 'চা অমসুং থম্বাল লৈ অমগী তুংদা অমা লাকই।',
        spokenSuccess: 'য়াম্না ফরে আশা! থম্বাল লৈনা মতৌ অসি লোইশিন্লে।'
      },
      {
        sequence: [
          { icon: '☀️', name: 'নুমিৎ' },
          { icon: '🫖', name: 'চা' },
          { icon: '☀️', name: 'নুমিৎ' },
          { icon: '🫖', name: 'চা' },
          { icon: '❓', name: 'মথংদা করি?' }
        ],
        options: [
          { icon: '☀️', name: 'নুমিৎ' },
          { icon: '🌙', name: 'থা' },
          { icon: '🥟', name: 'তেন' },
          { icon: '🛕', name: 'লাইশং' }
        ],
        correctIcon: '☀️',
        ruleExplanation: 'অয়ুক্কী মতৌদা নুমিৎ মাংদা লাকই।',
        spokenSuccess: 'য়াম্না ফরে! নুমিৎনা মথংগী ওইরে।'
      }
    ],
    hi: [
      {
        sequence: [
          { icon: '🫖', name: 'चाय' },
          { icon: '🌸', name: 'कमल का फूल' },
          { icon: '🫖', name: 'चाय' },
          { icon: '🌸', name: 'कमल का फूल' },
          { icon: '🫖', name: 'चाय' },
          { icon: '❓', name: 'इसके बाद क्या आएगा?' }
        ],
        options: [
          { icon: '🌸', name: 'कमल का फूल' },
          { icon: '🦏', name: 'गैंडा' },
          { icon: '🍚', name: 'चावल की थाली' },
          { icon: '🧣', name: 'गमोछा' }
        ],
        correctIcon: '🌸',
        ruleExplanation: 'चाय और कमल का फूल एक के बाद एक नियमित क्रम में आ रहे हैं।',
        spokenSuccess: 'बहुत खूब आशा जी! कमल का फूल इस क्रम को पूरा करता है।'
      },
      {
        sequence: [
          { icon: '☀️', name: 'सुबह का सूरज' },
          { icon: '🫖', name: 'सुबह की चाय' },
          { icon: '☀️', name: 'सुबह का सूरज' },
          { icon: '🫖', name: 'सुबह की चाय' },
          { icon: '❓', name: 'इसके बाद क्या आएगा?' }
        ],
        options: [
          { icon: '☀️', name: 'सुबह का सूरज' },
          { icon: '🌙', name: 'चाँद' },
          { icon: '🥟', name: 'पीठा' },
          { icon: '🛕', name: 'मंदिर' }
        ],
        correctIcon: '☀️',
        ruleExplanation: 'सुबह की सुखद दिनचर्या का प्राकृतिक क्रम।',
        spokenSuccess: 'शानदार! सुबह का चमकता सूरज इस क्रम का सही उत्तर है।'
      }
    ]
  };

  return puzzles[lang] || puzzles.en;
}

/**
 * Localized Word Association Deck
 */
export function getLocalizedAssociationDeck(lang: LanguageCode) {
  const deck: Record<LanguageCode, {
    promptIcon: string;
    promptTitle: string;
    promptSubtext: string;
    options: { icon: string; title: string; isCorrect: boolean }[];
    explanation: string;
    spokenSuccess: string;
  }[]> = {
    en: [
      {
        promptIcon: '🫖',
        promptTitle: 'Fresh Assam Tea',
        promptSubtext: 'Morning warm beverage brewed on the stove',
        options: [
          { icon: '☕', title: 'Tea Cup', isCorrect: true },
          { icon: '👞', title: 'Walking Shoe', isCorrect: false },
          { icon: '📚', title: 'Story Book', isCorrect: false },
          { icon: '🪑', title: 'Wooden Chair', isCorrect: false }
        ],
        explanation: 'Tea is lovingly poured into a warm tea cup to enjoy on the veranda.',
        spokenSuccess: 'Wonderful, Asha! Tea Cup is the perfect match.'
      },
      {
        promptIcon: '🌾',
        promptTitle: 'Bihu Festival Celebration',
        promptSubtext: 'Joyful harvest festival of Assam',
        options: [
          { icon: '🥁', title: 'Bihu Dhol (Drum)', isCorrect: true },
          { icon: '🚗', title: 'Motor Car', isCorrect: false },
          { icon: '🔑', title: 'House Key', isCorrect: false },
          { icon: '📻', title: 'Transistor Radio', isCorrect: false }
        ],
        explanation: 'The traditional Dhol drum plays cheerful rhythms for the Bihu dance.',
        spokenSuccess: 'Great memory! The Dhol drum belongs with the Bihu festival.'
      },
      {
        promptIcon: '🌧️',
        promptTitle: 'Monsoon Rain Shower',
        promptSubtext: 'Rain drops falling gently on the tin roof',
        options: [
          { icon: '☂️', title: 'Umbrella / Japi', isCorrect: true },
          { icon: '🥄', title: 'Eating Spoon', isCorrect: false },
          { icon: '🕯️', title: 'Candle Light', isCorrect: false },
          { icon: '🪡', title: 'Sewing Needle', isCorrect: false }
        ],
        explanation: 'The woven Japi hat or umbrella keeps us dry in the fresh monsoon rain.',
        spokenSuccess: 'Spot on! The umbrella or Japi keeps us protected in rain.'
      }
    ],
    as: [
      {
        promptIcon: '🫖',
        promptTitle: 'পুৱাৰ গৰম চাহ',
        promptSubtext: 'কেৰাহীত উতলোৱা সুগন্ধি ৰঙা চাহ',
        options: [
          { icon: '☕', title: 'চাহৰ কাপ', isCorrect: true },
          { icon: '👞', title: 'জোতা', isCorrect: false },
          { icon: '📚', title: 'সাধু কিতাপ', isCorrect: false },
          { icon: '🪑', title: 'কাঠৰ চকী', isCorrect: false }
        ],
        explanation: 'বাৰাণ্ডাত বহি সোৱাদ ল’বলৈ চাহ কাপত ঢালি খোৱা হয়।',
        spokenSuccess: 'অতি সুন্দৰ আশা বাইদেউ! চাহৰ লগত চাহৰ কাপহে খাপ খায়।'
      },
      {
        promptIcon: '🌾',
        promptTitle: 'ৰঙালী বিহুৰ আনন্দ',
        promptSubtext: 'অসমৰ প্ৰাণ আৰু চেনেহৰ কৃষি উৎসৱ',
        options: [
          { icon: '🥁', title: 'বিহুৰ ঢোল', isCorrect: true },
          { icon: '🚗', title: 'মটৰ গাড়ী', isCorrect: false },
          { icon: '🔑', title: 'ঘৰৰ চাবি', isCorrect: false },
          { icon: '📻', title: 'ৰেডিঅ’', isCorrect: false }
        ],
        explanation: 'বিহু নৃত্য আৰু গীতৰ লগত ঢোলৰ মাত অবিচ্ছেদ্য।',
        spokenSuccess: 'বৰ ভাল মনত আছে! বিহুৰ লগত ঢোলৰ ছন্দ মিলি যায়।'
      },
      {
        promptIcon: '🌧️',
        promptTitle: 'বৰষুণৰ টোপাল',
        promptSubtext: 'টিনৰ চালত পৰা বৰষুণৰ শান্ত টোপাল',
        options: [
          { icon: '☂️', title: 'জাপি / ছাতি', isCorrect: true },
          { icon: '🥄', title: 'চামুচ', isCorrect: false },
          { icon: '🕯️', title: 'মমবাতি', isCorrect: false },
          { icon: '🪡', title: 'বেজী', isCorrect: false }
        ],
        explanation: 'বৰষুণৰ পৰা হাত সাৰিবলৈ সুন্দৰ জাপি বা ছাতি ব্যৱহাৰ কৰা হয়।',
        spokenSuccess: 'একেবাৰে সঠিক! বৰষুণত জাপি আৰু ছাতিয়েহে ৰক্ষা কৰে।'
      }
    ],
    bn: [
      {
        promptIcon: '🫖',
        promptTitle: 'সকালের তাজা চা',
        promptSubtext: 'উনুনে তৈরি সুগন্ধি চা',
        options: [
          { icon: '☕', title: 'চায়ের কাপ', isCorrect: true },
          { icon: '👞', title: 'জুতো', isCorrect: false },
          { icon: '📚', title: 'বই', isCorrect: false },
          { icon: '🪑', title: 'কাঠের চেয়ার', isCorrect: false }
        ],
        explanation: 'বারান্দায় বসে পান করার জন্য চা কাপে ঢালা হয়।',
        spokenSuccess: 'চমৎকার আশা দেবী! চায়ের সাথে কাপ সবচেয়ে মানানসই।'
      },
      {
        promptIcon: '🌾',
        promptTitle: 'বিহু উৎসব',
        promptSubtext: 'আনন্দের ফসল কাটার উৎসব',
        options: [
          { icon: '🥁', title: 'বিহুর ঢোল', isCorrect: true },
          { icon: '🚗', title: 'গাড়ি', isCorrect: false },
          { icon: '🔑', title: 'চাবি', isCorrect: false },
          { icon: '📻', title: 'রেডিও', isCorrect: false }
        ],
        explanation: 'বিহু নাচের সাথে ঐতিহ্যবাহী ঢোল বাজে।',
        spokenSuccess: 'খুব সুন্দর স্মৃতি! বিহুর সাথে ঢোলের বোল মানায়।'
      },
      {
        promptIcon: '🌧️',
        promptTitle: 'বর্ষার বৃষ্টি',
        promptSubtext: 'টিনের চালে বৃষ্টির টুপটাপ শব্দ',
        options: [
          { icon: '☂️', title: 'ছাতা / জাপি', isCorrect: true },
          { icon: '🥄', title: 'চামচ', isCorrect: false },
          { icon: '🕯️', title: 'মোমবাতি', isCorrect: false },
          { icon: '🪡', title: 'ছুঁচ', isCorrect: false }
        ],
        explanation: 'বৃষ্টি থেকে বাঁচতে ছাতা বা জাপি ব্যবহার করা হয়।',
        spokenSuccess: 'একদম সঠিক! বৃষ্টির হাত থেকে ছাতাই বাঁচায়।'
      }
    ],
    mni: [
      {
        promptIcon: '🫖',
        promptTitle: 'অয়ুক্কী চা',
        promptSubtext: 'নুংঙাইরবা চাগী মনম',
        options: [
          { icon: '☕', title: 'চাগী কাপ', isCorrect: true },
          { icon: '👞', title: 'খোংউপ', isCorrect: false },
          { icon: '📚', title: 'লাইরিক', isCorrect: false },
          { icon: '🪑', title: 'চৌকি', isCorrect: false }
        ],
        explanation: 'চাগা কাপকা শম্নৈ।',
        spokenSuccess: 'য়াম্না ফরে আশা! চাগী কাপ চুম্লে।'
      },
      {
        promptIcon: '🌾',
        promptTitle: 'বিহু হরাওবা',
        promptSubtext: 'উৎসবকী নুংঙাইবা',
        options: [
          { icon: '🥁', title: 'ঢোল (পুং)', isCorrect: true },
          { icon: '🚗', title: 'গাড়ী', isCorrect: false },
          { icon: '🔑', title: 'থোং চাবি', isCorrect: false },
          { icon: '📻', title: 'রেডিও', isCorrect: false }
        ],
        explanation: 'বিহুগা ঢোল পুংগা শম্নৈ।',
        spokenSuccess: 'য়াম্না ফরে! বিহুদা ঢোল শিজিন্নৈ।'
      },
      {
        promptIcon: '🌧️',
        promptTitle: 'নোং চুবা',
        promptSubtext: 'নোংগী ঈশিং',
        options: [
          { icon: '☂️', title: 'শেত্ৰা / জাপি', isCorrect: true },
          { icon: '🥄', title: 'খুজি', isCorrect: false },
          { icon: '🕯️', title: 'মৈরা', isCorrect: false },
          { icon: '🪡', title: 'য়োৎশং', isCorrect: false }
        ],
        explanation: 'নোংদগী কননবা শেত্ৰা শিজিন্নৈ।',
        spokenSuccess: 'চুম্লে! নোংদগী শেত্ৰানা কনই।'
      }
    ],
    hi: [
      {
        promptIcon: '🫖',
        promptTitle: 'सुबह की ताज़ा चाय',
        promptSubtext: 'चूल्हे पर पकी गरमा-गरम चाय',
        options: [
          { icon: '☕', title: 'चाय का कप', isCorrect: true },
          { icon: '👞', title: 'जूता', isCorrect: false },
          { icon: '📚', title: 'कहानी की किताब', isCorrect: false },
          { icon: '🪑', title: 'लकड़ी की कुर्सी', isCorrect: false }
        ],
        explanation: 'बरामदे में बैठकर आनंद लेने के लिए चाय को कप में परोसा जाता है।',
        spokenSuccess: 'बहुत खूब आशा जी! चाय के साथ चाय का कप ही सही मेल है।'
      },
      {
        promptIcon: '🌾',
        promptTitle: 'बिहू उत्सव की खुशियाँ',
        promptSubtext: 'असम का प्यारा फसल उत्सव',
        options: [
          { icon: '🥁', title: 'बिहू का ढोल', isCorrect: true },
          { icon: '🚗', title: 'मोटर गाड़ी', isCorrect: false },
          { icon: '🔑', title: 'घर की चाबी', isCorrect: false },
          { icon: '📻', title: 'रेडियो', isCorrect: false }
        ],
        explanation: 'बिहू के पारंपरिक नृत्य में ढोल की थाप गूंजती है।',
        spokenSuccess: 'शानदार याददाश्त! बिहू उत्सव के साथ ढोल का मेल है।'
      },
      {
        promptIcon: '🌧️',
        promptTitle: 'मॉनसून की बारिश',
        promptSubtext: 'छत पर गिरती बारिश की सुखद बूँदें',
        options: [
          { icon: '☂️', title: 'छाता / जापी', isCorrect: true },
          { icon: '🥄', title: 'चम्मच', isCorrect: false },
          { icon: '🕯️', title: 'मोमबत्ती', isCorrect: false },
          { icon: '🪡', title: 'सुई-धागा', isCorrect: false }
        ],
        explanation: 'बारिश से बचने के लिए छाता या जापी का इस्तेमाल किया जाता है।',
        spokenSuccess: 'बिल्कुल सही! बारिश में छाता हमें भीगने से बचाता है।'
      }
    ]
  };

  return deck[lang] || deck.en;
}
