import { COINGECKO } from "../constants";

const fetchPriceHistory = async (coinId: string = 'bitcoin', days: number = 7) => {
    const response = await fetch(COINGECKO.COIN_CHART_URL(coinId, days), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const { prices } = data;
    return prices;
}

export default fetchPriceHistory;