import React, { useState, useEffect } from "react";
import RoomService from "../../../services/RoomService";
import EditRoomForm from "../EditRoom/EditRoomForm";
import RoomTable from "./RoomTable";
import { Rings } from "react-loader-spinner";
import ResourceService from "../../../services/ResourceService";
import ListResourceByRoom from "../ListResourceByRoom/ListResourceByRoom";
export default function ListRoom() {
  const [rooms, setRooms] = useState([]);
  const [resources, setResources] = useState([]);
  const [displayResources, setDisplyResources] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);

  async function getAllRoom() {
    const { data } = await RoomService.getAllRoom();
    setRooms(data);
    setLoaded(true);
  }

  async function getResourceByRoom(room) {
    const { data } = await ResourceService.getResourceByRoom(room.id);
    setResources(data);
  }

  useEffect(() => {
    getAllRoom();
  }, []);

  useEffect(() => {
    getAllRoom();
  }, [count]);

  function onEditClick(room) {
    setDisplyResources(false);
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

  function viewResources(room) {
    setEdit(false);
    setDisplyResources(true);
    getResourceByRoom(room);
    setSelectedRoom(room);
  }

  function hideResources() {
    setDisplyResources(false);
    setEdit(false);
  }

  if (loaded) {
    return (
      <div>
        <RoomTable
          rooms={rooms}
          onEditClick={(e) => {
            onEditClick(e);
          }}
          viewResources={viewResources}
        />
        {edit && (
          <EditRoomForm
            selectedRoom={selectedRoom}
            makeEditFalse={makeEditFalse}
          />
        )}
        {displayResources && (
          <ListResourceByRoom
            resources={resources}
            selectedRoom={selectedRoom}
            hideResources={hideResources}
            displayResources={displayResources}
          />
        )}
        {status && message}
      </div>
    );
  } else {
    return (
      <div>
        <Rings
          align="center"
          height="80"
          width="80"
          color="#4fa94d"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }
}
