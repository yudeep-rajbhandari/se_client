import { TableBody, TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import Paper from "@mui/material/Paper";
import ReservationService from "../../../services/ReservationService";
import CancelIcon from "@mui/icons-material/Cancel";

import { useState } from "react";

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
export default function MyReservation(props) {
  const [status, setStatus] = useState(false);
  async function cancelReservation(reservationId) {
    await ReservationService.cancelReservation(reservationId).then((res) => {
      toast(
        "Reservation of " +
          res.data.reserveType +
          " " +
          res.data.roomId +
          " is cancelled now"
      );
      setStatus(true);
      props.refreshReservation();
    });
  }

  function checkStatus(status) {
    if (status === "PENDING") {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div>
      <div>
        {status && (
          <div>
            <ToastContainer />{" "}
          </div>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}

              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.myReservation.map((row) => (
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell>{row.reserveType}</StyledTableCell>
                <StyledTableCell>{row.entityName}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell>
                  {checkStatus(row.status)
                    ? null
                    : row.fromDate.substring(0, 10)}
                </StyledTableCell>
                <StyledTableCell>
                  {checkStatus(row.status) ? null : row.toDate.substring(0, 10)}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    disabled={checkStatus(row.status)}
                    startIcon={<CancelIcon />}
                    onClick={() => {
                      cancelReservation(row.id);
                    }}
                  >
                    Cancel{" "}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
