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
  } else {
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
