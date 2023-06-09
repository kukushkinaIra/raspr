// import logo from './logo.svg';
import './App.css';
import MainPage from "./components/mainPage/MainPage.jsx"
import LoginPage from './components/auth/login/LoginPage.tsx';
import RegistrPage from './components/auth/registration/RegistrPage.tsx';
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <>
      <div className="main">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegistrPage/>} />
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
