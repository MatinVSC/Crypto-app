import { useMutation, useQueryClient } from "react-query";
import { getActivationPlan } from "../../services/apiActivationPlan";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export function useActivationPlan() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { mutate: activationPlan, isLoading, error } = useMutation({
        mutationFn: ({ value, planId }) => getActivationPlan({ value, planId }),
        onSuccess: (data) => {
            if (data.data) {
                queryClient.setQueryData(["activationPlan"], data);
                toast.success(t('toast.activetedPlan', "Your plan has been successfully activated"))
            } else {
                toast.error(t('toast.wallet', "Your wallet balance is insufficient !"))
            }
        },
        onError: err => {
            console.log(err);
            toast.error(t('toast.error', "Error processing the request. Please try again later !"))
        }
    });

    return { activationPlan, isLoading, error }
}