import { useEffect, useState } from "react";
import AdminService from "../../services/admin.service";
import React from "react";

import AllotmentService from "../../services/AllotmentService";
import AddAllotment from "./AddAllotment/AddAllotment";
import ViewAllotment from "./ViewAllotment/ViewAllotment";
import BuildingService from "../../services/BuildingService";

export default function Allotment() {
  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [allotments, setAllotments] = useState([]);

  async function getAllUser() {
    const { data } = await AdminService.getAllUser();
    setUsers(data);
  }

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
  }

  async function getAllAllotment() {
    const { data } = await AllotmentService.getAllAllotment();
    setAllotments(data);
  }
  useEffect(() => {
    getAllBuilding();
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
        buildings={buildings}
        refreshAllotment={refreshAllotment}
      />
      <ViewAllotment allotments={allotments} />
    </div>
  );
}
