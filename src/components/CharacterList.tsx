import { useState } from "react";
import type { Character } from "../types/Character";
import CharacterListItem from "./CharacterListItem";

type Props = {
  characters: Character[];
  onSelect: (char: Character) => void;
};

const CharacterList = ({ characters, onSelect }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (char: Character) => {
    setSelectedId(char.id);
    onSelect(char);
  };

  return (
    <ul className="space-y-3 h-full overflow-y-auto">
      {characters.map((char) => (
        <CharacterListItem
          key={char.id}
          character={char}
          onSelect={handleSelect}
          selected={char.id === selectedId}
        />
      ))}
    </ul>
  );
};

export default CharacterList;
