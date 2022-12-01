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
import BikeScooterIcon from "@mui/icons-material/BikeScooter";
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
export default function RoomTable(props) {
  return (
    <div>
      <h3>List of Rooms</h3>
      <CsvDownloadButton
        data={props.rooms}
        filename={"rooms.csv"}
        delimiter={","}
      />
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Bookable?</StyledTableCell>
                <StyledTableCell>Associated Building</StyledTableCell>
                <StyledTableCell> Action </StyledTableCell>
                <StyledTableCell> Resource </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rooms.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.roomType}</StyledTableCell>
                  <StyledTableCell>{String(row.bookable)}</StyledTableCell>
                  <StyledTableCell>{row.building.name}</StyledTableCell>

                  <StyledTableCell>
                    {" "}
                    <Button
                      startIcon={<ModeEditIcon />}
                      variant="outlined"
                      aria-label="text button group"
                      onClick={() => props.onEditClick(row)}
                    >
                      {" "}
                      Edit
                    </Button>{" "}
                    <Button
                      startIcon={<BikeScooterIcon />}
                      variant="outlined"
                      aria-label="text button group"
                      onClick={() => props.showDirection(row)}
                    >
                      {" "}
                      DIRECTION
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Button
                      variant="outlined"
                      aria-label="text button group"
                      onClick={() => props.viewResources(row)}
                    >
                      View Resource
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
