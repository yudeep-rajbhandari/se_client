import { useEffect, useState } from "react";

import RoomReservationsService from "../../services/RoomReservationsService";
import ListRoomReservation from "./ListRoomReservation/ListRoomReservation";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Summary from "./Summary";
import BuildingService from "../../services/BuildingService";
import RoomService from "../../services/RoomService";
import ResourceService from "../../services/ResourceService";
import BuildingSummary from "./BuildingSummary";
import RoomSummary from "./RoomSummary";
import ResourceSummary from "./ResourceSummary";

export default function AdminBoard() {
  const [summary, setSummary] = useState(false);
  const [buildingSummary, setBuildingSummary] = useState(false);
  const [roomSummary, setRoomSummary] = useState(false);
  const [resourceSummary, setResourceSummary] = useState(false);
  const [buildingCount, setBuildingCount] = useState();
  const [roomCount, setRoomCount] = useState();
  const [resourceCount, setResourceCount] = useState();

  async function getBuildingCount() {
    const { data } = await BuildingService.getBuildingCount();
    setBuildingCount(data);
  }

  async function getRoomCount() {
    const { data } = await RoomService.getRoomCount();
    setRoomCount(data);
  }

  async function getResourceCount() {
    const { data } = await ResourceService.getResourceCount();
    setResourceCount(data);
  }

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
    getAllRoomReservation();
    getBuildingCount();
    getRoomCount();
    getResourceCount();
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
    setBuildingSummary(false);
    setRoomSummary(false);
    setResourceSummary(false);
    setSummary(true);
  }
  function hideSummary() {
    setSummary(false);
  }

  function showBuildingSummary() {
    setSummary(false);
    setRoomSummary(false);
    setResourceSummary(false);
    setBuildingSummary(true);
  }

  function hideBuildingSummary() {
    setBuildingSummary(false);
  }

  function showRoomSummary() {
    setSummary(false);
    setBuildingSummary(false);
    setResourceSummary(false);
    setRoomSummary(true);
  }

  function hideRoomSummary() {
    setRoomSummary(false);
  }

  function showResourceSummary() {
    setSummary(false);
    setBuildingSummary(false);
    setRoomSummary(false);
    setResourceSummary(true);
  }

  function hideResourceSummary() {
    setResourceSummary(false);
  }

  return (
    <div>
      <h3>Admin Dashboard</h3>
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
          {!buildingSummary && (
            <Button onClick={() => showBuildingSummary()}>
              {" "}
              Building Dashboard
            </Button>
          )}
          {buildingSummary && (
            <Button color="error" onClick={() => hideBuildingSummary()}>
              {" "}
              Hide Building Dashboard
            </Button>
          )}
          {!roomSummary && (
            <Button onClick={() => showRoomSummary()}> Room Dashboard</Button>
          )}
          {roomSummary && (
            <Button color="error" onClick={() => hideRoomSummary()}>
              {" "}
              Hide Room Dashboard
            </Button>
          )}
          {!resourceSummary && (
            <Button onClick={() => showResourceSummary()}>
              {" "}
              Resource Dashboard
            </Button>
          )}
          {resourceSummary && (
            <Button color="error" onClick={() => hideResourceSummary()}>
              {" "}
              Hide Resource Dashboard
            </Button>
          )}
        </ButtonGroup>

        {summary && (
          <div>
            <Summary
              buildingCount={buildingCount}
              roomCount={roomCount}
              resourceCount={resourceCount}
            />
          </div>
        )}

        {buildingSummary && (
          <div>
            <BuildingSummary buildingCount={buildingCount} />
          </div>
        )}

        {roomSummary && (
          <div>
            <RoomSummary roomCount={roomCount} />
          </div>
        )}
        {resourceSummary && (
          <div>
            <ResourceSummary resourceCount={resourceCount} />
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

        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={(event) => (window.location.href = "/allotment")}>
            Allotment
          </Button>
        </ButtonGroup>
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
