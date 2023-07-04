import React from "react"
import girl from "./images/white_student_right.png"

function MainInfo() {
    return (
        <section className="main" style={{
            backgroundImage: `url(${girl})`
        }}>
            <div className="container main_container">
                <div className="main_description">
                    <h1>Официальное Трудоустройство</h1>
                    <p>Поможем с распределением, перераспределением, прохождением производственной и преддипломной
                        практики студентам РБ</p>
                    <a className="home_main_button" href="/registration">Подать заявку</a>
                </div>
                <div className="main_photo"></div>
            </div>
        </section>
    )
}

export default MainInfo