import axios from "axios";
import authHeader from "./auth-header";

const ALLOTMENT_URL = "http://localhost:8080/api/allotment";

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
}

export default new AllotmentService();
