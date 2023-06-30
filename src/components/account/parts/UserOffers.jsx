import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
            modalContent: <FormGuaranteeLetter/>
        };
    }


    componentDidMount() {
        const userId = localStorage.getItem("id");
        fetch(`/offers/user/${userId}`)
            .then(res => res.json())
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

    handleOfferClick(title) {
        switch (title) {
            case "Гарантийное письмо": {
                this.setState({
                    show: true,
                    modalContent: <FormGuaranteeLetter/>
                });
                break;
            }
            case "Распределение": {
                this.setState({
                    show: true,
                    modalContent: <FormContract/>
                });
                break;
            }
            case "Перераспределение": {
                this.setState({
                    show: true,
                    modalContent: <FormContract/>
                });
                break;
            }
            case "Практика": {
                this.setState({
                    show: true,
                    modalContent: <FormGuaranteeLetter/>
                });
                break;
            }
            default:
                break;
        }
    }

    render() {
        const {error, isLoaded, offers, show, modalContent} = this.state;

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
                        <Modal show={show} onHide={() => this.setState({show: false})}>
                            <Modal.Header closeButton>
                                <Modal.Title>Заполните данные</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {modalContent}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => this.setState({show: false})}>
                                    Подтвердить
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            );
        }
    }
}