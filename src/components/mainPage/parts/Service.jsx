import React from "react"
import serviceGirl from "./images/пшкд_цшер_внздщьф 1.png"
import serviceBoy from "./images/jump_student 1.png"


function Service(){
    return(
        <section className="services">
            <h2>Наши услуги</h2>
            <div className="container">
                <div className="service">
                    <div>
                        <img src={serviceBoy} />
                    </div>
                    <div className="service_text">
                        <h3>Распределение и перераспределение</h3>
                        <ul>
                            <li>заказать заявку на распределение/гарантийное письмо</li>
                            <li>оформить пакет на трудоустройство</li>
                            <li> заказать справку, характеристику, копию трудовой книжки;</li>
                        </ul>
                    </div>
                </div>
                <div className="service">
                    <div className="service_text">
                        <h3>Производственная/
                            преддипломная практика</h3>
                        <ul>
                            <li>оформить договор на практику</li>
                            <li>подписать дневник,отчет,титульный лист</li>
                        </ul>
                    </div>
                    <div>
                        <img src={serviceGirl} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Service