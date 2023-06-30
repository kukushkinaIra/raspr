import React from 'react';
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from "react-icons/md";
import {IoMdSearch} from "react-icons/io";
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import {GrRefresh} from "react-icons/gr";


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
            pageSize: 10,
            sortParams: 'createdAt,desc'
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
        const {search, currentPage, pageSize, sortParams} = this.state;
        const url = `/orders/notAssigned`;
        fetch(url)
            .then((res) => res.json())
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
                        // content: data.content,
                        totalPages: data.totalPages,
                        isLoading: false,
                        orders: data
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
            contractBlock = (
                <div>
                    <div className="expanded_info_div"><b>ФИО полностью:</b> soon...</div>
                    <div className="expanded_info_div"><b>Телефон:</b> soon...</div>
                    <div className="expanded_info_div"><b>Дата начала:</b> {contract.startDate}</div>
                    <div className="expanded_info_div"><b>Дата окончания:</b> {contract.endDate}</div>
                    <div className="expanded_info_div"><b>Должности:</b> {contract.position}</div>
                    <div className="expanded_info_div"><b>Адрес проживания:</b> {contract.addressActual}</div>
                    <div className="expanded_info_div"><b>Адрес прописки:</b> {contract.addressResidence}</div>
                    <div className="expanded_info_div"><b>Серия и номер пасспорта:</b> {contract.passport.number}</div>
                    <div className="expanded_info_div"><b>Идентификационный номер
                        паспорта:</b> {contract.passport.identification}</div>
                    <div className="expanded_info_div"><b>Фото пасспорта:</b> soon...</div>
                    <div className="expanded_info_div"><b>Дата выдачи пасспорта:</b> {contract.passport.issueDate}</div>
                    <div className="expanded_info_div"><b>Дата окончания паспорта:</b> {contract.passport.expiryDate}
                    </div>
                    <div className="expanded_info_div"><b>Орган, выдавший пасспорт:</b> {contract.passport.authority}
                    </div>
                    <div className="expanded_info_div"><b>Университет:</b> {contract.institution.name}</div>
                    <div className="expanded_info_div"><b>Факультет:</b> {contract.institution.faculty}</div>
                    <div className="expanded_info_div"><b>Специальность:</b> {contract.institution.specoality}</div>
                    <div className="expanded_info_div"><b>Руководитель группы:</b> soon...</div>
                    <div className="expanded_info_div"><b>Староста:</b> soon...</div>
                    <div className="expanded_info_div"><b>ФИО в родительном
                        падаже:</b> {contract.fullnameCases.genitiveCase}</div>
                    <div className="expanded_info_div"><b>ФИО в дательном
                        падеже:</b> {contract.fullnameCases.dativeCase}</div>
                    <div className="expanded_info_div"><b>ФИО в творительном
                        падеже:</b> {contract.fullnameCases.instrumentalCase}</div>
                    <div className="expanded_info_div"><b>Фамилия И.О:</b> {contract.fullnameCases.abbreviation}</div>
                </div>
            )
        }
        if (order.shortInfo) {
            const shortInfo = order.shortInfo;
            shortInfoBlock = (
                <div>
                    <div className="expanded_info_div"><b>ФИО полностью:</b> {shortInfo.fullname}</div>
                    <div className="expanded_info_div"><b>Университет:</b> {shortInfo.institution}</div>
                    <div className="expanded_info_div"><b>Специальность:</b> {shortInfo.speciality}</div>
                    <div className="expanded_info_div"><b>Получатель:</b> {shortInfo.recipient}</div>
                    <div className="expanded_info_div"><b>Должность получателя:</b> {shortInfo.recipientPosition}</div>
                    <div className="expanded_info_div"><b>Бланк:</b> soon...</div>
                </div>
            )
        }
        return (<tr className="expanded_row">
                <td colSpan={7}>
                    {contractBlock}
                    {shortInfoBlock}
                </td>
            </tr>
        );
    }

    handleAssignManager = (orderId) => {
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
                    throw new Error('Ошибка при назначении менеджера');
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
    };

    handleSelect(orderId) {
        // document.getElementById("button_" + orderId).disabled = false;
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
            pageSize,
            sortParams
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
                        <button className="table-search-button" type="submit"><IoMdSearch/> Поиск</button>
                    </form>
                    <select value={sortParams} onChange={this.handleSortChange} className="table-sort-select">
                        <option value="offer.price,asc"> Цена &#9660; </option>
                        <option value="offer.price,desc"> Цена &#9650;</option>
                        <option value="user.fullname,asc"> ФИО &#9660;</option>
                        <option value="user.fullname,desc"> ФИО &#9650;</option>
                        <option value="user.email,asc"> Email &#9660;</option>
                        <option value="user.email,desc"> Email &#9650;</option>
                    </select>
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
                                        <select className="manager-select" required id={"select_" + item.id}
                                                onChange={() => this.handleSelect(item.id)}>
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
            </div>
        )
    }
}