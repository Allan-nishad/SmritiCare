import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { speakText, sounds } from '../../utils/audio';
import { Mic, MicOff, X, Sparkles, Volume2, Globe, ArrowRight, Heart } from 'lucide-react';
import { LanguageCode } from '../../types';

interface VoiceQuery {
  patientText: string;
  assistantResponse: string;
  actionHint?: string;
}

const localizedQueries: Record<LanguageCode, VoiceQuery[]> = {
  en: [
    {
      patientText: "What do I have to do now?",
      assistantResponse: "Good morning, Asha. It is 10:00 AM, time for your gentle memory activity. Shall we open your familiar pictures?",
      actionHint: "Launch Memory Match"
    },
    {
      patientText: "Did I take my morning blood pressure medicine?",
      assistantResponse: "Yes, dear Asha! You took your Telmisartan medicine peacefully at 8:42 AM with warm water. You are all set.",
      actionHint: "Routine Confirmed"
    },
    {
      patientText: "Show me pictures of my daughter Meera",
      assistantResponse: "Here are Meera's pictures from Tezpur! She called to remind you about making sweet coconut laru for Bihu.",
      actionHint: "Open Memories That Matter"
    },
    {
      patientText: "What day and time is it today?",
      assistantResponse: "Today is Tuesday, 4 September. The time is 10:30 in the morning in Guwahati. It is a pleasant day outside.",
      actionHint: "Orientation Updated"
    }
  ],
  as: [
    {
      patientText: "এতিয়া মই কি কৰিব লাগিব?",
      assistantResponse: "শুভ প্ৰভাত, আশা দেৱী। এতিয়া আপোনাৰ পুৱাৰ স্মৃতি খেল খেলাৰ সময় হৈছে। আহক আমি পৰিচিত ছবিবোৰ চাওঁ।",
      actionHint: "স্মৃতি খেল আৰম্ভ কৰক"
    },
    {
      patientText: "মই ৰাতিপুৱাৰ ঔষধ খালোঁনে?",
      assistantResponse: "হয় আশা বাইদেউ, আপুনি ৰাতিপুৱা ৮:৪২ বজাত কুহুমীয়া পানীৰে ঔষধ খাইছে। চিন্তা নকৰিব।",
      actionHint: "ঔষধ পৰীক্ষা সম্পন্ন"
    },
    {
      patientText: "মীৰাৰ ফটো দেখুওৱা",
      assistantResponse: "এইয়া তেজপুৰৰ মীৰাৰ মৰমৰ ছবি। মীৰাই দেওবাৰে আপোনাক লগ কৰিবলৈ আহিব বুলি কৈছে।",
      actionHint: "মৰমৰ স্মৃতি"
    }
  ],
  mni: [
    {
      patientText: "হৌজিক ঐনা করি তৌগনি?",
      assistantResponse: "নুমিৎখু য়াইফরে আশা। হৌজিক অয়ুক্কী নীংশিং পোৎলম য়েংবগী মতমনি। ঙসিগী নীংশিং সানাবা হৌগসি?",
      actionHint: "নীংশিং সানাবা হৌবীয়ু"
    },
    {
      patientText: "ঐনা হিদাক চারবরা?",
      assistantResponse: "মানে আশা, অদোম্না অয়ুক অঙনবদা হিদাক চারবনি। নুংঙাইনা লৈবীয়ু।",
      actionHint: "থৌরম লোইরে"
    }
  ],
  bn: [
    {
      patientText: "এখন আমার কী কাজ আছে?",
      assistantResponse: "শুভ সকাল আশা দেবী। এখন আপনার সকালের মেমোরি অ্যাক্টিভিটি করার সময়। চলুন শুরু করি?",
      actionHint: "মেমোরি ম্যাচ চালু করুন"
    },
    {
      patientText: "সকালের প্রেশারের ওষুধ কি নিয়েছি?",
      assistantResponse: "হ্যাঁ আশা দেবী, সকাল ৮:৪২ মিনিটে আপনি হালকা গরম জল দিয়ে ওষুধটি গ্রহণ করেছেন। একদম নিশ্চিন্তে থাকুন।",
      actionHint: "রুটিন কনফার্ম"
    }
  ],
  hi: [
    {
      patientText: "मुझे अभी क्या करना है?",
      assistantResponse: "सुप्रभात, आशा जी। अभी सुबह के 10:00 बजे हैं और आपकी पसंदीदा स्मृति गतिविधि का समय है। क्या हम शुरू करें?",
      actionHint: "स्मृति खेल शुरू करें"
    },
    {
      patientText: "क्या मैंने सुबह की दवाई ले ली?",
      assistantResponse: "जी हाँ आशा जी! आपने सुबह 8:42 बजे गुनगुने पानी के साथ अपनी दवाई समय पर ले ली थी।",
      actionHint: "दवा पूर्ण"
    },
    {
      patientText: "मीरा की तस्वीरें दिखाएं",
      assistantResponse: "ये रहीं मीरा की प्यारी तस्वीरें! उन्होंने याद दिलाया कि वे इस रविवार को आपसे मिलने आ रही हैं।",
      actionHint: "यादें देखें"
    }
  ]
};

export const VoiceAssistantModal: React.FC = () => {
  const { isVoiceOpen, setIsVoiceOpen, language, setLanguage, setRole, setActiveGameTab } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [spokenQuery, setSpokenQuery] = useState<string>("");
  const [assistantReply, setAssistantReply] = useState<string>("");
  const [activeHint, setActiveHint] = useState<string>("");

  const t = translations[language];
  const queryList = localizedQueries[language] || localizedQueries.en;

  useEffect(() => {
    if (isVoiceOpen) {
      // Default initial warm greeting
      const defaultGreeting = language === 'as'
        ? "নমস্কাৰ আশা দেৱী, মই স্মৃতিকেয়াৰ। মই আপোনাক কিবা সহায় কৰিব পাৰোঁনে?"
        : language === 'hi'
        ? "नमस्ते आशा जी, मैं स्मृतिकेयर हूँ। मैं आपकी क्या मदद करूँ?"
        : "Hello Asha, I am SmritiCare. I am right here with you. How can I help you today?";
      
      setAssistantReply(defaultGreeting);
      setSpokenQuery("");
      setActiveHint("");
      speakText(defaultGreeting, language === 'as' ? 'as-IN' : language === 'hi' ? 'hi-IN' : 'en-IN');
    }
  }, [isVoiceOpen, language]);

  if (!isVoiceOpen) return null;

  const handleSelectQuery = (q: VoiceQuery) => {
    sounds.playFlip();
    setIsListening(true);
    setSpokenQuery(q.patientText);
    setAssistantReply("");
    setActiveHint(q.actionHint || "");

    setTimeout(() => {
      setIsListening(false);
      setAssistantReply(q.assistantResponse);
      sounds.playSuccess();
      speakText(q.assistantResponse, language === 'as' ? 'as-IN' : language === 'hi' ? 'hi-IN' : 'en-IN');
    }, 1200);
  };

  const handleMicToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      sounds.playFlip();
      setIsListening(true);
      setSpokenQuery("");
      setAssistantReply("");

      // Simulate listening waveform then select the first question
      setTimeout(() => {
        const randomQ = queryList[Math.floor(Math.random() * queryList.length)];
        setIsListening(false);
        setSpokenQuery(randomQ.patientText);
        setAssistantReply(randomQ.assistantResponse);
        setActiveHint(randomQ.actionHint || "");
        sounds.playSuccess();
        speakText(randomQ.assistantResponse, language === 'as' ? 'as-IN' : language === 'hi' ? 'hi-IN' : 'en-IN');
      }, 2000);
    }
  };

  const handleActionClick = () => {
    setIsVoiceOpen(false);
    if (activeHint?.includes('Memory') || activeHint?.includes('স্মৃতি') || activeHint?.includes('स्मृति')) {
      setActiveGameTab('memory_match');
      const el = document.getElementById('cognitive-activities-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (activeHint?.includes('Memories') || activeHint?.includes('মীৰা') || activeHint?.includes('यादें')) {
      const el = document.getElementById('memories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('routine-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-sand-300 relative text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            window.speechSynthesis?.cancel();
            setIsVoiceOpen(false);
          }}
          className="absolute top-5 right-5 w-12 h-12 rounded-full bg-sand-200 hover:bg-sand-300 text-stone-700 flex items-center justify-center transition active:scale-95"
          aria-label="Close Voice Assistant"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Pill */}
        <div className="inline-flex items-center gap-2 bg-terracotta-100 border border-terracotta-200 px-4 py-1.5 rounded-full text-terracotta-800 text-xs sm:text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4 text-terracotta-600" />
          <span>Smriti Voice Assistant • Culturally Friendly Speech</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2 font-serif">
          {t.talkToSmritiBtn}
        </h2>
        <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto mb-6">
          {t.voiceTapPrompt}
        </p>

        {/* Central Animated Mic & Waveform */}
        <div className="my-6 flex flex-col items-center justify-center">
          <button
            onClick={handleMicToggle}
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
              isListening
                ? 'bg-terracotta-600 text-white ring-8 ring-terracotta-300 scale-105 animate-pulse'
                : 'bg-gradient-to-tr from-terracotta-500 to-terracotta-400 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isListening ? (
              <Mic className="w-14 h-14 animate-bounce" />
            ) : (
              <Mic className="w-14 h-14" />
            )}
          </button>

          {/* Animated Waveform bars when listening */}
          {isListening ? (
            <div className="flex items-center gap-1.5 h-12 mt-5">
              <div className="w-1.5 bg-terracotta-500 rounded-full wave-bar-1" />
              <div className="w-1.5 bg-terracotta-500 rounded-full wave-bar-2" />
              <div className="w-1.5 bg-terracotta-600 rounded-full wave-bar-3" />
              <div className="w-1.5 bg-terracotta-500 rounded-full wave-bar-4" />
              <div className="w-1.5 bg-terracotta-400 rounded-full wave-bar-5" />
              <span className="text-sm font-bold text-terracotta-700 ml-2 animate-pulse">
                {t.voiceListening}
              </span>
            </div>
          ) : (
            <div className="text-xs font-semibold text-stone-500 mt-4 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-terracotta-500" />
              <span>Tap microphone above or select a question below</span>
            </div>
          )}
        </div>

        {/* Dialogue Display Box */}
        {(spokenQuery || assistantReply) && (
          <div className="bg-white rounded-3xl p-5 border-2 border-sand-200 text-left mb-6 shadow-sm space-y-3">
            {spokenQuery && (
              <div className="flex items-start gap-3">
                <span className="bg-sand-200 text-stone-800 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
                  Asha:
                </span>
                <p className="text-stone-900 font-semibold text-base sm:text-lg">
                  "{spokenQuery}"
                </p>
              </div>
            )}

            {assistantReply && (
              <div className="flex items-start gap-3 bg-terracotta-50/70 p-3.5 rounded-2xl border border-terracotta-200">
                <span className="bg-terracotta-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-white" />
                  Smriti:
                </span>
                <div className="space-y-2">
                  <p className="text-stone-900 font-medium text-base leading-relaxed">
                    {assistantReply}
                  </p>

                  {activeHint && (
                    <button
                      onClick={handleActionClick}
                      className="inline-flex items-center gap-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow transition active:scale-95"
                    >
                      <span>{activeHint}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Sample Questions (Elderly-Friendly Tap Prompts) */}
        <div className="text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
            Or tap any question to ask:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {queryList.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectQuery(q)}
                className="p-3 bg-white hover:bg-terracotta-50 text-stone-800 hover:text-terracotta-900 rounded-2xl border border-sand-200 text-xs sm:text-sm font-semibold text-left transition flex items-center justify-between group shadow-sm"
              >
                <span className="line-clamp-2">"{q.patientText}"</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-terracotta-500 shrink-0 ml-1 transition" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
