import React from "react"
import Main from "./parts/Main.jsx";
import Navigation from "./parts/Navigation.jsx"
import Footer from "./parts/Footer.jsx"
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