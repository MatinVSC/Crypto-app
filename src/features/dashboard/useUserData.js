import { useQuery } from "react-query";
import { getUserData } from "../../services/apiUser";

export function useUserData() {

    const { data: userData, isLoading, error } = useQuery(["user"], getUserData);

    return { userData, isLoading, error }
}