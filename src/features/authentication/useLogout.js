import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";


export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: () => {
            localStorage.removeItem('userSession');
            queryClient.removeQueries();
        },
        onSuccess: () => {
            navigate('/login', { replace: true });
        }
    });

    return { logout, isLoading }
}