import React from "react"
import logo from "./images/Logo-01 1.svg"
import {NavLink} from "react-router-dom"

function Navigation(){
    return(
        
        <nav>
            <div className="container navigation_cotainer">
                <div>
                    <img src={logo}  alt={logo}/>
                </div>
                <div className="navigation">
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
                <div className="user_variations">
                    <NavLink className="registration" to="/register" style={{textDecoration:'none'}}>lorem_ipsum@gmail.com</NavLink>
                    <NavLink className="enter" to="/login" style={{textDecoration:'none'}} >Выйти</NavLink>
                </div>
            </div>
        </nav>

    )
}

export default Navigation