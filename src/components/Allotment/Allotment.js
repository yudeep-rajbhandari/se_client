import { useEffect, useState } from "react";
import AdminService from "../../services/admin.service";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RoomService from "../../services/RoomService";
import AllotmentService from "../../services/AllotmentService";
import { toast, ToastContainer } from "react-toastify";
import AddAllotment from "./AddAllotment";
import ViewAllotment from "./ViewAllotment";
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
    console.log(data);
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

  console.log(allotments);
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
