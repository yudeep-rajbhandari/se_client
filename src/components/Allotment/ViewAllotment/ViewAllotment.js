import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function ViewAllotment(props) {
  console.log(props.allotments);
  return (
    <div>
      <h3> View Allotment </h3>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>To Date</TableCell>
                <TableCell>User Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.allotments.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.user.email}</TableCell>
                  <TableCell>{row.room.name}</TableCell>
                  <TableCell>{row.fromDate.substring(0, 10)}</TableCell>
                  <TableCell>{row.toDate.substring(0, 10)}</TableCell>
                  <TableCell>
                    {" "}
                    {row.user.roles.map((role) =>
                      role.name === "ROLE_USER" ? "USER" : "ADMIN"
                    )}
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
