import axios from "axios";
import authHeader from "./auth-header";
import env from "react-dotenv";

const ALLOTMENT_URL = env.abc + "allotment";

class AllotmentService {
  addAllotment(allotment) {
    return axios.post(ALLOTMENT_URL + "/addAllotment", allotment, {
      headers: authHeader(),
    });
  }

  getAllAllotment() {
    return axios.get(ALLOTMENT_URL + "/getAllAllotment", {
      headers: authHeader(),
    });
  }

  deleteAllotment(allotmentId) {
    return axios.delete(ALLOTMENT_URL + "/deleteAllotment/" + allotmentId, {
      headers: authHeader(),
    });
  }

  getMyAllotment(userId) {
    return axios.get(ALLOTMENT_URL + "/getMyAllotment/" + userId, {
      headers: authHeader(),
    });
  }
}

export default new AllotmentService();
