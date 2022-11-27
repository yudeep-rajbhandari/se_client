import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function AddAllotmentTable(props) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Select User</TableCell>
              <TableCell>Select Room</TableCell>
              <TableCell>From Date</TableCell>
              <TableCell>To Date</TableCell>
              <TableCell>Action</TableCell>
              {/* <TableCell>Role</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>
              <select onChange={props.handleSelectedUserIdChange}>
                <option key="0" value="0">
                  ---Select User---
                </option>
                {props.userOptions}
              </select>
            </TableCell>

            <TableCell>
              <select onChange={props.handleSelectedRoomIdChange}>
                <option key="0" value="0">
                  ---Allot Room---
                </option>
                {props.roomOptions}
              </select>
            </TableCell>
            <TableCell>From Date</TableCell>
            <TableCell>To Date</TableCell>
            <TableCell>
              {props.selectedUserId && props.selectedRoomId && (
                <div>
                  <button
                    onClick={() => {
                      props.addAllotment();
                    }}
                  >
                    Allot
                  </button>
                </div>
              )}
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
