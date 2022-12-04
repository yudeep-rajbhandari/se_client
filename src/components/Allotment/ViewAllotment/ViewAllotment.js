import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AllotmentService from "../../../services/AllotmentService";

import { StyledTableCell, StyledTableRow } from "../../../common/Style/Style";

export default function ViewAllotment(props) {
  const [status, setStatus] = useState(false);

  async function deleteAllotment(id) {
    await AllotmentService.deleteAllotment(id)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((error) => {
        toast.error("Error in deleting allotment");
      })
      .finally(() => {
        setStatus(true);
        props.refreshAllotment();
      });
  }

  return (
    <div>
      {status && (
        <div>
          <ToastContainer />{" "}
        </div>
      )}
      <h3
        style={{
          color: "#154734",
        }}
      >
        {" "}
        View Allotment{" "}
      </h3>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Room</StyledTableCell>
                <StyledTableCell>From Date</StyledTableCell>
                <StyledTableCell>To Date</StyledTableCell>
                <StyledTableCell>User Role</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {props.allotments.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{row.user.email}</StyledTableCell>
                  <StyledTableCell>{row.room.name}</StyledTableCell>
                  <StyledTableCell>
                    {row.fromDate.substring(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.toDate.substring(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {" "}
                    {row.user.roles.map((role) =>
                      role.name === "ROLE_USER" ? "USER" : "ADMIN"
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      style={{
                        backgroundColor: "#154734",
                        color: "#FFB81C",
                      }}
                      variant="outlined"
                      startIcon={<BackspaceIcon />}
                      onClick={() => {
                        deleteAllotment(row.id);
                      }}
                    >
                      Delete
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
