import { useState, useEffect } from "react";
import type { Character } from "../types/Character";
import { toast } from "sonner";

type Props = {
  count: number;
  setCount: (n: number) => void;
};

const Wishlist = ({ count, setCount }: Props) => {
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
    setCount(stored.length);
  }, [open]);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((char) => char.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    setCount(updated.length);
    toast("💔 Removed from favorites", {
      duration: 3000,
     
  style: {
    zIndex: 1000,
    background: "#333",
    color: "#fff",
  }, });
  };
   

  return (
    <div className="relative">
      {/* Heart Icon */}
      <button onClick={() => setOpen(true)} className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 stroke-red-500 hover:stroke-red-600 transition"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
       2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
       4.5 2.09C13.09 3.81 14.76 3 16.5 3 
       19.58 3 22 5.42 22 8.5c0 3.78-3.4 
       6.86-8.55 11.54L12 21.35z"
          />
        </svg>

        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-slate-800 w-full max-w-md rounded-xl shadow-xl p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-slate-600 pb-2">
              <h2 className="text-xl font-bold text-white">Your Favorites</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white text-xl font-bold"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            {favorites.length === 0 ? (
              <p className="text-center text-slate-400">
                No favorite characters added yet.
              </p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scroll">
                {favorites.map((char) => (
                  <li
                    key={char.id}
                    className="flex items-center justify-between bg-slate-700 p-3 rounded-lg shadow hover:bg-slate-600 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-10 h-10 rounded-full border border-slate-500 object-cover"
                      />
                      <span className="text-sm font-medium text-white">
                        {char.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFavorite(char.id)}
                      className="text-red-400 hover:text-red-500"
                      title="Remove"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0a2 2 0 012-2h2a2 2 0 012 2m-6 0H5m14 0h-2"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
