import { useEffect, useState } from "react";

import React from "react";

import AllotmentService from "../../../services/AllotmentService";
import { toast, ToastContainer } from "react-toastify";
import AddAllotmentTable from "./AddAllotmentTable";
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
            " starting from " +
            res.data.fromDate.substring(0, 10) +
            " and ending in " +
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
        <AddAllotmentTable
          handleSelectedRoomIdChange={handleSelectedRoomIdChange}
          handleSelectedUserIdChange={handleSelectedUserIdChange}
          roomOptions={roomOptions}
          userOptions={userOptions}
          addAllotment={addAllotment}
          selectedRoomId={selectedRoomId}
          selectedUserId={selectedUserId}
        />
      </div>
    </div>
  );
}
