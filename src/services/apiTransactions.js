import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";

const userSession = localStorage.getItem('userSession');

// get user transaction
export async function getTransactionUser() {

    try {
        const response = await fetch(`${BASE_URL}/gett`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const userTransactions = await response.json();
        return userTransactions;

    } catch (error) {
        throw new Error(error.message);
    }
};