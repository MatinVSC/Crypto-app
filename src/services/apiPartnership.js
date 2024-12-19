import toast from "react-hot-toast";
import { getUserSession } from "../utils/useSession";
import { BASE_URL } from "../utils/baseUrl";


export async function getFirstPartners() {
    const userSession = getUserSession();
    try {
        const response = await fetch(`${BASE_URL}/firstPartners`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const coinsData = await response.json();
        return coinsData;

    } catch (error) {
        throw new Error(error.message);
    }
};

export async function getSecondPartners() {
    const userSession = getUserSession();
    try {
        const response = await fetch(`${BASE_URL}/secondPartners`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const coinsData = await response.json();
        return coinsData;

    } catch (error) {
        throw new Error(error.message);
    }
};