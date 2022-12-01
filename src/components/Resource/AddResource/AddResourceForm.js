import { Button } from "@mui/material";

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
      <h3 style={{ color: "#154734" }}>Add Resource</h3>

      <form onSubmit={props.onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" ref={props.nameRef} />

        <label htmlFor="resourceType">
          Resource Type
          <select onChange={props.handleResourceTypeChange}>
            <option value="0"> Select Resource Type</option>
            <option value="INDOOR">INDOOR</option>
            <option value="OUTDOOR">OUTDOOR</option>
          </select>
        </label>

        <label htmlFor="workingCondition">
          Working Condition
          <select onChange={props.handleWorkingConditionChange}>
            <option value="0"> Select Working Condition</option>
            <option value="EXCELLENT">EXCELLENT</option>
            <option value="GOOD">GOOD</option>
            <option value="FAIR">FAIR</option>
          </select>
        </label>

        <label htmlFor="buildings">
          Associated Building
          <select onChange={props.handleSelectedBuildingIdChange}>
            <option value="0">Select Associated Building</option>
            {buildingOptions}
          </select>
        </label>

        {props.buildingSelected && (
          <div>
            <label htmlFor="room">
              Associated Room
              <select onChange={props.handleRoomIdChange}>
                <option value="0">Select Associated Room</option>
                {roomOptions}
              </select>
            </label>
          </div>
        )}

        <Button
          style={{ backgroundColor: "#154734", color: "#FFB81C" }}
          type="submit"
          name="Add Resource"
          onClick={() => props.onSubmit}
        >
          Add Resource
        </Button>
      </form>
    </div>
  );
}
