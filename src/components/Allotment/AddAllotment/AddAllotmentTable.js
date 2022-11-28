import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function AddAllotmentTable(props) {
  const userOptions = props.users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.email}
    </option>
  ));
  const buildingOptions = props.buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
    </option>
  ));

  const roomOptions = props.rooms.map((room) => (
    <option key={room.id} value={room.id}>
      {room.name}
    </option>
  ));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Select User</TableCell>
              {props.userSelected && <TableCell>Select Building</TableCell>}
              {props.buildingSelected && <TableCell>Select Room</TableCell>}
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
                {userOptions}
              </select>
            </TableCell>

            {props.userSelected && (
              <TableCell>
                <select onChange={props.handleSelectedBuildingIdChange}>
                  <option key={0} value={0}>
                    ---Select Building---
                  </option>
                  {buildingOptions}
                </select>
              </TableCell>
            )}
            {props.buildingSelected && (
              <TableCell>
                <select onChange={props.handleSelectedRoomIdChange}>
                  <option key={0} value={0}>
                    ---Select Room---
                  </option>
                  {roomOptions}
                </select>
              </TableCell>
            )}
            <TableCell>From Date</TableCell>
            <TableCell>To Date</TableCell>
            <TableCell>
              {props.selectedUserId && props.selectedBuildingId && (
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
