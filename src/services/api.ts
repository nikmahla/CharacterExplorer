export const searchCharacters = async (query: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
  if (!res.ok) throw new Error('API error');
  return res.json();
};
