import { useEffect, useState } from 'react';
import TrackedCryptos, { TrackedCryptosProps } from './TrackedCryptos';
import { CRYPTOCURRENCIES, localStorageCryptoListKey } from '../constants';
import PriceHistoryChart from './PriceHistoryChart';
import { ComboBoxProps } from '@/components/ui/combobox';
import useCryptos from '@/hooks/useCryptos';

const Cryptocurrencies = () => {
  // get tracked cryptos from localStorage. If not, start with 5 by default
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
      <TrackedCryptos
        isLoading={isLoading}
        isError={isError}
        trackedCryptosList={data}
        addCryptoById={addCryptoToTrack}
        removeCryptoById={handleRemoveCryptoById}
      />

      <PriceHistoryChart trackedCryptos={data} />
    </div>
  );
};

export default Cryptocurrencies;
