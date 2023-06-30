import React, {createContext, useContext, useState} from "react";

// Создаем контекст
export const AuthContext = createContext();

function AuthProvider({children}) {
    const localRole = localStorage.getItem("role");
    const localId = localStorage.getItem("id");
    const [role, setRole] = useState(localRole || "ROLE_GUEST");
    const [id, setId] = useState(localId || null);

    const setStorageValue = (key, value) => {
        console.log("auth: " + key + " : " + value)
        if (key === "role") {
            setRole(value);
            if (value == null)
                localStorage.removeItem("role");
            else
                localStorage.setItem("role", value);
        } else if (key === "id") {
            setId(value);
            if (value == null)
                localStorage.removeItem("id");
            else
                localStorage.setItem("id", value);
        }
    };

    return (
        <AuthContext.Provider value={{role, id, setStorageValue}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const {role, id, setStorageValue} = useContext(AuthContext);

    const setRole = (value) => {
        setStorageValue("role", value);
    };

    const setId = (value) => {
        setStorageValue("id", value);
    };

    return {role, id, setRole, setId};
}

export {AuthProvider, useAuth};
