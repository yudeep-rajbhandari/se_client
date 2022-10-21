import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import adminService from "../../services/admin.service";

class AddRoom extends Component {
  state = {
    name: "",
    roomType: "lab",
    isBookable: true,
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const room = {
      name: this.state.name,
      roomType: this.state.roomType,
      isBookable: this.state.isBookable,
    };
    console.log("Room is", room);
    adminService.addRoom(room).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };
  handleNameChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRoomTypeChange = (event) => {
    this.setState({
      roomType: event.target.value,
    });
  };

  handleBookableChange = (event) => {
    this.setState({
      isBookable: event.target.checked,
    });
  };

  render() {
    return (
      <div className="addRoom">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleNameChange} />
          </label>

          <label>
            RoomType:
            <select
              value={this.state.roomType}
              onChange={this.handleRoomTypeChange}
            >
              <option value="classroom">Class Room</option>
              <option value="washroom">Wash Room</option>
              <option value="lab">Lab</option>
              <option value="staffroom">Staff Room</option>
            </select>
          </label>
          <br />
          <label>
            Is Bookable:
            <input
              name="isBookable"
              type="checkbox"
              checked={this.state.isBookable}
              onChange={this.handleBookableChange}
            />
          </label>
          <button type="submit"> Create </button>
        </form>
      </div>
    );
  }
}
export default AddRoom;
