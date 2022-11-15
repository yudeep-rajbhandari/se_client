import axios from "axios";
import authHeader from "./auth-header";

const BUILDING_URL = "http://localhost:8080/api/building";

class BuildingService {
  findBuildingById(buildingId) {
    return axios.get(BUILDING_URL + "/findBuildingById/" + buildingId, {
      headers: authHeader(),
    });
  }
}

export default new BuildingService();
