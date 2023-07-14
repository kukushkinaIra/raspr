import React, {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useAuth} from "../../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


function ModalGuaranteeLetter({showProp, setShowPropFalse, offerId}) {

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

    const handleClose = () => {
        setShowState(false);
        setShowPropFalse();
    };

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            let order = {
                formData,
                user: {
                    id: id
                },
                offer: {
                    id: offerId
                }
            }

            fetch("/orders/short", {
                method: "POST",
                body: JSON.stringify(order),
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
        // setValidated(true)
    };


    return (
        <Modal show={showState} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Подтвердите заказ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="note">
                        <Form.Label>Примечание</Form.Label>
                        <Form.Control
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Примечание"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="yellow-button"
                    type="submit">
                    Подтвердить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalGuaranteeLetter