import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
export default function BookableTable(props) {
  const bookable = ["TRUE", "FALSE"];
  function getTrueCount() {
    var count = 0;
    props.rooms.map((room) => {
      if (String(room.bookable) === "true") {
        count += 1;
      }
    });
    return count;
  }

  function getFalseCount() {
    var count = 0;
    props.rooms.map((room) => {
      if (String(room.bookable) === "false") {
        count += 1;
      }
    });
    return count;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Bookable</StyledTableCell>
              <StyledTableCell># Room</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>{bookable[0]}</StyledTableCell>
              <StyledTableCell>{getTrueCount()}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{bookable[1]}</StyledTableCell>
              <StyledTableCell>{getFalseCount()}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
