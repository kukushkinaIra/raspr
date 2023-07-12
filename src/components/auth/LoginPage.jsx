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
    const [loginError, setLoginError] = useState('Неверный E-mail или пароль!');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (role && id && ["ROLE_ADMIN", "ROLE_USER", "ROLE_MANAGER"].includes(role)) {
            navigate('/home');
        }
    }, [role, id])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = form;

        if (username.trim() === '' || password.trim() === '') {
            setLoginError('Пожалуйста, введите E-mail и пароль.');
            setValidated(true);
            return;
        }

        login(username, password, setRole, setId);
        resetForm();
    };

    const resetForm = () => {
        setForm({
            username: '',
            password: '',
        });
        setValidated(false);
        setLoginError('');
    };

    const resetButton = () => {
        setForm({
            username: '',
            password: '',
        })
    }

    return (
        <Fragment>
            <div className="root">
                <Form className="sign-form" noValidate validated={validated} onSubmit={handleSubmit}>
                    <h3>Авторизация</h3>
                    <Form.Group className="mb-3" controlId="login-username">
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
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="login-password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="password"
                            value={form.password}
                            type="password"
                            placeholder="Введите ваш пароль"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {loginError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="sign-yellow-button"
                            type="submit">Войти
                    </Button>
                    <p>Нет аккауна? <Link className="registration" to="/registration"
                                          style={{textDecoration: 'none'}}>Зарегистрироваться</Link></p>
                </Form>
            </div>
        </Fragment>
    );
}
export default LoginPage;