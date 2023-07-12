import React, {Fragment} from 'react';
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
            isQuestionnaireExpanded: true,
            importantInfo: (
                <div className="user-info-block important-info-block">
                    <h5>Важная информация</h5>
                    <ol>
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
            ),
            emailVerificationBlock: <Fragment/>,
            formData: {
                oldPassword: '',
                newPassword: '',
            },
            questionnaireData: {}
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

    // toggleQuestionnaire = () => {
    //     this.setState(prevState => ({
    //         isQuestionnaireExpanded: !prevState.isQuestionnaireExpanded
    //     }));
    // };


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
                        userInfo: data,
                        questionnaireData: JSON.parse(data.questionnaire)
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
                    if (data.status !== 'CONTRACT') {
                        this.setState({
                            importantInfo: ''
                        })
                    }
                    const {fields} = JSON.parse(data.questionnaire);
                    const hasEmptyField = fields.some(field => field.value === "");

                    if (hasEmptyField) {
                        toast.info("У вас имеются незаполненные поля в анкете", {position: toast.POSITION.BOTTOM_RIGHT})
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

    handleChangeQuestionnaire = e => {
        const {name, value} = e.target;
        const {questionnaireData} = this.state;
        const {fields} = questionnaireData;

        // Находим поле в анкете по имени
        const updatedFields = fields.map(field => {
            if (field.name === name) {
                // Обновляем значение поля
                return {...field, value};
            }
            return field;
        });

        // Обновляем состояние анкеты с новыми значениями полей
        this.setState(prevState => ({
            questionnaireData: {
                ...prevState.questionnaireData,
                fields: updatedFields
            }
        }));
    };

    renderQuestionnaire() {
        const {fields} = this.state.questionnaireData;

        return fields.map(field => {
            const {name, label, type, options, value} = field;

            // Генерируем поле формы в зависимости от типа поля
            switch (type) {
                case "select":
                    return (
                        <Form.Group key={name}>
                            <Form.Label>{label}</Form.Label>
                            <Form.Select name={name} value={value} onChange={this.handleChangeQuestionnaire}>
                                {options.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    );
                case "number":
                    return (
                        <Form.Group key={name}>
                            <Form.Label>{label}</Form.Label>
                            <Form.Control name={name} type="number" value={value}
                                          onChange={this.handleChangeQuestionnaire}/>
                        </Form.Group>
                    );
                case "text":
                    return (
                        <Form.Group key={name}>
                            <Form.Label>{label}</Form.Label>
                            <Form.Control name={name} type="text" value={value}
                                          onChange={this.handleChangeQuestionnaire}/>
                        </Form.Group>
                    );
                // Добавьте дополнительные условия для других типов полей, если необходимо

                default:
                    return null;
            }
        });
    }

    handleSubmitQuestion = e => {
        e.preventDefault();
        const {questionnaireData} = this.state;

        // Создаем объект с данными анкеты в нужном формате
        const requestBody = {
            questionnaire: JSON.stringify(questionnaireData)
        };

        console.log(JSON.stringify(requestBody))

        fetch(`/users/${this.props.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.ok) {
                    // Обработка успешного ответа от сервера
                    toast.success("Анкета успешно отправлена", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else {
                    // Обработка ошибки при отправке анкеты
                    toast.error("Ошибка при отправке анкеты", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    throw new Error(response.status);
                }
            })
            .catch(error => {
                // Обработка ошибки
                if (error.message === "401") {
                    const authCookie = document.cookie
                        .split(";")
                        .find(cookie => cookie.startsWith("auth="));
                    if (!authCookie) {
                        this.props.setId(null);
                        this.props.setRole(null);
                        this.props.navigate("/login");
                    }
                }
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    };


    render() {
        const {error, isLoaded, userInfo, validated, formData, emailVerificationBlock, importantInfo} = this.state;
        if (!userInfo) {
            return <div>Loading...</div>;
        }

        return (
            <Fragment>
                <div>
                    <div className="user-info-block">
                        <h5>Мои данные</h5>
                        <div>
                            <p><b>ФИО: </b>{userInfo.fullname}</p>
                            <div><b>Email: </b>{userInfo.email}</div>
                            {emailVerificationBlock}
                        </div>
                    </div>
                    <div className="question-container-profile">
                        <h5>Настройки</h5>
                        <Form className="input-form form-password-change" noValidate validated={validated}
                              onSubmit={this.handleSubmit}>
                            <div>Смена пароля</div>
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
                            <Button className="yellow-button password-change-button" type="submit">Сменить
                                пароль</Button>
                        </Form>
                    </div>
                    {importantInfo}
                    <div className="question-container-profile">
                        <h5>Анкета</h5>
                        {/*<p onClick={this.toggleQuestionnaire}>Ваша анкета</p>*/}
                        {this.state.isQuestionnaireExpanded && (
                            <Fragment>
                                <Form className="question-form" onSubmit={this.handleSubmitQuestion}>
                                    {this.renderQuestionnaire()}
                                    <Button className="yellow-button mt-3" type="submit">Сохранить</Button>
                                </Form>
                            </Fragment>)}
                    </div>
                </div>
            </Fragment>
        );
    }
}