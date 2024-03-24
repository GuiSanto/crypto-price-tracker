import { useEffect, useState } from "react";
import usePriceHistory from "../hooks/usePriceHistory";
import PriceHistory from "../types/PriceHistory";
import CryptoChartData from "../types/CryptoChartData";

const PriceHistoryChart = () => {
    const [priceHistory, setpriceHistory] = useState<PriceHistory>()

    const { data } = usePriceHistory();
    
    useEffect(() => {
        if (data) {
            setpriceHistory(data)
        }
    }, [data])

    // let cryptoChartData: CryptoChartData = undefined;

    // if (priceHistory && priceHistory.prices) {
    //     cryptoChartData = priceHistory.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
    // }

    // console.log(cryptoChartData)

    return (
        <div className="mt-6">
            <h1 className="flex justify-center items-center my-4">Price History Chart</h1>
        </div>
    )
}

export default PriceHistoryChart;