import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { getSendTicket } from "../../services/apiTickets";
import { useNavigate } from "react-router-dom";

export function useSendTicket() {
    const navigate = useNavigate();

    const { mutate: sendTicket, isLoading, error } = useMutation({
        mutationFn: ({ subject, topic, description }) => getSendTicket({ subject, topic, description }),
        onSuccess: () => {
            toast.success("Your ticket was successfully created.")
            navigate('/getTickets')
        },
        onError: err => {
            console.log(err);
            toast.error("Error processing the request. Please try again later.")
        }
    });

    return { sendTicket, isLoading, error }
}