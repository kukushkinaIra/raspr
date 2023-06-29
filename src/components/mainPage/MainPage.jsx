import React from "react"
import Navigation from "./parts/Navigation.jsx"
import MainInfo from "./parts/MainInfo.jsx"
import Service from "./parts/Service.jsx"
import Prices from "./parts/Prices.jsx"
import Reviews from "./parts/Reviews.jsx"
import Footer from "../footer/Footer"
import AboutUs from "./parts/AboutUs.jsx"
import ReferalProgramm from "./parts/ReferalProgramm.jsx"
import Team from "./parts/Team.jsx"
import Vacansies from "./parts/Vacansies.jsx"


function MainPage() {
    return (
      <>
        <div className="main">
          <Navigation/>
          <MainInfo/>
          <AboutUs/>
          <Service/>
          <Prices/>
          <ReferalProgramm/>
          <Team/>
          <Vacansies/>
          <Reviews/>
          <Footer/>
        </div>
      </>
    );
  }
  
  export default MainPage;