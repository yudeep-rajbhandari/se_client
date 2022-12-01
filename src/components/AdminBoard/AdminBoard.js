import { useEffect, useState } from "react";
import DomainIcon from "@mui/icons-material/Domain";
import RoomReservationsService from "../../services/RoomReservationsService";
import ListRoomReservation from "./ListRoomReservation/ListRoomReservation";
import PersonIcon from "@mui/icons-material/Person";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Button from "@mui/material/Button";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PrintIcon from "@mui/icons-material/Print";
import HideSourceIcon from "@mui/icons-material/HideSource";
import ButtonGroup from "@mui/material/ButtonGroup";
import Summary from "./Summary/Summary";
import BuildingService from "../../services/BuildingService";
import RoomService from "../../services/RoomService";
import ResourceService from "../../services/ResourceService";
import BuildingDashboard from "./BuildingDashboard/BuildingDashboard";
import RoomDashboard from "./RoomDashboard/RoomDashboard";
import ResourceDashoard from "./ResourceDashboard/ResourceDashboard";
import adminService from "../../services/admin.service";
import UserRoleManagement from "./UserRoleManagement/UserRoleManagement";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Comment } from "react-loader-spinner";
import { Print } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
export default function AdminBoard(props) {
  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const [summary, setSummary] = useState(false);
  const [buildingDashboard, setBuildingDashboard] = useState(false);
  const [roomDashboard, setRoomDashboard] = useState(false);
  const [resourceDashboard, setResourceDashboard] = useState(false);

  const [resources, setResources] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuildings] = useState([]);

  const [users, setUsers] = useState([]);
  const [userClick, setUserClick] = useState(false);

  const [loaded, setLoaded] = useState(false);

  async function getAllUser() {
    const { data } = await adminService.getAllUser();
    setUsers(data);
  }

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
  }

  async function getAllRoom() {
    const { data } = await RoomService.getAllRoom();
    setRooms(data);
  }

  async function getAllResource() {
    const { data } = await ResourceService.getAllResource();
    setResources(data);
  }
  async function getAll() {
    getAllBuilding();
    getAllUser();
    getAllRoom();
    getAllResource();
  }
  useEffect(() => {
    getAll();
    setLoaded(true);
  }, []);

  const [clickRoomReservation, setClickRoomReservation] = useState(false);
  const [roomReservationList, setRoomReservationList] = useState([]);
  const [count, setCount] = useState(0);

  async function getAllRoomReservation() {
    const { data } = await RoomReservationsService.getAllRoomReservation();
    setRoomReservationList(data);
  }

  async function showReservations() {
    getAllRoomReservation();
    hideTable();
    setClickRoomReservation(true);
  }

  useEffect(() => {
    getAllRoomReservation();
  }, []);

  useEffect(() => {
    getAllRoomReservation();
  }, [count]);

  function reloadComponent() {
    setCount((currentCount) => {
      return currentCount + 1;
    });
  }

  function showSummary() {
    hideTable();
    setSummary(true);
  }

  function showBuildingSummary() {
    hideTable();
    setBuildingDashboard(true);
  }

  function showRoomSummary() {
    hideTable();
    setRoomDashboard(true);
  }

  function showResourceDashboard() {
    hideTable();
    setResourceDashboard(true);
  }

  function showUserRoleManagement() {
    hideTable();
    setUserClick(true);
  }

  function hideTable() {
    setClickRoomReservation(false);
    setSummary(false);
    setBuildingDashboard(false);
    setRoomDashboard(false);
    setResourceDashboard(false);
    setUserClick(false);
  }
  function refreshUserTable() {
    getAllUser();
  }
  if (loaded && currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        <h3 style={{ color: "#154734" }}>Dashboard</h3>
        <React.Fragment>
          <CssBaseline />
          <Container>
            <Box sx={{ bgcolor: "#154734", height: "10vh", width: "150vh" }}>
              <ButtonGroup variant="text" aria-label="text button group">
                {summary && (
                  <Button
                    startIcon={<HideSourceIcon />}
                    color="error"
                    type="submit"
                    onClick={() => hideTable()}
                  >
                    Hide Summary
                  </Button>
                )}
                {!summary && (
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    startIcon={<SummarizeIcon />}
                    type="submit"
                    onClick={() => showSummary()}
                  >
                    Summary
                  </Button>
                )}
                {!buildingDashboard && (
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    startIcon={<DashboardIcon />}
                    onClick={() => showBuildingSummary()}
                  >
                    {" "}
                    Building Dashboard
                  </Button>
                )}
                {buildingDashboard && (
                  <Button
                    startIcon={<HideSourceIcon />}
                    color="error"
                    onClick={() => hideTable()}
                  >
                    {" "}
                    Hide Building Dashboard
                  </Button>
                )}
                {!roomDashboard && (
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    startIcon={<DashboardIcon />}
                    onClick={() => showRoomSummary()}
                  >
                    {" "}
                    Room Dashboard
                  </Button>
                )}
                {roomDashboard && (
                  <Button
                    startIcon={<HideSourceIcon />}
                    color="error"
                    onClick={() => hideTable()}
                  >
                    {" "}
                    Hide Room Dashboard
                  </Button>
                )}
                {!resourceDashboard && (
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    startIcon={<DashboardIcon />}
                    onClick={() => showResourceDashboard()}
                  >
                    Resource Dashboard
                  </Button>
                )}
                {resourceDashboard && (
                  <Button
                    startIcon={<HideSourceIcon />}
                    color="error"
                    onClick={() => hideTable()}
                  >
                    {" "}
                    Hide Resource Dashboard
                  </Button>
                )}
              </ButtonGroup>
            </Box>

            <Box sx={{ bgcolor: "#FFB81C", height: "10vh", width: "150vh" }}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={{
                    backgroundColor: "#FFB81C",
                    color: "#154734",
                  }}
                  endIcon={<AddIcon />}
                  onClick={(event) => (window.location.href = "/addBuilding")}
                >
                  Add Building
                </Button>
                <Button
                  style={{
                    backgroundColor: "#FFB81C",
                    color: "#154734",
                  }}
                  startIcon={<DomainIcon />}
                  onClick={(event) => (window.location.href = "/listBuilding")}
                >
                  List Building
                </Button>
              </ButtonGroup>

              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={{
                    backgroundColor: "#FFB81C",
                    color: "#154734",
                  }}
                  endIcon={<AddIcon />}
                  onClick={(event) => (window.location.href = "/addRoom")}
                >
                  Add Room
                </Button>
                <Button
                  style={{
                    backgroundColor: "#FFB81C",
                    color: "#154734",
                  }}
                  startIcon={<MeetingRoomIcon />}
                  onClick={(event) => (window.location.href = "/listRoom")}
                >
                  List Room
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={{
                    backgroundColor: "#FFB81C",
                    color: "#154734",
                  }}
                  endIcon={<AddIcon />}
                  onClick={(event) => (window.location.href = "/addResource")}
                >
                  Add Resource
                </Button>
                <Button
                  style={{
                    backgroundColor: "#FFB81C",
                    color: "#154734",
                  }}
                  startIcon={<Print />}
                  onClick={(event) => (window.location.href = "/listResource")}
                >
                  List Resource
                </Button>
              </ButtonGroup>
            </Box>
            <Box
              spacing={2}
              sx={{ bgcolor: "#154734", height: "10vh", width: "150vh" }}
            >
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={{
                    backgroundColor: "#154734",
                    color: "#FFB81C",
                  }}
                  startIcon={<AssignmentIndIcon />}
                  onClick={(event) => (window.location.href = "/allotment")}
                >
                  Allotment
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="text" aria-label="text button group">
                {userClick && (
                  <Button
                    startIcon={<HideSourceIcon />}
                    color="error"
                    type="submit"
                    onClick={() => hideTable()}
                  >
                    Hide User Role Management
                  </Button>
                )}
                {!userClick && (
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    startIcon={<PersonIcon />}
                    type="submit"
                    onClick={() => showUserRoleManagement()}
                  >
                    User Role Management
                  </Button>
                )}
              </ButtonGroup>
              <ButtonGroup variant="text" aria-label="text button group">
                {clickRoomReservation && (
                  <Button
                    startIcon={<HideSourceIcon />}
                    color="error"
                    type="submit"
                    onClick={() => hideTable()}
                  >
                    Hide Room Reservations
                  </Button>
                )}
                {!clickRoomReservation && (
                  <Button
                    style={{
                      backgroundColor: "#154734",
                      color: "#FFB81C",
                    }}
                    startIcon={<EventSeatIcon />}
                    type="submit"
                    onClick={() => showReservations()}
                  >
                    List Room Reservations
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          </Container>

          <Container>
            <Box
              component="span"
              sx={{ p: 2, border: "0px", height: "10vh", width: "150vh" }}
            >
              {summary && (
                <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                  <Summary
                    buildings={buildings}
                    rooms={rooms}
                    resources={resources}
                  />
                </Box>
              )}
              {buildingDashboard && (
                <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                  <BuildingDashboard buildings={buildings} />
                </Box>
              )}
              {roomDashboard && (
                <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                  <RoomDashboard rooms={rooms} />
                </Box>
              )}
              {resourceDashboard && (
                <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                  <ResourceDashoard resources={resources} />
                </Box>
              )}
            </Box>
            {userClick && (
              <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                <UserRoleManagement
                  users={users}
                  refreshUserTable={refreshUserTable}
                  currentUser={currentUser}
                />
              </Box>
            )}

            {clickRoomReservation && (
              <Box sx={{ border: "0px", height: "10vh", width: "150vh" }}>
                <ListRoomReservation
                  roomReservationList={roomReservationList}
                  reloadComponent={reloadComponent}
                />
              </Box>
            )}
          </Container>
        </React.Fragment>
      </div>
    );
  } else {
    return (
      <div>
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#FFB81C"
          backgroundColor="#154734"
        />
      </div>
    );
  }
}
