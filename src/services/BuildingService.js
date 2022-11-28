import axios from "axios";
import authHeader from "./auth-header";

const BUILDING_URL = "http://localhost:8080/api/building";

class BuildingService {
  findBuildingById(buildingId) {
    return axios.get(BUILDING_URL + "/findBuildingById/" + buildingId, {
      headers: authHeader(),
    });
  }

  getAllBuilding() {
    return axios.get(BUILDING_URL + "/getAllBuilding", {
      headers: authHeader(),
    });
  }

  updateBuilding(building) {
    return axios.put(BUILDING_URL + "/updateBuilding", building, {
      headers: authHeader(),
    });
  }

  getBuildingCount() {
    return axios.get(BUILDING_URL + "/getBuildingCount", {
      headers: authHeader(),
    });
  }
}

export default new BuildingService();
