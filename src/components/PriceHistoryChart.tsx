import { TIMEFRAMES } from '@/constants';
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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Combobox } from './ui/combobox';
import { Crypto } from '@/types/Crypto';
import { Spinner } from '@material-tailwind/react';

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

type PriceHistoryChartProps = {
  trackedCryptos?: Crypto[];
};

const PriceHistoryChart = ({ trackedCryptos }: PriceHistoryChartProps) => {
  const [timePeriod, setTimePeriod] = useState<number | undefined>(7);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin');

  const {
    data: priceHistory,
    refetch,
    isLoading,
  } = usePriceHistory(selectedCrypto, timePeriod);

  useEffect(() => {
    refetch();
  }, [timePeriod, selectedCrypto]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center">
  //       <Spinner color="indigo" className="h-20 w-20" />
  //     </div>
  //   );
  // }

  if (!priceHistory) {
    return <h2>Error getting price chart</h2>;
  }

  // get the x,y values
  let cryptoChartData: ChartData = [];
  cryptoChartData = priceHistory?.prices.map((value) => ({
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
        label: selectedCrypto,
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

      <div className="flex justify-center items-center my-4 gap-4">
        {TIMEFRAMES.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTimePeriod(value)}
          >
            {label}
          </button>
        ))}
        <Combobox
          items={
            trackedCryptos?.map(({ id, name }) => ({
              label: name,
              value: id,
            })) ?? []
          }
          itemSelected={(cryptoId) => setSelectedCrypto(cryptoId)}
        />
      </div>

      {data ? (
        <div className="flex justify-center items-center my-8 w-full">
          <Line options={options} data={data} />
        </div>
      ) : (
        <div className="flex justify-center">
          <Spinner color="indigo" className="h-20 w-20" />
        </div>
      )}
    </div>
  );
};

export default PriceHistoryChart;
