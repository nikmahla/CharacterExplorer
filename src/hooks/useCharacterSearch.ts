import { useEffect, useState } from 'react';
import { searchCharacters } from '../services/api';

export const useCharacterSearch = (query: string) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    searchCharacters(query)
      .then(data => setResults(data.results))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return { results, loading, error };
};
