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
export default function WorkingConditionTable(props) {
  const workingCondition = ["GOOD", "FAIR", "EXCELLENT"];
  function getGoodCount() {
    var count = 0;
    props.resources.map((resource) => {
      if (resource.workingCondition === "GOOD") {
        count += 1;
      }
    });
    return count;
  }

  function getFairCount() {
    var count = 0;
    props.resources.map((resource) => {
      if (resource.workingCondition === "FAIR") {
        count += 1;
      }
    });
    return count;
  }

  function getExcellentCount() {
    var count = 0;
    props.resources.map((resource) => {
      if (resource.workingCondition === "EXCELLENT") {
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
              <StyledTableCell>Working Condition</StyledTableCell>
              <StyledTableCell># Resource</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>{workingCondition[0]}</StyledTableCell>
              <StyledTableCell>{getGoodCount()}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{workingCondition[1]}</StyledTableCell>
              <StyledTableCell>{getFairCount()}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{workingCondition[2]}</StyledTableCell>
              <StyledTableCell>{getExcellentCount()}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
