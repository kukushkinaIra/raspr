import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import {IoMdSearch} from "react-icons/io";
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import {GrRefresh} from "react-icons/gr";
import BuildContractBlock from "./expandedRowBuilders/BuilderContract";
import BuildShortInfoBlock from "./expandedRowBuilders/BuildShortInfoBlock";
import BuildPaymentsBlock from "./expandedRowBuilders/BuildPaymentsBlock";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class OrdersHistoryTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            expandedRow: null,
            orders: [],
            search: '',
            currentPage: 0,
            totalPages: 0,
            pageSize: 10,
            sortParams: 'createdAt,desc',
            startDate: null,
            endDate: null,
        };
    }

    handleSearchChange = (e) => {
        this.setState({search: e.target.value});
    };

    handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        this.setState(
            {
                pageSize: newSize,
                currentPage: 0,
            },
            () => {
                this.fetchOrders();
            }
        );
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.fetchOrders();
    };

    handleRefresh = () => {
        this.fetchOrders();
    };

    handleStartDateChange = (date) => {
        this.setState({startDate: date});
    };

    handleEndDateChange = (date) => {
        this.setState({endDate: date});
    };

    handlePageChange = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber,
            },
            () => {
                this.fetchOrders();
            }
        );
    };


    goToPreviousPage = () => {
        const {currentPage} = this.state;
        if (currentPage > 0) {
            this.handlePageChange(currentPage - 1);
        }
    };

    goToNextPage = () => {
        const {currentPage, totalPages} = this.state;
        if (currentPage < totalPages - 1) {
            this.handlePageChange(currentPage + 1);
        }
    };

    renderPageNumbers() {
        const {currentPage, totalPages} = this.state;
        const pageNumbers = [];

        for (let i = Math.max(0, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
            pageNumbers.push(
                <a
                    key={i}
                    className={`pagination-link ${i === currentPage ? 'active' : ''}`}
                    onClick={() => this.handlePageChange(i)}
                    href="#"
                >
                    {i + 1}
                </a>
            );
        }

        return pageNumbers;
    }

    handleSortChange = (e) => {
        const value = e.target.value;
        this.setState(
            {
                sortParams: value,
                currentPage: 0,
            },
            () => {
                this.fetchOrders();
            }
        );
    };

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId
        }));
    };

    fetchOrders = () => {
        const {search, currentPage, pageSize, sortParams, startDate, endDate} = this.state;
        const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DDTHH:mm:ss') : '';
        const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DDTHH:mm:ss') : '';
        const url = `/orders?search=${encodeURIComponent(search)}&page=${currentPage}&size=${pageSize}&sort=${encodeURIComponent(sortParams)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
        fetch(url)
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
                (data) => {
                    if (data.content) {
                        this.setState({
                            orders: data.content,
                            totalPages: data.totalPages,
                            isLoading: false,
                        });
                    } else {
                        console.log("Нет данных");
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentDidMount() {
        this.fetchOrders();
    }

    getPrice(payments) {
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

    buildExpandedRow(order) {
        let contractBlock = (<div hidden></div>), shortInfoBlock = (<div hidden></div>),
            paymentBlock = (<div hidden></div>);
        if (order.contract) {
            const contract = order.contract;
            contractBlock = BuildContractBlock(contract, this.props.id, this.props.setId, this.props.setRole, this.props.navigate)
        }
        if (order.shortInfo) {
            const shortInfo = order.shortInfo;
            shortInfoBlock = BuildShortInfoBlock(shortInfo, order.id, this.props.id, this.props.setId, this.props.setRole, this.props.navigate)
        }
        const payments = order.payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (payments) {
            paymentBlock = BuildPaymentsBlock(payments, this.props.id, this.props.setId, this.props.setRole, this.props.navigate)
        }

        return (<tr className="expanded_row">
                <td colSpan={4}>
                    {contractBlock}
                    {shortInfoBlock}
                </td>
                <td colSpan={3}>
                    {paymentBlock}
                </td>
            </tr>
        );
    }

    render() {
        const {
            error,
            orders,
            expandedRow,
            search,
            currentPage,
            totalPages,
            pageSize,
            sortParams,
            startDate,
            endDate
        } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div className="table-container">
                    <div className="table-container-header">
                        <form className="table-search-form" onSubmit={this.handleSearchSubmit}>
                            <input
                                type="text"
                                value={search}
                                onChange={this.handleSearchChange}
                                placeholder="Ключевое слово"
                            />
                            <button className="table-search-button" type="submit"><IoMdSearch/> Поиск</button>
                        </form>
                        <select value={sortParams} onChange={this.handleSortChange} className="table-sort-select">
                            <option value="offer.price,asc"> Цена &#9660; </option>
                            <option value="offer.price,desc"> Цена &#9650;</option>
                            <option value="user.fullname,asc"> ФИО &#9660;</option>
                            <option value="user.fullname,desc"> ФИО &#9650;</option>
                            <option value="user.email,asc"> Email &#9660;</option>
                            <option value="user.email,desc"> Email &#9650;</option>
                            <option value="id,asc"> Id &#9660;</option>
                            <option value="id,desc"> Id &#9650;</option>
                            <option value="createdAt,desc"> Создание &#9660;</option>
                            <option value="createdAt,asc"> Создание &#9650;</option>
                        </select>
                        <span>Период:</span>
                        <DatePicker
                            selected={startDate}
                            onChange={this.handleStartDateChange}
                            dateFormat="dd.MM.yyyy"
                            className="date-picker"
                            placeholderText="Начальная дата"
                        />
                        <span>-</span>
                        <DatePicker
                            selected={endDate}
                            onChange={this.handleEndDateChange}
                            dateFormat="dd.MM.yyyy"
                            className="date-picker"
                            placeholderText="Конечная дата"
                        />
                        <button className="table-refresh-button" onClick={this.handleRefresh}>
                            <GrRefresh/>
                        </button>
                    </div>
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
                        {orders.map(order => (
                            <React.Fragment key={order.id}>
                                <tr onClick={() => this.toggleRow(order.id)}>
                                    <td>{order.id}</td>
                                    <td>
                                        <span className="arrow-icon">
                                         {expandedRow === order.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {order.user.fullname}</td>
                                    <td>{order.offer.title}</td>
                                    <td>{this.getPrice(order.payments)}</td>
                                    <td>{order.user.email}</td>
                                    <td>{this.parseOrderStatus(order.status)}</td>
                                    <td>{new Date(Date.parse(order.createdAt)).toLocaleString()}</td>
                                </tr>
                                {expandedRow === order.id && (this.buildExpandedRow(order))}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </Table>
                    <div className="table-container-footer">
                        <div className="pagination-container">
                            <a
                                className={`pagination-link ${currentPage === 0 ? 'disabled' : ''}`}
                                onClick={this.goToPreviousPage}
                                href="#"
                            >
                                <RiArrowLeftDoubleFill/>
                            </a>
                            {this.renderPageNumbers()}
                            <a
                                className={`pagination-link ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                                onClick={this.goToNextPage}
                                href="#"
                            >
                                <RiArrowRightDoubleFill/>
                            </a>
                            <div className="page-size-block">
                                <span>Кол-во: </span>
                                <select className="page-size-select" value={pageSize}
                                        onChange={this.handlePageSizeChange}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
