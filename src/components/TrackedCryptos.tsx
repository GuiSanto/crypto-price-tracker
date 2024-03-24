import { Crypto } from '../types/Crypto';

export type TrackedCryptosProps = {
  trackedCryptosList?: Crypto[];
  removeCryptoById: (cryptoId: string) => void;
  children: React.ReactNode;
};

const TrackedCryptos = ({
  trackedCryptosList,
  removeCryptoById,
  children,
}: TrackedCryptosProps) => {
  const handleRemove = (name: string) => {
    removeCryptoById(name);
  };

  return (
    <div className="mt-2">
      <h1 className="flex justify-center items-center my-4">
        Tracked Cryptocurrencies
      </h1>

      {children}

      <div className="flex justify-between items-center w-full my-4 p-4 bg-violet-800 rounded-xl">
        <h2 className="ml-4">Name</h2>
        <h2>Symbol</h2>
        <div className="flex items-center gap-8">
          <h2>Price</h2>
          <h2 className="mx-12">Action</h2>
        </div>
      </div>

      {trackedCryptosList &&
        trackedCryptosList.map((crypto) => (
          <div
            key={crypto.id}
            className="flex justify-between items-center w-full mt-4 p-4 bg-blue-700 rounded-xl"
          >
            <h2 className="ml-2">{crypto.name}</h2>
            <h2>{crypto.symbol ? crypto.symbol.toLocaleUpperCase() : ''}</h2>
            <div className="flex items-center gap-8">
              <h2>${crypto.current_price}</h2>
              <button
                type="button"
                className="border-red-500 border-4 mx-6 "
                onClick={() => handleRemove(crypto.name)}
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
