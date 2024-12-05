import { useQuery } from "react-query";
import { getActivitedPlans } from "../../services/apiActivationPlan";

export function useUserActivitedPlans() {

    const { data: userActivitedPlans, isLoading, error } = useQuery(["userActivitedPlans"], getActivitedPlans,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
        }
    );

    return { userActivitedPlans, isLoading, error }
}