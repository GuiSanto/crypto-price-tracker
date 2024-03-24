import usePriceHistory from '../hooks/usePriceHistory';
import { ChartData } from '@/types/CryptoChartData';

const PriceHistoryChart = () => {
  const { data: priceHistory } = usePriceHistory('ethereum', 7);

  if (!priceHistory) {
    return <h2>Error getting price chart</h2>;
  }

  const cryptoChartData: ChartData = priceHistory?.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  console.log(cryptoChartData);

  return (
    <div className="mt-6">
      <h1 className="flex justify-center items-center my-4">
        Price History Chart
      </h1>

      <div className="flex justify-center items-center mt-4 gap-4">
        <button type="button">24 Hours</button>
        <button type="button">7 Days</button>
        <button type="button">1 Week</button>
        <button type="button">1 Month</button>
        <button type="button">1 Year</button>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
