import { useMutation } from "react-query";
import { getReplayTicket } from "../../services/apiTickets";
import toast from "react-hot-toast";

export function useReplayTicket() {

    const { mutate: replayTicket, isLoading, error } = useMutation({
        mutationFn: ({ ticketId, content }) => getReplayTicket({ ticketId, content }),
        onSuccess: (data) => {
            console.log(data);
            
            toast.success("Ticket successfully answered.")
        },
        onError: err => {
            console.log(err);
            toast.error("Error processing the request. Please try again later.")
        }
    });

    return { replayTicket, isLoading, error }
}