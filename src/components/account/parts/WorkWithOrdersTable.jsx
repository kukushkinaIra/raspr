import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import {RxCheck, RxCross2} from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {IoMdSearch} from "react-icons/io";
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import {GrRefresh} from "react-icons/gr";
import buildContractBlock from "./BuilderContract";
import buildShortInfoBlock from "./BuildShortInfoBlock";
import buildPaymentsBlock from "./BuildPaymentsBlock";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class WorkWithOrdersTable extends React.Component {

    constructor(props) {
        super(props);
        this.noteRef = React.createRef();
        this.state = {
            error: null,
            expandedRow: null,
            orders: [],
            show: false,
            modalBody: <div></div>,
            note: null,
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
        const managerId = localStorage.getItem('id')
        const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DDTHH:mm:ss') : '';
        const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DDTHH:mm:ss') : '';
        const url = `/orders/manager/${managerId}?search=${encodeURIComponent(search)}&page=${currentPage}&size=${pageSize}&sort=${encodeURIComponent(sortParams)}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
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


    handleRejectOrder(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Опишите причину отказа</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.rejectOrder(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    handleAcceptOrder(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Примечание</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.acceptOrder(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    handleAcceptPayment(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Примечание к платежу</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.acceptPayment(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    handleRejectPayment(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Опишите причину отказа</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.rejectPayment(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    handleCompleteOrder(order) {
        this.setState({
            show: true,
            modalBody: (<div>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставьте комментарий клиенту</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="reject-note">
                                <Form.Label>Примечание</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref={this.noteRef}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            order.note = this.noteRef.current.value;
                            this.completeOrder(order);
                            this.setState({
                                show: false,
                                modal: <div></div>
                            });
                        }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </div>
            )
        })
    }

    fetchActionRequest(order) {
        const requestBody = {
            status: order.status,
            note: order.note
        }
        fetch(`/orders/${order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
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

    acceptOrder(order) {
        order.status = "ACCEPTED";
        this.fetchActionRequest(order);
    }

    acceptPayment(order) {
        order.status = "PAYMENT_DONE";
        this.fetchActionRequest(order);
    }

    rejectPayment(order) {
        order.status = "PAYMENT_REJECTED";
        this.fetchActionRequest(order);
    }

    rejectOrder(order) {
        order.status = "REJECTED";
        this.fetchActionRequest(order)
    }

    completeOrder(order) {
        order.status = "COMPLETED";
        this.fetchActionRequest(order)
    }

    buildStatusColumn(order) {
        switch (order.status) {
            case "REVIEW":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button"
                                onClick={() => this.handleAcceptOrder(order)}>Одобрить</button>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "ACCEPTED":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "REJECTED":
                return "Отклонён"
            case "PAYMENT_REVIEW":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "PAYMENT_DONE":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "PAYMENT_REJECTED":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "MEETING_WAITING":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button"
                                onClick={() => this.handleCompleteOrder(order)}>Завершить</button>
                        <button className="table-white-button"
                                onClick={() => this.handleRejectOrder(order)}>Отклонить</button>
                </span>
                )
            case "COMPLETED":
                return "Завершён"
            default:
                return "Неизвестно"
        }
    }

    buildPaymentColumn(order) {
        const lastPayment = order.payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        switch (lastPayment.status) {
            case "UNAVAILABLE":
                return "Недоступна";
            case "AVAILABLE":
                return "Ожидание";
            case "REVIEW":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button"
                                onClick={() => this.handleAcceptPayment(order)}><RxCheck/></button>
                        <button className="table-yellow-button"
                                onClick={() => this.handleRejectPayment(order)}><RxCross2/></button>
                        </span>
                );
            case "REJECTED":
                return "Недоступна";
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

        paymentBlock = buildPaymentsBlock(payments)

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
                    <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                        {this.state.modalBody}
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
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Наименование услуги</th>
                            <th>Email</th>
                            <th>Статус заказа</th>
                            <th>Оплата</th>
                            <th>Дата создания</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <React.Fragment key={order.id}>
                                <tr>
                                    <td>{order.id}</td>
                                    <td onClick={() => this.toggleRow(order.id)}>
                                         <span className="arrow-icon">
                                         {expandedRow === order.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {order.user.fullname}</td>
                                    <td>{order.offer.title}</td>
                                    <td>{order.user.email}</td>
                                    <td>{this.buildStatusColumn(order)}</td>
                                    <td>{this.buildPaymentColumn(order)}</td>
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
