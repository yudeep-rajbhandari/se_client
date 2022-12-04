import Button from "@mui/material/Button";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
export default function AddResourceForm(props) {
  const buildingOptions = props.buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
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
            <option value="indoor">INDOOR</option>
            <option value="outdoor">OUTDOOR</option>
          </select>
        </label>

        <br />
        <label htmlFor="resourceCondition">
          Resource Condition
          <select onChange={props.handleResourceWorkingCondition}>
            <option value="0"> Select Working Condition</option>
            <option value="excellent">EXCELLENT</option>
            <option value="good">GOOD</option>
            <option value="fair">FAIR</option>
          </select>
        </label>

        <br />
        <label htmlFor="isBookable" value={props.isBookable}>
          Bookable?
        </label>
        <input type="checkbox" onChange={props.handleIsBookableChange} />

        <br />
        <label htmlFor="buildings">
          Associated Building
          <select onChange={props.handleSelectedBuildingIdChange}>
            {buildingOptions}
          </select>
        </label>

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
