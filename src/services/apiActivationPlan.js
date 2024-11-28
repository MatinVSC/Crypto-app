import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";

const userSession = localStorage.getItem('userSession');

// get activation plans
export async function getActivationPlan({ value, planId: plan }) {

    try {
        const response = await fetch(`${BASE_URL}/newi`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
            body: JSON.stringify({ value, plan })
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const plansData = await response.json();
        return plansData;

    } catch (error) {
        throw new Error(error.message);
    }
};

// get user activited plans 
export async function getActivitedPlans() {
    try {
        const response = await fetch(`${BASE_URL}/geti`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const userActivitedPlans = await response.json();
        return userActivitedPlans;

    } catch (error) {
        throw new Error(error.message);
    }
}