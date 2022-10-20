import React, { Component } from "react";
import axios from "axios";
import AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
class AddBuilding extends Component {
  state = {
    name: "",
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
    console.log("Building is", building);
    axios
      .post("http://localhost:8080/api/building/addBuilding", building, {
        headers: authHeader(),
      })
      .then((res) => {
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
            <input type="text" name="city" onChange={this.handleChange} />
          </label>
          <label>
            State:
            <input type="text" name="state" onChange={this.handleChange} />
          </label>
          <label>
            Zip:
            <input type="text" name="zip" onChange={this.handleChange} />
          </label>
          <button type="submit"> Create </button>
        </form>
      </div>
    );
  }
}
export default AddBuilding;
