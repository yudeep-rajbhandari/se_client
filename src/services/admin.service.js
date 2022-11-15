import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const BUILDING_URL = "http://localhost:8080/api/building/";
const ROOM_URL = "http://localhost:8080/api/room/";

class AdminService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }
  addBuidling(building) {
    return axios.post(BUILDING_URL + "addBuilding", building, {
      headers: authHeader(),
    });
  }

  addRoom(room) {
    return axios.post(ROOM_URL + "addRoom", room, {
      headers: authHeader(),
    });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new AdminService();
