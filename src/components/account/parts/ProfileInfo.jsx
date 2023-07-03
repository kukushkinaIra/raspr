import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";


export default class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            userInfo: null,
            validated: false,
            formData: {
                oldPassword: '',
                newPassword: '',
            }
        };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    handleSubmit() {
        //TODO : change password
    }

    parseUserStatus(status) {
        switch (status) {
            case "PRACTICE": {
                return "На практике";
            }
            case "GUARANTEE": {
                return "Оформил гарантийное письмо";
            }
            case "CONTRACT": {
                return "Подписан контракт";
            }
            case "DEFAULT": {
                return "Простой пользователь";
            }
            default: {
                return "Простой пользователь";
            }
        }
    }

    componentDidMount() {
        const userId = this.props.id;
        fetch(`/users/${userId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .catch((error) => {
                if (error.message === "401") {
                    const authCookie = document.cookie
                        .split(";")
                        .find((cookie) => cookie.startsWith("auth="));
                    if (!authCookie) {
                        this.props.setId(null);
                        this.props.setRole(null);
                        this.props.navigate('/login');
                    }
                }
                this.setState({
                    isLoaded: true,
                    error,
                });
                return Promise.reject();
            })
            .then(
                data => {
                    this.setState({
                        isLoaded: false,
                        userInfo: data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, userInfo, validated, formData} = this.state;
        console.log(userInfo)
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }
        if (!userInfo) {
            return <div>Loading...</div>;
        }

        return (
            <div className="user-info-block">
                <p><b>ФИО: </b>{userInfo.fullname}</p>
                <p><b>Статус: </b>{this.parseUserStatus(userInfo.status)}</p>
                <p><b>Email: </b>{userInfo.email}</p>
                <Form className="input-form" noValidate validated={validated} onSubmit={this.handleSubmit()}>
                    <Form.Group className="mb-3" controlId="oldPassword">
                        <Form.Label>Введите старый пароль:</Form.Label>
                        <Form.Control
                            type="text"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={this.handleChange}
                            placeholder="Иванову Татьяну Викторовну"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>Введите новый пароль:</Form.Label>
                        <Form.Control
                            type="text"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={this.handleChange}
                            placeholder="Иванову Татьяну Викторовну"
                            autoFocus
                        />
                    </Form.Group>
                    <Button className="yellow-button">Сменить пароль</Button>
                </Form>
            </div>
        );
    }
}