import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function ConfirmationPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get("email");
        const token = searchParams.get("token");
        confirmEmail(email, token);
    }, [location]);

    const confirmEmail = (email, token) => {
        console.log(email);
        console.log(token);
        const url = `/auth/confirm?email=${email}&token=${token}`
        console.log(url)
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    navigate("/home");
                    toast.success("Email подтвержден успешно!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else {
                    navigate("/home");
                    toast.error("Ошибка при подтверждении email.",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                }
            })
            .catch((error) => {
                navigate("/");
                toast.error("Ошибка при подтверждении email.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            });
    };

    return <div>Loading...</div>;
}

export default ConfirmationPage;
