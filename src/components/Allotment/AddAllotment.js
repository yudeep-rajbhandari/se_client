import { useEffect, useState } from "react";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AllotmentService from "../../services/AllotmentService";
import { toast, ToastContainer } from "react-toastify";
export default function AddAllotment(props) {
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [selectedUserId, setSelectedUserId] = useState();
  const [status, setStatus] = useState(false);

  const roomOptions = props.rooms.map((room) => (
    <option key={room.id} value={room.id}>
      {room.name}
    </option>
  ));

  const userOptions = props.users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.email}
    </option>
  ));

  async function addAllotment() {
    const allotment = {
      room: { id: selectedRoomId },
      user: { id: selectedUserId },
      fromDate: new Date("01-01-2022"), // take this from Calendar
      toDate: new Date("12-12-2022"), // take this from Calendar
    };
    await AllotmentService.addAllotment(allotment)
      .then((res) => {
        toast(
          res.data.user.email +
            " is alloted to " +
            res.data.room.name +
            " from " +
            res.data.fromDate.substring(0, 10) +
            " to " +
            res.data.toDate.substring(0, 10)
        );
      })
      .catch((error) => {
        toast("Error in adding user to the selected room");
      })
      .finally(() => {
        setStatus(true);
        props.refreshAllotment();
      });
  }

  function handleSelectedRoomIdChange(event) {
    setSelectedRoomId((currentValue) => {
      return event.target.value;
    });
  }

  function handleSelectedUserIdChange(event) {
    setSelectedUserId((currentValue) => {
      return event.target.value;
    });
  }

  return (
    <div>
      {status && (
        <div>
          <ToastContainer />{" "}
        </div>
      )}

      <h3>Add Allotment</h3>
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Select User</TableCell>
                <TableCell>Select Room</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>To Date</TableCell>
                <TableCell>Action</TableCell>
                {/* <TableCell>Role</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>
                <select onChange={handleSelectedUserIdChange}>
                  <option key="0" value="0">
                    ---Select User---
                  </option>
                  {userOptions}
                </select>
              </TableCell>

              <TableCell>
                <select onChange={handleSelectedRoomIdChange}>
                  <option key="0" value="0">
                    ---Allot Room---
                  </option>
                  {roomOptions}
                </select>
              </TableCell>
              <TableCell>From Date</TableCell>
              <TableCell>To Date</TableCell>
              <TableCell>
                {selectedUserId && selectedRoomId && (
                  <div>
                    <button
                      onClick={() => {
                        addAllotment();
                      }}
                    >
                      Allot
                    </button>
                  </div>
                )}
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
