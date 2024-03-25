import fetchAllCryptosList from "@/api/fetchAllCryptoList";
import { ErrorMessage } from "@/types/Error";
import { useQuery } from "@tanstack/react-query";
import { Crypto } from "@/types/Crypto";

const useAllCryptosList = () => {
    return useQuery<Crypto[], ErrorMessage>({
        queryKey: ['cryptoList'],
        queryFn: fetchAllCryptosList,
      });
}

export default useAllCryptosList;