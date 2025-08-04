type Props = {
  value: string;
  onChange: (query: string) => void;
};

const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div className="w-full max-w-xl mx-auto border border-gray-500 rounded-lg px-4 py-2 shadow-sm bg-[#64748b]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a character for details ..."
        className="flex-1 outline-none bg-transparent text-sm text-white-100 md:text-base w-full"
      />
    </div>
  );
};

export default SearchInput;
