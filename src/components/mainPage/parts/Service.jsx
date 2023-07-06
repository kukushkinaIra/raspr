import React from "react"
import serviceGirl from "./images/пшкд_цшер_внздщьф 1.png"
import serviceBoy from "./images/jump_student 1.png"
import doneIcon from "./images/27098.svg"


function Service() {
    return (
        <section id="services" className="services_block">
            <div className="container main_container">
                <h2>Наши услуги</h2>
                {/* <div className="service_block">
                    <div className="servise_img">
                        <img alt="image"className="round" src={serviceBoy} />
                    </div>
                    <div className="service_text">
                        <h3>Распределение и перераспределение</h3>
                        <ul>
                            <li>
                                <img alt="image"className="doneIcon" src={doneIcon} />
                                заказать заявку на распределение/гарантийное письмо
                            </li>
                            <li>
                            <img alt="image"className="doneIcon" src={doneIcon} />
                                оформить пакет на трудоустройство
                            </li>
                            <li> <img alt="image" className="doneIcon" src={doneIcon} />
                                заказать справку, характеристику, копию трудовой книжки;</li>
                        </ul>
                    </div>
                </div>
                <div className="service_block servise_block_2">
                    <div className="service_text">
                        <h3>Производственная/
                            преддипломная практика</h3>
                        <ul>
                            <li><img alt="image" className="doneIcon" src={doneIcon} />
                            оформить договор на практику
                            </li>
                            <li><img alt="image" className="doneIcon" src={doneIcon} />
                            подписать дневник,отчет,титульный лист</li>
                        </ul>
                    </div>
                    <div className="servise_img">
                        <img alt="image" className="round" src={serviceGirl} />
                    </div>
                </div> */}

                <div className="services_blocks">
                    <div className="flipcard h">
                        <div className="front">
                            <h5>Распределение<br></br>Перераспределение</h5>
                        </div>
                        <div className="back">
                            <div>
                                <ul>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        от <b>148</b> руб в месяц
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Аванс 534 руб за три месяца для гарантии сотрудничества
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flipcard h">
                        <div className="front">
                            <h5>Трудоустройство</h5>
                        </div>
                        <div className="back">
                            <div>
                                <h6 className="text-center">От <b>10</b> рублей</h6>
                                <ul>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Подписание пакета на трудоустройство
                                    </li>
                                    <li><img alt="image" className="doneIcon" src={doneIcon}/>
                                        Оформление процесса увольнения
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Завести трудовую книжку
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Завести карту соц. страхования
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Характеристика на новое место работы
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flipcard h">
                        <div className="front">
                            <h5 className="text-center">Преддипломная практика</h5>
                        </div>
                        <div className="back">
                            <div>
                                <ul>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        от <b>148</b> руб в месяц
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Аванс 534 руб за три месяца для гарантии сотрудничества
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flipcard h">
                        <div className="front">
                            <h5>Дополнительные услуги</h5>
                        </div>
                        <div className="back">
                            <div>
                                <h6 className="text-center">От <b>15</b> рублей</h6>
                                <ul>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Гарантийное письмо
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Копия трудовой книжки
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Подписать дневник/ отчёт/ титульный лист
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Справка для университета об окончании отработки
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Справка для посольства
                                    </li>
                                    <li>
                                        <img alt="image" className="doneIcon" src={doneIcon}/>
                                        Доставка корреспонденции в руки ЕМС по РБ за 24 часа
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Service