import React from "react"
import Main from "./parts/Main.jsx";
import Navigation from "../header/Navigation.jsx"
import Footer from "../footer/Footer.jsx"
import OfferList from "./parts/Offers.jsx"


function UserPage() {
    return (
      <>
        <div className="mainUser">
            <Navigation/>
            <OfferList/>
            <Footer/>
        </div>
      </>
    );
  }
  
  export default UserPage;