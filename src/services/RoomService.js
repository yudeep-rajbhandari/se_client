import axios from "axios";
import authHeader from "./auth-header";
import env from "react-dotenv";

const ROOM_URL = env.abc+"room";

class RoomService {
  addRoom(room) {
    return axios.post(ROOM_URL + "/addRoom2", room, {
      headers: authHeader(),
    });
  }

  findAll() {
    return axios.get(ROOM_URL + "/findAllRoom", { headers: authHeader() });
  }

  updateRoom(room) {
    return axios.put(ROOM_URL + "/updateRoom", room, { headers: authHeader() });
  }

  findAllByBuildingId(buildingId) {
    return axios.get(ROOM_URL + "/findAllByBuildingId/" + buildingId, {
      headers: authHeader(),
    });
  }
}

export default new RoomService();