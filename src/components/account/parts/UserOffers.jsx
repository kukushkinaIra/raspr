import React, {Fragment} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import ModalGuaranteeLetter from "./modals/ModalGuaranteeLetter";
import ModalContract from "./modals/ModalContract";
import ModalDefault from "./modals/ModalDefault";


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
                this.setState((prevState) => ({
                    modal: (
                        <ModalDefault
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                            offerId={offer.id}
                        />
                    ),
                    show: !prevState.show,
                }));
                break;
        }
    }

    getPricePeriod(item) {
        if (['Распределение', 'Перераспределение'].includes(item.title)) {
            return 'от ' + item.price / 3 + ' руб. в месяц ';
        } else if (item.title === 'Практика') {
            return 'от ' + item.price + ' руб. в месяц ';
        } else
            return 'от ' + item.price + ' руб.';
    }

    render() {
        const {error, offers, modal} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <div className="services">
                        {offers.filter(item => item.title !== 'Ежемесячный платеж').map(item => (
                            <div className="service" key={item.id}
                                 onClick={() => this.handleOfferClick(item)}
                            >
                                <h4>{item.title==='Перераспределение' ? 'Пере- распределение' : item.title}</h4>
                                <hr/>
                                <p>{this.getPricePeriod(item)}</p>
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