import { useState, useEffect } from "react";
import BuildingService from "../../../services/BuildingService";
import EditBuildingForm from "../EditBuilding/EditBuildingForm";
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
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
  }

  useEffect(() => {
    getAllBuilding();
    setLoaded(true);
  }, []);

  useEffect(() => {
    getAllBuilding();
    setLoaded(true);
  }, [count]);

  function makeEditFalse() {
    setEdit(false);
    setStatus(true);
    setMessage("Building updated successfully");
    setCount((currentCount) => {
      return currentCount + 1;
    });
  }

  function onEditClick(building) {
    setEdit(true);
    setStatus(false);
    setSelectedBuilding(building);
  }

  if (loaded) {
    return (
      <div>
        <BuildingTable
          buildings={buildings}
          onEditClick={(e) => {
            onEditClick(e);
          }}
        />
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
