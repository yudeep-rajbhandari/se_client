import RoomReservationsService from "../../../services/RoomReservationsService";
import RoomReservationTable from "./RoomReservationTable";

export default function ListRoomReservation(props) {
  async function acceptRoomReservation(reservationId) {
    await RoomReservationsService.acceptRoomReservation(reservationId);
    props.reloadComponent();
  }
  async function declineRoomReservation(reservationId) {
    await RoomReservationsService.declineRoomReservation(reservationId);
    props.reloadComponent();
  }
  async function archiveRoomReservation(reservationId) {
    await RoomReservationsService.archiveRoomReservation(reservationId);
    props.reloadComponent();
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
