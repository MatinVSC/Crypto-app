import { useQuery } from "react-query";
import { getUserTickets } from "../../services/apiTickets";

export function useUserTickets() {

    const { data: userTickets, isLoading, error } = useQuery(["userTickets"], getUserTickets,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
        }
    );

    return { userTickets, isLoading, error }
}