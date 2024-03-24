export const localStorageCryptoListKey = 'localStorageCryptoListKey';

export const COINGECKO = {
    LIST_URL: () => `https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${process.env.API_KEY_COINGECKO}`,
    COIN_URL: (cryptoId: string) => `https://api.coingecko.com/api/v3/coins/${cryptoId}?x_cg_demo_api_key=${process.env.API_KEY_COINGECKO}`,
    COIN_CHART_URL: (cryptoId: string, days: number) => `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${process.env.API_KEY_COINGECKO}`
};

export const CRYPTOCURRENCIES = ["bitcoin", "ethereum", "solana", "cardano", "dogecoin"];
