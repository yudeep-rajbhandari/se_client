import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import adminService from "../../../services/admin.service";
import { toast, ToastContainer } from "react-toastify";
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
export default function UserRoleManagement(props) {
  console.log(props.currentUser.username);

  async function updateRoleToAdmin(user) {
    await adminService
      .updateRoleToAdmin(user)
      .then((res) => {
        toast("User " + res.data.username + " is set as ADMIN");
        props.refreshUserTable();
      })
      .catch((error) => {
        toast(error);
      })
      .finally(setStatus(true));
  }

  async function updateRoleToUser(user) {
    await adminService
      .updateRoleToUser(user)
      .then((res) => {
        toast("User " + res.data.username + " is set as USER");
        props.refreshUserTable();
      })
      .catch((error) => {
        toast(error);
      })
      .finally(setStatus(true));
  }

  const [status, setStatus] = useState(false);

  function getRole(name) {
    if (name[0] === "ROLE_ADMIN") {
      return "ADMIN";
    } else {
      return "USER";
    }
  }
  return (
    <div>
      <div>
        {status && (
          <div>
            <ToastContainer />{" "}
          </div>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((row) => (
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell>{row.id}</TableCell> */}
                <StyledTableCell>{row.username}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>
                  {/* {row.roles.map((role) => role.name)} */}
                  {getRole(row.roles.map((role) => role.name))}
                </StyledTableCell>
                <StyledTableCell>
                  {!(row.username === props.currentUser.username) &&
                    getRole(row.roles.map((role) => role.name)) === "USER" && (
                      <div>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            updateRoleToAdmin(row);
                          }}
                        >
                          Make Admin
                        </Button>
                      </div>
                    )}
                  {!(row.username === props.currentUser.username) &&
                    getRole(row.roles.map((role) => role.name)) === "ADMIN" && (
                      <div>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            updateRoleToUser(row);
                          }}
                        >
                          Make User
                        </Button>
                      </div>
                    )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
