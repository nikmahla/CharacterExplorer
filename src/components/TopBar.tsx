import Logo from "./Logo";
import SearchInput from "./SearchInput";
import ResultsCount from "./ResultCount";
import Wishlist from "./WishList";
import { useState } from "react";

type Props = {
  query: string;
  setQuery: (value: string) => void;
  count: number;
};

const SearchBox = ({ query, setQuery, count }: Props) => {
  const [favCount, setFavCount] = useState(0);

  return (
    <div className="bg-[#334155]  py-4 w-full rounded-lg ">
      <div className="flex items-center justify-evenly gap-4 px-3">
        <Logo />
        <SearchInput value={query} onChange={setQuery} />
        <ResultsCount count={count} />
        <Wishlist count={favCount} setCount={setFavCount} />
      </div>
    </div>
  );
};

export default SearchBox;
