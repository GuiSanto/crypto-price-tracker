import { Crypto } from '../types/Crypto';
import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '../types/Error';
import fetchCryptoData from '../api/fetchCrypto';

// Fetch data a cryptocurrency using react-query
const useCrypto = (cryptoName: string) => {
    return useQuery<Crypto, ErrorMessage>({
        queryKey: ['crypto', cryptoName],
        queryFn: () => fetchCryptoData(cryptoName),
        enabled: false,
    });
};


export default useCrypto;