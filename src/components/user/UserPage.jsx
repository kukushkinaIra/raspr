import React from "react"
import Navigation from "../header/Navigation.jsx"
import Footer from "../footer/Footer.jsx"
import Main from "./parts/Main.jsx"


function UserPage() {
    return (
      <>
        <div className="mainUser">
            <Navigation/>
            <Main/>
            <Footer/>
        </div>
      </>
    );
  }
  
  export default UserPage;