// src/services/episodeService.ts

import type { Episode } from "../types/Episode";

export const fetchEpisodes = async (urls: string[]): Promise<Episode[]> => {
  try {
    const requests = urls.map(url => fetch(url).then(res => res.json()));
    const data = await Promise.all(requests);
    return data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
};
