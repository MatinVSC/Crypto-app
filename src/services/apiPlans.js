import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";


// get plans data
export async function getPlans() {
    const userSession = localStorage.getItem('userSession');

    try {
        const response = await fetch(`${BASE_URL}/plans`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const plansData = await response.json();
        return plansData;

    } catch (error) {
        throw new Error(error.message);
    }
}