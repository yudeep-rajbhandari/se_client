import axios from "axios";
import authHeader from "./auth-header";

const ROOM_URL = "http://localhost:8080/api/room";

class RoomService {
  addRoom(room) {
    return axios.post(ROOM_URL + "/addRoom2", room, {
      headers: authHeader(),
    });
  }
}

export default new RoomService();
