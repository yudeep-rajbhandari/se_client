import React, { useRef, useState } from "react";
import AuthService from "../../services/auth.service";
import adminService from "../../services/admin.service";

export default function AddBuilding() {
  const nameRef = useRef();
  const floorsRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const [showBuilding, setShowBuilding] = useState(false);

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
    await adminService.addBuidling(building).then((res) => {
      console.log(res);
      setMessage("Building added successfully");
      setStatus(true);
    });
  }

  function listAllBuilding() {
    console.log("All buildings");
    setShowBuilding(true);
  }

  async function getAllBuilding() {
    const { data } = await adminService.getAllBuilding();
    console.log(data);
  }

  return (
    <div>
      <h3> Add Building</h3>
      <form onSubmit={onSubmit}>
        {/* Building name */}
        <label htmlFor="name"> Name</label>
        <input ref={nameRef} type="name" id="name" />
        <br />
        {/* Floors */}
        <label htmlFor="floors"> Number of Floors</label>
        <input ref={floorsRef} type="number" id="floors" />
        <br />
        <label htmlFor="address"> Please write the Address below:</label>
        <br />
        <label htmlFor="street"> Street</label>
        <input ref={streetRef} type="street" id="street" />
        <label htmlFor="city"> City</label>
        <input ref={cityRef} type="city" id="city" defaultValue={"Waco"} />
        <br />
        <label htmlFor="state"> State</label>
        <input ref={stateRef} type="state" id="state" defaultValue={"Texas"} />
        <label htmlFor="zip"> Zip</label>
        <input ref={zipRef} type="zip" id="zip" defaultValue={"76706"} />
        <br />

        <button type="submit">Add Building</button>
      </form>

      {status && message}

      <button onClick={() => listAllBuilding()}> List All Buildings</button>
    </div>
  );
}
