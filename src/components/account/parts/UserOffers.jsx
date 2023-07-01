import React, {Fragment} from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import FormGuaranteeLetter from "./forms/FormGuaranteeLetter";
import FormContract from "./forms/FormContract";


export default class UserOffers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            offers: [],
            show: false,
            modal: <Fragment/>,
            modalTitle: "Заполните данные",
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

    handleOfferClick(title) {
        this.handleShowUserOffer()


        switch (title) {
            case "Гарантийное письмо": {
                this.setState((prevState) => ({
                    modal: (
                        <FormGuaranteeLetter
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                        />
                    ),
                    show: !prevState.show, // Используем функцию в setState
                }));
                break;
            }
            case "Распределение": {
                this.setState((prevState) => ({
                    modal: (
                        <FormContract
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                        />
                    ),
                    show: !prevState.show, // Используем функцию в setState
                }));
                break;
            }
            case "Перераспределение": {
                this.setState((prevState) => ({
                    modal: (
                        <FormContract
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                        />
                    ),
                    show: !prevState.show, // Используем функцию в setState
                }));
                break;
            }
            case "Практика": {
                this.setState((prevState) => ({
                    modal: (
                        <FormGuaranteeLetter
                            showProp={true}
                            setShowPropFalse={this.handleCloseUserOffer}
                        />
                    ),
                    show: !prevState.show, // Используем функцию в setState
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
        const {error, offers, modal, modalTitle} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <div className="services">
                        {offers.map(item => (
                            <div className="service" key={item.id}
                                 onClick={() => this.handleOfferClick(item.title)}
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