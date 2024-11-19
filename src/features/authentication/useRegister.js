import { useMutation, useQueryClient } from "react-query";
import { Register } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


export function useRegister() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setIsRegistered } = useAuth();

    const { mutate: register, isLoading } = useMutation({
        mutationFn: ({ email, password }) => Register({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
            setIsRegistered(true);
            navigate('/dashboard');
        },
        onError: err => {
            console.log(err)
            toast.error('Provided email or password are incorrect')
        }
    })

    return { register, isLoading }
}