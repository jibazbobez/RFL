import React from 'react';
import { Delete } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
}

const KEYS = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, onBackspace }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-200 p-2 rounded-xl shadow-inner mt-4">
      <div className="flex flex-col gap-1.5">
        {KEYS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5">
            {row.map((char) => (
              <button
                key={char}
                onClick={() => onKeyPress(char)}
                className="bg-white hover:bg-gray-50 active:bg-gray-200 shadow-sm border-b-2 border-gray-300 active:border-t-2 active:border-b-0 text-gray-800 font-medium text-lg w-8 h-10 sm:w-10 sm:h-12 rounded-lg flex items-center justify-center transition-all transform active:scale-95 uppercase"
              >
                {char}
              </button>
            ))}
          </div>
        ))}
        {/* Special Row */}
        <div className="flex justify-center gap-2 mt-1">
           <button
             className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-full max-w-[150px] h-10 rounded-lg font-medium shadow-sm"
             onClick={() => onKeyPress(' ')}
           >
             Space
           </button>
           <button
             onClick={onBackspace}
             className="bg-red-100 hover:bg-red-200 text-red-600 h-10 px-4 rounded-lg flex items-center justify-center shadow-sm border-b-2 border-red-200 active:border-b-0"
           >
             <Delete size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};