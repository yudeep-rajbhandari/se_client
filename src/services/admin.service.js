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

  updateRoleToAdmin(user) {
    return axios.put(USER_URL + "updateRoleToAdmin", user, {
      headers: authHeader(),
    });
  }

  updateRoleToUser(user) {
    return axios.put(USER_URL + "updateRoleToUser", user, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
