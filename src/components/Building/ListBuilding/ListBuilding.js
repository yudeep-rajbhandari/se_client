import { useState, useEffect } from "react";
import BuildingService from "../../../services/BuildingService";
import RoomService from "../../../services/RoomService";
import EditBuildingForm from "../EditBuilding/EditBuildingForm";
import BuildingTable from "./BuildingTable";
import { Rings } from "react-loader-spinner";
import FindRoomByBuilding from "../FindRoomByBuilding/FindRoomByBuilding";

export default function ListBuilding() {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const [edit, setEdit] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState();
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);

  const [displayRooms, setDisplayRooms] = useState(false);

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
  }

  async function getRoomByBuilding(building) {
    const { data } = await RoomService.getRoomByBuilding(building);
    setRooms(data);
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
    setDisplayRooms(false);
    setStatus(false);
    setSelectedBuilding(building);
  }

  async function viewRooms(building) {
    setSelectedBuilding(building);
    getRoomByBuilding(building);
    setDisplayRooms(true);
    setEdit(false);
  }

  function hideRooms() {
    setDisplayRooms(false);
  }

  console.log(rooms);
  if (loaded) {
    return (
      <div>
        <BuildingTable
          buildings={buildings}
          viewRooms={viewRooms}
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
        {displayRooms && (
          <FindRoomByBuilding
            rooms={rooms}
            selectedBuilding={selectedBuilding}
            displayRooms={displayRooms}
            hideRooms={hideRooms}
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
