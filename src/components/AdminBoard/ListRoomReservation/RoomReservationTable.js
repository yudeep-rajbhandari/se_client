import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function RoomReservationTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Room ID</TableCell>
            <TableCell>From Date</TableCell>
            <TableCell>To Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.roomReservationList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.roomId}</TableCell>
              <TableCell>{row.fromDate}</TableCell>
              <TableCell>{row.toDate}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <button onClick={() => props.acceptRoomReservation(row.id)}>
                  {" "}
                  ACCEPT
                </button>
                <button onClick={() => props.declineRoomReservation(row.id)}>
                  {" "}
                  DECLINE
                </button>
                <button onClick={() => props.archiveRoomReservation(row.id)}>
                  {" "}
                  ARCHIVE
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
