import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import Paper from "@mui/material/Paper";
import React from "react";
import DatePicker from "react-datepicker";
import PrimaryButton from "../../../common/Button/PrimaryButton";
import { StyledTableCell, StyledTableRow } from "../../../common/Style/Style";
import "./datepicker.css"
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
            <StyledTableRow>
              <StyledTableCell>Select User</StyledTableCell>
              {props.userSelected && (
                <StyledTableCell>Select Building</StyledTableCell>
              )}
              {props.buildingSelected && (
                <StyledTableCell>Select Room</StyledTableCell>
              )}
              <StyledTableCell >From Date</StyledTableCell>
              <StyledTableCell>To Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              {/* <TableCell>Role</TableCell> */}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
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
                    <PrimaryButton
                      title="Allot"
                      onClick={() => {
                        props.addAllotment();
                      }}
                    />
                  </div>
                )}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
