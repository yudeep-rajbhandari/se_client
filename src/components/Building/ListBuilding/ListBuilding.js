import { useState, useEffect } from "react";
import AdminService from "../../../services/admin.service";

import EditBuildingForm from "../EditBuildingForm";
import BuildingTable from "./BuildingTable";

export default function ListBuilding() {
  const [buildings, setBuildings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState();
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);

  async function getAllBuilding() {
    const { data } = await AdminService.getAllBuilding();
    setBuildings(data);
  }

  useEffect(() => {
    getAllBuilding();
    setLoaded(true);
  }, []);

  useEffect(() => {
    getAllBuilding();
  }, [count]);

  function onEditClick(building) {
    console.log(building);
    setEdit(true);
    setSelectedBuilding(building);
    setStatus(false);
  }

  async function makeEditFalse() {
    setEdit(false);
    setCount((currentCount) => {
      return currentCount + 1;
    });
    setStatus(true);
    setMessage("Building updated successfully");
  }

  if (loaded) {
    return (
      <div>
        <BuildingTable buildings={buildings} onEditClick={onEditClick} />
        {edit && (
          <EditBuildingForm
            selectedBuilding={selectedBuilding}
            makeEditFalse={makeEditFalse}
          />
        )}
        {status && message}
      </div>
    );
  }
}
