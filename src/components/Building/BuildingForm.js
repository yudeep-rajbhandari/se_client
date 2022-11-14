import React, { useState } from "react";
import adminService from "../../services/admin.service";
export default function BuildingForm(props) {
  const [name, setName] = useState(props.selectedBuilding.name);
  const [floors, setFloors] = useState(props.selectedBuilding.floors);
  const [street, setStreet] = useState(props.selectedBuilding.address.street);
  const [city, setCity] = useState(props.selectedBuilding.address.city);
  const [state, setState] = useState(props.selectedBuilding.address.state);
  const [zip, setZip] = useState(props.selectedBuilding.address.zip);

  function onSave(event) {
    event.preventDefault();

    const address = {
      floors: floors,
      street: street,
      city: city,
      state: state,
      zip: zip,
    };
    const building = {
      id: props.selectedBuilding.id,
      name: name,
      floors: floors,
      address: address,
    };

    updateBuilding(building);
  }

  async function updateBuilding(building) {
    console.log(building);
    adminService.updateBuilding(building);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleFloorsChange(event) {
    setFloors(event.target.value);
  }
  function handleStreetChange(event) {
    setStreet(event.target.value);
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  function handleStateChange(event) {
    setState(event.target.value);
  }
  function handleZipChange(event) {
    setZip(event.target.value);
  }

  return (
    <div>
      <h3> Building Form: {props.selectedBuilding.name}</h3>

      <form onSubmit={onSave}>
        <label htmlFor="name"> Name</label>
        <input
          defaultValue={name}
          type="name"
          id="name"
          onChange={handleNameChange}
        />
        <label htmlFor="floors"> Floors</label>
        <input
          defaultValue={floors}
          type="number"
          id="floors"
          onChange={handleFloorsChange}
        />
        <br />
        <label htmlFor="Address"> Address</label>
        <br />
        <label htmlFor="street"> Street</label>
        <input
          defaultValue={street}
          type="street"
          id="street"
          onChange={handleStreetChange}
        />

        <label htmlFor="city"> City</label>
        <input
          defaultValue={city}
          type="city"
          id="city"
          onChange={handleCityChange}
        />

        <label htmlFor="state"> State</label>
        <input
          defaultValue={state}
          type="state"
          id="state"
          onChange={handleStateChange}
        />

        <label htmlFor="zip"> Zip</label>
        <input
          defaultValue={zip}
          type="zip"
          id="zip"
          onChange={handleZipChange}
        />
        <br />
        <button type="submit" onClick={() => onSave}>
          {" "}
          Save
        </button>

        {/* <button> Cancel</button> */}
      </form>
    </div>
  );
}
