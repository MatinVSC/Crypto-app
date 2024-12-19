import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";
import { getUserSession } from "../utils/useSession";

export async function getNotifications() {
    const userSession = getUserSession();
    try {
        const response = await fetch(`${BASE_URL}/getn`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const userNotifications = await response.json();
        return userNotifications?.data;

    } catch (error) {
        throw new Error(error.message);
    }
};