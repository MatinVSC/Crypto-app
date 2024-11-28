import { useQuery } from "react-query";
import { getTransactionUser } from "../../services/apiTransactions";


export function useTransactionsUser() {

    const { data: transactionUser, isLoading, error } = useQuery(["transactions"], getTransactionUser,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    );

    return { transactionUser, isLoading, error }
}