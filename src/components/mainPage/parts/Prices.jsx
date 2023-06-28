import React from "react"
import {Link} from "react-router-dom"

function Prices(){
    return(
        <section className="main_prices" id="offers">
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
                            <button>Подать заявку</button>
                        </ul>
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
                            <button>Пройти практику</button>
                        </ul>
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
                            <button>
                                <Link to="/login" style={{textDecoration:'none'}}>Зарегистрироваться</Link>
                            </button>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default Prices