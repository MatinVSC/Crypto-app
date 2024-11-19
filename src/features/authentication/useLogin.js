import { useMutation } from "react-query";
import { Login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


export function useLogin() {

    const navigate = useNavigate();
    const { setIsRegistered } = useAuth();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (data) => {
            if (!data.error) {
                toast.success('Welcome Back')
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