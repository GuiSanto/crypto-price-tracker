import { useState } from 'react';
import { Crypto } from '../types/Crypto';
import { Spinner } from '@material-tailwind/react';
import SearchCrypto from './SearchCrypto';
import { filterCryptosByName } from '@/lib/filterCryptosByName';
import { Combobox } from '@/components/ui/combobox';
import CryptoComboBox from './CryptoComboBox';

export type TrackedCryptosProps = {
  isLoading: boolean;
  isError: boolean;
  trackedCryptosList?: Crypto[];
  addCryptoById: (cryptoId: string) => void;
  removeCryptoById: (cryptoId: string) => void;
};

const TrackedCryptos = ({
  isLoading,
  isError,
  addCryptoById,
  trackedCryptosList,
  removeCryptoById,
}: TrackedCryptosProps) => {
  const [searchInput, setSearchInput] = useState<string>('');

  // filtering cryptos shown according to user input
  const data = filterCryptosByName(searchInput, trackedCryptosList);

  const handleRemove = (cryptoId: string) => {
    removeCryptoById(cryptoId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner color="indigo" className="h-20 w-20" />
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

      <div className="flex gap-4">
        <SearchCrypto
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <CryptoComboBox addCryptoById={addCryptoById} />
      </div>

      {data &&
        data.map((crypto) => (
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
                className="border-purple-900 border-4 mx-6 w-24"
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
