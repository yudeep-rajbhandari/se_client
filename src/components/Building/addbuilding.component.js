import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import adminService from "../../services/admin.service";

class AddBuilding extends Component {
  state = {
    name: "",
    zip: "76706",
    state: "Texas",
    city: "Waco",
    formError: false,
  };
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const building = {
      name: this.state.name,
      floors: this.state.floors,
      address: {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
      },
    };
    adminService.addBuidling(building).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="addBuilding">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
            Floors:
            <input type="number" name="floors" onChange={this.handleChange} />
          </label>

          <label>
            Street:
            <input type="text" name="street" onChange={this.handleChange} />
          </label>
          <label>
            City:
            <input
              defaultValue={this.state.city}
              type="text"
              name="city"
              onChange={this.handleChange}
            />
          </label>
          <label>
            State:
            <input
              defaultValue={this.state.state}
              type="text"
              name="state"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Zip:
            <input
              defaultValue={this.state.zip}
              type="text"
              name="zip"
              onChange={this.handleChange}
            />
          </label>
          <br />

          <button type="submit"> Create Building</button>
        </form>
      </div>
    );
  }
}
export default AddBuilding;
