import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import goBears from "./images/baylorBears2.png";

import AuthService from "./services/auth.service";

import Login from "./components/Login/login.component";
import Register from "./components/Register/register.component";
import Home from "./components/Home/home.component";
import AddBuilding from "./components/Building/AddBuilding/AddBuilding";
import Profile from "./components/Profile/profile.component";

import AdminBoard from "./components/AdminBoard/AdminBoard";

import EventBus from "./common/EventBus";
import AddRoom from "./components/Room/AddRoom/AddRoom";
import AddResource from "./components/Resource/AddResource/AddResource";
import ReserveRoom from "./components/Reserve/ReserveRoom/reserveroom.component";
import ReserveResource from "./components/Reserve/ReserveResource/reserveresource.component";
import FindBookableRoom from "./components/Room/findBookableRoom.component";
import App1 from "./components/Reserve/ReserveRoom/reserve";
import MyReserveRoomComponent from "./components/Reserve/ReserveRoom/myReserveRoom.component";
import ListBuilding from "./components/Building/ListBuilding/ListBuilding";
import ListRoom from "./components/Room/ListRoom/ListRoom";
import AddSchedule from "./components/Schedule/AddSchedule";
import ViewSchedule from "./components/Schedule/ViewSchedule";

import MapContainer from "./components/maps/newmap.component";

import LeafletComponent from "./components/maps/leaflet.component";
import EggComponent from "./components/maps/indoor.component";

import LeafletComponent1 from "./components/maps/indoornew.component";
import ListResource from "./components/Resource/ListResource/ListResource";
import Allotment from "./components/Allotment/Allotment";
import FindRoomByBuilding from "./components/Building/FindRoomByBuilding/FindRoomByBuilding";
import MapParentComponent from "./components/maps/mapParent.component";
import AddDirection from "./components/Building/Direction/AddDirection/AddDirection";
import UserBoard from "./components/UserBoard/UserBoard";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,

      showAddBuilding: false,
      showListBuilding: false,
      showAddDirection: false,

      showAddRoom: false,
      showListRoom: false,
      showAddResource: false,
      showAllotment: false,

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
        showUserBoard: user.roles.includes("ROLE_USER"),

        showAddBuilding: user.roles.includes("ROLE_ADMIN"),
        showListBuilding: user.roles.includes("ROLE_ADMIN"),
        showAddDirection: user.roles.includes("ROLE_ADMIN"),
        showAddRoom: user.roles.includes("ROLE_ADMIN"),
        showListRoom: user.roles.includes("ROLE_ADMIN"),
        showAddResource: user.roles.includes("ROLE_ADMIN"),

        showAllotment: user.roles.includes("ROLE_ADMIN"),
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
      showListBuilding,
      showAddDirection,
      showAddRoom,
      showListRoom,
      showAddResource,
      showAllotment,
      showReserveRoom,
      showReserveResource,
    } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            <img src={goBears} alt="logo" width="30px" height="30px" />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/schedule"} className="nav-link">
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
                <Link to={"/adminBoard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/userBoard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}

            {/* {showAddBuilding && (
              <li className="nav-item">
                <Link to={"/addbuilding"} className="nav-link">
                  Add Building
                </Link>
              </li>
            )} */}

            {/* {showListBuilding && (
              <li className="nav-item">
                <Link to={"/listBuilding"} className="nav-link">
                  List Building
                </Link>
              </li>
            )} */}

            {showAddDirection && (
              <li className="nav-item">
                <Link to={"/addDirection"} className="nav-link">
                  Add Direction
                </Link>
              </li>
            )}

            {/* {showAddRoom && (
              <li className="nav-item">
                <Link to={"/addRoom"} className="nav-link">
                  Add Room
                </Link>
              </li>
            )} */}

            {/* {showListRoom && (
              <li className="nav-item">
                <Link to={"/listRoom"} className="nav-link">
                  List Room
                </Link>
              </li>
            )} */}

            {/* {showAddResource && (
              <li className="nav-item">
                <Link to={"/addResource"} className="nav-link">
                  Add Resource
                </Link>
              </li>
            )} */}

            {/* {showAddResource && (
              <li className="nav-item">
                <Link to={"/listResource"} className="nav-link">
                  List Resource
                </Link>
              </li>
            )} */}

            {showAllotment && (
              <li className="nav-item">
                <Link to={"/allotment"} className="nav-link">
                  Allotment
                </Link>
              </li>
            )}

            {showReserveRoom && (
              <li className="nav-item">
                <Link to={"/findroom"} className="nav-link">
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
            {showReserveResource && (
              <li className="nav-item">
                <Link to={"/getMyReservation"} className="nav-link">
                  My Reservations
                </Link>
              </li>
            )}

            {showReserveResource && (
              <li className="nav-item">
                <Link to={"/addSchedule"} className="nav-link">
                  Add Schedule
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

            <Route
              path="/adminBoard"
              element={<AdminBoard currentUser={currentUser} />}
            />
            <Route
              path="/userBoard"
              element={<UserBoard currentUser={currentUser} />}
            />

            <Route path="/addBuilding" element={<AddBuilding />} />
            <Route path="/listBuilding" element={<ListBuilding />} />
            <Route path="/addDirection" element={<AddDirection />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/listRoom" element={<ListRoom />} />
            <Route path="/addResource" element={<AddResource />} />
            <Route path="/listResource" element={<ListResource />} />
            <Route path="/allotment" element={<Allotment />} />
            <Route
              path="/findRoomByBuilding"
              element={<FindRoomByBuilding />}
            />

            <Route path="/reserveroom" element={<ReserveRoom />} />
            <Route path="/reserveresource" element={<ReserveResource />} />
            <Route path="/findroom" element={<FindBookableRoom />} />
            <Route path="/findroom1" element={<App1 />} />
            <Route
              path="/getMyReservation"
              element={<MyReserveRoomComponent />}
            />
            <Route path="/addSchedule" element={<AddSchedule />} />
            <Route path="/schedule" element={<ViewSchedule />} />
            <Route path="/map" element={<MapContainer />} />
            <Route path="/leaflet" element={<LeafletComponent />} />
            <Route path="/indoor" element={<EggComponent />} />
            <Route path="/indoor1" element={<LeafletComponent1 />} />
            <Route path="/route" element={<MapParentComponent />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
