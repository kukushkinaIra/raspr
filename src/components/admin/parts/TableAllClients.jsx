import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, firm, telephone, university, email) {
  return { name, firm, telephone, university, email };
}

const rows = [
  createData("Гуревич Алексей", "КБ", +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", "КБ", +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", "КБ", +375123456789, "БГУИР", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", "КБ", +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", "КБ", +375123456789, "БГУИР", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "МГПТК", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "МГПТК", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "БГУИР", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "МГПТК", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей12", "КБ", +375123456789, "МГПТК", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "БГУИР", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей", 356, +375123456789, "БГУИР", "lorem_ipsum_ipsum@gmail.com"),
  createData("Гуревич Алексей17", "КБ", +375123456789, "БГУ", "lorem_ipsum_ipsum@gmail.com")
];

export default function AllClients() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer className="orders" component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Фамилия Имя</TableCell>
            <TableCell align="left">Фирма</TableCell>
            <TableCell align="left">Телефон</TableCell>
            <TableCell align="left">Университет</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.firm}</TableCell>
                <TableCell align="left">{row.telephone}</TableCell>
                <TableCell align="left">{row.university}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
