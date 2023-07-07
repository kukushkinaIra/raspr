import React, {Fragment} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import * as PropTypes from "prop-types";
import {AiOutlineCheck} from "react-icons/ai";


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
            importantInfo: '',
            emailVerificationBlock: <Fragment/>,
            formData: {
                oldPassword: '',
                newPassword: '',
            }
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            formData: {
                ...this.state.formData,
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
                return "Подтвержденный пользователь";
            }
            case "UNVERIFIED": {
                return "Неподтвержденный пользователь";
            }
            default: {
                return "Простой пользователь";
            }
        }
    }

    handleRefreshEmail = (event) => {
        event.preventDefault();
        event.stopPropagation();

        fetch(`/auth/refresh-confirmation/${this.props.id}`)
            .then((response) => {
                if (response.ok) {
                    toast.success("Письмо отправлено на почту", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else {
                    toast.error("Ошибка при отправке письма", {position: toast.POSITION.BOTTOM_RIGHT});
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
                    if (data.status === 'UNVERIFIED') {
                        this.setState({
                            emailVerificationBlock: (
                                <Fragment>
                                    <p className="email-verification-text">Для разблокировки аккаунта подтвердите
                                        свою почту. Письмо для подтверждения отправлено на ваш Email.</p>
                                    <button className="email-send-button yellow-button"
                                            onClick={this.handleRefreshEmail}>Отправить повторно
                                    </button>
                                </Fragment>
                            )
                        })
                    }
                    if (data.status === 'CONTRACT') {
                        this.setState({
                            importantInfo: (
                                <div className="user-info-block important-info-block">
                                    <ol>
                                        <b>Важная информация:</b>
                                        <li>
                                            <u>При нетрудоспособности</u> необходимо в тот же день брать больничный
                                            лист, а
                                            также:
                                            <ul>
                                                <li>
                                                    Сделать фото больничного листа
                                                </li>
                                                <li>
                                                    Выслать нам
                                                </li>
                                                <li>
                                                    Передать оригинал больничного листа для расчета вычета из затратной
                                                    части
                                                </li>
                                                <li>
                                                    Получить 2 руб за каждый день больничного
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            Обязательно следует уведомить нас <u>о призыве в армию</u>:
                                            <ul>
                                                <li>
                                                    В связи с призывом оформляется увольнение
                                                </li>
                                                <li>
                                                    Мы возвращаем вам аванс
                                                </li>
                                                <li>
                                                    Служба в армии идет в срок отработки
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            В случае <u>беременности</u>:
                                            <ul>
                                                <li>
                                                    Следует обязательно уведомить нас о беременности <b>до</b> получения
                                                    больничного листа у своего врача
                                                </li>
                                                <li>
                                                    Беременность не освобождает от закрытия затратной части
                                                </li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>
                            )
                        })
                    }
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
        const {error, isLoaded, userInfo, validated, formData, emailVerificationBlock, importantInfo} = this.state;
        if (!userInfo) {
            return <div>Loading...</div>;
        }

        return (
            <Fragment>
                <div className="user-info-block">
                    <div>
                        <p><b>ФИО: </b>{userInfo.fullname}</p>
                        {/*<p><b>Статус: </b>{this.parseUserStatus(userInfo.status)}</p>*/}
                        <div><b>Email: </b>{userInfo.email}</div>
                        {emailVerificationBlock}
                    </div>
                    <Form className="input-form form-password-change" noValidate validated={validated}
                          onSubmit={this.handleSubmit}>
                        <div className="password-change-title">Смена пароля</div>
                        <Form.Group className="mb-3" controlId="oldPassword">
                            <Form.Label>Введите старый пароль</Form.Label>
                            <Form.Control
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={this.handleChange}
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
                            />
                        </Form.Group>
                        <Button className="yellow-button password-change-button" type="submit">Сменить пароль</Button>
                    </Form>
                </div>
                {importantInfo}
            </Fragment>
        );
    }
}