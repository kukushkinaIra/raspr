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
import review8 from "./images/04.jpg"


function Reviews(){
    return(
        <section className="reviews" id="reviews">
        <div className="container">
            <h2>Мы - это наши клиенты</h2>
            <div className="reviews_cards">
                <div className="cards">
                    {/* <div className="card">
                        <div>
                            <img alt="image" src={reviewPerson1} />
                        </div>
                        <div>
                            <img alt="image" src={review1} />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                            <img alt="image" src={reviewPerson2} />
                        </div>
                        <div>
                            <img alt="image" src={review2} />
                        </div>
                    </div>
                </div>
                <div className="cards">
                    <div className="card">
                        <div>
                        <img alt="image" src={reviewPerson3} />
                        </div>
                        <div>
                        <img alt="image" src={review3} />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                        <img alt="image" src={reviewPerson4} />
                        </div>
                        <div>
                        <img alt="image" src={review4} />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                        <img alt="image" src={reviewPerson5} />
                        </div>
                        <div>
                        <img alt="image" src={review5} />
                        </div>
                    </div>
                </div>
                <div className="cards">
                    <div className="card">
                        <div>
                        <img alt="image" src={reviewPerson6} />
                        </div>
                        <div>
                        <img alt="image" src={review6} />
                        </div>
                    </div>
                    <div className="card">
                        <div>
                        <img alt="image" src={reviewPerson7} />
                        </div>
                        <div>
                        <img alt="image" src={review7} />
                        </div>
                    </div> */}

                    <div className="swiper-slide">
                        <div className="rts-client-reviews-h2">
                            <div className="review-header">
                                <a className="thumbnail">
                                 <img alt="image" src={review8}/>
                                </a>
                                <div className="discription">
                                    <h6>Анастасия</h6>
                                </div>
                            </div>
                            <div className="review-body">
                                <p className="disc">
                                    У меня была следующая ситуация: близился момент распределения, университет предложил несколько заявок от себя
                                    но либо работа была не в Минске, либо с крошечной зп, а времени на то, чтобы найти компанию, которая возьмёт к себе
                                    на распределение на 2 года уже не было. Знакомая посоветовала обратиться к А. Гуревичу, что я и сделала и очень рада, что распределилась к нему в компанию
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="swiper-slide">
                        <div className="rts-client-reviews-h2">
                            <div className="review-header">
                                <a className="thumbnail">
                                 <img alt="image" src={review8}/>
                                </a>
                                <div className="discription">
                                    <h6>Анастасия</h6>
                                </div>
                            </div>
                            <div className="review-body">
                                <p className="disc">
                                    У меня была следующая ситуация: близился момент распределения, университет предложил несколько заявок от себя
                                    но либо работа была не в Минске, либо с крошечной зп, а времени на то, чтобы найти компанию, которая возьмёт к себе
                                    на распределение на 2 года уже не было. Знакомая посоветовала обратиться к А. Гуревичу, что я и сделала и очень рада, что распределилась к нему в компанию
                                </p>
                            </div>
                        </div>
                    </div>



                    <div className="swiper-slide">
                        <div className="rts-client-reviews-h2">
                            <div className="review-header">
                                <a className="thumbnail">
                                 <img alt="image" src={review8}/>
                                </a>
                                <div className="discription">
                                    <h6>Анастасия</h6>
                                </div>
                            </div>
                            <div className="review-body">
                                <p className="disc">
                                    У меня была следующая ситуация: близился момент распределения, университет предложил несколько заявок от себя
                                    но либо работа была не в Минске, либо с крошечной зп, а времени на то, чтобы найти компанию, которая возьмёт к себе
                                    на распределение на 2 года уже не было. Знакомая посоветовала обратиться к А. Гуревичу, что я и сделала и очень рада, что распределилась к нему в компанию
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Reviews