import { Table, TableBody, TableContainer } from "@mui/material";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

import { StyledTableCell, StyledTableRow } from "../../../common/Style/Style";

export default function RoomDashboardTable(props) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell># Room</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title="click to view list of rooms"
                >+
                  <Button
                    onClick={(event) => (window.location.href = "/listRoom")}
                  >
                    {props.rooms.length}
                  </Button>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
