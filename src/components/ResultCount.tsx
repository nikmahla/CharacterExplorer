type Props = {
  count: number;
};

const ResultsCount = ({ count }: Props) => {
  return (
    <div className="text-sm md:text-base w-full justify-center ">
      {count > 0
        ? `Found ${count} result${count > 1 ? 's' : ''}`
        : 'No results found'}
    </div>
  );
};

export default ResultsCount;
