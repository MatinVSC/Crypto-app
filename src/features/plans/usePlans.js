import { useQuery } from "react-query";
import { getPlans } from "../../services/apiPlans";

export function usePlans() {

    const { data: plansData, isLoading, error } = useQuery(["plans"], getPlans,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
        }
    );

    return { plansData, isLoading, error }
}