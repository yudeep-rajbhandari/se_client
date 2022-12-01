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
    setClickRoomReservation(true);
  }

  function hideRoomReservationTable() {
    setClickRoomReservation(false);
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
    setBuildingDashboard(false);
    setRoomDashboard(false);
    setResourceDashboard(false);
    setSummary(true);
  }
  function hideSummary() {
    setSummary(false);
  }

  function showBuildingSummary() {
    setSummary(false);
    setRoomDashboard(false);
    setResourceDashboard(false);
    setBuildingDashboard(true);
  }

  function hideBuildingSummary() {
    setBuildingDashboard(false);
  }

  function showRoomSummary() {
    setSummary(false);
    setBuildingDashboard(false);
    setResourceDashboard(false);
    setRoomDashboard(true);
  }

  function hideRoomSummary() {
    setRoomDashboard(false);
  }

  function showResourceDashboard() {
    setSummary(false);
    setBuildingDashboard(false);
    setRoomDashboard(false);
    setResourceDashboard(true);
  }

  function hideresourceDashboard() {
    setResourceDashboard(false);
  }

  function showUserRoleManagement() {
    setUserClick(true);
  }
  function hideUserRoleManagement() {
    setUserClick(false);
  }

  function refreshUserTable() {
    getAllUser();
  }
  if (loaded && currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        <h3 style={{ color: "#154734" }}>Dashboard</h3>
        <div>
          <ButtonGroup variant="text" aria-label="text button group">
            {summary && (
              <Button
                startIcon={<HideSourceIcon />}
                color="error"
                type="submit"
                onClick={() => hideSummary()}
              >
                Hide Summary
              </Button>
            )}
            {!summary && (
              <Button
                startIcon={<SummarizeIcon />}
                type="submit"
                onClick={() => showSummary()}
              >
                Summary
              </Button>
            )}
            {!buildingDashboard && (
              <Button
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
                onClick={() => hideBuildingSummary()}
              >
                {" "}
                Hide Building Dashboard
              </Button>
            )}
            {!roomDashboard && (
              <Button
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
                onClick={() => hideRoomSummary()}
              >
                {" "}
                Hide Room Dashboard
              </Button>
            )}
            {!resourceDashboard && (
              <Button
                startIcon={<DashboardIcon />}
                onClick={() => showResourceDashboard()}
              >
                {" "}
                Resource Dashboard
              </Button>
            )}
            {resourceDashboard && (
              <Button
                startIcon={<HideSourceIcon />}
                color="error"
                onClick={() => hideresourceDashboard()}
              >
                {" "}
                Hide Resource Dashboard
              </Button>
            )}
          </ButtonGroup>

          {summary && (
            <div>
              <Summary
                buildings={buildings}
                rooms={rooms}
                resources={resources}
              />
            </div>
          )}

          {buildingDashboard && (
            <div>
              <BuildingDashboard buildings={buildings} />
            </div>
          )}

          {roomDashboard && (
            <div>
              <RoomDashboard rooms={rooms} />
            </div>
          )}
          {resourceDashboard && (
            <div>
              <ResourceDashoard resources={resources} />
            </div>
          )}
        </div>

        <div>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              endIcon={<AddIcon />}
              onClick={(event) => (window.location.href = "/addBuilding")}
            >
              Add Building
            </Button>
            <Button
              startIcon={<DomainIcon />}
              onClick={(event) => (window.location.href = "/listBuilding")}
            >
              List Building
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              endIcon={<AddIcon />}
              onClick={(event) => (window.location.href = "/addRoom")}
            >
              Add Room
            </Button>
            <Button
              startIcon={<MeetingRoomIcon />}
              onClick={(event) => (window.location.href = "/listRoom")}
            >
              List Room
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              endIcon={<AddIcon />}
              onClick={(event) => (window.location.href = "/addResource")}
            >
              Add Resource
            </Button>
            <Button
              startIcon={<Print />}
              onClick={(event) => (window.location.href = "/listResource")}
            >
              List Resource
            </Button>
          </ButtonGroup>
          <div>
            <ButtonGroup variant="text" aria-label="text button group">
              <Button
                startIcon={<AssignmentIndIcon />}
                onClick={(event) => (window.location.href = "/allotment")}
              >
                Allotment
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <ButtonGroup variant="text" aria-label="text button group">
              {userClick && (
                <Button
                  startIcon={<HideSourceIcon />}
                  color="error"
                  type="submit"
                  onClick={() => hideUserRoleManagement()}
                >
                  Hide User Role Management
                </Button>
              )}
              {!userClick && (
                <Button
                  startIcon={<PersonIcon />}
                  type="submit"
                  onClick={() => showUserRoleManagement()}
                >
                  User Role Management
                </Button>
              )}
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              {clickRoomReservation && (
                <Button
                  startIcon={<HideSourceIcon />}
                  color="error"
                  type="submit"
                  onClick={() => hideRoomReservationTable()}
                >
                  Hide Room Reservations
                </Button>
              )}
              {!clickRoomReservation && (
                <Button
                  startIcon={<EventSeatIcon />}
                  type="submit"
                  onClick={() => showReservations()}
                >
                  List Room Reservations
                </Button>
              )}
            </ButtonGroup>
          </div>

          {clickRoomReservation && (
            <ListRoomReservation
              roomReservationList={roomReservationList}
              reloadComponent={reloadComponent}
            />
          )}

          {userClick && (
            <UserRoleManagement
              users={users}
              refreshUserTable={refreshUserTable}
              currentUser={currentUser}
            />
          )}
        </div>
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
