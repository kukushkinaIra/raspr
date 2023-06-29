import React, {Fragment, useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {login, registration} from "./actions/user"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAuth} from "./AuthProvider";

const RegistrationPage = () => {
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
        registration(form.username, form.password, roleCallback)
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
                    <h3>Регистрация</h3>
                    <Form.Group className="mb-3" controlId="recepient">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            value={form.username}
                            type="text"
                            placeholder="Введите ваш E-mail"
                            required={true}
                        />
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            value={form.password}
                            type="password"
                            placeholder="Введите ваш пароль"
                            required={true}
                        />
                    </Form.Group>
                    <Button className="table-yellow-button"
                            onClick={submitButton}>Войти
                    </Button>
                    <p>Уже есть аккаунт? <Link className="registration" to="/login"
                                               style={{textDecoration: 'none'}}>Войти</Link></p>
                </Form>
            </div>
        </Fragment>

    )

}

export default RegistrationPage