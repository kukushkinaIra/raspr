import React from "react"
import work from "./images/2163673.svg"

function AboutUs() {
    return (
        <section id="about" className="about_us">
            <div className="container main_container">
                <h2>Мы, команда «Алексей Гуревич – консалтинг»</h2>
                <div>
                    <div className="about_first">
                        {/* <img className="workImg" src={work}  alt="workimg"/> */}
                        <div className="about_text">
                            <hr/>
                            <div className="about_part main_column_reverse">
                                <p>Помогаем с распределением, перераспределением, прохождением производственной и
                                    преддипломной практики студентам по всей РБ.</p>
                                <div className="image_main_first image_main"></div>
                            </div>
                            <div className="about_part">
                                <div className="image_main_second image_main"></div>
                                <p>Трудоустройство в нашу компанию идет без
                                    привязки к офису, дистанционно на 0.1 ставки, и у Вас есть возможность работать по
                                    совместительству или договору подряда. Также можно уехать работать, учиться или жить
                                    в другую страну.</p>
                            </div>
                            <div className="about_part main_column_reverse">
                                <p>Предоставляем распределение после колледжа и всех ступеней высшего образования
                                    (бакалавриат, магистратура, аспирантура, докторантура).
                                    Помогаем учащимся по всем специальностям, кроме врачей, милиции и военных.</p>
                                <div className="image_main_third image_main"></div>
                            </div>
                        </div>
                        {/*<div className="why_us text-center">*/}


                        {/*</div>*/}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs