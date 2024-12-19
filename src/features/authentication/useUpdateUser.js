import { useMutation, useQueryClient } from "react-query";
import { getUpdateUser } from "../../services/apiUser";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";


export function useUpdateUser() {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: ({ email, currentPassword, newPassword }) => {
            return getUpdateUser({ email, currentPassword, newPassword });
        },
        onSuccess: (user) => {

            console.log(user);

            if (!user.error) {
                queryClient.setQueryData(["updateUser"], user.message);
                toast.success(t('toast.updateAccount', 'Email or password successfully updated'));
            }
        },
        onError: (err) => {
            console.log(err);
            toast.error(t('toast.incorrect', "Provided email or password are incorrect"));
        }
    });

    return { updateUser, isLoading };
}
