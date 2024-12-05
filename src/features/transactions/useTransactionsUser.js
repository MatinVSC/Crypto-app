import { useQuery } from "react-query";
import { getDepositTransactions } from "../../services/apiTransactions";


export function useDepositTransactions() {

    const { data: depositTransactions, isLoading, error } = useQuery(["depositTransaction"], getDepositTransactions,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    );

    return { depositTransactions, isLoading, error }
}