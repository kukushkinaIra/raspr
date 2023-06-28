import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';

export default class OrdersHistoryTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
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
                    })
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
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
            contractBlock = (
                <div className="expended_padding_block">
                    <div className="expanded_info_div"><b>ФИО полностью:</b> {contract.fullname}</div>
                    <div className="expanded_info_div"><b>Телефон:</b> {contract.phoneNumber}</div>
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
                    <div className="expanded_info_div"><b>Руководитель группы:</b> {contract.supervisor}</div>
                    <div className="expanded_info_div"><b>Староста:</b> {contract.groupHead}</div>
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
                <div className="expended_padding_block">
                    <div className="expanded_info_div"><b>ФИО полностью:</b> {shortInfo.fullname}</div>
                    <div className="expanded_info_div"><b>Университет:</b> {shortInfo.institution}</div>
                    <div className="expanded_info_div"><b>Специальность:</b> {shortInfo.speciality}</div>
                    <div className="expanded_info_div"><b>Получатель:</b> {shortInfo.recipient}</div>
                    <div className="expanded_info_div"><b>Должность получателя:</b> {shortInfo.recipientPosition}</div>
                    <div className="expanded_info_div"><b>Бланк:</b> soon...</div>
                </div>
            )
        }
        const payments = order.payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        paymentBlock = (
            <div className="expended_padding_block">
                {payments.map(payment => (<div>
                    <div className="expanded_info_div"><b>Id платежа:</b> {payment.id}</div>
                    <div className="expanded_info_div"><b>Сумма к оплате:</b> {payment.price + " руб."}</div>
                    <div className="expanded_info_div"><b>Реквизиты счёта:</b> {payment.targetDetails}</div>
                    <div className="expanded_info_div"><b>Время платежа:</b>
                        {new Date(Date.parse(payment.paymentTime)).toLocaleString()}</div>
                    <div className="expanded_info_div"><b>Квитанция:</b> {payment.receiptText}</div>
                    <div className="expanded_info_div"><b>Квитанция:</b></div>
                    <div>{this.getPaymentImageBlock(payment)}</div>
                    <hr/>
                </div>))}
            </div>
        )

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

    getPaymentImageBlock(payment) {
        if (payment.receiptImage) {
            const url = URL.createObjectURL(new Blob([payment.receiptImage], {type: 'image/png'}));
            return (<img className="payment-receipt-image" src={url} alt="payment_image"/>);
        } else
            return null;
    }

    render() {

        const {error, content, expandedRow} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
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
                        {content.map(order => (
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
                </div>
            );
        }
    }
}
