import axios from "axios";
import authHeader from "./auth-header";
import env from "react-dotenv";

const RESOURCE_URL = env.abc+"resource";

class RoomService {
  addResource2(resource) {
    return axios.post(RESOURCE_URL + "/addResource2", resource, {
      headers: authHeader(),
    });
  }


  getAllResource(){
    return axios.get(RESOURCE_URL + "/getAllResource", {
        headers: authHeader(),
      })
  }
}

export default new RoomService();