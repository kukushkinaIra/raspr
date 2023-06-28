import React from 'react';
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from "react-icons/md";


export default class ManagementTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            orders: [],
            managers: [],
            expandedRow: null
        };
    }

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId
        }));
    };

    componentDidMount() {
        fetch("/orders/notAssigned")
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        orders: data,
                    })
                },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )

        fetch("/users/managers")
            .then(res => res.json())
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
                console.error('Произошла ошибка:', error);
            });
    };

    handleSelect(orderId) {
        // document.getElementById("button_" + orderId).disabled = false;
    }

    render() {
        const {error, orders, managers, expandedRow} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }
        return (
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
        )
    }
}