import { LanguageCode } from '../types';

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
    locationLabel: "You are safe at Home in Guwahati",
    nextUpLabel: "Next Activity",
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
    personalBaselineTitle: "Asha's Personal Baseline (Asha vs Asha)"
  },
  as: {
    appName: "স্মৃতিকেয়াৰ (SmritiCare)",
    tagline: "যি স্মৃতি আপোনাৰ বাবে মূল্যৱান, তাক মনত ৰখা প্ৰযুক্তি।",
    greetingMorning: "শুভ প্ৰভাত, আশা দেৱী",
    greetingSubtitle: "আজিৰ দিনটো আমি শান্ত আৰু সহজভাৱে আৰম্ভ কৰোঁ।",
    orientationTitle: "আজিৰ বাৰ আৰু সময়",
    todayLabel: "আজি",
    timeNowLabel: "বৰ্তমান সময়",
    locationLabel: "আপুনি গুৱাহাটীৰ নিজা ঘৰত সুৰক্ষিতভাৱে আছে",
    nextUpLabel: "পৰৱৰ্তী কাম",
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
      "আহক, আৰু এটা একেলগে চেষ্টা কৰোঁ।"
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
    personalBaselineTitle: "আশা দেৱীৰ ব্যক্তিগত বেচলাইন"
  },
  bn: {
    appName: "স্মৃতিকেয়ার (SmritiCare)",
    tagline: "যা কিছু আপন, তা মনে রাখার সহজ প্রযুক্তি।",
    greetingMorning: "শুভ সকাল, আশা দেবী",
    greetingSubtitle: "চলুন আজকের দিনটি শান্ত ও সুন্দরভাবে শুরু করি।",
    orientationTitle: "আজকের দিন ও সময়",
    todayLabel: "আজ",
    timeNowLabel: "বর্তমান সময়",
    locationLabel: "আপনি গুয়াহাটির নিজের বাড়িতে নিরাপদে আছেন",
    nextUpLabel: "পরবর্তী কাজ",
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
      "আসুন, একসাথে আরেকটি চেষ্টা করি।"
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
    personalBaselineTitle: "আশা দেবীর নিজস্ব বেসলাইন"
  },
  mni: {
    appName: "স্মৃতিক্যের (SmritiCare)",
    tagline: "অদোমগী অপাম্ববু নীংশিংবগী তেক্নোলোজি।",
    greetingMorning: "নুমিৎখু খুদিংমক য়াইফরে, আশা",
    greetingSubtitle: "ঙসিগী নুমিৎসি অপাম্বা অমসুং শান্তিনা হৌদোকসি।",
    orientationTitle: "ঙসিগী মতম অমসুং নুমিৎ",
    todayLabel: "ঙসি",
    timeNowLabel: "হৌজিক্কী মতম",
    locationLabel: "অদোম য়ুমদা শান্তিনা লৈরে",
    nextUpLabel: "মথংগী থবক",
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
      "নুংঙাইরবা নীংশিং থবক!"
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
    personalBaselineTitle: "আশাগী মশাগী বেসলাইন"
  },
  hi: {
    appName: "स्मृतिकेयर (SmritiCare)",
    tagline: "तकनीक जो अपनों और ज़रूरी बातों को याद रखती है।",
    greetingMorning: "सुप्रभात, आशा जी",
    greetingSubtitle: "आइए आज का दिन शांति और सहजता से बिताएं।",
    orientationTitle: "आज का दिन और समय",
    todayLabel: "आज",
    timeNowLabel: "वर्तमान समय",
    locationLabel: "आप गुवाहाटी में अपने घर पर पूरी तरह सुरक्षित हैं",
    nextUpLabel: "अगला कार्य",
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
      "आइए मिलकर एक और कोशिश करें।"
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
    personalBaselineTitle: "आशा जी का व्यक्तिगत बेसलाइन (आशा बनाम आशा)"
  }
};
