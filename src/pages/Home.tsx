import { useEffect, useState } from "react";
import SearchBox from "../components/TopBar";
import CharacterList from "../components/CharacterList";
import { useCharacterSearch } from "../hooks/useCharacterSearch";
import CharacterDetails from "../components/CharacterDetails";
import EpisodeList from "../components/EpisodeList";
import { toast } from "sonner";

function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [query, setQuery] = useState("");
  const { results, loading, error } = useCharacterSearch(query);
  useEffect(() => {
    if (error) {
      toast(` 🚨 Error: ${error}`, {
        duration: 3000,

        style: {
          background: "#334155",
          color: "#F1F5F9", 
          borderRadius: "0.375rem", 
        },
      });
    }
  }, [error]);
  return (
    <div className="flex flex-col h-screen bg-slate-900">
      {/* Top Bar */}
      <div className="h-20 p-2 mx-2 md:mx-0">
        <SearchBox query={query} setQuery={setQuery} count={results.length} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden p-4 gap-4">
        {/* Left Panel: Search Results or Placeholder */}
        <div className="md:w-1/3 w-full h-60 md:h-auto overflow-y-auto bg-slate-800 rounded p-2">
          {loading ? (
            <div className="flex items-center justify-center h-full text-white">
              Loading…
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-400">
              Error loading results.
            </div>
          ) : results.length > 0 ? (
            <CharacterList
              characters={results}
              onSelect={setSelectedCharacter}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-center px-2">
              Search above to find characters.
            </div>
          )}
        </div>

        {/* Right Panel: Details & Episodes or Placeholder */}
        <div className="flex flex-col w-full md:w-2/3 h-full gap-4 overflow-hidden">
          {!selectedCharacter ? (
            <div className="flex-1 bg-slate-800 rounded p-4 flex items-center justify-center text-slate-400 text-center">
              Select a character to see details.
            </div>
          ) : (
            <>
              <div className="bg-slate-800 rounded p-4">
                <CharacterDetails character={selectedCharacter} />
              </div>
              <div className="flex-1 bg-slate-800 rounded p-4 overflow-y-auto">
                <EpisodeList episodes={selectedCharacter.episode} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
