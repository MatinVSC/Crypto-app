import { useQuery } from "react-query";
import { getCoins } from "../../services/apiCoins";

export function useCoins() {

    const { data: coinsData, isLoading, error } = useQuery(["coins"], getCoins,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
        }
    );

    return { coinsData, isLoading, error }
}