import { TIMEFRAMES } from '@/constants';
import usePriceHistory from '../hooks/usePriceHistory';
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
import { useState } from 'react';
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
  const [timePeriod, setTimePeriod] = useState<number>(7);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin');

  const { data, isError, isLoading } = usePriceHistory(
    selectedCrypto,
    timePeriod,
  );

  const options = {
    responsive: true,
  };

  return (
    <div className="mt-6">
      <h1 className="flex justify-center items-center my-4">
        Price History Chart
      </h1>

      {isError && <div>Got error.</div>}

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

      <div className="flex relative justify-center items-center my-8 w-full">
        {isLoading && (
          <Spinner color="indigo" className="h-20 w-20 absolute inset-50%" />
        )}

        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default PriceHistoryChart;
