import React, { useRef, useState } from "react";

import AdminService from "../../../services/admin.service";
import AddBuildingForm from "./AddBuildingForm";

export default function AddBuilding() {
  const nameRef = useRef();
  const floorsRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);

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
    };
    addBuidling(building);
  }

  async function addBuidling(building) {
    await AdminService.addBuidling(building).then((res) => {
      setMessage("Building " + res.data.name + " successfully added");
      setStatus(true);
    });
  }

  return (
    <div>
      <div>
        <AddBuildingForm
          nameRef={nameRef}
          floorsRef={floorsRef}
          streetRef={streetRef}
          cityRef={cityRef}
          stateRef={stateRef}
          zipRef={zipRef}
          onSubmit={onSubmit}
        />

        <br />
        {status && message}
        <br />
      </div>
    </div>
  );
}
