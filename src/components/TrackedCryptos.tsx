import { Crypto } from '../types/Crypto';

export type TrackedCryptosProps = {
  isError: boolean;
  trackedCryptosList?: Crypto[];
  removeCryptoById: (cryptoId: string) => void;
  children: React.ReactNode;
};

const TrackedCryptos = ({
  isError,
  trackedCryptosList,
  removeCryptoById,
  children,
}: TrackedCryptosProps) => {
  const handleRemove = (cryptoId: string) => {
    removeCryptoById(cryptoId);
  };

  if (isError) {
    return <h2>Error fetching cryptocurrencies</h2>;
  }

  return (
    <div className="mt-2">
      <h1 className="flex justify-center items-center my-4">
        Tracked Cryptocurrencies
      </h1>

      {children}

      <div className="flex justify-between items-center w-full my-4 p-4 bg-violet-800 rounded-xl">
        <h2 className="ml-4 w-1/3">Name</h2>
        <h2 className="w-1/3">Symbol</h2>
        <div className="flex items-center gap-8 w-1/3">
          <h2 className="w-1/2">Price</h2>
          <h2 className="mx-12 w-1/2">Action</h2>
        </div>
      </div>

      {trackedCryptosList &&
        trackedCryptosList.map((crypto) => (
          <div
            key={crypto.id}
            className="flex justify-between items-center w-full my-4 p-4 bg-blue-700 rounded-xl"
          >
            <h2 className="ml-2 w-1/3">{crypto.name}</h2>
            <h2 className="w-1/3">
              {crypto.symbol ? crypto.symbol.toLocaleUpperCase() : ''}
            </h2>
            <div className="flex w-1/3 items-center gap-8">
              <h2 className="w-1/2">${crypto.current_price}</h2>
              <button
                type="button"
                className="border-red-500 border-4 mx-6 w-1/2"
                onClick={() => handleRemove(crypto.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TrackedCryptos;
