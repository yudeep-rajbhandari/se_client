import { useEffect, useState, useRef } from "react";
import BuildingService from "../../../../services/BuildingService";
import { Comment } from "react-loader-spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import AddIcon from "@mui/icons-material/Add";

import {
  primaryButton,
  secondaryButton,
  primaryHeader,
  StyledTableCell,
  StyledTableRow,
} from "../../../../common/Style/Style";

export default function AddDirection(props) {
  const [buildings, setBuildings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState();
  const [buildingSelected, setBuildingSelected] = useState(false);
  const [addGates, setAddgates] = useState(false);
  const [status, setStatus] = useState(false);
  const gateNameRef = useRef();
  const latRef = useRef();
  const longRef = useRef();
  const elevatorRef = useRef();

  async function getAllBuilding() {
    const { data } = await BuildingService.getAllBuilding();
    setBuildings(data);
    setLoaded(true);
  }

  useEffect(() => {
    getAllBuilding();
  }, []);

  const buildingOptions = buildings.map((building) => (
    <option key={building.id} value={building.id}>
      {building.name}
    </option>
  ));

  function handleSelectedBuildingIdChange(event) {
    setSelectedBuildingId(event.target.value);
    setBuildingSelected(true);
  }

  function addGatesClick() {
    setAddgates(true);
  }

  function addGate() {
    const gate = {
      name: gateNameRef.current.value,
      latitude: latRef.current.value,
      longitude: longRef.current.value,
      elevator: elevatorRef.current.value,
    };
    addGateToBuilding(gate, selectedBuildingId);
  }

  async function addGateToBuilding(gate, buildingId) {
    await BuildingService.addGate(gate, buildingId)
      .then((res) => {
        toast(
          gateNameRef.current.value + " added in building " + res.data.name
        );
      })
      .catch((error) => {
        toast("Error in adding gate to building");
      })
      .finally(setStatus(true));
  }

  if (loaded && props.currentUser.roles[0] === "ROLE_ADMIN") {
    return (
      <div>
        {status && (
          <div>
            <ToastContainer />
          </div>
        )}
        <h1 style={primaryHeader}>Direction</h1>
        <div>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Select Building</StyledTableCell>
                  {buildingSelected && (
                    <StyledTableCell> Action</StyledTableCell>
                  )}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>
                    <select onChange={handleSelectedBuildingIdChange}>
                      <option key={0} value={0}>
                        ---Select Building---
                      </option>
                      {buildingOptions}
                    </select>
                  </StyledTableCell>

                  {buildingSelected && (
                    <StyledTableCell>
                      {" "}
                      <Button
                        startIcon={<DoorBackIcon />}
                        style={{ backgroundColor: "#154734", color: "#FFB81C" }}
                        variant="outlined"
                        onClick={() => addGatesClick()}
                      >
                        Add Gates
                      </Button>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {addGates && (
            <div>
              <TableContainer>
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Gate Name</StyledTableCell>
                      <StyledTableCell>Latitude</StyledTableCell>
                      <StyledTableCell>Longitude</StyledTableCell>
                      <StyledTableCell>Elevator</StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>
                        <TextField
                          id="name"
                          label="Gate Name"
                          inputRef={gateNameRef}
                          type="name"
                          required
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          id="latitude"
                          label="Latitude"
                          inputRef={latRef}
                          type="longitude"
                          required
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          id="longitude"
                          label="Longitude"
                          inputRef={longRef}
                          type="longitude"
                          required
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TextField
                          id="elevator"
                          label="Elevator Name"
                          inputRef={elevatorRef}
                          type="name"
                        ></TextField>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          startIcon={<AddIcon />}
                          style={{
                            backgroundColor: "#154734",
                            color: "#FFB81C",
                          }}
                          variant="outlined"
                          onClick={() => addGate()}
                        >
                          {" "}
                          Add
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
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
    );
  }
}
