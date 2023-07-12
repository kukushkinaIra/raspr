import React from "react"
import Navigation from "../header/Navigation";
import MainInfo from "./parts/MainInfo.jsx"
import Service from "./parts/Service.jsx"
import Footer from "../footer/Footer"
import AboutUs from "./parts/AboutUs.jsx"
import ReferralProgram from "./parts/ReferralProgram.jsx"
import Team from "./parts/Team.jsx"
import Vacancies from "./parts/Vacancies.jsx"
import {useAuth} from "../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import ReviewCarousel from "./parts/ReviewCarousel.jsx"


function MainPage() {
    const {role, id, setRole, setId} = useAuth();
    const navigate = useNavigate();

    function checkAuth() {
        fetch("/auth/isAuthenticated", {
            method: "POST"
        }).then(res => {
            console.log("id " + id)
            console.log("role " + role)
            if (!res.ok) {
                throw new Error(res.status);
            }
        })
            .catch((error) => {
                if (error.message === "401") {
                    const authCookie = document.cookie
                        .split(";")
                        .find((cookie) => cookie.startsWith("auth="));
                    console.log("auth " + authCookie)
                    console.log("id " + id)
                    console.log("role " + role)
                    if (!authCookie && (id != null || role != null)) {
                        setId(null);
                        setRole(null);
                        navigate('/');
                    }
                }
            })
    }

    checkAuth()

    return (
        <>
            <div className="main">
                <Navigation/>
                <MainInfo/>
                <AboutUs/>
                {/*<Team/>*/}
                <Service/>
                <ReferralProgram/>
                <Vacancies/>
                <ReviewCarousel/>
                <Footer/>
            </div>
        </>
    );
}

export default MainPage;