import fetchAllCryptoList from "@/api/fetchAllCryptoList";
import { ErrorMessage } from "@/types/Error";
import { useQuery } from "@tanstack/react-query";
import { Crypto } from "@/types/Crypto";

const useAllCryptoList = () => {
    return useQuery<Crypto[], ErrorMessage>({
        queryKey: ['cryptoList'],
        queryFn: fetchAllCryptoList,
      });
}

export default useAllCryptoList;