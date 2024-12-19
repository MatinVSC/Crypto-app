import { useQuery } from "react-query";
import { getNotifications } from "../../services/apiNotifications";

export function useNotifications() {

    const { data: userNotifications, isLoading, error } = useQuery(["notifications"], getNotifications,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    );

    return { userNotifications, isLoading, error }
}