import { useEffect, useState } from "react";
import AdminService from "../../services/admin.service";
import React from "react";

import RoomService from "../../services/RoomService";
import AllotmentService from "../../services/AllotmentService";
import AddAllotment from "./AddAllotment/AddAllotment";
import ViewAllotment from "./ViewAllotment/ViewAllotment";

export default function Allotment() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [allotments, setAllotments] = useState([]);

  async function getAllUser() {
    const { data } = await AdminService.getAllUser();
    setUsers(data);
  }

  async function getAllBookableRoom() {
    const { data } = await RoomService.getAllBookableRoom();
    setRooms(data);
  }

  async function getAllAllotment() {
    const { data } = await AllotmentService.getAllAllotment();
    setAllotments(data);
  }
  useEffect(() => {
    getAllBookableRoom();
    getAllAllotment();
    getAllUser();
  }, []);

  function refreshAllotment() {
    getAllAllotment();
  }

  return (
    <div>
      <AddAllotment
        users={users}
        rooms={rooms}
        refreshAllotment={refreshAllotment}
      />
      <ViewAllotment allotments={allotments} />
    </div>
  );
}
