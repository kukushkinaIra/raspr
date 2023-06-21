// import logo from './logo.svg';
import MainPage from "./components/mainPage/MainPage.jsx"
import LoginPage from './components/auth/login/LoginPage.tsx';
import RegistrPage from './components/auth/registration/RegistrPage.tsx';
import AdminPage from "./components/admin/AdminPage.jsx"
import UserPage from "./components/user/UserPage.jsx"
import {Route, Routes} from "react-router-dom"
import './App.css';

function App() {
  return (
    <>
      <div className="main">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegistrPage/>} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/user" element={<UserPage/>}/>
        </Routes>
        {/* <Navigation/>
        <MainInfo/>
        <Service/>
        <Prices/>
        <Reviews/> */}
        {/* <Footer/> */}
      </div>
    </>
  );
}

export default App;
