import React, {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useAuth} from "../../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalGuaranteeLetter({showProp, setShowPropFalse, offerId}) {

    const [showState, setShowState] = useState(showProp);
    const {role, id, setRole, setId} = useAuth();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [documentTemplate, setDocumentTemplate] = useState("");
    const [formData, setFormData] = useState({
        fullname: "",
        speciality: "",
        recipient: "",
        recipientPosition: "",
        institution: "",
        documentTemplate: null,
    });

    useEffect(() => {
        setShowState(showProp);
    }, [showProp]);

    const handleChange = (event) => {
        const {name, value, files} = event.target;
        if (files) {
            const selectedFile = files[0];
            const allowedTypes = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            if (allowedTypes.includes(selectedFile.type)) {
                setDocumentTemplate(selectedFile);
            } else {
                toast.error("Выберите файл в формате .docx или .doc", { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const requestBody = new FormData();
            let order = {
                shortInfo: formData,
                user : {
                    id: id
                },
                offer : {
                    id: offerId
                }
            }

            requestBody.append("order", new Blob([JSON.stringify(order)], { type: "application/json" }));
            requestBody.append("documentTemplate", documentTemplate);

            fetch("/orders/short", {
                method: "POST",
                body: requestBody,
                credentials: "include"
            })
                .then((response) => {
                    if (response.ok) {
                        toast.success("Заказ был создан успешно", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    } else {
                        toast.error("Заказ не был создан", {position: toast.POSITION.BOTTOM_RIGHT});
                        throw new Error(response.status);
                    }
                })
                .catch((error) => {
                    if (error.message === "401") {
                        const authCookie = document.cookie
                            .split(";")
                            .find((cookie) => cookie.startsWith("auth="));
                        if (!authCookie) {
                            setId(null);
                            setRole(null);
                            navigate('/login');
                        }
                    }
                });
            setShowState(false)
            setShowPropFalse();
        }
        setValidated(true)
    };

    const handleClose = () => {
        setShowState(false);
        setShowPropFalse();
    };


    return (
        <Modal show={showState} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Заполните свои данные</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="input-form" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="fullname">
                        <Form.Label>ФИО (вин. падеж)</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Иванову Татьяну Викторовну"
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">
                            Поле обязательно для заполнения
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="speciality">
                        <Form.Label>Специальность</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            placeholder="Инженер-программист"
                        />
                        <Form.Control.Feedback type="invalid">
                            Поле обязательно для заполнения
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipient">
                        <Form.Label>Кому адресовано письмо (род.падеж)</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="recipient"
                            value={formData.recipient}
                            onChange={handleChange}
                            placeholder="Петрову Олегу Ивановичу"
                        />
                        <Form.Control.Feedback type="invalid">
                            Поле обязательно для заполнения
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipientPosition">
                        <Form.Label>Должность адресата (род. падеж)</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="recipientPosition"
                            value={formData.recipientPosition}
                            onChange={handleChange}
                            placeholder="Ректору Белорусского Государственного университета"
                        />
                        <Form.Control.Feedback type="invalid">
                            Поле обязательно для заполнения
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="institution">
                        <Form.Label>Наименование учреждения образования</Form.Label>
                        <Form.Select aria-label="Default select example"
                                     required
                                     name="institution"
                                     value={formData.institution}
                                     onChange={handleChange}
                        >
                            <option value="" disabled selected hidden>Выберите свой университет</option>
                            <option value="БГУ">БГУ</option>
                            <option value="БГУИР">БГУИР</option>
                            <option value="БНТУ">БНТУ</option>
                            <option value="БГЭУ">БГЭУ</option>
                            <option value="МГЛУ">МГЛУ</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Поле обязательно для заполнения
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="documentTemplate">
                        <Form.Label>Шаблон документа в формате .doc или .docx</Form.Label>
                        <Form.Control
                            required
                            type="file"
                            name="documentTemplate"
                            className="form-control-file"
                            value={formData.documentTemplate}
                            onChange={handleChange}
                            accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword"
                        />
                        <Form.Control.Feedback type="invalid">
                            Загрузите шаблон документа вашего университета в формате .docx или .doc
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        className="yellow-button"
                        type="submit">
                        Подтвердить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
        ;
}

export default ModalGuaranteeLetter