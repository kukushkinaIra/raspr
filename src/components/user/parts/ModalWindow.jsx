import { Tabs, Tab, Col, Nav, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FormGarantLetter from "./formGarantLetter.jsx"

function ModalWindow(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Оформление услуги</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <FormGarantLetter/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        {/* <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button> */}
                                        <Button variant="primary" onClick={handleClose}>
                                            Подтвердить (перейти к оплате)
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
    )
}

export default ModalWindow