import {Tab, Col, Nav, Row} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import TableOrders from "./TableOrders";
import ProfileInfo from "./ProfileInfo";
import UserOffers from "./UserOffers";


function Main() {

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
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h3>Профиль</h3>
                                <ProfileInfo/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h3>Выберите услугу для заказа</h3>
                                <UserOffers/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h3>Информация о заказах</h3>
                                <TableOrders/>
                            </Tab.Pane>
                        </Tab.Content>

                    </Col>
                </Row>
            </Tab.Container>

        </Container>
    )
}

export default Main