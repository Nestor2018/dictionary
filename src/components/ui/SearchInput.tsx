import { KeyboardEvent, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  error: string | null;
}

const SearchInput = ({ value, onChange, onSearch, error: externalError }: SearchInputProps) => {
  const [internalError, setInternalError] = useState<string | null>(null);
  
  // Mostrar error interno o externo
  const displayError = externalError || internalError;

  const validateAndSearch = () => {
    // Limpiar error interno previo
    setInternalError(null);
    
    // Validar que el campo no esté vacío
    if (!value.trim()) {
      setInternalError('No puedes buscar una palabra vacía');
      return;
    }
    
    // Validar que solo contenga letras y espacios
    if (!/^[a-zA-Z\s-]+$/.test(value)) {
      setInternalError('Por favor, ingresa solo letras, espacios o guiones');
      return;
    }
    
    // Si pasa las validaciones, realizar la búsqueda
    onSearch();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateAndSearch();
    }
  };

  const handleSearchClick = () => {
    validateAndSearch();
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            // Limpiar error cuando el usuario comienza a escribir
            if (internalError) setInternalError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="keyboard"
          className={`w-full py-4 px-6 pr-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            displayError ? 'border border-red-500' : ''
          }`}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? "search-error" : undefined}
        />
        <button
          onClick={handleSearchClick}
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700"
          aria-label="Buscar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.193 12.132L16.5 15.439M15.25 8.125C15.25 12.059 12.059 15.25 8.125 15.25C4.191 15.25 1 12.059 1 8.125C1 4.191 4.191 1 8.125 1C12.059 1 15.25 4.191 15.25 8.125Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {displayError && (
        <p className="text-red-500 mt-2 text-sm" id="search-error" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default SearchInput;