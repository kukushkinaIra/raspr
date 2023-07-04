import React, {Fragment, useEffect, useState} from 'react';
import {login} from "./actions/user"
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAuth} from "./AuthProvider";

const LoginPage = () => {
    const navigate = useNavigate()
    const {role, id, setRole, setId} = useAuth();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (role && id && ["ROLE_ADMIN", "ROLE_USER", "ROLE_MANAGER"].includes(role)) {
            navigate('/home');
        }
    }, [role, id])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const submitButton = (e) => {
        e.preventDefault();
        login(form.username, form.password, setRole, setId)
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
                <Form className="sign-form">
                    <h3>Авторизация</h3>
                    <Form.Group className="mb-3" controlId="form-login">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="username"
                            value={form.username}
                            type="text"
                            placeholder="Введите ваш E-mail"
                            autoFocus
                            required
                        />
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="password"
                            value={form.password}
                            type="password"
                            placeholder="Введите ваш пароль"
                            required
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