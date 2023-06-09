import React, { Fragment } from "react"
import {TextField} from "@mui/material"
import {Button} from "@mui/material"
import {Link} from "react-router-dom"

const RegistrPage = () => {
    return(
        <Fragment>
            <div className="root">
                <div className="form">
                    <h1>Регистрация</h1>
                    <p>Введите данные для регистрации</p>
                    <TextField fullWidth={true} margin='normal' id="outlined-basic" label="Name" variant="outlined" placeholder="Введите ваше Имя"/>
                    <TextField fullWidth={true} margin='normal' id="outlined-basic" label="Surname" variant="outlined" placeholder="Введите вашу Фамилию"/>
                    <TextField fullWidth={true} margin='normal' id="outlined-basic" label="Email" variant="outlined" placeholder="Введите ваш email"/>
                    <TextField type="password" fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Введите ваш пароль"/>
                    <TextField type="password" fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Повторите ваш пароль"/>
                    <Button style={{backgroundColor:'#FAC600'}} variant="contained">Зарегистрироваться</Button>
                    <p>Уже есть аккаунт? <Link to="/login" style={{textDecoration:'none'}}>Войти</Link></p>
                </div>
            </div>
        </Fragment>

    )

}

export default RegistrPage