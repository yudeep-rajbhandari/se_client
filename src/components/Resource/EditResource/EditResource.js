import { useState, useEffect } from "react";
import ResourceService from "../../../services/ResourceService";
export default function EditResource(props) {
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(false);
  const buildingOptions = props.buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
    </option>
  ));

  useEffect(() => {
    setFormDefaultValues();
  }, [props.selectedResource]);

  function setFormDefaultValues() {
    setName(props.selectedResource.resourceName);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }
  async function onSave(event) {
    event.preventDefault();
    const resource = {
      id: props.selectedResource.id,
      resourceName: name,
    };
    await editResource(resource);
  }

 

  async function editResource(resource) {
    await ResourceService.editResource(resource)
      .then((res) => {
        setStatus(true);
        setMessage("Resource updated successfully");
      })
      .catch((error) => {
        setStatus(true);
        setMessage("Some error occured");
      });
  }
  return (
    <div>
      <h3> Edit Resource : {props.selectedResource.resourceName}</h3>
      <form>
        <label htmlFor="name"> Name</label>
        <input
          defaultValue={name}
          type="name"
          id="name"
          onChange={handleNameChange}
        />

        {/* <label htmlFor="buildings">
          Associated Building
          <select onChange={props.handleSelectedBuildingIdChange}>
            <option value="0">Select Associated Building</option>
            {buildingOptions}
          </select>
        </label> */}
        <button type="submit" onClick={onSave}>
          {" "}
          Edit Resource
        </button>
      </form>
      {status && message}
    </div>
  );
}
