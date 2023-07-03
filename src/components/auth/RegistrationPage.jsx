import React, {Fragment, useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {registration} from "./actions/user"
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
        registration(form.username, form.password, setRole, setId)
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
                    <h3>Регистрация</h3>
                    <Form.Group className="mb-3" controlId="form-registration">
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
                            value={form.password}
                            name="password"
                            type="password"
                            placeholder="Введите ваш пароль"
                        />
                    </Form.Group>
                    <Button className="table-yellow-button"
                            onClick={submitButton}>Зарегистрироваться
                    </Button>
                    <p>Уже есть аккаунт? <Link className="registration" to="/login"
                                               style={{textDecoration: 'none'}}>Войти</Link></p>
                </Form>
            </div>
        </Fragment>

    )

}

export default RegistrationPage