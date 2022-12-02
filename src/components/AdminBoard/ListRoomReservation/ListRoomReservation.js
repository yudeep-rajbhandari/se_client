import RoomReservationsService from "../../../services/RoomReservationsService";
import RoomReservationTable from "./RoomReservationTable";
import { toast, ToastContainer } from "react-toastify";
export default function ListRoomReservation(props) {
  async function acceptRoomReservation(reservationId) {
    await RoomReservationsService.acceptRoomReservation(reservationId).then(
      (res) => {
        toast.success("Reservation Approved");
      }
    );
    props.reloadComponent();
  }
  async function declineRoomReservation(reservationId) {
    await RoomReservationsService.declineRoomReservation(reservationId).then(
      (res) => {
        toast.success("Reservation Declined");
      }
    );
    props.reloadComponent();
  }
  async function archiveRoomReservation(reservationId) {
    await RoomReservationsService.archiveRoomReservation(reservationId).then(
      (res) => {
        toast.success("Reservation Archived");
      }
    );
    props.reloadComponent();
  }

  return (
    <div>
      <ToastContainer autoClose={1000} />{" "}
      <RoomReservationTable
        roomReservationList={props.roomReservationList}
        acceptRoomReservation={acceptRoomReservation}
        declineRoomReservation={declineRoomReservation}
        archiveRoomReservation={archiveRoomReservation}
      />
    </div>
  );
}
