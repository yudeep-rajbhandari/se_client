import React, { useRef, useState } from "react";

import AddBuildingForm from "./AddBuildingForm";
import { Comment } from "react-loader-spinner";
import BuildingService from "../../../services/BuildingService";

export default function AddBuilding(props) {
  const nameRef = useRef();
  const floorsRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [loaded, setloaded] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const address = {
      street: streetRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip: zipRef.current.value,
    };

    const building = {
      name: nameRef.current.value,
      floors: floorsRef.current.value,
      latitude: latitudeRef.current.value,
      longitude: longitudeRef.current.value,

      address,
    };
    addBuidling(building);
  }

  async function addBuidling(building) {
    await BuildingService.addBuidling(building)
      .then((res) => {
        setMessage("Building " + res.data.name + " successfully added");
      })
      .catch((error) => {
        setMessage("some error occurred. Please try again");
      })
      .finally(setStatus(true));
  }

  if (!loaded) {
    return (
      <div>
        <AddBuildingForm
          nameRef={nameRef}
          floorsRef={floorsRef}
          streetRef={streetRef}
          cityRef={cityRef}
          stateRef={stateRef}
          zipRef={zipRef}
          latitudeRef={latitudeRef}
          longitudeRef={longitudeRef}
          onSubmit={onSubmit}
        />

        <br />
        {status && message}
        <br />
      </div>
    );
  } else {
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
    </div>;
  }
}
