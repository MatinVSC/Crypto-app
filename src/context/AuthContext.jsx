import React, { createContext, useState, useContext, useEffect } from "react";
import Spinner from "../ui/Spinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [userSession, setUserSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const session = localStorage.getItem("userSession");
        if (session) {
            setUserSession(session);
        }
        setIsLoading(false)
    }, []);

    const updateUserSession = (session) => {
        if (session) {
            localStorage.setItem("userSession", session);
            setUserSession(session);
        } else {
            localStorage.removeItem("userSession");
            setUserSession(null);
        }
    };

    if (isLoading) return <Spinner />;


    return (
        <AuthContext.Provider value={{ isRegistered, setIsRegistered, userSession, updateUserSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
