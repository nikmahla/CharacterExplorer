import type { Character } from "../types/Character";

type Props = {
  character: Character;
  onSelect: (character: Character) => void;
  selected: boolean;
};

const CharacterListItem = ({ character, onSelect, selected }: Props) => {
  return (
    <li
      onClick={() => onSelect(character)}
      className={`flex items-center gap-4 p-3 mx-2 rounded-lg shadow-md cursor-pointer transition duration-200 ease-in-out
        ${
          selected
            ? "bg-slate-700 border-b-2 border-white "
            : "bg-slate-700 hover:bg-slate-500"
        } text-white`}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-14 h-14 rounded-full object-cover "
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-lg font-bold leading-tight tracking-wide">
          Character: <span className="text-slate-400">{character.name}</span>
        </h4>
        <p className="text-sm font-medium text-white">
          Status:{" "}
          <span
            className={`capitalize ${
              character.status === "Dead"
                ? "text-red-500"
                : character.status === "Alive"
                ? "text-green-400"
                : "text-slate-400"
            }`}
          >
            {character.status}
          </span>
        </p>
      </div>
      <div
        className={`ml-auto text-xl transition ${
          selected ? "text-white-400" : "text-slate-400"
        }`}
      >
        ➤
      </div>
    </li>
  );
};

export default CharacterListItem;
