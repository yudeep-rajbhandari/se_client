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
import CsvDownloadButton from "react-json-to-csv";
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
export default function BuildingTable(props) {
  return (
    <div>
      <h3>List of Buildings</h3>
      <CsvDownloadButton
        data={props.buildings}
        filename={"buildings.csv"}
        delimiter={","}
      />
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Floors</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>Gate</StyledTableCell>
                <StyledTableCell>Edit Action</StyledTableCell>
                <StyledTableCell>Direction</StyledTableCell>
                <StyledTableCell>Rooms</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.buildings.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell>{row.id}</TableCell> */}
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.floors}</StyledTableCell>
                  <StyledTableCell>
                    {row.address.street +
                      ", " +
                      row.address.city +
                      ", " +
                      row.address.state +
                      ", " +
                      +row.address.zip}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.gate ? row.gate.name : "No Gate Info"}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      startIcon={<ModeEditIcon />}
                      variant="outlined"
                      onClick={() => props.onEditClick(row)}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.latitude},{row.longitude}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="outlined"
                      onClick={() => props.viewRooms(row)}
                    >
                      View Rooms
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
