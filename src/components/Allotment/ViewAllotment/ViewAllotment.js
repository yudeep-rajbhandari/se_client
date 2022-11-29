import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewAllotment(props) {
  return (
    <div>
      <h3> View Allotment </h3>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Room</StyledTableCell>
                <StyledTableCell>From Date</StyledTableCell>
                <StyledTableCell>To Date</StyledTableCell>
                <StyledTableCell>User Role</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.allotments.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{row.user.email}</StyledTableCell>
                  <StyledTableCell>{row.room.name}</StyledTableCell>
                  <StyledTableCell>
                    {row.fromDate.substring(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.toDate.substring(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {" "}
                    {row.user.roles.map((role) =>
                      role.name === "ROLE_USER" ? "USER" : "ADMIN"
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
