import React from "react";
import Table from 'react-bootstrap/Table';
import {MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';


import {makeStyles} from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650
//   }
// });

// function createData(name, service, order_number, email, manager) {
//   return { name, service, order_number, email, manager };
// }

// const rows = [
//   createData("Гуревич Алексей", "Гарантийное письмо", 6.0, 24, 4.0),
//   createData("Гуревич Алексей", "Заявка на практику", 9.0, 37, 4.3),
//   createData("Гуревич Алексей", "Заказ справки", 16.0, 24, 6.0),
//   createData("Гуревич Алексей", "Заказ справки", 3.7, 67, 4.3),
//   createData("Гуревич Алексей", "Заказ справки", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Заявка на практику", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Заявка на практику", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Заявка на практику", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Заявка на практику", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Заявка на практику", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Гарантийное письмо", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Гарантийное письмо", 16.0, 49, 3.9),
//   createData("Гуревич Алексей12", "Гарантийное письмо", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Гарантийное письмо", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Гарантийное письмо", 16.0, 49, 3.9),
//   createData("Гуревич Алексей", "Гарантийное письмо", 16.0, 49, 3.9),
//   createData("Гуревич Алексей17", "Гарантийное письмо", 16.0, 49, 3.9)
// ];

// export default function TableHistoryOrders() {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const emptyRows =
//     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <TableContainer className="orders" component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>ФИО</TableCell>
//             <TableCell align="left">Услуга</TableCell>
//             <TableCell align="left">Цена</TableCell>
//             <TableCell align="left">Email</TableCell>
//             <TableCell align="left">Дата заказа</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows
//             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             .map((row, index) => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="left">{row.service}</TableCell>
//                 <TableCell align="left">{row.order_number}</TableCell>
//                 <TableCell align="left">{row.email}</TableCell>
//                 <TableCell align="left">{row.manager}</TableCell>
//               </TableRow>
//             ))}
//           {emptyRows > 0 && (
//             <TableRow style={{ height: 53 * emptyRows }}>
//               <TableCell colSpan={6} />
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//   );
// }

export default class OrdersHistoryTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
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

    getPrice(payments){
        const lastPayment = payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        return lastPayment.price;
    }

    render() {

        const {error, isLoaded, content, expandedRow} = this.state;
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
                        {content.map(item => (
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
                                    <td>{this.getPrice(item.payments)}</td>
                                    <td>{item.user.email}</td>
                                    {item.status === "REVIEW" &&
                                        <td>
                                            В обработке
                                        </td>
                                    }
                                    {item.status === "ACCEPTED" &&
                                        <td>Одобрен</td>
                                    }
                                    {/* <td>
                                                    {item.payments.map(pay=>(
                                                      <p>
                                                        {pay.status ==="UNAVAILABLE" &&
                                                          <span>Недоступно</span>
                                                        }
                                                      </p>
                                                    ))}
                                                  </td> */}
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
