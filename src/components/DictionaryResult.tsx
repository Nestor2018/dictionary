import { WordData } from '../types/dictionary';
import AudioButton from './ui/AudioButton';

interface DictionaryResultProps {
  data: WordData;
}

const DictionaryResult = ({ data }: DictionaryResultProps) => {
  // Encontrar el primer audio disponible
  const audioUrl = data.phonetics.find(p => p.audio)?.audio || '';

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">{data.word}</h1>
          <p className="text-purple-500 text-xl mt-2">{data.phonetic}</p>
        </div>
        {audioUrl && <AudioButton audioUrl={audioUrl} />}
      </div>

      {data.meanings.map((meaning, index) => (
        <div key={index} className="mt-8">
          <div className="flex items-center">
            <h2 className="text-lg font-bold italic">{meaning.partOfSpeech}</h2>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700 ml-4"></div>
          </div>

          <div className="mt-5">
            <h3 className="text-slate-500 dark:text-slate-400 mb-4">Meaning</h3>
            <ul className="list-disc list-outside pl-5 space-y-3 marker:text-purple-500">
              {meaning.definitions.map((def, defIndex) => (
                <li key={defIndex} className="pl-2">
                  <p>{def.definition}</p>
                  {def.example && (
                    <p className="text-slate-500 dark:text-slate-400 mt-2">"{def.example}"</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Verificar si hay sinónimos en las definiciones */}
          {meaning.synonyms && meaning.synonyms.length > 0 && (
            <div className="mt-6 flex flex-wrap">
              <h3 className="text-slate-500 dark:text-slate-400 mr-6">Synonyms</h3>
              <div className="flex flex-wrap gap-2">
                {meaning.synonyms.map((synonym, synIndex) => (
                  <span key={synIndex} className="text-purple-500 font-bold">
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {data.sourceUrls.length > 0 && (
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Source{' '}
            <a
              href={data.sourceUrls[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-slate-600 dark:text-slate-300 ml-2"
            >
              {data.sourceUrls[0]}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default DictionaryResult;