type SearchCryptoProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchCrypto = ({ searchInput, setSearchInput }: SearchCryptoProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="flex flex-col w-full my-4">
      <input
        type="text"
        className="rounded-md h-10 p-4 w-1/3"
        placeholder="Filter by name or symbol..."
        value={searchInput}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchCrypto;
