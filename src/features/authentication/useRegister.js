import { useMutation } from "react-query";
import { Register } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";


export function useRegister() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setIsRegistered } = useAuth();

    const { mutate: register, isLoading, error } = useMutation({
        mutationFn: ({ email, password, referral }) => Register({ email, password, referral }),
        onSuccess: (user) => {
            const { session } = user?.data
            if (!user.error) {
                localStorage.setItem('userSession', session)
                toast.success(t('toast.register', 'Account successfully created !'))
                setIsRegistered(true);
                navigate('/dashboard');
            }
        },
        onError: err => {
            console.log(err)
            toast.error(t('toast.incorrect', 'Provided email or password are incorrect'))
        }
    })

    return { register, isLoading, error }
};