// import logo from './logo.svg';
import MainPage from "./components/mainPage/MainPage.jsx"
import LoginPage from './components/auth/login/LoginPage.jsx';
import RegistrPage from './components/auth/registration/RegistrPage.jsx';
import AdminPage from "./components/admin/AdminPage.jsx"
import UserPage from "./components/user/UserPage.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import {useDispatch, useSelector} from "react-redux";

function App() {

  // const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(auth())
  // }, [])
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegistrPage/>} />
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/user" element={<UserPage/>}/>
          </Routes>
        </BrowserRouter>
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
