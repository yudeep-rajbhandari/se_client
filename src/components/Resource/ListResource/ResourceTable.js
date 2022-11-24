import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
export default function ResourceTable(props){
    return (
        <div>
            <h3> Resource List </h3>
            <div>
            <TableContainer component={Paper}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Associated Rooom</TableCell>
                    <TableCell>Working Condition</TableCell>
                    <TableCell>Resource Type</TableCell>
                    <TableCell>Action</TableCell>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.resources.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.resourceName}</TableCell>
                      <TableCell>{row.room.name}</TableCell>
                      <TableCell>{row.workingCondition}</TableCell>
                      <TableCell>{row.resourceType}</TableCell>
                      <TableCell><Button
                      startIcon={<ModeEditIcon />}
                      variant="outlined"
                      aria-label="text button group" onClick={()=>props.editResource(row.id)}> Edit</Button> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
            
        </div>
    )
}