import { Table, TableBody, TableContainer } from "@mui/material";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

import { StyledTableCell, StyledTableRow } from "../../../common/Style/Style";

export default function BuildingDashboardTable(props) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell># Building</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
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
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
