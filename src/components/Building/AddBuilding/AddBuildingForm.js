export default function AddBuildingForm(props) {
  return (
    <div>
      <h3>Add Building</h3>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="name"> Name</label>
        <input ref={props.nameRef} type="name" id="name" />
        <br />

        <label htmlFor="floors">Floors</label>
        <input
          ref={props.floorsRef}
          type="number"
          id="floors"
          placeholder="Number of Floors"
        />
        <br />

        <label htmlFor="address"> Please write the Address below:</label>
        <br />

        <label htmlFor="street"> Street</label>
        <input ref={props.streetRef} type="street" id="street" />
        <label htmlFor="city"> City</label>
        <input
          ref={props.cityRef}
          type="city"
          id="city"
          defaultValue={"Waco"}
        />
        <br />

        <label htmlFor="state"> State</label>
        <input
          ref={props.stateRef}
          type="state"
          id="state"
          defaultValue={"Texas"}
        />
        <label htmlFor="zip"> Zip</label>
        <input ref={props.zipRef} type="zip" id="zip" defaultValue={"76706"} />
        <br />

        <button type="submit">Add Building</button>
      </form>
    </div>
  );
}
