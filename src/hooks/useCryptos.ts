import { Crypto } from '../types/Crypto';
import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '../types/Error';
import fetchCryptoData from '../api/fetchCrypto';

// Fetch data for each cryptocurrency using react-query
const useCryptos = (cryptos: string[]) => {
    return useQuery<Crypto[], ErrorMessage>({
        queryKey: ['cryptoData'],
        queryFn: async () => {
            const promises = cryptos.map(crypto => fetchCryptoData(crypto.toLowerCase()));
            const data = await Promise.all(promises);
            return data;
        },
        refetchInterval: 60e3 // 60 seconds in milliseconds
    });
}

export default useCryptos;