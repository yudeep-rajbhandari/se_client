import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#154734",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function ListResourceByRoom(props) {
  console.log(props);
  return (
    <div>
      <h3> Resources in Room: {props.selectedRoom.name}</h3>{" "}
      {props.displayResources && (
        <div>
          <Button variant="outlined" onClick={() => props.hideResources()}>
            {" "}
            Hide Resources
          </Button>
        </div>
      )}
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Working Condition</StyledTableCell>
                <StyledTableCell>Resource Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.resources.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{row.resourceName}</StyledTableCell>
                  <StyledTableCell>{row.workingCondition}</StyledTableCell>
                  <StyledTableCell>{row.resourceType}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
