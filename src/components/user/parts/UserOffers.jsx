import React from 'react';
import {Tab, Col, Nav, Row} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react';
import FormGarantLetter from "./formGarantLetter.jsx"
import ModalWindow from "./ModalWindow";
import Table from 'react-bootstrap/Table';

// import axios from 'axios';

export default class UserOffers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            offers: [],
            show: false,
            setShow: false
        };
    }


    componentDidMount() {
        fetch("http://213.109.204.76:8080/offers")
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        offers: data,
                        isLoaded: false,
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
        const {error, isLoaded, offers, show} = this.state;
        const handleClose = () => this.setState({show : false});
        const handleShow = () => this.setState({show : true});
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <div className="services" onClick={handleShow}>
                        {offers.map(item => (
                            <div className="service" key={item.id}>
                                <h4>{item.title}</h4>
                                <hr/>
                                <p>от {item.price} руб в месяц</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Заполните данные</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormGarantLetter/>
                            </Modal.Body>
                            <Modal.Footer>
                                {/* <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button> */}
                                <Button variant="primary" onClick={handleClose}>
                                    Подтвердить
                                </Button>
                            </Modal.Footer>
                        </Modal></div>
                </div>
            );
        }
    }
}