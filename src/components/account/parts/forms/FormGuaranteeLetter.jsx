import React, {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function FormGuaranteeLetter({showProp, setShowPropFalse}) {

    const [showState, setShowState] = useState(showProp);


    const [formData, setFormData] = useState({
        name: "",
        speciality: "",
        recipient: "",
        recipientPosition: "",
        university: "",
        document: null,
    });

    useEffect(() => {
        setShowState(showProp);
    }, [showProp]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        setShowState(false)
        setShowPropFalse();
    };

    const handleClose = () => {
        setShowState(false);
        setShowPropFalse();
    };


    return (
        <Modal show={showState} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>"Введи"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>ФИО (вин. падеж)</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Иванову Татьяну Викторовну"
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="speciality">
                        <Form.Label>Специальность</Form.Label>
                        <Form.Control
                            type="text"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            placeholder="Инженер-программист"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipient">
                        <Form.Label>Кому адресовано письмо (род.падеж)</Form.Label>
                        <Form.Control
                            type="text"
                            name="recipient"
                            value={formData.recipient}
                            onChange={handleChange}
                            placeholder="Петрову Олегу Ивановичу"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recipient_position">
                        <Form.Label>Должность адресата (род. падеж)</Form.Label>
                        <Form.Control
                            type="text"
                            name="recipient_position"
                            value={formData.recipient_position}
                            onChange={handleChange}
                            placeholder="Ректору Белорусского Государственного университета"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="university">
                        <Form.Label>Наименование учреждения образования</Form.Label>
                        <Form.Select aria-label="Default select example"
                                     name="university"
                                     value={formData.university}
                                     onChange={handleChange}
                        >
                            <option value="" disabled selected hidden>Выберите свой университет</option>
                            <option value="БГУ">БГУ</option>
                            <option value="БГУИР">БГУИР</option>
                            <option value="БНТУ">БНТУ</option>
                            <option value="БГЭУ">БГЭУ</option>
                            <option value="МГЛУ">МГЛУ</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="document">
                        <Form.Label>Шаблон документа</Form.Label>
                        <Form.Control
                            type="file"
                            name="document"
                            className="form-control-file"
                            value={formData.document}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={handleSubmit}>
                    Подтвердить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormGuaranteeLetter