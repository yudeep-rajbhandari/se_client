export default function AddRoomForm(props) {
  const options = props.buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
    </option>
  ));
  return (
    <div>
      <h3> Add Room</h3>

      <form onSubmit={props.onSubmit}>
        <label htmlFor="name"> Name</label>
        <input ref={props.nameRef} type="name" id="name" required />

        <br />
        <label htmlFor="roomType">
          Room Type
          <select onChange={props.handleRoomTypeChange}>
            <option value="0"> Select Room Type</option>
            <option value="classroom">Class Room</option>
            <option value="washroom">Wash Room</option>
            <option value="lab">Lab</option>
            <option value="staffroom">Staff Room</option>
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
            {options}
          </select>
        </label>

        <br />
        <button type="submit"> Add Room</button>
      </form>
    </div>
  );
}
