import axios from "axios";
import authHeader from "./auth-header";
import env from "react-dotenv";

const API_URL = env.abc + "test/";
const BUILDING_URL = env.abc + "building/";
const ROOM_URL = env.abc + "room/";
const RESERVATION_URL = env.abc + "reservation/";
const SCHEDULE_URL = env.abc + "schedule/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  addBuidling() {
    return axios.post(BUILDING_URL + "addBuilding", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getAddBuilding() {
    return axios.get(BUILDING_URL + "addBuilding", { headers: authHeader() });
  }
  getRoom(id) {
    return axios.get(ROOM_URL + id, { headers: authHeader() });
  }
  getAllBookableRoom() {
    return axios.get(ROOM_URL + "all/bookable", { headers: authHeader() });
  }
  getAllClassRoom(id) {
    return axios.get(ROOM_URL + "findAllClassRoom/?buildlingId=" + id, {
      headers: authHeader(),
    });
  }

  getMyReservation(id) {
    return axios.get(RESERVATION_URL + "byUserId/?id=" + id, {
      headers: authHeader(),
    });
  }
  makeReservation(id, reservation) {
    return axios.post(RESERVATION_URL + "room/" + id, reservation, {
      headers: authHeader(),
    });
  }

  getSchedule(date) {
    return axios.post(SCHEDULE_URL + "getSchedule", date, {
      headers: authHeader(),
    });
  }
  getRoomBySchedule(fromDate,toDate) {
    return axios.get(ROOM_URL + "getRoomBySchedule?fromDate="+fromDate+"&toDate="+toDate, { headers: authHeader() });
  }
  getMyAllotment() {
    return null;
  }

  reserveResource(resourceId,body) {
    return axios.post(RESERVATION_URL + "resource/" + resourceId, body,{
      headers: authHeader(),
    });
  }
}

export default new UserService();
