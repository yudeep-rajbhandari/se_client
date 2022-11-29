import { TableBody, TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
export default function RoomDashboard(props) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell># Room</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  TransitionComponent={Zoom}
                  title="click to view list of rooms"
                >
                  <Button
                    onClick={(event) => (window.location.href = "/listRoom")}
                  >
                    {props.rooms.length}
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
