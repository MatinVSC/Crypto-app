import toast from "react-hot-toast";
import { BASE_URL } from "../utils/baseUrl";
import { getUserSession } from "../utils/useSession";

// get user data
export async function getUserTickets() {
    const userSession = getUserSession();
    try {
        const response = await fetch(`${BASE_URL}/getTickets`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const userTickets = await response.json();
        return userTickets;

    } catch (error) {
        throw new Error(error.message);
    }
};

// get ticket user id 
export async function getTicketId({ ticketId }) {
    const userSession = getUserSession();
    try {
        const response = await fetch(`${BASE_URL}/getTicket/${ticketId}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const userTickets = await response.json();
        return userTickets;

    } catch (error) {
        throw new Error(error.message);
    }
};

// get send new ticket
export async function getSendTicket({ subject, topic, description }) {
    const userSession = getUserSession();
    try {
        const response = await fetch(`${BASE_URL}/newTicket`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
            body: JSON.stringify({ subject, topic, description })
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const sendTicket = await response.json();
        return sendTicket;

    } catch (error) {
        throw new Error(error.message);
    }
};


// get reolay ticket
export async function getReplayTicket({ ticketId: ticket, content }) {
    console.log({ticket, content});
    
    const userSession = getUserSession();
    try {
        const response = await fetch(`${BASE_URL}/sendMessage`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "key": userSession
            },
            body: JSON.stringify({ ticket, content })
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const replayTicket = await response.json();
        return replayTicket;

    } catch (error) {
        throw new Error(error.message);
    }
};