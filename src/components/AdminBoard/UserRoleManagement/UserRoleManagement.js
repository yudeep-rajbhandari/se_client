import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import adminService from "../../../services/admin.service";
import { toast, ToastContainer } from "react-toastify";

import Person2Icon from "@mui/icons-material/Person2";
import PrimaryButton from "../../../common/Button/PrimaryButton";
import { StyledTableCell, StyledTableRow } from "../../../common/Style/Style";

export default function UserRoleManagement(props) {
  console.log(props.currentUser.username);

  async function updateRoleToAdmin(user) {
    await adminService
      .updateRoleToAdmin(user)
      .then((res) => {
        toast.success("User " + res.data.username + " is set as ADMIN");
        props.refreshUserTable();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(setStatus(true));
  }

  async function updateRoleToUser(user) {
    await adminService
      .updateRoleToUser(user)
      .then((res) => {
        toast.success("User " + res.data.username + " is set as USER");
        props.refreshUserTable();
      })
      .catch((error) => {
        toast.error(error);
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
            <ToastContainer autoClose={1000} />{" "}
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
                        <PrimaryButton
                          icon={<AdminPanelSettingsIcon />}
                          title=" Make Admin"
                          onClick={() => {
                            updateRoleToAdmin(row);
                          }}
                        />
                      </div>
                    )}
                  {!(row.username === props.currentUser.username) &&
                    getRole(row.roles.map((role) => role.name)) === "ADMIN" && (
                      <div>
                        <PrimaryButton
                          icon={<Person2Icon />}
                          title="      Make User"
                          onClick={() => {
                            updateRoleToUser(row);
                          }}
                        />
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
