import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function FindRoomByBuilding(props) {
  return (
    <div>
      <h3> Rooms in Building: {props.selectedBuilding.name}</h3>
      {props.displayRooms && (
        <div>
          <Button variant="outlined" onClick={() => props.hideRooms()}>
            {" "}
            Hide Rooms
          </Button>
        </div>
      )}
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Bookable?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rooms.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.roomType}</TableCell>
                  <TableCell>{String(row.bookable)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
