import React from 'react';
import { Tabs, Tab, Col, Nav, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FormGarantLetter from "./formGarantLetter.jsx"
import Table from 'react-bootstrap/Table';
import TableOrders from "./TableOrders.jsx"
import MainUserInfo from "./MainUserInfo.jsx"

// import axios from 'axios';

export default class PersonList extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      _embedded: {},
      offers:[]
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/offers")
      .then(res => res.json())
    .then(
        data => {
        let some = data._embedded.offers;
        this.setState({
            offers: data._embedded.offers, 
          isLoading: false,
        })
        console.log(some)
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

const { error, isLoaded, offers } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else {
      return (
        // <ul>
        //   {offers.map(item => (
        //     <li key={item.id}>
        //       {item.title}
        //     </li>
        //   ))}
        // </ul>
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
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <MainUserInfo/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h3 className="choose">Выберите услугу для заказа</h3>
                                <div className="services">
                                    {offers.map(item => (
                                        <div className="service" key={item.id}>
                                            <h4>{item.title}</h4>
                                            <hr  style={{
                                                color: 'black',
                                                backgroundColor: 'black',
                                                height: .5,
                                                borderColor : 'black'
                                            }}/>
                                            <p>от {item.price} руб в месяц</p>
                                        </div>
                                    ))}
                                </div>
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
      );
    }
  }
}