import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";

const userSession = localStorage.getItem('userSession');

// get user data
export async function getUserData() {

    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const userData = await response.json();
        return userData;

    } catch (error) {
        throw new Error(error.message);
    }
};