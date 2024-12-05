import { useMutation, useQueryClient } from "react-query";
import { getTicketId } from "../../services/apiTickets";
import toast from "react-hot-toast";

export function useTicketId() {
    const queryClient = useQueryClient();

    const { mutate: userTicketId, isLoading, error } = useMutation({
        mutationFn: ({ ticketId }) => getTicketId({ ticketId }),
        onSuccess: (data) => {
            queryClient.setQueryData(["userTicketId"], data.data);
        },
        onError: err => {
            console.log(err);
            toast.error("Error processing the request. Please try again later.")
        }
    });

    return { userTicketId, isLoading, error }
}