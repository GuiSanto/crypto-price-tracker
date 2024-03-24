import { COINGECKO } from "../constants";
import { Crypto } from "../types/Crypto";

const fetchCryptoList = async () => {
    const response = await fetch(COINGECKO.LIST_URL(), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Crypto[] = await response.json();
    return data;
}

export default fetchCryptoList;