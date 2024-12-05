import { useMutation } from "react-query";
import { Login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


export function useLogin() {
    // const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setIsRegistered } = useAuth();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            const { session } = user?.data
            if (!user.error) {
                localStorage.setItem('userSession', session)
                // queryClient.setQueryData(['user'], session);
                setIsRegistered(true);
                navigate('/dashboard');
            }
        },
        onError: err => {
            console.log(err)
            toast.error('Provided email or password are incorrect')
        }
    })

    return { login, isLoading }
}