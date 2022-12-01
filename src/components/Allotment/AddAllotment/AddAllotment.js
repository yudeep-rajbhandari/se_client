import { useState } from "react";

import React from "react";

import AllotmentService from "../../../services/AllotmentService";
import { toast, ToastContainer } from "react-toastify";
import AddAllotmentTable from "./AddAllotmentTable";
import RoomService from "../../../services/RoomService";

export default function AddAllotment(props) {
  const [userSelected, setUserSelected] = useState(false);
  const [buildingSelected, setBuildingSelected] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [selectedUserId, setSelectedUserId] = useState();

  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());
  const [status, setStatus] = useState(false);
  const [rooms, setRooms] = useState([]);

  async function addAllotment() {
    const allotment = {
      room: { id: selectedRoomId },
      user: { id: selectedUserId },
      fromDate: selectedFromTime, // take this from Calendar
      toDate: selectedToTime, // take this from Calendar
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

  function handleSelectedUserIdChange(event) {
    setSelectedUserId(event.target.value);

    if (event.target.value !== 0) {
      setUserSelected(true);
    } else if (event.target.value === 0) {
      setUserSelected(false);
    }
  }

  function handleSelectedBuildingIdChange(event) {
    setSelectedBuildingId(event.target.value);
    getBookableRoomByBuilding(event.target.value);
    setBuildingSelected(true);
  }

  function handleSelectedRoomIdChange(event) {
    setSelectedRoomId(event.target.value);
  }

  function handleSelectedFromDateChange(date) {
    setSelectedFromTime(date);
  }

  function handleSelectedToDateChange(date) {
    setSelectedToTime(date);
  }

  async function getBookableRoomByBuilding(buildingId) {
    const { data } = await RoomService.getBookableRoomByBuilding(buildingId);
    setRooms((currentvalue) => {
      return data;
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
        Add Allotment
      </h3>
      <div>
        <AddAllotmentTable
          handleSelectedBuildingIdChange={handleSelectedBuildingIdChange}
          handleSelectedUserIdChange={handleSelectedUserIdChange}
          handleSelectedRoomIdChange={handleSelectedRoomIdChange}
          handleSelectedFromDateChange={handleSelectedFromDateChange}
          handleSelectedToDateChange={handleSelectedToDateChange}
          users={props.users}
          buildings={props.buildings}
          rooms={rooms}
          addAllotment={addAllotment}
          selectedRoomId={selectedRoomId}
          selectedUserId={selectedUserId}
          selectedBuildingId={selectedBuildingId}
          userSelected={userSelected}
          buildingSelected={buildingSelected}
          selectedFromDateChange={selectedFromTime}
          selectedToDateChange={selectedToTime}
        />
      </div>
    </div>
  );
}
