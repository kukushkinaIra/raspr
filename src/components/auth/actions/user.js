import jwt_decode from "jwt-decode";
import {useAuth} from "../AuthProvider";

export const registration = async (username, password, setRole, setId) => {
    await fetch(`/auth/signUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
        credentials: "include"
    });
    const authCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.startsWith("auth="));
    if (authCookie) {
        const token = authCookie.split("=")[1];
        const decodedToken = jwt_decode(token);
        const {role, id} = decodedToken;

        setId(id);
        setRole(role);
    }
}

export const login = async (username, password, setRole, setId) => {
    await fetch(`/auth/signIn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
        credentials: "include"
    });
    const authCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.startsWith("auth="));
    if (authCookie) {
        const token = authCookie.split("=")[1];
        const decodedToken = jwt_decode(token);
        const {role, id} = decodedToken;

        setId(id);
        setRole(role);
    }
}

export const logout = async (setRole, setId) => {
    await fetch(`/auth/signOut`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    setId(null);
    setRole("ROLE_GUEST");
}