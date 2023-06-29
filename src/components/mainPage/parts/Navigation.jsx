import React from "react"
import logo from "./images/Logo-01 1.svg"
import {NavLink} from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return (

        // <nav>
        //     <div className="container navigation_cotainer">
        //         <div>
        //             <img src={logo} alt="logo"/>
        //         </div>
        //         <div className="navigation">
        //             <ul>
        //                 <li>
        //                     <a href="/#about">О нас</a>
        //                 </li>
        //                 <li>
        //                     <a href="/#news">Новости</a>
        //                 </li>
        //                 <li>
        //                     <a href="/#offers">Услуги</a>
        //                 </li>
        //                 <li>
        //                     <a href="/#referal_program">Реферальная программа</a>
        //                 </li>
        //                 <li>
        //                     <a href="/#reviews">Отзывы</a>
        //                 </li>
        //                 <li>
        //                     <a href="/#contacts">Контакты</a>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div className="user_variations">
        //             <NavLink className="enter" to="/login" style={{textDecoration: 'none'}}>Войти</NavLink>
        //             <NavLink className="registration" to="/register"
        //                      style={{textDecoration: 'none'}}>Регистрация</NavLink>
        //         </div>
        //     </div>
        // </nav>


                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home" className="me-5">
                                <img src={logo} alt="logo"/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto ps-lg-5 ps-md-0">
                                <Nav.Link href="#about">О нас</Nav.Link>
                                <Nav.Link href="#services">Наши услуги</Nav.Link>
                                <Nav.Link href="#prices">Цены</Nav.Link>
                                <Nav.Link href="#referal">Реферальная программа</Nav.Link>
                                <Nav.Link href="#team">Наша команда</Nav.Link>
                                <Nav.Link href="#vacansies">Вакансии</Nav.Link>
                                <Nav.Link href="#reviews">Отзывы</Nav.Link>
                                <Nav.Link href="#contact">Контакты</Nav.Link>
                                <Nav.Link className="enter" href="/login">Войти</Nav.Link>
                                <Nav.Link href="/registration" className="registration">Регистрация</Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
                </Navbar>

    )
}

export default Navigation