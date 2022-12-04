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
import DoorBackIcon from "@mui/icons-material/DoorBack";
import ScheduleIcon from "@mui/icons-material/Schedule";

import {
  primaryButton,
  secondaryButton,
  primaryHeader,
} from "../../common/Style/Style";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PrimaryHeader from "../../common/Header/PrimaryHeader";
import PrimaryButton from "../../common/Button/PrimaryButton";
import SecondaryButton from "../../common/Button/SecondaryButton";
import ErrorButton from "../../common/Button/ErrorButton";

import AuthService from "../../services/auth.service";

export default function AdminBoard(props) {
  const currentUser = AuthService.getCurrentUser();
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


  const [clickRoomReservation, setClickRoomReservation] = useState(false);
  const [clickResourceReservation, setClickResourceReservation] = useState(false);
  const [roomReservationList, setRoomReservationList] = useState([]);
  const [resourceReservationList, setResourceReservationList] = useState([]);
  const [count, setCount] = useState(0);



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

  async function getAllRoomReservation() {
    const { data } = await RoomReservationsService.getAllRoomReservation();
    setRoomReservationList(data);
  }

  async function getAllResourceReservations(){
    
  }
  async function getAll() {
    getAllBuilding();
    getAllUser();
    getAllRoom();
    getAllResource();
    getAllRoomReservation();
  }
  useEffect(() => {
    getAll();
    setLoaded(true);
  }, []);

 

  async function showRoomReservations() {
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


function getRoomName(id){
  console.log(id)

}

function getResourceName(id){
  resources.map((resource)=> { if (resource.id ===id) {
    return resource.resourceName
  }})
}

  if (loaded && currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        <PrimaryHeader header="DASHBOARD" />
        <React.Fragment>
          <CssBaseline />
          <Container>
            <Box sx={{ bgcolor: "#154734", height: "10vh", width: "150vh" }}>
              <ButtonGroup variant="text" aria-label="text button group">
                {summary && (
                  <ErrorButton
                    title="Hide Summary"
                    icon={<HideSourceIcon />}
                    onClick={() => hideTable()}
                  />
                )}
                {!summary && (
                  <PrimaryButton
                    title="Summary"
                    icon={<SummarizeIcon />}
                    onClick={() => showSummary()}
                  />
                )}
                {!buildingDashboard && (
                  <PrimaryButton
                    title="Building Dashboard"
                    icon={<DashboardIcon />}
                    onClick={() => showBuildingSummary()}
                  />
                )}
                {buildingDashboard && (
                  <ErrorButton
                    title="Hide Building Dashboard"
                    icon={<HideSourceIcon />}
                    onClick={() => hideTable()}
                  />
                )}
                {!roomDashboard && (
                  <PrimaryButton
                    title="Room Dashboard"
                    icon={<DashboardIcon />}
                    onClick={() => showRoomSummary()}
                  />
                )}
                {roomDashboard && (
                  <ErrorButton
                    title="Hide Room Dashboard"
                    icon={<HideSourceIcon />}
                    onClick={() => hideTable()}
                  />
                )}
                {!resourceDashboard && (
                  <PrimaryButton
                    title="Resource Dashboard"
                    icon={<DashboardIcon />}
                    onClick={() => showResourceDashboard()}
                  />
                )}
                {resourceDashboard && (
                  <ErrorButton
                    title="Hide Resource Dashboard"
                    icon={<HideSourceIcon />}
                    onClick={() => hideTable()}
                  />
                )}
              </ButtonGroup>
            </Box>

            <Box sx={{ bgcolor: "#FFB81C", height: "10vh", width: "150vh" }}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={secondaryButton}
                  endIcon={<AddIcon />}
                  onClick={(event) => (window.location.href = "/addBuilding")}
                >
                  Add Building
                </Button>
                <Button
                  style={secondaryButton}
                  startIcon={<DomainIcon />}
                  onClick={(event) => (window.location.href = "/listBuilding")}
                >
                  List Building
                </Button>
              </ButtonGroup>

              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={secondaryButton}
                  endIcon={<AddIcon />}
                  onClick={(event) => (window.location.href = "/addRoom")}
                >
                  Add Room
                </Button>
                <Button
                  style={secondaryButton}
                  startIcon={<MeetingRoomIcon />}
                  onClick={(event) => (window.location.href = "/listRoom")}
                >
                  List Room
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button
                  style={secondaryButton}
                  endIcon={<AddIcon />}
                  onClick={(event) => (window.location.href = "/addResource")}
                >
                  Add Resource
                </Button>
                <Button
                  style={secondaryButton}
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
                  style={primaryButton}
                  startIcon={<AssignmentIndIcon />}
                  onClick={(event) => (window.location.href = "/allotment")}
                >
                  Allotment
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="text" aria-label="text button group">
                {userClick && (
                  <ErrorButton
                    title="Hide User Role Management"
                    icon={<HideSourceIcon />}
                    onClick={() => hideTable()}
                  />
                )}
                {!userClick && (
                  <PrimaryButton
                    title=" User Role Management"
                    icon={<PersonIcon />}
                    onClick={() => showUserRoleManagement()}
                  />
                )}
              </ButtonGroup>
              
              <ButtonGroup variant="text" aria-label="text button group">
                <PrimaryButton
                  title="Add Gates"
                  icon={<DoorBackIcon />}
                  onClick={(event) => (window.location.href = "/addDirection")}
                />
              </ButtonGroup>

              <ButtonGroup variant="text" aria-label="text button group">
                <PrimaryButton
                  title="Add Schedule"
                  icon={<ScheduleIcon />}
                  onClick={(event) => (window.location.href = "/addSchedule")}
                />
              </ButtonGroup>
            </Box>

            <Box sx={{ bgcolor: "#FFB81C", height: "10vh", width: "150vh" }}>
            <ButtonGroup variant="text" aria-label="text button group">
                {clickRoomReservation && (
                  <ErrorButton
                    icon={<HideSourceIcon />}
                    title="Hide Room Reservations"
                    onClick={() => hideTable()}
                  />
                )}
                {!clickRoomReservation && (
                  <SecondaryButton
                    title=" Manage Room Reservations"
                    icon={<EventSeatIcon />}
                    onClick={() => showRoomReservations()}
                  />
                )}
              </ButtonGroup>
              <ButtonGroup variant="text" aria-label="text button group">
                {clickResourceReservation && (
                  <ErrorButton
                    icon={<HideSourceIcon />}
                    title="Hide Resource Reservations"
                    onClick={() => hideTable()}
                  />
                )}
                {!clickResourceReservation && (
                  <SecondaryButton
                    title=" Manage Resource Reservations"
                    icon={<EventSeatIcon />}
                    onClick={() => showRoomReservations()}
                  />
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
                  currentUser={currentUser}
                  roomReservationList={roomReservationList}
                  reloadComponent={reloadComponent}
                  getRoomName= {getRoomName}
                  getResourceName = {getResourceName}
                />
              </Box>
            )}
          </Container>
        </React.Fragment>
        <div></div>
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
