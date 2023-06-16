import React from "react"
import Main from "./parts/Main.jsx";
import Navigation from "./parts/Navigation.jsx"
import Footer from "./parts/Footer.jsx"


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