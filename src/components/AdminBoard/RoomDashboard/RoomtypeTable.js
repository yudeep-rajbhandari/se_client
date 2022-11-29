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
export default function RoomtypeTable(props) {
    const roomType = ["CLASSROOM", "LAB", "STAFFROOM", "WASHROOM"]


    function getClassroomCount() {
        var count = 0;
        props.rooms.map((room) => {
            if (String(room.roomType) === "classroom") {
                count += 1
            }
        })
        return count;
    }
    function getLabCount() {
        var count = 0;
        props.rooms.map((room) => {
            if (String(room.roomType) === "lab") {
                count += 1
            }
        })
        return count;
    }

    function getStaffroomCount() {
        var count = 0;
        props.rooms.map((room) => {
            if (String(room.roomType) === "staffroom") {
                count += 1
            }
        })
        return count;
    }
    function getWashroomCount() {
        var count = 0;
        props.rooms.map((room) => {
            if (String(room.roomType) === "washroom") {
                count += 1
            }
        })
        return count;
    }




    return (<div>

        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>

                        <StyledTableCell>Room Type</StyledTableCell>
                        <StyledTableCell># Room</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <StyledTableCell>{roomType[0]}</StyledTableCell>
                        <StyledTableCell>{getClassroomCount()}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>{roomType[1]}</StyledTableCell>
                        <StyledTableCell>{getLabCount()}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>{roomType[2]}</StyledTableCell>
                        <StyledTableCell>{getStaffroomCount()}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>{roomType[3]}</StyledTableCell>
                        <StyledTableCell>{getWashroomCount()}</StyledTableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>

    </div>)
}