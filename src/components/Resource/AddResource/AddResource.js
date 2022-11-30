import { useState, useEffect, useRef } from "react";

import BuildingService from "../../../services/BuildingService";

import ResourceService from "../../../services/ResourceService";

import RoomService from "../../../services/RoomService";

import AddResourceForm from "./AddResourceForm";

import { Rings } from "react-loader-spinner";

export default function AddResource() {
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

      room: room,
    };

    addResource(resource);
  }

  async function addResource(resource) {
    await ResourceService.addResource2(resource)

      .then((res) => {
        setStatus(true);

        setMessage(
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
        setStatus(true);

        setMessage("Something went wrong. Please check console");
      });
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

  async function handleRoomIdChange(event) {
    setSelectedRoomId(event.target.value);
  }

  if (loaded) {
    return (
      <div>
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
            rooms={rooms}
          />
        </div>

        <div>{status && message}</div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div>
        <Rings
          align="center"
          height="80"
          width="80"
          color="#4fa94d"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }
}
