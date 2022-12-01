import axios from "axios";
import authHeader from "./auth-header";
import env from "react-dotenv";

const BUILDING_URL = env.abc + "building";

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

  addGate(gate, buildingId) {
    return axios.put(BUILDING_URL + "/addGate/" + buildingId, gate, {
      headers: authHeader(),
    });
  }
}

export default new BuildingService();
