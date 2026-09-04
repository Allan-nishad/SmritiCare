import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import { Globe } from 'lucide-react';

const languages: { code: LanguageCode; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'as', label: 'Assamese', native: 'অসমীয়া' },
  { code: 'mni', label: 'Manipuri', native: 'মৈতৈলোন্' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
];

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage } = useApp();

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur border border-sand-300 rounded-full px-3 py-1.5 shadow-sm">
        <Globe className="w-4 h-4 text-terracotta-500" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageCode)}
          className="bg-transparent text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer pr-1"
          aria-label="Select Language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-gray-900 font-medium">
              {compact ? lang.native : `${lang.native} (${lang.label})`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
