import { relativeTimeRounding } from "moment";
import { useEffect, useState } from "react";
import RoomReservationsService from "../../services/RoomReservationsService";
import ListRoomReservation from "./ListRoomReservation/ListRoomReservation";

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
      <div>
        {!clickRoomReservation && (
          <div>
            <button type="submit" onClick={() => showReservations()}>
              List Room Reservations
            </button>
          </div>
        )}
        {clickRoomReservation && (
          <div>
            <button type="submit" onClick={() => hideRoomReservationTable()}>
              Hide Room Reservations
            </button>
          </div>
        )}
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
