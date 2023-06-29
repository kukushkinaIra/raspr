import React from "react"
import serviceGirl from "./images/пшкд_цшер_внздщьф 1.png"
import serviceBoy from "./images/jump_student 1.png"
import doneIcon from "./images/27098.svg"


function Service(){
    return(
        <section className="services_block">
            <h2>Наши услуги</h2>
            <div className="container">
                <div className="service_block">
                    <div className="servise_img">
                        <img className="round" src={serviceBoy} />
                    </div>
                    <div className="service_text">
                        <h3>Распределение и перераспределение</h3>
                        <ul>
                            <li>
                                <img className="doneIcon" src={doneIcon} />
                                заказать заявку на распределение/гарантийное письмо
                            </li>
                            <li>
                            <img className="doneIcon" src={doneIcon} />
                                оформить пакет на трудоустройство
                            </li>
                            <li> <img className="doneIcon" src={doneIcon} />
                                заказать справку, характеристику, копию трудовой книжки;</li>
                        </ul>
                    </div>
                </div>
                <div className="service_block servise_block_2">
                    <div className="service_text">
                        <h3>Производственная/
                            преддипломная практика</h3>
                        <ul>
                            <li><img className="doneIcon" src={doneIcon} />
                            оформить договор на практику
                            </li>
                            <li><img className="doneIcon" src={doneIcon} />
                            подписать дневник,отчет,титульный лист</li>
                        </ul>
                    </div>
                    <div className="servise_img">
                        <img className="round" src={serviceGirl} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Service