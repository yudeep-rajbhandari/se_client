import { useState } from "react";
import Button from "@mui/material/Button";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
export default function AddResourceForm(props) {
  const buildingOptions = props.buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
    </option>
  ));

  const roomOptions = props.rooms.map((room) => (
    <option key={room.id} value={room.id}>
      {room.name}
    </option>
  ));

  return (
    <div>
      <h3> Add Resource</h3>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="name"> Resource Name</label>
        <input ref={props.nameRef} type="name" id="name" required />

        <br />
        <label htmlFor="resourceType">
          Resource Type
          <select onChange={props.handleResourceTypeChange}>
            <option value="0"> Select Resource Type</option>
            <option value="INDOOR">INDOOR</option>
            <option value="OUTDOOR">OUTDOOR</option>
          </select>
        </label>

        <br />
        <label htmlFor="resourceCondition">
          Resource Condition
          <select onChange={props.handleWorkingConditionChange}>
            <option value="0"> Select Working Condition</option>
            <option value="EXCELLENT">EXCELLENT</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
          </select>
        </label>

        <label htmlFor="bookable">
          Bookable?
          <input type="checkbox" onChange={props.handleBookableChange} />
        </label>

        <label htmlFor="buildings">
          Associated Building
          <select onChange={props.handleSelectedBuildingIdChange}>
            <option value="0" key="0">
              ---Select Building---
            </option>
            {buildingOptions}
          </select>
        </label>
        {props.buildingSelected && (
          <label htmlFor="rooms">
            Associated Room
            <select onChange={props.handleRoomIdChange}>
              <option value="0" key="0">
                ---Select Room---
              </option>
              {roomOptions}
            </select>
          </label>
        )}
        <br />
        <Button
          startIcon={<SaveRoundedIcon />}
          variant="contained"
          type="submit"
        >
          {" "}
          Save Resource
        </Button>
      </form>
    </div>
  );
}
