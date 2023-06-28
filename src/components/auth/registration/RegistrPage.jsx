import React, { Fragment, useState } from "react"
// import {TextField} from "@mui/material"
import {Button} from "@mui/material"
import {Link} from "react-router-dom"
import { Registration } from "../../../actions/user"
import Input from "../../utils/input/Input";

const RegistrPage = () => {
    const [username, setName] = useState("")
    const [surName, setSurName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return(
        <Fragment>
            <div className="root">
                <div className="form">
                    <h2>Регистрация</h2>
                    <p>Введите данные для регистрации</p>
                    <Input required type="email" value={username} setValue={setName} label="Name" variant="outlined" placeholder="Введите ваш email"/>
                    {/*<Input type="text" value={surName} setValue={setSurName} label="Surname" variant="outlined" placeholder="Введите вашу Фамилию"/>*/}
                    {/*<Input type="email" value={email} setValue={setEmail} label="Email" variant="outlined" placeholder="Введите ваш email"/>*/}
                    <Input type="password" value={password} setValue={setPassword} fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Введите ваш пароль"/>
                    {/* <TextField type="password" fullWidth={true} margin='normal' id="outlined-basic" label="Password" variant="outlined" placeholder="Повторите ваш пароль"/> */}
                    <Button style={{backgroundColor:'#FAC600'}} onClick={()=>Registration(username, password)} variant="contained">Зарегистрироваться</Button>
                    <p>Уже есть аккаунт? <Link to="/login" style={{textDecoration:'none'}}>Войти</Link></p>
                </div>
            </div>
        </Fragment>

    )

}

export default RegistrPage