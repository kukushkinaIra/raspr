import React, {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useAuth} from "../../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";


function ModalGuaranteeLetter({showProp, setShowPropFalse}) {

    const [showState, setShowState] = useState(showProp);
    const {role, id, setRole, setId} = useAuth();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        note: ""
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
        <Modal show={showState} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Подтвердите заказ</Modal.Title>
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

export default ModalGuaranteeLetter