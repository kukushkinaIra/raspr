import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight, MdSimCardDownload} from 'react-icons/md';

export default class AllClientsTable extends React.Component {

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
        fetch("http://213.109.204.76:8080/users")
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

    getUserInstitution(orders) {
        const order = this.getLatestOrderWithInfo(orders);
        return order ? (order.contract ? order.contract.institution.name : order.shortInfo.institution) : '';
    }

    getLatestOrderWithInfo(orders) {
        const sortedOrders = orders
            .filter(order => order.contract || order.shortInfo)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedOrders[0] || null;
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
                            <th>ФИО</th>
                            <th>Фирма</th>
                            <th>Телефон</th>
                            <th>Университет</th>
                            <th>Email</th>
                            <th>Скачать</th>
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
                                        {item.firstname} {item.lastname}</td>
                                    <td>{item.firm}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        {this.getUserInstitution(item.orders)}
                                    </td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button className="table-download-button">
                                            pdf
                                        </button>
                                        <button className="table-download-button">
                                            doc
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === item.id && (
                                    <tr className="expanded_row">
                                        <td colSpan={6}>
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