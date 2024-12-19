import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/baseUrl';

// user Register
export async function Register({ email, password, referral = "" }) {
    
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password, referral })
        });

        if (!response.ok) {
            toast.error("Error processing the request. Please try again later.")
        }

        const register = await response.json();
        return register
    }
    catch (error) {
        throw new Error(error.message);
    }
};

// user Login
export async function Login({ email, password }) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            toast.error("You don't have an account. Please sign up first")
        }

        const login = await response.json();
        return login
    }
    catch (error) {
        throw new Error(error.message);
    }
};

