import React from 'react';
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export default class TableOrders extends React.Component {

    constructor(props) {
        super(props);
        this.noteRef = React.createRef();
        this.receiptImageRef = React.createRef();
        this.receiptTextRef = React.createRef();
        this.targetDetailsRef = React.createRef();
        this.state = {
            error: null,
            expandedRow: null,
            orders: [],
            show: false,
            modal: <div></div>
        };
    }

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId
        }));
    };

    componentDidMount() {
        fetch("/orders")
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        orders: data.content,
                    })
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    handlePaymentCreate(order, lastPayment) {
        this.setState({
            show: true,
            modal: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оформление платежа</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="target-details">
                                <Form.Label>Реквизиты оплаты</Form.Label>
                                <Form.Select aria-label="Default select example" ref={this.targetDetailsRef}>
                                    <option value="0" disabled selected hidden>Выберите реквизиты оплаты</option>
                                    <option value="1">БНБ-Банк 3001179330001227/9742</option>
                                    <option value="2">Другие реквизиты</option>
                                </Form.Select>
                            </Form.Group>
                            {/*<Form.Group className="mb-3" controlId="note">*/}
                            {/*    <Form.Label>Сумма к оплате</Form.Label>*/}
                            {/*    <Form.Control type="text" className="form-control-text"*/}
                            {/*                  placeholder={lastPayment.price + " руб."}*/}
                            {/*                  disabled*/}
                            {/*                  ref={this.noteRef}*/}
                            {/*    />*/}
                            {/*</Form.Group>*/}
                            <Form.Group className="mb-3" controlId="price">
                                <div className="form-label">Суммма к оплате:</div>
                                <div className="form-control">{lastPayment.price + " руб."}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="receiptImage">
                                <Form.Label>Скриншот/фото квитанции об оплате</Form.Label>
                                <Form.Control
                                    type="file" className="form-control-file" ref={this.receiptImageRef}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="receiptText">
                                <Form.Label>Квитанция об оплате в текстовом виде</Form.Label>
                                <Form.Control as="textarea" className="form-control-file"
                                              rows={6} placeholder="Обязательно в случае отсутствия фотографии"
                                              ref={this.receiptTextRef}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="note">
                                <Form.Label>Примечание</Form.Label>
                                <Form.Control as="textarea" className="form-control-file"
                                              rows={3} placeholder="" ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            lastPayment.note = this.noteRef.current.value;
                            lastPayment.receiptText = this.receiptTextRef.current.value;
                            const file = this.receiptImageRef.current.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                                const arrayBuffer = event.target.result;
                                const uint8Array = new Uint8Array(arrayBuffer);
                                lastPayment.receiptImage = Array.from(uint8Array);
                                lastPayment.targetDetails = this.targetDetailsRef.current.value;
                                console.log(lastPayment.receiptImage);
                                this.createPayment(order.id, lastPayment);
                                this.setState({
                                    show: false,
                                    modal: <div></div>
                                });
                            };
                            reader.readAsArrayBuffer(file);
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    createPayment(orderId, payment) {
        const requestBody = {
            targetDetails: payment.targetDetails,
            receiptImage: payment.receiptImage,
            receiptText: payment.receiptText,
            note: payment.note

        }
        fetch(`/orders/${orderId}/update-payment`, {
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

    buildPaymentColumn(order) {
        const lastPayment = order.payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        switch (lastPayment.status) {
            case "UNAVAILABLE":
                return <button className="table-white-button" disabled>Оплатить</button>;
            case "AVAILABLE":
                return <button className="table-yellow-button"
                               onClick={() => this.handlePaymentCreate(order, lastPayment)}>Оплатить</button>;
            case "REVIEW":
                return "Проверяется";
            case "ACCEPTED":
                return "Завершена";
            case "REJECTED":
                return "Недоступна";
        }
    }

    parseOrderStatus(status) {
        switch (status) {
            case "REVIEW":
                return "В обработке"
            case "ACCEPTED":
                return "Ожидание оплаты"
            case "REJECTED":
                return "Отклонён"
            case "PAYMENT_REVIEW":
                return "Проверка платежа"
            case "PAYMENT_DONE":
                return "Платёж одобрен"
            case "PAYMENT_REJECTED":
                return "Платёж отклонён"
            case "MEETING_WAITING":
                return "Документы готовы"
            case "COMPLETED":
                return "Завершён"
            default:
                return "Неизвестно"
        }
    }


    render() {

        const {error, orders, expandedRow} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                        {this.state.modal}
                    </Modal>
                    <Table responsive striped hover>
                        <thead>
                        <tr>
                            <th>Наименование услуги</th>
                            <th>Статус заказа</th>
                            <th>Оплата</th>
                            <th>Сумма(руб.)</th>
                            <th>Примечания</th>
                            <th>Дата заказа</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <React.Fragment key={order.id}>
                                <tr>
                                    <td onClick={() => this.toggleRow(order.id)} style={{'text-wrap': 'nowrap'}}>
                                        <span className="arrow-icon">
                                         {expandedRow === order.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {order.offer.title}</td>
                                    <td>{this.parseOrderStatus(order.status)}</td>
                                    <td>{this.buildPaymentColumn(order)}</td>
                                    <td>{}</td>
                                    <td>{order.note}</td>
                                    <td>{new Date(Date.parse(order.createdAt)).toLocaleString()}</td>
                                </tr>
                                {expandedRow === order.id && (
                                    <tr className="expanded_row">
                                        <td colSpan={6}>
                                            <div className="expended_padding_block">
                                                Дополнительная информация
                                            </div>
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