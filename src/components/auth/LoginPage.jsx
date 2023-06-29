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


import React, {Fragment, useEffect, useState} from 'react';
import {login} from "./actions/user"
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAuth} from "./AuthProvider";

const LoginPage = () => {
    const navigate = useNavigate()
    const { role, setRole } = useAuth();
    const [id, setId] = useState(undefined);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });


    useEffect(() => {
        if (role && id) {
            localStorage.setItem('id', id);
            setRole(role);
            navigate('/home');
        }
    }, [role, id])

    const roleCallback = (role, id) => {
        setRole(role)
        setId(id)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const submitButton = (e) => {
        e.preventDefault();
        login(form.username, form.password, roleCallback)
        resetButton();
    }

    const resetButton = () => {
        setForm({
            username: '',
            password: '',
        })
    }

    return (
        <Fragment>
            <div className="root">
                <Form className="form">
                    <h3>Авторизация</h3>
                    <Form.Group className="mb-3" controlId="recepient">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="username"
                            value={form.username}
                            type="text"
                            placeholder="Введите ваш E-mail"
                        />
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="password"
                            value={form.password}
                            type="password"
                            placeholder="Введите ваш пароль"
                        />
                    </Form.Group>
                    <Button className="table-yellow-button"
                            onClick={submitButton}>Войти
                    </Button>
                    <p>Нет аккауна? <Link className="registration" to="/registration"
                                          style={{textDecoration: 'none'}}>Зарегестрироваться</Link></p>
                </Form>
            </div>
        </Fragment>
    );
}
export default LoginPage;