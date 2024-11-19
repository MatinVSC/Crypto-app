import { BASE_URL } from '../utils/baseUrl';

// user Register
export async function Register({ email, password }) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const register = await response.json();
        return register
    }
    catch (error) {
        throw new Error(error.message);
    }
};

// user Login
export async function Login({email, password}) {
    try {
        const response = await fetch(`http://qglobal.onthewifi.com/login`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        const login = await response.json();
        return login
    } 
    catch (error) {
        throw new Error(error.message);
    }
};