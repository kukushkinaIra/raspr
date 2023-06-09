import React from "react"
import logo from "./images/Logo-01 1.svg"
import {NavLink} from "react-router-dom"

function Navigation(){
    return(
        
        <nav>
            <div class="container navigation_cotainer">
                <div>
                    <img src={logo} />
                </div>
                <div class="navigation">
                    <ul>
                        <li>
                            <a href="">
                                Услуги
                            </a>
                        </li>
                        <li>
                            <a href="">Акции</a>
                        </li>
                        <li>
                            <a href="">
                                О нас
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Отзывы
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="user_variations">
                    <NavLink className="enter" to="/login" style={{textDecoration:'none'}} >Войти</NavLink>
                    <NavLink className="registration" to="/register" style={{textDecoration:'none'}}>Регистрация</NavLink>
                </div>
            </div>
        </nav>

    )
}

export default Navigation