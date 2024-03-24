import { useEffect, useState } from 'react';
import TrackedCryptos, { TrackedCryptosProps } from './TrackedCryptos';
import SearchCrypto from './SearchCrypto';
import { filterCryptosByName } from '../lib/filterCryptosByName';
import { CRYPTOCURRENCIES, localStorageCryptoListKey } from '../constants';
import PriceHistoryChart from './PriceHistoryChart';
import { ComboBoxProps, Combobox } from '@/components/ui/combobox';
import useCryptos from '@/hooks/useCryptos';
import useAllCryptoList from '@/hooks/useAllCryptoList';

const Cryptocurrencies = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  //Get tracked cryptos from localStorage. If not, start with 5 by default
  const [trackedCryptos, setTrackedCrypto] = useState<string[]>(() => {
    const arrString = localStorage.getItem(localStorageCryptoListKey) ?? 'null';

    const cryptoArr: string[] | null = JSON.parse(arrString);

    if (cryptoArr !== null && cryptoArr.length > 0) {
      return cryptoArr;
    }

    return CRYPTOCURRENCIES;
  });

  // get the tracked cryptos from the API
  const { data, isLoading, isError, refetch } = useCryptos(trackedCryptos);

  // fetch the list of all supported coins by CoinGecko
  // NOTE: The CoinGecko API can only fetch ALL cryptos, it doesn't have an endpoint with the option to filter them in the request,
  // so the only way is to get them all
  const { data: cryptoList } = useAllCryptoList();

  const handleRemoveCryptoById: TrackedCryptosProps['removeCryptoById'] = (
    cryptoId,
  ) => {
    setTrackedCrypto(
      trackedCryptos.filter(
        (item) => item.toLocaleLowerCase() !== cryptoId.toLocaleLowerCase(),
      ),
    );
  };

  const addCryptoToTrack: ComboBoxProps['itemSelected'] = (cryptoId) => {
    setTrackedCrypto((prev) => {
      return [...new Set(prev).add(cryptoId)];
    });
  };

  // Set localstorage when trackedCrypto changes
  useEffect(() => {
    try {
      localStorage.setItem(
        localStorageCryptoListKey,
        JSON.stringify(trackedCryptos),
      );
      refetch();
    } catch (err) {
      console.error(err);
    }
  }, [trackedCryptos, refetch]);

  return (
    <div className="flex flex-col mt-20 px-40">
      <div className="flex items-center gap-4">
        <h2>Add Crypto</h2>
        <Combobox
          items={
            cryptoList?.map(({ id, name }) => ({ label: name, value: id })) ??
            []
          }
          itemSelected={addCryptoToTrack}
        ></Combobox>
      </div>

      <TrackedCryptos
        isLoading={isLoading}
        isError={isError}
        trackedCryptosList={filterCryptosByName(searchInput, data)}
        removeCryptoById={handleRemoveCryptoById}
      >
        <SearchCrypto
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </TrackedCryptos>

      <PriceHistoryChart />
    </div>
  );
};

export default Cryptocurrencies;
