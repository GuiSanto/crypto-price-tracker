import { Crypto } from "../types/Crypto";

export const filterCryptosByName = (searchInput: string, cryptos?: Crypto[]): Crypto[] => {
    if (cryptos === undefined){
        return []
    }
    const normalizedSearchInput = searchInput.toLowerCase();
    return cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(normalizedSearchInput) ||
        crypto.symbol.toLowerCase().includes(normalizedSearchInput)
    );
};