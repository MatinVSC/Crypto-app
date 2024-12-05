import { useQuery } from "react-query";
import { getWithdrawTransactions } from "../../services/apiTransactions";


export function useWithdrawTransactions() {

    const { data: withdrawTransactions, isLoading, error } = useQuery(["withdrawTransaction"], getWithdrawTransactions,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    );

    return { withdrawTransactions, isLoading, error }
}