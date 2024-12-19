import { useDepositTransactions } from "./useTransactionsUser";
import { useWithdrawTransactions } from "./useWithdrawTransactions";

export function useAllTransactions() {
    const { depositTransactions, isLoading: isLoadingDeposit } = useDepositTransactions();
    const { withdrawTransactions, isLoading: isLoadingWithdraw } = useWithdrawTransactions();

    const isLoading = isLoadingDeposit || isLoadingWithdraw;
    const allTransactions = [...(depositTransactions?.data || []), ...(withdrawTransactions?.data || [])];

    return { allTransactions, isLoading };
};