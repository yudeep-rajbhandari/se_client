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
export default function ResourceTypeTable(props) {
  const resourceType = ["INDOOR", "OUTDOOR"];
  function getIndoorCount() {
    var count = 0;
    props.resources.map((resource) => {
      if (resource.resourceType === "INDOOR") {
        count += 1;
      }
    });
    return count;
  }

  function getOutdoorCount() {
    var count = 0;
    props.resources.map((resource) => {
      if (resource.resourceType === "OUTDOOR") {
        count += 1;
      }
    });
    return count;
  }
  console.log(resourceType);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Resource Type</StyledTableCell>
              <StyledTableCell># Resource</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>{resourceType[0]}</StyledTableCell>
              <StyledTableCell>{getIndoorCount()}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>{resourceType[1]}</StyledTableCell>
              <StyledTableCell>{getOutdoorCount()}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
