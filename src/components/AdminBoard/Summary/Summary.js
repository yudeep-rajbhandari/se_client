import { Table, TableBody, TableContainer } from "@mui/material";
import TableHead from "@mui/material/TableHead";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { StyledTableCell, StyledTableRow } from "../../../common/Style/Style";

export default function Summary(props) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell># Building</StyledTableCell>
              <StyledTableCell># Room</StyledTableCell>
              <StyledTableCell># Resource</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  TransitionComponent={Zoom}
                  title="click to view list of buildings"
                >
                  <Button
                    onClick={(event) =>
                      (window.location.href = "/listBuilding")
                    }
                  >
                    {props.buildings.length}
                  </Button>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell>
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
              </StyledTableCell>

              <StyledTableCell>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  TransitionComponent={Zoom}
                  title="click to view list of resources"
                >
                  <Button
                    onClick={(event) =>
                      (window.location.href = "/listResource")
                    }
                  >
                    {props.resources.length}
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
