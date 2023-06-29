import React from "react"
import work from "./images/2163673.svg"

function AboutUs(){
    return(
        <section className="about_us">
            <div className="container main_container">
                 <h2>О нас</h2>
                <div>
                    <div className="about_first">
                    <img className="workImg" src={work}  alt="workimg"/>
                        <div className="about_text">
                            <p>Мы, команда «Алексей Гуревич – консалтинг» помогаем с распределением, перераспределением и прохождением производственной/ преддипломной практики студентам по всей РБ.</p>
                            <p>Мы предлагаем возможность распределения в нашу компанию. Трудоустройство идет без привязки к офису/ дистанционно на 0,1 ставки, и у Вас есть возможность работать по совместительству или договору подряда. Также можно уехать работать, учиться или жить в другую страну.</p>
                            <p>Предоставляем распределение после колледжа и всех ступеней высшего образования (бакалавриат/ магистратура/ аспирантура/ докторантура).
                            Помогаем учащимся по всем специальностям, кроме врачей, милиции и военных.</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs