import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import * as PropTypes from "prop-types";


function Redirect(props) {
    return null;
}

Redirect.propTypes = {to: PropTypes.string};
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

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            editForm: {
                ...this.state.editForm,
                [name]: value
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const requestBody = this.state.formData;
            fetch(`/users/${this.props.id}/changePassword`, {
                method: 'PATCH',
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((response) => {
                    if (response.ok) {
                        this.setState({
                            formData: {
                                oldPassword: '',
                                newPassword: ''
                            },
                            validated: false
                        })
                        toast.success("Пароль изменен успешно", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    } else if (response.status === 404) {
                        this.setState({
                            formData: {
                                oldPassword: '',
                                newPassword: ''
                            }
                        })
                        toast.error("Неверный старый пароль", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                        throw new Error(response.status);
                    } else {
                        toast.error("Ошибка при смене пароля", {position: toast.POSITION.BOTTOM_RIGHT});
                        throw new Error(response.status);
                    }
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
                })
        } else {
            this.setState({
                validated: true
            })
        }
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
                return res.json()
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
        if (!userInfo) {
            return <div>Loading...</div>;
        }

        return (

            <div className="user-info-block">
                <div>
                    <p><b>ФИО: </b>{userInfo.fullname}</p>
                    <p><b>Статус: </b>{this.parseUserStatus(userInfo.status)}</p>
                    <p><b>Email: </b>{userInfo.email}</p>
                </div>
                <Form className="input-form form-password-change" noValidate validated={validated}
                      onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="oldPassword">
                        <Form.Label>Введите старый пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={this.handleChange}
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>Введите новый пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={this.handleChange}
                            required
                            aria-describedby="passwordHelpBlock"
                        />
                    </Form.Group>
                    <Button className="yellow-button" type="submit">Сменить пароль</Button>
                </Form>
            </div>
        );
    }
}