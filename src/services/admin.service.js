import axios from "axios";
import authHeader from "./auth-header";
import env from "react-dotenv";

const API_URL = env.abc + "test/";
const BUILDING_URL = env.abc + "building/";
const ROOM_URL = env.abc + "room/";
const SCHEDULE_URL = env.abc + "schedule/";
const USER_URL = env.abc + "user/";

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
  async addBulkSchedule(formData) {
    return axios.post(SCHEDULE_URL + "addSchedule", formData, {
      headers: authHeader(),
    });
  }

  getAllUser() {
    return axios.get(USER_URL + "getAllUser", {
      headers: authHeader(),
    });
  }

  updateRole(user) {
    return axios.put(USER_URL + "updateRole", user, { headers: authHeader() });
  }
}

export default new AdminService();
