import { useRef, useState, useEffect } from "react";

import AddRoomForm from "./AddRoomForm";
import RoomService from "../../../services/RoomService";
import BuildingService from "../../../services/BuildingService";
import { Comment } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
export default function AddRoom(props) {
  const nameRef = useRef();
  const floorRef = useRef();
  const roomTypeList = ["CLASSROOM", "STAFFROOM", "LAB", "WASHROOM"];

  const [roomType, setRoomType] = useState(roomTypeList[0]);
  const [isBookable, setIsBookable] = useState(true);
  const [buildings, setBuildings] = useState([]);

  const [selectedBuildingId, setSelectedBuildingId] = useState();
  const [selectedBuilding, setSelectedBuilding] = useState();
  const [loaded, setLoaded] = useState(false);

  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    getAllBuilding();
  }, []);

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
    setLoaded(true);
  }

  function onSubmit(event) {
    event.preventDefault();
    const room = {
      name: nameRef.current.value,
      floor: floorRef.current.value,
      roomType: roomType,
      isBookable: isBookable,
      building: selectedBuilding,
    };
    addRoom(room);
  }

  async function addRoom(room) {
    await RoomService.addRoom(room)
      .then((res) => {
        toast.success(
          res.data.roomType +
            " " +
            res.data.name +
            " in Building " +
            res.data.building.name +
            " has been added successfully"
        );
      })
      .catch((error) => {
        toast.error("Error in adding room: " + error.message);
      })
      .finally(setStatus(true));
  }
  function handleRoomTypeChange(event) {
    setRoomType(event.target.value);
  }

  function handleIsBookableChange(event) {
    setIsBookable(event.target.checked);
  }

  function handleSelectedBuildingIdChange(event) {
    setSelectedBuildingId(event.target.value);
    getSelectedBuilding(event.target.value);
  }

  async function getSelectedBuilding(selectedBuildingId) {
    const { data } = await BuildingService.findBuildingById(selectedBuildingId);
    setSelectedBuilding(data);
  }

  if (loaded && props.currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        {status && (
          <div>
            <ToastContainer />{" "}
          </div>
        )}
        <AddRoomForm
          nameRef={nameRef}
          floorRef={floorRef}
          roomType={roomType}
          handleRoomTypeChange={handleRoomTypeChange}
          isBookable={isBookable}
          handleIsBookableChange={handleIsBookableChange}
          buildings={buildings}
          handleSelectedBuildingIdChange={handleSelectedBuildingIdChange}
          onSubmit={onSubmit}
        />
        <div>{status && message}</div>
      </div>
    );
  } else {
    return (
      <div>
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#FFB81C"
          backgroundColor="#154734"
        />
      </div>
    );
  }
}
