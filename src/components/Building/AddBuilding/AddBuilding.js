import React, { useRef, useState } from "react";

import AdminService from "../../../services/admin.service";
import AddBuildingForm from "./AddBuildingForm";
import { Rings } from "react-loader-spinner";

export default function AddBuilding() {
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
  const [loaded, setloaded] = useState(true);

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
      address,
      latitude: latitudeRef.current.value,
      longitude: longitudeRef.current.value,
    };
    addBuidling(building);
  }

  async function addBuidling(building) {
    await AdminService.addBuidling(building).then((res) => {
      setMessage("Building " + res.data.name + " successfully added");
      setStatus(true);
    });
  }

  if (loaded) {
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
  }
}
