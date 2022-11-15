import React, { useState, useEffect } from "react";
import RoomService from "../../../services/RoomService";
import EditRoomForm from "../EditRoom/EditRoomForm";
import RoomTable from "./RoomTable";

export default function ListRoom() {
  const [rooms, setRooms] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);

  async function getAllRoom() {
    const { data } = await RoomService.findAll();
    setRooms(data);
    setLoaded(true);
  }

  useEffect(() => {
    getAllRoom();
  }, []);

  useEffect(() => {
    getAllRoom();
  }, [count]);

  function onEditClick(room) {
    setEdit(true);
    setStatus(false);
    setSelectedRoom(room);
  }

  function makeEditFalse() {
    setEdit(false);
    setStatus(true);
    setMessage("Room  updated successfully");
    setCount((currentCount) => {
      return currentCount + 1;
    });
  }

  if (loaded) {
    return (
      <div>
        <RoomTable
          rooms={rooms}
          onEditClick={(e) => {
            onEditClick(e);
          }}
        />
        {edit && (
          <EditRoomForm
            selectedRoom={selectedRoom}
            makeEditFalse={makeEditFalse}
          />
        )}
        {status && message}
      </div>
    );
  }
}
