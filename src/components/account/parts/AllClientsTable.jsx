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


export default class AllClientsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            expandedRow: null,
            content: [],
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
            .then((res) => {
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
                            content: data.content,
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

    parseUserStatus(status) {
        switch (status) {
            case "PRACTICE": {
                return "На практике";
            }
            case "GUARANTEE": {
                return "Оформил гарантийное письмо";
            }
            case "CONTRACT": {
                return "Подписан контракт";
            }
            case "DEFAULT": {
                return "Простой пользователь";
            }
            default: {
                return "Простой пользователь";
            }
        }
    }

    buildExpandedRow(user) {
        let userBlock, questionnaireBlock = (<div hidden></div>);

        userBlock = (
            <div className="expended_padding_block">
                <div className="expanded_info_div"><b>ФИО полностью:</b> {user.fullname}
                </div>
                <div className="expanded_info_div"><b>Телефон:</b> {user.phoneNumber}</div>
                <div className="expanded_info_div"><b>Телеграм:</b> {user.telegram}</div>
                <div className="expanded_info_div"><b>Инстаграм:</b> {user.instagram}</div>
                <div className="expanded_info_div"><b>Статус:</b> {this.parseUserStatus(user.status)}</div>
                <div className="expanded_info_div"><b>Дата рождения:</b> {user.birthDate}</div>
                <div className="expanded_info_div"><b>Компания:</b> {user.firm}</div>
            </div>)

        if (user.questionnaire.gender) {
            const questionnaire = user.questionnaire;
            questionnaireBlock = (
                <div className="expended_padding_block">
                    <div className="expanded_info_div"><b>Пол: </b> {questionnaire.gender}</div>
                    <div className="expanded_info_div"><b>Возраст: </b> {questionnaire.age}</div>
                    <div className="expanded_info_div"><b>Город: </b> {questionnaire.city}</div>
                    <div className="expanded_info_div"><b>Является студентом: </b> {questionnaire.studentFlag}</div>
                    <div className="expanded_info_div"><b>Университет: </b> {questionnaire.instituition}</div>
                </div>
            )
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
            contractBlock = (
                <div className="expended_padding_block">
                    <div className="expanded_info_div"><b>ФИО полностью:</b> {contract.fullname}</div>
                    <div className="expanded_info_div"><b>Телефон:</b> {contract.phoneNumber}</div>
                    <div className="expanded_info_div"><b>Дата начала:</b> {contract.startDate}</div>
                    <div className="expanded_info_div"><b>Дата окончания:</b> {contract.endDate}</div>
                    <div className="expanded_info_div"><b>Должности:</b> {contract.position}</div>
                    <div className="expanded_info_div"><b>Адрес проживания:</b> {contract.addressActual}</div>
                    <div className="expanded_info_div"><b>Адрес прописки:</b> {contract.addressResidence}</div>
                    <div className="expanded_info_div"><b>Серия и номер пасспорта:</b> {contract.passport.number}
                    </div>
                    <div className="expanded_info_div"><b>Идентификационный номер
                        паспорта:</b> {contract.passport.identification}</div>
                    <div className="expanded_info_div"><b>Фото пасспорта:</b> soon...</div>
                    <div className="expanded_info_div"><b>Дата выдачи пасспорта:</b> {contract.passport.issueDate}
                    </div>
                    <div className="expanded_info_div"><b>Дата окончания
                        паспорта:</b> {contract.passport.expiryDate}
                    </div>
                    <div className="expanded_info_div"><b>Орган, выдавший
                        пасспорт:</b> {contract.passport.authority}
                    </div>
                    <div className="expanded_info_div"><b>Университет:</b> {contract.institution.name}</div>
                    <div className="expanded_info_div"><b>Факультет:</b> {contract.institution.faculty}</div>
                    <div className="expanded_info_div"><b>Специальность:</b> {contract.institution.specoality}</div>
                    <div className="expanded_info_div"><b>Руководитель группы:</b> {contract.supervisor}</div>
                    <div className="expanded_info_div"><b>Староста:</b> {contract.groupHead}</div>
                    <div className="expanded_info_div"><b>ФИО в родительном
                        падаже:</b> {contract.fullnameCases.genitiveCase}</div>
                    <div className="expanded_info_div"><b>ФИО в дательном
                        падеже:</b> {contract.fullnameCases.dativeCase}</div>
                    <div className="expanded_info_div"><b>ФИО в творительном
                        падеже:</b> {contract.fullnameCases.instrumentalCase}</div>
                    <div className="expanded_info_div"><b>Фамилия И.О:</b> {contract.fullnameCases.abbreviation}
                    </div>
                </div>
            )
        }
        if (order.shortInfo) {
            const shortInfo = order.shortInfo;
            shortInfoBlock = (
                <div className="expended_padding_block">
                    <div className="expanded_info_div"><b>ФИО полностью:</b> {shortInfo.fullname}</div>
                    <div className="expanded_info_div"><b>Университет:</b> {shortInfo.institution}</div>
                    <div className="expanded_info_div"><b>Специальность:</b> {shortInfo.speciality}</div>
                    <div className="expanded_info_div"><b>Получатель:</b> {shortInfo.recipient}</div>
                    <div className="expanded_info_div"><b>Должность получателя:</b> {shortInfo.recipientPosition}
                    </div>
                    <div className="expanded_info_div"><b>Бланк:</b> soon...</div>
                </div>
            )
        }
        const payments = order.payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (payments) {
            paymentBlock = (
                <div className="expended_padding_block">
                    {payments.map(payment => (<div>
                        <div className="expanded_info_div"><b>Id платежа:</b> {payment.id}</div>
                        <div className="expanded_info_div"><b>Сумма к оплате:</b> {payment.price + " руб."}</div>
                        <div className="expanded_info_div"><b>Реквизиты счёта:</b> {payment.targetDetails}</div>
                        <div className="expanded_info_div"><b>Время платежа:</b>
                            {new Date(Date.parse(payment.paymentTime)).toLocaleString()}
                        </div>
                        <div className="expanded_info_div"><b>Квитанция:</b> {payment.receiptText}</div>
                        <div className="expanded_info_div"><b>Квитанция:</b></div>
                        <div>{this.getPaymentImageBlock(payment)}</div>
                        <hr/>
                    </div>))}
                </div>
            )
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

    getPaymentImageBlock(payment) {
        if (payment.receiptImage) {
            const url = URL.createObjectURL(new Blob([payment.receiptImage], {type: 'image/png'}));
            return (<img className="payment-receipt-image" src={url} alt="payment_image"/>);
        } else
            return null;
    }

    buildFullUserInfo(user) {
        let userBlock, questionnaireBlock = (<div hidden></div>), ordersBlock = (<div hidden></div>);
        userBlock = (
            <div className="expended_padding_block">
                <div className="expanded_info_div"><b>ФИО полностью:</b> {user.fullname}</div>
                <div className="expanded_info_div"><b>Телефон:</b> {user.phoneNumber}</div>
                <div className="expanded_info_div"><b>Телеграм:</b> {user.telegram}</div>
                <div className="expanded_info_div"><b>Инстаграм:</b> {user.instagram}</div>
                <div className="expanded_info_div"><b>Статус:</b> {this.parseUserStatus(user.status)}</div>
                <div className="expanded_info_div"><b>Дата рождения:</b> {user.birthDate}</div>
                <div className="expanded_info_div"><b>Компания:</b> {user.firm}</div>
            </div>)

        const orders = user.orders;
        if (orders.length !== 0) {
            ordersBlock = (
                <tr>
                    {orders.map(order => this.buildOrderInfoBlock(order))}
                </tr>)
        }


        if (user.questionnaire.gender) {
            const questionnaire = user.questionnaire;
            questionnaireBlock = (
                <div className="expended_padding_block">
                    <div className="expanded_info_div"><b>Пол: </b> {questionnaire.gender}</div>
                    <div className="expanded_info_div"><b>Возраст: </b> {questionnaire.age}</div>
                    <div className="expanded_info_div"><b>Город: </b> {questionnaire.city}</div>
                    <div className="expanded_info_div"><b>Является студентом: </b> {questionnaire.studentFlag}</div>
                    <div className="expanded_info_div"><b>Университет: </b> {questionnaire.instituition}</div>
                </div>
            )
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
        console.log(string);
        element.innerHTML = string;
        console.log(element);
        console.log(doc.getFontList());
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
        const {error, content, expandedRow, search, currentPage, totalPages, pageSize, sortParams} = this.state;
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
                            <th>Фирма</th>
                            <th>Телефон</th>
                            <th>Университет</th>
                            <th>Email</th>
                            <th>Скачать</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map(user => (
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
                                        <button className="table-download-button">
                                            doc
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === user.id && (this.buildExpandedRow(user))}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}