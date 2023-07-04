import React from "react"
import Navigation from "../header/Navigation";
import MainInfo from "./parts/MainInfo.jsx"
import Service from "./parts/Service.jsx"
import Prices from "./parts/Prices.jsx"
import Footer from "../footer/Footer"
import AboutUs from "./parts/AboutUs.jsx"
import ReferralProgram from "./parts/ReferralProgram.jsx"
import Team from "./parts/Team.jsx"
import Vacancies from "./parts/Vacancies.jsx"
import ReviewCarousel from "./parts/ReviewCarousel.jsx"




function MainPage() {
    const role = localStorage.getItem("role")

    return (
      <>
        <div className="main">
          <Navigation/>
          <MainInfo/>
          <AboutUs/>
          <Team/>
          <Vacancies/>
          <Service/>
          <ReferralProgram/>
          <ReviewCarousel/>
          <Footer/>
        </div>
      </>
    );
  }
  
  export default MainPage;