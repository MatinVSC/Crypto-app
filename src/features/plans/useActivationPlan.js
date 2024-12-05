import { useMutation, useQueryClient } from "react-query";
import { getActivationPlan } from "../../services/apiActivationPlan";
import toast from "react-hot-toast";

export function useActivationPlan() {
    const queryClient = useQueryClient();

    const { mutate: activationPlan, isLoading, error } = useMutation({
        mutationFn: ({ value, planId }) => getActivationPlan({ value, planId }),
        onSuccess: (data) => {
            if (data.data) {
                queryClient.setQueryData(["activationPlan"], data);
                toast.success("Your plan has been successfully activated")
            } else {
                toast.error("Your wallet balance is insufficient !")
            }
        },
        onError: err => {
            console.log(err);
            toast.error("Error processing the request. Please try again later.")
        }
    });

    return { activationPlan, isLoading, error }
}