import { TableBody, TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

export default function Summary(props) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell># Building</TableCell>
              <TableCell># Room</TableCell>
              <TableCell># Resource</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {" "}
                <Button
                  onClick={(event) => (window.location.href = "/listBuilding")}
                >
                  {props.buildingCount}
                </Button>
              </TableCell>
              <TableCell>
                {" "}
                <Button
                  onClick={(event) => (window.location.href = "/listRoom")}
                >
                  {props.roomCount}
                </Button>
              </TableCell>

              <TableCell>
                {" "}
                <Button
                  onClick={(event) => (window.location.href = "/listResource")}
                >
                  {props.resourceCount}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
