import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function RoomTable(props) {
  console.log("rooms", props.rooms)
  return (
    <div>
      <h3>List of Rooms</h3>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Bookable?</TableCell>
                <TableCell>Associated Building</TableCell>
                <TableCell> Action </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rooms.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.roomType}</TableCell>
                  <TableCell>{String(row.bookable)}</TableCell>
                  <TableCell>{row.building.name}</TableCell>

                  <TableCell>
                    {" "}
                    <button onClick={() => props.onEditClick(row)}>
                      {" "}
                      Edit
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
