import React from 'react';
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from "react-icons/md";
import {IoMdSearch} from "react-icons/io";
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import {GrRefresh} from "react-icons/gr";
import BuildContractBlock from "./expandedRowBuilders/BuilderContract";
import BuildShortInfoBlock from "./expandedRowBuilders/BuildShortInfoBlock";
import DatePicker from "react-datepicker";
import moment from "moment";


export default class ManagementTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            orders: [],
            managers: [],
            expandedRow: null,
            search: '',
            currentPage: 0,
            totalPages: 0,
            totalElements: 0,
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
        const url = `/orders/notAssigned?search=${encodeURIComponent(search)}&page=${currentPage}&size=${pageSize}&sort=${encodeURIComponent(sortParams)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

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
                    this.setState({
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        isLoading: false,
                        orders: data.content
                    });
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
        fetch("/users/managers")
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
                        managers: data,
                    })
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    }

    buildExpandedRow(order) {
        let contractBlock = (<div hidden></div>), shortInfoBlock = (<div hidden></div>);
        if (order.contract) {
            const contract = order.contract;
            contractBlock = BuildContractBlock(contract, this.props.id, this.props.setId, this.props.setRole, this.props.navigate);
        }
        if (order.shortInfo) {
            const shortInfo = order.shortInfo;
            shortInfoBlock = BuildShortInfoBlock(shortInfo, order.id, this.props.id, this.props.setId, this.props.setRole, this.props.navigate);
        }
        return (<tr className="expanded_row">
                <td colSpan={7}>
                    {contractBlock}
                    {shortInfoBlock}
                </td>
            </tr>
        );
    }

    handleAssignManager(orderId) {

        const managerId = document.getElementById("select_" + orderId).value;
        if (managerId === '') {
            return;
        }
        fetch(`/orders/${orderId}/assign/${managerId}`, {
            method: 'PATCH'
        })
            .then((response) => {
                if (response.ok) {
                    const filteredOrders = this.state.orders.filter((order) => order.id !== orderId);
                    this.setState({orders: filteredOrders});
                } else {
                    throw new Error(response.status);
                }
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
            });
    }

    render() {
        const {
            error,
            orders,
            managers,
            expandedRow,
            search,
            currentPage,
            totalPages,
            totalElements,
            pageSize,
            sortParams,
            startDate,
            endDate
        } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }
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
                    {/*<span className="table-header-period-span">Период:</span>*/}
                    <DatePicker
                        selected={startDate}
                        onChange={this.handleStartDateChange}
                        dateFormat="dd.MM.yyyy"
                        className="date-picker"
                        placeholderText="Начало периода"
                    />
                    {/*<span className="table-header-period-span">-</span>*/}
                    <DatePicker
                        selected={endDate}
                        onChange={this.handleEndDateChange}
                        dateFormat="dd.MM.yyyy"
                        className="date-picker"
                        placeholderText="Конец периода"
                    />
                    <button className="table-search-button" type="submit"><IoMdSearch/> Поиск</button>
                    <button className="table-refresh-button" onClick={this.handleRefresh}>
                        <GrRefresh/>
                    </button>
                </div>
                <Table responsive striped hover>
                    <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Услуга</th>
                        <th>№ заказа</th>
                        <th>Email</th>
                        <th>Менеджер</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(item => (
                        <React.Fragment key={item.id}>
                            <tr>
                                <td onClick={() => this.toggleRow(item.id)}>
                                         <span className="arrow-icon">
                                         {expandedRow === item.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                    {item.user.fullname}</td>
                                <td>{item.offer.title}</td>
                                <td>{item.id}</td>
                                <td>{item.user.email}</td>
                                <td>
                                    <div>
                                        <select className="manager-select" required id={"select_" + item.id}>
                                            <option disabled selected hidden value="">Выбрать</option>
                                            {managers.map(manager => (
                                                <option key={manager.id} value={manager.id}>
                                                    {manager.email}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="table-yellow-button"
                                        id={"button_" + item.id}
                                        onClick={() => this.handleAssignManager(item.id)}
                                    >
                                        Назначить
                                    </button>
                                </td>
                            </tr>
                            {expandedRow === item.id && (this.buildExpandedRow(item))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </Table>
                <div className="table-container-footer">
                    <div className="total-elements-container">
                        Найдено заказов: {totalElements}
                    </div>
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
        )
    }
}