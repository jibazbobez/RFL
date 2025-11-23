import React from 'react';
import { Lesson, Language } from '../types';
import { UI_TEXT } from '../constants';
import { BookOpen, AlertTriangle } from 'lucide-react';

interface TheoryViewProps {
  lesson: Lesson;
  language: Language;
  onStartPractice: () => void;
}

export const TheoryView: React.FC<TheoryViewProps> = ({ lesson, language, onStartPractice }) => {
  const { theory } = lesson;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in pb-24">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-brand-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
             <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
                <BookOpen size={32} />
             </div>
             <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">{lesson.title[language]}</h2>
             <p className="text-brand-100 text-lg">{lesson.description[language]}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-brand-500 pl-4">
            {theory.intro[language]}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {theory.sections.map((section, idx) => (
              <div key={idx} className={`rounded-2xl border-2 p-5 ${section.color} transition-transform hover:-translate-y-1 duration-300`}>
                <div className="flex justify-between items-center mb-4 border-b border-black/10 pb-2">
                  <h3 className="font-bold text-xl">{section.title[language]}</h3>
                  <span className="bg-white/50 px-3 py-1 rounded-full text-sm font-bold">{section.pronoun}</span>
                </div>
                <ul className="space-y-3">
                  {section.rules.map((rule, rIdx) => (
                    <li key={rIdx} className="flex flex-col">
                      <span className="font-semibold text-lg">{rule.ending}</span>
                      <span className="text-sm opacity-80">{rule.example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {theory.exceptions.items.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-orange-800 font-bold flex items-center gap-2 mb-4 text-lg">
                <AlertTriangle size={20} />
                {theory.exceptions.title[language]}
              </h3>
              <ul className="space-y-2">
                {theory.exceptions.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-orange-500 mt-1.5">•</span>
                    <span>{item[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-center z-50">
        <button
          onClick={onStartPractice}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg shadow-brand-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          {UI_TEXT.practice[language]}
        </button>
      </div>
    </div>
  );
};