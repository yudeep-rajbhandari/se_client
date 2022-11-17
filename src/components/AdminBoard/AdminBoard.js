import { useState } from "react";
import RoomReservationsService from "../../services/RoomReservationsService";
import ListRoomReservation from "./ListRoomReservation";

export default function AdminBoard() {
  const [clickRoomReservation, setClickRoomReservation] = useState(false);
  const [roomReservation, setRoomReservation] = useState([]);

  async function listRoomReservation() {
    const { data } = await RoomReservationsService.getAllRoomReservation();
    setClickRoomReservation(true);
    setRoomReservation(data);
  }

  function hideRoomReservation() {
    setClickRoomReservation(false);
  }

  return (
    <div>
      <h3>Admin Board</h3>
      <div>
        {!clickRoomReservation && (
          <div>
            <button type="submit" onClick={() => listRoomReservation()}>
              List Room Reservations
            </button>
          </div>
        )}
        {clickRoomReservation && (
          <div>
            <button type="submit" onClick={() => hideRoomReservation()}>
              Hide All Reservations
            </button>
          </div>
        )}
        {clickRoomReservation && (
          <ListRoomReservation roomReservation={roomReservation} />
        )}
      </div>
    </div>
  );
}
