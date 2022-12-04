import { useEffect, useState } from "react";
import RoomReservationsService from "../../../services/RoomReservationsService";
import RoomReservationTable from "./RoomReservationTable";
import { toast, ToastContainer } from "react-toastify";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import env from "react-dotenv";
var stompClient = null;
export default function ListRoomReservation(props) {
  const BASE_URL = env.websocket;
  let Sock = new SockJS(BASE_URL + "myws");

  const [publicChats, setpublicChats] = useState([]);

  console.log(Sock);

  const [currentUser, setCurrentUser] = useState(props.currentUser);

  useEffect(() => {
    stompClient = over(Sock);
    const onConnected = () => {
      stompClient.subscribe("/user/topic/public", onPublicMessageReceived, {
        name: currentUser.username,
      });
    };
    stompClient.connect({ username: currentUser.username }, onConnected);
  }, []);

  useEffect(() => {}, [publicChats]);

  async function acceptRoomReservation(reservationId) {
    await RoomReservationsService.acceptRoomReservation(reservationId).then(
      (res) => {
        toast.success("Reservation Approved");
        sendPublicMessageOnAccepted(reservationId, res.data.status);
      }
    );
    props.reloadComponent();
  }
  async function declineRoomReservation(reservationId) {
    await RoomReservationsService.declineRoomReservation(reservationId).then(
      (res) => {
        toast.success("Reservation Declined");
        sendPublicMessageOnAccepted(reservationId, res.data.status);
      }
    );
    props.reloadComponent();
  }
  async function archiveRoomReservation(reservationId) {
    await RoomReservationsService.archiveRoomReservation(reservationId).then(
      (res) => {
        toast.success("Reservation Archived");
        sendPublicMessageOnAccepted(reservationId, res.data.status);
      }
    );
    props.reloadComponent();
  }
  const sendPublicMessageOnAccepted = (reservationId, status) => {
    let chatMessage = {
      senderName: currentUser.username,
      message: "Reservation " + reservationId + " " + status,
      status: "MESSAGE",
    };
    console.log("chatmessage", chatMessage);
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onPublicMessageReceived = (message) => {
    console.log("Test");
    let messageData = JSON.parse(message.body);
    publicChats.push(messageData);
    setpublicChats([...publicChats]);
  };
  return (
    <div>
      {publicChats.map((chat) => (
        <li>
          {chat.senderName}:{chat.message}
        </li>
      ))}
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
