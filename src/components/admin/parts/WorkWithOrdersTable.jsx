import React from "react";
// import {makeStyles} from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TablePagination from "@material-ui/core/TablePagination";
// import Paper from "@material-ui/core/Paper";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';
import {RxCheck, RxCross2} from "react-icons/rx";


//
// const useStyles = makeStyles({
//     table: {
//         minWidth: 650
//     }
// });
//
// function createData(name, service, order_number, email, manager) {
//     return {name, service, order_number, email, manager};
// }
//
// const rows = [
//     createData("Гуревич Алексей ", "Гарантийное письмо", 6.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 9.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 16.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 6.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 9.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 16.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 6.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 9.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 16.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 6.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 9.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 16.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 6.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 9.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина"),
//     createData("Гуревич Алексей ", "Гарантийное письмо", 16.0, "lorem_ipsum_ipsum@gmail.com", "Екатерина")
// ];

// export default function SimpleTable() {
//     const classes = useStyles();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = event => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//     const emptyRows =
//         rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
//
//     return (
//         <TableContainer className="orders" component={Paper}>
//             <Table responsive striped hover className={classes.table} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>ФИО</TableCell>
//                         <TableCell align="left">Услуга</TableCell>
//                         <TableCell align="left">№ заказа</TableCell>
//                         <TableCell align="left">Email</TableCell>
//                         <TableCell align="left">Менеджер</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows
//                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         .map((row, index) => (
//                             <TableRow key={row.name}>
//                                 <TableCell component="th" scope="row">
//                                     {row.name}
//                                 </TableCell>
//                                 <TableCell align="left">{row.service}</TableCell>
//                                 <TableCell align="left">{row.order_number}</TableCell>
//                                 <TableCell align="left">{row.email}</TableCell>
//                                 <TableCell align="left">{row.manager}</TableCell>
//                             </TableRow>
//                         ))}
//                     {emptyRows > 0 && (
//                         <TableRow style={{height: 53 * emptyRows}}>
//                             <TableCell colSpan={6}/>
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={rows.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onChangePage={handleChangePage}
//                 onChangeRowsPerPage={handleChangeRowsPerPage}
//             />
//         </TableContainer>
//     );
// }

export default class WorkWithOrdersTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            expandedRow: null,
            orders: []
        };
    }

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId
        }));
    };

    componentDidMount() {
        const managerId = 21;
        fetch(`http://213.109.204.76:8080/orders/manager/${managerId}`)
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        orders: data,
                        isLoading: false,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    buildPaymentColumn(item) {
        const lastPayment = item.payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        switch (lastPayment.status) {
            case "UNAVAILABLE":
                return "Недоступна";
            case "AVAILABLE":
                return "Ожидание";
            case "REVIEW":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button"><RxCheck/></button>
                        <button className="table-yellow-button"><RxCross2/></button>
                        </span>
                );
            case "REJECTED":
                return "Недоступна";
        }
    }

    buildStatusColumn(status) {
        switch (status) {
            case "REVIEW":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button">Одобрить</button>
                        <button className="table-white-button">Отклонить</button>
                </span>
                )
            case "ACCEPTED":
                return (<span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button">Отклонить</button>
                </span>
                )
            case "REJECTED":
                return "Отклонён"
            case "PAYMENT_REVIEW":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button">Отклонить</button>
                </span>
                )
            case "PAYMENT_DONE":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button">Отклонить</button>
                </span>
                )
            case "PAYMENT_REJECTED":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-white-button">Отклонить</button>
                </span>
                )
            case "MEETING_WAITING":
                return (
                    <span style={{'text-wrap': 'nowrap'}}>
                        <button className="table-yellow-button">Завершить</button>
                        <button className="table-white-button">Отклонить</button>
                </span>
                )
            case "COMPLETED":
                return "Завершён"
            default:
                return "Неизвестно"
        }
    }

    render() {

        const {error, isLoaded, orders, expandedRow} = this.state;
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
                            <th>Наименование услуги</th>
                            <th>Email</th>
                            <th>Статус заказа</th>
                            <th>Оплата</th>
                            <th>Дата создания</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(item => (
                            <React.Fragment key={item.id}>
                                <tr onClick={() => this.toggleRow(item.id)}>
                                    <td>{item.id}</td>
                                    <td>
                                         <span className="arrow-icon">
                                         {expandedRow === item.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {item.user.firstname} {item.user.lastname}</td>
                                    <td>{item.offer.title}</td>
                                    <td>{item.user.email}</td>
                                    <td>{this.buildStatusColumn(item.status)}</td>
                                    <td>{this.buildPaymentColumn(item)}</td>
                                    <td>{new Date(Date.parse(item.createdAt)).toLocaleString()}</td>
                                </tr>
                                {expandedRow === item.id && (
                                    <tr className="expanded_row">
                                        <td colSpan={7}>
                                            Дополнительная информация
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}
