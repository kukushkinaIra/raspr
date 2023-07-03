import React, {Fragment} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import ModalGuaranteeLetter from "./modals/ModalGuaranteeLetter";
import ModalContract from "./modals/ModalContract";
import {ToastContainer} from "react-toastify";


export default class UserOffers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            offers: [],
            show: false,
            modal: <Fragment/>,
        };
    }


    componentDidMount() {
        const userId = localStorage.getItem("id");
        fetch(`/offers/user/${userId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .catch((error) => {
                if (error.message === "401") {
                    const authCookie = document.cookie
                        .split(";")
                        .find((cookie) => cookie.startsWith("auth="));
                    if (!authCookie) {
                        this.props.setId(null);
                        this.props.setRole(null);
                        this.props.navigate('/login');
                    }
                }
                this.setState({
                    isLoaded: true,
                    error,
                });
                return Promise.reject();
            })
            .then(
                data => {
                    this.setState({
                        offers: data,
                        isLoaded: false,
                    })

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleShowUserOffer = () => {
        this.setState({show: true});
    };

    handleCloseUserOffer = () => {
        this.setState((prevState) => ({
            show: !prevState.show, // Используем функцию в setState
            modal: <Fragment/>,
        }));
    };

    handleOfferClick(offer) {
        this.handleShowUserOffer();


        switch (offer.title) {
            case "Гарантийное письмо": {
                this.setState((prevState) => ({
                    modal: (
                        <ModalGuaranteeLetter
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                            offerId={offer.id}
                        />
                    ),
                    show: !prevState.show,
                }));
                break;
            }
            case "Распределение": {
                this.setState((prevState) => ({
                    modal: (
                        <ModalContract
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                            offerId={offer.id}
                        />
                    ),
                    show: !prevState.show,
                }));
                break;
            }
            case "Перераспределение": {
                this.setState((prevState) => ({
                    modal: (
                        <ModalContract
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                            offerId={offer.id}
                        />
                    ),
                    show: !prevState.show,
                }));
                break;
            }
            case "Практика": {
                this.setState((prevState) => ({
                    modal: (
                        <ModalGuaranteeLetter
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                            offerId={offer.id}
                        />
                    ),
                    show: !prevState.show,
                }));
                break;
            }
            default:
            // this.setState({
            //     show: true,
            //     modalTitle: "Подтвердите заказ",
            // });
        }
    }

    render() {
        const {error, offers, modal} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <ToastContainer />
                    <div className="services">
                        {offers.map(item => (
                            <div className="service" key={item.id}
                                 onClick={() => this.handleOfferClick(item)}
                            >
                                <h4>{item.title}</h4>
                                <hr/>
                                <p>от {item.price} руб. в месяц</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        {modal}
                    </div>
                </div>
            );
        }
    }
}