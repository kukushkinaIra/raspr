import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import {RxCheck, RxCross2} from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class WorkWithOrdersTable extends React.Component {

    constructor(props) {
        super(props);
        this.noteRef = React.createRef();
        this.state = {
            error: null,
            isLoaded: false,
            expandedRow: null,
            orders: [],
            show: false,
            modalBody: <div></div>,
            note: null
        };
    }

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId
        }));
    };

    componentDidMount() {
        const managerId = 21;
        fetch(`http://213.109.204.76:8080/orders/manager/${managerId}`)
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        orders: data,
                        isLoading: false,
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
    handleRejectOrder(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Опишите причину отказа</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.rejectOrder(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    handleAcceptOrder(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Примечание</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.acceptOrder(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }
    handleAcceptPayment(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Примечание к платежу</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.acceptPayment(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    handleRejectPayment(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Опишите причину отказа</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.rejectPayment(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    handleCompleteOrder(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Примечание</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.completeOrder(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }
    fetchActionRequest(order){
        const requestBody = {
            status: order.status,
            note: order.note
        }
        fetch(`http://213.109.204.76:8080/orders/${order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())
            .then(
                data => {
                    const updatedOrder = data;
                    this.setState(prevState => ({
                        orders: prevState.orders.map(orderItem => {
                            if (orderItem.id === updatedOrder.id) {
                                return updatedOrder;
                            }
                            return orderItem;
                        })
                    }));
                })
            .catch(error => {
                this.setState({
                    error
                });
            });
    }
    acceptOrder(order) {
        order.status = "ACCEPTED";
        this.fetchActionRequest(order);
    }

    acceptPayment(order) {
        order.status = "PAYMENT_DONE";
        this.fetchActionRequest(order);
    }

    rejectPayment(order) {
        order.status = "PAYMENT_REJECTED";
        this.fetchActionRequest(order);
    }

    rejectOrder(order) {
        order.status = "REJECTED";
        this.fetchActionRequest(order)
    }

    completeOrder(order) {
        order.status = "COMPLETED";
        this.fetchActionRequest(order)
    }
    buildStatusColumn(order) {
        switch (order.status) {
            case "REVIEW":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button"
                                onClick={() => this.handleAcceptOrder(order)}>Одобрить</button>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "ACCEPTED":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "REJECTED":
                return "Отклонён"
            case "PAYMENT_REVIEW":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "PAYMENT_DONE":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "PAYMENT_REJECTED":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "MEETING_WAITING":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button"
                                onClick={() => this.handleCompleteOrder(order)}>Завершить</button>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "COMPLETED":
                return "Завершён"
            default:
                return "Неизвестно"
        }
    }
    buildPaymentColumn(order) {
        const lastPayment = order.payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        switch (lastPayment.status) {
            case "UNAVAILABLE":
                return "Недоступна";
            case "AVAILABLE":
                return "Ожидание";
            case "REVIEW":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button"
                                onClick={() => this.handleAcceptPayment(order)}><RxCheck/></button>
                        <button className="table-yellow-button"
                                onClick={() => this.handleRejectPayment(order)}><RxCross2/></button>
                        </span>
                );
            case "REJECTED":
                return "Недоступна";
        }
    }




    render() {

        const {error, isLoaded, orders, expandedRow} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                        {this.state.modalBody}
                    </Modal>
                    <Table responsive striped hover>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Наименование услуги</th>
                            <th>Email</th>
                            <th>Статус заказа</th>
                            <th>Оплата</th>
                            <th>Дата создания</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(item => (
                            <React.Fragment key={item.id}>
                                <tr onClick={() => this.toggleRow(item.id)}>
                                    <td>{item.id}</td>
                                    <td>
                                         <span className="arrow-icon">
                                         {expandedRow === item.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {item.user.firstname} {item.user.lastname}</td>
                                    <td>{item.offer.title}</td>
                                    <td>{item.user.email}</td>
                                    <td>{this.buildStatusColumn(item)}</td>
                                    <td>{this.buildPaymentColumn(item)}</td>
                                    <td>{new Date(Date.parse(item.createdAt)).toLocaleString()}</td>
                                </tr>
                                {expandedRow === item.id && (
                                    <tr className="expanded_row">
                                        <td colSpan={7}>
                                            Дополнительная информация
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}
