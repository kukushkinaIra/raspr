import React, {Fragment} from "react"
import Main from "../account/parts/Main.jsx";
import Navigation from "../header/Navigation.jsx"
import Footer from "../footer/Footer.jsx"


function AccountPage() {
    return (
        <div className="mainUser">
            <Navigation/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default AccountPage;