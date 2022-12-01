import { useEffect, useState, useRef } from "react";
import BuildingService from "../../../../services/BuildingService";
import { Comment } from "react-loader-spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#154734",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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
        <h3>Add Direction </h3>
        <div>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Select Building</StyledTableCell>
                  {buildingSelected && (
                    <StyledTableCell> Action</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
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
                        variant="outlined"
                        onClick={() => addGatesClick()}
                      >
                        Add Gates
                      </Button>
                    </StyledTableCell>
                  )}
                </TableRow>
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
                    <TableRow>
                      <StyledTableCell>Gate Name</StyledTableCell>
                      <StyledTableCell>Latitude</StyledTableCell>
                      <StyledTableCell>Longitude</StyledTableCell>
                      <StyledTableCell>Elevator</StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
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
                        <Button variant="outlined" onClick={() => addGate()}>
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
