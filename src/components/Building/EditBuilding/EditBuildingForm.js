import React, { useState, useEffect } from "react";
import BuildingService from "../../../services/BuildingService";

export default function BuildingForm(props) {
  const [name, setName] = useState();
  const [floors, setFloors] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();

  function setFormDefaultValues() {
    setName(props.selectedBuilding.name);
    setFloors(props.selectedBuilding.floors);
    setStreet(props.selectedBuilding.address.street);
    setCity(props.selectedBuilding.address.city);
    setState(props.selectedBuilding.address.state);
    setZip(props.selectedBuilding.address.zip);
  }

  useEffect(() => {
    setFormDefaultValues();
  }, [props.selectedBuilding]);

  function onSave(event) {
    event.preventDefault();
    const address = {
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
    await BuildingService.updateBuilding(building);
    props.makeEditFalse();
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
      <div>
        <h3> Edit Building: {props.selectedBuilding.name}</h3>

        <form>
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
          <button type="submit" onClick={onSave}>
            {" "}
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
