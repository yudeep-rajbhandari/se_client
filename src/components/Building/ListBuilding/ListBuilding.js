import { useState, useEffect } from "react";
import AdminService from "../../../services/admin.service";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BuildingForm from "../BuildingForm";

export default function ListBuilding() {
  const [buildings, setBuildings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState();

  async function getAllBuilding() {
    const { data } = await AdminService.getAllBuilding();
    setBuildings(data);
  }

  useEffect(() => {
    getAllBuilding();
    setLoaded(true);
  }, []);

  function editBuilding(building) {
    console.log("Edit building", building);
    setEdit(true);
    setSelectedBuilding(building);
  }

  if (loaded) {
    return (
      <div>
        <h3> List Building</h3>
        <div>
          <TableContainer component={Paper}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              All buildings
            </Typography>

            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Floors</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Edit Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {buildings.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.floors}</TableCell>
                    <TableCell>
                      {row.address.street +
                        ", " +
                        row.address.city +
                        ", " +
                        row.address.state +
                        ", " +
                        +row.address.zip}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <button onClick={() => editBuilding(row)}> Edit</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {edit && (
          <BuildingForm
            key={selectedBuilding.id}
            selectedBuilding={selectedBuilding}
          />
        )}
      </div>
    );
  }
}
