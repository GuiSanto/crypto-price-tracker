import { COINGECKO } from "../constants";

const fetchCrypto = async (coinId: string) => {
    const response = await fetch(COINGECKO.COIN_URL(coinId), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const { id, name, symbol, market_data: { current_price: { usd: current_price } } } = data;
    return { id, name, symbol, current_price };
}

export default fetchCrypto;