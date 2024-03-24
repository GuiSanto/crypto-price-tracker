import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '../types/Error';
import PriceHistory from '../types/PriceHistory';
import fetchPriceHistory from '../api/fetchPriceHistory';

// Fetch data a cryptocurrency using react-query
const usePriceHistory = (cryptoName?: string, days?: number) => {
    return useQuery<PriceHistory, ErrorMessage>({
        queryKey: ['crypto', cryptoName],
        queryFn: () => fetchPriceHistory(cryptoName, days),
    });
};


export default usePriceHistory;