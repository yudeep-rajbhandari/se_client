import { useEffect, useState, useRef } from "react";
import BuildingService from "../../../../services/BuildingService";
import { Rings } from "react-loader-spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
export default function AddDirection() {
  const [buildings, setBuildings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState();
  const [buildingSelected, setBuildingSelected] = useState(false);
  const [gatesCount, setGatesCount] = useState(0);

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
  console.log(gatesCount);
  if (loaded) {
    return (
      <div>
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
                    <StyledTableCell> # Gates</StyledTableCell>
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
                      <TextField
                        id="gates"
                        label="Number of Gates"
                        type="number"
                        onChange={(e) => setGatesCount(e)}
                        required
                      />
                    </StyledTableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {gatesCount && (
          <div>
            {" "}
            <h3> Add Gates here </h3>{" "}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Rings
        align="center"
        height="80"
        width="80"
        color="#4fa94d"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    );
  }
}
