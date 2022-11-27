import axios from "axios";
import authHeader from "./auth-header";

const RESOURCE_URL = "http://localhost:8080/api/resource";

class RoomService {
  addResource2(resource) {
    return axios.post(RESOURCE_URL + "/addResource2", resource, {
      headers: authHeader(),
    });
  }

  getAllResource() {
    return axios.get(RESOURCE_URL + "/getAllResource", {
      headers: authHeader(),
    });
  }

  getResourceCount() {
    return axios.get(RESOURCE_URL + "/getResourceCount", {
      headers: authHeader(),
    });
  }
}

export default new RoomService();
