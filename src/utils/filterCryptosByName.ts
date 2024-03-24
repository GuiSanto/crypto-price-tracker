import { Crypto } from "../types/Crypto";

export const filterCryptosByName = (cryptos: Crypto[], searchInput: string): Crypto[] => {
    const normalizedSearchInput = searchInput.toLowerCase();
    return cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(normalizedSearchInput) ||
        crypto.symbol.toLowerCase().includes(normalizedSearchInput)
    );
};