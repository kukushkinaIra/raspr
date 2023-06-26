import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';

export default class OrdersHistoryTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            expandedRow: null,
            content: []
        };
    }

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId
        }));
    };

    componentDidMount() {
        fetch("http://213.109.204.76:8080/orders")
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        content: data.content,
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

    getPrice(payments){
        const lastPayment = payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        return lastPayment.price;
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

        const {error, isLoaded, content, expandedRow} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <Table responsive striped hover>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Услуга</th>
                            <th>Цена (руб.)</th>
                            <th>Email</th>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map(item => (
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
                                    <td>{this.getPrice(item.payments)}</td>
                                    <td>{item.user.email}</td>
                                    <td>{this.parseOrderStatus(item.status)}</td>
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
