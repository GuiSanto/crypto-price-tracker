import usePriceHistory from '../hooks/usePriceHistory';
import { ChartData } from '@/types/CryptoChartData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const PriceHistoryChart = () => {
  const { data: priceHistory } = usePriceHistory('bitcoin', 30);

  if (!priceHistory) {
    return <h2>Error getting price chart</h2>;
  }

  // get the x,y values
  const cryptoChartData: ChartData = priceHistory?.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };

  const data = {
    labels: cryptoChartData.map((value) => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: 'Bitcoin',
        data: cryptoChartData.map((value) => value.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

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

      <div className="flex justify-center items-center my-8 w-full">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default PriceHistoryChart;
