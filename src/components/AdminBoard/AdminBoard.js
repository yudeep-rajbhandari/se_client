import { useEffect, useState } from "react";

import RoomReservationsService from "../../services/RoomReservationsService";
import ListRoomReservation from "./ListRoomReservation/ListRoomReservation";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
export default function AdminBoard() {
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
  }, []);

  useEffect(() => {
    getAllRoomReservation();
  }, [count]);

  function reloadComponent() {
    setCount((currentCount) => {
      return currentCount + 1;
    });
  }

  return (
    <div>
      <h3>Admin Board</h3>
      <div></div>
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

        <ButtonGroup>
          {clickRoomReservation && (
            <Button type="submit" onClick={() => hideRoomReservationTable()}>
              Hide Room Reservations
            </Button>
          )}
          {!clickRoomReservation && (
            <Button type="submit" onClick={() => showReservations()}>
              List Room Reservations
            </Button>
          )}
        </ButtonGroup>
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
