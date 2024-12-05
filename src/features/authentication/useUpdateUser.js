import { useMutation, useQueryClient } from "react-query";
import { getUpdateUser } from "../../services/apiUser";
import toast from "react-hot-toast";


export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: ({ email, currentPassword, newPassword }) => {

            console.log({ email, currentPassword, newPassword });

            return getUpdateUser({ email, currentPassword, newPassword });
        },
        onSuccess: (user) => {

            console.log(user);

            if (!user.error) {
                queryClient.setQueryData(["updateUser"], user.message);
                toast.success("Your update email or password has been successfully updated");
            }
        },
        onError: (err) => {
            console.log(err);
            toast.error("Provided email or password are incorrect");
        }
    });

    return { updateUser, isLoading };
}
