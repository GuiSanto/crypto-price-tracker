import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '../types/Error';
import PriceHistory from '../types/PriceHistory';
import fetchPriceHistory from '../api/fetchPriceHistory';
import { ChartData } from 'chart.js';
import { CryptoChartData } from '@/types/CryptoChartData';
import { dataFormatUtils } from '@/lib/utils';

const initialData: ChartData<'line', string[], string> = {
  datasets: [],
};

// Fetch data a cryptocurrency using react-query
const usePriceHistory = (cryptoId: string = 'bitcoin', days: number = 7) => {
  const { data, isLoading, isError } = useQuery<PriceHistory, ErrorMessage>({
    queryKey: ['priceHistory', cryptoId, days],
    queryFn: async () => fetchPriceHistory(cryptoId, days),
  });

  if (isLoading) {
    return { data: initialData, isLoading };
  }

  if (isError) {
    return { data: initialData, isError };
  }

  if (!Array.isArray(data?.prices) || data?.prices.length <= 0) {
    return { data: initialData };
  }

  const cryptoChartData: CryptoChartData = data.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const chartData: ChartData<'line', string[], string> = {
    labels: cryptoChartData.map((value) => dataFormatUtils(value.x, days)),
    datasets: [
      {
        fill: true,
        label: cryptoId,
        data: cryptoChartData.map((value) => value.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
    
  };

  return { data: chartData };
};

export default usePriceHistory;
