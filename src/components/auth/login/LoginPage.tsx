import React from "react"
import {TextField} from "@mui/material"
import {Button} from "@mui/material"
import {Link} from "react-router-dom"

const LoginPage = () => {
    return(
        <div>
            <div className="root">
                <div className="form">
                    <h1>Авторизация</h1>
                    <p>Введите ваш логин и пароль</p>
                    <TextField fullWidth={true} margin='normal' id="outlined-basic" label="Email" variant="outlined" placeholder="Введите ваш email"/>
                    <TextField type="password" fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Введите ваш пароль"/>
                    <Button style={{backgroundColor:'#FAC600'}} variant="contained">Войти</Button>
                    <p>У Вас нет аккауна? <Link className="registration" to="/register" style={{textDecoration:'none'}}>Регистрация</Link></p>
                </div>
            </div>
        </div>

    )

}

export default LoginPage