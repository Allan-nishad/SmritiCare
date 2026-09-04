import { LanguageCode } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  greetingMorning: string;
  greetingSubtitle: string;
  orientationTitle: string;
  todayLabel: string;
  startActivityBtn: string;
  talkToSmritiBtn: string;
  memoriesTitle: string;
  routineTitle: string;
  progressTitle: string;
  offlineNotice: string;
  syncNowBtn: string;
  positiveReinforcement: string[];
  rolePatient: string;
  roleCaregiver: string;
  voiceListening: string;
  voiceTapPrompt: string;
  voiceSampleQuestions: string[];
  gameMemoryTitle: string;
  gamePatternTitle: string;
  gameAssociationTitle: string;
  medicineReminder: string;
  hydrationReminder: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "SmritiCare",
    tagline: "Personal cognitive support that remembers what matters.",
    greetingMorning: "Good Morning, Asha",
    greetingSubtitle: "Let's take today one peaceful step at a time.",
    orientationTitle: "Where Am I Today?",
    todayLabel: "Today",
    startActivityBtn: "Start Today's Memory Activity",
    talkToSmritiBtn: "Talk to SmritiCare",
    memoriesTitle: "Memories That Matter",
    routineTitle: "My Day Routine",
    progressTitle: "Your Personal Progress",
    offlineNotice: "Offline Mode Active • Activities work without internet",
    syncNowBtn: "Sync Now",
    positiveReinforcement: [
      "Wonderful effort, Asha!",
      "You're doing very well. Take your time.",
      "Beautiful memory recall!",
      "Let's explore another one together.",
      "Every small step keeps your mind bright."
    ],
    rolePatient: "I am Asha (Patient)",
    roleCaregiver: "I am Priya (Caregiver)",
    voiceListening: "Listening warmly to you...",
    voiceTapPrompt: "Tap the microphone and speak naturally",
    voiceSampleQuestions: [
      "What do I have to do now?",
      "Did I take my morning medicine?",
      "Show me photos of Meera",
      "What day and time is it today?"
    ],
    gameMemoryTitle: "Familiar Memory Match",
    gamePatternTitle: "Daily Rhythm Pattern",
    gameAssociationTitle: "Word & Object Connections",
    medicineReminder: "Morning Blood Pressure Medicine",
    hydrationReminder: "Warm Water & Lemon Hydration"
  },
  as: {
    appName: "স্মৃতिकेয়াৰ (SmritiCare)",
    tagline: "আপোনাৰ মন আৰু স্মৃতিৰ আন্তৰিক সংগী।",
    greetingMorning: "শুভ প্ৰভাত, আশা দেৱী",
    greetingSubtitle: "আজিৰ দিনটো আমি শান্ত আৰু সহজভাৱে আৰম্ভ কৰোঁ।",
    orientationTitle: "আজি মই ক'ত আছোঁ আৰু কি সময়?",
    todayLabel: "আজি",
    startActivityBtn: "আজিৰ স্মৃতি কাৰ্য্যকলাপ আৰম্ভ কৰক",
    talkToSmritiBtn: "স্মৃতिकेয়াৰৰ লগত কথা পাতক",
    memoriesTitle: "মৰমৰ সোণোৱালী স্মৃতিবোৰ",
    routineTitle: "আজিৰ দিনলিপি আৰু নিয়ম",
    progressTitle: "আপোনাৰ নিজা স্মৃতি প্ৰগতি",
    offlineNotice: "ইন্টাৰনেট অবিহনেও স্মৃতिकेয়াৰ সম্পূৰ্ণ সক্ৰিয়",
    syncNowBtn: "এতিয়া সংযোগ কৰক (Sync)",
    positiveReinforcement: [
      "বৰ সুন্দৰ প্ৰচেষ্টা, আশা দেৱী!",
      "আপুনি বৰ ভালকৈ কৰিছে। কোনো খৰখেদা নাই।",
      "অতি সুন্দৰ স্মৃতি শক্তি!",
      "আহক, আৰু এটা একেলগে চেষ্টা কৰোঁ।"
    ],
    rolePatient: "মই আশা দেৱী (ৰোগী)",
    roleCaregiver: "মই প্ৰিয়া (শুশ্ৰূষাকাৰী)",
    voiceListening: "আপোনাৰ কথা শুনি আছোঁ...",
    voiceTapPrompt: "মাইক্ৰ'ফোনত চুই কথা কওক",
    voiceSampleQuestions: [
      "এতিয়া মই কি কৰিব লাগিব?",
      "মই ৰাতিপুৱাৰ ঔষধ খালোঁনে?",
      "মীৰাৰ ফটো দেখুওৱা",
      "আজি কি বাৰ আৰু কেইটা বাজিছে?"
    ],
    gameMemoryTitle: "পৰিচিত বস্তুৰ স্মৃতি খেল",
    gamePatternTitle: "নিয়মীয়া ছন্দ চিনাক্তকৰণ",
    gameAssociationTitle: "শব্দ আৰু ছবিৰ সংযোগ",
    medicineReminder: "ৰাতিপুৱাৰ ঔষধৰ সময়",
    hydrationReminder: "পানী খোৱাৰ সোঁৱৰণী"
  },
  mni: {
    appName: "স্মৃতিক্যের (SmritiCare)",
    tagline: "অদোমগী ৱাখল অমসুং নীংশিংবগী মরূপ।",
    greetingMorning: "নুমিৎখু খুদিংমক য়াইফরে, আশা",
    greetingSubtitle: "ঙসিগী নুমিৎসি অপাম্বা অমসুং শান্তিনা হৌদোকসি।",
    orientationTitle: "ঙসি ঐ কদয়দা লৈবগে?",
    todayLabel: "ঙসি",
    startActivityBtn: "ঙসিগী নীংশিং থবক হৌগসি",
    talkToSmritiBtn: "স্মৃতিক্যেরগা ৱারী শাগসি",
    memoriesTitle: "লুবা নীংশিং খুল্লোন",
    routineTitle: "ঙসিগী থৌরম অমসুং নুমিৎলিপ",
    progressTitle: "অদোমগী নীংশিং প্রগতি",
    offlineNotice: "ইন্টরনেট লৈত্ৰবসু থবক পুম্নমক চত্থগনি",
    syncNowBtn: "হৌজিক সিঙ্ক তৌগসি",
    positiveReinforcement: [
      "য়াম্না ফরে, আশা দেৱী!",
      "অদোম্না য়াম্না নীংথিনা তৌরি। তেন্না তৌবীয়ু।",
      "নুংঙাইরবা নীংশিং থবক!"
    ],
    rolePatient: "ঐ আশা (পেসেণ্ট)",
    roleCaregiver: "ঐ প্রিয়া (কেয়রগিভর)",
    voiceListening: "অদোমগী খোন্থোক তারে...",
    voiceTapPrompt: "মাইক্রোফোন তাশিল্লগা ৱারী শাবীয়ু",
    voiceSampleQuestions: [
      "হৌজিক ঐনা করি তৌগনি?",
      "ঐনা হিদাক চারবরা?",
      "মীরার ফোটো উৎলু"
    ],
    gameMemoryTitle: "পামজবা পোৎলমগী নীংশিং সানাবা",
    gamePatternTitle: "মতৌ খংদোকপা",
    gameAssociationTitle: "ৱাহৈ অমসুং পোৎশক শম্নহনবা",
    medicineReminder: "অয়ুক্কী হিদাক চাবগী মতম",
    hydrationReminder: "ঈশিং থকপগী নীংশিংহনবা"
  },
  bn: {
    appName: "স্মৃতिकेয়ার (SmritiCare)",
    tagline: "ব্যক্তিগত স্মৃতির আন্তরিক সঙ্গী।",
    greetingMorning: "শুভ সকাল, আশা দেবী",
    greetingSubtitle: "চলুন আজকের দিনটি শান্ত ও সুন্দরভাবে শুরু করি।",
    orientationTitle: "আজ আমি কোথায় ও সময় কত?",
    todayLabel: "আজ",
    startActivityBtn: "আজকের মেমোরি অ্যাক্টিভিটি শুরু করুন",
    talkToSmritiBtn: "স্মৃতिकेয়ারের সাথে কথা বলুন",
    memoriesTitle: "মধুর স্মৃতিমালা",
    routineTitle: "সারাদিনের রুটিন",
    progressTitle: "আপনার নিজস্ব প্রগতি",
    offlineNotice: "ইন্টারনেট ছাড়াও সব কাজ চলছে",
    syncNowBtn: "এখনই সিঙ্ক করুন",
    positiveReinforcement: [
      "অসাধারণ প্রচেষ্টা, আশা দেবী!",
      "আপনি খুব সুন্দর করছেন। একদম সময় নিন।",
      "চমৎকার স্মৃতিশক্তি!"
    ],
    rolePatient: "আমি আশা দেবী (প্যাশেন্ট)",
    roleCaregiver: "আমি প্রিয়া (কেয়ারগিভার)",
    voiceListening: "মনোযোগ দিয়ে শুনছি...",
    voiceTapPrompt: "মাইক্রোফোনে ট্যাপ করে কথা বলুন",
    voiceSampleQuestions: [
      "এখন আমার কী কাজ আছে?",
      "সকালের ওষুধ কি নিয়েছি?",
      "মীরার ছবি দেখাও"
    ],
    gameMemoryTitle: "পরিচিত ছবির মেমোরি ম্যাচ",
    gamePatternTitle: "ছন্দের প্যাটার্ন মেলাও",
    gameAssociationTitle: "শব্দ ও বস্তুর মেলবন্ধন",
    medicineReminder: "সকালের প্রেশারের ওষুধ",
    hydrationReminder: "জল খাওয়ার সময়"
  },
  hi: {
    appName: "स्मृतिकेयर (SmritiCare)",
    tagline: "व्यक्तिगत संज्ञानात्मक साथी जो अपनों को याद रखता है।",
    greetingMorning: "सुप्रभात, आशा जी",
    greetingSubtitle: "आइए आज का दिन शांति और सहजता से बिताएं।",
    orientationTitle: "आज का दिन और समय क्या है?",
    todayLabel: "आज",
    startActivityBtn: "आज की स्मृति गतिविधि शुरू करें",
    talkToSmritiBtn: "स्मृतिकेयर से बात करें",
    memoriesTitle: "प्यारी यादें और परिवार",
    routineTitle: "आज की दिनचर्या",
    progressTitle: "आपकी अपनी प्रगति",
    offlineNotice: "ऑफ़लाइन मोड सक्रिय • बिना इंटरनेट के भी सब चालू है",
    syncNowBtn: "अभी सिंक करें",
    positiveReinforcement: [
      "बहुत बढ़िया प्रयास, आशा जी!",
      "आप बहुत अच्छा कर रही हैं। आराम से करें।",
      "शानदार याददाश्त!",
      "आइए मिलकर एक और कोशिश करें।"
    ],
    rolePatient: "मैं आशा हूँ (मरीज़)",
    roleCaregiver: "मैं प्रिया हूँ (देखभालकर्ता)",
    voiceListening: "आपकी आवाज़ सुन रहे हैं...",
    voiceTapPrompt: "माइक छुएं और आराम से बोलें",
    voiceSampleQuestions: [
      "मुझे अभी क्या करना है?",
      "क्या मैंने सुबह की दवा ले ली?",
      "मीरा की तस्वीर दिखाएं",
      "आज कौन सा दिन और तारीख है?"
    ],
    gameMemoryTitle: "पहचाने हुए सामान की स्मृति खेल",
    gamePatternTitle: "पैटर्न और क्रम पहचान",
    gameAssociationTitle: "शब्द और वस्तु का मेल",
    medicineReminder: "सुबह की दवाई का समय",
    hydrationReminder: "गुनगुना पानी पीने का समय"
  }
};
