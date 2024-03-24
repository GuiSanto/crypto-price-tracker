import { Crypto } from '../types/Crypto';
import { Spinner } from '@material-tailwind/react';

export type TrackedCryptosProps = {
  isLoading: boolean;
  isError: boolean;
  trackedCryptosList?: Crypto[];
  removeCryptoById: (cryptoId: string) => void;
  children: React.ReactNode;
};

const TrackedCryptos = ({
  isLoading,
  isError,
  trackedCryptosList,
  removeCryptoById,
  children,
}: TrackedCryptosProps) => {
  const handleRemove = (cryptoId: string) => {
    removeCryptoById(cryptoId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner
          color="indigo"
          className="h-20 w-20"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        <p>Error fetching cryptocurrencies</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <h1 className="flex justify-center items-center my-4">
        Tracked Cryptocurrencies
      </h1>

      {children}

      {trackedCryptosList &&
        trackedCryptosList.map((crypto) => (
          <div
            key={crypto.id}
            className="flex justify-between items-center w-full my-4 p-4 bg-indigo-600 rounded-xl"
          >
            <h2 className="ml-2 w-1/3">{crypto.name}</h2>
            <h2 className="w-1/3">
              {crypto.symbol ? crypto.symbol.toLocaleUpperCase() : ''}
            </h2>
            <div className="flex w-1/3 items-center gap-8">
              <h2 className="w-1/2">${crypto.current_price}</h2>
              <button
                type="button"
                className="border-red-900 border-4 mx-6 w-1/2"
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
