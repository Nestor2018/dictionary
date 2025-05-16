import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import SearchInput from '../components/ui/SearchInput';
import DictionaryResult from '../components/DictionaryResult';
import WordHistory from '../components/WordHistory';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchWord } from '../store/slices/dictionarySlice';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch();
  const { currentWord, status, error } = useAppSelector(state => state.dictionary);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      return;
    }

    dispatch(fetchWord(term));
  };

  return (
    <>
      <Head>
        <title>Diccionario Web</title>
        <meta name="description" content="Aplicación de diccionario web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <SearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            onSearch={() => handleSearch(searchTerm)} 
            error={error}
          />
          
          {status === 'loading' ? (
            <div className="flex justify-center mt-10">
              <p>Cargando...</p>
            </div>
          ) : currentWord ? (
            <DictionaryResult data={currentWord} />
          ) : status === 'failed' ? (
            <div className="mt-10 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : null}
          
          <WordHistory />
        </div>
      </Layout>
    </>
  );
}
