// import { Tab } from "@mui/base"
// import Tab, { Container } from "react-bootstrap/lib/Tab"
import { Tabs, Tab, Col, Nav, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FormGarantLetter from "./formGarantLetter.jsx"
import Table from 'react-bootstrap/Table';


function Main(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <Container className="user_container">
            <Tab.Container id="ledt-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3} >
                        <Nav variant="pills" className="flex-column mt-2 nav">
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link className="tab_link_custom" eventKey="first">
                                    Профиль
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link eventKey="second">
                                    Заказ услуг
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link eventKey="third">
                                    Мои заказы
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <p>Алексей Гуревич</p>
                                <a>Ссылка на форму</a>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h3 className="choose">Выберите услугу для заказа</h3>
                                <div className="services">
                                    <div className="service" onClick={handleShow}>
                                        <h4>Гарантийное письмо</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
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
                                    <div className="service" onClick={handleShow}>
                                        <h4>Распределение</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Оформление услуги</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <FormGarantLetter/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="primary" onClick={handleClose}>
                                            Подтвердить (перейти к оплате)
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className="service" onClick={handleShow}>
                                        <h4>Перераспределение</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Оформление услуги</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <FormGarantLetter/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="primary" onClick={handleClose}>
                                            Подтвердить (перейти к оплате)
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className="service" onClick={handleShow}>
                                        <h4>Заказать справку</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Оформление услуги</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <FormGarantLetter/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="primary" onClick={handleClose}>
                                            Подтвердить (перейти к оплате)
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className="service">
                                        <h4>Заказать характеристику</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                    <div className="service">
                                        <h4>Заказать справку</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                    <div className="service">
                                        <h4>Заказать справку</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                    <div className="service">
                                        <h4>Заказать справку</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                    <div className="service">
                                        <h4>Заказать справку</h4>
                                        <hr  style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            height: .5,
                                            borderColor : 'black'
                                        }}/>

                                        <p>от 127 руб в месяц</p>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h3>Информация о заказах</h3>
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                        {/* <th>#</th> */}
                                        <th >Наименование услуги</th>
                                        <th >Статус заказа</th>
                                        <th >Статус оплаты</th>
                                        <th >Примечания</th>
                                        <th >Дата заказа</th>
                                        {/* {Array.from({ length: 12 }).map((_, index) => (
                                            <th key={index}>Наименование услуги</th>
                                        ))} */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Гарантийное письмо</td>
                                            <td>В обработке</td>
                                            <td>Недоступно</td>
                                            <td>Менеджер проверяет ваш заказ</td>
                                            <td>03.09.2023</td>
                                            {/* {Array.from({ length: 12 }).map((_, index) => (
                                                <td key={index}>Table cell {index}</td>
                                            ))} */}
                                        </tr>
                                        <tr>
                                            <td>Гарантийное письмо</td>
                                            <td>Отклонен</td>
                                            <td>Недоступно</td>
                                            <td>Причина отказа: что-то пошло не так </td>
                                            <td>03.08.2023</td>
                                            {/* {Array.from({ length: 12 }).map((_, index) => (
                                                <td key={index}>Table cell {index}</td>
                                            ))} */}
                                        </tr>
                                        <tr>
                                            <td>Гарантийное письмо</td>
                                            <td>Ожидание оплаты</td>
                                            <td>Оплатить</td>
                                            <td>Времени до конца оплаты: 10 дней 5 часов</td>
                                            <td>03.08.2023</td>
                                            {/* {Array.from({ length: 12 }).map((_, index) => (
                                                <td key={index}>Table cell {index}</td>
                                            ))} */}
                                        </tr>
                                    </tbody>
                                </Table>
                            </Tab.Pane>
                        </Tab.Content>

                    </Col>
                </Row>
            </Tab.Container>

        </Container>
    )
}

export default Main