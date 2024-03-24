import { useEffect, useState } from 'react';
import { Crypto } from '../types/Crypto';
import TrackedCryptos, { TrackedCryptosProps } from './TrackedCryptos';
import SearchCrypto from './SearchCrypto';
import { filterCryptosByName } from '../lib/filterCryptosByName';
import { CRYPTOCURRENCIES, localStorageCryptoListKey } from '../constants';
import PriceHistoryChart from './PriceHistoryChart';
import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '../types/Error';
import fetchCrypto from '../api/fetchCrypto';
import fetchCryptoList from '../api/fetchCryptoList';
import { ComboBoxProps, Combobox } from '@/components/ui/combobox';

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

  // get all the tracked cryptos from the API
  const { data, isLoading, isError, refetch } = useQuery<
    Crypto[],
    ErrorMessage
  >({
    queryKey: ['cryptoData'],
    queryFn: async () => {
      const promises = trackedCryptos.map((crypto) =>
        fetchCrypto(crypto.toLowerCase()),
      );
      const data = await Promise.all(promises);
      return data;
    },
    refetchInterval: 60e3, // 60 seconds in milliseconds
  });

  // fetch the list of all supported coins by CoinGecko
  // NOTE: The CoinGecko API can only fetch ALL cryptos, it doesn't have an endpoint with the option to filter them in the request,
  // so the only way is to get them all
  const { data: cryptoList } = useQuery<Crypto[], ErrorMessage>({
    queryKey: ['cryptoList'],
    queryFn: fetchCryptoList,
  });

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
      <Combobox
        items={
          cryptoList?.map(({ id, name }) => ({ label: name, value: id })) ?? []
        }
        itemSelected={addCryptoToTrack}
      ></Combobox>

      {isError ? (
        <h2>Error fetching data</h2>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <TrackedCryptos
            trackedCryptosList={filterCryptosByName(searchInput, data)}
            removeCryptoById={handleRemoveCryptoById}
          >
            <SearchCrypto
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </TrackedCryptos>
        </>
      )}

      <PriceHistoryChart />
    </div>
  );
};

export default Cryptocurrencies;
