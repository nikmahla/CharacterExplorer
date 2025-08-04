import { useState} from 'react';
import type { Character } from '../types/Character';

// const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Character[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  const addFavorite = (char: Character) => {
    setFavorites(prev => {
      if (prev.find(f => f.id === char.id)) return prev;
      const updated = [...prev, char];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.some(f => f.id === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
