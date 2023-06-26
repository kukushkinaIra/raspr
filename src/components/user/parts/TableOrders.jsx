import React from 'react';
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';


export default class TableOrders extends React.Component {

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

    buildPaymentColumn(item) {
        const lastPayment = item.payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        switch (lastPayment.status) {
            case "UNAVAILABLE":
                return <button className="table-white-button" disabled>Оплатить</button>;
            case "AVAILABLE":
                return <button className="table-yellow-button">Оплатить</button>;
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

        const {error, isLoaded, content, expandedRow} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <Table responsive striped hover>
                        <thead>
                        <tr>
                            <th>Наименование услуги</th>
                            <th>Статус заказа</th>
                            <th>Оплата</th>
                            <th>Примечания</th>
                            <th>Дата заказа</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map(item => (
                            <React.Fragment key={item.id}>
                                <tr onClick={() => this.toggleRow(item.id)}>
                                    <td style={{'text-wrap':'nowrap'}}>
                                        <span className="arrow-icon">
                                         {expandedRow === item.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {item.offer.title}</td>
                                    <td>{this.parseOrderStatus(item.status)}</td>
                                    <td>{this.buildPaymentColumn(item)}</td>
                                    <td>{item.note}</td>
                                    <td>{new Date(Date.parse(item.createdAt)).toLocaleString()}</td>
                                </tr>
                                {expandedRow === item.id && (
                                    <tr className="expanded_row">
                                        <td colSpan={5}>
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