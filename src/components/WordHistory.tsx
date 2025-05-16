import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchWord, clearHistory } from '../store/slices/dictionarySlice';

const WordHistory = () => {
  const dispatch = useAppDispatch();
  const { searchHistory = [] } = useAppSelector(state => state.dictionary);

  const handleWordClick = (word: string) => {
    dispatch(fetchWord(word));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  if (!searchHistory || searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Historial de búsquedas</h2>
        <button 
          onClick={() => dispatch(clearHistory())}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Limpiar historial
        </button>
      </div>
      <ul className="space-y-2">
        {searchHistory.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <button 
              onClick={() => handleWordClick(item.word)}
              className="text-purple-500 hover:text-purple-700 font-medium"
            >
              {item.word}
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {formatDate(item.timestamp)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordHistory;