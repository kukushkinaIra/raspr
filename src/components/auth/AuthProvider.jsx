import React, {createContext, useContext, useState} from "react";

// Создаем контекст
const AuthContext = createContext();

function AuthProvider({children}) {
    const localRole = localStorage.getItem('role')
    const [role, changeRole] = useState(localRole == null ? "ROLE_GUEST" : localRole);

    const setRole = (value) => {
        changeRole(value);
        localStorage.setItem("role", value)
    };

    return (
        <AuthContext.Provider value={{role, setRole}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const {role, setRole} = useContext(AuthContext);
    return {role, setRole};
}

export {AuthProvider, useAuth};
