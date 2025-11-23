import React, { useState, useEffect, useRef } from 'react';
import { Lesson, Language, ExerciseType } from '../types';
import { UI_TEXT } from '../constants';
import { VirtualKeyboard } from './VirtualKeyboard';
import { CheckCircle2, XCircle, HelpCircle, Inbox } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  lesson: Lesson;
  language: Language;
  onFinish: (score: number, total: number) => void;
  onBack: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ lesson, language, onFinish, onBack }) => {
  // Guard check immediately
  const hasQuestions = lesson.questions && lesson.questions.length > 0;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  // Store accumulated correct words per zone
  const [droppedHistory, setDroppedHistory] = useState<Record<string, string[]>>({});

  const cardRef = useRef<HTMLDivElement>(null);
  const zonesRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const question = hasQuestions ? lesson.questions[currentIdx] : null;
  const progress = hasQuestions ? ((currentIdx) / lesson.questions.length) * 100 : 0;

  useEffect(() => {
    // Reset state on new question
    setSelectedOption(null);
    setInputValue("");
    setIsAnswered(false);
    setIsCorrect(false);
    setDragPosition({ x: 0, y: 0 });
    setHoveredZone(null);
  }, [currentIdx]);

  if (!hasQuestions || !question) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
            <Inbox size={48} className="text-gray-300 mb-4"/>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {language === Language.RU ? "Упражнения отсутствуют" : "No exercises available"}
            </h2>
            <button 
                onClick={onBack} 
                className="bg-brand-600 text-white px-6 py-2 rounded-full font-bold hover:bg-brand-700 transition"
            >
                {UI_TEXT.backToHome[language]}
            </button>
        </div>
    );
  }

  const handleNext = () => {
    if (currentIdx < lesson.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onFinish(isCorrect ? score + 1 : score, lesson.questions.length);
    }
  };

  const handleCheck = () => {
    if (isAnswered) return;

    let correct = false;

    if (question.type === ExerciseType.MULTIPLE_CHOICE) {
       if (selectedOption === question.correctAnswer) correct = true;
    } else if (question.type === ExerciseType.INPUT_WRITE) {
       if (inputValue.toLowerCase().trim() === question.correctAnswer.toLowerCase()) correct = true;
    }

    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    setIsAnswered(true);
  };

  // --- Pointer Events Drag & Drop Logic ---
  
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnswered) return;
    
    const element = e.currentTarget as HTMLDivElement;
    element.setPointerCapture(e.pointerId);

    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    setDragPosition({ x: 0, y: 0 }); 
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isAnswered) return;

    const dx = e.clientX - startPosition.x;
    const dy = e.clientY - startPosition.y;
    setDragPosition({ x: dx, y: dy });

    if (cardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const cardCenter = {
            x: cardRect.left + cardRect.width / 2,
            y: cardRect.top + cardRect.height / 2
        };

        let foundZone: string | null = null;

        Object.entries(zonesRef.current).forEach(([zoneId, zoneEl]) => {
            const el = zoneEl as HTMLDivElement | null;
            if (el) {
                const zoneRect = el.getBoundingClientRect();
                if (
                    cardCenter.x >= zoneRect.left &&
                    cardCenter.x <= zoneRect.right &&
                    cardCenter.y >= zoneRect.top &&
                    cardCenter.y <= zoneRect.bottom
                ) {
                    foundZone = zoneId;
                }
            }
        });

        setHoveredZone(foundZone);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const element = e.currentTarget as HTMLDivElement;
    element.releasePointerCapture(e.pointerId);
    
    setIsDragging(false);

    if (hoveredZone) {
        handleDropCommit(hoveredZone);
    } else {
        setDragPosition({ x: 0, y: 0 });
    }
  };

  const handleDropCommit = (zone: string) => {
    const correct = zone === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
        setScore(prev => prev + 1);
        // Add to history for this specific zone
        setDroppedHistory(prev => ({
            ...prev,
            [zone]: [...(prev[zone] || []), question.prompt]
        }));
    }
    setIsAnswered(true);
    setDragPosition({ x: 0, y: 0 }); 

    setTimeout(() => {
        handleNext();
    }, 1200);
  };


  // --- Input Logic ---
  const handleKeyPress = (char: string) => setInputValue(prev => prev + char);
  const handleBackspace = () => setInputValue(prev => prev.slice(0, -1));

  // Determine Drop Zones based on lesson ID
  const getDropZones = () => {
    if (lesson.id === 'noun-gender') {
        return [
            { id: 'm', label: 'ОН', sub: { [Language.EN]: 'Masc', [Language.RU]: 'Муж', [Language.FR]: 'Masc', [Language.ES]: 'Masc' } },
            { id: 'f', label: 'ОНА', sub: { [Language.EN]: 'Fem', [Language.RU]: 'Жен', [Language.FR]: 'Fém', [Language.ES]: 'Fem' } },
            { id: 'n', label: 'ОНО', sub: { [Language.EN]: 'Neu', [Language.RU]: 'Ср', [Language.FR]: 'Neu', [Language.ES]: 'Neu' } }
        ];
    } else if (lesson.id === 'plurals') {
        return [
            { id: 'y', label: '-Ы', sub: { [Language.EN]: 'Hard', [Language.RU]: 'Тверд', [Language.FR]: 'Dur', [Language.ES]: 'Dura' } },
            { id: 'i', label: '-И', sub: { [Language.EN]: 'Soft/7', [Language.RU]: 'Мягк/7', [Language.FR]: 'Mou', [Language.ES]: 'Suave' } },
            { id: 'a', label: '-А', sub: { [Language.EN]: '-O -> -A', [Language.RU]: '-О -> -А', [Language.FR]: '-O -> -A', [Language.ES]: '-O -> -A' } },
            { id: 'ya', label: '-Я', sub: { [Language.EN]: '-E -> -Я', [Language.RU]: '-Е -> -Я', [Language.FR]: '-E -> -Я', [Language.ES]: '-E -> -Я' } }
        ];
    }
    return [];
  };

  const currentZones = getDropZones();


  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Header / Progress */}
      <div className="mb-4 flex-shrink-0">
         <div className="flex justify-between text-sm text-gray-500 font-bold mb-2">
            <span>{currentIdx + 1} / {lesson.questions.length}</span>
            <span>★ {score}</span>
         </div>
         <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
         </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center animate-slide-up relative w-full">
         
         {/* Question Prompt Text (Hidden for DragDrop to avoid duplication) */}
         {question.type !== ExerciseType.DRAG_DROP && (
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{question.prompt}</h2>
                {question.type === ExerciseType.INPUT_WRITE && (
                    <p className="text-gray-500">{UI_TEXT.inputInstruction[language]}</p>
                )}
            </div>
         )}

         {/* EXERCISE: MULTIPLE CHOICE */}
         {question.type === ExerciseType.MULTIPLE_CHOICE && (
            <div className="grid gap-4 w-full max-w-md mt-8">
                {question.options?.map((opt) => (
                    <button
                        key={opt}
                        disabled={isAnswered}
                        onClick={() => setSelectedOption(opt)}
                        className={`p-4 rounded-xl border-2 text-lg font-semibold transition-all
                            ${selectedOption === opt 
                                ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md transform scale-105' 
                                : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300'
                            }
                            ${isAnswered && opt === question.correctAnswer ? '!bg-green-100 !border-green-500 !text-green-800' : ''}
                            ${isAnswered && selectedOption === opt && opt !== question.correctAnswer ? '!bg-red-100 !border-red-500 !text-red-800' : ''}
                        `}
                    >
                        {opt}
                    </button>
                ))}
            </div>
         )}

         {/* EXERCISE: INPUT WRITE */}
         {question.type === ExerciseType.INPUT_WRITE && (
            <div className="w-full flex flex-col items-center mt-4">
                <input 
                    type="text" 
                    readOnly 
                    value={inputValue} 
                    className={`text-center text-3xl font-bold p-4 rounded-xl border-2 w-full max-w-md bg-white shadow-inner outline-none
                         ${isAnswered 
                            ? (isCorrect ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50')
                            : 'border-gray-300 focus:border-brand-500 text-gray-800'
                         }
                    `}
                    placeholder="..."
                />
                {!isAnswered && (
                     <VirtualKeyboard onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
                )}
                {isAnswered && !isCorrect && (
                    <div className="mt-4 text-green-600 font-bold">
                        Correct: {question.correctAnswer}
                    </div>
                )}
            </div>
         )}

         {/* EXERCISE: DRAG DROP */}
         {question.type === ExerciseType.DRAG_DROP && (
            <div className="w-full h-full flex flex-col">
                <div className="text-center mb-2">
                    <p className="text-gray-500 font-medium text-sm">{UI_TEXT.dragInstruction[language]}</p>
                </div>

                {/* Draggable Card Container */}
                <div className="flex-1 flex justify-center items-center min-h-[100px] relative z-20">
                    {!isAnswered && (
                        <div 
                            ref={cardRef}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            onPointerLeave={handlePointerUp}
                            style={{ 
                                transform: `translate(${dragPosition.x}px, ${dragPosition.y}px) ${isDragging ? 'rotate(5deg) scale(1.05)' : 'rotate(0deg)'}`,
                                cursor: isDragging ? 'grabbing' : 'grab',
                                touchAction: 'none', 
                            }}
                            className="bg-white border-2 border-brand-200 shadow-xl rounded-2xl px-10 py-6 flex items-center justify-center min-w-[180px] transition-transform duration-75 ease-linear select-none"
                        >
                            <span className="text-4xl font-black text-brand-900 pointer-events-none">{question.prompt}</span>
                        </div>
                    )}
                    
                    {/* Feedback Message */}
                    {isAnswered && (
                        <div className={`text-2xl font-bold animate-bounce-slight ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? UI_TEXT.resultExcellent[language] : (
                                <span>
                                    {question.prompt} — {
                                        // Quick logic for correct answer display depending on lesson
                                        lesson.id === 'noun-gender' ?
                                            (question.correctAnswer === 'm' ? 'ОН' : question.correctAnswer === 'f' ? 'ОНА' : 'ОНО') :
                                        lesson.id === 'plurals' ?
                                            (question.correctAnswer === 'y' ? '-Ы' : question.correctAnswer === 'i' ? '-И' : question.correctAnswer === 'a' ? '-А' : '-Я') 
                                        : question.correctAnswer
                                    }
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Drop Zones */}
                <div className={`grid ${currentZones.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-2 sm:gap-4 mt-auto mb-4`}>
                    {currentZones.map((zone) => {
                        const isCorrectZone = zone.id === question.correctAnswer;
                        const isHovered = hoveredZone === zone.id;
                        
                        let zoneClass = "bg-white/60 border-dashed border-gray-300";
                        
                        if (!isAnswered) {
                            if (isHovered) zoneClass = "bg-brand-50 border-solid border-brand-500 scale-105 shadow-lg";
                        } else {
                            // Flash logic
                             if (isCorrectZone) zoneClass = "bg-green-100 border-solid border-green-500 shadow-green-200";
                             else if (hoveredZone === zone.id && !isCorrect) zoneClass = "bg-red-100 border-solid border-red-500 animate-pulse";
                             else zoneClass = "opacity-50 border-transparent";
                        }

                        // Get history for this zone
                        const historyItems = droppedHistory[zone.id] || [];

                        return (
                            <div
                                key={zone.id}
                                ref={(el) => { zonesRef.current[zone.id] = el; }}
                                className={`min-h-[140px] sm:h-48 rounded-xl border-4 flex flex-col items-center justify-start py-2 sm:py-4 transition-all duration-300 ${zoneClass} relative overflow-hidden`}
                            >
                                <span className="text-xl sm:text-3xl font-black mb-1 pointer-events-none z-10">{zone.label}</span>
                                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider opacity-60 pointer-events-none z-10 mb-2 text-center leading-tight px-1">{zone.sub[language]}</span>
                                
                                {/* Accumulated Words Container */}
                                <div className="flex flex-wrap justify-center gap-1 w-full px-1 z-10 overflow-y-auto max-h-[80px] custom-scroll">
                                    {historyItems.map((word, idx) => (
                                        <span key={idx} className="bg-white/90 border border-gray-200 px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold text-gray-800 shadow-sm animate-fade-in whitespace-nowrap">
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
         )}

      </div>

      {/* Footer / Controls */}
      <div className="mt-4 flex-shrink-0 min-h-[60px] sm:min-h-[80px] flex items-end">
        {!isAnswered ? (
             question.type !== ExerciseType.DRAG_DROP && (
                <button 
                    onClick={handleCheck}
                    disabled={question.type === ExerciseType.MULTIPLE_CHOICE && !selectedOption}
                    className="w-full bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-brand-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                >
                    {UI_TEXT.check[language]}
                </button>
             )
        ) : (
             question.type !== ExerciseType.DRAG_DROP && (
                <div className={`w-full p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up shadow-lg ${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                    <div className="flex items-center gap-3">
                        {isCorrect ? <CheckCircle2 size={32} className="text-green-600" /> : <XCircle size={32} className="text-red-600" />}
                        <div className="text-left">
                            <h3 className="font-bold text-xl">{isCorrect ? UI_TEXT.resultExcellent[language] : "Oops!"}</h3>
                            {!isCorrect && question.hint && (
                                <p className="text-sm mt-1 opacity-80 flex items-center gap-1"><HelpCircle size={14}/> {question.hint[language]}</p>
                            )}
                        </div>
                    </div>
                    <button 
                        onClick={handleNext}
                        className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold shadow-md transition-transform active:scale-95 ${isCorrect ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
                    >
                        {UI_TEXT.next[language]}
                    </button>
                </div>
            )
        )}
      </div>
    </div>
  );
};