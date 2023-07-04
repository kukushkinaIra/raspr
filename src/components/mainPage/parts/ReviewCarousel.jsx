import React from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import zero from "./images/zero.jpg"
import first from "./images/first.jpg"
import second from "./images/second.jpg"
import third from "./images/third.jpg"
import forth from "./images/forth.jpg"


// import required modules
import {FreeMode, Pagination} from 'swiper/modules';

export default function ReviewCarousel() {
  return (
    <>
    <section className="reviews" id="reviews">
    <div className="container">
            <h2 className='text-center'>Мы - это наши клиенты</h2>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                <SwiperSlide>
                        <div className="swiper-slide-cust">
                                <div className="rts-client-reviews-h2">
                                    <div className="review-header">
                                        <a className="thumbnail">
                                        <img alt="image" src={zero}/>
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
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-slide-cust">
                                <div className="rts-client-reviews-h2">
                                    <div className="review-header">
                                        <a className="thumbnail">
                                        <img alt="image" src={first}/>
                                        </a>
                                        <div className="discription">
                                            <h6>Екатерина</h6>
                                        </div>
                                    </div>
                                    <div className="review-body">
                                        <p className="disc">
                                            Близился момент распределения, я устроилась в прекрасную компанию, но из-за внутренней политики
                                            не смогла туда распределиться, а времени оставалось очень мало. Тогда я обратилась к
                                            Алексею и его команде. Это высоко квалифицированные профессионалы, которые взяли решение
                                            всех вопросов на себя. Вы сберегли мою карьеру, нервы, деньги,  за что безумно вам благодарна!
                                        </p>
                                    </div>
                                </div>
                            </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-slide-cust">
                                <div className="rts-client-reviews-h2">
                                    <div className="review-header">
                                        <a className="thumbnail">
                                        <img alt="image" src={second}/>
                                        </a>
                                        <div className="discription">
                                            <h6>Инна</h6>
                                        </div>
                                    </div>
                                    <div className="review-body">
                                        <p className="disc">
                                            Узнала о компании от брата, он к Вам обращался. На момент учёбы уже была основная работа, не связанная с профессией.
                                            Плюсы в том, что нет необходимости в поиске отработки, и в том, что можно параллельно работать там, где нравится.
                                        </p>
                                    </div>
                                </div>
                            </div>
                </SwiperSlide>
                <SwiperSlide>
                            <div className="swiper-slide-cust">
                                <div className="rts-client-reviews-h2">
                                    <div className="review-header">
                                        <a className="thumbnail">
                                        <img alt="image" src={third}/>
                                        </a>
                                        <div className="discription">
                                            <h6>Алина</h6>
                                        </div>
                                    </div>
                                    <div className="review-body">
                                        <p className="disc">
                                           О компании узнала от знакомого. Отработку от университета не рассматривала даже, сама ничего не искала даже, так как
                                           этот вариант оказался самым удобным. Главный плюс - свободный график и достаточно свободного времени. Сложно представить вариант лучше.
                                        </p>
                                    </div>
                                </div>
                            </div>
                </SwiperSlide>
                <SwiperSlide>
                            <div className="swiper-slide-cust">
                                <div className="rts-client-reviews-h2">
                                    <div className="review-header">
                                        <a className="thumbnail">
                                        <img alt="image" src={forth}/>
                                        </a>
                                        <div className="discription">
                                            <h6>Елена</h6>
                                        </div>
                                    </div>
                                    <div className="review-body">
                                        <p className="disc">
                                           О компании мне рассказала подруга, она сама к вам распределилась. Очень благодарна Алексею за то, что помогает с комфортной
                                           отработкой с возможностью работать на любимой работе. Перераспределили меня буквально за день, очень оперативно сработали, спасибо, вы крутые!
                                        </p>
                                    </div>
                                </div>
                            </div>
                </SwiperSlide>
                {/* <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide> */}
                {/* <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </div>
    </section>
    </>
  );
}
