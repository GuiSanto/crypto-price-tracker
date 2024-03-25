import { COINGECKO } from "../constants";

const fetchAllCryptosList = async () => {
    const response = await fetch(COINGECKO.LIST_URL(), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export default fetchAllCryptosList;