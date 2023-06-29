import React from "react"
import icon from "./images/662218.svg"


function Vacancies(){
    return(
        <section className="about_us vacansies referal" id="vacansies">
            <div className="container main_container">
                 <h2>Вакансии</h2>
                <div className="referal_main hire_main">
                    <div>
                        <h3>МЕНЕДЖЕР, МЫ ИЩЕМ ТЕБЯ <img alt="image" className="myIcon" src={icon} /></h3>
                        <h5>Какие задачи тебя ожидают</h5>
                        <ul className="hire">
                            <li> <img alt="image" className="myIcon" src={icon} />
                            	Активный поиск и привлечение новых клиентов (переписки, звонки, проведение переговоров и встреч, заключение договоров)
                              </li>
                             <li>
                                <img alt="image" className="myIcon" src={icon} />
                                Формирование базы клиентов, ведение текущих клиентов
                            </li>
                        </ul>

                        <h5>Что мы ждем от тебя</h5>
                        <ul className="hire">
                            <li> <img alt="image" className="myIcon" src={icon} />
                            Желание развиваться в сфере продаж
                            </li>
                             <li>
                                <img alt="image" className="myIcon" src={icon} />
                                Желание работать с людьми
                            </li>
                            <li>
                                <img alt="image" className="myIcon" src={icon} />
                                Готовность к обучению
                            </li>
                            <li>
                                <img alt="image" className="myIcon" src={icon} />
                                Желание достигать результатов и зарабатывать
                            </li>
                            <li>
                                <img alt="image" className="myIcon" src={icon} />
                                Коммуникабельность, активность, стрессоустойчивость
                            </li>
                        </ul>

                        <h4 className="offer_seller">Ты умеешь продавать, готов и хочешь строить общее дело? Присоединяйся к нашей команде!</h4>
                        <h5>Работа в офисе</h5>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Vacancies