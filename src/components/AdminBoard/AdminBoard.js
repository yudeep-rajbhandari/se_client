import { useEffect, useState } from "react";
import RoomReservationsService from "../../services/RoomReservationsService";
import ListRoomReservation from "./ListRoomReservation/ListRoomReservation";

export default function AdminBoard() {
  const [clickRoomReservation, setClickRoomReservation] = useState(false);
  const [roomReservationList, setRoomReservationList] = useState([]);

  async function listRoomReservation() {
    const { data } = await RoomReservationsService.getAllRoomReservation();
    setClickRoomReservation(true);
    setRoomReservationList(data);
  }

  function hideRoomReservation() {
    setClickRoomReservation(false);
  }

  useEffect(() => {
    listRoomReservation();
  }, []);
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
          <ListRoomReservation roomReservationList={roomReservationList} />
        )}
      </div>
    </div>
  );
}
