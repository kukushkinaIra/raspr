import React from "react"
import {Link} from "react-router-dom"
import doneIcon from "./images/27098.svg"


function Prices(){
    return(
        <section className="main_prices" id="prices">
            <div className="container">
                <h2>Цены</h2>
                <div className="prices_blocks">
                    <div className="price_block">
                        <h3>Распределение / перераспределение</h3>
                        <p>Затратная часть от 148 руб в месяц</p>
                        {/* <hr> */}
                        <ul>
                            <li>Какие-то плюсы</li>
                            <li>служба в армии идет в срок отработки</li>
                            <li>аванс 534 руб за три месяца для гарантии сотрудничества</li>
                            <li>просто пример дизайна</li>
                        </ul>
                        <div className="buttom_div">
                                <button>Подать заявку</button>
                            </div>
                    </div>
                    <div className="price_block">
                        <h3>Преддипломная практика</h3>
                        <p>Затратная часть от 148 руб в месяц</p>
                        {/* <hr> */}
                        <ul>
                            <li>Какие-то плюсы</li>
                            <li>служба в армии идет в срок отработки</li>
                            <li>аванс 534 руб за три месяца для гарантии сотрудничества</li>
                            <li>просто пример дизайна</li>
                        </ul>
                        <div className="buttom_div">
                            <button>Пройти практику</button>
                        </div>
                    </div>
                    <div className="price_block">
                        <h3>Прочие услуги</h3>
                        <p>от 7 руб</p>
                        {/* <hr> */}
                        <ul>
                            <li>завести трудовую книжку</li>
                            <li>справка о трудоустройстве или копия трудовой книжки</li>
                            <li>подписание дневника, характеристики</li>
                            <li>Справки для посольства</li>
                            <li>выдача гарантийного письма</li>
                            
                        </ul>
                        <div className="buttom_div">
                            <button>
                                    <Link to="/login" className="regist_link" style={{textDecoration:'none'}}>Зарегистрироваться</Link>
                            </button>
                        </div>
                    </div>

                    
                </div>

                <div className="more_info_prices">
                    <div>
                        <h4>Трудоустройство</h4>
                        <ul>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                                Подписание пакета на трудоустройство - 50 р
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                             Оформление процесса увольнения - 50 р
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                              Завести трудовую книжку - 15 р
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                              Завести карту соц. страхования - 10 р
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                            Характеристика на новое место работы - 15 р
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4>Дополнительно</h4>
                        <ul>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                            Доставка корреспонденции в руки ЕМС по РБ за 24 часа - от 15 р 
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                            Ксерокопии (контракта, приказа, направления, трудовой книжки) - 15 р
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                            Справка для посольства - от 15 до 60 р 
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                            Справка для университета об окончании отработки - 15 р
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                            Переделывание документа - 20 р
                            </li>
                            <li>
                            <img alt="image" className="doneIcon" src={doneIcon} />
                            Срочность работы (за 1 день справки, копии, ГП) - 15 р
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Prices