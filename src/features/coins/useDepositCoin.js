import { useMutation, useQueryClient } from "react-query";
import { getDepositCoin } from "../../services/apiCoins";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useDepositCoin() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { mutate: depositCoin, isLoading, error } = useMutation({
        mutationFn: ({ value, coinId }) => getDepositCoin({ value, coinId }),
        onSuccess: (data) => {
            console.log(data);

            queryClient.setQueryData(["walletDeposit"], data.data);
            toast.success(t('toast.depositAddress', "Your deposit wallet address has been created successfully"))
        },
        onError: err => {
            console.log(err);
            toast.error(t('toast.error', "Error processing the request. Please try again later."))
        }
    });

    return { depositCoin, isLoading, error }
}