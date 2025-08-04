import { useEffect, useState } from "react";
import { fetchEpisodes } from "../services/episodeService";
import type { Episode } from "../types/Episode";

const EPISODES_PER_PAGE = 5;

const EpisodeList = ({ episodes }: { episodes: string[] }) => {
  const [episodeData, setEpisodeData] = useState<Episode[]>([]);
  const [visibleCount, setVisibleCount] = useState(EPISODES_PER_PAGE);

  useEffect(() => {
    if (episodes.length === 0) return;

    fetchEpisodes(episodes).then((data) => {
      setEpisodeData(data);
      setVisibleCount(EPISODES_PER_PAGE);
    });
  }, [episodes]);

  const handleShowMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + EPISODES_PER_PAGE, episodeData.length)
    );
  };

  return (
    <div className=" h-full flex flex-col bg-slate-800 rounded-lg border border-slate-700 ">
      {/* Header */}
      <div className="px-4 py-2  flex items-center justify-between bg-slate-700 rounded-t-lg">
        <h3 className="text-lg font-semibold font-schwifty">Episodes Numbers:{episodeData.length}</h3>
        <p className="text-sm text-slate-400">
           Date of Release
        </p>
      </div>

      {/* Scrollable content */}
       
      <div className="flex-1 overflow-y-auto scroll-smooth px-2  mt-1 space-y-3">
        {episodeData.slice(0, visibleCount).map((ep) => (
          <div key={ep.id} className="border-b border-slate-700 pb-1 p-2 flex items-center hover:bg-slate-600 justify-between gap-2">
            <p className="font-semibold">
              {ep.episode} — {ep.name}
            </p>
            <span className="text-slate-400 text-sm">{ep.air_date}</span>
          </div>
        ))}
      </div>

      {/* Show more */}
      {visibleCount < episodeData.length && (
        <div className=" pb-2 text-center">
          <button
            onClick={handleShowMore}
            className=" bg-slate-700 hover:bg-slate-600 text-sm p-1 border border-slate-600 rounded transition"
          >
            Show More Episodes
          </button>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
