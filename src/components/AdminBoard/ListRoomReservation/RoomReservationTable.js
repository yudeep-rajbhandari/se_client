import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import Tooltip from "@mui/material/Tooltip";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#154734",
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
export default function RoomReservationTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Room ID</StyledTableCell>
            <StyledTableCell>From Date</StyledTableCell>
            <StyledTableCell>To Date</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.roomReservationList.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell>{row.roomId}</StyledTableCell>
              <StyledTableCell>{row.fromDate}</StyledTableCell>
              <StyledTableCell>{row.toDate}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    onClick={() => props.acceptRoomReservation(row.id)}
                  >
                    {" "}
                    APPROVE
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    onClick={() => props.declineRoomReservation(row.id)}
                  >
                    {" "}
                    DECLINE
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    onClick={() => props.archiveRoomReservation(row.id)}
                  >
                    {" "}
                    ARCHIVE
                  </Button>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
