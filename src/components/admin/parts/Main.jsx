
import {Tabs, Tab, Col, Nav, Row} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import ManagementTable from "./ManagementTable.jsx";
import OrdersHistoryTable from "./OrdersHistoryTable.jsx";
import AllClientsTable from "./AllClientsTable.jsx";
import WorkWithOrdersTable from "./WorkWithOrdersTable.jsx";


function Main() {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <Container className="user_container">
            <Tab.Container id="ledt-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column mt-2 nav">
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link className="tab_link_custom" eventKey="first">
                                    Профиль
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link eventKey="second">
                                    Работа с заказами
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link eventKey="third">
                                    Менеджмент
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link eventKey="forth">
                                    История заказов
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="tab_item_custom">
                                <Nav.Link eventKey="fifth">
                                    Клиенты
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h3>Профиль</h3>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h3>Управление заказами</h3>
                                <WorkWithOrdersTable/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h3 className="choose">Распределение заказов</h3>
                                <ManagementTable/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="forth">
                                <h3>Информация о заказах</h3>
                                <OrdersHistoryTable/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <h3>Информация о клиентах</h3>
                                <AllClientsTable/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </Container>
    )
}

export default Main