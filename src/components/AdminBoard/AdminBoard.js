import { useEffect, useState } from "react";

import RoomReservationsService from "../../services/RoomReservationsService";
import ListRoomReservation from "./ListRoomReservation/ListRoomReservation";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Summary from "./Summary";
import BuildingService from "../../services/BuildingService";
import RoomService from "../../services/RoomService";
import ResourceService from "../../services/ResourceService";
import BuildingDashboard from "./BuildingDashboard/BuildingDashboard";
import RoomDashboard from "./RoomDashboard/RoomDashboard";
import ResourceDashoard from "./ResourceDashboard/ResourceDashboard";

export default function AdminBoard() {
  const [summary, setSummary] = useState(false);
  const [buildingDashboard, setBuildingDashboard] = useState(false);
  const [roomDashboard, setRoomDashboard] = useState(false);
  const [resourceDashboard, setResourceDashboard] = useState(false);



  const [resources, setResources] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuildings] = useState([]);

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
  }

  async function getAllRoom() {
    const { data } = await RoomService.getAllRoom();
    setRooms(data);
  }

  async function getAllResource() {
    const { data } = await ResourceService.getAllResource();
    setResources(data);
  }

  useEffect(() => {
    getAllBuilding();
    getAllRoom();
    getAllResource();
  }, [])

  const [clickRoomReservation, setClickRoomReservation] = useState(false);
  const [roomReservationList, setRoomReservationList] = useState([]);
  const [count, setCount] = useState(0);

  async function getAllRoomReservation() {
    const { data } = await RoomReservationsService.getAllRoomReservation();
    setRoomReservationList(data);
  }

  async function showReservations() {
    getAllRoomReservation();
    setClickRoomReservation(true);
  }

  function hideRoomReservationTable() {
    setClickRoomReservation(false);
  }

  useEffect(() => {
    getAllRoomReservation()
  }, []);

  useEffect(() => {
    getAllRoomReservation();
  }, [count]);

  function reloadComponent() {
    setCount((currentCount) => {
      return currentCount + 1;
    });
  }

  function showSummary() {
    setBuildingDashboard(false);
    setRoomDashboard(false);
    setResourceDashboard(false);
    setSummary(true);
  }
  function hideSummary() {
    setSummary(false);
  }

  function showBuildingSummary() {
    setSummary(false);
    setRoomDashboard(false);
    setResourceDashboard(false);
    setBuildingDashboard(true);
  }

  function hideBuildingSummary() {
    setBuildingDashboard(false);
  }

  function showRoomSummary() {
    setSummary(false);
    setBuildingDashboard(false);
    setResourceDashboard(false);
    setRoomDashboard(true);
  }

  function hideRoomSummary() {
    setRoomDashboard(false);
  }

  function showResourceDashboard() {
    setSummary(false);
    setBuildingDashboard(false);
    setRoomDashboard(false);
    setResourceDashboard(true);
  }

  function hideresourceDashboard() {
    setResourceDashboard(false);
  }

  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <ButtonGroup variant="text" aria-label="text button group">
          {summary && (
            <Button color="error" type="submit" onClick={() => hideSummary()}>
              Hide Summary
            </Button>
          )}
          {!summary && (
            <Button type="submit" onClick={() => showSummary()}>
              Summary
            </Button>
          )}
          {!buildingDashboard && (
            <Button onClick={() => showBuildingSummary()}>
              {" "}
              Building Dashboard
            </Button>
          )}
          {buildingDashboard && (
            <Button color="error" onClick={() => hideBuildingSummary()}>
              {" "}
              Hide Building Dashboard
            </Button>
          )}
          {!roomDashboard && (
            <Button onClick={() => showRoomSummary()}> Room Dashboard</Button>
          )}
          {roomDashboard && (
            <Button color="error" onClick={() => hideRoomSummary()}>
              {" "}
              Hide Room Dashboard
            </Button>
          )}
          {!resourceDashboard && (
            <Button onClick={() => showResourceDashboard()}>
              {" "}
              Resource Dashboard
            </Button>
          )}
          {resourceDashboard && (
            <Button color="error" onClick={() => hideresourceDashboard()}>
              {" "}
              Hide Resource Dashboard
            </Button>
          )}
        </ButtonGroup>

        {summary && (
          <div>
            <Summary
              buildings={buildings} rooms={rooms} resources={resources}
            />
          </div>
        )}

        {buildingDashboard && (
          <div>
            <BuildingDashboard buildings={buildings} />
          </div>
        )}

        {roomDashboard && (
          <div>
            <RoomDashboard rooms={rooms} />
          </div>
        )}
        {resourceDashboard && (
          <div>
            <ResourceDashoard resources={resources} />
          </div>
        )}
      </div>

      <div>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={(event) => (window.location.href = "/addBuilding")}>
            Add Building
          </Button>
          <Button onClick={(event) => (window.location.href = "/listBuilding")}>
            List Building
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={(event) => (window.location.href = "/addRoom")}>
            Add Room
          </Button>
          <Button onClick={(event) => (window.location.href = "/listRoom")}>
            List Room
          </Button>
        </ButtonGroup>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={(event) => (window.location.href = "/addResource")}>
            Add Resource
          </Button>
          <Button onClick={(event) => (window.location.href = "/listResource")}>
            List Resource
          </Button>
        </ButtonGroup>
        <div>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={(event) => (window.location.href = "/allotment")}>
              Allotment
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <ButtonGroup>
            {clickRoomReservation && (
              <Button
                color="error"
                type="submit"
                onClick={() => hideRoomReservationTable()}
              >
                Hide Room Reservations
              </Button>
            )}
            {!clickRoomReservation && (
              <Button type="submit" onClick={() => showReservations()}>
                List Room Reservations
              </Button>
            )}
          </ButtonGroup>
        </div>


        {clickRoomReservation && (
          <ListRoomReservation
            roomReservationList={roomReservationList}
            reloadComponent={reloadComponent}
          />
        )}
      </div>
    </div>
  );
}
