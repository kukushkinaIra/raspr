import React from "react"
import Navigation from "./parts/Navigation.jsx"
import MainInfo from "./parts/MainInfo.jsx"
import Service from "./parts/Service.jsx"
import Prices from "./parts/Prices.jsx"
import Reviews from "./parts/Reviews.jsx"
import Footer from "./parts/Footer.jsx"

function MainPage() {
    return (
      <>
        <div className="main">
          <Navigation/>
          <MainInfo/>
          <Service/>
          <Prices/>
          <Reviews/>
          <Footer/>
        </div>
      </>
    );
  }
  
  export default MainPage;