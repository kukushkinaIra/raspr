import React, {Fragment, useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {login, registration} from "./actions/user"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAuth} from "./AuthProvider";

const RegistrationPage = () => {
    const navigate = useNavigate()
    const {role, id, setRole, setId} = useAuth();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [registrationError, setRegistrationError] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (role && id && ["ROLE_ADMIN", "ROLE_USER", "ROLE_MANAGER"].includes(role)) {
            navigate('/home');
        }
    }, [role, id])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = form;

        if (username.trim() === '' || password.trim() === '') {
            // setRegistrationError('Пожалуйста, введите E-mail и пароль.');
            setValidated(true);
            return;
        }

        if (!validateEmail(username)) {
            // setRegistrationError('Введите действительный E-mail, который еще не зарегистрирован в нашей системе.');
            setValidated(true);
            return;
        }

        if (!validatePasswordComplexity(password)) {
            // setRegistrationError('Пароль должен содержать как минимум 8 символов, включая заглавные буквы, строчные буквы и цифры.');
            setValidated(true);
            return;
        }

        registration(username, password, setRole, setId, setRegistrationError);


        resetForm();
    }

    const resetForm = () => {
        setForm({
            username: '',
            password: '',
        });
        setValidated(false);
        setRegistrationError('');
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePasswordComplexity = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <Fragment>
            <div className="root">
                <Form className="sign-form" noValidate validated={validated} onSubmit={handleSubmit}>
                    <h3>Регистрация</h3>
                    <Form.Group className="mb-3" controlId="registration-username">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="username"
                            value={form.username}
                            type="text"
                            placeholder="Введите ваш E-mail"
                            required
                            autoFocus
                            isInvalid={validated && !validateEmail(form.username)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите действительный E-mail, который еще не зарегистрирован в нашей системе
                            {registrationError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registration-password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            value={form.password}
                            name="password"
                            type="password"
                            placeholder="Введите ваш пароль"
                            required
                            isInvalid={validated && !validatePasswordComplexity(form.password)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Пароль должен содержать как минимум 8 символов, включая заглавные,строчные буквы и цифры
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="sign-yellow-button"
                            type="submit">
                        Зарегистрироваться
                    </Button>
                    <p>Уже есть аккаунт? <Link className="registration" to="/login"
                                               style={{textDecoration: 'none'}}>Войти</Link></p>
                </Form>
            </div>
        </Fragment>

    )

}

export default RegistrationPage