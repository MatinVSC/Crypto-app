import { useQuery } from "react-query";
import { getUserData } from "../../services/apiUser";

export function useUserData() {

    const { data: userData, isLoading, error } = useQuery(["user"], getUserData,
        {
            staleTime: 1000 * 40 * 10,
            cacheTime: 1000 * 60 * 20,
            enabled: !!localStorage.getItem('userSession'),
        }
    );
    
    return { userData, isLoading, error }
};