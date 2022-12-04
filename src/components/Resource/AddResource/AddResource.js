import { useState, useEffect, useRef } from "react";

import BuildingService from "../../../services/BuildingService";

import ResourceService from "../../../services/ResourceService";

import RoomService from "../../../services/RoomService";

import AddResourceForm from "./AddResourceForm";

import { Comment } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

export default function AddResource(props) {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState();
  const [loaded, setLoaded] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectecBuildingId, setSelectedBuildingId] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [buildingSelected, setBuildingSelected] = useState(false);
  const [resourceType, setResourceType] = useState();
  const [workingCondition, setWorkingCondition] = useState();
  const [bookable, setBookable] = useState(true);
  const nameRef = useRef();

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
    setLoaded(true);
  }

  async function getAllRoom(buildingId) {
    const { data } = await RoomService.findAllByBuildingId(buildingId);
    setRooms((currentvalue) => {
      return data;
    });
  }

  useEffect(() => {
    getAllBuilding();
  }, []);

  function onSubmit(event) {
    event.preventDefault();

    const room = { id: selectedRoomId };

    const resource = {
      resourceName: nameRef.current.value,
      resourceType: resourceType,
      workingCondition: workingCondition,
      isBookable: bookable,
      room: room,
    };

    console.log(resource);
    addResource(resource);
  }

  async function addResource(resource) {
    await ResourceService.addResource2(resource)
      .then((res) => {
        toast.success(
          res.data.workingCondition +
            " " +
            res.data.resourceType +
            " " +
            res.data.resourceName +
            " in Room " +
            res.data.room.name +
            " added successfully"
        );
      })
      .catch((err) => {
        toast.error("Something went wrong. Please check console");
      })
      .finally(setStatus(true));
  }

  function handleResourceTypeChange(event) {
    setResourceType(event.target.value);
  }

  function handleWorkingConditionChange(event) {
    setWorkingCondition(event.target.value);
  }

  function handleSelectedBuildingIdChange(event) {
    setSelectedBuildingId(event.target.value);
    setBuildingSelected(true);
    getAllRoom(event.target.value);
  }

  function handleBookableChange(event) {
    setBookable(event.target.checked);
  }

  async function handleRoomIdChange(event) {
    setSelectedRoomId(event.target.value);
  }

  if (loaded && props.currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        <div>
          {" "}
          {status && (
            <div>
              <ToastContainer />{" "}
            </div>
          )}
        </div>
        <div>
          <AddResourceForm
            onSubmit={onSubmit}
            nameRef={nameRef}
            handleResourceTypeChange={handleResourceTypeChange}
            handleWorkingConditionChange={handleWorkingConditionChange}
            handleSelectedBuildingIdChange={handleSelectedBuildingIdChange}
            buildings={buildings}
            buildingSelected={buildingSelected}
            handleRoomIdChange={handleRoomIdChange}
            handleBookableChange={handleBookableChange}
            rooms={rooms}
          />
        </div>
      </div>
    );
  }

  if (!loaded) {
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
