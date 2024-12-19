import { useMutation } from "react-query";
import { getReplayTicket } from "../../services/apiTickets";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export function useReplayTicket() {
    const { t } = useTranslation();

    const { mutate: replayTicket, isLoading, error } = useMutation({
        mutationFn: ({ ticketId, content }) => getReplayTicket({ ticketId, content }),
        onSuccess: (data) => {
            console.log(data);

            toast.success(t('toast.replay', "Ticket successfully answered."))
        },
        onError: err => {
            console.log(err);
            toast.error(t('toast.error', "Error processing the request. Please try again later."))
        }
    });

    return { replayTicket, isLoading, error }
};