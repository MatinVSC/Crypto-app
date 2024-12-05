import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";
import { userSession } from "../utils/useSession";

// get deposit transaction
export async function getDepositTransactions() {

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

// get whithraw transactions
export async function getWithdrawTransactions() {

    try {
        const response = await fetch(`${BASE_URL}/getw`, {
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
