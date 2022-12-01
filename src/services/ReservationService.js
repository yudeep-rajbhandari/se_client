import axios from "axios";
import authHeader from "./auth-header";
import env from "react-dotenv";

const RESERVATION_URL = env.abc + "reservation";

class ReservationService {
  getMyReservation(userId) {
    return axios.get(RESERVATION_URL + "/getMyReservation/" + userId, {
      headers: authHeader(),
    });
  }

  cancelReservation(id) {
    return axios.put(RESERVATION_URL + "/cancelReservation/" + id, null, {
      headers: authHeader(),
    });
  }
}

export default new ReservationService();
