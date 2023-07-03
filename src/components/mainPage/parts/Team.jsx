import React from "react"
import main from "./images/alex.jpg"

function Team(){
    return(
        <section className="about_us team" id="team">
            <div className="container main_container">
                 <h2>Наша Команда</h2>
                <div className="main_description_team">
                    <div className="team_info">
                        <div className="team_infoText">
                            <p>
                                Алексей Гуревич - руководитель данного проекта.
                                Алексей - успешный предприниматель с многолетним опытом оптимизации бизнеса международного формата.
                                Он помогает сохранить и приумножить деньги предпринимателям и не только. А также сохраняет ваши нервы и ваше время во время отработки. Алексей уже изменил в лучшую сторону не одну жизнь, изменит и твою!
                            </p>
                        </div>
                        {/* <div className="mainImgDiv">
                            <img alt="image" className="mainImg" src={main} />
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team