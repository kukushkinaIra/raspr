import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import jsPDF from "jspdf";
import {renderToString} from "react-dom/server";
import '../../../fonts/pdf/Montserrat-Regular-normal.js';
import '../../../fonts/pdf/Montserrat-SemiBold-bold.js';
import {IoMdSearch} from "react-icons/io";
import {GrRefresh} from "react-icons/gr";
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import buildUserInfo from "./expandedRowBuilders/BuildUserInfo";
import BuildQuestionnaire from "./expandedRowBuilders/BuilderQuestionnaire";
import BuildPaymentsBlock from "./expandedRowBuilders/BuildPaymentsBlock";
import BuildShortInfoBlock from "./expandedRowBuilders/BuildShortInfoBlock";
import BuildContractBlock from "./expandedRowBuilders/BuilderContract";


export default class ClientsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            expandedRow: null,
            users: [],
            search: '',
            currentPage: 0,
            totalPages: 0,
            pageSize: 10,
            sortParams: 'fullname,asc',
        };
    }

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId,
        }));
    };

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
                this.fetchUsers();
            }
        );
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.fetchUsers();
    };

    handleRefresh = () => {
        this.fetchUsers();
    };

    handlePageChange = (pageNumber) => {
        this.setState(
            {
                currentPage: pageNumber,
            },
            () => {
                this.fetchUsers();
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
                this.fetchUsers();
            }
        );
    };


    fetchUsers = () => {
        const {search, currentPage, pageSize, sortParams} = this.state;
        const url = `/users?search=${encodeURIComponent(search)}&page=${currentPage}&size=${pageSize}&sort=${encodeURIComponent(sortParams)}`;

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
                            users: data.content,
                            totalPages: data.totalPages,
                            isLoading: false,
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
    }


    componentDidMount() {
        this.fetchUsers();
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


    buildExpandedRow(user) {
        let userBlock, questionnaireBlock = (<div hidden></div>);

        userBlock = buildUserInfo(user)

        if (user.questionnaire.gender) {
            const questionnaire = user.questionnaire;
            questionnaireBlock = BuildQuestionnaire(questionnaire)
        }

        return (<tr className="expanded_row">
                <td colSpan={4}>
                    {userBlock}
                </td>
                <td colSpan={3}>
                    {questionnaireBlock}
                </td>
            </tr>
        );
    }

    buildOrderInfoBlock(order) {
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

        return (<tr>
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


    buildFullUserInfo(user) {
        let userBlock, questionnaireBlock = (<div hidden></div>), ordersBlock = (<div hidden></div>);
        userBlock = buildUserInfo(user)

        const orders = user.orders;
        if (orders.length !== 0) {
            ordersBlock = (
                <tr>
                    {orders.map(order => this.buildOrderInfoBlock(order))}
                </tr>)
        }


        if (user.questionnaire.gender) {
            const questionnaire = user.questionnaire;
            questionnaireBlock = BuildQuestionnaire(questionnaire)
        }

        return (
            <table>
                <thead>
                <tr>
                    <td colSpan={7}></td>
                </tr>
                </thead>
                <tbody>
                <tr className="expanded_row">
                    <td colSpan={4}>
                        {userBlock}
                    </td>
                    <td colSpan={3}>
                        {questionnaireBlock}
                    </td>
                </tr>
                {ordersBlock}
                </tbody>
            </table>
        );
    }

    buildPdf(user) {
        const doc = new jsPDF();
        const string = `
        <style>
        body * {
            font-family: 'Montserrat',sans-serif;
            font-weight: 400;
        }
        
        b{
        font-family: 'Montserrat', sans-serif;
            padding-right: 10px;
            font-weight: bold;
        }
        .expended_padding_block {
            padding: 0 !important;
        }
        .expanded_info_div {
            padding: 0 10px 0 10px;
        }
        </style>
        
        ${renderToString(this.buildFullUserInfo(user))}`;

        let element = document.createElement('body');
        element.innerHTML = string;
        doc.html(element,
            {
                callback: function (doc) {
                    doc.save("generated.pdf");
                },
                margin: [10, 10, 10, 10],
                autoPaging: 'text',
                x: 0,
                y: 0,
                width: 210,
                windowWidth: 1080
            })
    }


    render() {
        const {error, users, expandedRow, search, currentPage, totalPages, pageSize, sortParams} = this.state;
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
                            <option value="fullname,asc"> ФИО &#9650; </option>
                            <option value="fullname,desc"> ФИО &#9660;</option>
                            <option value="email,asc">Email &#9650;</option>
                            <option value="email,desc">Email &#9660;</option>
                        </select>
                        <button className="table-refresh-button" onClick={this.handleRefresh}>
                            <GrRefresh/>
                        </button>
                    </div>
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
                        {users.map(user => (
                            <React.Fragment key={user.id}>
                                <tr>
                                    <td onClick={() => this.toggleRow(user.id)}>
                                         <span className="arrow-icon">
                                         {expandedRow === user.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {user.fullname}</td>
                                    <td onClick={() => this.toggleRow(user.id)}>{user.firm}</td>
                                    <td onClick={() => this.toggleRow(user.id)}>{user.phoneNumber}</td>
                                    <td onClick={() => this.toggleRow(user.id)}>
                                        {this.getUserInstitution(user.orders)}
                                    </td>
                                    <td onClick={() => this.toggleRow(user.id)}>{user.email}</td>
                                    <td>
                                        <button className="table-download-button"
                                                onClick={() => this.buildPdf(user)}>
                                            pdf
                                        </button>
                                        <button className="table-download-button" disabled={true}>
                                            doc
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === user.id && (this.buildExpandedRow(user))}
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