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
                            <th>Статус оплаты</th>
                            <th>Примечания</th>
                            <th>Дата заказа</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map(item => (
                            <React.Fragment key={item.id}>
                                <tr onClick={() => this.toggleRow(item.id)}>
                                    <td>
                                        <span className="arrow-icon">
                                         {expandedRow === item.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {item.offer.title}</td>
                                    {item.status === "REVIEW" &&
                                        <td>
                                            В обработке
                                        </td>
                                    }
                                    {item.status === "ACCEPTED" &&
                                        <td>
                                            Ожидание платежа
                                        </td>
                                    }
                                    <td>
                                        {item.payments.map(pay => (
                                            <p>
                                                {pay.status === "UNAVAILABLE" &&
                                                    <span>Недоступно</span>
                                                }
                                            </p>
                                        ))}
                                    </td>
                                    <td>Менеджер проверяет ваш заказ</td>
                                    <td>03.09.2023</td>
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