import RoomReservationsService from "../../../services/RoomReservationsService";
import RoomReservationTable from "./RoomReservationTable";

export default function ListRoomReservation(props) {
  async function acceptRoomReservation(reservationId) {
    await RoomReservationsService.acceptRoomReservation(reservationId);
  }
  async function declineRoomReservation(reservationId) {
    await RoomReservationsService.declineRoomReservation(reservationId);
  }
  async function archiveRoomReservation(reservationId) {
    await RoomReservationsService.archiveRoomReservation(reservationId);
  }

  return (
    <div>
      <RoomReservationTable
        roomReservationList={props.roomReservationList}
        acceptRoomReservation={acceptRoomReservation}
        declineRoomReservation={declineRoomReservation}
        archiveRoomReservation={archiveRoomReservation}
      />
    </div>
  );
}
