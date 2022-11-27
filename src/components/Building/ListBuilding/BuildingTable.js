import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function BuildingTable(props) {
  return (
    <div>
      <h3>List of Buildings</h3>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Floors</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Gate</TableCell>
                <TableCell>Edit Action</TableCell>
                <TableCell>Direction</TableCell>
                <TableCell>Rooms</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.buildings.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell>{row.id}</TableCell> */}
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.floors}</TableCell>
                  <TableCell>
                    {row.address.street +
                      ", " +
                      row.address.city +
                      ", " +
                      row.address.state +
                      ", " +
                      +row.address.zip}
                  </TableCell>
                  <TableCell>
                    {row.gate ? row.gate.name : "No Gate Info"}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<ModeEditIcon />}
                      variant="outlined"
                      onClick={() => props.onEditClick(row)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    {row.latitude},{row.longitude}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => props.viewRooms(row)}
                    >
                      View Rooms
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
