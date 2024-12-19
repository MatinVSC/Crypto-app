import { useMutation, useQueryClient } from "react-query";
import { getWithdrawCoin } from "../../services/apiCoins";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export function useWithdrawCoin() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { mutate: withdrawCoin, isLoading, error } = useMutation({
        mutationFn: ({ value, coinId, walletAddress }) => getWithdrawCoin({ value, coinId, walletAddress }),
        onSuccess: (data) => {
            if (data.data) {
                queryClient.setQueryData(["walletWithdraw"], data.data);
                toast.success(t('coin.withdrawSucc', "Your withdrawal was successful"))
            } else {
                toast.error(t('toast.wallet', "Your wallet balance is insufficient !"))
            }
        },
        onError: err => {
            console.log(err);
            toast.error(t('toast.error', "Error processing the request. Please try again later."))
        }
    });

    return { withdrawCoin, isLoading, error }
};