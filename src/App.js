import React, {useEffect} from "react"
import MainPage from "./components/mainPage/MainPage.jsx"
import LoginPage from './components/auth/LoginPage.jsx';
import RegistrationPage from './components/auth/RegistrationPage.jsx';
import AccountPage from "./components/account/AccountPage.jsx"
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import './App.css';
import {AuthProvider, useAuth} from "./components/auth/AuthProvider";
import ConfirmationPage from "./components/confirmation/ConfirmationPage";
import {ToastContainer} from "react-toastify";

function PageContainer() {
    const navigate = useNavigate()
    const {role, setRole, setId} = useAuth();
    const valid = role && ["ROLE_ADMIN", "ROLE_USER", "ROLE_MANAGER"].includes(role)
    useEffect(() => {
        if (!valid)
            navigate('/login', {replace: true})
    })

    if (!valid) {
        navigate('/login', {replace: true})
        return <></>
    }

    return <AccountPage/>
}


function App() {
    return (
        <AuthProvider>
            <>
                <ToastContainer />
                <div className="main">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/registration" element={<RegistrationPage/>}/>
                            <Route path="/home" element={<PageContainer/>}/>
                            <Route path="/confirm" element={<ConfirmationPage/>}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </>
        </AuthProvider>
    );
}

export default App;
