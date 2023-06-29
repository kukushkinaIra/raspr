import React from "react"
import MainPage from "./components/mainPage/MainPage.jsx"
import LoginPage from './components/auth/login/LoginPage.jsx';
import RegistrPage from './components/auth/registration/RegistrPage.jsx';
import AdminPage from "./components/admin/AdminPage.jsx"
import UserPage from "./components/user/UserPage.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';

import {useNavigate} from 'react-router-dom';

function PageContainer() {
    const navigate = useNavigate()

    const role = localStorage.getItem("role");
    const valid = ["admin", "user"].includes(role)
    React.useEffect(() => {
        if (!valid)
            navigate('/login', {replace: true})
    })

    if (!valid)
        return <b>Сюда нельзя</b>

    if (role === "admin")
        return <AdminPage/>
    else
        return <UserPage/>
}

function App() {
    return (
        <>
            <div className="main">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/registration" element={<RegistrPage/>}/>
                        <Route path="/home" element={<PageContainer/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
