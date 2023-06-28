import React from "react"
import icon from "./images/662218.svg"


function ReferalProgramm(){
    return(
        <section className="about_us referal">
            <div className="container main_container">
                 <h2>Реферальная программа</h2>
                <div className="referal_main">
                    <div>
                        <h3>Участвуйте в нашей программе и сохраните цену со скидкой <b>148 р/мес.</b> !!!</h3>
                        <h3><b>178 р/мес.</b> - цена без скидки.</h3>
                        <ul>
                            <li> <img className="myIcon" src={icon} />
                                С ЛЮБОГО аккаунта instagram разместите сторис с активной ссылками на наш телеграм канал <a href="https://t.me/raspred_by">https://t.me/raspred_by</a>,
                             <a href="https://t.me/raspred_by"> (https://t.me/raspred_by)</a> инстаграм www.instagram.com/alex.hurevich/ и номером +375333988811.<br></br>
                                <span>Пример сторис смотрите в закрепленном хайлайтс «АКЦИИ». Делайте скрин и выкладывайте.</span>
                              </li>
                             <li>
                                <img className="myIcon" src={icon} />
                                Закрепите эту сторис в актуальном и пришлите нам ссылку на неё в личные сообщения!
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReferalProgramm