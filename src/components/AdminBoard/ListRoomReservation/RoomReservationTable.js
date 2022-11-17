import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

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
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button onClick={() => props.acceptRoomReservation(row.id)}>
                    {" "}
                    APPROVE
                  </Button>
                  <Button onClick={() => props.declineRoomReservation(row.id)}>
                    {" "}
                    DECLINE
                  </Button>
                  <Button onClick={() => props.archiveRoomReservation(row.id)}>
                    {" "}
                    ARCHIVE
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
