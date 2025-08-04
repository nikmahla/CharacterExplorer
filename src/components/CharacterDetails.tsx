import { useState, useEffect } from "react";
import type { Character } from "../types/Character";
import { toast } from "sonner";

type Props = {
  character: Character | null;
};

const CharacterDetails = ({ character }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (character) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const exists = favorites.some((fav: Character) => fav.id === character.id);
      setIsFavorite(exists);
    }
  }, [character]);

  const setFavoritesLocalStorage = (char: Character) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(char);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(true); 
  };

  function handleAddToFavorites() {
    if (!character || isFavorite) return;

    setFavoritesLocalStorage(character);
    toast(`${character.name} added to favorites! ❤️`, {
      duration: 3000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  }

  if (!character) return <p className="text-white h-full w-full">Select a character</p>;

  return (
    <div className="w-full h-full">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative w-40 h-40 rounded-lg overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-sm text-slate-300">
            Status:{" "}
            <span
              className={`capitalize font-medium ${
                character.status === "Dead"
                  ? "text-red-500"
                  : character.status === "Alive"
                  ? "text-green-400"
                  : "text-white"
              }`}
            >
              {character.status}
            </span>
          </p>
          <p className="text-sm text-slate-300">
            Location: {character.location?.name}
          </p>

          <button
            onClick={handleAddToFavorites}
            className={`mt-4 px-5 py-2 text-sm rounded transition ${
              isFavorite
                ? "bg-gray-500 cursor-not-allowed opacity-70"
                : "bg-slate-600 hover:bg-slate-500"
            }`}
            disabled={isFavorite}
          >
            {isFavorite ? " Already Favorited" : "❤️ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
