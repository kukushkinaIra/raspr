import React, { Fragment } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import {AiOutlinePlus} from "react-icons/ai";

export default class QuestionnaireEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            questionnaireData: {},
            showModal: false, // Добавляем состояние для отображения модального окна
            newFieldData: {
                name: "",
                label: "",
                type: "",
                options: []
            },

        };
    }

    componentDidMount() {
        // Выполняем запрос к серверу для получения данных анкеты
        fetch("/questionnaire/template")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        questionnaireData: JSON.parse(result.structure)
                    });
                    console.log(JSON.parse(result.structure))
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    handleShowModal = () => {
        this.setState({
            showModal: true
        });
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false
        });
    };

    handleChange = e => {
        const { name, value } = e.target;
        console.log("name: " + name)
        console.log("value: " + value)
        this.setState(prevState => ({
            newFieldData: {
                ...prevState.newFieldData,
                [name]: value // Преобразование опций в массив
            }
        }));
    };


    handleSubmit = e => {
        e.preventDefault();
        const { newFieldData, questionnaireData } = this.state;
        const { fields } = questionnaireData;

        // Создаем новое поле
        const newField = {
            name: newFieldData.name,
            label: newFieldData.label,
            type: newFieldData.type,
            options: newFieldData.type === "select" ? newFieldData.options.split(",") : []
        };

        const updatedFields = [...fields, newField];
        const updatedStructure = JSON.stringify({ fields: updatedFields });

        console.log(JSON.stringify({ structure: updatedStructure }))
        // Отправляем данные на сервер
        fetch("/questionnaire/template", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ structure: updatedStructure })
        })
            .then(response => {
                this.setState({
                    questionnaireData: {
                        ...questionnaireData,
                        fields: updatedFields
                    },
                    showModal: false,
                    newFieldData: {
                        name: "",
                        label: "",
                        type: "",
                        options: "",
                        value: ""
                    }
                });
            })
            .catch(error => {
                this.setState({
                    showModal: false,
                    newFieldData: {
                        name: "",
                        label: "",
                        type: "",
                        options: "",
                        value: ""
                    }
                });
            });
    };



    renderFormFields() {
        const { fields } = this.state.questionnaireData;

        return fields.map(field => {
            const { name, label, type, options, value } = field;

            // Генерируем поле формы в зависимости от типа поля
            switch (type) {
                case "select":
                    return (
                        <Form.Group key={name}>
                            <Form.Label>{label}</Form.Label>
                            <Form.Select>
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
                            <Form.Control type="number"/>
                        </Form.Group>
                    );
                case "text":
                    return (
                        <Form.Group key={name}>
                            <Form.Label>{label}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    );
                // Добавьте дополнительные условия для других типов полей, если необходимо

                default:
                    return null;
            }
        });
    }

    render() {
        const { error, isLoaded, showModal, newFieldData } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="question-container">
                    <Button variant="primary" className="yellow-button mb-3" onClick={this.handleShowModal}>
                        Добавить вопрос
                    </Button>

                    <Form>{this.renderFormFields()}</Form>

                    <Modal show={showModal} onHide={this.handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавить вопрос</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Название (на английском языке без пробелов)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={newFieldData.name}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Метка (отображаемая клиенту)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="label"
                                        value={newFieldData.label}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Тип</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="type"
                                        value={newFieldData.type}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Выберите тип</option>
                                        <option value="text">Текст</option>
                                        <option value="select">Выбор</option>
                                        <option value="number">Число</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Опции (разделены запятой)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="options"
                                        value={newFieldData.options}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="yellow-button mt-3">
                                    Добавить
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
}
