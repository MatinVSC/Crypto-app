import { useQuery } from "react-query";
import { getSecondPartners } from "../../services/apiPartnership";

export function useSecondPartners() {

    const { data: secondPartners, isLoading, error } = useQuery(["secondPartners"], getSecondPartners,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
        }
    );

    return { secondPartners, isLoading, error }
};