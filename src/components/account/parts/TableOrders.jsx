import React from 'react';
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {IoMdSearch} from "react-icons/io";
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import {GrRefresh} from "react-icons/gr";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment/moment";
import buildContractBlock from "./expandedRowBuilders/BuilderContract";
import buildShortInfoBlock from "./expandedRowBuilders/BuildShortInfoBlock";
import buildPaymentsBlock from "./expandedRowBuilders/BuildPaymentsBlock";


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
            modal: <div></div>,
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

    handleStartDateChange = (date) => {
        this.setState({startDate: date});
    };

    handleEndDateChange = (date) => {
        this.setState({endDate: date});
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

    renderPageNumbers(){
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

    componentDidMount() {
        this.fetchOrders();
    }

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
                console.log(error.message)
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
                        orders: data.content,
                        totalPages: data.totalPages,
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

    buildExpandedRow(order) {
        let contractBlock = (<div hidden></div>), shortInfoBlock = (<div hidden></div>),
            paymentBlock = (<div hidden></div>);
        if (order.contract) {
            const contract = order.contract;
            contractBlock = buildContractBlock(contract)
        }
        if (order.shortInfo) {
            const shortInfo = order.shortInfo;
            shortInfoBlock = buildShortInfoBlock(shortInfo)
        }
        const payments = order.payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (payments) {
            paymentBlock = buildPaymentsBlock(payments)
        }

        return (<tr className="expanded_row">
                <td colSpan={3}>
                    {contractBlock}
                    {shortInfoBlock}
                </td>
                <td colSpan={3}>
                    {paymentBlock}
                </td>
            </tr>
        );
    }

    getPrice(payments) {
        const lastPayment = payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        return lastPayment.price;
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
                    <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                        {this.state.modal}
                    </Modal>
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
                                    <td>{this.getPrice(order.payments)}</td>
                                    <td>{order.note}</td>
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