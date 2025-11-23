import React, { useState } from 'react';
import { LESSONS, UI_TEXT } from './constants';
import { Lesson, Language, AppView } from './types';
import { TheoryView } from './components/TheoryView';
import { QuizView } from './components/QuizView';
import { Globe, Book, Star, Trophy, ChevronRight, LayoutGrid, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(Language.RU); // Default to RU as requested for "in the list" and general style
  const [quizResult, setQuizResult] = useState<{score: number, total: number} | null>(null);

  const activeLesson = LESSONS.find(l => l.id === activeLessonId);

  const startLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setView('theory');
  };

  const startPractice = () => {
    setView('practice');
  };

  const finishQuiz = (score: number, total: number) => {
    setQuizResult({ score, total });
    setView('results');
  };

  const goHome = () => {
    setView('home');
    setActiveLessonId(null);
    setQuizResult(null);
  };

  // --- Views ---

  const renderHome = () => (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-800 to-brand-900 rounded-xl flex items-center justify-center text-white shadow-lg">
             <span className="font-display font-bold text-2xl">Ru</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">RuLearn Pro</h1>
        </div>
        
        {/* Language Switcher */}
        <div className="bg-white rounded-full p-1 shadow-sm border border-gray-200 flex flex-wrap justify-center">
          {Object.values(Language).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${language === lang ? 'bg-brand-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LESSONS.map((lesson) => (
          <div 
            key={lesson.id}
            onClick={() => startLesson(lesson.id)}
            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-200 transition-all cursor-pointer transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <LayoutGrid size={100} />
            </div>
            
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
               <Book size={28} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-700">{lesson.title[language]}</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{lesson.description[language]}</p>
            
            <div className="flex items-center justify-between mt-auto">
               <div className="flex gap-1">
                 {[...Array(3)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < lesson.difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                 ))}
               </div>
               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors flex items-center gap-1">
                 {UI_TEXT.start[language]} <ChevronRight size={12} />
               </span>
            </div>
          </div>
        ))}

        {/* Placeholder for future lessons */}
        <div className="bg-gray-50 rounded-3xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center opacity-70">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
            <h3 className="font-bold text-gray-400">Cases / Падежи</h3>
            <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
     if (!quizResult) return null;
     const percentage = Math.round((quizResult.score / quizResult.total) * 100);
     const isPass = percentage >= 70;
     const circleColor = isPass ? '#22c55e' : '#eab308'; // green-500 : yellow-500
     const bgColor = '#f3f4f6'; // gray-100

     return (
       <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 animate-fade-in text-center">
         <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 w-full max-w-lg flex flex-col items-center">
            
            {/* Circular Progress */}
            <div 
                className="relative w-48 h-48 rounded-full flex items-center justify-center mb-8 shadow-inner"
                style={{
                    background: `conic-gradient(${circleColor} ${percentage}%, ${bgColor} ${percentage}% 100%)`
                }}
            >
                {/* Inner white circle */}
                <div className="absolute w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-gray-800">{percentage}%</span>
                </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isPass ? UI_TEXT.resultExcellent[language] : UI_TEXT.resultGood[language]}
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                {quizResult.score} / {quizResult.total}
            </p>
            
            <div className="flex gap-4 w-full">
                <button 
                    onClick={() => setView('theory')}
                    className="flex-1 px-4 py-3 rounded-full border-2 border-brand-200 text-brand-700 font-bold hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Book size={18} />
                    {UI_TEXT.theory[language]}
                </button>
                <button 
                    onClick={goHome}
                    className="flex-1 px-4 py-3 rounded-full bg-brand-600 text-white font-bold shadow-lg hover:bg-brand-700 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} />
                    {UI_TEXT.backToHome[language]}
                </button>
            </div>
         </div>
       </div>
     );
  };

  // --- Main Render ---

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-brand-200">
      
      {/* Top Nav for nested views */}
      {view !== 'home' && (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <button onClick={goHome} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 font-semibold flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">Ru</div>
                <span className="hidden sm:inline">RuLearn Pro</span>
            </button>
            
            <div className="flex gap-2">
                 {/* Mini Language Toggle */}
                {Object.values(Language).map((lang) => (
                    <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-xs font-bold w-8 h-8 rounded-full border flex items-center justify-center ${language === lang ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                    {lang.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
      )}

      {/* Content Area */}
      <main>
        {view === 'home' && renderHome()}
        {view === 'theory' && activeLesson && (
            <TheoryView 
                lesson={activeLesson} 
                language={language} 
                onStartPractice={startPractice} 
            />
        )}
        {view === 'practice' && activeLesson && (
            <QuizView 
                lesson={activeLesson} 
                language={language} 
                onFinish={finishQuiz}
                onBack={() => setView('theory')}
            />
        )}
        {view === 'results' && renderResults()}
      </main>
    </div>
  );
};

export default App;