import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setFont } from '../../store/slices/fontSlice';

type FontOption = 'serif' | 'sans' | 'mono';

const FontSelector = () => {
  const dispatch = useAppDispatch();
  const { font } = useAppSelector(state => state.font);
  const [isOpen, setIsOpen] = useState(false);

  const fontOptions: Record<FontOption, string> = {
    serif: 'Serif',
    sans: 'Sans Serif',
    mono: 'Mono'
  };

  const handleSelectFont = (font: FontOption) => {
    dispatch(setFont(font));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-slate-700 dark:text-white hover:text-purple-500 dark:hover:text-purple-400"
      >
        <span>{fontOptions[font as FontOption]}</span>
        <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-2 z-10">
          {Object.entries(fontOptions).map(([value, label]) => (
            <button
              key={value}
              onClick={() => handleSelectFont(value as FontOption)}
              className={`w-full text-left px-4 py-2 hover:text-purple-500 ${
                font === value ? 'text-purple-500' : 'text-slate-700 dark:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontSelector;