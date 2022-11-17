import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RoomReservationsService from "../../services/RoomReservationsService";

export default function ListRoomReservation(props) {
  async function acceptReservation(reservationId) {
    console.log("Accepting reservation");
    await RoomReservationsService.acceptRoomReservation(reservationId);
  }
  async function declineReservation() {
    console.log("Decline reservation");
  }
  async function archiveReservation() {
    console.log("Archive reservation");
  }

  console.log(props.roomReservation);
  return (
    <div>
      <h3> Room Reservations</h3>
      <div>
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
              {props.roomReservation.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.roomId}</TableCell>
                  <TableCell>{row.fromDate}</TableCell>
                  <TableCell>{row.toDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <button onClick={() => acceptReservation(row.id)}>
                      {" "}
                      ACCEPT
                    </button>
                    <button onClick={() => declineReservation()}>
                      {" "}
                      DECLINE
                    </button>
                    <button onClick={() => archiveReservation()}>
                      {" "}
                      ARCHIVE
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
