import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const BUILDING_URL = 'http://localhost:8080/api/building/'
const ROOM_URL = 'http://localhost:8080/api/room/'
const RESERVATION_URL = 'http://localhost:8080/api/reservation/'

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  addBuidling() {
    return axios.post(BUILDING_URL + 'addBuilding', { headers: authHeader() });
  }
  
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAddBuilding(){
    return axios.get(BUILDING_URL + 'addBuilding',{ headers: authHeader() })
  }
  getRoom(id){
    return axios.get(ROOM_URL +id,{ headers: authHeader() })
  }
  makeReservation(id,reservation){
    return axios.post(RESERVATION_URL+"room/" +id,reservation[0],{ headers: authHeader() })
  }
}

export default new UserService();
