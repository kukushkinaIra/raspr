import jwt_decode from "jwt-decode";


export const registration = async (username, password, roleCallback) => {
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

        roleCallback(role, id)
    }
}

export const login = async (username, password, roleCallback) => {
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

        roleCallback(role, id)
    }
}

export const logout = async () => {
    await fetch(`/auth/signOut`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });
}