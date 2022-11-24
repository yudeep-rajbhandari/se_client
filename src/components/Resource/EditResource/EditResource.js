import { useState, useEffect } from "react";
export default function EditResource(props) {
  const [name, setName] = useState();

  const buildingOptions = props.buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
    </option>
  ));

  useEffect(() => {
    setFormDefaultValues();
  }, [props.selectedResource.resourceName]);

  function setFormDefaultValues() {
    setName(props.selectedResource.resourceName);
  }

  
  return (
    <div>
      <h3> Edit Resource : {props.selectedResource.resourceName}</h3>
      <form>
        <label htmlFor="name"> Name</label>
        <input defaultValue={name} type="name" id="name" />

        <label htmlFor="buildings">
          Associated Building
          <select onChange={props.handleSelectedBuildingIdChange}>
            <option value="0">Select Associated Building</option>
            {buildingOptions}
          </select>
        </label>
      </form>
    </div>
  );
}
