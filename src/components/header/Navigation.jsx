import React, {Fragment, useEffect, useState} from "react"
import logo from "../footer/images/Logo-01 1.svg"
import {NavLink, useNavigate} from "react-router-dom"
import {logout} from "../auth/actions/user";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {useAuth} from "../auth/AuthProvider";

function Navigation() {

    const navigate = useNavigate();
    const [buttonBlock, setButtonBlock] = useState(<Fragment>
        <Nav.Link className="enter" href="/login">Войти</Nav.Link>
        <Nav.Link href="/registration" className="registration">Регистрация</Nav.Link>
    </Fragment>);

    const {role, setRole, setId} = useAuth();

    useEffect(() => {
        if (role === "ROLE_GUEST") {
            setButtonBlock(<Fragment>
                <Nav.Link className="enter" href="/login">Войти</Nav.Link>
                <Nav.Link href="/registration" className="registration">Регистрация</Nav.Link>
            </Fragment>)
        } else if (role === "ROLE_ADMIN" || role === "ROLE_USER" || role === "ROLE_MANAGER") {
            setButtonBlock(<Fragment>
                    <Nav.Link className="home-button" href="/home">Личный кабинет</Nav.Link>
                    <Button className="table-yellow-button logout" onClick={handleLogoutButton}
                            style={{textDecoration: 'none'}}>Выйти</Button>
                </Fragment>
            )
        }
    }, [role]);


    const handleLogoutButton = (e) => {
        e.preventDefault();
        logout(setRole, setId);
        navigate('/');
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" className="me-5">
                    <img src={logo} alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ps-lg-5 ps-md-0">
                        <Nav.Link href="/#about">О нас</Nav.Link>
                        <Nav.Link href="/#services">Наши услуги</Nav.Link>
                        <Nav.Link href="/#prices">Цены</Nav.Link>
                        <Nav.Link href="/#referal">Реферальная программа</Nav.Link>
                        <Nav.Link href="/#team">Наша команда</Nav.Link>
                        <Nav.Link href="/#vacansies">Вакансии</Nav.Link>
                        <Nav.Link href="/#reviews">Отзывы</Nav.Link>
                        <Nav.Link href="/#contact">Контакты</Nav.Link>
                        {buttonBlock}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation