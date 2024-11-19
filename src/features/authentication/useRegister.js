import { useMutation } from "react-query";
import { Register } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


export function useRegister() {
    const navigate = useNavigate();
    const { setIsRegistered } = useAuth();

    const { mutate: register, isLoading, error } = useMutation({
        mutationFn: ({ email, password }) => Register({ email, password }),
        onSuccess: (data) => {
            if (!data.error) {
                toast.success('Account successfully created !')
                setIsRegistered(true);
                navigate('/dashboard');
            }
        },
        onError: err => {
            console.log(err)
            toast.error('Provided email or password are incorrect')
        }
    })

    return { register, isLoading, error }
}