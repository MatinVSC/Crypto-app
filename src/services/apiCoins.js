import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";
import { userSession } from "../utils/useSession";

// get Coins data
export async function getCoins() {

    try {
        const response = await fetch(`${BASE_URL}/coins`, {
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

// get deposit coin

export async function getDepositCoin({ value, coinId: coin }) {

    try {
        const response = await fetch(`${BASE_URL}/newt`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
            body: JSON.stringify({ value, coin })
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const depositCoin = await response.json();
        return depositCoin

    } catch (error) {
        throw new Error(error.message);
    }
};

// get withderaw coin

export async function getWithdrawCoin({ value, coinId: coin, walletAddress }) {
    console.log({value, walletAddress, coin});
    

    try {
        const response = await fetch(`${BASE_URL}/neww`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
            body: JSON.stringify({ value, coin, walletAddress })
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const depositCoin = await response.json();
        return depositCoin

    } catch (error) {
        throw new Error(error.message);
    }
};