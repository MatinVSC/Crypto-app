import { useQuery } from "react-query";
import { getFirstPartners } from "../../services/apiPartnership";

export function useFirstPartners() {

    const { data: firstPartners, isLoading, error } = useQuery(["firstParters"], getFirstPartners,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
        }
    );

    return { firstPartners, isLoading, error }
};