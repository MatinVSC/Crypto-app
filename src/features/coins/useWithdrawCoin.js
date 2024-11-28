import { useMutation, useQueryClient } from "react-query";
import { getWithdrawCoin } from "../../services/apiCoins";
import toast from "react-hot-toast";

export function useWithdrawCoin() {
    const queryClient = useQueryClient();

    const { mutate: withdrawCoin, isLoading, error } = useMutation({
        mutationFn: ({ value, coinId, walletAddress }) => getWithdrawCoin({ value, coinId, walletAddress }),
        onSuccess: (data) => {            
            queryClient.setQueryData(["walletWithdraw"], data.data);
            toast.success("Your withdrawal was successful")
        },
        onError: err => {
            console.log(err);
            toast.error("Error processing the request. Please try again later.")
        }
    });

    return { withdrawCoin, isLoading, error }
}