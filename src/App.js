import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login/login.component";
import Register from "./components/Register/register.component";
import Home from "./components/Home/home.component";
import AddBuilding from "./components/Building/addbuilding.component";
import Profile from "./components/Profile/profile.component";
import BoardUser from "./components/UserBoard/board-user.component";
import BoardAdmin from "./components/AdminBoard/board-admin.component";

import EventBus from "./common/EventBus";
import AddRoom from "./components/Room/addroom.component";
import AddResource from "./components/Resource/addresource.component";
import ReserveRoom from "./components/Reserve/ReserveRoom/reserveroom.component";
import ReserveResource from "./components/Reserve/ReserveResource/reserveresource.component";
import ListBuilding from "./components/Building/ListBuilding/ListBuilding";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,

      showAddBuilding: false,
      showAddRoom: false,
      showAddResource: false,

      showReserveRoom: false,
      showReserveResource: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        // showUserBoard: user.roles.includes("ROLE_USER"),

        showAddBuilding: user.roles.includes("ROLE_ADMIN"),
        showAddRoom: user.roles.includes("ROLE_ADMIN"),
        showAddResource: user.roles.includes("ROLE_ADMIN"),

        showReserveRoom: user.roles.includes("ROLE_USER"),
        showReserveResource: user.roles.includes("ROLE_USER"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const {
      currentUser,
      showUserBoard,
      showAdminBoard,
      showAddBuilding,
      showAddRoom,
      showAddResource,
      showReserveRoom,
      showReserveResource,
    } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            GoBears
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Schedule
              </Link>
            </li>
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {showAddBuilding && (
              <li className="nav-item">
                <Link to={"/addbuilding"} className="nav-link">
                  Add Building
                </Link>
              </li>
            )}

            {showAddBuilding && (
              <li className="nav-item">
                <Link to={"/listBuilding"} className="nav-link">
                  List Building
                </Link>
              </li>
            )}

            {showAddRoom && (
              <li className="nav-item">
                <Link to={"/addroom"} className="nav-link">
                  Add Room
                </Link>
              </li>
            )}

            {showAddResource && (
              <li className="nav-item">
                <Link to={"/addresource"} className="nav-link">
                  Add Resource
                </Link>
              </li>
            )}

            {showReserveRoom && (
              <li className="nav-item">
                <Link to={"/reserveroom"} className="nav-link">
                  Reserve Room
                </Link>
              </li>
            )}

            {showReserveResource && (
              <li className="nav-item">
                <Link to={"/reserveresource"} className="nav-link">
                  Reserve Resource
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />

            <Route path="/addBuilding" element={<AddBuilding />} />
            <Route path="/listBuilding" element={<ListBuilding />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/addResource" element={<AddResource />} />

            <Route path="/reserveroom" element={<ReserveRoom />} />
            <Route path="/reserveresource" element={<ReserveResource />} />
          </Routes>
        </div>
        {/* <AuthVerify logOut={this.logOut}/> */}s
      </div>
    );
  }
}

export default App;
