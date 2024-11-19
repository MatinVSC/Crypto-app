import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isRegistered, setIsRegistered] = useState(false);

    return (
        <AuthContext.Provider value={{ isRegistered, setIsRegistered }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
