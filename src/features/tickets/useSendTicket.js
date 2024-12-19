import { useMutation } from "react-query";
import { getSendTicket } from "../../services/apiTickets";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export function useSendTicket() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { mutate: sendTicket, isLoading, error } = useMutation({
        mutationFn: ({ subject, topic, description }) => getSendTicket({ subject, topic, description }),
        onSuccess: () => {
            toast.success(t('toast.createTicket', "Your ticket was successfully created."))
            navigate('/getTickets')
        },
        onError: err => {
            console.log(err);
            toast.error(t('toast.error', "Error processing the request. Please try again later."))
        }
    });

    return { sendTicket, isLoading, error }
}