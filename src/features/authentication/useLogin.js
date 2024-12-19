import { useMutation } from "react-query";
import { Login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export function useLogin() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setIsRegistered, updateUserSession } = useAuth();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            console.log('User data:', user);
            const { session } = user?.data;

            if (!user.error && session) {
                console.log('Session received:', session);
                updateUserSession(session);
                setIsRegistered(true);
                navigate('/dashboard');
            } else {
                console.error('Login error:', user.error);
                toast.error(t('toast.incorrect', 'Provided email or password are incorrect'));
            }
        },
        onError: err => {
            console.error('Mutation error:', err);
            toast.error(t('toast.incorrect', 'Provided email or password are incorrect'));
        }
    });

    return { login, isLoading };
};
