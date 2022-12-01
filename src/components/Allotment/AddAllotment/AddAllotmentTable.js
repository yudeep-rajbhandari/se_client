import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
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

export default function AddAllotmentTable(props) {
  console.log(props);

  const userOptions = props.users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.email}
    </option>
  ));
  const buildingOptions = props.buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
    </option>
  ));

  const roomOptions = props.rooms.map((room) => (
    <option key={room.id} value={room.id}>
      {room.name}
    </option>
  ));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Select User</StyledTableCell>
              {props.userSelected && (
                <StyledTableCell>Select Building</StyledTableCell>
              )}
              {props.buildingSelected && (
                <StyledTableCell>Select Room</StyledTableCell>
              )}
              <StyledTableCell>From Date</StyledTableCell>
              <StyledTableCell>To Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              {/* <TableCell>Role</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>
                <select onChange={props.handleSelectedUserIdChange}>
                  <option key="0" value="0">
                    ---Select User---
                  </option>
                  {userOptions}
                </select>
              </StyledTableCell>

              {props.userSelected && (
                <StyledTableCell>
                  <select onChange={props.handleSelectedBuildingIdChange}>
                    <option key={0} value={0}>
                      ---Select Building---
                    </option>
                    {buildingOptions}
                  </select>
                </StyledTableCell>
              )}
              {props.buildingSelected && (
                <StyledTableCell>
                  <select onChange={props.handleSelectedRoomIdChange}>
                    <option key={0} value={0}>
                      ---Select Room---
                    </option>
                    {roomOptions}
                  </select>
                </StyledTableCell>
              )}
              <StyledTableCell>
                {" "}
                <DatePicker
                  onChange={(date) => props.handleSelectedFromDateChange(date)}
                  selected={props.selectedFromDateChange}
                  dateFormat="MMMM d, yyyy"
                />
              </StyledTableCell>
              <StyledTableCell>
                {" "}
                <DatePicker
                  onChange={(date) => props.handleSelectedToDateChange(date)}
                  selected={props.selectedToDateChange}
                  dateFormat="MMMM d, yyyy"
                />
              </StyledTableCell>
              <StyledTableCell>
                {props.selectedUserId && props.selectedBuildingId && (
                  <div>
                    <button
                      onClick={() => {
                        props.addAllotment();
                      }}
                    >
                      Allot
                    </button>
                  </div>
                )}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
