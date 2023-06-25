import React from 'react';
import Table from 'react-bootstrap/Table';


export default class ManagementTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            orders: [],
            managers: []
        };
    }

    componentDidMount() {
        fetch("http://213.109.204.76:8080/orders/notAssigned")
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

        fetch("http://213.109.204.76:8080/users/managers")
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

    handleAssignManager = (orderId) => {
        const managerId = document.getElementById("select_" + orderId).value;
        if (managerId==='') {
            console.log("Менеджер не выбран");
            return;
        }
        fetch(`http://213.109.204.76:8080/orders/${orderId}/assign/${managerId}`, {
            method: 'PATCH'
        })
            .then((response) => {
                if (response.ok) {
                    const filteredOrders = this.state.orders.filter((order) => order.id !== orderId);
                    this.setState({orders: filteredOrders});
                    console.log('Менеджер назначен');
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
        const {error, orders, managers} = this.state;
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
                {orders.map(item =>
                    <tr>
                        <td>{item.user.firstname} {item.user.lastname}</td>
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
                                            {manager.firstname}
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
                )}
                </tbody>
            </Table>
        )

        // {data.map(item =>{
        //     console.log(item)

        //         for (let key in item) {
        //             return (
        //                 // console.log(item["managerId"])
        //             );
        //         }
        // })}

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }
        // else {
        //   return (
        //     <div>

        //     </div>
        //   );
        // }
    }
}