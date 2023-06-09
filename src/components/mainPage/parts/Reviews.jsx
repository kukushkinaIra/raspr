import React from "react"
import reviewPerson1 from "./images/image 8.jpg"
import review1 from "./images/image 6.jpg"
import reviewPerson2 from "./images/image 12.png"
import review2 from "./images/image 5.png"
import reviewPerson3 from "./images/image 10.jpg"
import review3 from "./images/image 2.jpg"
import reviewPerson4 from "./images/image 9.png"
import review4 from "./images/image 3.png"
import reviewPerson5 from "./images/image 7.png"
import review5 from "./images/image 1.png"
import reviewPerson6 from "./images/image 11.jpg"
import review6 from "./images/image 15.jpg"
import reviewPerson7 from "./images/image 14.png"
import review7 from "./images/image 13.png"

function Reviews(){
    return(
        <section className="rewies">
        <div className="container">
            <h2>Мы - это наши клиенты</h2>
            <div className="reviews_cards">
                <div className="cards">
                    <div className="card">
                        <div>
                            <img src={reviewPerson1} />
                        </div>
                        <div>
                            <img src={review1} />
                        </div>
                    </div>
                    <div class="card">
                        <div>
                            <img src={reviewPerson2} />
                        </div>
                        <div>
                            <img src={review2} />
                        </div>
                    </div>
                </div>
                <div className="cards">
                    <div class="card">
                        <div>
                        <img src={reviewPerson3} />
                        </div>
                        <div>
                        <img src={review3} />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                        <img src={reviewPerson4} />
                        </div>
                        <div>
                        <img src={review4} />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                        <img src={reviewPerson5} />
                        </div>
                        <div>
                        <img src={review5} />
                        </div>
                    </div>
                </div>
                <div className="cards">
                    <div className="card">
                        <div>
                        <img src={reviewPerson6} />
                        </div>
                        <div>
                        <img src={review6} />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                        <img src={reviewPerson7} />
                        </div>
                        <div>
                        <img src={review7} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Reviews