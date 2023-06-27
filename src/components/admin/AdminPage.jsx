import React from "react"
import Main from "./parts/Main.jsx";
import Navigation from "../header/Navigation.jsx"
import Footer from "../footer/Footer.jsx"


function AdminPage() {
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
  
  export default AdminPage;