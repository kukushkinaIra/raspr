// // import React from "react"
// import React, { Fragment, useState } from "react"
// import {TextField} from "@mui/material"
// import {Button} from "@mui/material"
// import {Link} from "react-router-dom"
// import { Login } from "../../../actions/user"
// import Input from "../../utils/input/Input"
// import {useDispatch} from "react-redux";

// const LoginPage = () => {

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const dispatch = useDispatch()

//     return(
//         // <div>
//         //     <div className="root">
//         //         <div className="form">
//         //             <h2>Авторизация</h2>
//         //             <p>Введите ваш логин и пароль</p>
//         //             <TextField fullWidth={true} margin='normal' id="outlined-basic" label="Email" variant="outlined" placeholder="Введите ваш email"/>
//         //             <TextField type="password" fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Введите ваш пароль"/>
//         //             <Button style={{backgroundColor:'#FAC600'}} variant="contained">Войти</Button>
//         //             <p>У Вас нет аккауна? <Link className="registration" to="/register" style={{textDecoration:'none'}}>Регистрация</Link></p>
//         //         </div>
//         //     </div>
//         // </div>
        

//         <Fragment>
//             <div className="root">
//                 <div className="form">
//                     <h2>Авторизация</h2>
//                     <p>Введите данные для регистрации</p>
//                     <Input type="email" value={email} setValue={setEmail} label="Email" variant="outlined" placeholder="Введите ваш email"/>
//                     <Input type="password" value={password} setValue={setPassword} fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Введите ваш пароль"/>
//                     {/* <TextField type="password" fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Повторите ваш пароль"/> */}
//                     <Button style={{backgroundColor:'#FAC600'}} onClick={() => dispatch(Login(email, password))} variant="contained">Войти</Button>
//                     <p>У Вас нет аккауна? <Link className="registration" to="/register" style={{textDecoration:'none'}}>Регистрация</Link></p>
//                 </div>
//             </div>
//         </Fragment>

//     )

// }

// export default LoginPage


import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import { login } from "../../../actions/user"

const LoginPage = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div className='authorization'>
            <div className="authorization__header">Авторизация</div>
            <Input value={username} setValue={setUserName} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={() => dispatch(login(username, password))}>Войти</button>
        </div>
    );
};

export default LoginPage;